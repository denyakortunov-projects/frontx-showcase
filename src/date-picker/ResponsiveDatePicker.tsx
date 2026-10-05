"use client";

import { useEffect, useState } from "react";
import { DatePicker, type DatePickerProps } from "@gears-frontx/ui-kit/date-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@gears-frontx/ui-kit/popover";
import { Button } from "@gears-frontx/ui-kit/button";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useDatePreferences } from "./date-preferences";
import { DateCalendar } from "./DateCalendar";
import "./date-picker.css";

export type ResponsiveDatePickerProps = DatePickerProps & {
  /** Navigation bounds, independent of disabled-day validation. Defaults to 1900–2100. */
  localeCode?: string;
  startMonth?: Date;
  endMonth?: Date;
  /** Host-supplied footer label, e.g. for localization. */
  doneLabel?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  clearLabel?: string;
  rangeHint?: string;
};

/** Controlled FrontX composition; selected dates stay in the consuming form. */
export function ResponsiveDatePicker(props: ResponsiveDatePickerProps) {
  const preferences = useDatePreferences({locale: props.localeCode ?? props.locale?.code, weekStartsOn: props.weekStartsOn});
  const [narrow, setNarrow] = useState(true);
  const [internalOpen, setInternalOpen] = useState(props.defaultOpen ?? false);
  const selectedDate = props.mode === "range" ? props.selected?.from : props.selected;
  const [month, setMonth] = useState(selectedDate ?? new Date());
  const timestamp = selectedDate?.getTime();
  useEffect(() => {
    if (selectedDate) setMonth(selectedDate);
  }, [timestamp]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const sync = () => setNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const open = props.open ?? internalOpen;
  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    props.onOpenChange?.(value);
    if (value && selectedDate) setMonth(selectedDate);
  };
  const className = `frontx-date-picker ${props.className ?? ""}`;
  // Preserve the installed kit's locale-formatted input parsing contract.
  if (props.mode !== "range" && props.variant === "input") {
    return <DatePicker {...props} className={className} />;
  }
  const format = (date: Date, withYear = true) => date.toLocaleDateString(preferences.locale, {
    calendar: "gregory",
    month: "short", day: "numeric", ...(withYear ? { year: "numeric" } : {}),
  });
  const text = props.mode === "range"
    ? props.selected?.from
      ? `${format(props.selected.from)}${props.selected.to ? ` – ${format(props.selected.to)}` : ""}`
      : props.placeholder ?? "Choose dates"
    : props.selected ? format(props.selected) : props.placeholder ?? "Choose a date";
  const common = {
    month, onMonthChange: setMonth,
    captionLayout: props.captionLayout,
    startMonth: props.startMonth, endMonth: props.endMonth,
    disabled: props.disabled, locale: props.locale, localeCode: preferences.locale, autoFocus: true,
    weekStartsOn: preferences.weekStartsOn,
  } as const;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={
        <Button variant="outline" id={props.id} className={className}
          aria-label={props["aria-label"]} icon={<CalendarDays />} data-empty={!selectedDate || undefined} />
      }>
        <span>{text}</span><ChevronDown className="date-trigger-chevron" size={14} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="frontx-date-popup" align="start" container={props.container} collisionPadding={12}
        aria-label={props["aria-label"] ?? (props.mode === "range" ? "Choose dates" : "Choose a date")}>
        {props.mode === "range" ? (
          <DateCalendar {...common} mode="range" selected={props.selected}
            numberOfMonths={narrow ? 1 : (props.numberOfMonths ?? 2)}
            onSelect={(_range, day) => {
              const from = props.selected?.from;
              // A complete range starts a new two-click selection; a second click completes it.
              const range = !from || props.selected?.to
                ? { from: day, to: undefined }
                : day < from ? { from: day, to: from } : { from, to: day };
              props.onSelect(range);
              if (props.closeOnSelect && range.to) setOpen(false);
            }} />
        ) : (
          <DateCalendar {...common} mode="single" selected={props.selected}
            onSelect={(date) => {
              props.onSelect(date);
              if (props.closeOnSelect ?? true) setOpen(false);
            }} />
        )}
        {props.mode === "range" && (
          <div className="date-popup-footer">
            <Button size="sm" variant="ghost" disabled={!props.selected?.from} onClick={() => props.onSelect(undefined)}>{props.clearLabel ?? "Clear"}</Button>
            <output aria-live="polite">{props.selected?.from && props.selected.to ? `${format(props.selected.from)} – ${format(props.selected.to)}` : props.rangeHint ?? "Choose start and end dates"}</output>
            <Button size="sm" disabled={!props.selected?.from || !props.selected.to} onClick={() => setOpen(false)}>{props.doneLabel ?? "Done"}</Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
export type { DatePickerProps } from "@gears-frontx/ui-kit/date-picker";
