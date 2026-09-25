# FrontX Showcase developer handoff

This is a static Vite demo of proposed reusable widget compositions built on `@gears-frontx/ui-kit` `0.4.0-alpha.5`. It demonstrates how a consumer could compose installed FrontX primitives; the showcased widgets are not published FrontX exports.

## Start here

- Install and run with the app's package manager: `npm install`, then `npm run dev`.
- Build with `npm run build`; this runs TypeScript checking and creates the static Vite site.
- The project targets React 19, Recharts 3.10.1 and the installed FrontX kit. Reuse its `ChartContainer` and other existing primitives. Do not add a parallel primitive library.
- `WidgetChart({ kind, period })` is the chart demo entry point. Supported kinds: `area`, `line`, `bar`, `ranked`, `donut`, `pie`, `radar`, `radial`, `scatter`, and `stacked`.
- Data is deterministic synthetic demo data from `src/data.ts`; it is not product data and has no backend, accounts, or AI requests.

## Proposed composition rules

The layout uses a 12-column grid. Width and height are independent: supported width spans are 3, 4, 6, 8, and 12 columns; heights are M 304 px, L 464 px, and XL 624 px. Preserve the selected height while rendering each chart. In narrow containers, use one column and keep widgets in reading order. Respect intrinsic/min-content needs: a chart, title, legend, and controls must remain usable; avoid clipping labels or forcing page-wide horizontal overflow.

Three showcase themes demonstrate product flexibility: Fabric blue, editorial terracotta with serif typography, and terminal dark green. Themes may visibly restyle typography, palette, surfaces, borders, and radii while preserving the same data meaning and widget behavior. These are demo choices, not approved product themes.

## Handoff boundary

The demo illustrates proposed compositions and sizing for review. Product teams own dataset resolution, permissions, domain meaning, formatting conventions, and actions. Integrators should import maintained widget implementations from the eventual FrontX package when available; this showcase does not establish package exports, production API compatibility, or a supported distribution contract.

For current requirements and acceptance checks, see [CONTRACT.md](CONTRACT.md). Download the source archive alongside this handoff to run the same demo locally.
