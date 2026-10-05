import { Temporal } from "temporal-polyfill";
import type { CalendarEvent, EventDraft } from "./types.ts";

export function validDate(value: string): boolean {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  try {
    Temporal.PlainDate.from(value);
    return true;
  } catch {
    return false;
  }
}

export function validZone(value: string): boolean {
  if (typeof value !== "string" || value === "") return false;
  try {
    if (/^[+-]/.test(value)) return false;
    Temporal.Instant.from("2026-01-01T00:00Z").toZonedDateTimeISO(value);
    return true;
  } catch {
    return false;
  }
}

export function addDays(date: string, days: number): string {
  return Temporal.PlainDate.from(date).add({ days }).toString();
}

export function weekStart(date: string, firstDay = 1): string {
  const d = Temporal.PlainDate.from(date);
  const dow = d.dayOfWeek;
  return d.subtract({ days: (dow - firstDay + 7) % 7 }).toString();
}

export function rangeFor(
  date: string,
  span: "day" | "week" | "month" | "year",
  firstDay = 1,
): { start: string; end: string } {
  if (span === "month" || span === "year") {
    const start = Temporal.PlainDate.from(date).with(
      span === "month" ? { day: 1 } : { month: 1, day: 1 },
    );
    return {
      start: start.toString(),
      end: start
        .add(span === "month" ? { months: 1 } : { years: 1 })
        .toString(),
    };
  }
  if (span === "day") {
    return { start: date, end: addDays(date, 1) };
  }
  const start = weekStart(date, firstDay);
  return { start, end: addDays(start, 7) };
}

export function localParts(
  instant: string,
  zone: string,
): { date: string; time: string } {
  const zdt = Temporal.Instant.from(instant).toZonedDateTimeISO(zone);
  const date = zdt.toPlainDate().toString();
  const time = zdt.toPlainTime().toString({ smallestUnit: "minute" });
  return { date, time };
}

export function resolveLocal(
  date: string,
  time: string,
  zone: string,
  choice: "" | "earlier" | "later" = "",
): { instant?: string; error?: string; ambiguous?: boolean } {
  if (!validZone(zone)) return { error: "Invalid timezone" };
  if (!validDate(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time))
    return { error: "Invalid date or time" };
  let pdt: Temporal.PlainDateTime;
  try {
    pdt = Temporal.PlainDateTime.from(`${date}T${time}`);
  } catch {
    return { error: "Invalid date or time" };
  }
  const earlierZdt = pdt.toZonedDateTime(zone, { disambiguation: "earlier" });
  const laterZdt = pdt.toZonedDateTime(zone, { disambiguation: "later" });
  const earlierPdt = earlierZdt.toPlainDateTime();
  const laterPdt = laterZdt.toPlainDateTime();
  const isGap = Temporal.PlainDateTime.compare(earlierPdt, pdt) !== 0;
  if (isGap) {
    return { error: "Time falls in DST gap" };
  }
  const isAmbiguous =
    Temporal.Instant.compare(earlierZdt.toInstant(), laterZdt.toInstant()) !==
    0;
  if (isAmbiguous) {
    if (choice === "") {
      return {
        error: "Ambiguous time requires earlier/later choice",
        ambiguous: true,
      };
    }
    const chosen = choice === "earlier" ? earlierZdt : laterZdt;
    return { instant: chosen.toInstant().toString() };
  }
  return { instant: earlierZdt.toInstant().toString() };
}

function detectFoldChoice(
  instant: string,
  date: string,
  time: string,
  zone: string,
): "earlier" | "later" | "" {
  let pdt: Temporal.PlainDateTime;
  try {
    pdt = Temporal.PlainDateTime.from(`${date}T${time}`);
  } catch {
    return "";
  }
  const earlierZdt = pdt.toZonedDateTime(zone, { disambiguation: "earlier" });
  const laterZdt = pdt.toZonedDateTime(zone, { disambiguation: "later" });
  const isAmbiguous =
    Temporal.Instant.compare(earlierZdt.toInstant(), laterZdt.toInstant()) !==
    0;
  if (!isAmbiguous) return "";
  const inst = Temporal.Instant.from(instant);
  if (Temporal.Instant.compare(inst, earlierZdt.toInstant()) === 0)
    return "earlier";
  if (Temporal.Instant.compare(inst, laterZdt.toInstant()) === 0)
    return "later";
  return "";
}

