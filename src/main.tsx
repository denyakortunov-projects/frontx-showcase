import { WidgetFrame } from "./WidgetFrame";
import React, {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@gears-frontx/ui-kit/button";
import { Card } from "@gears-frontx/ui-kit/card";
import {
  Tabs,
  TabsList,
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
  ArrowUpRight,
  ArrowUpDown,
  ArrowLeft,
  Boxes,
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

type Route = "gallery" | "layouts" | "elements" | "handoff" | "widget";
type LoadState = "ready" | "loading" | "empty" | "error";
function useQuery() {
  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search),
  );
  useEffect(() => {
    const cb = () => setQuery(new URLSearchParams(location.search));
    window.addEventListener("popstate", cb);
    return () => window.removeEventListener("popstate", cb);
  }, []);
  const update = (values: Record<string, string>) => {
    const p = new URLSearchParams(location.search);
    Object.entries(values).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    history.pushState({}, "", `${location.pathname}?${p}`);
    setQuery(p);
  };
  return [query, update] as const;
}
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
  const rows = chartData(kind, period) as Record<string, unknown>[];
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
    stacked: ["label", "organic", "paid"],
  };
  const keys = columns[kind];
  const names: Record<string, string> = {
    label:
      kind === "ranked"
        ? "Contributor"
        : kind === "radar"
          ? "Dimension"
          : "Period",
    segment: "Channel",
    value: kind === "ranked" ? "Changes" : kind === "radar" ? "Score" : "Value",
    organic: "Organic",
    paid: "Paid",
    conversions: "Conversions",
    conversionsTarget: "Target",
    visitors: "Visits",
    target: "Target",
    x: "Activity %",
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
  }[kind];
  return <Icon size={16} />;
}
function App() {
  const [q, update] = useQuery();
  const page = (
    ["gallery", "layouts", "elements", "handoff", "widget"].includes(
      q.get("page") || "",
    )
      ? q.get("page")
      : "gallery"
  ) as Route;
  const kind = (
    widgets.some((w) => w.id === q.get("widget")) ? q.get("widget") : "area"
  ) as WidgetKind;
  const theme = ["fabric", "editorial", "terminal"].includes(
    q.get("theme") || "",
  )
    ? q.get("theme")!
    : "fabric";
  const dark = q.get("mode") === "dark" || theme === "terminal";
  const width = [3, 4, 6, 8, 12].includes(Number(q.get("width")))
    ? Number(q.get("width"))
    : 6;
  const height = [304, 464, 624].includes(Number(q.get("height")))
    ? Number(q.get("height"))
    : 464;
  const state = (
    ["ready", "loading", "empty", "error"].includes(q.get("state") || "")
      ? q.get("state")
      : "ready"
  ) as LoadState;
  const period = q.get("period") === "7" ? 7 : 30;
  const tab = q.get("tab") || "preview";
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.dataset.brand = theme;
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
    layout: { columns: width, height },
    theme,
    state,
  };
  const json = JSON.stringify(config, null, 2);
  const code = `import { WidgetChart } from './widgets';\nimport { WidgetFrame } from './WidgetFrame';\n\n// Local showcase compositions, not UI Kit exports.\n<WidgetFrame title="${current.title}" height={${height}}>\n  <WidgetChart kind="${kind}" period={${period}} />\n</WidgetFrame>`;
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
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <a
          href="?page=gallery"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            go("gallery");
          }}
        >
          <span className="brand-mark">
            <Boxes size={23} />
          </span>
          <span>
            front<span className="brand-x">x</span>
          </span>
          <span className="collection-label">collection</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {(["gallery", "layouts", "elements", "handoff"] as Route[]).map(
            (p) => (
              <a
                key={p}
                href={`?page=${p}`}
                aria-current={
                  page === p || (p === "gallery" && page === "widget")
                    ? "page"
                    : undefined
                }
                onClick={(e) => {
                  e.preventDefault();
                  go(p);
                }}
              >
                {
                  {
                    gallery: "Widgets",
                    layouts: "Compositions",
                    elements: "Elements",
                    handoff: "Developers",
                    widget: "",
                  }[p]
                }
              </a>
            ),
          )}
        </nav>
        <div className="top-actions">
          <span className="version">v0.1 preview</span>
          <Button
            variant="ghost"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() =>
              update({
                mode: dark ? "light" : "dark",
                theme: theme === "terminal" ? "fabric" : theme,
              })
            }
            icon={dark ? <Sun /> : <Moon />}
          />
          <a
            className="source-link"
            href="https://github.com/constructorfabric/gears-frontx"
            target="_blank"
            rel="noreferrer"
          >
            FrontX <ArrowUpRight size={16} />
          </a>
        </div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">EXPLORE</div>
          <button
            className={`side-link ${page === "gallery" ? "active" : ""}`}
            onClick={() => go("gallery")}
          >
            <Grid2X2 size={17} />
            All widgets<span>10</span>
          </button>
          <button
            className={`side-link ${page === "layouts" ? "active" : ""}`}
            onClick={() => go("layouts")}
          >
            <Layers size={17} />
            Compositions
          </button>
          <div className="sidebar-label">CHARTS</div>
          {widgets.map((w) => (
            <button
              key={w.id}
              className={`side-link ${page === "widget" && kind === w.id ? "active" : ""}`}
              onClick={() => go("widget", w.id)}
            >
              <ChartIcon kind={w.id} />
              {w.title}
            </button>
          ))}
          <div className="sidebar-label">FOUNDATIONS</div>
          <button
            className={`side-link ${page === "elements" ? "active" : ""}`}
            onClick={() => go("elements")}
          >
            <Component size={17} />
            Fabric elements
          </button>
          <button
            className={`side-link ${page === "handoff" ? "active" : ""}`}
            onClick={() => go("handoff")}
          >
            <Code2 size={17} />
            Developer handoff
          </button>
          <div className="sidebar-foot">
            <span>Built with FrontX UI Kit</span>
            <code>0.4.0-alpha.5</code>
            <small>Synthetic demo datasets</small>
          </div>
        </aside>
        <main id="main">
          <div className="page-topline">
            <span>
              Collection <ChevronRight size={13} />{" "}
              {page === "widget"
                ? current.title
                : page === "gallery"
                  ? "Widgets"
                  : page === "layouts"
                    ? "Compositions"
                    : page === "elements"
                      ? "Elements"
                      : "Developers"}
            </span>
            <span className="theme-choice">
              <span className="small-label">THEME</span>
              {["fabric", "editorial", "terminal"].map((t) => (
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
          {page === "gallery" && (
            <>
              <div className="page-heading">
                <div>
                  <h1>
                    Widgets.
                    <br />
                    <span className="heading-muted">Ready to compose.</span>
                  </h1>
                  <p className="intro">
                    Charts, building blocks and a grid that brings them
                    together.
                  </p>
                </div>
                <div className="heading-side">
                  <span className="count-label">THE COLLECTION</span>
                  <strong>
                    10<span> widgets</span>
                  </strong>
                  <Button
                    variant="outline"
                    onClick={() => go("layouts")}
                    icon={<ArrowUpRight />}
                  >
                    Explore compositions
                  </Button>
                </div>
              </div>
              <div className="gallery-toolbar">
                <div className="category-tabs">
                  {[
                    ["all", "All charts"],
                    ["cartesian", "Cartesian"],
                    ["polar", "Polar"],
                    ["comparison", "Comparison"],
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
                      ].indexOf(b.id),
                  )
                  .filter(
                    (w) =>
                      (filter === "all" ||
                        (filter === "polar"
                          ? ["pie", "donut", "radar", "radial"].includes(w.id)
                          : filter === "comparison"
                            ? ["bar", "ranked", "stacked"].includes(w.id)
                            : ["area", "line", "scatter"].includes(w.id))) &&
                      w.title.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((w, i) => (
                    <section
                      key={w.id}
                      className={`gallery-item ${w.id === "area" ? "featured" : ""}`}
                    >
                      <WidgetFrame
                        title={w.title}
                        subtitle={w.description}
                        height={340}
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
              <div className="detail-heading">
                <div>
                  <h1>{current.title}</h1>
                  <p>{current.description}</p>
                </div>
                <Button
                  variant="outline"
                  icon={<Download />}
                  onClick={download}
                >
                  Get configuration
                </Button>
              </div>
              <div className="playground-controls">
                <Control
                  label="Width"
                  value={String(width)}
                  options={[3, 4, 6, 8, 12].map((v) => [
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
                <Control
                  label="Period"
                  value={String(period)}
                  options={[
                    ["7", "Last 7 days"],
                    ["30", "Last 30 days"],
                  ]}
                  onChange={(v) => update({ period: v })}
                />
                <div className="size-readout">
                  <Grid2X2 size={17} />
                  <span>
                    {width} / 12 × {height}px
                  </span>
                </div>
              </div>
              <Tabs
                value={tab}
                onValueChange={(v) => update({ tab: String(v) })}
              >
                <TabsList variant="line">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">React</TabsTrigger>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <div className="playground-grid">
                    <div
                      className="playground-cell"
                      style={{ "--span": width } as CSSProperties}
                    >
                      <WidgetFrame
                        title={current.title}
                        subtitle={`Sample data · last ${period} days`}
                        height={height}
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
                    FrontX ChartContainer + Recharts. The same renderer powers
                    the gallery, playground and compositions.
                  </p>
                </div>
              </div>
            </>
          )}
          {page === "layouts" && (
            <>
              <div className="detail-heading">
                <div>
                  <h1>Compositions</h1>
                  <p>
                    A shared grid. Independent dimensions. The same widgets.
                  </p>
                </div>
                <Control
                  label="Composition"
                  value={q.get("layout") || "overview"}
                  options={[
                    ["overview", "Product overview"],
                    ["insight", "Chart + table"],
                    ["polar", "Polar collection"],
                  ]}
                  onChange={(v) => update({ layout: v })}
                />
              </div>
              <div className="layout-note">
                <Grid2X2 size={16} />
                12 columns <span>·</span>16 px gap <span>·</span>Shared row
                heights <span className="mock-label">Sample data</span>
              </div>
              {(q.get("layout") || "overview") === "overview" ? (
                <>
                  <div className="metric-row">
                    {[
                      ["Active users", "24,892", "+12.8%"],
                      ["Conversion", "6.42%", "+0.8 pp"],
                      ["Avg. response", "142 ms", "−18 ms"],
                      ["Availability", "99.98%", "Last 30 days"],
                    ].map(([l, v, d]) => (
                      <Card className="metric-card" key={l}>
                        <span>{l}</span>
                        <strong>{v}</strong>
                        <small>{d}</small>
                      </Card>
                    ))}
                  </div>
                  <div className="dashboard-grid">
                    <div className="span8">
                      <WidgetFrame
                        title="Traffic over time"
                        subtitle="Organic and paid visits · daily"
                        height={464}
                      >
                        <WidgetChart kind="area" />
                      </WidgetFrame>
                    </div>
                    <div className="span4">
                      <WidgetFrame
                        title="Traffic sources"
                        subtitle="Share of total visits"
                        height={464}
                      >
                        <WidgetChart kind="donut" />
                      </WidgetFrame>
                    </div>
                    <div className="span6">
                      <WidgetFrame title="Weekly activity" height={304}>
                        <WidgetChart kind="bar" />
                      </WidgetFrame>
                    </div>
                    <div className="span6">
                      <WidgetFrame title="Quality profile" height={304}>
                        <WidgetChart kind="radar" />
                      </WidgetFrame>
                    </div>
                  </div>
                </>
              ) : q.get("layout") === "insight" ? (
                <>
                  <div className="dashboard-grid">
                    <div className="span6">
                      <WidgetFrame
                        title="Top contributors"
                        subtitle="Completed changes · last 30 days"
                        height={464}
                      >
                        <WidgetChart kind="ranked" />
                      </WidgetFrame>
                    </div>
                    <div className="span6">
                      <WidgetFrame
                        title="Contributors"
                        subtitle="The same dataset · exact values"
                        height={464}
                      >
                        <DataGrid kind="ranked" />
                      </WidgetFrame>
                    </div>
                  </div>
                  <div className="layout-explainer">
                    <span>6 columns × L</span>
                    <span>6 columns × L</span>
                  </div>
                </>
              ) : (
                <div className="dashboard-grid">
                  {(["donut", "pie", "radar", "radial"] as WidgetKind[]).map(
                    (k) => (
                      <div className="span6" key={k}>
                        <WidgetFrame
                          title={widgets.find((w) => w.id === k)!.title}
                          height={464}
                        >
                          <WidgetChart kind={k} />
                        </WidgetFrame>
                      </div>
                    ),
                  )}
                </div>
              )}
            </>
          )}
          {page === "elements" && (
            <>
              <div className="detail-heading">
                <div>
                  <h1>Fabric elements</h1>
                  <p>
                    Existing FrontX primitives, composed in the Fabric language.
                  </p>
                </div>
                <Badge>UI Kit 0.4.0-alpha.5</Badge>
              </div>
              <div className="elements-grid">
                <Card className="element-card">
                  <h2>Actions</h2>
                  <div className="element-sample">
                    <Button
                      onClick={() => setNotice("Example action completed")}
                      icon={<Check />}
                    >
                      Create project
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setNotice("Outline action completed")}
                    >
                      View details
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setNotice("Secondary action completed")}
                    >
                      Duplicate
                    </Button>
                    <Button disabled>Unavailable</Button>
                  </div>
                  <code>@gears-frontx/ui-kit/button</code>
                </Card>
                <Card className="element-card">
                  <h2>Filters & controls</h2>
                  <div className="element-sample vertical">
                    <Input
                      aria-label="Example project name"
                      placeholder="Project name"
                    />
                    <Control
                      label="Workspace"
                      value={q.get("workspace") || "design"}
                      options={[
                        ["design", "Design systems"],
                        ["product", "Product engineering"],
                      ]}
                      onChange={(v) => update({ workspace: v })}
                    />
                    <label className="switch-row">
                      <Switch checked={enabled} onCheckedChange={setEnabled} />
                      Show comparison period
                    </label>
                  </div>
                  <code>@gears-frontx/ui-kit/input · switch</code>
                </Card>
                <Card className="element-card">
                  <h2>Tabs & status</h2>
                  <Tabs defaultValue="overview">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className="element-sample">
                        <Badge>Published</Badge>
                        <Badge variant="secondary">Draft</Badge>
                        <Badge variant="outline">In review</Badge>
                      </div>
                    </TabsContent>
                    <TabsContent value="activity">
                      <p>Three components updated in this demo workspace.</p>
                    </TabsContent>
                  </Tabs>
                  <code>@gears-frontx/ui-kit/tabs · badge</code>
                </Card>
                <Card className="element-card">
                  <h2>Card composition</h2>
                  <Card className="nested-card">
                    <div className="nested-icon">
                      <Boxes />
                    </div>
                    <strong>Content Policy</strong>
                    <p>Rules and evaluation for generated content.</p>
                    <div>
                      <Badge variant="outline">Gear</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setNotice("Demo component selected")}
                        icon={<ArrowUpRight />}
                      >
                        Explore
                      </Button>
                    </div>
                  </Card>
                  <code>@gears-frontx/ui-kit/card</code>
                </Card>
              </div>
              <h2 className="section-title">One table. Multiple contexts.</h2>
              <WidgetFrame
                title="Contributors"
                subtitle="Sortable sample data"
                height={464}
              >
                <DataGrid kind="ranked" />
              </WidgetFrame>
            </>
          )}
          {page === "handoff" && (
            <>
              <div className="detail-heading">
                <div>
                  <h1>Developer handoff</h1>
                  <p>
                    Real components, explicit contracts and runnable examples.
                  </p>
                </div>
                <a
                  className="download-link"
                  href="/handoff/frontx-showcase-source.zip"
                  download
                >
                  <Download size={17} />
                  Download source
                </a>
              </div>
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
                    Three themes demonstrate that typography, surfaces, radii
                    and palettes can change without forking widgets. Layout is
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
          <footer>
            <span>FrontX collection</span>
            <span>Built on shared foundations.</span>
            <a href="/handoff/README.md">
              Implementation notes <ArrowUpRight size={13} />
            </a>
          </footer>
        </main>
      </div>
      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
