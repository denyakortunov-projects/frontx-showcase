# Shared Showcase navigation

SectionTabs composes the installed FrontX TabsList and keeps its keyboard/focus behaviour. Use it inside FrontX Tabs with normal TabsTrigger/TabsContent. It supplies one named button-group visual treatment for hover, selected, focus and disabled; do not restyle those states on individual pages.

Consumers: CalendarShowcase (Preview / Playground / Integration), chart playground (Preview / React / Configuration / Data), TokenActivity (size=sm), Elements Tabs example. The same style is used across all palettes and modes. Tabs still represent content/view selection; they are not action buttons.

Calendar Day/Week/Month/Year and event-colour ToggleGroups retain their separately accepted component variants. Filters, navigation links and standalone actions do not become tabs merely because they use buttons.

SegmentedControl uses the same visual states over FrontX ToggleGroup for non-tab choices: WidgetDensitySwitch (all chart/gallery/composition consumers), module width/height, and composition period. It ignores an empty single-choice selection. Keyboard navigation comes from Base UI. No hand-rolled pressed state remains in these grouped selectors.


DateFormatSettings is a catalogue control composed from installed Popover, Button and NativeSelect. It writes dateLocale/timeFormat/weekStart URL preferences for both date-picker and event-calendar routes. Reusable date-preferences.ts contains only host settings resolution; it does not depend on this control, router or Showcase CSS. Keep localization of control copy separate from date/time formatting.

## Catalogue page structure

Use `PageHeader` for every catalogue route (including widget details). It owns the page title, optional factual description, action row and responsive spacing. Page titles use 32px/40px, weight 600 and -0.025em tracking; below 760px use 28px/35px. Do not override its h1 on a route or retain separate hero/detail/calendar header recipes. `showcase-card-title` provides the standard 15px/1.4 example title. Component interiors may retain intentional density variants.

All pages share the main content inset. Do not add a second centered max-width wrapper around a catalogue grid. Actions use installed FrontX controls; view navigation uses SectionTabs. Date picker uses URL-backed Preview / Integration (`pickTab`) with Base UI tab panels and browser Back restoration. Preview shows single-date, range and inline examples; integration material belongs in the separate panel. Existing ISO values and date settings remain host-controlled.
