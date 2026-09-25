import {
  useId,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Funnel,
  FunnelChart,
  Line,
  LineChart,
  Label,
  LabelList,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Scatter,
  ScatterChart,
  Tooltip,
  Treemap,
  type TreemapNode,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@gears-frontx/ui-kit/chart";
import { chartData, type WidgetKind } from "./data";
import TokenActivity from "./TokenActivity";
import { BuildTable, ReleaseCalendar } from "./UtilityWidgets";
export { chartData } from "./data";

export type { WidgetKind } from "./data";

export const widgets: Array<{
  id: WidgetKind;
  title: string;
  category: string;
  description: string;
  unit: string;
}> = [
  {
    id: "area",
    title: "Traffic over time",
    category: "Trends",
    description: "Organic and paid visits across the selected period.",
    unit: "visits",
  },
  {
    id: "line",
    title: "Conversion trend",
    category: "Trends",
    description: "Daily conversions compared with the expected target.",
    unit: "conversions",
  },
  {
    id: "bar",
    title: "Visits and target",
    category: "Comparison",
    description: "Actual visits against the daily target.",
    unit: "visits",
  },
  {
    id: "ranked",
    title: "Top contributors",
    category: "Ranking",
    description: "Synthetic contributor activity for the selected period.",
    unit: "visits",
  },
  {
    id: "donut",
    title: "Traffic mix",
    category: "Composition",
    description: "Share of visits by acquisition channel.",
    unit: "% of visits",
  },
  {
    id: "pie",
    title: "Channel share",
    category: "Composition",
    description: "Acquisition channel share of total visits.",
    unit: "% of visits",
  },
  {
    id: "radar",
    title: "Lifecycle health",
    category: "Performance",
    description: "Current performance across six growth dimensions.",
    unit: "score / 100",
  },
  {
    id: "radial",
    title: "Monthly target",
    category: "Progress",
    description: "Progress toward the monthly growth target.",
    unit: "%",
  },
  {
    id: "scatter",
    title: "Account activity",
    category: "Distribution",
    description: "Account activity versus engagement score.",
    unit: "activity and score",
  },
  {
    id: "stacked",
    title: "Channel contribution",
    category: "Trends",
    description: "Organic and paid visits contributing to daily traffic.",
    unit: "visits",
  },
  {
    id: "composed",
    title: "Reach and conversion",
    category: "Trends",
    description: "Daily visits paired with conversion rate on a second scale.",
    unit: "visits and percent",
  },
  {
    id: "waterfall",
    title: "Revenue bridge",
    category: "Change",
    description: "A period-scaled bridge from starting to closing value.",
    unit: "synthetic value units",
  },
  {
    id: "funnel",
    title: "Conversion funnel",
    category: "Conversion",
    description: "Synthetic audience counts through five conversion stages.",
    unit: "accounts",
  },
  {
    id: "treemap",
    title: "Feature adoption",
    category: "Composition",
    description: "Relative synthetic adoption volume across product areas.",
    unit: "adoption events",
  },
  {
    id: "bubble",
    title: "Account opportunity",
    category: "Distribution",
    description: "Synthetic account adoption, engagement and opportunity size.",
    unit: "percent and index",
  },
  {
    id: "heatmap",
    title: "Token activity",
    category: "Activity",
    description: "Daily, weekly and cumulative activity across a year.",
    unit: "contributions",
  },
  {
    id: "calendar",
    title: "Release calendar",
    category: "Planning",
    description: "Upcoming and shipped release milestones.",
    unit: "releases",
  },
  {
    id: "builds",
    title: "Build activity",
    category: "Developer tools",
    description: "Synthetic recent build results and stage details.",
    unit: "builds",
  },
];

const VIZ = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6, var(--viz-6))",
] as const;

const CONFIG: ChartConfig = {
  visitors: { label: "Visits", color: VIZ[0] },
  conversions: { label: "Conversions", color: VIZ[1] },
  conversionsTarget: { label: "Target", color: VIZ[2] },
  conversionRate: { label: "Conversion rate", color: VIZ[2] },
  target: { label: "Target", color: VIZ[2] },
  organic: { label: "Organic", color: VIZ[0] },
  paid: { label: "Paid", color: VIZ[1] },
  direct: { label: "Direct", color: VIZ[2] },
  value: { label: "Share", color: VIZ[0] },
  x: { label: "Activity", color: VIZ[0] },
  y: { label: "Engagement score", color: VIZ[1] },
  New: { label: "New accounts", color: VIZ[0] },
  Returning: { label: "Returning accounts", color: VIZ[1] },
  Partner: { label: "Partner accounts", color: VIZ[2] },
  increase: { label: "Increase", color: VIZ[1] },
  decrease: { label: "Decrease", color: VIZ[4] },
  total: { label: "Total", color: VIZ[0] },
  base: { label: "Starting level", color: "transparent" },
};

