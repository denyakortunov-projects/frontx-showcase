# Calendar and DatePicker

Use these for date selection. Use EventCalendar for scheduled events. There is no FullCalendar engine dependency in this date-selection path.

## Installed FrontX components

```tsx
import '@gears-frontx/ui-kit/theme.css';
import { Calendar } from '@gears-frontx/ui-kit/calendar';
import { DatePicker } from '@gears-frontx/ui-kit/date-picker';

<Calendar mode="single" selected={date} onSelect={setDate} />
<DatePicker selected={date} onSelect={setDate} aria-label="Departure date" />
<DatePicker mode="range" selected={range} onSelect={setRange} aria-label="Departure and return" />
```

Tested kit version: 0.4.0-alpha.5, React 19. `date` is Date | undefined; `range` is `{ from: Date | undefined; to?: Date } | undefined`. Keep both in controlled host state. The range may be incomplete after the first click. Do not book/submit until the host has validated a complete range. Single-date selection normally closes the popup; range normally stays open for two selections. The host can control `open/onOpenChange`.

For inline display import Calendar directly. FrontX DatePicker already composes Popover, Calendar and Button/Input following the shadcn recipe; do not introduce a second primitive library. Sources: https://ui.shadcn.com/docs/components/base/date-picker and the installed FrontX types.

## Responsive range wrapper

`date-picker/ResponsiveDatePicker.tsx` in the component archive wraps the existing DatePicker API. It uses one month at viewport widths ≤640px and two above that (or the requested numberOfMonths). State remains in your form while the popup resizes. The wrapper is a client component (`use client`); its first render uses one month on both server and client, then an effect adapts to the viewport. This matching initial state avoids a hydration mismatch; an initially open desktop popup may expand after mount. It ships a small scoped stylesheet; no Showcase page CSS is required.

```tsx
import { useState } from 'react';
import { ResponsiveDatePicker } from './date-picker/ResponsiveDatePicker';

function TripDates() {
  const [range, setRange] = useState<{from: Date | undefined; to?: Date}>();
  return <ResponsiveDatePicker mode="range" selected={range} onSelect={setRange}
    aria-label="Departure and return" />;
}
```

Round trip in the Showcase is a date-only example, not a booking integration or a time-of-day picker. For time slots use separate time fields alongside dates; ticket/business rules belong to the consuming form.

## Dates, limits and validation

- These Date objects represent local calendar dates. Serialize with local getFullYear/getMonth/getDate to YYYY-MM-DD. Do not use toISOString().slice(0,10), which may shift a day in some zones.
- `disabled` is a Calendar day-matcher/array (e.g. `{before: minimumDate}`), not a disabled field/trigger flag. The installed API has no separate trigger-disabled prop. For a non-editable form state, render a labelled read-only value in the host; do not simulate disabling with opacity or CSS alone. Validate the whole selected range in the host when a date inside it is forbidden.
- Set `locale` for the kit's date-fns locale, including grid and formatted labels. Calendar's full props support additional inline scenarios.
- Use a visible label linked by id and an accessible name. The Showcase demonstrates clearing, URL restoration, keyboard selection and responsive range selection.
- The input variant parses the kit's locale-formatted date string; it is not a free-form natural-language parser. Host form error policy and required-field validation remain your responsibility.

The wrapper is a local source composition; Calendar and DatePicker themselves are installed kit exports. Full product/mobile-device certification is not claimed by browser checks.
