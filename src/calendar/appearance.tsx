import {
  ToggleGroup,
  ToggleGroupItem,
} from "@gears-frontx/ui-kit/toggle-group";
import type { CalendarView, EventColor } from "./types";
export const EVENT_COLORS: { value: EventColor; label: string }[] = [
  { value: "accent", label: "Theme" },
  { value: "blue", label: "Blue" },
  { value: "teal", label: "Teal" },
  { value: "violet", label: "Violet" },
  { value: "amber", label: "Amber" },
  { value: "rose", label: "Rose" },
];
export function EventColorPicker({
  value,
  onChange,
  disabled = false,
}: {
  disabled?: boolean;
  value: EventColor;
  onChange: (value: EventColor) => void;
}) {
  return (
    <ToggleGroup
      className="cal-color-picker"
      disabled={disabled}
      value={[value]}
      onValueChange={(values) => {
        if (values[0]) onChange(values[0] as EventColor);
      }}
      aria-label="Event colour"
      spacing={8}
    >
      {EVENT_COLORS.map((c) => (
        <ToggleGroupItem
          className="cal-color-choice"
          key={c.value}
          value={c.value}
          data-color={c.value}
          aria-label={c.label}
          title={c.label}
        >
          <span className="cal-color-swatch" />
          <span className="sr-only">{c.label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
export function CalendarViewSwitch({
  value,
  onChange,
}: {
  value: CalendarView;
  onChange: (view: CalendarView) => void;
}) {
  return (
    <ToggleGroup
      className="cal-view-switch"
      value={[value === "agenda" ? "week" : value]}
      onValueChange={(values) => {
        if (values[0]) onChange(values[0] as CalendarView);
      }}
      aria-label="Calendar view"
      spacing={2}
      size="sm"
    >
      {(["day", "week", "month", "year"] as const).map((view) => (
        <ToggleGroupItem className="cal-view-option" key={view} value={view}>
          {view[0].toUpperCase() + view.slice(1)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
