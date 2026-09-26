# FrontX Showcase developer handoff

This is a static Vite demo of proposed reusable widget compositions built on `@gears-frontx/ui-kit` `0.4.0-alpha.5`. It demonstrates how a consumer could compose installed FrontX primitives; the showcased widgets are not published FrontX exports.

## Start here

- Install and run with the app's package manager: `npm install`, then `npm run dev`.
- Build with `npm run build`; this runs TypeScript checking and creates the static Vite site.
- The project targets React 19, Recharts 3.10.1 and the installed FrontX kit. Reuse its `ChartContainer` and other existing primitives. Do not add a parallel primitive library.
- `WidgetChart({ kind, period })` is the chart demo entry point. Supported kinds: `area`, `line`, `bar`, `ranked`, `donut`, `pie`, `radar`, `radial`, `scatter`, `stacked`, `composed`, `waterfall`, `funnel`, `treemap`, `bubble`, `heatmap`, `calendar`, and `builds`.
- Data is deterministic synthetic demo data from `src/data.ts`; it is not product data and has no backend, accounts, or AI requests.

## Proposed composition rules

The layout uses a 12-column grid. Width and height are independent: supported width spans are 3, 4, 6, 8, 9, and 12 columns. Standard heights are M 304 px, L 464 px, and XL 624 px. The Compact density is 65% of each selected height, rounded to whole pixels (198, 302, 406 px); gallery cards switch from 340 to 221 px. The switch preserves chart kind, data, period, color scheme and light/dark mode. Pass `density="compact"` to `WidgetFrame`; the same rendering component is reused. Compact changes spacing and typography within the widget, not the palette. The table card may scroll inside its own boundary. In narrow containers, use one column and keep widgets in reading order. Respect intrinsic/min-content needs: a chart, title, legend, and controls must remain usable; avoid clipping labels or forcing page-wide horizontal overflow.

Five color palettes are available: Fabric blue, Editorial terracotta, Terminal green, Iris violet, and Lagoon teal. Every palette supports light and dark mode. Palette and mode are independent: the dots change colors only, the sun/moon button changes mode only. Fonts, font sizes, spacing, layout and radii remain identical across palettes and modes. The Colors page exposes the six series tokens and copyable JSON; src/themes.ts is the palette source. These are demo choices, not approved product themes.

## Handoff boundary

The demo illustrates proposed compositions and sizing for review. Product teams own dataset resolution, permissions, domain meaning, formatting conventions, and actions. Integrators should import maintained widget implementations from the eventual FrontX package when available; this showcase does not establish package exports, production API compatibility, or a supported distribution contract.

For current requirements and acceptance checks, see [CONTRACT.md](CONTRACT.md). Download the source archive alongside this handoff to run the same demo locally.

## Interactive recipes

The Modularity page demonstrates 1/2/3/4-block widths (3/6/9/12 columns) independently of 2/3/4 row spans. Standard rows are 144 px with 16 px gaps (304/464/624 px); Compact rows are 94 px with 10 px gaps (198/302/406 px). The same Standard/Compact choice works in the gallery, individual widget pages, compositions and the Modularity sandbox. Select a card using its size button, resize it, change its chart, add/remove modules, or start from a preset. Configuration is URL-addressable and copyable; it is not a drag editor or persisted dashboard service.

Compositions includes Product analytics, Delivery overview and Audience insights. A shared period filter feeds time-based charts and tables; fixed scores and category shares remain fixed. Each recipe exposes components and layout JSON. The Elements page renders 20 real UI Kit components with local demo interactions, including keyboard tabs, menus and overlays. No invitations or access changes are sent to a backend.

Token activity uses a data-driven calendar with Daily / Weekly / Cumulative modes, dated tooltips, keyboard selection and light/dark tokens. Read the mode and unit before comparing intensities; cumulative values are running totals, not daily usage.

Revenue pulse and Build activity round out the gallery to 18 widgets; all data are synthetic.

## UI element inventory

The 20 examples use installed FrontX exports: Button, Badge, Tabs, Avatar, Accordion, Alert, Progress, Slider, Switch, Checkbox, RadioGroup, Input, Textarea, Select, DropdownMenu, Dialog, Tooltip, Popover, Skeleton, and Table. `src/Elements.tsx` is a runnable composition reference. Base UI owns keyboard and overlay behavior; CSS uses shared semantic tokens. The catalogue's updated muted background/foreground tokens correct the original tab and hover styling.

Architecture references: [shadcn components](https://ui.shadcn.com/docs/components), [shadcn charts](https://ui.shadcn.com/charts), and the installed FrontX kit's API declarations. Do not initialize a second headless library in a consuming FrontX app.

Token activity adapts its visible date window to its rendered width: below 360 px it shows up to 30 days, below 760 px up to 90 days, and otherwise up to 365 days. The selected period caps the window. Weekly and cumulative values are computed over that visible window. The Data tab exposes the selected source period, which may be longer than the compact view.

Audience by channel is a horizontal 100% stacked comparison with a fixed illustrative audience mix.

Revenue pulse replaces the release calendar with a large USD metric, period comparison and a data-driven sparkline. The legacy `calendar` kind remains URL-compatible and now resolves to Revenue pulse. Its Data view exposes the same 25 dated revenue values. Token Activity selected mode uses a contrasting primary fill in both display modes.
