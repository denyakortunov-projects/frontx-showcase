# FrontX Astro slice acceptance record

Source: acceptance template docs/qa/future-base-ui-implementation/PIXEL_PERFECT_ACCEPTANCE_CONTRACT.md adapted to FrontX; Studio-specific viewport/catalogue gates not applicable. Baseline 4780fd3943af085f18a235a6455e3684b5e4d69d, source files matching the published numeric-axis release (the baseline capture reports clean=false because task records had already been created). No accepted unreleased runtime delta. Existing HTML content draft and user positioning/motion requests govern NEW pages. Figma not selected. New composition awaiting user review.

Preserve: all Showcase components, calendar/date picker behavior, themes, query fields and handoff downloads. Keep Charts before Calendar. Only app entry and home backlink change; shared tokens extracted verbatim. Work remains in apps/frontx-showcase.

| Routes/states | Expected behavior | Status |
| --- | --- | --- |
| / | Static content + explanatory island with 3 URL states | checked |
| /templates/, /templates/shell/, /templates/mfe/, /templates/guardrails/ | Distinct manifests, dependencies, source links | checked |
| /libraries/, /get-started/ | UI Kit independent, actual source links, no invented commands | checked |
| /?page=…&other=params#hash | Preserve query/hash at /showcase/; replace history | checked |
| /showcase/?page=gallery,event-calendar,date-picker | Existing React demo behavior | checked |

Components: FrontX Button (action links, disclosure buttons), existing SegmentedControl/ToggleGroup (diagram), Lucide (icons), existing theme.css and source tokens (both surfaces). New site domain layout and diagram are compositions, not replacement primitives. Diagram is architecture illustration, not an analytical chart or product Artifact graph. No screenshot UI.

Interactions: primary link to guide, source links, page navigation, diagram state (pointer/keyboard/history/reload), mobile nav, retained demos. No real data/API writes. Static source cards have no artificial loading/error states; interactive Showcase preserves existing fixtures. One entry transition plus user-triggered transform/opacity; reduced-motion disables it. 320/390/768/1440 targets. No horizontal body overflow. Static information and navigation remain without JS.

## Verification — 6 October 2026

- `npm run build`: passed TypeScript, established Vite catalogue entry, and seven Astro routes. Eight HTML routes total including /showcase/.
- `npm audit`: zero reported vulnerabilities after the compatible source-map-js patch update; raw JSON retained.
- Static path/HTTP check: 14 local referenced destinations valid; 16 representative local routes/assets/downloads returned HTTP 200. See static-verification.json.
- Existing source hash comparison: only main.tsx and style.css differ among baseline source files. Tokens plus remaining styles reproduce the baseline CSS exactly. ShowcaseApp contains the extracted existing app and the requested home backlink; calendar, charts, picker and other component sources unchanged.
- CUA browser: home at 1440/768/390/320 px; no horizontal body overflow. Tablet hero now stacks. Template catalogue, Shell detail, Back, libraries and starting guide checked. GitHub/manifest targets inspected against pinned source records; no install or external mutation performed.
- Diagram: all three pointer states, keyboard ArrowRight + Space, URL query, Back and reload checked. Emulated reduced motion reports animation none / transition 0s; preference restored. No automatic cycling.
- Legacy URL with theme and #main redirects to /showcase/ with full query/fragment. Calendar query survives; retained gallery and date-picker navigation verified. Calendar tabs and sidebar visually restored after build-boundary correction. Inline picker year changed to 2028 successfully. Browser console error capture empty on final home.
- Screenshot: home-desktop.png (ignored local review evidence). Earlier sidebar and clipped-tab regression during direct client-only Astro embedding was rejected and repaired by preserving the accepted Vite catalogue entry. It is not shipped as the defective island.

## Boundaries and outstanding review

New website composition awaits owner review. This is a smoke check of retained demos, not a new exhaustive calendar regression audit. No automated WCAG certification, performance score, pixel-perfect claim or production readiness claim. Catalogue retains its existing large JS chunk warning; it is excluded from the Astro homepage. No public deployment. Existing download archives/release manifest still describe the preceding released Showcase snapshot; see README.

Shared-component coverage: reused Button, SegmentedControl/ToggleGroup, Lucide and FrontX tokens; existing shared controls were not modified. Representative consumers are the homepage diagram and retained calendar/date-picker tabs. This FrontX app has no Studio Foundations story; the new site composition is covered by the local page/state records, not by a duplicated primitive story. Studio source and catalogue untouched.

Claude conceptual review is recorded in root docs/qa/claude-delegations/2026-10-06-frontx-astro-entry/ and indexed in the delegation log. It informed CTA/source paths, not evidence that the browser passed.