export function draftFromEvent(event: CalendarEvent, zone: string): EventDraft {
  if (event.allDay) {
    const endInclusive = addDays(event.endDate, -1);
    return {
      id: event.id,
      title: event.title,
      color: event.color ?? "accent",
      description: event.description ?? "",
      allDay: true,
      startDate: event.startDate,
      endDate: endInclusive,
      startTime: "",
      endTime: "",
      timeZone: zone,
      startChoice: "",
      endChoice: "",
    };
  }
  const effectiveZone = validZone(event.timeZone) ? event.timeZone : zone;
  const startParts = localParts(event.start, effectiveZone);
  const endParts = localParts(event.end, effectiveZone);
  const startChoice = detectFoldChoice(
    event.start,
    startParts.date,
    startParts.time,
    effectiveZone,
  );
  const endChoice = detectFoldChoice(
    event.end,
    endParts.date,
    endParts.time,
    effectiveZone,
  );
  return {
    id: event.id,
    title: event.title,
    color: event.color ?? "accent",
    description: event.description ?? "",
    allDay: false,
    startDate: startParts.date,
    endDate: endParts.date,
    startTime: startParts.time,
    endTime: endParts.time,
    timeZone: effectiveZone,
    startChoice,
    endChoice,
  };
}

export function newDraft(
  date: string,
  zone: string,
  now: string,
  allDay = false,
  time?: string,
): EventDraft {
  const id = crypto.randomUUID();
  if (allDay) {
    return {
      id,
      title: "",
      color: "accent",
      description: "",
      allDay: true,
      startDate: date,
      endDate: date,
      startTime: "",
      endTime: "",
      timeZone: zone,
      startChoice: "",
      endChoice: "",
    };
  }
  let startTime: string;
  if (time !== undefined) {
    startTime = time;
  } else {
    const nowZdt = Temporal.Instant.from(now).toZonedDateTimeISO(zone);
    const nowDate = nowZdt.toPlainDate().toString();
    if (nowDate === date) {
      const mins = nowZdt.hour * 60 + nowZdt.minute;
      const nextHalf = Math.ceil((mins + 1) / 30) * 30;
      if (nextHalf >= 1440) date = addDays(date, 1);
      const h = Math.floor(nextHalf / 60) % 24;
      const m = nextHalf % 60;
      startTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    } else {
      startTime = "09:00";
    }
  }
  const startPdt = Temporal.PlainDateTime.from(`${date}T${startTime}`);
  const startZdt = startPdt.toZonedDateTime(zone);
  const endPdt = startZdt.add({ minutes: 30 }).toPlainDateTime();
  const endDate = endPdt.toPlainDate().toString();
  const endTime = endPdt.toPlainTime().toString({ smallestUnit: "minute" });
  return {
    id,
    title: "",
    color: "accent",
    description: "",
    allDay: false,
    startDate: date,
    endDate,
    startTime,
    endTime,
    timeZone: zone,
    startChoice: "",
    endChoice: "",
  };
}

export function validateDraft(draft: EventDraft): {
  event?: CalendarEvent;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  const trimmedTitle = draft.title.trim();
  if (!trimmedTitle) errors.title = "Title is required";
  if (!validDate(draft.startDate)) errors.start = "Invalid start date";
  if (!validDate(draft.endDate)) errors.end = "Invalid end date";
  if (draft.allDay) {
    if (!errors.start && !errors.end) {
      const cmp = Temporal.PlainDate.compare(
        Temporal.PlainDate.from(draft.endDate),
        Temporal.PlainDate.from(draft.startDate),
      );
      if (cmp < 0) errors.end = "End must be on or after start";
    }
    if (Object.keys(errors).length > 0) return { errors };
    const endExclusive = addDays(draft.endDate, 1);
    return {
      event: {
        id: draft.id,
        title: trimmedTitle,
        color: draft.color ?? "accent",
        description: draft.description || undefined,
        allDay: true,
        startDate: draft.startDate,
        endDate: endExclusive,
      },
      errors: {},
    };
  }
  if (!validZone(draft.timeZone)) errors.timeZone = "Invalid timezone";
  if (Object.keys(errors).length > 0) return { errors };
  const startRes = resolveLocal(
    draft.startDate,
    draft.startTime,
    draft.timeZone,
    draft.startChoice,
  );
  if (startRes.error) {
    errors.start = startRes.error;
  }
  const endRes = resolveLocal(
    draft.endDate,
    draft.endTime,
    draft.timeZone,
    draft.endChoice,
  );
  if (endRes.error) {
    errors.end = endRes.error;
  }
  if (Object.keys(errors).length > 0) return { errors };
  const startInst = Temporal.Instant.from(startRes.instant!);
  const endInst = Temporal.Instant.from(endRes.instant!);
  if (Temporal.Instant.compare(endInst, startInst) <= 0) {
    errors.end = "End must be after start";
    return { errors };
  }
  return {
    event: {
      id: draft.id,
      title: trimmedTitle,
      color: draft.color ?? "accent",
      description: draft.description || undefined,
      allDay: false,
      start: startRes.instant!,
      end: endRes.instant!,
      timeZone: draft.timeZone,
    },
    errors: {},
  };
}

