# FrontX Event Calendar — local review record

5 October 2026. **Local implementation candidate; design acceptance pending; not deployed.**

Review: `http://127.0.0.1:5202/?page=event-calendar` (existing FrontX Showcase). Components → Calendar; Playground, Embedded, React & contract. The app stays on branch `codex/frontx-event-calendar`, based on `67605262247b8ca418139f4aaccdd9fff1101d12`. Exact runtime files: `source-manifest.json`, fingerprint `6780d2791d03fd93edc13f2e2b296e9c16a0103af7c972a10c6774436ba67b27`. Uncommitted local work, no new application or hosting target.

## Implemented slice

- Controlled EventCalendar with Day / Week / Agenda; Standard / Compact independent of width and height. Below 620 px, automatic Agenda preserves the selected period. A forced Week stays available with local horizontal scroll.
- Shared creation/view/edit/delete flow, title, dates/times, IANA timezone, all-day and description. Local synthetic event data; reload resets edits. No external calendar writes.
- All-day and cross-midnight events, overlaps, explicit DST gap/fold handling, date navigation and fixed demo Today. More events opens a labelled date list in a FrontX Dialog, including already visible events.
- Unsaved draft confirmation on Cancel, Escape, outside click and host navigation, including repeated Back. Asynchronous adapter rejection preserves the draft; pending mutation blocks guarded navigation. Host-owned scroll cache restores route Back within FullCalendar's 2 px rounding.
- Three navigation groups: Components, Examples, Foundations. Previous gallery/widget/layouts/modularity/elements/themes/handoff routes retained; legacy `widget=calendar` still shows Revenue pulse.
- Same installed FrontX UI Kit `0.4.0-alpha.5`, five palettes and light/dark tokens. FullCalendar 6.1.21 handles scheduling layout; Luxon 3.7.2 supports named zones and Temporal 1.0.5 validates date input. See `docs/calendar/ENGINE-DECISION.md`.

## Verification

| Check | Result | Evidence / invocation |
| --- | --- | --- |
| Types and production bundle | Passed | `build-report.txt`; `npm run build` |
| Date/event model | 24 passed | `model-report.txt`; `node --experimental-strip-types --test qa/event-calendar/model.test.ts` |
| Calendar/browser journey | 83 passed, zero runtime or HTTP errors | `browser-report.json`; `DEMO_URL=http://127.0.0.1:5202 node qa/verify-event-calendar.mjs` |
| Accessibility and edge cases | 74 passed, zero runtime errors | `accessibility-report.json`; `DEMO_URL=http://127.0.0.1:5202 node qa/verify-calendar-accessibility.mjs` |
| Deferred adapter / failure / retry | 6 passed | `async-report.json`; dev server 5201 then `node qa/event-calendar/verify-async.mjs` |
| Existing density consumers | 22 passed | `regression-density/density-report.json`; existing `qa/verify-density.mjs` against 5202, output isolated in temporary directory |
| Existing palettes | 45 passed | `regression-palette/palette-modes-report.json`; existing `qa/verify-palette-modes.mjs` against 5202, output isolated |
| Source archive | Verified locally | `archive-report.json`, `public/release.json`; allowlisted package plus per-file SHA-256 validation |

Browser: installed Google Chrome through existing Playwright 1.58.2; Node v25.1.0 on this host. README continues to recommend Node 22/24; those runtimes were not separately exercised. Build reports a chunk-size advisory: Calendar is lazy-loaded (~150.9 kB gzip); no performance SLA claimed. No new UI test framework or runtime primitive library.

The 50 contrast samples cover text, muted text, event text, selected text and focus against relevant calendar tokens in all ten theme/mode pairs. Calendar focus uses the existing primary token: inherited Fabric dark ring measured 2.95:1 against the card. This scoped correction leaves other consumers unchanged. The 200% check uses an equivalent 800×500 CSS layout viewport from a 1600×1000 desktop; it is not a native browser-zoom or full screen-reader audit. No blanket WCAG certification or pixel-perfect claim.

## Visual review and component reuse

Lead inspected `week.png`, `width-280.png`, `embedded.png`, `fabric-dark.png`, `fabric-dark-editor.png`, the final mobile view and representative additional themes; all ten theme/mode grid/details/editor states are captured. Baseline and after gallery/elements/themes images use 1600×1000. Intended difference: simplified global navigation and a Calendar entry; existing chart source/data/themes are unchanged and their regression suites pass.

Actual imports: FrontX Button, Tabs, Calendar/Popover, NativeSelect, Field/Input/Textarea/Checkbox, Dialog, Sheet and AlertDialog; Lucide icons. No `packages/ui`, Studio components, kit sources, Figma or parallel primitive library. CalendarGrid/EventCalendar/EventEditor own repeated compositions and visual states in `src/calendar/calendar.css`; catalogue state controls, embedded consumers and actual React usage are in `src/CalendarShowcase.tsx`.

React checklist: no conditional hooks, clean ResizeObserver/listener disposal, stable guard registration and plugin definitions, memoized event conversion/range, lazy calendar route, discriminated event types, semantic controls and named dialogs. Async pending state intentionally ends by unmounting the editor after successful save; failure resets it for retry.

## Delegation record

Actual native Claude Code supplied the model/tests and editor proposals; Codex corrected Temporal API usage, midnight rollover, DST test expectations, fold selector persistence, async close behavior and field error links. Codex implemented integration, grids, Agenda, navigation and all browser verification.

Root records (workspace-relative):

- `docs/qa/claude-delegations/2026-10-05-frontx-calendar-model/RECORD.md`
- `docs/qa/claude-delegations/2026-10-05-frontx-calendar-editor/RECORD.md`
- `docs/qa/claude-delegations/2026-10-05-frontx-calendar-final-review/RECORD.md`: one finding adapted, two rejected against source/runtime evidence.
- `docs/qa/claude-handoff/2026-10-05-frontx-calendar/HANDOFF.md`: integrated locally, no release.

Raw Claude output is retained. Claude did not browse, test, publish or directly edit the shared checkout. Root unrelated changes and the baseline app's existing release reports were preserved.

## Remaining decisions and limitations

This is a generic local composition, not a published UI Kit export or accepted platform API. The consuming app owns data validation at its boundary, access, persistence and navigation integration. `locale` changes date formatting; action labels are English. Invites, RSVP, recurrence, attachments, resource booking, drag/resize and real synchronization remain outside the first slice.

Denis can now review the concrete module. Alignment with a specific platform calendar and stakeholder review with Vitaly Panteleev, Denis Turanovich and Nikola remain open. No agreed delivery date, platform scope or public placement is implied. No site, mail, meeting or Reminder was changed.

Final visual correction: Agenda shows each midnight segment within its labelled day (23:30–24:00 ↗, then ↳ 00:00–00:30), not the full previous-day time range twice. Three focused model checks cover continuation and exact-midnight end. Delete confirmation explicitly restores focus after its trigger event disappears.