const channelColor: Record<string, string> = {
  Direct: VIZ[0],
  "Organic search": VIZ[1],
  "Paid search": VIZ[2],
  Referral: VIZ[3],
  Social: VIZ[4],
};
const axisTick = { fill: "var(--muted-foreground)", fontSize: 12 };

type LegendItem = { label: string; color: string; style?: "line" | "dashed" };

function legendItems(kind: WidgetKind): LegendItem[] {
  switch (kind) {
    case "area":
      return [
        { label: "Organic", color: VIZ[0] },
        { label: "Paid", color: VIZ[1] },
      ];
    case "line":
      return [
        { label: "Conversions", color: VIZ[0] },
        { label: "Target", color: VIZ[2], style: "dashed" },
      ];
    case "bar":
      return [
        { label: "Visits", color: VIZ[0] },
        { label: "Target", color: VIZ[2] },
      ];
    case "donut":
    case "pie":
      return [
        { label: "Direct", color: VIZ[0] },
        { label: "Organic search", color: VIZ[1] },
        { label: "Paid search", color: VIZ[2] },
        { label: "Referral", color: VIZ[3] },
        { label: "Social", color: VIZ[4] },
      ];
    case "radar":
      return [
        { label: "Current score", color: VIZ[0] },
        { label: "Target score", color: VIZ[2], style: "dashed" },
      ];
    case "radial":
      return [
        { label: "Complete", color: VIZ[0] },
        { label: "Remaining", color: "var(--grid)" },
      ];
    case "scatter":
      return [
        { label: "New", color: VIZ[0] },
        { label: "Returning", color: VIZ[1] },
        { label: "Partner", color: VIZ[2] },
      ];
    case "stacked":
      return [
        { label: "Organic", color: VIZ[0] },
        { label: "Paid", color: VIZ[1] },
      ];
    case "composed":
      return [
        { label: "Visits", color: VIZ[0] },
        { label: "Conversion rate", color: VIZ[2], style: "line" },
      ];
    case "waterfall":
      return [
        { label: "Increase", color: VIZ[1] },
        { label: "Decrease", color: VIZ[4] },
        { label: "Total", color: VIZ[0] },
      ];
    case "funnel":
      return [
        { label: "Visitors", color: VIZ[0] },
        { label: "Qualified", color: VIZ[1] },
        { label: "Trials", color: VIZ[2] },
        { label: "Activated", color: VIZ[3] },
        { label: "Customers", color: VIZ[4] },
      ];
    case "treemap":
      return [{ label: "Adoption events", color: VIZ[0] }];
    case "bubble":
      return [
        { label: "Core", color: VIZ[0] },
        { label: "Growth", color: VIZ[1] },
        { label: "Emerging", color: VIZ[2] },
      ];
    case "heatmap":
    case "calendar":
    case "builds":
      return [];
    case "ranked":
      return [];
  }
}

