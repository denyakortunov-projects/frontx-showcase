# Calendar engine decision

2026-10-05. Local implementation decision; no publication or platform contract.

Selected: FullCalendar **6.1.21**, React, core, timegrid, daygrid, interaction and luxon3 packages; Luxon **3.7.2** for named timezone rendering. Temporal **1.0.5** handles input validation, dates and DST disambiguation in the adapter. All selected packages use MIT licenses. React 19 is in the installed React adapter peer range. No premium/resource scheduler modules used.

FullCalendar 7.1.0 was inspected and tried first. Its week columns collapsed to zero width in this project's local probe, including after adding the classic palette/minimum width. Rather than patch library internals or claim compatibility, it was replaced before the main UI implementation. The failed v7 capture was overwritten during the successful v6 probe and is not retained as visual evidence; this paragraph records the observed failure and decision. Version 7 is not in the final dependency tree.

Evidence: `qa/event-calendar/probe.tsx`, `verify-probe.mjs`, `engine-probe.json` and `engine-probe.png` show the selected 6.1.21 grid rendering five concurrent events and all-day events, correct 09:00 Asia/Singapore labels, and event selection without page errors. Further slot/keyboard/resize/theme tests are in `qa/verify-event-calendar.mjs` and its final report; a bare probe is not full component acceptance.

The engine owns day/week scheduling geometry and detects overflow. A shared FrontX Dialog opens all events of the overflow date, including visible ones, rather than the engine’s hidden-only popover. This intentionally expands the initial interval-list proposal to a labelled day list. FrontX owns toolbar, date picker, details, editor, confirmations and themed tokens. Agenda is a semantic FrontX composition over the same typed events. Existing FrontX Calendar remains a date picker. Scheduler CSS variables map to existing tokens; no second primitive library.

The adapter uses explicit half-open ranges, date-only all-day events and instant+IANA-zone timed events. Gap/fold tests use Temporal and real transition fixtures, not hand-coded timezone offsets. The first Claude proposal used a removed Temporal.TimeZone API and had a midnight rollover error; both were corrected by Codex before integration. Two test expectations were also corrected against actual London gap timing and next-day rollover.

References read at kickoff: [FullCalendar React](https://fullcalendar.io/docs/react), [timezone](https://fullcalendar.io/docs/timeZone), [license](https://fullcalendar.io/license). Current docs describe v7; implementation is based on the installed v6.1.21 types, license and observed runtime, not copied v7 imports. Exact dependencies are pinned in package.json/package-lock.json.

The owner-requested Month view uses the pinned daygrid module (6.1.21). Year composes twelve installed FrontX Calendar/CalendarDayButton instances, with colour dots over the same event model; it is not a second calendar engine.
