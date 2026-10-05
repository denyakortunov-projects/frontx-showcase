# FrontX numeric axes — 2026-10-05

## Request and source

Owner requested an English reply to Oleg Melnikov and implementation of shared readable-axis rules in the FrontX widget component and developer descriptions. Attached email/screenshot is evidence of the problem (55/65 increments), not authorization to contact anyone or migrate to TradingView.

Selected application: apps/frontx-showcase, a separate Git repository. Baseline HEAD 2daa268 (clean at start), last released runtime source aadbe1220058c2f4eb5d212258488adecf690974, public fingerprint f35639b9bf3f310e4a9079a061d684623fae989f75c134648ced776f6d7e3c43. HEAD is the subsequent release-record commit. No unrelated local changes or pending UI changes in this checkout. Root Studio-only design/release gates do not require rebuilding unchanged Studio; application AGENTS.md governs FrontX. No publication authorized in this request.

## Applied changes

- One src/chart-axis.ts helper: 1/2/5 × powers of ten, outward bounds, plot-size budget, integer counts, fractions, zero/constant/negative values, readable unique labels, explicit errors for unrepresentable machine ranges.
- Reused FrontX ChartContainer and direct Recharts axes inside the existing WidgetChart; no primitive or chart library added. Numeric Cartesian consumers: area, line, bar, ranked, composed, waterfall, scatter, bubble, stacked. Gallery/playground/compositions/modularity already reuse this renderer.
- Bounded shares/scores retain 0–100 with explicit 25/50 steps. Time/category/heatmap axes and unlabeled polar scales unchanged. Dual axes derive extents independently. Waterfall includes offsets; reusable stack helper separates positive/negative totals.
- Plot measurement uses chart size after legend, with existing axis margins reserved. About 32 px vertical / 80 px horizontal per interval. Increased percentage-stack right margin 8 → 24 px to contain the terminal 100% label on mobile.
- CHART-AXES.md, handoff contract, readmes, Developer handoff link and source packager updated. No published UI Kit export or consumer auto-update claimed.

## Evidence and checks

- Seven node:test cases passed, including screenshot-reported 220/260 ranges, fractional rates, negative stacks, empty/zero/count data, independent axes, label uniqueness and nonrepresentable machine values.
- 171 browser assertions passed on local development server; zero page errors. Nine affected widget kinds at standard/compact sizes, dual-axis dark mode, 390 px mobile, tick regularity, no numeric label collisions/clipping, fixed percentage domains, Data consistency, keyboard tab and Back, downloadable policy.
- Production TypeScript/Vite build passed; existing large-bundle warning remains.
- Final built-preview validation at http://127.0.0.1:5208: all 171 assertions passed, zero page errors (browser-report.json). The report and source archive were then refreshed; only generated static handoff/release files were copied into dist, with compiled JS/CSS unchanged.
- Inspected before-after.png: equal 600 px widget widths, 304 px heights, baseline widget source extracted from HEAD and current renderer using the same data/styles. Temporary comparison source removed after capture. Expected differences: nice visits scale, data-derived rate domain (0–4 versus previous fixed 0–8 in this fixture), and bounded 0–100 scatter axes. Line fixture already used a good scale and remains visually identical at that size. This is bounded visual review, not a pixel-perfect claim.
- Inspected after-line.png, dual-dark.png and mobile.png. Final mobile 100% label fully visible. No data/tooltip calculations changed; Data equality checked across density. External Nikita application was not accessed or tested.
- Local server/Chrome initially required approved host execution (EPERM in restricted environment); successful host runs are the evidence. Initial legacy Recharts tick selector failed because labels render in separate groups in 3.10; corrected selector targets actual rendered labels.

## Independent review

Claude Code provided four read-only test-planning suggestions; all accepted/adapted and verified by Codex. Record: docs/qa/claude-delegations/2026-10-05-frontx-axis-rules/RECORD.md in the parent workspace. Claude did not run tests, inspect the application or change files.

## Delivery boundary

Local implementation and updated downloadable source archive only. Existing consumers must adopt updated compositions/helper or a future published package version. Email is a draft; nothing sent. No npm publication, external integration or public deployment. Ready for publication after an explicit release request.
