import { useState, type ReactNode } from "react";
import { Button } from "@gears-frontx/ui-kit/button";
import { Card } from "@gears-frontx/ui-kit/card";
import { Badge } from "@gears-frontx/ui-kit/badge";
import { Progress } from "@gears-frontx/ui-kit/progress";
import { Input } from "@gears-frontx/ui-kit/input";
import { NativeSelect } from "@gears-frontx/ui-kit/native-select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@gears-frontx/ui-kit/table";
import {
  ArrowUpDown,
  ArrowUpRight,
  Code2,
  Copy,
  Check,
  Clock3,
  Search,
  Grid2X2,
} from "lucide-react";
import {
  WidgetFrame,
  WidgetDensitySwitch,
  widgetHeight,
  type WidgetDensity,
} from "./WidgetFrame";
import { WidgetChart, chartData, type WidgetKind } from "./widgets";
import "./compositions.css";
function Panel({
  kind,
  title,
  subtitle,
  span = 6,
  height = 464,
  period,
  density,
}: {
  kind: WidgetKind;
  title: string;
  subtitle?: string;
  span?: number;
  height?: number;
  period: number;
  density: WidgetDensity;
}) {
  return (
    <div className={`span${span}`}>
      <WidgetFrame
        density={density}
        title={title}
        subtitle={subtitle}
        height={height}
      >
        <WidgetChart kind={kind} period={period} />
      </WidgetFrame>
    </div>
  );
}
function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </Card>
  );
}
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="recipe-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
const fmt = (v: number) => v.toLocaleString("en-US");
export function Compositions({
  query,
  update,
}: {
  query: URLSearchParams;
  update: (v: Record<string, string>) => void;
}) {
  const view = ["overview", "insight", "polar"].includes(
    query.get("layout") || "",
  )
    ? query.get("layout")!
    : "overview";
  const period = query.get("period") === "7" ? 7 : 30;
  const density: WidgetDensity =
    query.get("density") === "compact" ? "compact" : "standard";
  const [search, setSearch] = useState(""),
    [descending, setDescending] = useState(true),
    [notice, setNotice] = useState("");
  const trend = chartData("area", period),
    people = chartData("ranked", period),
    channels = chartData("donut", period);
  const visits = trend.reduce((s, r) => s + r.visitors, 0),
    conversions = trend.reduce((s, r) => s + r.conversions, 0),
    changes = people.reduce((s, r) => s + r.value, 0);
  const filtered = people
    .filter((r) => r.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (descending ? b.value - a.value : a.value - b.value));
  const title = {
    overview: "Product analytics",
    insight: "Delivery overview",
    polar: "Audience insights",
  }[view];
  const recipe = {
    name: title,
    period,
    density,
    components: [
      "Card",
      "ChartContainer",
      "Table",
      "Badge",
      "Progress",
      "Input",
      "NativeSelect",
    ],
    grid: { columns: 12, gap: 16 },
    sections:
      view === "overview"
        ? [
            ["area", 8, 464],
            ["donut", 4, 464],
            ["funnel", 6, 464],
            ["channel-table", 6, 464],
            ["composed", 8, 304],
            ["progress", 4, 304],
            ["heatmap", 12, 304],
          ]
        : view === "insight"
          ? [
              ["ranked", 6, 464],
              ["contributors-table", 6, 464],
              ["bar", 8, 304],
              ["radial", 4, 304],
              ["waterfall", 6, 464],
              ["activity-list", 6, 464],
              ["calendar", 6, 464],
              ["builds", 6, 464],
            ]
          : [
              ["radar", 6, 464],
              ["donut", 6, 464],
              ["bubble", 8, 464],
              ["pie", 4, 464],
              ["treemap", 6, 464],
              ["channel-table", 6, 464],
            ],
  };
  const renderedRecipe = {
    ...recipe,
    sections: recipe.sections.map(([kind, span, height]) => [
      kind,
      span,
      typeof height === "number" ? widgetHeight(height, density) : height,
    ]),
  };
  const table = (
    <div className="recipe-table">
      <Table label="Acquisition channels" density="compact">
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead>Share</TableHead>
            <TableHead>Visits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channels.map((r) => (
            <TableRow key={r.label}>
              <TableCell>
                <span className="channel-label">{r.label}</span>
              </TableCell>
              <TableCell>
                <div className="share-cell">
                  <Progress value={r.value} aria-label={`${r.label} share`} />
                  <span>{r.value}%</span>
                </div>
              </TableCell>
              <TableCell>{fmt(Math.round((visits * r.value) / 100))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="recipe-footnote">
        Visit estimates use the same total and channel shares as the charts;
        rounded to whole visits.
      </p>
    </div>
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(renderedRecipe, null, 2),
      );
      setNotice("Composition JSON copied");
    } catch {
      setNotice("Select and copy the configuration below.");
    }
  }
  return (
    <>
      <div className="detail-heading">
        <div>
          <h1>Compositions</h1>
          <p>
            Complete screen recipes built from the same widgets and UI elements.
          </p>
        </div>
        <label className="control">
          <span>Composition</span>
          <NativeSelect
            aria-label="Composition"
            value={view}
            onChange={(e) => {
              setSearch("");
              update({ layout: e.target.value });
            }}
          >
            <option value="overview">Product analytics</option>
            <option value="insight">Delivery overview</option>
            <option value="polar">Audience insights</option>
          </NativeSelect>
        </label>
      </div>
      <div className="recipe-heading">
        <div>
          <h2>{title}</h2>
          <span>Synthetic data · {trend[0].label}–Sep 25, 2026</span>
        </div>
        <div className="recipe-heading-actions">
          <WidgetDensitySwitch
            value={density}
            onChange={(value) => update({ density: value })}
          />
          <div className="recipe-period" aria-label="Composition period">
            {[7, 30].map((n) => (
              <Button
                key={n}
                variant={period === n ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={period === n}
                onClick={() => update({ period: String(n) })}
              >
                Last {n} days
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="metric-row">
        <Metric
          label={view === "insight" ? "Completed changes" : "Visits"}
          value={fmt(view === "insight" ? changes : visits)}
          detail={`Last ${period} days`}
        />
        <Metric
          label={view === "insight" ? "Contributors" : "Conversions"}
          value={fmt(view === "insight" ? people.length : conversions)}
          detail={
            view === "insight"
              ? "Included in the table"
              : "From daily sample data"
          }
        />
        <Metric
          label={view === "insight" ? "Median changes" : "Conversion rate"}
          value={
            view === "insight"
              ? fmt(Math.round((people[4].value + people[5].value) / 2))
              : `${((conversions / visits) * 100).toFixed(2)}%`
          }
          detail={
            view === "insight"
              ? "Across 10 contributors"
              : "Conversions / visits"
          }
        />
        <Metric
          label="Channels"
          value="5"
          detail="Consistent series across widgets"
        />
      </div>
      {view === "overview" && (
        <>
          <Section title="Traffic & acquisition">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="area"
                title="Traffic over time"
                subtitle={`Daily visits · last ${period} days`}
                span={8}
                period={period}
              />
              <Panel
                density={density}
                kind="donut"
                title="Acquisition mix"
                subtitle="Channel share of visits"
                span={4}
                period={period}
              />
            </div>
          </Section>
          <Section title="From visit to conversion">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="funnel"
                title="Conversion funnel"
                subtitle="Synthetic stages · same period filter"
                period={period}
              />
              <div className="span6">
                <WidgetFrame
                  density={density}
                  title="Acquisition channels"
                  subtitle="Shares and estimated visits"
                  height={464}
                >
                  {table}
                </WidgetFrame>
              </div>
            </div>
          </Section>
          <Section title="Daily performance">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="composed"
                title="Traffic & conversion rate"
                subtitle="Visits and conversion rate use separate axes"
                span={8}
                height={304}
                period={period}
              />
              <div className="span4">
                <WidgetFrame
                  density={density}
                  title="Monthly targets"
                  height={304}
                >
                  <div className="target-list">
                    {[
                      [
                        "Visits",
                        Math.min(100, Math.round((visits / 35000) * 100)),
                      ],
                      [
                        "Conversions",
                        Math.min(100, Math.round((conversions / 1400) * 100)),
                      ],
                      ["Channel coverage", 100],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <span>
                          {label}
                          <strong>{value}%</strong>
                        </span>
                        <Progress
                          value={Number(value)}
                          aria-label={`${label} target`}
                        />
                      </div>
                    ))}
                  </div>
                </WidgetFrame>
              </div>
            </div>
          </Section>
        </>
      )}
      {view === "insight" && (
        <>
          <Section title="Contributions">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="ranked"
                title="Top contributors"
                subtitle={`Completed changes · last ${period} days`}
                period={period}
              />
              <div className="span6">
                <WidgetFrame
                  density={density}
                  title="Contributors"
                  subtitle="Same dataset · filter and sort the table"
                  height={464}
                >
                  <div className="recipe-table">
                    <label className="recipe-search">
                      <Search size={15} />
                      <Input
                        aria-label="Find contributor"
                        placeholder="Find a contributor…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </label>
                    <Table label="Contributors" density="compact">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contributor</TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<ArrowUpDown size={13} />}
                              onClick={() => setDescending(!descending)}
                            >
                              Changes
                            </Button>
                          </TableHead>
                          <TableHead>Share</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((r) => (
                          <TableRow key={r.label}>
                            <TableCell>{r.label}</TableCell>
                            <TableCell>{fmt(r.value)}</TableCell>
                            <TableCell>
                              {((r.value / changes) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {!filtered.length && (
                      <p className="recipe-footnote">
                        No contributors match this name.
                      </p>
                    )}
                  </div>
                </WidgetFrame>
              </div>
            </div>
          </Section>
          <Section title="Workload & targets">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="bar"
                title="Sample demand"
                subtitle="Daily visits against target"
                span={8}
                height={304}
                period={period}
              />
              <Panel
                density={density}
                kind="radial"
                title="Monthly target"
                subtitle="Fixed sample target · 76%"
                span={4}
                height={304}
                period={period}
              />
            </div>
          </Section>
          <Section title="Change & activity">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="waterfall"
                title="Revenue movement"
                subtitle="Bridge example · selected period"
                period={period}
              />
              <div className="span6">
                <WidgetFrame
                  density={density}
                  title="Recent activity"
                  subtitle="Example workflow events · Sep 25"
                  height={464}
                >
                  <div className="recipe-activity">
                    {[
                      ["Chart contract reviewed", "09:42", "Completed"],
                      ["Source adapter connected", "10:15", "Completed"],
                      ["Theme contrast check", "11:08", "In review"],
                      ["Empty-state copy updated", "12:30", "Completed"],
                      ["Dashboard recipe ready", "14:05", "In review"],
                    ].map(([label, time, status]) => (
                      <div key={label}>
                        <span className="activity-symbol">
                          {status === "Completed" ? (
                            <Check size={15} />
                          ) : (
                            <Clock3 size={15} />
                          )}
                        </span>
                        <div>
                          <strong>{label}</strong>
                          <small>{time}</small>
                        </div>
                        <Badge variant="outline">{status}</Badge>
                      </div>
                    ))}
                  </div>
                </WidgetFrame>
              </div>
            </div>
          </Section>
        </>
      )}
      {view === "polar" && (
        <>
          <Section title="Audience profile">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="radar"
                title="Lifecycle health"
                subtitle="Current and target scores"
                period={period}
              />
              <Panel
                density={density}
                kind="donut"
                title="Acquisition mix"
                subtitle="Share of visits"
                period={period}
              />
            </div>
          </Section>
          <Section title="Segments & opportunity">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="bubble"
                title="Account opportunities"
                subtitle="Bubble size indicates opportunity"
                span={8}
                period={period}
              />
              <Panel
                density={density}
                kind="pie"
                title="Channel share"
                subtitle="Same channel palette and data"
                span={4}
                period={period}
              />
            </div>
          </Section>
          <Section title="Composition & exact values">
            <div className="dashboard-grid">
              <Panel
                density={density}
                kind="treemap"
                title="Portfolio distribution"
                subtitle="Rectangle area encodes value"
                period={period}
              />
              <div className="span6">
                <WidgetFrame
                  density={density}
                  title="Acquisition channels"
                  subtitle={`Estimated visits · last ${period} days`}
                  height={464}
                >
                  {table}
                </WidgetFrame>
              </div>
            </div>
          </Section>
        </>
      )}
      {view === "overview" && (
        <Section title="Token activity">
          <WidgetFrame
            density={density}
            title="Token activity"
            subtitle="Sep 26, 2025–Sep 25, 2026 · annual sample"
            height={304}
          >
            <WidgetChart kind="heatmap" period={365} />
          </WidgetFrame>
        </Section>
      )}
      {view === "insight" && (
        <Section title="Release operations">
          <div className="dashboard-grid">
            <div className="span6">
              <WidgetFrame density={density} title="Revenue pulse" height={464}>
                <WidgetChart kind="calendar" />
              </WidgetFrame>
            </div>
            <div className="span6">
              <WidgetFrame
                density={density}
                title="Build activity"
                height={464}
              >
                <WidgetChart kind="builds" />
              </WidgetFrame>
            </div>
          </div>
        </Section>
      )}
      <div className="recipe-takeaway">
        <Grid2X2 size={21} />
        <div>
          <h2>Build from this recipe</h2>
          <p>
            Shared period state feeds the trend charts. The annual activity
            activity and revenue keep their labelled time windows. Fixed scores
            and category shares stay unchanged. Tables use the same fixture
            functions as charts; replace those with your data adapter.
          </p>
        </div>
        <Button
          variant="outline"
          icon={<ArrowUpRight size={15} />}
          onClick={() => update({ page: "modularity" })}
        >
          Try the grid
        </Button>
      </div>
      <details className="recipe-details">
        <summary>
          <Code2 size={17} /> Components & layout JSON
        </summary>
        <div className="recipe-chips">
          {recipe.components.map((c) => (
            <Badge variant="outline" key={c}>
              {c}
            </Badge>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={copy}
          icon={<Copy size={14} />}
        >
          Copy recipe
        </Button>
        <pre>{JSON.stringify(renderedRecipe, null, 2)}</pre>
        <p>
          Demo recipe, not a published FrontX schema. Keep datasets, units,
          statuses and permissions in product-owned adapters.
        </p>
      </details>
      <p className="palette-notice" role="status">
        {notice}
      </p>
    </>
  );
}
