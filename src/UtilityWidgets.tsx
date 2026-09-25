import { useId, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gears-frontx/ui-kit";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@gears-frontx/ui-kit/chart";
import "./utility-widgets.css";

export const revenueSeries = [
  32, 34, 33, 38, 36, 41, 40, 45, 43, 47, 46, 50, 48, 53, 51, 57, 55, 59, 58,
  63, 62, 67, 65, 71, 74,
].map((value, index) => ({
  date: `2026-09-${String(index + 1).padStart(2, "0")}`,
  value: value * 1000,
}));

const builds = [
  {
    id: "#4812",
    status: "Passed",
    duration: 292,
    sha: "a83f19d42be7c60318a4d019b51e862a6c3f910e",
    branch: "main",
    started: "Sep 25, 2026 · 10:42 UTC",
    stages: [
      { name: "Install dependencies", duration: "38s", state: "Passed" },
      { name: "Type check", duration: "46s", state: "Passed" },
      { name: "Build assets", duration: "2m 48s", state: "Passed" },
      { name: "Package artifacts", duration: "40s", state: "Passed" },
    ],
  },
  {
    id: "#4811",
    status: "Failed",
    duration: 168,
    sha: "714bc0e9ad2103574a6f8de1205b79ca436ce822",
    branch: "feature/search",
    started: "Sep 25, 2026 · 09:18 UTC",
    stages: [
      { name: "Install dependencies", duration: "35s", state: "Passed" },
      { name: "Type check", duration: "1m 12s", state: "Passed" },
      { name: "Build assets", duration: "1m 01s", state: "Failed" },
      { name: "Package artifacts", duration: "—", state: "Skipped" },
    ],
  },
  {
    id: "#4810",
    status: "Running",
    duration: 96,
    sha: "4f2a9c7b106ed38529a4f071b6c8d3205ea947ab",
    branch: "feature/filters",
    started: "Sep 25, 2026 · 11:06 UTC",
    stages: [
      { name: "Install dependencies", duration: "36s", state: "Passed" },
      { name: "Type check", duration: "1m 00s", state: "Running" },
      { name: "Build assets", duration: "—", state: "Queued" },
      { name: "Package artifacts", duration: "—", state: "Queued" },
    ],
  },
  {
    id: "#4809",
    status: "Passed",
    duration: 339,
    sha: "c91a527f0d46b13eac2087f52d8b6e913a47510c",
    branch: "main",
    started: "Sep 24, 2026 · 16:31 UTC",
    stages: [
      { name: "Install dependencies", duration: "42s", state: "Passed" },
      { name: "Type check", duration: "51s", state: "Passed" },
      { name: "Build assets", duration: "3m 25s", state: "Passed" },
      { name: "Package artifacts", duration: "41s", state: "Passed" },
    ],
  },
];

export type UtilityWidgetKind = "calendar" | "builds";
export type UtilityRow = Record<string, string | number>;

/** Small deterministic fixtures for the showcase Data view; all values are synthetic. */
export function utilityRows(kind: UtilityWidgetKind): UtilityRow[] {
  if (kind === "calendar")
    return revenueSeries.map((point) => ({
      date: point.date,
      revenue: point.value,
    }));
  return builds.map(({ id, status, duration, sha, branch }) => ({
    id,
    status,
    durationSeconds: duration,
    sha,
    branch,
  }));
}

export function RevenueMetric() {
  const id = useId().replace(/:/g, "");
  const current = revenueSeries.at(-1)!.value;
  const previous = 66000;
  const growth = (((current - previous) / previous) * 100).toFixed(1);
  return (
    <div className="revenue-metric">
      <div className="revenue-metric-summary">
        <strong>${current.toLocaleString()}</strong>
        <span className="revenue-metric-change">
          <ArrowUp size={14} />
          {growth}%<small>vs previous period</small>
        </span>
      </div>
      <ChartContainer
        config={{ value: { label: "Revenue", color: "var(--viz-1)" } }}
        style={{
          width: "100%",
          height: "100%",
          minHeight: 0,
          aspectRatio: "auto",
        }}
        aria-label="Revenue sparkline for September 1–25, 2026"
      >
        <AreaChart
          data={revenueSeries}
          margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--viz-1)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--viz-1)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <YAxis hide domain={[0, "dataMax"]} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--viz-1)"
            strokeWidth={2.5}
            fill={`url(#${id})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
      <div className="revenue-metric-range">
        <span>Sep 1</span>
        <span>Sep 25</span>
      </div>
    </div>
  );
}

type Build = (typeof builds)[number];
type SortKey = "status" | "duration";

function BuildDetails({ build }: { build: Build }) {
  return (
    <DialogContent className="utility-build-dialog">
      <DialogHeader>
        <DialogTitle>Build {build.id}</DialogTitle>
        <DialogDescription>
          {build.branch} · {build.started}
        </DialogDescription>
      </DialogHeader>
      <div className="utility-build-meta">
        <span>Commit</span>
        <code>{build.sha}</code>
      </div>
      <ol className="utility-build-stages">
        {build.stages.map((stage) => (
          <li key={stage.name}>
            <span
              className="utility-stage-state"
              data-state={stage.state.toLowerCase()}
            ></span>
            <strong>{stage.name}</strong>
            <Badge
              variant={
                stage.state === "Passed"
                  ? "success"
                  : stage.state === "Failed"
                    ? "danger"
                    : stage.state === "Running"
                      ? "info"
                      : "secondary"
              }
            >
              {stage.state}
            </Badge>
            <small>{stage.duration}</small>
          </li>
        ))}
      </ol>
      <p className="utility-widget-note">
        Synthetic build details for the component showcase. No build service is
        connected.
      </p>
    </DialogContent>
  );
}

function statusOrder(status: Build["status"]) {
  const order: Record<Build["status"], number> = {
    Failed: 0,
    Running: 1,
    Passed: 2,
  };
  return order[status];
}

export function BuildTable() {
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [ascending, setAscending] = useState(false);
  const rows = useMemo(
    () =>
      [...builds].sort((a, b) => {
        const result =
          sortKey === "duration"
            ? a.duration - b.duration
            : statusOrder(a.status) - statusOrder(b.status);
        return ascending ? result : -result;
      }),
    [ascending, sortKey],
  );
  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setAscending((value) => !value);
    else {
      setSortKey(key);
      setAscending(true);
    }
  };
  const sortIcon = (key: SortKey) =>
    sortKey !== key ? (
      <ArrowUpDown size={12} />
    ) : ascending ? (
      <ArrowUp size={12} />
    ) : (
      <ArrowDown size={12} />
    );

  return (
    <div className="utility-build-table-wrap">
      <Table
        className="utility-build-table"
        density="compact"
        label="Synthetic recent builds"
      >
        <TableHeader>
          <TableRow>
            <TableHead>Build</TableHead>
            <TableHead>
              <Button
                className="utility-sort-button"
                variant="ghost"
                size="sm"
                onClick={() => toggleSort("status")}
              >
                Status {sortIcon("status")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                className="utility-sort-button"
                variant="ghost"
                size="sm"
                onClick={() => toggleSort("duration")}
              >
                Duration {sortIcon("duration")}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((build) => (
            <TableRow key={build.id}>
              <TableCell>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        className="utility-build-link"
                        variant="link"
                        size="sm"
                      >
                        {build.id}
                      </Button>
                    }
                  />
                  <BuildDetails build={build} />
                </Dialog>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    build.status === "Passed"
                      ? "success"
                      : build.status === "Failed"
                        ? "danger"
                        : "info"
                  }
                  dot
                >
                  {build.status}
                </Badge>
              </TableCell>
              <TableCell className="utility-build-duration">
                {Math.floor(build.duration / 60)}m{" "}
                {String(build.duration % 60).padStart(2, "0")}s
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="utility-widget-note">
        Select a build number for commit and stage details.
      </p>
    </div>
  );
}
