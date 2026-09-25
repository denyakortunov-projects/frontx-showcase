# FrontX catalogue expansion

Accepted baseline: source c7e0208968dbe6a2ba57914c6f904e437521e67f, publication record f54b795. Owner explicitly praised and accepted published design, then requested 15 charts, ~20 attractive shadcn component examples, five documented palettes and publication to the same FrontX site. Follow-up adds an interactive demonstration of 1/2/3/4-block widget widths with independent heights.

Scope: existing independent apps/frontx-showcase only. Studio source is read-only reference; no Studio deployment. Figma not selected. No separate runtime kit, dependency updates or production data. Reuse @gears-frontx/ui-kit 0.4.0-alpha.5 and Recharts 3.10.1. Last accepted desktop shell, charts, route behavior and existing three themes remain except requested refinements.

Sources inspected: official https://ui.shadcn.com/docs/components and https://ui.shadcn.com/charts; installed UI kit exports; Studio components/ui/tabs.tsx, badge.tsx and catalogue guide. Existing kit uses Base UI/shadcn naming. Elements page is this app's living catalogue; all examples render installed runtime primitives. No Studio stories changed because its runtime is unchanged.

Implementation: five new real chart families; 20 runtime component examples with refined tabs/status; five named theme palettes and token documentation; width and height composition sandbox with JSON export. Width modules map to 3/6/9/12 CSS columns; row span and width independent. No drag editor, persistence or AI generation claims.

Delegation: retained user-authorized cheaper-model agents for isolated chart/data and Elements files. Lead owns themes, modularity, integration, review, QA and publication. No Claude Code task or secret context sent to agents.

Verification plan: same-size before/after screenshots, build/types; all 15 chart preview/data paths and narrow/wide sizes; 20 component examples including keyboard tabs and overlay focus/Escape; five themes in light/dark as supported; modularity selection, dimensions, add/remove, presets, URL history and JSON; responsive at 320/390/1280/1600/1920. Exact public release fingerprint and archive hash after deployment. Record actual results below; no blanket production/pixel-perfect claim.

Accepted additions during implementation: Token activity calendar heatmap (daily/weekly/cumulative, light/dark), plus Release calendar and Build activity to make 18 gallery entries; wide-screen three-column grid. Compositions expanded to full product/delivery/audience recipes with shared filters, tables, workflow examples and copyable implementation config. User reconfirmed shadcn/Base UI architecture; installed FrontX kit retained.

## Verified build

- TypeScript and Vite production build pass (Vite build 2.58 seconds). Existing single-bundle size warning remains; no dependency upgrades.
- Production preview at port 5201: 120 catalogue checks, 17 utility checks and 4 additional component flows passed with zero runtime JavaScript errors. JSON reports and repeatable browser scripts accompany this record.
- Checked all 18 gallery entries, 16 chart preview/data paths, all five palettes, 20 component examples, keyboard tabs with explicit Enter activation, menu and dialog lifecycle, modularity dimensions/selection/presets/history, three composition recipes, and page widths 320/390/1280/1920.
- Utility checks validate 365-day cumulative totals against Data rows, weekly totals, keyboard and pointer selection, tooltip units, calendar date/month/keyboard navigation, build sorting and distinct build details.
- Visual review: gallery, Elements light/dark, expanded delivery composition, annual heatmap light/dark, mobile 320 px. Intentional changes include three-column wide gallery, updated primitive muted/foreground token mapping, additional palettes and compositions.
- Fixed during QA: Base UI Menu.Group context, hidden calendar content, clipped heatmap at short heights, narrow gallery intrinsic width, metadata claiming a period filter on fixed utility fixtures, and inconsistent synthetic build stage totals. Local scrolling preserves long utility content.
- Additional production flows: Select updates its displayed value, Popover applies chosen categories, the local-only access form saves feedback, and Export JSON downloads three fixture rows.
- Source archive: 27 allowlisted public source files; each matches its release manifest hash. Private files, dependencies, credentials and Git metadata excluded.
- Associated GitHub origin verified: https://github.com/denyakortunov-projects/frontx-showcase, main at f54b795 before this update. User explicitly requested updating this repository after the build.

This is a synthetic-data showcase, with a proposed integration contract and local interactions; no product backends, access grants or CI services are connected.
