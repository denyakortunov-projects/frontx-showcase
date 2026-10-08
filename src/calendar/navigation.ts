import { useEffect, useRef, useState, useCallback, useId } from "react";
export type NavigationGuard = () => Promise<boolean>;
const guards = new Map<string, NavigationGuard>();
async function mayLeave() {
  for (const check of guards.values()) {
    if (!(await check())) return false;
  }
  return true;
}
export function useCalendarNavigationRegistration() {
  const id = useId();
  return useCallback(
    (next: NavigationGuard | null) => {
      if (next) guards.set(id, next);
      else guards.delete(id);
    },
    [id],
  );
}
export function useShowcaseQuery() {
  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search),
  );
  const index = useRef(Number(history.state?.frontxIndex) || 0);
  const replay = useRef(false);
  const pending = useRef(false);
  useEffect(() => {
    history.replaceState(
      { ...history.state, frontxIndex: index.current },
      "",
      location.href,
    );
    let restored: (() => void) | null = null;
    const restoreAnchor = () => {
      const actual = Number(history.state?.frontxIndex) || 0;
      if (actual === index.current) return Promise.resolve();
      return new Promise<void>((resolve) => {
        restored = resolve;
        history.go(index.current - actual);
      });
    };
    const pop = async () => {
      const target = Number(history.state?.frontxIndex) || 0;
      if (pending.current) {
        // Browser buttons remain active while our modal is open. Keep the
        // actual history entry anchored, not only the React query state.
        if (target !== index.current) history.go(index.current - target);
        else {
          const done = restored;
          restored = null;
          done?.();
        }
        return;
      }
      if (replay.current) {
        replay.current = false;
        index.current = target;
        setQuery(new URLSearchParams(location.search));
        return;
      }
      if (guards.size && target !== index.current) {
        pending.current = true;
        const delta = target - index.current;
        await restoreAnchor();
        const proceed = await mayLeave();
        await restoreAnchor();
        pending.current = false;
        if (proceed) {
          replay.current = true;
          history.go(delta);
        }
      } else {
        index.current = target;
        setQuery(new URLSearchParams(location.search));
      }
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  const update = async (values: Record<string, string>) => {
    if (pending.current) return;
    const onlyAppearance = Object.keys(values).every((k) =>
      ["v", "mode", "theme", "calDensity", "calWidth", "calHeight"].includes(k),
    );
    if (!onlyAppearance && guards.size && !(await mayLeave())) return;
    const p = new URLSearchParams(location.search);
    Object.entries(values).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    if (p.toString() === location.search.slice(1)) return;
    index.current++;
    history.pushState(
      { frontxIndex: index.current },
      "",
      `${location.pathname}?${p}${onlyAppearance ? location.hash : ""}`,
    );
    setQuery(p);
  };
  return [query, update] as const;
}
