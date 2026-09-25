import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@gears-frontx/ui-kit/chart";
import { Tabs, TabsList, TabsTrigger } from "@gears-frontx/ui-kit/tabs";
import { Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import type { ComponentProps } from "react";
import { chartData } from "./data";
import "./token-activity.css";

type ActivityMode = "daily" | "weekly" | "cumulative";
interface GridPoint {
  x: number;
  y: number;
  value: number;
  date: string;
  label: string;
  weekLabel: string;
  index: number;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DATE_FORMAT = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const chartConfig: ChartConfig = {
  value: { label: "Activity", color: "var(--viz-1)" },
};

const monthAxis = (() => {
  const gridStart = Date.UTC(2025, 8, 21);
  return Array.from({ length: 12 }, (_, monthOffset) => {
    const date = new Date(Date.UTC(2025, 9 + monthOffset, 1));
    return {
      week: Math.floor(
        (date.getTime() - gridStart) / (7 * 24 * 60 * 60 * 1000),
      ),
      label: date.toLocaleDateString("en", { month: "short", timeZone: "UTC" }),
    };
  });
})();

function dateFromIso(value: string) {
  const [year = 2026, month = 1, day = 1] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function intensity(value: number, maxValue: number) {
  if (value <= 0) return "var(--surface)";
  const ratio = value / Math.max(1, maxValue);
  const opacity =
    ratio > 0.8
      ? 100
      : ratio > 0.6
        ? 82
        : ratio > 0.4
          ? 64
          : ratio > 0.2
            ? 44
            : 24;
  return `color-mix(in srgb, var(--viz-1) ${opacity}%, var(--surface))`;
}

function HeatLegend({ maxValue }: { maxValue: number }) {
  const bands = [0.1, 0.3, 0.5, 0.7, 0.9];
  return (
    <div
      className="token-activity__legend"
      aria-label="Activity intensity legend"
    >
      <span>Less</span>
      {bands.map((band) => (
        <span
          key={band}
          className="token-activity__legend-cell"
          aria-hidden="true"
          style={{
            background: intensity(Math.max(1, maxValue * band), maxValue),
          }}
        />
      ))}
      <span>More</span>
    </div>
  );
}

export default function TokenActivity({ period = 365 }: { period?: number }) {
  const [mode, setMode] = useState<ActivityMode>("daily");
  const [selectedIndex, setSelectedIndex] = useState(364);
  const [plotWidth, setPlotWidth] = useState(680);
  const [plotHeight, setPlotHeight] = useState(160);
  const selectedValueId = `token-activity-selected-${useId().replace(/:/g, "")}`;
  const plotRef = useRef<HTMLDivElement>(null);
  const daily = useMemo(() => chartData("heatmap", 365), []);
  const activeStart = Math.max(
    0,
    daily.length - Math.max(1, Math.min(daily.length, Math.round(period))),
  );
  const cellSize = Math.max(
    3,
    Math.min(
      22,
      Math.floor((plotWidth - 42) / 53) - 1,
      Math.floor((plotHeight - 38) / 7) - 2,
    ),
  );
  const chartHeight = (cellSize + 2) * 7 + 38;

  useEffect(() => {
    if (!plotRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setPlotWidth(entry.contentRect.width);
      setPlotHeight(entry.contentRect.height);
    });
    observer.observe(plotRef.current);
    return () => observer.disconnect();
  }, []);

  const { points, maxValue, selected } = useMemo(() => {
    const gridStart = new Date(Date.UTC(2025, 8, 21));
    const weekSums = new Map<number, number>();
    let cumulative = 0;
    const actual = daily.map((entry, index) => {
      const date = dateFromIso(entry.date);
      const week = Math.floor(
        (date.getTime() - gridStart.getTime()) / (7 * 24 * 60 * 60 * 1000),
      );
      const weekStart = new Date(date);
      weekStart.setUTCDate(weekStart.getUTCDate() - weekStart.getUTCDay());
      const weekLabel = DATE_FORMAT.format(weekStart);
      if (index >= activeStart) {
        weekSums.set(week, (weekSums.get(week) ?? 0) + entry.value);
        cumulative += entry.value;
      }
      return {
        entry,
        index,
        date,
        week,
        weekLabel,
        cumulative,
        active: index >= activeStart,
      };
    });

    const transformed: GridPoint[] = actual.map(
      ({
        entry,
        index,
        date,
        week,
        weekLabel,
        cumulative: running,
        active,
      }) => {
        const value = !active
          ? 0
          : mode === "weekly"
            ? (weekSums.get(week) ?? 0)
            : mode === "cumulative"
              ? running
              : entry.value;
        return {
          x: week,
          y: 6 - date.getUTCDay(),
          value,
          date: active ? entry.date : "",
          label: active ? entry.label : "",
          weekLabel,
          index,
        };
      },
    );
    const occupied = new Set(
      transformed.map((point) => `${point.x}:${point.y}`),
    );
    const padded = Array.from(
      { length: 53 * 7 },
      (_, index): GridPoint | null => {
        const x = Math.floor(index / 7);
        const y = 6 - (index % 7);
        if (occupied.has(`${x}:${y}`)) return null;
        return {
          x,
          y,
          value: 0,
          date: "",
          label: "",
          weekLabel: "",
          index: -1,
        };
      },
    ).filter((point): point is GridPoint => point !== null);
    const all = [...transformed, ...padded].sort(
      (a, b) => a.x - b.x || b.y - a.y,
    );
    const clampedIndex = Math.max(
      activeStart,
      Math.min(actual.length - 1, selectedIndex),
    );
    const selectedPoint =
      transformed[clampedIndex] ?? transformed[transformed.length - 1];
    return {
      points: all,
      maxValue: Math.max(1, ...transformed.map((point) => point.value)),
      selected: selectedPoint,
    };
  }, [activeStart, daily, mode, selectedIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const movements: Record<string, number> = {
      ArrowLeft: -7,
      ArrowRight: 7,
      ArrowUp: -1,
      ArrowDown: 1,
    };
    if (event.key in movements) {
      event.preventDefault();
      setSelectedIndex((current) =>
        Math.max(
          activeStart,
          Math.min(daily.length - 1, current + movements[event.key]),
        ),
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setSelectedIndex(activeStart);
    } else if (event.key === "End") {
      event.preventDefault();
      setSelectedIndex(daily.length - 1);
    }
  };

  const cellShape = (shapeProps: {
    cx?: number;
    cy?: number;
    payload?: unknown;
  }) => {
    const props = shapeProps;
    const point = props.payload as GridPoint | undefined;
    const cx = props.cx;
    const cy = props.cy;
    if (cx == null || cy == null) return null;
    const isSelected = Boolean(
      point && point.index >= 0 && point.index === selected?.index,
    );
    return (
      <rect
        x={cx - cellSize / 2}
        y={cy - cellSize / 2}
        width={cellSize}
        height={cellSize}
        rx={Math.min(4, cellSize / 3)}
        fill={intensity(point?.value ?? 0, maxValue)}
        stroke={
          isSelected
            ? "var(--foreground)"
            : point?.date
              ? "color-mix(in srgb, var(--border) 55%, transparent)"
              : "var(--border)"
        }
        strokeWidth={isSelected ? 1.5 : 0.7}
      >
        {point?.date && (
          <title>{`${point.label}: ${point.value.toLocaleString()} tokens`}</title>
        )}
      </rect>
    );
  };

  return (
    <section className="token-activity" aria-label="Token activity heatmap">
      <div className="token-activity__toolbar">
        <Tabs
          className="token-activity__tabs"
          value={mode}
          onValueChange={(value) => setMode(value as ActivityMode)}
        >
          <TabsList
            className="token-activity__tabs-list"
            size="sm"
            aria-label="Activity period"
          >
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="cumulative">Cumulative</TabsTrigger>
          </TabsList>
        </Tabs>
        <p
          className="token-activity__selected"
          id={selectedValueId}
          aria-live="polite"
        >
          Last {period} days ·{" "}
          {mode === "weekly"
            ? `Week of ${selected?.weekLabel}`
            : selected?.label}
          : {(selected?.value ?? 0).toLocaleString()} tokens
          {mode === "weekly" && (
            <span className="token-activity__weekly-note">
              Weekly total repeats across the active days in that week.
            </span>
          )}
        </p>
      </div>

      <div
        className="token-activity__scroll"
        role="application"
        tabIndex={0}
        aria-label={`Activity calendar for the last ${period} days. Use arrow keys to move between days, Home for first day and End for last day.`}
        aria-describedby={selectedValueId}
        onKeyDown={handleKeyDown}
      >
        <div className="token-activity__plot" ref={plotRef}>
          <ChartContainer
            config={chartConfig}
            style={{
              width: "100%",
              height: chartHeight,
              minHeight: 0,
              aspectRatio: "auto",
            }}
          >
            <ScatterChart
              accessibilityLayer={false}
              margin={{ top: 6, right: 8, bottom: 4, left: 0 }}
            >
              <XAxis
                type="number"
                dataKey="x"
                domain={[-0.5, 52.5]}
                ticks={monthAxis
                  .filter((_, index) => plotWidth >= 480 || index % 2 === 0)
                  .map((item) => item.week)}
                tickFormatter={(week: number) =>
                  monthAxis.find((item) => item.week === week)?.label ?? ""
                }
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                height={24}
                interval={0}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[-0.5, 6.5]}
                ticks={[6, 5, 4, 3, 2, 1, 0]}
                tickFormatter={(value: number) => DAY_NAMES[6 - value] ?? ""}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={34}
              />
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  const point = payload?.[0]?.payload as GridPoint | undefined;
                  if (!active || !point?.date) return null;
                  return (
                    <div className="token-activity__tooltip">
                      <span>
                        {mode === "weekly"
                          ? `Week of ${point.weekLabel}`
                          : point.label}
                      </span>
                      <strong>{point.value.toLocaleString()} tokens</strong>
                    </div>
                  );
                }}
              />
              <Scatter
                data={points}
                dataKey="value"
                name="Activity"
                shape={
                  cellShape as NonNullable<
                    ComponentProps<typeof Scatter>["shape"]
                  >
                }
                isAnimationActive={false}
                onClick={(clickedPoint: unknown) => {
                  const payload = (clickedPoint as { payload?: GridPoint })
                    .payload;
                  if (payload && payload.index >= activeStart)
                    setSelectedIndex(payload.index);
                }}
              />
            </ScatterChart>
          </ChartContainer>
        </div>
      </div>

      <HeatLegend maxValue={maxValue} />
    </section>
  );
}
