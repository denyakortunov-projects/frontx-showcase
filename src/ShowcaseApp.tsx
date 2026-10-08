import SiteHeader from './site/SiteHeader';
import SiteFooter from './site/SiteFooter';
import {initSiteNavigation,syncSiteNavigation} from './site/navigation';
import './site/chrome.css';
import './site/catalogue-chrome.css';
import BrandLockup from './site/BrandLockup';
import { PageHeader } from "./showcase/PageHeader";
import { SectionTabs } from "./showcase/SectionTabs";
import {
  WidgetFrame,
  WidgetDensitySwitch,
  widgetHeight,
  type WidgetDensity,
} from "./WidgetFrame";
import React, {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  lazy,
  Suspense,
} from "react";
import { Button } from "@gears-frontx/ui-kit/button";
import { Card } from "@gears-frontx/ui-kit/card";
import {
  Tabs,
  TabsTrigger,
  TabsContent,
} from "@gears-frontx/ui-kit/tabs";
import { NativeSelect } from "@gears-frontx/ui-kit/native-select";
import { Input } from "@gears-frontx/ui-kit/input";
import { Switch } from "@gears-frontx/ui-kit/switch";
import { Badge } from "@gears-frontx/ui-kit/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@gears-frontx/ui-kit/table";
import {
  CalendarDays,
  ArrowUpRight,
  ArrowUpDown,
  ArrowLeft,
  Code2,
  Copy,
  Download,
  Grid2X2,
  Moon,
  Sun,
  Check,
  SlidersHorizontal,
  ChartArea,
  ChartLine,
  ChartColumn,
  ChartPie,
  Radar,
  ChartScatter,
  Gauge,
  ChevronRight,
  Search,
  CircleDashed,
  RotateCcw,
  AlertCircle,
  Component,
  Layers,
  ExternalLink,
} from "lucide-react";
import { WidgetChart, widgets, chartData, type WidgetKind } from "./widgets";
import "@gears-frontx/ui-kit/theme.css";
import "./style.css";
import {ComponentOverview} from './showcase/ComponentOverview';
import {ComponentGuide} from './showcase/ComponentGuide';
import {componentCatalogue} from './showcase/component-catalogue';
import { Elements } from "./Elements";
import { Themes } from "./ThemeGallery";
import { Modularity } from "./Modularity";
import { Compositions } from "./Compositions";
import { themes, paletteFor } from "./themes";
import { useShowcaseQuery } from "./calendar/navigation";
const DatePickerShowcase = lazy(() => import("./DatePickerShowcase").then(m => ({ default: m.DatePickerShowcase })));
const CalendarShowcase = lazy(() => import("./CalendarShowcase").then(m => ({ default: m.CalendarShowcase })));
import { utilityRows } from "./UtilityWidgets";

type Route =
  | "overview"
  | "component"
  | "date-picker"
  | "event-calendar"
  | "gallery"
  | "layouts"
  | "elements"
  | "handoff"
  | "widget"
  | "themes"
  | "modularity";
