# Shared Showcase navigation

SectionTabs composes the installed FrontX TabsList and keeps its keyboard/focus behaviour. Use it inside FrontX Tabs with normal TabsTrigger/TabsContent. It supplies one named button-group visual treatment for hover, selected, focus and disabled; do not restyle those states on individual pages.

Consumers: CalendarShowcase (Preview / Playground / Integration), chart playground (Preview / React / Configuration / Data), TokenActivity (size=sm), Elements Tabs example. The same style is used across all palettes and modes. Tabs still represent content/view selection; they are not action buttons.

Calendar Day/Week/Month/Year and event-colour ToggleGroups retain their separately accepted component variants. Filters, navigation links and standalone actions do not become tabs merely because they use buttons.

SegmentedControl uses the same visual states over FrontX ToggleGroup for non-tab choices: WidgetDensitySwitch (all chart/gallery/composition consumers), module width/height, and composition period. It ignores an empty single-choice selection. Keyboard navigation comes from Base UI. No hand-rolled pressed state remains in these grouped selectors.
