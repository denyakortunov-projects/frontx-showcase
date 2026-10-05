"use client";

import { useEffect, useState } from "react";
import {
  DatePicker,
  type DatePickerProps,
} from "@gears-frontx/ui-kit/date-picker";
import "./date-picker.css";
/** The installed FrontX DatePicker API, with a one-month range popup on narrow screens. */
export function ResponsiveDatePicker(props: DatePickerProps) {
  const [narrow, setNarrow] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const sync = () => setNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const className = `frontx-date-picker ${props.className ?? ""}`;
  return props.mode === "range" ? (
    <DatePicker
      {...props}
      className={className}
      numberOfMonths={narrow ? 1 : (props.numberOfMonths ?? 2)}
    />
  ) : (
    <DatePicker {...props} className={className} />
  );
}
export type { DatePickerProps } from "@gears-frontx/ui-kit/date-picker";
