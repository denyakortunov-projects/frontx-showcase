import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.DEMO_URL || "http://127.0.0.1:5202";
const checks = [],
  errors = [],
  colors = [];
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
p.setDefaultTimeout(6000);
p.on("pageerror", (e) => errors.push(e.message));
const ok = (name, value) => {
  checks.push({ name, passed: !!value });
  if (!value) throw Error(name);
};
const goto = async (q = "") => {
  await p.goto(`${base}/?page=event-calendar${q.includes("calTab=") ? "" : "&calTab=playground"}${q}`);
  await p.locator(".event-calendar").first().waitFor();
};
const close = () =>
  p
    .getByRole("dialog")
    .getByRole("button", { name: "Close", exact: true })
    .click();
try {
  await goto("&calState=overlaps");
  await p.locator(".fc-more-link").first().focus();
  await p.keyboard.press("Enter");
  await p.getByRole("dialog").waitFor();
  ok(
    "keyboard overflow full day",
    (await p.getByRole("dialog").locator("[data-event-id]").count()) === 5,
  );
  await p.getByRole("button", { name: /Discussion 5/ }).click();
  await p.getByRole("heading", { name: "Discussion 5", exact: true }).waitFor();
  ok("overflow event opens correct details", true);
  await close();
  await goto();
  await p.locator('[data-event-id="planning"]').first().focus();
  await p.keyboard.press("Enter");
  await p
    .getByRole("heading", { name: "Weekly planning", exact: true })
    .waitFor();
  ok("keyboard event opens details", true);
  await p.keyboard.press("Escape");
  await p.getByRole("dialog").waitFor({ state: "hidden" });
  ok(
    "details returns focus to event",
    (await p.evaluate(() =>
      document.activeElement?.getAttribute("data-event-id"),
    )) === "planning",
  );
  await p.getByRole("button", { name: "New event", exact: true }).click();
  const dialog = p.getByRole("dialog");
  await p.getByLabel("Title", { exact: true }).focus();
  await p.keyboard.press("Shift+Tab");
  await p.waitForFunction(() =>
    document.querySelector(".cal-editor")?.contains(document.activeElement),
  );
  ok(
    "editor contains reverse Tab focus",
    await dialog.evaluate((e) => e.contains(document.activeElement)),
  );
  await p.keyboard.press("Tab");
  await p.waitForFunction(() =>
    document.querySelector(".cal-editor")?.contains(document.activeElement),
  );
  ok(
    "editor contains Tab focus",
    await dialog.evaluate((e) => e.contains(document.activeElement)),
  );
  await p.getByLabel("Title", { exact: true }).fill("Keep me");
  await p.setViewportSize({ width: 900, height: 800 });
  ok(
    "resize preserves draft",
    (await p.getByLabel("Title", { exact: true }).inputValue()) === "Keep me",
  );
  await p.mouse.click(10, 790);
  await p.getByRole("button", { name: "Keep editing", exact: true }).click();
  ok(
    "outside click protects draft",
    (await p.getByLabel("Title", { exact: true }).inputValue()) === "Keep me",
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  await p.setViewportSize({ width: 1600, height: 1000 });
  await goto();
  const scroller = p.locator(".fc-scroller-liquid-absolute");
  await scroller.evaluate((e) => (e.scrollTop = 900));
  await p.waitForTimeout(100);
  await p.getByRole("button", { name: "Month", exact: true }).click();
  await p.getByRole("button", { name: "Week", exact: true }).click();
  await p.waitForTimeout(150);
  ok(
    "grid scroll restored across views",
    Math.abs(
      (await p
        .locator(".fc-scroller-liquid-absolute")
        .evaluate((e) => e.scrollTop)) - 900,
    ) < 2,
  );
  await p
    .getByRole("button", { name: "Charts & widgets", exact: true })
    .click();
  await p.waitForURL(/page=gallery/);
  await p.locator(".gallery-item").first().waitFor();
  await p.evaluate(() => history.back());
  await p.waitForURL(/page=event-calendar/);
  await p.locator(".fc-scroller-liquid-absolute").waitFor();
  await p.waitForFunction(
    () =>
      Math.abs(
        document.querySelector(".fc-scroller-liquid-absolute").scrollTop - 900,
      ) <= 3,
  );
  // FullCalendar adds up to 2 px when converting saved pixels to its initial time.
  ok("route Back restores grid scroll within 3px", true);
  await p
    .locator(".fc-scroller-liquid-absolute")
    .evaluate((e) => (e.scrollTop = e.scrollHeight));
  ok(
    "night segments retain id",
    (await p.locator('[data-event-id="night"]').count()) === 2,
  );
  await p.locator('[data-event-id="night"]').first().click();
  ok(
    "night spans two dates",
    /5 Oct.*6 Oct/.test(await p.getByRole("dialog").innerText()),
  );
  await close();
  await goto("&calZone=UTC&calView=agenda");
  await p.locator('[data-event-id="planning"]').first().click();
  ok(
    "display zone changes time only",
    /01:00/.test(await p.getByRole("dialog").innerText()),
  );
  ok(
    "source timezone retained",
    /Event timezone: Asia\/Singapore/.test(
      await p.getByRole("dialog").innerText(),
    ),
  );
  await close();
  await p.getByRole("button", { name: "Next period", exact: true }).click();
  await p.getByRole("button", { name: "Today", exact: true }).click();
  ok(
    "Today uses injected demo date",
    new URL(p.url()).searchParams.get("calDate") === "2026-10-05",
  );
  await goto("&calState=empty");
  await p.getByRole("button", { name: "New event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("First event");
  await p.getByRole("button", { name: "Create event", exact: true }).click();
  await p.getByRole("heading", { name: "First event", exact: true }).waitFor();
  ok(
    "empty fixture accepts first event",
    new URL(p.url()).searchParams.get("calState") === "ready",
  );
  await close();
  await goto();
  await p.getByRole("button", { name: "Day", exact: true }).click();
  await p.locator('[data-event-id="planning"]').first().click();
  const guardedUrl = p.url();
  await p.getByRole("button", { name: "Edit event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Repeated Back");
  await p.evaluate(() => history.back());
  await p.getByRole("button", { name: "Keep editing", exact: true }).waitFor();
  await p.evaluate(() => history.back());
  await p.waitForTimeout(150);
  ok("repeated Back keeps actual history anchored", p.url() === guardedUrl);
  await p.getByRole("button", { name: "Keep editing", exact: true }).click();
  ok(
    "repeated Back retains draft",
    (await p.getByLabel("Title", { exact: true }).inputValue()) ===
      "Repeated Back",
  );
  await p.getByRole("button", { name: "Save changes", exact: true }).click();
  await p.getByRole("button", { name: "Edit event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Second save");
  await p.getByRole("button", { name: "Save changes", exact: true }).click();
  await p.getByRole("heading", { name: "Second save", exact: true }).waitFor();
  ok("same event reopens and saves again", true);
  await p.getByRole("button", { name: "Delete event", exact: true }).click();
  await p.getByRole("button", { name: "Delete", exact: true }).click();
  await p.getByRole("dialog").waitFor({ state: "hidden" });
  await p.waitForFunction(
    () => document.activeElement?.textContent === "Today",
  );
  ok("delete returns focus to Today", true);
  await goto("&calTab=embedded");
  await p
    .locator(".event-calendar")
    .first()
    .getByRole("button", { name: "New event", exact: true })
    .click();
  await p.getByLabel("Title", { exact: true }).fill("Embedded dirty");
  await p.keyboard.press("Escape");
  await p.getByRole("button", { name: "Keep editing", exact: true }).click();
  ok(
    "embedded dirty guard",
    (await p.getByLabel("Title", { exact: true }).inputValue()) ===
      "Embedded dirty",
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  // Browser-equivalent 200% layout viewport: 1600 physical pixels become 800 CSS pixels.
  await p.setViewportSize({ width: 800, height: 500 });
  await goto();
  await p.getByRole("button", { name: "New event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Zoom");
  await p
    .getByRole("button", { name: "Create event", exact: true })
    .scrollIntoViewIfNeeded();
  ok(
    "200 percent layout all editor actions reachable",
    (await p
      .getByRole("button", { name: "Create event", exact: true })
      .isVisible()) &&
      (await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      )),
  );
  await p.screenshot({ path: "qa/event-calendar/zoom-layout.png" });
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  await p.setViewportSize({ width: 1600, height: 1000 });
  for (const theme of ["fabric", "editorial", "terminal", "iris", "lagoon"])
    for (const mode of ["light", "dark"]) {
      await goto(`&theme=${theme}&mode=${mode}`);
      const samples = await p.evaluate(() => {
        const color = (v) => {
          const c = document.createElement("canvas");
          c.width = c.height = 1;
          const x = c.getContext("2d");
          x.fillStyle = v;
          x.fillRect(0, 0, 1, 1);
          return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
        };
        const lum = (c) =>
          c
            .map((v) => {
              v /= 255;
              return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
            })
            .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
        const ratio = (a, b) => {
          const x = lum(a),
            y = lum(b);
          return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
        };
        const root = document.querySelector(".event-calendar");
        const computed = getComputedStyle(root);
        const pairs = [
          ["text", "--foreground", "--card"],
          ["muted", "--muted-foreground", "--card"],
          ["event", "--foreground", "--secondary"],
          ["selected", "--accent-foreground", "--accent"],
          ["focus", "--ring", "--card"],
        ];
        return pairs.map(([name, a, b]) => ({
          name,
          ratio: ratio(
            color(computed.getPropertyValue(a)),
            color(computed.getPropertyValue(b)),
          ),
        }));
      });
      colors.push({ theme, mode, samples });
      for (const s of samples)
        ok(
          `${theme} ${mode} ${s.name} contrast`,
          s.ratio >= (s.name === "focus" ? 3 : 4.5),
        );
    }
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.getByRole("button", { name: "New event", exact: true }).click();
  ok(
    "reduced motion editor",
    await p
      .locator(".cal-editor")
      .evaluate(
        (e) =>
          getComputedStyle(e).animationName === "none" &&
          getComputedStyle(e).transitionDuration === "0s",
      ),
  );
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} catch (e) {
  console.error(await p.locator(".fc-scroller-liquid-absolute").evaluateAll(els=>els.map(e=>({top:e.scrollTop,height:e.clientHeight,full:e.scrollHeight}))));
  await p.screenshot({ path: "qa/calendar-refresh/accessibility-failure.png" });
  console.error(e);
  process.exitCode = 1;
} finally {
  fs.writeFileSync(
    "qa/calendar-refresh/accessibility-report.json",
    JSON.stringify(
      { base, at: new Date().toISOString(), checks, colors, errors },
      null,
      2,
    ),
  );
  await b.close();
}
