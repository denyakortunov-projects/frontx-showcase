"use client";

import { useEffect, useState } from "react";
import { Calendar, type CalendarProps } from "@gears-frontx/ui-kit/calendar";
import { useDatePreferences } from "./date-preferences";
import "./date-picker.css";

/** FrontX Calendar with one shared date-selection surface and direct month/year navigation. */
export type DateCalendarProps = CalendarProps & { localeCode?: string };
export function DateCalendar({localeCode, ...props}: DateCalendarProps) {
  const preferences = useDatePreferences({locale: localeCode ?? props.locale?.code, weekStartsOn: props.weekStartsOn});
  const selected = "selected" in props ? props.selected : undefined;
  const anchor = selected instanceof Date ? selected : selected && "from" in selected ? selected.from : undefined;
  const [visibleMonth, setVisibleMonth] = useState(props.defaultMonth ?? anchor ?? new Date());
  const selectedTime = anchor?.getTime();
  useEffect(() => { if (anchor) setVisibleMonth(anchor); }, [selectedTime]);
  const year = (props.month ?? props.defaultMonth ?? anchor ?? new Date()).getFullYear();
  return (
    <Calendar
      {...props}
      month={props.month ?? visibleMonth}
      onMonthChange={(month) => { setVisibleMonth(month); props.onMonthChange?.(month); }}
      captionLayout={props.captionLayout ?? "dropdown"}
      startMonth={props.startMonth ?? new Date(Math.min(1900, year), 0)}
      endMonth={props.endMonth ?? new Date(Math.max(2100, year), 11)}
      lang={preferences.locale}
      labels={{
        ...(!preferences.locale.startsWith("en") ? {
          labelGrid: (date: Date) => date.toLocaleDateString(preferences.locale, {month:"long",year:"numeric",calendar:"gregory"}),
          labelDayButton: (date: Date) => date.toLocaleDateString(preferences.locale, {weekday:"long",day:"numeric",month:"long",year:"numeric",calendar:"gregory"}),
        } : {}),
        ...props.labels,
      }}
      weekStartsOn={preferences.weekStartsOn}
      formatters={{
        formatCaption: date => date.toLocaleDateString(preferences.locale, {month: "long", year:"numeric", calendar:"gregory"}),
        formatMonthDropdown: date => date.toLocaleDateString(preferences.locale, {month:"short", calendar:"gregory"}),
        formatWeekdayName: date => date.toLocaleDateString(preferences.locale, {weekday:"short", calendar:"gregory"}),
        ...props.formatters,
      }}
      navLayout={props.navLayout ?? "after"}
      className={`frontx-date-calendar ${props.className ?? ""}`}
      classNames={{
        months: "date-months",
        month: "date-month",
        nav: "date-nav",
        button_previous: "date-nav-button",
        button_next: "date-nav-button",
        month_caption: "date-caption",
        dropdowns: "date-dropdowns",
        dropdown_root: "date-dropdown-root",
        dropdown: "date-dropdown",
        caption_label: "date-caption-label",
        month_grid: "date-grid",
        weekdays: "date-weekdays",
        weekday: "date-weekday",
        week: "date-week",
        day: "date-day",
        today: "date-today",
        outside: "date-outside",
        disabled: "date-disabled",
        hidden: "date-hidden",
        range_start: "date-range-start",
        range_middle: "date-range-middle",
        range_end: "date-range-end",
        ...props.classNames,
      }}
    />
  );
}
export type { CalendarProps } from "@gears-frontx/ui-kit/calendar";
