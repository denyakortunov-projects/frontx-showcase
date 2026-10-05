import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  validDate,
  validZone,
  addDays,
  weekStart,
  rangeFor,
  localParts,
  resolveLocal,
  draftFromEvent,
  newDraft,
  validateDraft,
  eventInRange,
  formatEventTime,
  formatAgendaTime,
  changeDraftZone,
} from "../../src/calendar/model.ts";

describe("validDate", () => {
  it("accepts valid date", () => assert.equal(validDate("2024-03-15"), true));
  it("rejects invalid format", () =>
    assert.equal(validDate("2024-3-15"), false));
  it("rejects impossible date", () =>
    assert.equal(validDate("2024-02-30"), false));
});

describe("validZone", () => {
  it("accepts IANA zone", () => assert.equal(validZone("Europe/London"), true));
  it("rejects invalid", () => assert.equal(validZone("Mars/Olympus"), false));
});

describe("addDays/weekStart/rangeFor", () => {
  it("addDays works", () =>
    assert.equal(addDays("2024-03-01", 5), "2024-03-06"));
  it("weekStart Monday", () =>
    assert.equal(weekStart("2024-03-07"), "2024-03-04"));
  it("rangeFor week", () =>
    assert.deepEqual(rangeFor("2024-03-07", "week"), {
      start: "2024-03-04",
      end: "2024-03-11",
    }));
});

describe("resolveLocal DST gap", () => {
  it("rejects spring gap", () => {
    const r = resolveLocal("2024-03-31", "01:30", "Europe/London", "");
    assert.ok(r.error?.includes("gap"));
  });
  it("rejects gap even with choice", () => {
    const r = resolveLocal("2024-03-31", "01:30", "Europe/London", "earlier");
    assert.ok(r.error?.includes("gap"));
  });
});

describe("resolveLocal DST fold", () => {
  it("requires choice for fold", () => {
    const r = resolveLocal("2024-10-27", "01:30", "Europe/London", "");
    assert.equal(r.ambiguous, true);
    assert.ok(r.error?.includes("choice"));
  });
  it("earlier/later produce distinct instants", () => {
    const e = resolveLocal("2024-10-27", "01:30", "Europe/London", "earlier");
    const l = resolveLocal("2024-10-27", "01:30", "Europe/London", "later");
    assert.ok(e.instant && l.instant);
    assert.notEqual(e.instant, l.instant);
  });
});

describe("validateDraft", () => {
  it("requires title", () => {
    const draft = {
      id: "1",
      title: "  ",
      description: "",
      allDay: true,
      startDate: "2024-03-15",
      endDate: "2024-03-15",
      startTime: "",
      endTime: "",
      timeZone: "UTC",
      startChoice: "" as const,
      endChoice: "" as const,
    };
    const res = validateDraft(draft);
    assert.ok(res.errors.title);
  });
  it("end before start timed", () => {
    const draft = {
      id: "1",
      title: "Test",
      description: "",
      allDay: false,
      startDate: "2024-03-15",
      endDate: "2024-03-15",
      startTime: "14:00",
      endTime: "13:00",
      timeZone: "UTC",
      startChoice: "" as const,
      endChoice: "" as const,
    };
    const res = validateDraft(draft);
    assert.ok(res.errors.end);
  });
  it("all-day exclusive end", () => {
    const draft = {
      id: "1",
      title: "Test",
      description: "",
      allDay: true,
      startDate: "2024-03-15",
      endDate: "2024-03-16",
      startTime: "",
      endTime: "",
      timeZone: "UTC",
      startChoice: "" as const,
      endChoice: "" as const,
    };
    const res = validateDraft(draft);
    assert.ok(res.event);
    assert.equal((res.event as any).endDate, "2024-03-17");
  });
});

describe("eventInRange", () => {
  it("all-day zone invariant", () => {
    const ev = {
      id: "1",
      title: "T",
      allDay: true as const,
      startDate: "2024-03-15",
      endDate: "2024-03-16",
    };
    assert.equal(
      eventInRange(ev, "2024-03-15", "2024-03-16", "America/New_York"),
      true,
    );
    assert.equal(
      eventInRange(ev, "2024-03-16", "2024-03-17", "America/New_York"),
      false,
    );
  });
  it("timed midnight boundary half-open", () => {
    const ev = {
      id: "1",
      title: "T",
      allDay: false as const,
      start: "2024-03-15T00:00:00Z",
      end: "2024-03-15T01:00:00Z",
      timeZone: "UTC",
    };
    assert.equal(eventInRange(ev, "2024-03-15", "2024-03-16", "UTC"), true);
    assert.equal(eventInRange(ev, "2024-03-14", "2024-03-15", "UTC"), false);
  });
});

describe("draftFromEvent fold detection", () => {
  it("sets startChoice for fold event", () => {
    const ev = {
      id: "1",
      title: "T",
      allDay: false as const,
      start: "2024-10-27T01:30:00+01:00",
      end: "2024-10-27T02:30:00Z",
      timeZone: "Europe/London",
    };
    const d = draftFromEvent(ev, "UTC");
    assert.equal(d.startChoice, "earlier");
  });
});

describe("changeDraftZone preserves instant", () => {
  it("converts and preserves", () => {
    const draft = {
      id: "1",
      title: "T",
      description: "",
      allDay: false,
      startDate: "2024-06-15",
      endDate: "2024-06-15",
      startTime: "10:00",
      endTime: "11:00",
      timeZone: "Europe/London",
      startChoice: "" as const,
      endChoice: "" as const,
    };
    const changed = changeDraftZone(draft, "America/New_York");
    const origStart = resolveLocal(
      draft.startDate,
      draft.startTime,
      draft.timeZone,
      "",
    ).instant;
    const newStart = resolveLocal(
      changed.startDate,
      changed.startTime,
      changed.timeZone,
      "",
    ).instant;
    assert.equal(origStart, newStart);
  });
});

describe("newDraft late night rollover", () => {
  it("rolls next half-hour forward across midnight", () => {
    const d = newDraft("2024-03-15", "UTC", "2024-03-15T23:45:00Z");
    assert.equal(d.startDate, "2024-03-16");
    assert.equal(d.startTime, "00:00");
    assert.equal(d.endDate, "2024-03-16");
  });
});

describe("formatEventTime", () => {
  it("formats all-day single", () => {
    const ev = {
      id: "1",
      title: "T",
      allDay: true as const,
      startDate: "2024-03-15",
      endDate: "2024-03-16",
    };
    const s = formatEventTime(ev, "UTC");
    assert.ok(s.includes("15"));
  });
});

describe("agenda midnight segments", () => {
  const event = {
    id: "night",
    title: "Night",
    allDay: false as const,
    start: "2026-10-05T15:30:00Z",
    end: "2026-10-05T16:30:00Z",
    timeZone: "Asia/Singapore",
  };
  it("clips first day and indicates continuation", () =>
    assert.equal(
      formatAgendaTime(event, "2026-10-05", "Asia/Singapore"),
      "23:30 – 24:00 ↗",
    ));
  it("clips continuation start to midnight", () =>
    assert.equal(
      formatAgendaTime(event, "2026-10-06", "Asia/Singapore"),
      "↳ 00:00 – 00:30",
    ));
  it("does not claim continuation when ending at midnight", () =>
    assert.equal(
      formatAgendaTime(
        { ...event, end: "2026-10-05T16:00:00Z" },
        "2026-10-05",
        "Asia/Singapore",
      ),
      "23:30 – 24:00",
    ));
});
