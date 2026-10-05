# FrontX Calendar — visual refresh QA

5 October 2026. Local-only owner-requested refinement; user visual acceptance pending. No publication, platform schema or team approval claimed.

Baseline commit: `67605262247b8ca418139f4aaccdd9fff1101d12`. The owner's reviewed first local calendar was dirty task work, captured by `before-manifest.json`; it was preserved and refined. Final runtime fingerprint: `af4397bdf7efe0e88560f7e7e21c78678f016e99992b39658a4aaea80f8cacc6` (`source-manifest.json`). Unrelated workspace changes preserved.

## Result and boundaries

- Coloured events, six editable colour choices, theme-aware surfaces/text, subtle depth; shared Toolbar/ViewSwitch/ColorPicker compositions.
- Day / Week / Month / Year. Year reuses twelve FrontX Calendar instances; date opens Day. Narrow Day/Week/Month adapts to a list; Year stays a responsive overview. No Agenda button.
- Preview: full-size calendar plus independent Compact 360×360 and Month 640×640. Playground: existing FrontX Select for size/density/zone/state. Historical Embedded URL retained.
- Components opens Charts & widgets; Calendar is second. Chart implementations untouched.
- Same create/details/edit/delete flows; local synthetic data. No external service or platform integration added. Generic model/API and release remain proposals.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| TypeScript + Vite final build | pass | build.txt |
| Date/DST/colour model | 30 pass | model.txt; original model tests + model.test.ts |
| Visual/behaviour matrix | 134 pass, zero page/asset errors | browser-report.json; qa/verify-calendar-refresh.mjs |
| Keyboard, focus, dirty guards, editing/deletion, zoom and token contrast | 74 pass, zero page errors | accessibility-report.json; verify-accessibility.mjs |
| Async save reject/retry/pending | 6 pass | async-report.json; verify-async.mjs (existing local dev host fixture) |
| Final month/Preview geometry | 7 pass | final-layout-report.json; verify-final-layout.mjs |

The 134/74 suites passed before a final two-line Month-only refinement: visible event limit changed to two, with a separate overflow link and minimum month cell height to 72 px. This avoids a month full of only “more” links. The final build and seven focused layout/overflow/mobile checks cover that exact adjustment; unchanged flows were not needlessly rerun. Source fingerprint above captures the final runtime.

All five palettes × light/dark captured; 60 event-text contrast pairs passed 4.5:1. Tested widths 1120/640/360/280 and viewports 1600/1280/390. Representative controls align within one CSS pixel on desktop. Full accessibility certification and pixel-perfect parity are not claimed.

Visual review: final preview.png, preview-mobile.png, month-640-480.png, week.png, year-1280.png, viewport-390.png and representative Fabric dark/light editor captures inspected. The shorter 480px month scrolls locally to preserve readable events; the 640px Preview month fits all weeks. Week/day scroll vertically through the full day. Long titles truncate in dense cells; details retain full text.

Important regression fixed: FullCalendar keeps an event DOM node mounted on event edits, so colour and accessible name now refresh from the React event-content ref instead of a mount-only callback. Checked immediate colour edit, cross-view preservation, dirty colour guard and discard.

## Components and source

Installed FrontX UI Kit 0.4.0-alpha.5: Button, ToggleGroup, Calendar/CalendarDayButton, Popover, Select, Tabs, Field/Input/Textarea/Checkbox, Dialog/Sheet/AlertDialog. Actual shared calendar consumers: Preview, Playground, Embedded and async fixture. New repeated states live in src/calendar/calendar.css, not separate page primitives. FullCalendar daygrid is pinned to the existing engine version 6.1.21. No Figma target, new app or parallel kit.

Original first-candidate reports remain under qa/event-calendar with their original hashes. Current package/download audit is archive-report.json. No new Claude delegation in this bounded visual pass; prior Claude contributions remain recorded in the original QA/delegation log.
