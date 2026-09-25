# FrontX review refinements — 2026-09-25

Baseline: published source e5ab664 and publication record bf66a19. Owner requested visually distinct adjacent charts, a calendar without scrolling, removal of treemap artifacts, a readable compact activity window, and independent palette/mode controls with stable typography and geometry. Existing authorization to update this site and its associated GitHub repository remains the release scope. No Studio changes.

- Replaced vertical daily channel bars with horizontal 100% new/returning audience comparisons across five channels. Preview, tooltip units and Data columns use the same proportions. Fixed sample distribution has no misleading period selector.
- Retained the FrontX Calendar primitive. Six full weeks fit at minimum supported card height without an internal scrollbar. Selected-date details use Base UI Dialog, including empty dates, keyboard selection and focus return.
- Treemap draws only leaf nodes; parent/root nodes no longer show through gaps. Tile backgrounds are opaque and labels truncate correctly, with readable name/value plates in light and dark.
- Activity window adapts to the actual widget width: under 360 px = up to 30 days; under 760 px = up to 90 days; wider = up to 365 days. The selected period caps this window; the displayed period is labelled. Cumulative/weekly values use visible-window data. Data tab retains the selected source period.
- Color palette changes only colors. Light/dark changes only mode. Added Terminal light colors, removed forced dark mode and the mode toggle's forced Fabric fallback, removed brand-specific fonts, sizes and radii. All five palettes retain identical component geometry. Updated developer handoff accordingly.

Verification: production TypeScript/Vite build; 43 calendar/chart checks, 17 activity/treemap checks and 45 palette/mode checks passed with zero JavaScript errors. Palette checks compare computed font family/size/weight/spacing, radii and element rectangles at desktop and mobile, for all ten palette/mode combinations. Activity cumulative totals match the visible subset of Data rows. Calendar checks cover six-week months, widths 3/6/12 at 304 px height, light/dark, desktop/mobile gallery, date dialog and keyboard focus. Reviewed screenshots of calendar, horizontal comparison, treemap and month/quarter activity in light/dark.

Scope remains synthetic-data showcase; no backend integrations or product permissions are changed.
