import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.DEMO_URL || "http://127.0.0.1:5200";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  reducedMotion: "reduce",
});
const checks = [],
  errors = [];
page.on("pageerror", (e) => errors.push(e.message));
function ok(name, value) {
  checks.push({ name, passed: !!value });
  if (!value) throw Error(name);
}
async function route(q) {
  await page.goto(`${base}/?${q}`);
  await page.locator("h1").waitFor();
}
try {
  await route("page=gallery");
  await page.locator(".gallery-item").last().waitFor();
  ok(
    "18 gallery entries",
    (await page.locator(".gallery-item").count()) === 18,
  );
  await page.getByRole("button", { name: "Polar", exact: true }).click();
  ok("polar filter", (await page.locator(".gallery-item").count()) === 4);
  await page.getByRole("button", { name: "All charts", exact: true }).click();
  await page.getByLabel("Search widgets").fill("token");
  ok("heatmap search", (await page.locator(".gallery-item").count()) === 1);
  for (const kind of [
    "area",
    "line",
    "bar",
    "ranked",
    "donut",
    "pie",
    "radar",
    "radial",
    "scatter",
    "stacked",
    "composed",
    "waterfall",
    "funnel",
    "treemap",
    "bubble",
    "heatmap",
  ]) {
    await route(`page=widget&widget=${kind}&width=12&height=464`);
    await page.locator(".widget-frame").waitFor();
    ok(
      `${kind} renders data graphic`,
      (await page.locator(".recharts-surface").count()) > 0,
    );
    await page.getByRole("tab", { name: "Data", exact: true }).click();
    ok(`${kind} has data rows`, (await page.locator("tbody tr").count()) > 0);
    await page.getByRole("tab", { name: "Preview", exact: true }).click();
    await page.getByLabel("Width", { exact: true }).selectOption("3");
    await page.getByLabel("Height", { exact: true }).selectOption("304");
    ok(
      `${kind} respects height`,
      Math.round((await page.locator(".widget-frame").boundingBox()).height) ===
        304,
    );
  }
  await route("page=widget&widget=area");
  await page.getByLabel("Period", { exact: true }).selectOption("7");
  await page.getByRole("tab", { name: "Data", exact: true }).click();
  ok("period updates data", (await page.locator("tbody tr").count()) === 7);
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  await page.getByLabel("State", { exact: true }).selectOption("error");
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  ok(
    "error retry",
    (await page.getByLabel("State", { exact: true }).inputValue()) === "ready",
  );
  await route("page=modularity");
  ok(
    "default five modules",
    (await page.locator(".module-cell").count()) === 5,
  );
  await page
    .getByRole("button", { name: "3 blocks wide", exact: true })
    .click();
  ok(
    "three block URL",
    JSON.parse(new URL(page.url()).searchParams.get("modules"))[0].width === 3,
  );
  await page.getByRole("button", { name: "4 rows tall", exact: true }).click();
  ok(
    "independent height",
    Math.round(
      (
        await page
          .locator(".module-cell")
          .first()
          .locator(".widget-frame")
          .boundingBox()
      ).height,
    ) === 624,
  );
  await page.goBack();
  ok(
    "back restores height",
    Math.round(
      (
        await page
          .locator(".module-cell")
          .first()
          .locator(".widget-frame")
          .boundingBox()
      ).height,
    ) === 464,
  );
  await page.goForward();
  ok(
    "forward restores height",
    Math.round(
      (
        await page
          .locator(".module-cell")
          .first()
          .locator(".widget-frame")
          .boundingBox()
      ).height,
    ) === 624,
  );
  await page
    .getByRole("button", { name: "Select widget 2", exact: true })
    .click();
  await page.getByLabel("Module chart").selectOption("treemap");
  ok(
    "selected module changes only second",
    JSON.parse(new URL(page.url()).searchParams.get("modules"))[1].kind ===
      "treemap",
  );
  await page.getByRole("button", { name: "Add widget", exact: true }).click();
  ok("add module", (await page.locator(".module-cell").count()) === 6);
  await page
    .getByRole("button", { name: "Remove selected widget", exact: true })
    .click();
  ok("remove module", (await page.locator(".module-cell").count()) === 5);
  await page.getByRole("button", { name: "Compact", exact: true }).click();
  ok("compact preset", (await page.locator(".module-cell").count()) === 4);
  await route("page=elements");
  ok(
    "20 component demos",
    (await page.locator(".elements-card").count()) === 20,
  );
  await page
    .getByRole("button", { name: "Create report", exact: true })
    .click();
  ok(
    "action feedback",
    await page
      .getByText("Report created in this local demo", { exact: true })
      .isVisible(),
  );
  await page.getByRole("tab", { name: /^Activity/ }).click();
  ok(
    "working tabs",
    await page.getByText("8 recent updates", { exact: true }).isVisible(),
  );
  await page.getByRole("tab", { name: /^Activity/ }).focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  ok(
    "keyboard tabs",
    (await page
      .getByRole("tab", { name: "Settings", exact: true })
      .getAttribute("aria-selected")) === "true",
  );
  await page.getByRole("switch", { name: "Email notifications" }).click();
  ok(
    "switch toggles",
    (await page
      .getByRole("switch", { name: "Email notifications" })
      .getAttribute("aria-checked")) === "false",
  );
  await page.getByRole("button", { name: "Manage", exact: true }).click();
  await page.getByRole("dialog").waitFor();
  ok("dialog visible", await page.getByRole("dialog").isVisible());
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  ok("dialog Escape", (await page.getByRole("dialog").count()) === 0);
  ok(
    "dialog focus restored",
    await page
      .getByRole("button", { name: "Manage", exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  await page.getByRole("button", { name: "Plan actions", exact: true }).click();
  await page.getByRole("menu").waitFor();
  ok("menu visible", await page.getByRole("menu").isVisible());
  await page.keyboard.press("Escape");
  await page.getByLabel("Search recent activity").fill("no-such-project");
  ok(
    "table empty filter",
    await page.getByText("No matching activity.", { exact: true }).isVisible(),
  );
  await page.getByLabel("Search recent activity").fill("");
  await page.getByRole("button", { name: "Load preview", exact: true }).click();
  ok(
    "skeleton resolves",
    await page
      .getByText("Your latest project summary is ready.", { exact: true })
      .isVisible(),
  );
  for (const theme of ["fabric", "editorial", "terminal", "iris", "lagoon"]) {
    for (const mode of ["light", "dark"]) {
      await route(`page=elements&theme=${theme}&mode=${mode}`);
      ok(
        `${theme} ${mode} tokens`,
        (await page.locator("html").getAttribute("data-brand")) === theme,
      );
      await page.screenshot({
        path: `qa/expansion-elements-${theme}-${mode}.png`,
        fullPage: true,
      });
    }
  }
  await route("page=themes");
  ok(
    "five named palettes",
    (await page.locator(".palette-card").count()) === 5,
  );
  await page.getByRole("button", { name: "Apply Iris", exact: true }).click();
  ok(
    "apply palette",
    (await page.locator("html").getAttribute("data-brand")) === "iris",
  );
  await page.goBack();
  ok(
    "palette Back",
    (await page.locator("html").getAttribute("data-brand")) === "fabric",
  );
  for (const layout of ["overview", "insight", "polar"]) {
    await route(`page=layouts&layout=${layout}`);
    ok(
      `${layout} three sections`,
      (await page.locator(".recipe-section").count()) >= 3,
    );
    await page
      .getByRole("button", { name: "Last 7 days", exact: true })
      .click();
    ok(
      `${layout} shared period`,
      new URL(page.url()).searchParams.get("period") === "7",
    );
    await page.screenshot({
      path: `qa/expansion-composition-${layout}.png`,
      fullPage: true,
    });
  }
  for (const width of [1920, 1280, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const routeName of [
      "gallery",
      "elements",
      "themes",
      "modularity",
      "layouts",
      "handoff",
      "widget",
    ]) {
      await route(`page=${routeName}&widget=heatmap&width=3`);
      ok(
        `${routeName} fits ${width}`,
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
    }
    await page.screenshot({
      path: `qa/expansion-heatmap-${width}.png`,
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 1600, height: 1000 });
  for (const mode of ["light", "dark"]) {
    await route(`page=widget&widget=heatmap&width=12&mode=${mode}`);
    await page.screenshot({
      path: `qa/expansion-heatmap-${mode}.png`,
      fullPage: true,
    });
  }
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} finally {
  fs.writeFileSync(
    "qa/expansion-report.json",
    JSON.stringify(
      { base, checkedAt: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await browser.close();
}
