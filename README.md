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

- `src/widgets.tsx`: ten chart renderers through FrontX ChartContainer and Recharts.
- `src/data.ts`: shared deterministic fixtures.
- `src/WidgetFrame.tsx`: common header/body and loading/empty/error states.
- `src/main.tsx`: gallery, playground, compositions, elements and handoff.
- `src/style.css`: responsive grid and Fabric/editorial/terminal themes.
- `public/handoff/`: integration notes and source download.

Use React 19 and `@gears-frontx/ui-kit@0.4.0-alpha.5`; no copied primitive library. Product-owned adapters will provide real data, permissions, actions and persistence. The proposed JSON config describes this demo only; it is not a generic code executor or a production GTS renderer.

Width and height are selected independently. End-user drag/resize editing is deliberately deferred. Small containers switch to one column. Use chart Data tabs for exact values and the shared-data chart/table composition for comparison.

Third-party components retain their respective licenses. FrontX kit includes Apache-2.0 and upstream notices in its installed package.
