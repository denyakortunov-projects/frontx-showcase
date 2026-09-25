# Funnel and mosaic refinement

Baseline: accepted public v0.2.1, source 6f9f2bdfe2c35b13775f60ebbe2a9ffcd95bed47.

Owner requested cleaner widgets 13 and 14. Reused the existing FrontX ChartContainer and Recharts funnel/treemap, preserving source data, tooltip and Data tab. Funnel labels and counts now use one aligned column; duplicate legend removed. Mosaic renders only leaf tiles with 8px gaps, soft palette colors and direct text; narrow tiles omit labels while retaining full tooltip/title and Data tab.

34 browser assertions passed across light/dark modes, 3/6/12-column widths, 304px height and mobile. Checks cover contained text, no overflowing funnel, exactly nine unlayered mosaic tiles, displayed counts matching Data, and no runtime errors. Light/dark and mobile screenshots visually reviewed. No dependencies or other applications changed.

Additional owner refinement: replaced the calendar with Revenue pulse, a large metric with 25-point Recharts sparkline and paired Data view; legacy URL kind preserved. Selected Token Activity tabs use primary fill and foreground. Another 37 browser checks passed in light/dark, desktop/mobile, covering all three selected modes, metric value, data rows and overflow. Screenshots reviewed. Old calendar QA reports remain historical v0.2.1 evidence and are superseded by metric-tabs-report.json.
