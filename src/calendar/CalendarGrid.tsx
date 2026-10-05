import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type SyntheticEvent,
} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import luxonPlugin from "@fullcalendar/luxon3";
import { Temporal } from "temporal-polyfill";
import type { CalendarEvent, CalendarDensity } from "./types";
import { localParts, addDays, eventInRange, formatEventTime } from "./model";
import { Button } from "@gears-frontx/ui-kit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@gears-frontx/ui-kit/dialog";
const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, luxonPlugin];
export function CalendarGrid({
  events,
  date,
  view,
  timeZone,
  density,
  height,
  selectedId,
  onSelect,
  onCreate,
  readOnly,
  now,
  locale,
  scrollStore,
}: {
  events: CalendarEvent[];
  date: string;
  view: "day" | "week" | "month";
  timeZone: string;
  density: CalendarDensity;
  height: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: (date: string, allDay: boolean, time?: string) => void;
  readOnly: boolean;
  now: string;
  locale: string;
  scrollStore: Map<string, number>;
}) {
  const helpId = useId();
  const [overflowDate, setOverflowDate] = useState<string | null>(null);
  const ref = useRef<FullCalendar>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [slot, setSlot] = useState({ date, time: "09:00", allDay: false });
  const [keyboard, setKeyboard] = useState(false);
  const key = `${view}:${date}`;
  const data = useMemo(
    () =>
      events.map((e) => ({
        id: e.id,
        title: e.title,
        allDay: e.allDay,
        start: e.allDay ? e.startDate : e.start,
        end: e.allDay ? e.endDate : e.end,
        extendedProps: { color: e.color ?? "accent" },
      })),
    [events],
  );
  useEffect(() => {
    const api = ref.current?.getApi();
    if (!api) return;
    api.changeView(
      view === "month"
        ? "dayGridMonth"
        : view === "week"
          ? "timeGridWeek"
          : "timeGridDay",
      date,
    );
    setSlot({ date, time: "09:00", allDay: false });
  }, [view, date]);
  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const restore = requestAnimationFrame(() => {
      const el = node.querySelector<HTMLElement>(
        ".fc-scroller-liquid-absolute",
      );
      if (el) el.scrollTop = scrollStore.get(key) ?? el.scrollTop;
    });
    const capture = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.matches(".fc-scroller-liquid-absolute"))
        scrollStore.set(key, el.scrollTop);
    };
    node.addEventListener("scroll", capture, true);
    return () => {
      cancelAnimationFrame(restore);
      node.removeEventListener("scroll", capture, true);
    };
  }, [key, scrollStore]);
  const openOverflow = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest(".fc-more-link");
    if (!link) return;
    const day = link.closest<HTMLElement>("[data-date]")?.dataset.date;
    if (!day) return;
    e.preventDefault();
    e.stopPropagation();
    setOverflowDate(day);
  };
  return (
    <>
      <div
        ref={wrap}
        className={`cal-grid cal-grid-${view}`}
        tabIndex={0}
        role="group"
        aria-label="Time grid"
        aria-describedby={helpId}
        onClickCapture={openOverflow}
        onKeyDownCapture={(e) => {
          if (e.key === "Enter" || e.key === " ") openOverflow(e);
        }}
        onFocus={(e) => {
          if (e.target === e.currentTarget) setKeyboard(true);
        }}
        onBlur={() => setKeyboard(false)}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (
            [
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
              "Home",
              "End",
              "Enter",
              " ",
            ].includes(e.key)
          )
            e.preventDefault();
          else return;
          if (e.key === "Enter" || e.key === " ") {
            if (!readOnly)
              onCreate(slot.date, view === "month" || slot.allDay, slot.time);
            return;
          }
          setSlot((prev) => {
            if (e.key === "Home") return { ...prev, allDay: true };
            if (e.key === "End")
              return { ...prev, allDay: false, time: "23:30" };
            if (e.key === "ArrowLeft" || e.key === "ArrowRight")
              return {
                ...prev,
                date: addDays(prev.date, e.key === "ArrowLeft" ? -1 : 1),
              };
            if (view === "month")
              return {
                ...prev,
                date: addDays(prev.date, e.key === "ArrowUp" ? -7 : 7),
              };
            const t = Temporal.PlainTime.from(prev.time)
              .add({ minutes: e.key === "ArrowUp" ? -30 : 30 })
              .toString({ smallestUnit: "minute" });
            return { ...prev, time: t, allDay: false };
          });
        }}
      >
        <span id={helpId} className="sr-only">
          {view === "month"
            ? "Use arrows to choose a date. Enter creates an all-day event. Tab moves to events."
            : "Use arrows to choose a date and half-hour. Home selects all day. Enter creates an event. Tab moves to events."}
        </span>
        {keyboard && (
          <div className="cal-slot-status" role="status">
            {slot.date} · {slot.allDay ? "All day" : slot.time} ·{" "}
            {readOnly ? "Read only" : "Enter to create"}
          </div>
        )}
        <FullCalendar
          ref={ref}
          plugins={plugins}
          initialView={
            view === "month"
              ? "dayGridMonth"
              : view === "week"
                ? "timeGridWeek"
                : "timeGridDay"
          }
          initialDate={date}
          events={data}
          timeZone={timeZone}
          locale={locale}
          now={now}
          headerToolbar={false}
          height={height}
          firstDay={1}
          allDaySlot
          slotDuration="00:30:00"
          scrollTime={
            scrollStore.has(key)
              ? {
                  milliseconds:
                    (scrollStore.get(key)! /
                      (density === "compact" ? 28 : 36)) *
                    30 *
                    60 *
                    1000,
                }
              : "08:00:00"
          }
          scrollTimeReset={false}
          slotEventOverlap={false}
          eventMaxStack={3}
          dayMaxEvents={view === "month" ? 2 : 3}
          eventDisplay="block"
          fixedWeekCount={false}
          expandRows={false}
          editable={false}
          selectable={false}
          eventInteractive
          eventMinHeight={24}
          nowIndicator={false}
          weekends
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          dayHeaderContent={(info) => (
            <span className="cal-day-heading">
              <span>
                {info.date.toLocaleDateString(locale, {
                  weekday: "short",
                  timeZone,
                })}
              </span>
              {view !== "month" && (
                <strong>
                  {info.date.toLocaleDateString(locale, {
                    day: "numeric",
                    timeZone,
                  })}
                </strong>
              )}
            </span>
          )}
          eventClassNames={(info) => [
            "cal-event",
            ...(selectedId === info.event.id ? ["is-selected"] : []),
          ]}
          eventContent={(info) => (
            <div
              className="cal-event-body"
              ref={(node) => {
                // FullCalendar keeps event elements mounted when event data changes.
                const element = node?.closest<HTMLElement>(".fc-event");
                if (element) {
                  element.dataset.eventId = info.event.id;
                  element.dataset.color = info.event.extendedProps.color;
                  element.setAttribute(
                    "aria-label",
                    `${info.event.title}, ${info.timeText || "All day"}`,
                  );
                }
              }}
            >
              <span className="cal-event-time">
                {info.event.allDay
                  ? ""
                  : info.isStart
                    ? localParts(info.event.start!.toISOString(), timeZone).time
                    : "00:00"}
              </span>
              <strong>
                {!info.isStart ? "↳ " : ""}
                {info.event.title}
                {!info.isEnd ? " ↗" : ""}
              </strong>
            </div>
          )}
          eventClick={(info) => onSelect(info.event.id)}
          dateClick={(info) => {
            if (readOnly) return;
            const p = info.allDay
              ? { date: info.dateStr, time: undefined }
              : localParts(info.date.toISOString(), timeZone);
            onCreate(p.date, info.allDay, p.time);
          }}
        />
      </div>
      <Dialog
        open={!!overflowDate}
        onOpenChange={(open) => {
          if (!open) setOverflowDate(null);
        }}
      >
        <DialogContent className="cal-overflow">
          <DialogHeader>
            <DialogTitle>Events on {overflowDate}</DialogTitle>
            <DialogDescription>All events for this date.</DialogDescription>
          </DialogHeader>
          <div className="cal-overflow-list">
            {overflowDate &&
              events
                .filter((event) =>
                  eventInRange(
                    event,
                    overflowDate,
                    addDays(overflowDate, 1),
                    timeZone,
                  ),
                )
                .map((event) => (
                  <Button
                    key={event.id}
                    variant="ghost"
                    data-event-id={event.id}
                    data-color={event.color ?? "accent"}
                    className="cal-overflow-event"
                    onClick={() => {
                      setOverflowDate(null);
                      onSelect(event.id);
                    }}
                  >
                    <span>
                      <strong>{event.title}</strong>
                      <small>{formatEventTime(event, timeZone, locale)}</small>
                    </span>
                  </Button>
                ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
