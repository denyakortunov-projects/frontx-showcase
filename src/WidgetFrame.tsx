import type { ReactNode } from "react";
import { Card } from "@gears-frontx/ui-kit/card";
import { Button } from "@gears-frontx/ui-kit/button";
import { CircleDashed, Grid2X2, AlertCircle, RotateCcw } from "lucide-react";
type LoadState = "ready" | "loading" | "empty" | "error";
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
  className = "",
  state = "ready",
  retry,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  height?: number;
  className?: string;
  state?: LoadState;
  retry?: () => void;
}) {
  return (
    <Card className={`widget-frame ${className}`} style={{ height }}>
      <div className="widget-heading">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
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
