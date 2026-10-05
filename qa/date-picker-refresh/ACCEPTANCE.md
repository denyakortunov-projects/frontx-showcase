# Date-selection refinement · 2026-10-05

Status: implemented and verified; design acceptance awaits review. Accepted public runtime 4d8f7532b14d37a92abdf4e6afe0443981f851cb; release-record HEAD 358d613. Clean app at start; unrelated root changes excluded. Figma not selected.

User scope: improve DatePicker/inline appearance, direct month/year selection, native Claude UX/visual/integration audit. Existing FrontX Calendar, Popover, Button, Input and tokens only. User follow-up adds international region/clock/week settings with browser defaults. This change stays local; no new deployment request.

Preserve: accepted event-grid/color appearance, CRUD/dirty/async/time-zone behavior, DatePicker controlled single/range API, URL date state/Back, nav order and chart controls.

Routes/states: date-picker single/empty/range/partial/inline and event-calendar date popup; five themes light/dark; selected/today/outside/disabled days. Desktop1280/1600/1920 and mobile320/390; live resize, keyboard/year selection/arrows/grid/Escape/focus return/Back/far past/future/range completion. Reuse exact release before screenshots and compare same-size after captures. No pixel-perfect claim.

Component-first: date controls are shared source compositions on installed FrontX primitives. Showcase is this app's component catalogue (no parallel Storybook app); update handoff/source bundle, compile in isolation. Claude findings need Codex verification before adoption.

Results, source map and interaction/state closure: REPORT.md and linked JSON/scripts. Design acceptance awaits user review; publication not requested for this refinement.
