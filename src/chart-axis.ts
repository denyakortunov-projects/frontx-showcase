/** Shared linear-axis policy. See public/handoff/CHART-AXES.md. */
export interface NumericAxisOptions {
  /** Available plot length, after margins/labels/legend. */
  pixels?: number;
  orientation?: "horizontal" | "vertical";
  integer?: boolean;
  includeZero?: boolean;
}

export interface NumericAxis {
  domain: [number, number];
  ticks: number[];
  step: number;
  tickFormatter: (value: number) => string;
}

const clean = (value: number) => Number(value.toPrecision(14)) || 0;

function niceStep(raw: number): number {
  const power = 10 ** Math.floor(Math.log10(raw));
  const fraction = raw / power;
  return (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10) * power;
}

function formatter(ticks: number[], step: number) {
  const max = Math.max(...ticks.map(Math.abs));
  const digits = Math.max(0, -Math.floor(Math.log10(step)));
  const scientific = digits > 12 || max >= 1e15;
  const precise = new Intl.NumberFormat("en", scientific
    ? { notation: "scientific", maximumSignificantDigits: 12 }
    : { maximumFractionDigits: Math.min(20, digits) });
  const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 });
  const useCompact = !scientific && max >= 1000 &&
    new Set(ticks.map(value => compact.format(value))).size === ticks.length;
  return (value: number) => (useCompact ? compact : precise).format(value === 0 ? 0 : value);
}

/** Outward-rounded bounds; never divide an arbitrary maximum into equal labels. */
export function numericAxis(values: readonly number[], options: NumericAxisOptions = {}): NumericAxis {
  const finite = values.filter(Number.isFinite);
  let min = finite.length ? finite.reduce((lowest, value) => Math.min(lowest, value), Infinity) : 0;
  let max = finite.length ? finite.reduce((highest, value) => Math.max(highest, value), -Infinity) : 1;
  if (options.includeZero !== false) {
    min = Math.min(0, min);
    max = Math.max(0, max);
  }
  if (min === max) {
    const pad = min === 0 ? 1 : Math.max(Math.abs(min) * 0.1, options.integer ? 1 : 0);
    if (min === 0) max = 1;
    else { min -= pad; max += pad; }
  }
  if (!Number.isFinite(max - min) || max <= min) throw new RangeError("Numeric axis range is not representable; rescale the unit.");
  const pixels = Number.isFinite(options.pixels) ? Math.max(0, options.pixels!) : 240;
  const spacing = options.orientation === "horizontal" ? 80 : 32;
  const intervals = Math.max(2, Math.min(7, Math.floor(pixels / spacing)));
  let step = niceStep((max - min) / intervals);
  if (!Number.isFinite(step) || step <= 0) throw new RangeError("Numeric axis step is not representable; rescale the unit.");
  if (options.integer) step = Math.max(1, step);
  // Rounding both ends may add an interval; retain the pixel-density budget.
  while (Math.ceil(max / step) - Math.floor(min / step) > intervals) step = niceStep(step * 1.01);
  const first = Math.floor(min / step);
  const last = Math.ceil(max / step);
  const ticks = Array.from({ length: last - first + 1 }, (_, index) => clean((first + index) * step));
  if (ticks.some((value, index) => !Number.isFinite(value) || (index > 0 && value <= ticks[index - 1]))) {
    throw new RangeError("Numeric axis ticks are not representable; rescale the unit.");
  }
  return { domain: [ticks[0], ticks[ticks.length - 1]], ticks, step, tickFormatter: formatter(ticks, step) };
}

/** A bounded share/score is an explicit semantic exception to the 1–2–5 series. */
export function boundedPercentAxis(pixels: number, orientation: "horizontal" | "vertical" = "vertical"): NumericAxis {
  const spacing = orientation === "horizontal" ? 80 : 32;
  const step = pixels >= spacing * 4 ? 25 : 50;
  const ticks = step === 25 ? [0, 25, 50, 75, 100] : [0, 50, 100];
  return { domain: [0, 100], ticks, step, tickFormatter: value => String(value) };
}

/** Recharts diverging stacks need positive and negative extents separately. */
export function stackedExtents(rows: readonly (readonly number[])[]): number[] {
  return rows.flatMap(row => [
    row.filter(Number.isFinite).reduce((sum, value) => sum + Math.min(0, value), 0),
    row.filter(Number.isFinite).reduce((sum, value) => sum + Math.max(0, value), 0),
  ]);
}
