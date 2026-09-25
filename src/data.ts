export type WidgetKind =
  | "area"
  | "line"
  | "bar"
  | "ranked"
  | "donut"
  | "pie"
  | "radar"
  | "radial"
  | "scatter"
  | "stacked";

export interface ChartRow {
  [key: string]: string | number;
  date: string;
  label: string;
  visitors: number;
  conversions: number;
  conversionsTarget: number;
  target: number;
  organic: number;
  paid: number;
  direct: number;
  value: number;
  x: number;
  y: number;
  segment: string;
}

const segments = [
  ["Direct", 31],
  ["Organic search", 27],
  ["Paid search", 18],
  ["Referral", 14],
  ["Social", 10],
] as const;

const contributorNames = [
  "Alex M.",
  "Jamie R.",
  "Sam K.",
  "Robin L.",
  "Casey T.",
  "Taylor B.",
  "Jordan D.",
  "Avery W.",
  "Morgan",
  "Riley N.",
];

const radarNames = [
  "Acquisition",
  "Activation",
  "Engagement",
  "Retention",
  "Referral",
  "Revenue",
] as const;

function dayLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function row(label: string, index: number, date = ""): ChartRow {
  const wave = Math.sin(index * 0.53) * 0.13 + Math.cos(index * 0.19) * 0.08;
  const visitors = Math.round(
    740 + index * 8 + wave * 470 + ((index * 41) % 83),
  );
  const organic = Math.round(
    visitors * (0.43 + Math.sin(index * 0.31) * 0.035),
  );
  const paid = Math.round(visitors * (0.31 + Math.cos(index * 0.24) * 0.04));
  const direct = Math.round(visitors * 0.26);
  const conversions = Math.round(
    visitors * (0.036 + Math.sin(index * 0.27) * 0.003),
  );
  return {
    date,
    label,
    visitors,
    conversions,
    conversionsTarget: Math.round(conversions * 1.09),
    target: Math.round(visitors * 1.08),
    organic,
    paid,
    direct,
    value: visitors,
    x: 1 + ((index * 17) % 100),
    y: 2 + ((index * 29 + 7) % 94),
    segment: label,
  };
}

/** Deterministic, synthetic samples for chart rendering and CSV/table inspection. */
export function chartData(kind: WidgetKind, period = 30): ChartRow[] {
  const safePeriod = Math.max(
    1,
    Math.min(365, Math.round(Number.isFinite(period) ? period : 30)),
  );

  if (kind === "donut" || kind === "pie") {
    return segments.map(([label, share], index) => ({
      ...row(label, index),
      segment: label,
      value: share,
    }));
  }

  if (kind === "ranked") {
    const periodScale = safePeriod / 30;
    return contributorNames
      .map((label, index) => ({
        ...row(label, index + 3),
        value: Math.round(
          (1680 - index * 137 + ((index * 43) % 109)) * periodScale,
        ),
      }))
      .sort((a, b) => b.value - a.value);
  }

  if (kind === "radar") {
    return radarNames.map((label, index) => ({
      ...row(label, index + 5),
      value: 52 + ((index * 19 + 14) % 43),
      target: 70 + ((index * 11 + 3) % 22),
    }));
  }

  if (kind === "radial") {
    return [
      {
        ...row("Monthly target", 8),
        label: "Monthly target",
        value: 76,
        target: 100,
      },
    ];
  }

  if (kind === "scatter") {
    return Array.from(
      { length: Math.max(18, Math.min(48, safePeriod + 6)) },
      (_, index) => ({
        ...row(`Account ${String(index + 1).padStart(2, "0")}`, index),
        x: 12 + ((index * 37) % 86),
        y: 9 + ((index * 53 + 17) % 89),
        value: 38 + ((index * 47 + 11) % 130),
        segment: ["New", "Returning", "Partner"][index % 3],
      }),
    );
  }

  // Fixed fixture end date keeps every period preset auditable and stable.
  const today = new Date(Date.UTC(2026, 8, 25));
  const count = safePeriod;
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() - (count - index - 1),
      ),
    );
    const label = dayLabel(date);
    return row(
      label,
      index + Math.max(0, 90 - count),
      date.toISOString().slice(0, 10),
    );
  });
}
