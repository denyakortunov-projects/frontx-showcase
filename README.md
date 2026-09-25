# FrontX Showcase

Interactive gallery of modular charts and Fabric-style elements, using the published FrontX UI Kit. A demonstration and integration proposal, not a production analytics service or an accepted GTS schema.

## Run

Node.js 22 or 24:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The application is static. Deploy `dist/` with no server, environment variables, database or credentials. Query-string routes work without server rewrites. All data is synthetic, fixed to 25 September 2026.

## Structure

- `src/widgets.tsx`: widget catalogue and 16 data visualizations using FrontX ChartContainer and Recharts.
- `src/data.ts`: shared deterministic fixtures.
- `src/WidgetFrame.tsx`: common header/body and loading/empty/error states.
- `src/main.tsx`: gallery, chart playground, URL navigation and handoff.
- `src/UtilityWidgets.tsx`: Release calendar and Build activity using FrontX Calendar, Table, Badge and Dialog.
- `src/TokenActivity.tsx`: annual activity grid, token aggregation and keyboard selection.
- `src/Elements.tsx`: 20 interactive installed-kit examples.
- `src/Compositions.tsx`: three complete screen recipes with shared data.
- `src/Modularity.tsx`: 1/2/3/4-block width sandbox, independent row spans and JSON.
- `src/UtilityWidgets.tsx`: release calendar and interactive build table.
- `src/TokenActivity.tsx`: calendar heatmap with daily, weekly and cumulative modes.
- `src/themes.ts`, `src/ThemeGallery.tsx`: five palettes, modes and token handoff.
- `src/style.css`: responsive grid and five product themes.
- `public/handoff/`: integration notes and source download.

Use React 19 and `@gears-frontx/ui-kit@0.4.0-alpha.5`; no copied primitive library. Product-owned adapters will provide real data, permissions, actions and persistence. The proposed JSON config describes this demo only; it is not a generic code executor or a production GTS renderer.

Width and height are selected independently. End-user drag/resize editing is deliberately deferred. Small containers switch to one column. Use chart Data tabs for exact values and the shared-data chart/table composition for comparison.

Third-party components retain their respective licenses. FrontX kit includes Apache-2.0 and upstream notices in its installed package.
