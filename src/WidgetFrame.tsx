import type { ReactNode } from "react";
import { Card } from "@gears-frontx/ui-kit/card";
import { Button } from "@gears-frontx/ui-kit/button";
import { CircleDashed, Grid2X2, AlertCircle, RotateCcw } from "lucide-react";
type LoadState = "ready" | "loading" | "empty" | "error";
export type WidgetDensity = "standard" | "compact";
export function widgetHeight(height: number, density: WidgetDensity) {
  return density === "compact" ? Math.round(height * 0.65) : height;
}
export function WidgetDensitySwitch({
  value,
  onChange,
}: {
  value: WidgetDensity;
  onChange: (value: WidgetDensity) => void;
}) {
  return (
    <div className="density-switch" role="group" aria-label="Widget height">
      {(["standard", "compact"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option === "standard" ? "Standard" : "Compact"}
        </button>
      ))}
    </div>
  );
}
function StateBody({
  state,
  children,
  retry,
}: {
  state: LoadState;
  children: ReactNode;
  retry?: () => void;
}) {
  if (state === "ready") return <>{children}</>;
  return (
    <div className="state-body" role="status">
      {state === "loading" ? (
        <>
          <CircleDashed className="loading-icon" />
          <span>Loading sample data</span>
          <div className="skeleton-bars">
            {[40, 65, 45, 80, 55, 90, 70].map((v, i) => (
              <i key={i} style={{ height: v + "%" }} />
            ))}
          </div>
        </>
      ) : state === "empty" ? (
        <>
          <Grid2X2 />
          <strong>No data in this period</strong>
          <span>Choose another period to explore this widget.</span>
        </>
      ) : (
        <>
          <AlertCircle />
          <strong>Could not load this dataset</strong>
          <Button
            variant="outline"
            size="sm"
            onClick={retry}
            icon={<RotateCcw />}
          >
            Try again
          </Button>
        </>
      )}
    </div>
  );
}
export function WidgetFrame({
  title,
  subtitle,
  children,
  action,
  height = 304,
  density = "standard",
  className = "",
  state = "ready",
  retry,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  height?: number;
  density?: WidgetDensity;
  className?: string;
  state?: LoadState;
  retry?: () => void;
}) {
  return (
    <Card
      className={`widget-frame widget-frame--${density} ${className}`}
      style={{ height: widgetHeight(height, density) }}
    >
      <div className="widget-heading">
        <div>
          <h3>{title}</h3>
          {subtitle && (
            <p title={density === "compact" ? subtitle : undefined}>
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      <div className="widget-body">
        <StateBody state={state} retry={retry}>
          {children}
        </StateBody>
      </div>
    </Card>
  );
}
