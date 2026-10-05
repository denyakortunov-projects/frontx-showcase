import { TabsList, type TabsListProps } from "@gears-frontx/ui-kit/tabs";
import "./section-tabs.css";
/** Shared catalogue navigation: button-group appearance, Base UI tab semantics. */
export function SectionTabs({
  className = "",
  size = "default",
  ...props
}: Omit<TabsListProps, "variant">) {
  return (
    <TabsList
      {...props}
      variant="default"
      size={size}
      data-size={size}
      className={`section-tabs ${className}`}
    />
  );
}
