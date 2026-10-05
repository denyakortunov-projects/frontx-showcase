import { useState } from "react";
import { Temporal } from "temporal-polyfill";
import { Button } from "@gears-frontx/ui-kit/button";
import { Calendar } from "@gears-frontx/ui-kit/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@gears-frontx/ui-kit/popover";
import { ChevronLeft, ChevronRight, ChevronDown, Plus } from "lucide-react";
import { CalendarViewSwitch } from "./appearance";
import type { CalendarView } from "./types";
import type { RefObject } from "react";
export function CalendarToolbar({
  date,
  view,
  locale,
  onDate,
  onShift,
  onToday,
  onView,
  onCreate,
  canEdit,
  todayRef,
}: {
  date: string;
  view: CalendarView;
  locale: string;
  onDate: (date: string) => void;
  onShift: (direction: number) => void;
  onToday: () => void;
  onView: (view: CalendarView) => void;
  onCreate: () => void;
  canEdit: boolean;
  todayRef: RefObject<HTMLButtonElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const d = Temporal.PlainDate.from(date);
  const title =
    view === "year"
      ? String(d.year)
      : d.toLocaleString(locale, { month: "long", year: "numeric" });
  return (
    <div className="cal-toolbar">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={<Button variant="ghost" className="cal-date-title" />}
        >
          <span>{title}</span>
          <ChevronDown size={14} />
        </PopoverTrigger>
        <PopoverContent
          className="cal-date-picker"
          aria-label="Choose calendar date"
        >
          <Calendar
            mode="single"
            selected={new Date(`${date}T12:00:00`)}
            defaultMonth={new Date(`${date}T12:00:00`)}
            weekStartsOn={1}
            onSelect={(d) => {
              if (d) {
                onDate(
                  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
                );
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
      <CalendarViewSwitch value={view} onChange={onView} />
      <div className="cal-toolbar-actions">
        <div className="cal-period-nav">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Previous period"
            icon={<ChevronLeft />}
            onClick={() => onShift(-1)}
          />
          <Button ref={todayRef} variant="ghost" size="sm" onClick={onToday}>
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Next period"
            icon={<ChevronRight />}
            onClick={() => onShift(1)}
          />
        </div>
        {canEdit && (
          <Button
            className="cal-new-event"
            size="sm"
            icon={<Plus />}
            onClick={onCreate}
          >
            New event
          </Button>
        )}
      </div>
    </div>
  );
}
