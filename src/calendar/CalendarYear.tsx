import { useMemo } from "react";
import { Calendar, CalendarDayButton } from "@gears-frontx/ui-kit/calendar";
import type { CalendarEvent } from "./types";
import { localParts, addDays, eventInRange } from "./model";
export function CalendarYear({
  date,
  events,
  timeZone,
  now,
  onSelectDate,
}: {
  date: string;
  events: CalendarEvent[];
  timeZone: string;
  now: string;
  onSelectDate: (date: string) => void;
}) {
  const year = Number(date.slice(0, 4));
  const today = localParts(now, timeZone).date;
  // Index only the visible year once, rather than filter every event in every day button.
  const byDay = useMemo(() => {
    const result = new Map<string, CalendarEvent[]>();
    for (
      let day = `${year}-01-01`;
      day < `${year + 1}-01-01`;
      day = addDays(day, 1)
    ) {
      const matches = events.filter((e) =>
        eventInRange(e, day, addDays(day, 1), timeZone),
      );
      if (matches.length) result.set(day, matches);
    }
    return result;
  }, [events, timeZone, year]);
  return (
    <div className="cal-year" aria-label={`${year} year overview`}>
      {Array.from({ length: 12 }, (_, i) => {
        const month = new Date(year, i, 1, 12);
        return (
          <section
            className="cal-year-month"
            key={i}
            aria-label={month.toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          >
            <Calendar
              className="cal-mini-month"
              classNames={{
                month: "cal-mini-content",
                month_caption: "cal-mini-caption",
                week: "cal-mini-week",
                day: "cal-mini-cell",
                weekday: "cal-mini-weekday",
              }}
              formatters={{
                formatCaption: (d) =>
                  d.toLocaleDateString("en-GB", { month: "long" }),
              }}
              mode="single"
              month={month}
              hideNavigation
              showOutsideDays={false}
              fixedWeeks
              weekStartsOn={1}
              today={new Date(`${today}T12:00:00`)}
              selected={new Date(`${date}T12:00:00`)}
              onSelect={(d) => {
                if (d)
                  onSelectDate(
                    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
                  );
              }}
              components={{
                DayButton: (props) => {
                  const d = props.day.date;
                  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                  const matches = byDay.get(key) || [];
                  return (
                    <CalendarDayButton
                      {...props}
                      className="cal-year-day"
                      aria-label={`${props["aria-label"]}, ${matches.length} events`}
                    >
                      <span>{d.getDate()}</span>
                      {matches.length > 0 && (
                        <span className="cal-year-dots" aria-hidden="true">
                          {Array.from(
                            new Set(matches.map((e) => e.color ?? "accent")),
                          )
                            .slice(0, 3)
                            .map((color) => (
                              <i key={color} data-color={color} />
                            ))}
                        </span>
                      )}
                    </CalendarDayButton>
                  );
                },
              }}
            />
          </section>
        );
      })}
    </div>
  );
}
