import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Calendar,
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
import { ArrowDown, ArrowUp, ArrowUpDown, CalendarDays } from "lucide-react";
import "./utility-widgets.css";

const releases = [
  {
    date: "2026-09-03",
    name: "Navigation refresh",
    version: "v2.8.0",
    status: "Shipped",
  },
  {
    date: "2026-09-08",
    name: "Search improvements",
    version: "v2.8.1",
    status: "Shipped",
  },
  {
    date: "2026-09-14",
    name: "Dashboard preview",
    version: "v2.9.0",
    status: "In review",
  },
  {
    date: "2026-09-21",
    name: "Access controls",
    version: "v2.9.1",
    status: "Planned",
  },
  {
    date: "2026-09-29",
    name: "Workspace exports",
    version: "v3.0.0",
    status: "Planned",
  },
];

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
  if (kind === "calendar") return releases.map((release) => ({ ...release }));
  return builds.map(({ id, status, duration, sha, branch }) => ({
    id,
    status,
    durationSeconds: duration,
    sha,
    branch,
  }));
}

function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ReleaseCalendar() {
  const [month, setMonth] = useState(() => new Date(2026, 8, 1));
  const [selected, setSelected] = useState<Date | undefined>(
    () => new Date(2026, 8, 29),
  );
  const releaseDates = useMemo(
    () => releases.map((release) => parseLocalDate(release.date)),
    [],
  );
  const selectedReleases = releases.filter(
    (release) => selected && release.date === dateKey(selected),
  );

  return (
    <div className="utility-calendar-widget">
      <div className="utility-calendar-scroll">
        <Calendar
          className="utility-calendar"
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={selected}
          onSelect={setSelected}
          modifiers={{ scheduledRelease: releaseDates }}
          modifiersClassNames={{
            scheduledRelease: "utility-calendar-release-day",
          }}
          aria-label="Synthetic release calendar"
        />
      </div>
      <div className="utility-calendar-selection" aria-live="polite">
        <span className="utility-calendar-date">
          <CalendarDays size={15} />
          {selected ? formatDate(selected) : "Select a date"}
        </span>
        {selectedReleases.length ? (
          <ul>
            {selectedReleases.map((release) => (
              <li key={release.name}>
                <span>
                  <strong>{release.name}</strong>
                  <small>{release.version}</small>
                </span>
                <Badge
                  variant={
                    release.status === "Shipped"
                      ? "success"
                      : release.status === "In review"
                        ? "warning"
                        : "info"
                  }
                  dot
                >
                  {release.status}
                </Badge>
              </li>
            ))}
          </ul>
        ) : selected ? (
          <p>No scheduled releases on this date.</p>
        ) : (
          <p>Select a day to view its release schedule.</p>
        )}
      </div>
      <p className="utility-widget-note">
        Sample release schedule · September 2026
      </p>
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
