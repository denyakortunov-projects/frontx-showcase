# Numeric axes for FrontX widgets

Owner-requested rule, 5 October 2026, following Oleg Melnikov's chart review. Implemented in this showcase's shared `src/chart-axis.ts` and used by `WidgetChart`. This is a local composition contract, not a new export of the installed `@gears-frontx/ui-kit`.

## Default rule

- Use evenly spaced major ticks with a step of **1, 2 or 5 × a power of ten**: 0.1, 0.2, 0.5; 1, 2, 5; 10, 20, 50; 100, 200, 500; etc. Select a larger step as the data range grows or the chart becomes smaller. Do not use nonlinear spacing within a linear axis.
- Round the domain outward to whole multiples of the selected step. Never divide the raw maximum into four equal intervals: that creates scales such as 0, 55, 110, 165, 220 or 0, 65, 130, 195, 260. At a plot height of 192 px these examples become 0–250 and 0–300, both with a step of 50. Smaller plots may use 100 instead.
- Derive density from **plot size**, after reserving space for labels, margins and the legend. The shared default budgets approximately 32 px per vertical interval and 80 px per horizontal interval, with 2–7 intervals. Recompute when the container or data changes. A fixed number of grid lines is not a requirement.
- Counts use integer ticks with a minimum step of 1. Fractional measurements retain meaningful decimal steps. This is metric metadata, not a guess based on today's sample values.
- Include zero for bars, areas and the current overview lines. A future zoomed line/scatter view may deliberately use `includeZero: false`, with visible context. Never truncate a bar baseline to exaggerate differences.
- Consider every series bound to the axis, including targets. Stacks use separate positive and negative totals, not the net total; waterfall bounds include their starting offsets and segment heights. Match the extent calculation to the consuming chart's actual stacking mode.
- Empty/all-nonfinite and all-zero data have a nondegenerate 0–1 fallback. Constant data remains visible. Nonfinite samples are excluded from scale calculation; the host still owns missing-data presentation. Machine ranges too extreme to represent reliably throw `RangeError`; rescale units before rendering.

## Semantic exceptions

- A share or bounded score has an explicit **0–100** domain. The shared `boundedPercentAxis` uses 0, 25, 50, 75, 100, or 0, 50, 100 in a small plot. The 25 step is a deliberate exception. Do not apply this domain to growth percentages or unbounded ratios.
- A 15-unit step can make sense for quarter-hour time intervals or another explicit domain convention. It is not the automatic default for arbitrary counts. Time axes need calendar-aware intervals; log axes need logarithmic ticks. Category labels and the activity calendar's month/day axes are unchanged.
- Each axis in a dual-axis chart chooses its own scale and units. Do not force identical tick counts by introducing awkward intervals. Use one primary grid; do not imply that grid alignment makes the quantities equivalent.
- Minor ticks are off in these overview widgets. Add subdivisions only when a detailed/zoomed view needs them, subordinate to major ticks. This change does not implement a zoom interaction.

## Labels and exact data

Round the scale, not the observations. Tick labels have consistent precision and may use K/M/B abbreviations only while remaining distinct. Do not independently round 165 into 170 without changing its tick position. Preserve source values in tooltips, value labels, Data tabs and exports. Name each metric and unit; a percentage suffix is not a substitute for identifying which percentage is shown.

## Integration

```tsx
import { numericAxis } from './chart-axis';

// Include every rendered series on this axis, and pass actual plot dimensions.
const { step, ...axisProps } = numericAxis(
  rows.flatMap(row => [row.actual, row.target]),
  { pixels: plotHeight, integer: true },
);

<YAxis {...axisProps} interval={0} />
```

Use `orientation: 'horizontal'` with plot width for numeric X axes. The helper returns `domain`, `ticks`, `tickFormatter` and `step`; `step` is policy metadata, not a Recharts prop. Keep Recharts axes as direct chart children. The shared `WidgetChart` observes its chart container, so gallery, playground, compositions and modular layouts use the same calculation. `boundedPercentAxis` returns plain numeric labels; the caller adds `%` only to percentage metrics, not scores.

The source archive includes this helper, all widget consumers and regression checks. Adopters must update/copy the composition and helper together, or later upgrade a package that actually exports them. Editing this document does **not** update an already installed UI Kit, Nikita's application, or code copied from an older archive. Publishing the catalogue/source download and integrating into another product are separate steps. No runtime JSON schema or remote auto-update mechanism is introduced.

## Checks

Run `node --test qa/axis-rules/model.test.ts` (Node 22.18+ or 24+) and `npm run build`. Run `DEMO_URL=http://127.0.0.1:5207 node qa/axis-rules/verify.mjs` against the local app with system Chrome. Check reported 220/260 ranges, tiny counts, fractional data, zeros, negative stacks, dual axes, resizing, label uniqueness, percentage domains, unchanged Data values and keyboard tab navigation. Browser evidence is recorded in `qa/axis-rules/REPORT.md`.

## Practice behind the rule

[D3 ticks](https://d3js.org/d3-array/ticks) uses the 1–2–5 family; [D3 linear nice](https://d3js.org/d3-scale/linear#linear_nice) expands domains to rounded bounds. [Highcharts axis intervals](https://api.highcharts.com/highcharts/xAxis.tickInterval) considers pixel spacing when choosing automatic intervals. The exact density and semantic exceptions above are FrontX showcase choices, not a claim that every chart library uses identical defaults.
