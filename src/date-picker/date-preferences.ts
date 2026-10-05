"use client";
import { useEffect, useState } from "react";
export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type TimeFormat = "system" | "12" | "24";
export type DatePreferences = { locale?: string; timeFormat?: TimeFormat; weekStartsOn?: WeekStart };
export function validLocale(value?: string) {
  try { return value && value !== "system" ? Intl.getCanonicalLocales(value)[0] : undefined; }
  catch { return undefined; }
}
export function resolveDatePreferences(locale: string, timeFormat: TimeFormat = "system", weekStartsOn?: WeekStart) {
  const language = validLocale(locale) ?? "en-GB";
  const region = new Intl.Locale(language) as Intl.Locale & { getWeekInfo?: () => {firstDay: number}; weekInfo?: {firstDay: number} };
  const info = region.getWeekInfo?.() ?? region.weekInfo;
  const fallback = ["US","CA","JP","PH","MX","BR"].includes(region.maximize().region ?? "") ? 0 : 1;
  const firstDay = (info ? info.firstDay % 7 : fallback) as WeekStart;
  const hour12 = timeFormat === "12" || (timeFormat === "system" && !!new Intl.DateTimeFormat(language, {hour:"numeric"}).resolvedOptions().hour12);
  return {locale: language, hour12, hourCycle: hour12 ? "h12" as const : "h23" as const, weekStartsOn: weekStartsOn ?? firstDay};
}
/** Explicit host settings take precedence. The stable first render also supports client boundaries. */
export function useDatePreferences({locale, timeFormat = "system", weekStartsOn}: DatePreferences = {}) {
  const [browserLocale, setBrowserLocale] = useState("en-GB");
  useEffect(() => { setBrowserLocale(navigator.languages?.[0] ?? navigator.language ?? Intl.DateTimeFormat().resolvedOptions().locale); }, []);
  return resolveDatePreferences(validLocale(locale) ?? browserLocale, timeFormat, weekStartsOn);
}
export function preferencesFromQuery(query: URLSearchParams): DatePreferences {
  const first = query.get("weekStart");
  return {locale: validLocale(query.get("dateLocale") ?? undefined),
    timeFormat: query.get("timeFormat") === "12" ? "12" : query.get("timeFormat") === "24" ? "24" : "system",
    weekStartsOn: first === "0" ? 0 : first === "1" ? 1 : first === "6" ? 6 : undefined};
}
