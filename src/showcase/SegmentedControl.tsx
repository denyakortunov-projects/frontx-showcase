import type { ReactNode } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@gears-frontx/ui-kit/toggle-group";
import "./section-tabs.css";
export function SegmentedControl({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: { value: string; label: ReactNode; name?: string }[];
}) {
  return (
    <ToggleGroup
      className="section-tabs"
      data-segments
      data-size="sm"
      spacing={3}
      aria-label={label}
      value={[value]}
      onValueChange={(values) => {
        if (values[0]) onChange(String(values[0]));
      }}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          aria-label={option.name}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