type LoadState = "ready" | "loading" | "empty" | "error";
function Control({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <label className="control">
      <span>{label}</span>
      <NativeSelect
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </NativeSelect>
    </label>
  );
}
function DataGrid({
  kind,
  period = 30,
}: {
  kind: WidgetKind;
  period?: number;
}) {
  const [sort, setSort] = useState(false);
  const rows = (
    kind === "calendar" || kind === "builds"
      ? utilityRows(kind)
      : chartData(kind, period)
  ) as Record<string, unknown>[];
  const columns: Record<WidgetKind, string[]> = {
    area: ["label", "organic", "paid"],
    line: ["label", "conversions", "conversionsTarget"],
    bar: ["label", "visitors", "target"],
    ranked: ["label", "value"],
    donut: ["segment", "value"],
    pie: ["segment", "value"],
    radar: ["label", "value", "target"],
    radial: ["label", "value", "target"],
    scatter: ["label", "x", "y", "value", "segment"],
    stacked: ["label", "newShare", "returningShare"],
    composed: ["label", "visitors", "conversionRate"],
    waterfall: ["label", "increase", "decrease", "total"],
    funnel: ["label", "value"],
    treemap: ["label", "value"],
    bubble: ["label", "x", "y", "value", "segment"],
    heatmap: ["date", "value"],
    calendar: ["date", "revenue"],
    builds: ["id", "status", "durationSeconds", "branch"],
  };
  const keys = columns[kind];
  const names: Record<string, string> = {
    label:
      kind === "ranked"
        ? "Contributor"
        : kind === "radar"
          ? "Dimension"
          : kind === "stacked"
            ? "Channel"
            : "Period",
    segment: "Channel",
    value: kind === "ranked" ? "Changes" : kind === "radar" ? "Score" : "Value",
    newShare: "New %",
    returningShare: "Returning %",
    organic: "Organic",
    paid: "Paid",
    conversions: "Conversions",
    conversionsTarget: "Target",
    visitors: "Visits",
    target: "Target",
    conversionRate: "Conversion %",
    date: "Date",
    name: "Release",
    id: "Build",
    status: "Status",
    version: "Version",
    durationSeconds: "Duration (seconds)",
    branch: "Branch",
    increase: "Increase",
    decrease: "Decrease",
    total: "Total",
    x: kind === "bubble" ? "Adoption %" : "Activity %",
    y: "Engagement",
  };
  const visible = sort
    ? [...rows].sort((a, b) =>
        String(a[keys[0]]).localeCompare(String(b[keys[0]])),
      )
    : rows;
  return (
    <Table
      label="Widget dataset"
      density="compact"
      containerClassName="data-scroll"
    >
      <TableHeader>
        <TableRow>
          {keys.map((key, i) => (
            <TableHead key={key}>
              {i === 0 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSort(!sort)}
                  icon={<ArrowUpDown size={14} />}
                >
                  {names[key] || key}
                </Button>
              ) : (
                names[key] || key
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {visible.map((row, i) => (
          <TableRow key={i}>
            {keys.map((key) => (
              <TableCell key={key}>
                {typeof row[key] === "number"
                  ? (row[key] as number).toLocaleString()
                  : String(row[key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function ChartIcon({ kind }: { kind: WidgetKind }) {
  const Icon = {
    area: ChartArea,
    line: ChartLine,
    bar: ChartColumn,
    ranked: ChartColumn,
    donut: ChartPie,
    pie: ChartPie,
    radar: Radar,
    radial: Gauge,
    scatter: ChartScatter,
    stacked: ChartColumn,
    composed: ChartLine,
    waterfall: ChartColumn,
    funnel: Layers,
    treemap: Grid2X2,
    bubble: ChartScatter,
    heatmap: Grid2X2,
    calendar: Grid2X2,
    builds: Layers,
  }[kind];
  return <Icon size={16} />;
}
function SidebarLink({active,label,icon,onClick}:{active:boolean;label:string;icon:ReactNode;onClick:()=>void}) {
 return <Button variant="navigation" className="site-side-link" data-active={active || undefined} aria-current={active ? "page" : undefined} icon={icon} onClick={onClick}>{label}</Button>;
}
export default function ShowcaseApp() {
  useEffect(initSiteNavigation, []);
  const [q, update] = useShowcaseQuery();
  useEffect(syncSiteNavigation,[q.toString()]);
  const page = (
    [
      "overview",
      "component",
      "date-picker",
      "event-calendar",
      "gallery",
      "layouts",
      "elements",
      "handoff",
      "widget",
      "themes",
      "modularity",
    ].includes(q.get("page") || "")
      ? q.get("page")
      : "overview"
  ) as Route;
  const kind = (
    widgets.some((w) => w.id === q.get("widget")) ? q.get("widget") : "area"
  ) as WidgetKind;
  const theme = themes.map((t) => t.id as string).includes(q.get("theme") || "")
    ? q.get("theme")!
    : "fabric";
  const dark = false;
  const width = [3, 4, 6, 8, 9, 12].includes(Number(q.get("width")))
    ? Number(q.get("width"))
    : 6;
  const height = [304, 464, 624].includes(Number(q.get("height")))
    ? Number(q.get("height"))
    : 464;
  const density: WidgetDensity =
    q.get("density") === "compact" ? "compact" : "standard";
  const state = (
    ["ready", "loading", "empty", "error"].includes(q.get("state") || "")
      ? q.get("state")
      : "ready"
  ) as LoadState;
  const period =
    q.get("period") === "7"
      ? 7
      : q.get("period") === "30"
        ? 30
        : kind === "heatmap"
          ? 365
          : 30;
  const tab = q.get("tab") || "preview";
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.dataset.brand = theme;
    paletteFor(theme, dark).forEach((color, i) =>
      document.documentElement.style.setProperty(`--viz-${i + 1}`, color),
    );
  }, [dark, theme]);
  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(""), 2600);
      return () => clearTimeout(t);
    }
  }, [notice]);
  const go = (p: Route, id?: WidgetKind) => {
    update({ page: p, widget: id || "", tab: "preview" });
    window.scrollTo({ top: 0 });
  };
  const current = widgets.find((w) => w.id === kind)!;
  const config = {
    schemaVersion: "0.1-demo",
    kind,
    period,
    layout: { columns: width, height: widgetHeight(height, density), density },
    theme,
    state,
  };
  const json = JSON.stringify(config, null, 2);
  const code = `import { WidgetChart } from './widgets';\nimport { WidgetFrame } from './WidgetFrame';\n\n// Local showcase compositions, not UI Kit exports.\n<WidgetFrame title="${current.title}" height={${height}} density="${density}">\n  <WidgetChart kind="${kind}" period={${period}} />\n</WidgetFrame>`;
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Copied to clipboard");
    } catch {
      setNotice("Clipboard unavailable. Select and copy the code.");
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([json], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `frontx-${kind}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="frontx-catalogue">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteHeader section="kit"/>
      <div className="catalogue-localbar"><nav aria-label="UI Kit sections">
       {([['overview','Components',['overview','component','event-calendar','date-picker','gallery','widget','elements']],['layouts','Examples',['layouts','modularity']],['themes','Foundations',['themes','handoff']]] as [Route,string,string[]][]).map(([route,label,pages])=><a key={route} href={`?page=${route}`} aria-current={pages.includes(page)?'page':undefined} onClick={e=>{e.preventDefault();go(route)}}>{label}</a>)}
      </nav></div>
      <div className="catalogue-mobile-pages"><Control label="UI Kit page" value={page==='widget'?'gallery':page==='component'?'overview':page} onChange={value=>go(value as Route)} options={[
       ['overview','All components'],['gallery','Charts & widgets'],['event-calendar','Event calendar'],['date-picker','Date picker'],['elements','Elements'],['layouts','Compositions'],['modularity','Sizing & density'],['themes','Themes'],['handoff','Developer handoff']
      ]}/></div>
      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">COMPONENTS</div>
          <SidebarLink active={page === "overview" || page === "component"} label="All components" icon={<Grid2X2 size={17}/>} onClick={() => go("overview")}/>
          <SidebarLink active={page === "gallery" || page === "widget"} label="Charts & widgets" icon={<ChartArea size={17}/>} onClick={() => go("gallery")}/>
          <SidebarLink active={page === "event-calendar"} label="Event calendar" icon={<CalendarDays size={17}/>} onClick={() => go("event-calendar")}/>
          <SidebarLink active={page === "date-picker"} label="Date picker" icon={<CalendarDays size={17}/>} onClick={() => go("date-picker")}/>
          <SidebarLink active={page === "elements"} label="Elements" icon={<Component size={17}/>} onClick={() => go("elements")}/>
          {(page === "gallery" || page === "widget") && <details className="chart-navigation" open={page === "widget"}><summary>Browse charts</summary>
            {widgets.map(w => <SidebarLink key={w.id} active={page === "widget" && kind === w.id} label={w.title} icon={<ChartIcon kind={w.id}/>} onClick={() => go("widget", w.id)}/>)}</details>}
          <div className="sidebar-label">EXAMPLES</div>
          <SidebarLink active={page === "layouts"} label="Compositions" icon={<Layers size={17}/>} onClick={() => go("layouts")}/>
          <SidebarLink active={page === "modularity"} label="Sizing & density" icon={<Grid2X2 size={17}/>} onClick={() => go("modularity")}/>
          <div className="sidebar-label">FOUNDATIONS</div>
          <SidebarLink active={page === "themes"} label="Themes" icon={<CircleDashed size={17}/>} onClick={() => go("themes")}/>
          <SidebarLink active={page === "handoff"} label="Developer handoff" icon={<Code2 size={17}/>} onClick={() => go("handoff")}/>
          <div className="sidebar-foot">
            <span>Built with FrontX UI Kit</span>
            <code>0.4.0-alpha.5</code>
            <small>Synthetic demo datasets</small>
          </div>
        </aside>
        <main id="main">
          <div className="page-topline">
            <span>
              UI Kit <ChevronRight size={13} />{" "}
              {page === "overview" ? "All components" : page === "component" ? componentCatalogue.find(c=>c.id===q.get("component"))?.title || "Component" : page === "date-picker" ? "Date picker" : page === "event-calendar" ? "Event calendar" : page === "widget"
                ? current.title
                : page === "gallery"
                  ? "Charts & widgets"
                  : page === "layouts"
                    ? "Compositions"
                    : page === "elements"
                      ? "Elements"
                      : page === "themes"
                        ? "Color & themes"
                        : page === "modularity"
                          ? "Sizing & density"
                          : "Developers"}
            </span>
            <span className="theme-choice">
              <span className="small-label">THEME</span>
              <span className="theme-name">
                {themes.find((t) => t.id === theme)?.name}
              </span>
              {themes.map(({ id: t }) => (
                <button
                  key={t}
                  title={`${t} theme`}
                  aria-label={`${t} theme`}
                  aria-pressed={theme === t}
                  className={`theme-dot ${t}`}
                  onClick={() => update({ theme: t })}
                />
              ))}
            </span>
          </div>
          {page === "overview" && <ComponentOverview query={q} update={update}/>}
          {page === "component" && <ComponentGuide query={q} update={update}/>}
          {page === "date-picker" && <Suspense fallback={<p role="status">Loading date picker…</p>}><DatePickerShowcase query={q} update={update}/></Suspense>}
          {page === "event-calendar" && <Suspense fallback={<p role="status">Loading calendar…</p>}><CalendarShowcase query={q} update={update}/></Suspense>}
          {page === "gallery" && (
            <>
              <PageHeader title="Charts & widgets" actions={<>
                <span className="showcase-page-meta">{widgets.length} widgets</span>
                <Button variant="outline" onClick={() => go("layouts")} icon={<ArrowUpRight />}>Explore compositions</Button>
              </>} />
              <div className="gallery-toolbar">
                <div className="category-tabs">
                  {[
                    ["all", "All charts"],
                    ["cartesian", "Cartesian"],
                    ["polar", "Polar"],
                    ["comparison", "Comparison"],
                    ["tools", "Tools"],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      aria-pressed={filter === v}
                      onClick={() => setFilter(v)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <div className="gallery-actions">
                  <WidgetDensitySwitch
                    value={density}
                    onChange={(value) => update({ density: value })}
                  />
                  <label className="search">
                    <Search size={16} />
                    <Input
                      aria-label="Search widgets"
                      placeholder="Find a widget…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="gallery">
                {[...widgets]
                  .sort(
                    (a, b) =>
                      [
                        "area",
                        "donut",
                        "bar",
                        "radar",
                        "line",
                        "pie",
                        "ranked",
                        "radial",
                        "scatter",
                        "stacked",
                        "composed",
                        "waterfall",
                        "funnel",
                        "treemap",
                        "bubble",
                        "heatmap",
                        "calendar",
                        "builds",
                      ].indexOf(a.id) -
                      [
                        "area",
                        "donut",
                        "bar",
                        "radar",
                        "line",
                        "pie",
                        "ranked",
                        "radial",
                        "scatter",
                        "stacked",
                        "composed",
                        "waterfall",
                        "funnel",
                        "treemap",
                        "bubble",
                        "heatmap",
                        "calendar",
                        "builds",
                      ].indexOf(b.id),
                  )
                  .filter(
                    (w) =>
                      (filter === "all" ||
                        (filter === "tools"
                          ? ["calendar", "builds", "heatmap"].includes(w.id)
                          : filter === "polar"
                            ? ["pie", "donut", "radar", "radial"].includes(w.id)
                            : filter === "comparison"
                              ? [
                                  "bar",
                                  "ranked",
                                  "stacked",
                                  "waterfall",
                                  "funnel",
                                  "treemap",
                                ].includes(w.id)
                              : [
                                  "area",
                                  "line",
                                  "scatter",
                                  "composed",
                                  "bubble",
                                ].includes(w.id))) &&
                      w.title.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((w, i) => (
                    <section key={w.id} className="gallery-item">
                      <WidgetFrame
                        title={w.title}
                        subtitle={w.description}
                        height={340}
                        density={density}
                        action={
                          <Button
                            variant="ghost"
                            aria-label={`Explore ${w.title}`}
                            onClick={() => go("widget", w.id)}
                            icon={<ArrowUpRight size={17} />}
                          />
                        }
                      >
                        <WidgetChart kind={w.id} />
                      </WidgetFrame>
                      <div className="gallery-caption">
                        <span>
                          <code>{String(i + 1).padStart(2, "0")}</code>
                          {w.category}
                        </span>
                        <button onClick={() => go("widget", w.id)}>
                          Explore <ChevronRight size={14} />
                        </button>
                      </div>
                    </section>
                  ))}
              </div>
              {search &&
                !widgets.some((w) =>
                  w.title.toLowerCase().includes(search.toLowerCase()),
                ) && (
                  <div className="empty-search">
                    No widgets match “{search}”.{" "}
                    <Button variant="link" onClick={() => setSearch("")}>
                      Clear search
                    </Button>
                  </div>
                )}
            </>
          )}
          {page === "widget" && (
            <>
              <button className="back-link" onClick={() => go("gallery")}>
                <ArrowLeft size={15} />
                All widgets
              </button>
              <PageHeader title={current.title} description={current.description} actions={
                <Button variant="outline" icon={<Download />} onClick={download}>Get configuration</Button>
              } />
              <div className="playground-controls">
                <div className="density-control">
                  <span>Widget height</span>
                  <WidgetDensitySwitch
                    value={density}
                    onChange={(value) => update({ density: value })}
                  />
                </div>
                <Control
                  label="Width"
                  value={String(width)}
                  options={[3, 4, 6, 8, 9, 12].map((v) => [
                    String(v),
                    `${v} columns`,
                  ])}
                  onChange={(v) => update({ width: v })}
                />
                <Control
                  label="Height"
                  value={String(height)}
                  options={[
                    ["304", "M · 304 px"],
                    ["464", "L · 464 px"],
                    ["624", "XL · 624 px"],
                  ]}
                  onChange={(v) => update({ height: v })}
                />
                <Control
                  label="State"
                  value={state}
                  options={["ready", "loading", "empty", "error"].map((v) => [
                    v,
                    v[0].toUpperCase() + v.slice(1),
                  ])}
                  onChange={(v) => update({ state: v })}
                />
                {kind !== "calendar" &&
                  kind !== "builds" &&
                  kind !== "stacked" && (
                    <Control
                      label="Period"
                      value={String(period)}
                      options={[
                        ["7", "Last 7 days"],
                        ["30", "Last 30 days"],
                        ...(kind === "heatmap"
                          ? [["365", "Last 365 days"] as [string, string]]
                          : []),
                      ]}
                      onChange={(v) => update({ period: v })}
                    />
                  )}
                <div className="size-readout">
                  <Grid2X2 size={17} />
                  <span>
                    {width} / 12 × {widgetHeight(height, density)}px
                  </span>
                </div>
              </div>
              <Tabs
                value={tab}
                onValueChange={(v) => update({ tab: String(v) })}
              >
                <SectionTabs>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">React</TabsTrigger>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                </SectionTabs>
                <TabsContent value="preview">
                  <div className="playground-grid">
                    <div
                      className="playground-cell"
                      style={{ "--span": width } as CSSProperties}
                    >
                      <WidgetFrame
                        title={current.title}
                        subtitle={
                          kind === "calendar"
                            ? "Sample revenue · September 1–25, 2026"
                            : kind === "builds"
                              ? "Sample builds · September 24–25, 2026"
                              : kind === "heatmap"
                                ? "Sample data · window adapts to widget width"
                                : kind === "stacked"
                                  ? "Sample audience shares · each channel totals 100%"
                                  : `Sample data · last ${period} days`
                        }
                        height={height}
                        density={density}
                        state={state}
                        retry={() => update({ state: "ready" })}
                      >
                        <WidgetChart kind={kind} period={period} />
                      </WidgetFrame>
                    </div>
                    <span className="grid-caption">
                      12-column grid · independent height
                    </span>
                  </div>
                </TabsContent>
                <TabsContent value="code">
                  <div className="code-panel">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Copy />}
                      onClick={() => copy(code)}
                    >
                      Copy React
                    </Button>
                    <pre>{code}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="config">
                  <div className="code-panel">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Copy />}
                      onClick={() => copy(json)}
                    >
                      Copy JSON
                    </Button>
                    <pre>{json}</pre>
                    <p>
                      Showcase configuration v0.1. Proposed contract; not a
                      published GTS schema.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="data">
                  <div className="data-panel">
                    <DataGrid kind={kind} period={period} />
                  </div>
                </TabsContent>
              </Tabs>
              <div className="usage-grid">
                <div>
                  <h2>When to use</h2>
                  <p>
                    {current.description} Use the Data view when exact values
                    matter.
                  </p>
                </div>
                <div>
                  <h2>Composition contract</h2>
                  <p>
                    Width and height are independent. On narrow screens, the
                    widget fills the available column. Theme changes preserve
                    the dataset and interactions.
                  </p>
                </div>
                <div>
                  <h2>Implementation</h2>
                  <p>
                    {kind === "calendar"
                      ? "FrontX ChartContainer + Recharts AreaChart."
                      : kind === "builds"
                        ? "FrontX Table, Badge and Base UI Dialog."
                        : "FrontX ChartContainer + Recharts."}{" "}
                    The same renderer powers the gallery, playground and
                    compositions.
                  </p>
                </div>
              </div>
            </>
          )}
          {page === "layouts" && <Compositions query={q} update={update} />}
          {page === "modularity" && <Modularity query={q} update={update} />}
          {page === "themes" && (
            <Themes
              current={theme}
              dark={dark}
              select={(theme) => update({ theme })}
            />
          )}
          {page === "elements" && (
            <>
              <PageHeader title="UI elements" actions={<span className="showcase-page-meta">20 components</span>} />
              <Elements />
            </>
          )}
          {page === "handoff" && (
            <>
              <PageHeader title="Developer handoff" actions={
                <a className="download-link" href="/handoff/frontx-showcase-source.zip" download><Download size={17} />Download source</a>
              } />
              <section className="handoff-summary">
                <div><h2>Calendar components</h2><p>Event scheduling and date selection have separate APIs. The source bundle includes both, their dependencies and a working React example.</p></div>
                <ul>
                  <li><a href="/handoff/frontx-calendar-components.zip" download>Download calendar components</a></li>
                  <li><a href="/handoff/EVENT-CALENDAR.md" download>EventCalendar integration</a></li>
                  <li><a href="/handoff/DATE-PICKER.md" download>DatePicker and ranges</a></li>
                </ul>
              </section>
              <section className="handoff-summary">
                <div><h2>Chart axes</h2><p>Shared numeric scales use rounded steps and adapt to plot size. Update the widget source and axis helper together.</p></div>
                <ul><li><a href="/handoff/CHART-AXES.md" download>Numeric-axis rules and integration</a></li></ul>
              </section>
              <div className="handoff-grid">
                <section>
                  <span className="step-number">01</span>
                  <h2>Use the existing kit</h2>
                  <p>
                    The demo installs the published FrontX UI Kit. Buttons,
                    tabs, cards, tables and chart containers are reused
                    directly.
                  </p>
                  <pre>npm install @gears-frontx/ui-kit@0.4.0-alpha.5</pre>
                </section>
                <section>
                  <span className="step-number">02</span>
                  <h2>Bring the compositions</h2>
                  <p>
                    WidgetChart, WidgetFrame and the grid are showcase
                    compositions. Their final home and GTS identifiers are
                    agreed with FrontX before integration.
                  </p>
                  <a href="/handoff/CONTRACT.md" download>
                    Composition contract <ArrowUpRight size={16} />
                  </a>
                </section>
                <section>
                  <span className="step-number">03</span>
                  <h2>Connect your data</h2>
                  <p>
                    Replace synthetic fixtures with a product adapter. Keep
                    formatting, units, color roles and empty/error states in the
                    shared widget contract.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => go("widget", "area")}
                  >
                    Inspect an example
                  </Button>
                </section>
              </div>
              <div className="handoff-summary">
                <div>
                  <h2>Shared structure. Your product.</h2>
                  <p>
                    Five themes demonstrate that typography, surfaces, radii and
                    palettes can change without forking widgets. Layout is
                    chosen by developers or AI; an end-user dashboard editor is
                    a later layer.
                  </p>
                </div>
                <ul>
                  <li>
                    <Check />
                    React + TypeScript
                  </li>
                  <li>
                    <Check />
                    Base UI / shadcn contract
                  </li>
                  <li>
                    <Check />
                    Recharts v3
                  </li>
                  <li>
                    <Check />
                    Independent width & height
                  </li>
                  <li>
                    <Check />
                    Preview / code / data
                  </li>
                  <li>
                    <Check />
                    Proposed JSON configuration
                  </li>
                </ul>
              </div>
              <p className="integration-note">
                Demonstration, not a production dashboard service. No accounts,
                live APIs or AI requests. Configuration is a proposal, not an
                established GTS schema.
              </p>
            </>
          )}

        </main>
      </div>
      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}
      <SiteFooter/>
    </div>
  );
}
