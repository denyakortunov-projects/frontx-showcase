import { EventColorPicker } from "./appearance";
import { Temporal } from "temporal-polyfill";
import { useState, useEffect, useId, useRef, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@gears-frontx/ui-kit/dialog";
import { Button } from "@gears-frontx/ui-kit/button";
import { Field, FieldLabel, FieldError } from "@gears-frontx/ui-kit/field";
import { Input } from "@gears-frontx/ui-kit/input";
import { Textarea } from "@gears-frontx/ui-kit/textarea";
import { Checkbox } from "@gears-frontx/ui-kit/checkbox";
import { NativeSelect } from "@gears-frontx/ui-kit/native-select";
import type { EventDraft, CalendarEvent } from "./types";
import { validateDraft, resolveLocal, changeDraftZone } from "./model";

const BASE_ZONES = [
  "UTC",
  "Asia/Singapore",
  "Europe/London",
  "America/New_York",
  "Europe/Berlin",
];

export function EventEditor({
  initialDraft,
  timeZones,
  isNew,
  onSave,
  onRequestClose,
  onDirtyChange,
}: {
  initialDraft: EventDraft;
  timeZones?: readonly string[];
  isNew: boolean;
  onSave: (event: CalendarEvent) => void | Promise<void>;
  onRequestClose: () => void;
  onDirtyChange: (dirty: boolean) => void;
}) {
  const [draft, setDraft] = useState<EventDraft>(() => initialDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [startAmbiguous, setStartAmbiguous] = useState(false);
  const [endAmbiguous, setEndAmbiguous] = useState(false);
  const initialRef = useRef(initialDraft);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const titleId = `${uid}-title`;
  const startDateId = `${uid}-start-date`;
  const startTimeId = `${uid}-start-time`;
  const endDateId = `${uid}-end-date`;
  const endTimeId = `${uid}-end-time`;
  const timezoneId = `${uid}-timezone`;
  const descriptionId = `${uid}-description`;
  const startOccurrenceId = `${uid}-start-occurrence`;
  const endOccurrenceId = `${uid}-end-occurrence`;

  useEffect(() => {
    const dirty = JSON.stringify(draft) !== JSON.stringify(initialRef.current);
    onDirtyChange(dirty);
  }, [draft, onDirtyChange]);

  useEffect(() => {
    if (!draft.allDay && draft.startDate && draft.startTime && draft.timeZone) {
      const result = resolveLocal(
        draft.startDate,
        draft.startTime,
        draft.timeZone,
      );
      setStartAmbiguous(result.ambiguous ?? false);
    } else {
      setStartAmbiguous(false);
    }
  }, [
    draft.startDate,
    draft.startTime,
    draft.timeZone,
    draft.startChoice,
    draft.allDay,
  ]);

  useEffect(() => {
    if (!draft.allDay && draft.endDate && draft.endTime && draft.timeZone) {
      const result = resolveLocal(draft.endDate, draft.endTime, draft.timeZone);
      setEndAmbiguous(result.ambiguous ?? false);
    } else {
      setEndAmbiguous(false);
    }
  }, [
    draft.endDate,
    draft.endTime,
    draft.timeZone,
    draft.endChoice,
    draft.allDay,
  ]);

  const [localZone, setLocalZone] = useState<string>();
  useEffect(() => { setLocalZone(Intl.DateTimeFormat().resolvedOptions().timeZone); }, []);
  const zones = [...new Set([...(timeZones ?? [...BASE_ZONES, ...(localZone ? [localZone] : [])]), draft.timeZone])];

  const updateDraft = (updates: Partial<EventDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
    setSaveError(null);
  };

  const handleAllDayChange = (checked: boolean) => {
    if (!checked && draft.allDay && !draft.startTime && !draft.endTime) {
      updateDraft({ allDay: false, startTime: "09:00", endTime: "09:30" });
    } else {
      updateDraft({ allDay: checked });
    }
  };

  const handleZoneChange = (zone: string) => {
    const newDraft = changeDraftZone(draft, zone);
    setDraft(newDraft);
    setSaveError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setErrors({});
    setSaveError(null);
    const { event, errors: validationErrors } = validateDraft(draft);
    if (!event || Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = ["title", "start", "end", "timeZone"].find(
        (k) => validationErrors[k],
      );
      if (firstKey && formRef.current) {
        const el = formRef.current.querySelector(
          `[name="${firstKey}"]`,
        ) as HTMLElement | null;
        el?.focus();
      }
      return;
    }
    setPending(true);
    try {
      await onSave(event);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save event";
      setSaveError(message);
      setPending(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !pending) onRequestClose();
  };

  const getOccurrenceLabel = (
    choice: "earlier" | "later",
    date: string,
    time: string,
    zone: string,
  ): string => {
    try {
      const zdt = Temporal.PlainDateTime.from(
        `${date}T${time}`,
      ).toZonedDateTime(zone, { disambiguation: choice });
      return `${choice === "earlier" ? "Earlier" : "Later"} (UTC${zdt.offset})`;
    } catch {
      /* incomplete date */
    }
    return choice === "earlier" ? "Earlier occurrence" : "Later occurrence";
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent size="lg" showCloseButton={false} className="cal-editor">
        <DialogHeader>
          <DialogTitle>{isNew ? "Create event" : "Edit event"}</DialogTitle>
          {!draft.allDay && (startAmbiguous || endAmbiguous) && (
            <DialogDescription>
              Select which occurrence for ambiguous times.
            </DialogDescription>
          )}
        </DialogHeader>
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="cal-form-grid"
        >
          <Field className="cal-form-span">
            <FieldLabel htmlFor={titleId}>Title</FieldLabel>
            <Input
              id={titleId}
              name="title"
              value={draft.title}
              onChange={(e) => updateDraft({ title: e.target.value })}
              disabled={pending}
              autoFocus
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? `${titleId}-error` : undefined}
            />
            {errors.title && (
              <FieldError id={`${titleId}-error`}>{errors.title}</FieldError>
            )}
          </Field>
          <Field className="cal-form-span">
            <FieldLabel>Colour</FieldLabel>
            <EventColorPicker
              disabled={pending}
              value={draft.color ?? "accent"}
              onChange={(color) => setDraft((prev) => ({ ...prev, color }))}
            />
          </Field>
          <div className="cal-checkbox-row">
            <Checkbox
              id={`${uid}-allday`}
              checked={draft.allDay}
              onCheckedChange={handleAllDayChange}
              disabled={pending}
            />
            <FieldLabel htmlFor={`${uid}-allday`}>All day</FieldLabel>
          </div>
          <Field>
            <FieldLabel htmlFor={startDateId}>Start date</FieldLabel>
            <Input
              type="date"
              id={startDateId}
              name="start"
              value={draft.startDate}
              onChange={(e) =>
                updateDraft({ startDate: e.target.value, startChoice: "" })
              }
              disabled={pending}
              aria-invalid={!!errors.start}
              aria-describedby={
                errors.start ? `${startDateId}-error` : undefined
              }
            />
            {errors.start && (
              <FieldError id={`${startDateId}-error`}>
                {errors.start}
              </FieldError>
            )}
          </Field>
          {!draft.allDay && (
            <Field>
              <FieldLabel htmlFor={startTimeId}>Start time</FieldLabel>
              <Input
                type="time"
                id={startTimeId}
                value={draft.startTime}
                aria-invalid={!!errors.start}
                aria-describedby={
                  errors.start ? `${startDateId}-error` : undefined
                }
                onChange={(e) =>
                  updateDraft({ startTime: e.target.value, startChoice: "" })
                }
                disabled={pending}
              />
            </Field>
          )}
          <Field>
            <FieldLabel htmlFor={endDateId}>End date</FieldLabel>
            <Input
              type="date"
              id={endDateId}
              name="end"
              value={draft.endDate}
              onChange={(e) =>
                updateDraft({ endDate: e.target.value, endChoice: "" })
              }
              disabled={pending}
              aria-invalid={!!errors.end}
              aria-describedby={errors.end ? `${endDateId}-error` : undefined}
            />
            {errors.end && (
              <FieldError id={`${endDateId}-error`}>{errors.end}</FieldError>
            )}
            {draft.allDay && <p>End date is inclusive for all-day events.</p>}
          </Field>
          {!draft.allDay && (
            <Field>
              <FieldLabel htmlFor={endTimeId}>End time</FieldLabel>
              <Input
                type="time"
                id={endTimeId}
                value={draft.endTime}
                aria-invalid={!!errors.end}
                aria-describedby={errors.end ? `${endDateId}-error` : undefined}
                onChange={(e) =>
                  updateDraft({ endTime: e.target.value, endChoice: "" })
                }
                disabled={pending}
              />
            </Field>
          )}
          {!draft.allDay && (
            <Field>
              <FieldLabel htmlFor={timezoneId}>Timezone</FieldLabel>
              <NativeSelect
                id={timezoneId}
                name="timeZone"
                value={draft.timeZone}
                onChange={(e) => handleZoneChange(e.target.value)}
                disabled={pending}
                aria-invalid={!!errors.timeZone}
                aria-describedby={
                  errors.timeZone ? `${timezoneId}-error` : undefined
                }
              >
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </NativeSelect>
              {errors.timeZone && (
                <FieldError id={`${timezoneId}-error`}>
                  {errors.timeZone}
                </FieldError>
              )}
            </Field>
          )}
          {!draft.allDay && startAmbiguous && (
            <Field>
              <FieldLabel htmlFor={startOccurrenceId}>
                Start occurrence
              </FieldLabel>
              <NativeSelect
                id={startOccurrenceId}
                value={draft.startChoice}
                onChange={(e) =>
                  updateDraft({
                    startChoice: e.target.value as "" | "earlier" | "later",
                  })
                }
                disabled={pending}
              >
                <option value="">Choose offset</option>
                <option value="earlier">
                  {getOccurrenceLabel(
                    "earlier",
                    draft.startDate,
                    draft.startTime,
                    draft.timeZone,
                  )}
                </option>
                <option value="later">
                  {getOccurrenceLabel(
                    "later",
                    draft.startDate,
                    draft.startTime,
                    draft.timeZone,
                  )}
                </option>
              </NativeSelect>
            </Field>
          )}
          {!draft.allDay && endAmbiguous && (
            <Field>
              <FieldLabel htmlFor={endOccurrenceId}>End occurrence</FieldLabel>
              <NativeSelect
                id={endOccurrenceId}
                value={draft.endChoice}
                onChange={(e) =>
                  updateDraft({
                    endChoice: e.target.value as "" | "earlier" | "later",
                  })
                }
                disabled={pending}
              >
                <option value="">Choose offset</option>
                <option value="earlier">
                  {getOccurrenceLabel(
                    "earlier",
                    draft.endDate,
                    draft.endTime,
                    draft.timeZone,
                  )}
                </option>
                <option value="later">
                  {getOccurrenceLabel(
                    "later",
                    draft.endDate,
                    draft.endTime,
                    draft.timeZone,
                  )}
                </option>
              </NativeSelect>
            </Field>
          )}
          <Field className="cal-form-span">
            <FieldLabel htmlFor={descriptionId}>Description</FieldLabel>
            <Textarea
              id={descriptionId}
              value={draft.description}
              onChange={(e) => updateDraft({ description: e.target.value })}
              disabled={pending}
            />
          </Field>
          {saveError && (
            <p role="alert" className="cal-form-span">
              {saveError}
            </p>
          )}
          <DialogFooter className="cal-form-span">
            <Button
              type="button"
              variant="outline"
              onClick={onRequestClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" loading={pending}>
              {isNew ? "Create event" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
