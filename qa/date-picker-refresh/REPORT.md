# FrontX date selection and regional formats · 2026-10-05

Status: locally implemented and verified; design acceptance awaits review. No deployment in this refinement. Baseline: accepted public runtime 4d8f7532b14d37a92abdf4e6afe0443981f851cb, release-record HEAD 358d613. Runtime fingerprint: `b0345feff4b1642ccceefabe0a403cf0a227b8577bd281ba196a9ef5a9c9c898`.

## Changes

- Shared DateCalendar on installed FrontX Calendar: rounded date selection, subtle surface/shadow, direct month/year dropdowns with explicit navigation bounds. Used inline, in enhanced button popups, and event-toolbar navigation. Existing year overview keeps its own compact variant.
- ResponsiveDatePicker composes installed Popover/Button/Calendar; source API preserves controlled single/range state. First click creates an incomplete range, second completes it, including same-day range. In-popup Clear/Done and optional close-on-complete avoid extra host steps. Inline month follows changed controlled selection and Back. The legacy input variant retains the installed kit parser; enhanced-only options are documented.
- Browser-region defaults with explicit locale/timeFormat/weekStartsOn; Formats settings in both catalogue routes. Grid, narrow agenda, details, year/toolbar captions and date labels follow settings. Actual ISO values are unchanged. Week range filtering and visual first day use the same setting.
- Editor adds local timezone and optional host timeZones; year labels follow locale. Integration route accepts both canonical calTab=integration and old calTab=usage, fixing direct handoff links.
- Component archive includes shared date-navigation/preferences dependencies; guides identify copy boundaries, dependencies and host validation. No new UI kit or app. No installed package or lockfile changes.

## Component/source map

FrontX Calendar (DayPicker), CalendarDayButton, Popover, Button, NativeSelect and existing dialog primitives reused. Shared date states are in src/date-picker/date-picker.css, DateCalendar.tsx, ResponsiveDatePicker.tsx. Date preferences are independent of the Showcase UI. DateFormatSettings composes primitives in src/showcase for the catalogue only. Consumers: DatePickerShowcase, CalendarToolbar, CalendarGrid/Year, EventCalendar details/agenda; EventEditor only adds zone choices. Existing chart tabs and accepted event appearance retained.

No Storybook app was introduced. This app's existing Showcase provides inline/single/range and event-calendar variants. Independent fixture uses only FrontX theme plus component source, without Showcase globals.

## Verification

- Final TypeScript/Vite build passed (build.txt), with existing large-chunk advisory.
- Main browser suite: 41 passed, zero page errors. Far past/future month/year/date selections; keyboard selected-day focus/arrow/Enter; range clear/partial/completed and focus return; Back synchronizes inline month; 320/390 popup/page bounds; ten theme/mode combinations; event date jump; populated mobile creation and discard focus/trap/retained draft.
- Independent consumer: 12 passed, zero errors. No Showcase globals; French months and disabled weekends; explicit year bounds; same-day and close-on-complete range; German year caption; host timezone choices; event create/edit/delete.
- Regional formats: 23 passed, zero errors. Browser en-US default, six region choices, Russian date/month/week, URL and Back, 12/24 grid and agenda, explicit Monday override, mobile settings bounds, integration URL and legacy alias.
- Visual/layout: 21 passed. Exact published baseline fingerprint verified; before/after at 1440×1000 with matched route/theme/date/locale; 1280/1600/1920/320/390 bounds; selected/outside/normal date text contrast ≥4.5:1 in each of five themes × light/dark. These are targeted checks, not whole-app accessibility certification.
- Date model: 11 passed, covering the six prior month/year/color checks plus regional week boundaries, clock overrides, overnight segment labels and invariant ISO instants.
- Extracted component archive typechecks independently (archive-typecheck.txt). Manifest/file hash parity and absence of private paths checked. Full source archive parity recorded separately.

Test harness corrections: exact Timezone label, settled popup positioning after resize, and Base UI's asynchronous focus movement/guards. Actual isolated focus inspection confirmed Keep editing as the safe initial action and bounded Tab behavior. No focus implementation was replaced to satisfy an instantaneous assertion.

## Audit and limits

Native Claude Code reviewed the accepted baseline code/screenshots, not the live browser. All ten findings are dispositioned in workspace docs/qa/claude-delegations/2026-10-05-frontx-calendar-ux/RECORD.md; unedited response preserved. Codex verified browser claims. Booking availability/resource rules remain a host/product concern. Browser APIs do not expose every custom OS format. English action/validation copy remains; date formatting is regional. Native date/time editor widgets follow browser/OS presentation. SSR and native mobile-device certification remain product-level work.

User-requested international preferences supersede the previous fixed Monday/24-hour demo defaults; explicit overrides preserve those when desired. Compare before-1440.png/after-1440.png and reviewed Russian/mobile/range screenshots for intended visual changes. No pixel-perfect or production-ready claim.

Evidence sequence: the last source change only regionalized the keyboard-selected slot and overflow heading in CalendarGrid. The final build and 23-format suite include that change; the 41 main, 12 consumer and 21 visual checks precede it with all their affected control logic/styles unchanged. Final extracted source is typechecked again.