export function eventInRange(
  event: CalendarEvent,
  startDate: string,
  endDate: string,
  zone: string,
): boolean {
  if (event.allDay) {
    return event.startDate < endDate && event.endDate > startDate;
  }
  const rangeStartInst = Temporal.PlainDate.from(startDate)
    .toZonedDateTime({ timeZone: zone, plainTime: "00:00" })
    .toInstant();
  const rangeEndInst = Temporal.PlainDate.from(endDate)
    .toZonedDateTime({ timeZone: zone, plainTime: "00:00" })
    .toInstant();
  const evStart = Temporal.Instant.from(event.start);
  const evEnd = Temporal.Instant.from(event.end);
  return (
    Temporal.Instant.compare(evStart, rangeEndInst) < 0 &&
    Temporal.Instant.compare(evEnd, rangeStartInst) > 0
  );
}

export function formatEventTime(
  event: CalendarEvent,
  zone: string,
  locale = "en-GB",
  hour12 = false,
): string {
  if (event.allDay) {
    const start = Temporal.PlainDate.from(event.startDate);
    const endIncl = Temporal.PlainDate.from(event.endDate).subtract({
      days: 1,
    });
    const fmt = (d: Temporal.PlainDate) =>
      d.toLocaleString(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    if (start.equals(endIncl)) return fmt(start);
    return `${fmt(start)} – ${fmt(endIncl)}`;
  }
  const startZdt = Temporal.Instant.from(event.start).toZonedDateTimeISO(zone);
  const endZdt = Temporal.Instant.from(event.end).toZonedDateTimeISO(zone);
  const fmtDate = (zdt: Temporal.ZonedDateTime) =>
    zdt.toPlainDate().toLocaleString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  const fmtTime = (zdt: Temporal.ZonedDateTime) =>
    zdt.toPlainTime().toLocaleString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: hour12 ? "h12" : "h23",
    });
  const sameDay = startZdt.toPlainDate().equals(endZdt.toPlainDate());
  const tzName = zone;
  if (sameDay) {
    return `${fmtDate(startZdt)}, ${fmtTime(startZdt)}–${fmtTime(endZdt)} (${tzName})`;
  }
  return `${fmtDate(startZdt)} ${fmtTime(startZdt)} – ${fmtDate(endZdt)} ${fmtTime(endZdt)} (${tzName})`;
}

export function changeDraftZone(
  draft: EventDraft,
  newZone: string,
): EventDraft {
  if (draft.allDay) {
    return { ...draft, timeZone: newZone };
  }
  const startRes = resolveLocal(
    draft.startDate,
    draft.startTime,
    draft.timeZone,
    draft.startChoice,
  );
  const endRes = resolveLocal(
    draft.endDate,
    draft.endTime,
    draft.timeZone,
    draft.endChoice,
  );
  if (!startRes.instant || !endRes.instant) {
    return { ...draft, timeZone: newZone, startChoice: "", endChoice: "" };
  }
  if (!validZone(newZone)) return { ...draft, timeZone: newZone };
  const newStartParts = localParts(startRes.instant, newZone);
  const newEndParts = localParts(endRes.instant, newZone);
  const newStartChoice = detectFoldChoice(
    startRes.instant,
    newStartParts.date,
    newStartParts.time,
    newZone,
  );
  const newEndChoice = detectFoldChoice(
    endRes.instant,
    newEndParts.date,
    newEndParts.time,
    newZone,
  );
  return {
    ...draft,
    startDate: newStartParts.date,
    endDate: newEndParts.date,
    startTime: newStartParts.time,
    endTime: newEndParts.time,
    timeZone: newZone,
    startChoice: newStartChoice,
    endChoice: newEndChoice,
  };
}

/** A day-list segment must not repeat yesterday's start time under today. */
export function formatAgendaTime(
  event: CalendarEvent,
  day: string,
  zone: string,
  locale = "en-GB",
  hour12 = false,
): string {
  if (event.allDay) return "All day";
  const start = localParts(event.start, zone);
  const end = localParts(event.end, zone);
  const continuesBefore = start.date < day;
  const continuesAfter =
    end.date > addDays(day, 1) || (end.date > day && end.time !== "00:00");
  const time = (value: string) => {
    if (value === "24:00" && !hour12) return "24:00";
    const [h, m] = value.split(":").map(Number);
    return new Date(2000, 0, 1, h % 24, m).toLocaleTimeString(locale, {hour:"2-digit", minute:"2-digit", hourCycle:hour12 ? "h12" : "h23"});
  };
  return `${continuesBefore ? "↳ " : ""}${time(continuesBefore ? "00:00" : start.time)} – ${time(end.date > day ? "24:00" : end.time)}${continuesAfter ? " ↗" : ""}`;
}
