# Proposed widget integration contract

Status: developer handoff for the showcase, 25 September 2026. This is a proposal, not an accepted FrontX or GTS standard.

## React composition

The demo API is `WidgetChart({ kind, period })`, where `kind` is one of `area | line | bar | ranked | donut | pie | radar | radial | scatter | stacked | composed | waterfall | funnel | treemap | bubble | heatmap | calendar | builds`, and `period` is a day count used by applicable time-series examples. Keep chart rendering data-driven through Recharts 3.10.1 and FrontX `ChartContainer`; do not draw decorative substitutes for interactive charts.

The eventual shared package should expose typed React compositions over `@gears-frontx/ui-kit` 0.4.0-alpha.5 (React 19). That future package API, exports, CSS delivery, and versioning still require FrontX owner review. A showcase component name is not evidence that the package exports it.

## Layout and themes

- Grid: 12 columns; widget widths: 3, 4, 6, 8, 9, or 12 columns.
- Standard heights: M = 304 px, L = 464 px, XL = 624 px. Compact density renders at 65% (198, 302, 406 px). Gallery heights are 340/221 px. Width and density are independent choices, and the same widget/data renderer serves both. `WidgetFrame({ height, density })` owns the size and compact visual spacing; the URL uses `density=compact`.
- Keep panel boundaries aligned for widgets at the same grid height. Let content size to its container; titles, legends, axes, and values must fit without overlap.
- On a one-column narrow layout, preserve reading order and allow necessary local table scrolling. Minimum-content requirements may make some width/height combinations unsuitable; offer a valid larger size rather than hiding content.
- Color palettes: Fabric blue; Editorial terracotta; Terminal green; Iris violet; Lagoon teal. Each supports light and dark independently. Palette switching changes only color tokens. Keep typography, font sizes, spacing, geometry and radii unchanged.

## Runtime JSON is a proposal

Serializable runtime JSON is a separate integration path from React props. No schema, GTS identifiers, or runtime renderer has been accepted here. Do not present an invented JSON shape as a FrontX standard. Before implementation, find the existing FrontX GTS dashboard/widget types and agree ownership, identifiers, versioning, and validation with their maintainers.

When approved, runtime configuration should select an allowlisted widget kind, version, size, theme, and permitted options, and bind fields to application-resolved data. The consuming product owns data access, permissions, domain semantics, and action handling. Reject unknown kinds, versions, and invalid sizes clearly. Never execute code, JSX, CSS, or callbacks from JSON. React and runtime paths should use the same renderer and produce equivalent content.

## Integrator acceptance checks

- Build the demo and inspect all eighteen kinds with synthetic data; verify chart content responds to its container dimensions.
- Check Standard and Compact at representative 3/4/6/8/9/12-column widths and M/L/XL heights, including narrow one-column reflow and long labels. Confirm no clipped content, overlap, or page-level horizontal overflow.
- Switch among all five themes and confirm data, reading order, and interaction meaning stay consistent.
- Check empty and invalid configuration behavior if runtime JSON is later implemented; errors should be clear and contain no executable fallback.
- Verify keyboard access, visible focus, accessible names, reduced motion, and readable contrast in the eventual consumer.
- Before treating widgets as shared product components, install their published package in an independent FrontX consumer and verify styles and assets resolve without Studio globals.

No checks are claimed as passed by this handoff.

## Modularity and recipes

The visual width unit maps to three CSS grid columns. The grid has 12 columns. Standard uses 16 px gaps and 144 px rows; Compact uses 10 px gaps and 94 px rows. Heights are calculated as rowSpan × rowHeight + (rowSpan − 1) × gap. Preserve document order when placing items; narrow layouts stack them with their configured height. The demo bounds layouts to eight widgets and validates chart kind and dimensions from URL state.

Compositions expose reproducible recipe JSON and the installed primitives they use. Keep all declared chart/table relationships on shared data. Example workflow activity is synthetic and is not an audit log.

Series palette tokens --viz-1 through --viz-6 are separate from semantic success/warning/danger tokens. Preserve category-to-color mapping across views and provide labels, tooltips and a data view. Theme swaps must not change data meaning.

Revenue pulse replaces the release calendar with a large USD metric, period comparison and a data-driven sparkline. The legacy `calendar` kind remains URL-compatible and now resolves to Revenue pulse. Its Data view exposes the same 25 dated revenue values. Token Activity selected mode uses a contrasting primary fill in both display modes.