function WidgetLegend({ kind }: { kind: WidgetKind }) {
  const items = legendItems(kind);
  if (!items.length) return null;
  return (
    <div
      aria-label="Chart legend"
      role="list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px 16px",
        padding: "4px 8px 2px",
        color: "var(--muted-foreground)",
        fontSize: 12,
        lineHeight: 1.4,
      }}
    >
      {items.map((item) => (
        <span
          key={item.label}
          role="listitem"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: item.style ? 14 : 8,
              height: item.style ? 0 : 8,
              borderRadius: item.style ? 0 : "50%",
              borderTop:
                item.style === "dashed"
                  ? `2px dashed ${item.color}`
                  : undefined,
              borderBottom:
                item.style === "line" ? `2px solid ${item.color}` : undefined,
              backgroundColor: item.style ? "transparent" : item.color,
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function tooltipContent(kind: WidgetKind, hideLabel = false) {
  return (
    <ChartTooltipContent
      hideLabel={hideLabel}
      formatter={(value, name) => {
        const number = value == null ? "" : Number(value).toLocaleString();
        const label = String(name ?? "");
        const unit =
          kind === "donut" ||
          kind === "pie" ||
          kind === "radial" ||
          label === "Activity" ||
          label === "Adoption"
            ? "%"
            : label === "Engagement score" || kind === "radar"
              ? "/100"
              : kind === "line" || label === "Conversions"
                ? "conversions"
                : label === "Monthly visits"
                  ? "visits"
                  : kind === "funnel"
                    ? "accounts"
                    : kind === "treemap"
                      ? "events"
                      : kind === "waterfall"
                        ? "value units"
                        : kind === "bubble" && label === "Opportunity"
                          ? "index"
                          : kind === "composed" && label === "Conversion rate"
                            ? "%"
                            : kind === "composed" && label === "Visits"
                              ? "visits"
                              : "visits";
        return (
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              minWidth: 160,
            }}
          >
            <span>{label}</span>
            <strong>
              {number} {unit}
            </strong>
          </span>
        );
      }}
    />
  );
}

function TreemapCell(node: TreemapNode): ReactElement {
  const color = VIZ[node.index % VIZ.length];
  const hasLabelRoom = node.width > 48 && node.height > 28;
  const maxCharacters = Math.max(3, Math.floor((node.width - 22) / 7));
  const label =
    node.name.length > maxCharacters
      ? `${node.name.slice(0, Math.max(2, maxCharacters - 1))}…`
      : node.name;
  const labelWidth = Math.min(node.width - 8, label.length * 7 + 14);
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={Math.max(0, node.width)}
        height={Math.max(0, node.height)}
        rx={5}
        fill={color}
        fillOpacity={0.88}
        stroke="var(--background)"
        strokeWidth={3}
      />
      <title>{`${node.name}: ${Number(node.value).toLocaleString()} adoption events`}</title>
      {hasLabelRoom && (
        <>
          <rect
            x={node.x + 4}
            y={node.y + 4}
            width={Math.max(0, labelWidth)}
            height={20}
            rx={4}
            fill="var(--background)"
            fillOpacity={0.9}
          />
          <text
            x={node.x + 10}
            y={node.y + 18}
            fill="var(--foreground)"
            fontSize={12}
            fontWeight={600}
          >
            {node.name}
          </text>
          {node.height > 44 && (
            <text
              x={node.x + 8}
              y={node.y + 34}
              fill="var(--foreground)"
              fillOpacity={0.9}
              fontSize={11}
            >
              {Number(node.value).toLocaleString()}
            </text>
          )}
        </>
      )}
    </g>
  );
}

