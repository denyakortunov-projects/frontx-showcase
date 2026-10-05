# FrontX calendar components and handoff

5 October 2026. Existing FrontX Showcase only. Local changes; no publication, communications, real calendar writes or new application. Earlier accepted visual direction preserved. Final source fingerprint: `440c8188b0b21c6b332107fb98da20e8f4672027f8ce5059778ef230123fe0ab`; baseline is calendar-polish source `7d609fefc71fd29381d3bfe625914da48f1703d960caf48ed32e9cf0789edb3e`.

## Delivered

- Event calendar and Date picker are separate catalogue routes, after Charts & widgets. Existing calendar URL retained.
- Date picker demonstrates installed FrontX DatePicker (single and round-trip date range) plus Calendar inline. Small responsive wrapper keeps the installed props and uses one range month ≤640px, two on desktop. Form dates/clearing are controlled and URL-addressable; empty selections use a demo-only `none` sentinel to distinguish them from absent defaults. Invalid dates are rejected; reversed URL range becomes incomplete. No flight booking or time-of-day model.
- SectionTabs replaces all four catalogue tab-list renderers: calendar, chart playground, TokenActivity, Elements. SegmentedControl extends the same named visual style to chart density, module width/height and composition period. Both reuse FrontX/Base UI, preserving keyboard semantics. No new primitive library; accepted calendar view/colour selectors remain separate variants.
- Integration tab + Developer handoff offer source-only `frontx-calendar-components.zip`, exact dependency list and hash manifest, typed `calendar/index.ts`, compiling ControlledCalendar recipe and two guides. Calendar is still a proposed local composition; Calendar/DatePicker date-selection primitives are installed kit exports.
- For independent integration, calendar box sizing is scoped, event colour selectors no longer affect unrelated host data-color attributes, and optional Showcase surface tokens have card fallbacks. Consumer fixture imports only the FrontX theme and component sources, with no Showcase styles/router/fixtures.

## Verification

| Evidence | Result |
| --- | --- |
| build.txt | Final TypeScript and Vite passed. Existing large-index-chunk advisory retained. |
| browser-report.json / verify.mjs | 43 passed, zero page errors: single-date keyboard/clear/Back, inline sync, range two-click choice, live mobile reflow retaining state, month navigation, 320/390px bounds, 5 themes × light/dark, shared tabs, chart Data/React, TokenActivity and Elements, download availability, isolated consumer create/guard/leave/state. |
| segments-report.json / verify-segments.mjs | 20 passed, zero page errors: new density/module/period selectors and keyboard, active tab tokens in 5×2 themes, mobile bounds. |
| component-archive-report.json / archive-typecheck.txt | 32 passed: exact allowlist and SHA-256, source parity, no Showcase shell/routing/secrets, extracted component/example TypeScript compilation against installed dependencies in disposable temp directory. |
| archive-report.json | Full source handoff manifest/archive parity and final runtime-source checks; refresh only static download assets in dist. |

Sequence: the 43 checks passed before the final extension of shared styling to density/module/period controls; the final build and 20 focused checks cover that extension. No subsequent runtime edits. Later edits are documentation/archive records only. Existing extensive calendar tests remain historical evidence at their recorded sources; no claim that all were rerun.

Visual review: calendar-tabs.png, calendar-mobile-tabs.png, segments-chart.png, chart-tabs.png, range-desktop.png, date-mobile.png, representative themed picker screenshots and isolated.png reviewed. Source controls and figures still follow FrontX themes. Desktop/touch-sized viewport tests do not certify every mobile browser or native touch device; SSR hydration and real backend integration are not certified.

## Review disposition and limits

Native Claude Code reviewed selected handoff text only; tools disabled. Record: `docs/qa/claude-delegations/2026-10-05-frontx-component-handoff/RECORD.md` at workspace root. Codex rejected inaccurate hydration/type-mismatch claims, clarified client boundaries/internal callback error handling/disabled-day semantics, and independently verified the actual entry point and bundle. Claude did not run tests or edit files.

Application owns authorization, data persistence, routing/Back and dirty guard integration. New event IDs are client UUIDs; backend remapping must reconcile selection. EventCalendar labels are English and translation remains future work. DatePicker ranges are date-only, may be incomplete, and need host form validation. Existing DatePicker does not have a trigger-disabled prop. Platform API alignment and stakeholder approval remain separate from local code handoff.
