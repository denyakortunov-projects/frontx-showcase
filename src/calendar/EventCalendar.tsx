"use client";

import { useDatePreferences } from "../date-picker/date-preferences";
import { CalendarToolbar } from "./CalendarToolbar";
import { CalendarYear } from "./CalendarYear";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Temporal } from "temporal-polyfill";
import { Button } from "@gears-frontx/ui-kit/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@gears-frontx/ui-kit/sheet";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@gears-frontx/ui-kit/alert-dialog";
import { Pencil, Trash2, CalendarDays, Clock, CalendarX } from "lucide-react";
import type { EventCalendarProps, EventDraft, CalendarView } from "./types";
import {
  rangeFor,
  addDays,
  eventInRange,
  formatEventTime,
  formatAgendaTime,
  draftFromEvent,
  newDraft,
  localParts,
} from "./model";
import { CalendarGrid } from "./CalendarGrid";
import { EventEditor } from "./EventEditor";
import "./calendar.css";

export function EventCalendar({
  events,
  position,
  onPositionChange,
  onSave,
  onDelete,
  density = "standard",
  height = 640,
  timeZone = "UTC",
  timeZones,
  locale: requestedLocale,
  timeFormat = "system",
  weekStartsOn: requestedWeekStart,
  adaptive = true,
  readOnly = false,
  state = "ready",
  now = new Date().toISOString(),
  onRetry,
  onDirtyChange,
  registerNavigationGuard,
  renderEventExtra,
  scrollPositions,
}: EventCalendarProps) {
  const {locale, hour12, weekStartsOn} = useDatePreferences({locale:requestedLocale, timeFormat, weekStartsOn:requestedWeekStart});
  const root = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(height - 110);
  const [draft, setDraft] = useState<EventDraft | null>(null);
  const dirtyRef = useRef(false);
  const mutationPending = useRef(false);
  const [discard, setDiscard] = useState(false);
  const pendingDiscard = useRef<((yes: boolean) => void) | null>(null);
  const [deleting, setDeleting] = useState(false);
  const deletedFocus = useRef(false);
  const [busy, setBusy] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [notice, setNotice] = useState("");
  const scrollStore = useRef(new Map<string, number>());
  const fallbackFocus = useRef<HTMLButtonElement>(null);
  const lastSelected = useRef(position.selectedId);
  if (position.selectedId) lastSelected.current = position.selectedId;
  const isNew = !!draft && !events.some((e) => e.id === draft.id);
  const selected = events.find((e) => e.id === position.selectedId);
  const narrow = adaptive && width < 620;
  const view: CalendarView =
    narrow && position.view !== "year" ? "agenda" : position.view;
  const span = position.view === "agenda" ? position.agendaSpan : position.view;
  const range = useMemo(
    () => rangeFor(position.date, span, weekStartsOn),
    [position.date, span, weekStartsOn],
  );
  const shown = useMemo(
    () =>
      state === "empty"
        ? []
        : events.filter((e) =>
            eventInRange(e, range.start, range.end, timeZone),
          ),
    [events, range, timeZone, state],
  );
  const canEdit =
    !readOnly && !!onSave && state !== "loading" && state !== "error";
  const canDelete = !readOnly && !!onDelete;
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) =>
      setWidth(entries[0].contentRect.width),
    );
    ro.observe(el);
    const bodyObserver = new ResizeObserver((entries) =>
      setBodyHeight(entries[0].contentRect.height),
    );
    if (bodyRef.current) bodyObserver.observe(bodyRef.current);
    return () => {
      ro.disconnect();
      bodyObserver.disconnect();
    };
  }, []);
  const markDirty = useCallback(
    (value: boolean) => {
      dirtyRef.current = value;
      onDirtyChange?.(value);
    },
    [onDirtyChange],
  );
  const askDiscard = useCallback(() => {
    if (mutationPending.current) return Promise.resolve(false);
    if (!dirtyRef.current) return Promise.resolve(true);
    if (pendingDiscard.current) return Promise.resolve(false);
    setDiscard(true);
    return new Promise<boolean>((resolve) => {
      pendingDiscard.current = resolve;
    });
  }, []);
  useEffect(() => {
    registerNavigationGuard?.(askDiscard);
    return () => {
      registerNavigationGuard?.(null);
      pendingDiscard.current?.(false);
    };
  }, [registerNavigationGuard, askDiscard]);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  const finishDiscard = (yes: boolean) => {
    setDiscard(false);
    if (yes) {
      markDirty(false);
      setDraft(null);
    }
    const resolve = pendingDiscard.current;
    pendingDiscard.current = null;
    resolve?.(yes);
  };
  const closeEditor = async () => {
    if (await askDiscard()) {
      markDirty(false);
      setDraft(null);
    }
  };
  const create = (date = position.date, allDay = false, time?: string) => {
    if (!canEdit) return;
    setDraft(newDraft(date, timeZone, now, allDay, time));
  };
  const changeView = (v: CalendarView) =>
    onPositionChange({
      ...position,
      view: v,
      agendaSpan: position.view === "day" ? "day" : "week",
      selectedId: null,
    });
  const shift = (direction: number) =>
    onPositionChange({
      ...position,
      date: Temporal.PlainDate.from(position.date)
        .add(
          span === "year"
            ? { years: direction }
            : span === "month"
              ? { months: direction }
              : { days: direction * (span === "day" ? 1 : 7) },
        )
        .toString(),
      selectedId: null,
    });
  const select = (selectedId: string) =>
    onPositionChange({ ...position, selectedId });
  const restoreFocus = () => {
    const el = root.current?.querySelector<HTMLElement>(
      `[data-event-id="${CSS.escape(lastSelected.current || "")}"]`,
    );
    (el ?? fallbackFocus.current)?.focus();
  };
  const zoneOffset = Temporal.PlainDate.from(position.date).toZonedDateTime({
    timeZone,
    plainTime: "12:00",
  }).offset;
  const agendaDays = Array.from(
    {
      length: Temporal.PlainDate.from(range.start).until(
        Temporal.PlainDate.from(range.end),
      ).days,
    },
    (_, i) => addDays(range.start, i),
  );
  return (
    <div
      ref={root}
      className="event-calendar"
      data-density={density}
      data-view={view}
      data-testid="event-calendar"
      style={{ height }}
    >
      <CalendarToolbar
        date={position.date}
        view={position.view}
        locale={locale}
        weekStartsOn={weekStartsOn}
        todayRef={fallbackFocus}
        onView={changeView}
        onShift={shift}
        canEdit={canEdit}
        onCreate={() => create()}
        onToday={() =>
          onPositionChange({
            ...position,
            date: localParts(now, timeZone).date,
            selectedId: null,
          })
        }
        onDate={(date) =>
          onPositionChange({ ...position, date, selectedId: null })
        }
      />
      <div className="cal-meta">
        <span>
          {timeZone} (UTC{zoneOffset})
        </span>
        <span>
          {readOnly ? "Read only" : `${shown.length} events`}
          {narrow && position.view !== "agenda" ? " · List for this width" : ""}
        </span>
      </div>
      <div className="cal-body" ref={bodyRef}>
        {state === "loading" ? (
          <div className="cal-state" role="status">
            Loading events…
          </div>
        ) : state === "error" ? (
          <div className="cal-state" role="alert">
            <CalendarX />
            <p>Events could not be loaded.</p>
            {onRetry && (
              <Button variant="outline" onClick={onRetry}>
                Try again
              </Button>
            )}
          </div>
        ) : view === "year" ? (
          <CalendarYear
            date={position.date}
            events={shown}
            timeZone={timeZone}
            now={now}
            locale={locale}
            weekStartsOn={weekStartsOn}
            onSelectDate={(date) =>
              onPositionChange({
                ...position,
                date,
                view: "day",
                agendaSpan: "day",
                selectedId: null,
              })
            }
          />
        ) : view === "agenda" ? (
          <div className="cal-agenda" aria-label="Events by date">
            {shown.length === 0 ? (
              <div className="cal-state">
                <CalendarDays />
                <p>No events in this period.</p>
                {canEdit && (
                  <Button variant="outline" onClick={() => create()}>
                    New event
                  </Button>
                )}
              </div>
            ) : (
              agendaDays.map((day) => {
                const dayEvents = shown
                  .filter((e) =>
                    eventInRange(e, day, addDays(day, 1), timeZone),
                  )
                  .sort(
                    (a, b) =>
                      Number(b.allDay) - Number(a.allDay) ||
                      (a.allDay ? a.startDate : a.start).localeCompare(
                        b.allDay ? b.startDate : b.start,
                      ),
                  );
                if (!dayEvents.length) return null;
                return (
                  <section key={day} className="cal-agenda-day">
                    <h3>
                      {Temporal.PlainDate.from(day).toLocaleString(locale, {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </h3>
                    {dayEvents.map((event) => (
                      <Button
                        variant="ghost"
                        key={event.id}
                        data-event-id={event.id}
                        data-color={event.color ?? "accent"}
                        className={`cal-agenda-event ${event.id === position.selectedId ? "is-selected" : ""}`}
                        onClick={() => select(event.id)}
                      >
                        <span className="cal-agenda-row">
                          <i className="cal-agenda-dot" aria-hidden="true" />
                          <span className="cal-agenda-time">
                            {formatAgendaTime(event, day, timeZone, locale, hour12)}
                          </span>
                          <span className="cal-agenda-title">
                            {event.title}
                            {renderEventExtra?.(event)}
                          </span>
                        </span>
                      </Button>
                    ))}
                  </section>
                );
              })
            )}
          </div>
        ) : (
          <>
            <CalendarGrid
              events={view === "month" && state !== "empty" ? events : shown}
              date={position.date}
              view={view}
              timeZone={timeZone}
              locale={locale}
              hour12={hour12}
              weekStartsOn={weekStartsOn}
              density={density}
              height={Math.max(180, bodyHeight)}
              selectedId={position.selectedId}
              onSelect={select}
              onCreate={create}
              readOnly={!canEdit}
              now={now}
              scrollStore={scrollPositions ?? scrollStore.current}
            />
            {shown.length === 0 && (
              <div className="cal-empty-note">No events in this period.</div>
            )}
          </>
        )}
      </div>
      <span className="sr-only" role="status">
        {notice}
      </span>
      <Sheet
        open={!!position.selectedId && !draft}
        onOpenChange={(open) => {
          if (!open) onPositionChange({ ...position, selectedId: null });
        }}
      >
        <SheetContent
          className="cal-details"
          finalFocus={() => {
            restoreFocus();
            return false;
          }}
        >
          <SheetHeader>
            <SheetTitle>
              <span
                className="cal-detail-title"
                data-color={selected?.color ?? "accent"}
              >
                <i className="cal-agenda-dot" aria-hidden="true" />
                {selected?.title || "Event unavailable"}
              </span>
            </SheetTitle>
            <SheetDescription>
              {selected
                ? formatEventTime(selected, timeZone, locale, hour12)
                : "This event is no longer available in the local dataset."}
            </SheetDescription>
          </SheetHeader>
          {selected && (
            <div className="cal-details-body">
              <div className="cal-detail-fact">
                <Clock size={18} />
                <div>
                  {selected.allDay
                    ? "All day"
                    : `Event timezone: ${selected.timeZone}`}{" "}
                  {!selected.allDay && (
                    <small>
                      {formatEventTime(selected, selected.timeZone, locale, hour12)} ·
                      UTC
                      {
                        Temporal.Instant.from(
                          selected.start,
                        ).toZonedDateTimeISO(selected.timeZone).offset
                      }
                    </small>
                  )}
                </div>
              </div>
              {selected.description && (
                <p className="cal-description">{selected.description}</p>
              )}
              {renderEventExtra?.(selected)}
            </div>
          )}
          <SheetFooter>
            {selected && canEdit && (
              <Button
                icon={<Pencil />}
                onClick={() => setDraft(draftFromEvent(selected, timeZone))}
              >
                Edit event
              </Button>
            )}
            {selected && canDelete && (
              <Button
                variant="outline"
                icon={<Trash2 />}
                onClick={() => {
                  deletedFocus.current = false;
                  setDeleteError("");
                  setDeleting(true);
                }}
              >
                Delete event
              </Button>
            )}
            {!selected && (
              <Button
                variant="outline"
                onClick={() =>
                  onPositionChange({ ...position, selectedId: null })
                }
              >
                Return to calendar
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {draft && (
        <EventEditor
          timeZones={timeZones}
          key={draft.id}
          initialDraft={draft}
          isNew={isNew}
          onDirtyChange={markDirty}
          onRequestClose={() => void closeEditor()}
          onSave={async (event) => {
            mutationPending.current = true;
            try {
              await onSave?.(event);
            } finally {
              mutationPending.current = false;
            }
            markDirty(false);
            setDraft(null);
            onPositionChange({ ...position, selectedId: event.id });
            setNotice(isNew ? "Event created" : "Event updated");
          }}
        />
      )}
      <AlertDialog
        open={discard}
        onOpenChange={(open) => {
          if (!open) finishDiscard(false);
        }}
      >
        <AlertDialogContent className="cal-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Your changes have not been saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => finishDiscard(false)}>
              Keep editing
            </Button>
            <Button variant="destructive" onClick={() => finishDiscard(true)}>
              Discard changes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={deleting}
        onOpenChange={(open) => {
          if (!busy) setDeleting(open);
        }}
      >
        <AlertDialogContent
          className="cal-confirm"
          finalFocus={() => {
            if (deletedFocus.current) {
              deletedFocus.current = false;
              restoreFocus();
              return false;
            }
            return true;
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete event?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete “{selected?.title}” from this local calendar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && <p role="alert">{deleteError}</p>}
          <AlertDialogFooter>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => setDeleting(false)}
            >
              Keep event
            </Button>
            <Button
              variant="destructive"
              loading={busy}
              onClick={async () => {
                if (!selected) return;
                setBusy(true);
                try {
                  mutationPending.current = true;
                  try {
                    await onDelete?.(selected.id);
                  } finally {
                    mutationPending.current = false;
                  }
                  deletedFocus.current = true;
                  setDeleting(false);
                  onPositionChange({ ...position, selectedId: null });
                  setNotice("Event deleted");
                } catch (e) {
                  setDeleteError(
                    e instanceof Error ? e.message : "Could not delete event",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