function renderChart(
  kind: WidgetKind,
  period: number,
  chartId: string,
  compact: boolean,
) {
  const data = chartData(kind, period);
  const commonTooltip = <ChartTooltip content={tooltipContent(kind)} />;
  const compactNumber = (value: number) =>
    new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  switch (kind) {
    case "area":
      return (
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient
              id={`${chartId}-organic`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={VIZ[0]} stopOpacity={0.28} />
              <stop offset="95%" stopColor={VIZ[0]} stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id={`${chartId}-paid`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={VIZ[1]} stopOpacity={0.2} />
              <stop offset="95%" stopColor={VIZ[1]} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={46}
            tickFormatter={(v) => compactNumber(Number(v))}
          />
          {commonTooltip}
          <Area
            type="monotone"
            dataKey="organic"
            name="Organic"
            stroke={VIZ[0]}
            fill={`url(#${chartId}-organic)`}
            strokeWidth={2.5}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="paid"
            name="Paid"
            stroke={VIZ[1]}
            fill={`url(#${chartId}-paid)`}
            strokeWidth={2.5}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </AreaChart>
      );
    case "line":
      return (
        <LineChart
          data={data}
          margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
        >
          <CartesianGrid stroke="var(--grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <YAxis tick={axisTick} tickLine={false} axisLine={false} width={38} />
          {commonTooltip}
          <Line
            type="monotone"
            dataKey="conversions"
            name="Conversions"
            stroke={VIZ[0]}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="conversionsTarget"
            name="Target"
            stroke={VIZ[2]}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      );
    case "bar":
      return (
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          barGap={5}
        >
          <CartesianGrid stroke="var(--grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={46}
            tickFormatter={(v) => compactNumber(Number(v))}
          />
          {commonTooltip}
          <Bar
            dataKey="visitors"
            name="Visits"
            fill={VIZ[0]}
            radius={[5, 5, 0, 0]}
            maxBarSize={20}
            isAnimationActive={false}
          />
          <Bar
            dataKey="target"
            name="Target"
            fill={VIZ[2]}
            radius={[5, 5, 0, 0]}
            maxBarSize={20}
            isAnimationActive={false}
          />
        </BarChart>
      );
    case "ranked":
      return (
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, bottom: 0, left: 8 }}
        >
          <CartesianGrid stroke="var(--grid)" horizontal={false} />
          <XAxis
            type="number"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => compactNumber(Number(v))}
          />
          <YAxis
            type="category"
            dataKey="label"
            interval={0}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={72}
          />
          {commonTooltip}
          <Bar
            dataKey="value"
            name="Changes"
            fill={VIZ[0]}
            radius={[0, 5, 5, 0]}
            maxBarSize={22}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="value"
              position="right"
              formatter={(value) => Number(value).toLocaleString()}
              fill="var(--muted-foreground)"
              fontSize={10}
            />
          </Bar>
        </BarChart>
      );
    case "donut":
    case "pie": {
      const isDonut = kind === "donut";
      return (
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          {commonTooltip}
          <Pie
            data={data}
            dataKey="value"
            nameKey="segment"
            cx="50%"
            cy="50%"
            innerRadius={isDonut ? "61%" : 0}
            outerRadius="82%"
            paddingAngle={2}
            stroke="var(--background)"
            strokeWidth={2}
            cornerRadius={isDonut ? 4 : 0}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell
                key={entry.segment}
                fill={channelColor[entry.segment] || VIZ[5]}
              />
            ))}
            {isDonut && (
              <Label
                value="100%"
                position="center"
                fill="var(--foreground)"
                fontSize={25}
                fontWeight={650}
              />
            )}
          </Pie>
        </PieChart>
      );
    }
    case "radar":
      return (
        <RadarChart
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={compact ? "60%" : "80%"}
        >
          <PolarGrid stroke="var(--grid)" />
          <PolarAngleAxis
            dataKey="label"
            tickFormatter={(v: string) =>
              compact
                ? (
                    {
                      Acquisition: "Acquire",
                      Activation: "Activate",
                      Engagement: "Engage",
                      Retention: "Retain",
                      Referral: "Refer",
                      Revenue: "Revenue",
                    } as Record<string, string>
                  )[v] || v
                : v
            }
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          {commonTooltip}
          <Radar
            name="Current score"
            dataKey="value"
            stroke={VIZ[0]}
            fill={VIZ[0]}
            fillOpacity={0.22}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Radar
            name="Target score"
            dataKey="target"
            stroke={VIZ[2]}
            fill={VIZ[2]}
            fillOpacity={0.05}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            isAnimationActive={false}
          />
        </RadarChart>
      );
    case "radial":
      return (
        <RadialBarChart
          data={data}
          innerRadius="72%"
          outerRadius="94%"
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            name="Complete"
            cornerRadius={20}
            background={{ fill: "var(--grid)" }}
            fill={VIZ[0]}
            maxBarSize={24}
            isAnimationActive={false}
          >
            <Label
              value="76%"
              position="center"
              fill="var(--foreground)"
              fontSize={28}
              fontWeight={650}
            />
          </RadialBar>
          <ChartTooltip content={tooltipContent(kind, true)} />
        </RadialBarChart>
      );
    case "scatter":
      return (
        <ScatterChart margin={{ top: 12, right: 18, bottom: 8, left: 0 }}>
          <CartesianGrid stroke="var(--grid)" />
          <XAxis
            type="number"
            dataKey="x"
            name="Activity"
            domain={[0, 110]}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Engagement score"
            domain={[0, 110]}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={42}
          />
          <ZAxis
            type="number"
            dataKey="value"
            range={[48, 190]}
            name="Monthly visits"
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={tooltipContent(kind)}
          />
          {(["New", "Returning", "Partner"] as const).map((segment, index) => (
            <Scatter
              key={segment}
              name={segment}
              data={chartData("scatter", period).filter(
                (item) => item.segment === segment,
              )}
              fill={VIZ[index]}
              fillOpacity={0.78}
              isAnimationActive={false}
            />
          ))}
        </ScatterChart>
      );
    case "composed":
      return (
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        >
          <CartesianGrid stroke="var(--grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <YAxis
            yAxisId="visits"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={46}
            tickFormatter={(v) => compactNumber(Number(v))}
          />
          <YAxis
            yAxisId="rate"
            orientation="right"
            domain={[0, 8]}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={38}
            tickFormatter={(v) => `${v}%`}
          />
          {commonTooltip}
          <Bar
            yAxisId="visits"
            dataKey="visitors"
            name="Visits"
            fill={VIZ[0]}
            fillOpacity={0.82}
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
            isAnimationActive={false}
          />
          <Line
            yAxisId="rate"
            type="monotone"
            dataKey="conversionRate"
            name="Conversion rate"
            stroke={VIZ[2]}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      );
    case "waterfall":
      return (
        <BarChart
          data={data}
          margin={{ top: 12, right: 16, bottom: 4, left: 4 }}
        >
          <CartesianGrid stroke="var(--grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-14}
            textAnchor="end"
            height={46}
          />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(v) => compactNumber(Number(v))}
          />
          {commonTooltip}
          <Bar
            dataKey="base"
            name="Starting level"
            stackId="bridge"
            fill="transparent"
            stroke="none"
            legendType="none"
            isAnimationActive={false}
          />
          <Bar
            dataKey="increase"
            name="Increase"
            stackId="bridge"
            fill={VIZ[1]}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
          <Bar
            dataKey="decrease"
            name="Decrease"
            stackId="bridge"
            fill={VIZ[4]}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
          <Bar
            dataKey="total"
            name="Total"
            stackId="bridge"
            fill={VIZ[0]}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      );
    case "funnel": {
      const funnelData = data.map(({ label, value }) => ({ label, value }));
      return (
        <FunnelChart margin={{ top: 12, right: 30, bottom: 8, left: 30 }}>
          {commonTooltip}
          <Funnel
            data={funnelData}
            dataKey="value"
            nameKey="label"
            isAnimationActive={false}
            lastShapeType="rectangle"
          >
            {data.map((item, index) => (
              <Cell key={item.label} fill={VIZ[index % VIZ.length]} />
            ))}
            <LabelList
              dataKey="label"
              position="right"
              fill="var(--foreground)"
              fontSize={12}
              fontWeight={600}
            />
          </Funnel>
        </FunnelChart>
      );
    }
    case "treemap":
      return (
        <Treemap
          data={data}
          dataKey="value"
          nameKey="label"
          aspectRatio={1.5}
          nodeGap={3}
          content={TreemapCell}
          isAnimationActive={false}
        >
          {commonTooltip}
        </Treemap>
      );
    case "bubble":
      return (
        <ScatterChart margin={{ top: 12, right: 18, bottom: 8, left: 0 }}>
          <CartesianGrid stroke="var(--grid)" />
          <XAxis
            type="number"
            dataKey="x"
            name="Adoption"
            domain={[0, 110]}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Engagement score"
            domain={[0, 110]}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={42}
          />
          <ZAxis
            type="number"
            dataKey="value"
            range={[100, 520]}
            name="Opportunity"
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={tooltipContent(kind)}
          />
          {(["Core", "Growth", "Emerging"] as const).map((segment, index) => (
            <Scatter
              key={segment}
              name={segment}
              data={data.filter((item) => item.segment === segment)}
              fill={VIZ[index]}
              fillOpacity={0.7}
              isAnimationActive={false}
            />
          ))}
        </ScatterChart>
      );
    case "stacked":
      return (
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--grid)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={46}
            tickFormatter={(v) => compactNumber(Number(v))}
          />
          {commonTooltip}
          <Bar
            dataKey="organic"
            name="Organic"
            stackId="channels"
            fill={VIZ[0]}
            maxBarSize={22}
            isAnimationActive={false}
          />
          <Bar
            dataKey="paid"
            name="Paid"
            stackId="channels"
            fill={VIZ[1]}
            radius={[5, 5, 0, 0]}
            maxBarSize={22}
            isAnimationActive={false}
          />
        </BarChart>
      );
    case "heatmap":
    case "calendar":
    case "builds":
      return null;
  }
}

export function WidgetChart({
  kind,
  period = kind === "heatmap" ? 365 : 30,
}: {
  kind: WidgetKind;
  period?: number;
}) {
  const chartId = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) =>
      setCompact(entry.contentRect.width < 360),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  if (kind === "heatmap") return <TokenActivity period={period} />;
  if (kind === "calendar") return <ReleaseCalendar />;
  if (kind === "builds") return <BuildTable />;
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: 0,
      }}
    >
      <ChartContainer
        config={CONFIG}
        style={
          {
            width: "100%",
            height: "100%",
            aspectRatio: "auto",
            minHeight: 0,
            flex: "1 1 0",
          } as CSSProperties
        }
        aria-label={`${widgets.find((widget) => widget.id === kind)?.title ?? "Analytics"} chart`}
      >
        {renderChart(kind, period, chartId, compact)}
      </ChartContainer>
      <WidgetLegend kind={kind} />
    </div>
  );
}
