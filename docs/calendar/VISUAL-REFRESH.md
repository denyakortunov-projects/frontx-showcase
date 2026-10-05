# Calendar visual refresh — 5 October 2026

Owner correction to the first local candidate: introduce coloured events with an editable colour choice; softer elevated surfaces inspired by Apple Calendar; align all controls; inherit all FrontX themes. Main views Day / Week / Month / Year. Agenda removed from the visible switch; narrow blocks retain a list adaptation. Charts & widgets comes first in Components and is its landing page; Calendar second.

Work in the existing FrontX Showcase. Preserve current local work and event behaviour. No publication or platform approval implied. Before source: qa/calendar-refresh/before-manifest.json.

Plan: (1) inspect shadcn/FrontX contracts; (2) shared event colour model and accessible selector; (3) single segmented view control, Month grid and Year overview; (4) elevated themed surface and event styling; (5) verify views, CRUD/colour roundtrip, keyboard, sizes, alignment and five themes; (6) update local handoff.

References: [shadcn Toggle Group](https://ui.shadcn.com/docs/components/base/toggle-group), [shadcn Calendar](https://ui.shadcn.com/docs/components/base/calendar), [Apple Calendar views](https://support.apple.com/en-md/guide/calendar/icl1010/mac). Installed FrontX implements the same Base UI / DayPicker seams; compose its primitives, without importing a second kit or reinitialising the app.


Latest owner steering: Preview must demonstrate small and large calendar compositions. Implemented Preview with full-size controlled calendar plus independent Compact 360×360 and Month 640×640. Playground contains dimensions/state selectors; React & contract documents the consumer interface. Historical `calTab=embedded` links still work.

Shared components: installed FrontX Button, ToggleGroup/ToggleGroupItem, Calendar/CalendarDayButton, Popover, Select, Tabs, Field/Input/Textarea/Checkbox, Dialog/Sheet/AlertDialog. New reusable compositions are CalendarToolbar, CalendarViewSwitch, EventColorPicker and CalendarYear under the existing `src/calendar/` domain. No duplicate primitive kit. Representative consumers: Preview, Playground, legacy Embedded and the async host fixture.

The main calendar palette uses six event choices (Theme, Blue, Teal, Violet, Amber, Rose). Hue is stable across views; fill, text, borders and shadows derive from FrontX card/foreground/primary tokens. Colour is not the only label: event text, accessible names and times remain available.

New behavioural checks cover immediate colour updates (FullCalendar keeps DOM nodes mounted), dirty colour drafts, month/year ranges, year drilldown/Back, composite Select, narrow containers and independent preview state. Older CRUD/DST/async evidence is retained under its original candidate; fresh model and async reports accompany the current visual pass.

Claude consideration: the prior implementation already received native Claude model/editor contributions and final review. This bounded visual refinement was integrated and verified directly by Codex; no new Claude run or delegation claimed.

Verification complete: final build, 134 browser assertions, 74 keyboard/accessibility assertions, 30 model tests, 6 async checks and 7 final Month/Preview checks. See `qa/calendar-refresh/REPORT.md` for exact source/evidence sequencing and limits. User design acceptance and platform alignment remain separate review steps. No publication performed.

## Follow-up accepted visual direction and spacing correction

Denis explicitly accepted the improved appearance and requested a single-line weekday/date header, more bottom space in the compact block, and title priority for short events. Implemented in the shared calendar stylesheet: compact inline header, persistent list bottom inset, event time shown only when the rendered timed segment is tall enough. Month and list retain times. Current scoped verification: `qa/calendar-polish/REPORT.md` (38 browser checks and final build); prior reports remain historical to their exact sources.

## Developer handoff and date selection

Owner requested a consistent replacement for the catalogue tabs and a distinct Date picker component with a trip-date range. Added shared SectionTabs across Calendar, chart playground, TokenActivity and Elements. DatePicker/Calendar reuse installed kit exports; the range wrapper adapts two months to one at ≤640px. EventCalendar is still a separate controlled scheduling composition. New source bundle and integration guides are linked from Integration / Developer handoff; isolated consumer verification uses the same source without Showcase globals. Current evidence and exact source: `qa/component-handoff/REPORT.md`.
