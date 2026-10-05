import { SectionTabs } from "./showcase/SectionTabs";
import { useState } from "react";
import { Tabs, TabsTrigger } from "@gears-frontx/ui-kit/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@gears-frontx/ui-kit/select";
import { EventCalendar } from "./calendar/EventCalendar";
import {
  DEMO_DATE,
  DEMO_NOW,
  INITIAL_EVENTS,
  OVERLAP_EVENTS,
} from "./calendar/fixtures";
import type {
  CalendarEvent,
  CalendarPosition,
  CalendarView,
} from "./calendar/types";
import { validDate, validZone } from "./calendar/model";
import { useCalendarNavigationRegistration } from "./calendar/navigation";
const zones = [
  "Asia/Singapore",
  "UTC",
  "Europe/London",
  "America/New_York",
  "Europe/Berlin",
];
const demoStore = {
  events: [...INITIAL_EVENTS],
  deleted: new Set<string>(),
  scrollPositions: new Map<string, number>(),
};
function Embedded({ compact }: { compact: boolean }) {
  const registerGuard = useCalendarNavigationRegistration();
  const [events, setEvents] = useState([...INITIAL_EVENTS]);
  const [position, setPosition] = useState<CalendarPosition>({
    date: DEMO_DATE,
    view: compact ? "week" : "month",
    agendaSpan: compact ? "week" : "day",
    selectedId: null,
  });
  return (
    <div className="cal-embed-cell" style={{ width: compact ? 360 : 640 }}>
      <h2>{compact ? "Compact · 360 × 360" : "Month · 640 × 640"}</h2>
      <EventCalendar
        events={events}
        position={position}
        onPositionChange={setPosition}
        density={compact ? "compact" : "standard"}
        height={compact ? 360 : 640}
        timeZone="Asia/Singapore"
        now={DEMO_NOW}
        registerNavigationGuard={registerGuard}
        onSave={(e) =>
          setEvents((old) => [...old.filter((x) => x.id !== e.id), e])
        }
        onDelete={(id) => setEvents((old) => old.filter((e) => e.id !== id))}
      />
    </div>
  );
}
export function CalendarShowcase({
  query: q,
  update,
}: {
  query: URLSearchParams;
  update: (v: Record<string, string>) => unknown;
}) {
  const registerGuard = useCalendarNavigationRegistration();
  const [events, setEvents] = useState<CalendarEvent[]>(demoStore.events);
  const tab = q.get("calTab") || "preview";
  const date = validDate(q.get("calDate") || "")
    ? q.get("calDate")!
    : DEMO_DATE;
  const view: CalendarView = [
    "day",
    "week",
    "month",
    "year",
    "agenda",
  ].includes(q.get("calView") || "")
    ? (q.get("calView") as CalendarView)
    : "week";
  const position: CalendarPosition = {
    date,
    view,
    agendaSpan: q.get("calSpan") === "day" ? "day" : "week",
    selectedId: q.get("calEvent"),
  };
  const density = q.get("calDensity") === "compact" ? "compact" : "standard";
  const width = [280, 360, 640, 1120].includes(Number(q.get("calWidth")))
    ? Number(q.get("calWidth"))
    : 0;
  const height = [360, 480, 640].includes(Number(q.get("calHeight")))
    ? Number(q.get("calHeight"))
    : 640;
  const zone = validZone(q.get("calZone") || "")
    ? q.get("calZone")!
    : "Asia/Singapore";
  const fixture = q.get("calState") || "ready";
  const state = ["loading", "empty", "error"].includes(fixture)
    ? (fixture as "loading" | "empty" | "error")
    : "ready";
  const save = (event: CalendarEvent) => {
    if (fixture === "save-error")
      throw Error("Simulated save failure. Your changes are still here.");
    const next = [...events.filter((e) => e.id !== event.id), event];
    setEvents(next);
    demoStore.events = next;
  };
  const remove = (id: string) => {
    demoStore.deleted.add(id);
    const next = events.filter((e) => e.id !== id);
    setEvents(next);
    demoStore.events = next;
  };
  const controls = [
    [
      "Density",
      "calDensity",
      density,
      [
        ["standard", "Standard"],
        ["compact", "Compact"],
      ],
    ],
    [
      "Width",
      "calWidth",
      String(width),
      [
        ["0", "Fill container"],
        ["1120", "1120 px"],
        ["640", "640 px"],
        ["360", "360 px"],
        ["280", "280 px"],
      ],
    ],
    [
      "Height",
      "calHeight",
      String(height),
      [
        ["640", "640 px"],
        ["480", "480 px"],
        ["360", "360 px"],
      ],
    ],
    ["Timezone", "calZone", zone, zones.map((z) => [z, z])],
    [
      "State",
      "calState",
      fixture,
      [
        ["ready", "Ready"],
        ["empty", "Empty"],
        ["loading", "Loading"],
        ["error", "Error"],
        ["read-only", "Read only"],
        ["overlaps", "Five overlaps"],
        ["save-error", "Save error"],
      ],
    ],
    [
      "Adaptation",
      "calAdaptive",
      q.get("calAdaptive") || "auto",
      [
        ["auto", "Auto layout"],
        ["fixed", "Keep chosen view"],
      ],
    ],
  ] as const;
  return (
    <div className="calendar-showcase">
      <div className="cal-showcase-heading">
        <div>
          <h1>Event calendar</h1>
        </div>
        <Tabs
          value={tab}
          onValueChange={(v) => update({ calTab: String(v), calEvent: "" })}
        >
          <SectionTabs aria-label="Calendar examples">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="usage">Integration</TabsTrigger>
          </SectionTabs>
        </Tabs>
      </div>
      {tab === "embedded" ? (
        <>
          <div className="cal-embed-grid">
            <Embedded compact />
            <Embedded compact={false} />
          </div>
          <p className="cal-demo-note">
            Independent instances with their own events and selection. Synthetic
            data; reload resets edits.
          </p>
        </>
      ) : tab === "usage" ? (
        <div className="cal-guide">
          <h2>Integrate EventCalendar</h2>
          <div className="cal-handoff-links">
            <a href="/handoff/frontx-calendar-components.zip" download>
              Download components
            </a>
            <a href="/handoff/EVENT-CALENDAR.md" download>
              Integration guide
            </a>
            <a href="/handoff/ControlledCalendar.tsx" download>
              Working React example
            </a>
          </div>
          <p>
            EventCalendar is a local Showcase composition built with FrontX UI
            Kit. It is not an installed UI Kit export. FullCalendar handles
            scheduling layout; the host owns events, navigation and persistence.
          </p>
          <pre>{`import '@gears-frontx/ui-kit/theme.css';\nimport { EventCalendar } from './calendar';\n\n<EventCalendar\n  events={events}\n  position={position}\n  onPositionChange={setPosition}\n  onSave={saveEvent}\n  onDelete={deleteEvent}\n  timeZone="Asia/Singapore"\n  density="compact"\n  height={360}\n/>`}</pre>
          <h2>Contract</h2>
          <table>
            <tbody>
              {[
                [
                  "position",
                  "date, view, agendaSpan, selectedId — controlled by the host",
                ],
                [
                  "events",
                  "Timed: id, title, start, end, timeZone, allDay: false. All-day: startDate, endDate (exclusive), allDay: true.",
                ],
                [
                  "onSave / onDelete",
                  "Local adapter in this demo. Reject a Promise to preserve the draft and show an error.",
                ],
                [
                  "density / height / adaptive",
                  "Independent layout options. Auto uses a list below 620 px; forced Week scrolls locally.",
                ],
                [
                  "timeZone / locale / now",
                  "Display timezone, formatting locale and injected clock. Labels currently English.",
                ],
                [
                  "registerNavigationGuard",
                  "Optional host navigation guard; resolves only after unsaved changes are handled.",
                ],
                [
                  "renderEventExtra",
                  "Optional product detail/agenda extension. No product entities required.",
                ],
              ].map(([a, b]) => (
                <tr key={a}>
                  <th>{a}</th>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Keyboard</h2>
          <p>
            Focus the time grid; arrows choose a date and half-hour, Home
            selects all day, Enter creates. Tab reaches events and controls. All
            actions are available without dragging.
          </p>
          <h2>Demo boundary</h2>
          <p>
            Fixed clock: 5 October 2026, 08:10 in Singapore. Edits remain in
            this browser session until reload. No invitations, external calendar
            writes or server synchronisation.
          </p>
        </div>
      ) : (
        <>
          {tab === "playground" && (
            <div className="cal-playground-controls">
              {controls.map(([label, key, value, options]) => (
                <div className="cal-control" key={key}>
                  <span>{label}</span>
                  <Select
                    items={options.map(([value, label]) => ({ value, label }))}
                    value={value}
                    onValueChange={(value) => {
                      if (value) update({ [key]: value });
                    }}
                  >
                    <SelectTrigger aria-label={label}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}
          <div className="cal-demo-stage" style={{ width: width || "100%" }}>
            <EventCalendar
              scrollPositions={demoStore.scrollPositions}
              events={
                fixture === "overlaps"
                  ? [
                      ...OVERLAP_EVENTS.filter(
                        (e) => !demoStore.deleted.has(e.id),
                      ).map((e) => events.find((x) => x.id === e.id) || e),
                      ...events.filter(
                        (e) =>
                          !INITIAL_EVENTS.some((x) => x.id === e.id) &&
                          !OVERLAP_EVENTS.some((x) => x.id === e.id),
                      ),
                    ]
                  : events
              }
              position={position}
              onPositionChange={(p) =>
                update({
                  calDate: p.date,
                  calView: p.view,
                  calSpan: p.agendaSpan,
                  calEvent: p.selectedId || "",
                  ...(fixture === "empty" && p.selectedId
                    ? { calState: "ready" }
                    : {}),
                })
              }
              onSave={save}
              onDelete={remove}
              timeZone={zone}
              density={density}
              height={height}
              adaptive={q.get("calAdaptive") !== "fixed"}
              readOnly={fixture === "read-only"}
              state={state}
              now={DEMO_NOW}
              onRetry={() => update({ calState: "ready" })}
              registerNavigationGuard={registerGuard}
            />
          </div>
          {tab === "preview" && (
            <div className="cal-embed-grid cal-preview-variants">
              <Embedded compact />
              <Embedded compact={false} />
            </div>
          )}
          <p className="cal-demo-note">
            Synthetic events · Demo date: 5 Oct 2026 · Edits reset on reload.
          </p>
        </>
      )}
    </div>
  );
}
