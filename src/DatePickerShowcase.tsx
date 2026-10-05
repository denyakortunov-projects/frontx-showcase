import { Tabs, TabsTrigger, TabsContent } from "@gears-frontx/ui-kit/tabs";
import { SectionTabs } from "./showcase/SectionTabs";
import { PageHeader } from "./showcase/PageHeader";
import { DateFormatSettings } from "./showcase/DateFormatSettings";
import { preferencesFromQuery, useDatePreferences } from "./date-picker/date-preferences";
import { DateCalendar } from "./date-picker/DateCalendar";
import { Button } from "@gears-frontx/ui-kit/button";
import { ResponsiveDatePicker } from "./date-picker/ResponsiveDatePicker";
import "./showcase/date-picker-showcase.css";
const parse = (value: string | null) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) || serialize(date) !== value
    ? undefined
    : date;
};
const serialize = (date: Date | undefined) =>
  date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : "";
export function DatePickerShowcase({
  query,
  update,
}: {
  query: URLSearchParams;
  update: (v: Record<string, string>) => unknown;
}) {
  const tab = query.get("pickTab") === "integration" ? "integration" : "preview";
  const preferences = useDatePreferences(preferencesFromQuery(query));
  const selected = parse(query.get("pickDate") ?? "2026-10-05");
  const from = parse(query.get("pickFrom") ?? "2026-10-05");
  const requestedEnd = parse(query.get("pickTo") ?? "2026-10-12");
  const to =
    from && requestedEnd && requestedEnd >= from ? requestedEnd : undefined;
  const range = from ? { from, to } : undefined;
  const setDate = (d: Date | undefined) =>
    update({ pickDate: serialize(d) || "none" });
  return (
    <Tabs className="date-picker-showcase" value={tab} onValueChange={v => update({ pickTab: String(v) })}>
      <PageHeader title="Date picker" actions={<>
        <DateFormatSettings query={query} update={update}/>
        <SectionTabs aria-label="Date picker examples">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </SectionTabs>
      </>} />
      <TabsContent value="preview">
      <div className="date-picker-examples">
        <section className="date-picker-example">
          <h2 className="showcase-card-title">Single date</h2>
          <label htmlFor="example-date">Date</label>
          <ResponsiveDatePicker
            localeCode={preferences.locale}
            weekStartsOn={preferences.weekStartsOn}
            id="example-date"
            aria-label="Choose date"
            selected={selected}
            onSelect={setDate}
          />
          <div className="date-picker-value">
            <output>{serialize(selected) || "No date selected"}</output>
            <Button
              variant="ghost"
              size="sm"
              disabled={!selected}
              onClick={() => setDate(undefined)}
            >
              Clear date
            </Button>
          </div>
        </section>
        <section className="date-picker-example">
          <h2 className="showcase-card-title">Round trip</h2>
          <label htmlFor="example-range">Departure — Return</label>
          <ResponsiveDatePicker
            localeCode={preferences.locale}
            weekStartsOn={preferences.weekStartsOn}
            id="example-range"
            aria-label="Choose date range"
            mode="range"
            selected={range}
            onSelect={(r) =>
              update({
                pickFrom: serialize(r?.from) || "none",
                pickTo: serialize(r?.to) || "none",
              })
            }
          />
          <div className="date-picker-value">
            <output>
              {from
                ? `${serialize(from)} → ${to ? serialize(to) : "Choose end date"}`
                : "No range selected"}
            </output>
            <Button
              variant="ghost"
              size="sm"
              disabled={!from}
              onClick={() => update({ pickFrom: "none", pickTo: "none" })}
            >
              Clear range
            </Button>
          </div>
        </section>
        <section className="date-picker-example date-picker-inline">
          <h2 className="showcase-card-title">Inline calendar</h2>
          <DateCalendar
            mode="single"
            selected={selected}
            onSelect={setDate}
            defaultMonth={selected ?? new Date(2026, 9, 1)}
            today={new Date(2026, 9, 5)}
            localeCode={preferences.locale}
            weekStartsOn={preferences.weekStartsOn}
          />
        </section>
      </div>
      </TabsContent>
      <TabsContent value="integration" className="date-picker-guide">
        <h2>Integrate Date picker</h2>
        <div className="cal-handoff-links">
          <a href="/handoff/frontx-calendar-components.zip" download>Download components</a>
          <a href="/handoff/DATE-PICKER.md" download>Integration guide</a>
        </div>
        <h3>Choose the right component</h3>
        <table>
          <tbody>
            <tr>
              <th>Calendar</th>
              <td>Pick a day directly on the page.</td>
              <td>
                <code>@gears-frontx/ui-kit/calendar</code>
              </td>
            </tr>
            <tr>
              <th>DatePicker</th>
              <td>Pick a date or range in a form.</td>
              <td>
                <code>@gears-frontx/ui-kit/date-picker</code>
              </td>
            </tr>
            <tr>
              <th>EventCalendar</th>
              <td>View and edit scheduled events.</td>
              <td>
                <a href="?page=event-calendar&calTab=integration">
                  Local composition · integration guide
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          These examples compose installed FrontX primitives with shared date
          styling and month/year navigation. Values belong to the host form.
        </p>
      </TabsContent>
    </Tabs>
  );
}
