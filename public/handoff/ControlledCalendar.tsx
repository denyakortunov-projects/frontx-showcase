"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@gears-frontx/ui-kit/button";
import {
  EventCalendar,
  type CalendarEvent,
  type CalendarPosition,
} from "../index";

// A compiling host recipe. Replace these in-memory callbacks with your adapter.
export function ControlledCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "example-1",
      title: "Design review",
      allDay: false,
      color: "violet",
      start: "2026-10-05T09:00:00+08:00",
      end: "2026-10-05T10:00:00+08:00",
      timeZone: "Asia/Singapore",
    },
  ]);
  const [position, setPosition] = useState<CalendarPosition>({
    date: "2026-10-05",
    view: "week",
    agendaSpan: "week",
    selectedId: null,
  });
  const guard = useRef<null | (() => Promise<boolean>)>(null);
  const registerGuard = useCallback((next: (() => Promise<boolean>) | null) => {
    guard.current = next;
  }, []);
  const [mounted, setMounted] = useState(true);
  return (
    <>
      <Button
        variant="outline"
        onClick={async () => {
          if (!guard.current || (await guard.current()))
            setMounted((value) => !value);
        }}
      >
        {mounted ? "Leave calendar" : "Open calendar"}
      </Button>
      {mounted && (
        <EventCalendar
          events={events}
          position={position}
          onPositionChange={setPosition}
          onSave={async (event) => {
            // await api.save(event); Throw/reject to keep the draft and show an error.
            setEvents((previous) => [
              ...previous.filter((item) => item.id !== event.id),
              event,
            ]);
          }}
          onDelete={async (id) => {
            // await api.delete(id);
            setEvents((previous) =>
              previous.filter((event) => event.id !== id),
            );
          }}
          registerNavigationGuard={registerGuard}
          timeZone="Asia/Singapore"
          now="2026-10-05T00:10:00Z"
          height={640}
        />
      )}
    </>
  );
}
