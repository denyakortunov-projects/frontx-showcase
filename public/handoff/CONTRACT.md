# Proposed widget integration contract

Status: developer handoff for the showcase, 25 September 2026. This is a proposal, not an accepted FrontX or GTS standard.

## React composition

The demo API is `WidgetChart({ kind, period })`, where `kind` is one of `area | line | bar | ranked | donut | pie | radar | radial | scatter | stacked`, and `period` is a day count used by applicable time-series examples. Keep chart rendering data-driven through Recharts 3.10.1 and FrontX `ChartContainer`; do not draw decorative substitutes for interactive charts.

The eventual shared package should expose typed React compositions over `@gears-frontx/ui-kit` 0.4.0-alpha.5 (React 19). That future package API, exports, CSS delivery, and versioning still require FrontX owner review. A showcase component name is not evidence that the package exports it.

## Layout and themes

- Grid: 12 columns; widget widths: 3, 4, 6, 8, or 12 columns.
- Heights: M = 304 px, L = 464 px, XL = 624 px. Width and height are independent choices.
- Keep panel boundaries aligned for widgets at the same grid height. Let content size to its container; titles, legends, axes, and values must fit without overlap.
- On a one-column narrow layout, preserve reading order and allow necessary local table scrolling. Minimum-content requirements may make some width/height combinations unsuitable; offer a valid larger size rather than hiding content.
- Theme variants: Fabric blue; editorial terracotta/serif; terminal dark green. Theme may substantially change appearance while retaining shared behavior, data meaning, and reading order.

## Runtime JSON is a proposal

Serializable runtime JSON is a separate integration path from React props. No schema, GTS identifiers, or runtime renderer has been accepted here. Do not present an invented JSON shape as a FrontX standard. Before implementation, find the existing FrontX GTS dashboard/widget types and agree ownership, identifiers, versioning, and validation with their maintainers.

When approved, runtime configuration should select an allowlisted widget kind, version, size, theme, and permitted options, and bind fields to application-resolved data. The consuming product owns data access, permissions, domain semantics, and action handling. Reject unknown kinds, versions, and invalid sizes clearly. Never execute code, JSX, CSS, or callbacks from JSON. React and runtime paths should use the same renderer and produce equivalent content.

## Integrator acceptance checks

- Build the demo and inspect all ten kinds with synthetic data; verify chart content responds to its container dimensions.
- Check representative 3/4/6/8/12-column widths at M/L/XL, including narrow one-column reflow and long labels. Confirm no clipped content, overlap, or page-level horizontal overflow.
- Switch among all three themes and confirm data, reading order, and interaction meaning stay consistent.
- Check empty and invalid configuration behavior if runtime JSON is later implemented; errors should be clear and contain no executable fallback.
- Verify keyboard access, visible focus, accessible names, reduced motion, and readable contrast in the eventual consumer.
- Before treating widgets as shared product components, install their published package in an independent FrontX consumer and verify styles and assets resolve without Studio globals.

No checks are claimed as passed by this handoff.
