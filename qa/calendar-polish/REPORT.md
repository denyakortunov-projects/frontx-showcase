# Calendar spacing and short-event refinement

5 October 2026. Denis accepted the previous visual direction and requested three bounded corrections: inline weekday/date, bottom breathing room in compact calendars, and title priority in short timed events (reported Friday 9 October, 16:00 London check-in).

Baseline: prior calendar-refresh runtime `af4397bdf7efe0e88560f7e7e21c78678f016e99992b39658a4aaea80f8cacc6`, now visually accepted as direction with these corrections. Before hashes in before-manifest.json, before-friday.png / before-compact.png. Final runtime `7d609fefc71fd29381d3bfe625914da48f1703d960caf48ed32e9cf0789edb3e`. Source changed only in src/calendar/calendar.css; shared components and existing preview consumers retained. No new product capability, application, dependency, delegation or publication.

- Day/week header puts weekday and date on one line; current-date marker retained. Header is at most 48px in both densities.
- Named size container on each timed event adapts to rendered segment height. At 51px or less only the title is shown; taller blocks retain time. Title no longer shrinks to dots to accommodate time. Full event time remains in accessible name and details. Month/list times remain visible because they do not have a time axis.
- List viewport has a persistent 14px bottom inset, in addition to its end-of-list spacing, so partially visible rows do not touch the calendar frame.

Verification: final TypeScript/Vite build passed (build.txt). 38 focused browser checks passed with zero runtime errors (report.json; verify.mjs): Day/Week × Standard/Compact, same-line date, short-event title bounds and hidden time, tall-event text bounds, accessible time/details via keyboard, compact inset at both initial and end scroll, final event selection, 390px overflow and Month time preservation. Fabric light/dark screenshots, Friday and compact screenshots reviewed. Existing earlier full calendar suites retained with their original source hashes; not needlessly rerun for this CSS-only correction.

Vite's existing large-chunk advisory remains. No pixel-perfect or full accessibility certification claim. Platform calendar alignment and stakeholder scope approval remain separate. Local source download refreshed and checked by verify-archive.py / archive-report.json.
