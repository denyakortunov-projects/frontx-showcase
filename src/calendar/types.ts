import type { ReactNode } from "react";
export type CalendarView = "day" | "week" | "month" | "year" | "agenda";
export type CalendarDensity = "standard" | "compact";
export type EventColor =
  "accent" | "blue" | "teal" | "violet" | "amber" | "rose";
export type EventBase = {
  color?: EventColor;
  id: string;
  title: string;
  description?: string;
};
export type CalendarEvent = EventBase &
  (
    | { allDay: true; startDate: string; endDate: string }
    | { allDay: false; start: string; end: string; timeZone: string }
  );
export type EventDraft = {
  color?: EventColor;
  id: string;
  title: string;
  description: string;
  allDay: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  startChoice: "earlier" | "later" | "";
  endChoice: "earlier" | "later" | "";
};
export type CalendarPosition = {
  date: string;
  view: CalendarView;
  agendaSpan: "day" | "week";
  selectedId: string | null;
};
export type EventCalendarProps = {
  events: CalendarEvent[];
  position: CalendarPosition;
  onPositionChange: (position: CalendarPosition) => void;
  /** Awaited internally; throw/reject to retain the draft and report failure. Host updates events after success. */
  onSave?: (event: CalendarEvent) => void | Promise<void>;
  /** Awaited internally; throw/reject to keep the event and report failure. */
  onDelete?: (id: string) => void | Promise<void>;
  density?: CalendarDensity;
  height?: number;
  timeZone?: string;
  locale?: string;
  adaptive?: boolean;
  readOnly?: boolean;
  state?: "ready" | "loading" | "empty" | "error";
  now?: string;
  onRetry?: () => void;
  onDirtyChange?: (dirty: boolean) => void;
  registerNavigationGuard?: (guard: (() => Promise<boolean>) | null) => void;
  /** Optional host-owned scroll cache, retained across route remounts. */
  scrollPositions?: Map<string, number>;
  renderEventExtra?: (event: CalendarEvent) => ReactNode;
};
