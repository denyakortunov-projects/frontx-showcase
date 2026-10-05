# Date selection: DateCalendar and ResponsiveDatePicker

These source compositions reuse the installed FrontX Calendar, Popover and Button primitives. They belong in your existing React application. They do not load FullCalendar or the event scheduling model.

## Copy and render

Copy the entire `date-picker/` directory from `frontx-calendar-components.zip`. Import `@gears-frontx/ui-kit/theme.css` once in your host. Component CSS imports itself and needs no Showcase CSS/router. Tested with FrontX UI Kit 0.4.0-alpha.5 and React 19.

```tsx
import '@gears-frontx/ui-kit/theme.css';
import { DateCalendar } from './date-picker/DateCalendar';
import { ResponsiveDatePicker } from './date-picker/ResponsiveDatePicker';

<DateCalendar mode="single" selected={date} onSelect={setDate} />
<ResponsiveDatePicker selected={date} onSelect={setDate} aria-label="Departure" />
<ResponsiveDatePicker mode="range" selected={range} onSelect={setRange}
  aria-label="Departure and return" closeOnSelect />
```

`date` is `Date | undefined`. `range` is `{from: Date | undefined; to?: Date} | undefined`. Both are controlled by the host. First click starts a new incomplete range; second click completes it, including same-day ranges. Clicking a complete range starts a new selection. Clear resets it to undefined. Done is unavailable until both dates are present. With `closeOnSelect`, a range closes only after the second selection; otherwise Done closes it. Single selection closes by default. `open/onOpenChange` support host-controlled popups.

## Navigation and responsive layout

Month and year dropdowns are available in inline and popup calendars. Default navigation bounds are 1900–2100, expanded to retain an existing selected date outside that interval; set `startMonth/endMonth` to your product's intended window. Navigation bounds are not business validation. Use `disabled` day matchers and host validation for availability rules.

Range popups show two months above 640px and one below; `numberOfMonths` overrides the desktop count. Live resize retains selection. Use the host's themed `container` for the portalled popup when tokens are scoped to a subtree. The initial client-boundary render uses one month on both server and client; an initially open desktop popup can expand after mount. SSR and native mobile devices require product-level verification.

`DateCalendar` accepts installed `CalendarProps` plus optional `localeCode` (BCP 47). It retains `components`, `classNames`, `formatters`, `labels`, controlled month and disabled-day seams. Shared appearance is declared once in date-picker.css. The Showcase supplies data and layout only.

## International formats

By default, these compositions use the browser's preferred language/region after mount. This normally follows browser/system language preferences; browsers do not expose every custom operating-system date pattern. Date display is Gregorian, matching the component's date model.

- `localeCode="en-US"`, `"en-GB"`, `"de-DE"`, `"ru-RU"`, etc. explicitly select formatting. The installed `locale` date-fns object is also supported; `localeCode` takes precedence for displayed dates/months/weekdays. DateCalendar accepts `labels` for translated controls.
- `weekStartsOn` explicitly overrides the regional week start. Otherwise Intl.Locale week information is used, with a regional fallback for older engines.
- Range `clearLabel`, `doneLabel` and `rangeHint` let the host translate the footer. Default control copy is English; this is not a complete product translation layer.
- The Showcase's Formats menu demonstrates region, time-format and week-start preferences stored in its URL. These controls are not required to embed the component. ISO values below fields demonstrate serialization and intentionally stay YYYY-MM-DD.
- The preserved `variant="input"` delegates to the installed kit DatePicker and its locale-formatted parser. Supply its `locale` object for translated input parsing. The enhanced button-popup-only options (`localeCode`, navigation bounds, footer labels, week-start override) do not configure that legacy input recipe; use the enhanced button variant or compose DateCalendar with your form's input when those are needed.

## Validation and ownership

Date objects represent local calendar dates. Serialize with local getFullYear/getMonth/getDate, not toISOString().slice(0,10). `disabled` is a Calendar day-matcher/array, not a disabled trigger flag. For non-editable forms render a labelled read-only host value. Validate the complete range, including any forbidden date inside it, before submission. Required-field, availability and booking rules belong to your form.

There is no time-of-day or booking integration in the round-trip example. For scheduled events use EventCalendar. Its event instants/timezones are separate from date-only selection.

The underlying installed `Calendar` and `DatePicker` remain available directly from `@gears-frontx/ui-kit/calendar` and `@gears-frontx/ui-kit/date-picker`. These enhanced compositions are local source exports, not new exports in the published UI Kit.
