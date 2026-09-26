import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.DEMO_URL || "http://127.0.0.1:5201";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  reducedMotion: "reduce",
});
const checks = [];
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
function ok(name, passed) {
  checks.push({ name, passed: !!passed });
  if (!passed) throw Error(name);
}
async function dimensions() {
  return page.locator(".gallery-item .widget-frame").evaluateAll((cards) =>
    cards.map((c) => ({
      height: Math.round(c.getBoundingClientRect().height),
      bodyHeight: Math.round(
        c.querySelector(".widget-body").getBoundingClientRect().height,
      ),
      overflow: c.scrollHeight > c.clientHeight + 1,
      empty: c.querySelector(".widget-body").childElementCount === 0,
    })),
  );
}
try {
  await page.goto(`${base}/?page=gallery`);
  await page.locator(".gallery-item").last().waitFor();
  const standard = await dimensions();
  ok(
    "18 standard widgets",
    standard.length === 18 &&
      standard.every((c) => c.height === 340 && !c.empty),
  );
  await page.getByRole("button", { name: "Compact", exact: true }).click();
  ok(
    "compact choice in URL",
    new URL(page.url()).searchParams.get("density") === "compact",
  );
  const compact = await dimensions();
  ok(
    "18 compact widgets fit",
    compact.length === 18 &&
      compact.every((c) => c.height === 221 && c.bodyHeight > 0 && !c.overflow),
  );
  ok(
    "gallery height decreases 35 percent",
    compact.every((c, i) => c.height <= standard[i].height * 0.7),
  );
  await page.screenshot({
    path: "qa/density-gallery-compact.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Standard", exact: true }).click();
  ok(
    "standard restores height",
    (await dimensions()).every((c) => c.height === 340),
  );
  await page.goBack();
  ok(
    "Back restores compact choice",
    (await page
      .getByRole("button", { name: "Compact", exact: true })
      .getAttribute("aria-pressed")) === "true",
  );
  for (const mode of ["light", "dark"]) {
    await page.goto(
      `${base}/?page=widget&widget=funnel&width=3&height=304&density=compact&mode=${mode}`,
    );
    await page.locator(".funnel-stages li").last().waitFor();
    ok(
      `funnel compact ${mode} height`,
      Math.round((await page.locator(".widget-frame").boundingBox()).height) ===
        198,
    );
    ok(
      `funnel compact ${mode} stages`,
      (await page.locator(".funnel-stages li").count()) === 5,
    );
    ok(
      `funnel compact ${mode} contained`,
      await page
        .locator(".funnel-layout")
        .evaluate((e) => e.scrollHeight <= e.clientHeight + 1),
    );
    await page
      .locator(".widget-frame")
      .screenshot({ path: `qa/density-funnel-${mode}.png` });
  }
  await page.goto(
    `${base}/?page=widget&widget=heatmap&width=3&height=304&density=compact`,
  );
  await page.getByRole("tab", { name: "Weekly", exact: true }).click();
  ok(
    "compact activity modes work",
    (await page
      .getByRole("tab", { name: "Weekly", exact: true })
      .getAttribute("aria-selected")) === "true",
  );
  await page
    .locator(".widget-frame")
    .screenshot({ path: "qa/density-activity.png" });
  await page.goto(
    `${base}/?page=widget&widget=calendar&width=3&height=304&density=compact`,
  );
  ok(
    "compact revenue metric value",
    (await page.locator(".revenue-metric-summary strong").innerText()) ===
      "$74,000",
  );
  ok(
    "compact metric contained",
    await page
      .locator(".revenue-metric")
      .evaluate((e) => e.scrollHeight <= e.clientHeight + 1),
  );
  await page
    .locator(".widget-frame")
    .screenshot({ path: "qa/density-revenue.png" });
  await page.goto(`${base}/?page=layouts&density=compact`);
  await page.locator(".widget-frame").first().waitFor();
  ok(
    "compositions use compact widgets",
    Math.round(
      (await page.locator(".widget-frame").first().boundingBox()).height,
    ) === 302,
  );
  await page.getByRole("button", { name: "Standard", exact: true }).click();
  ok(
    "compositions restore standard widgets",
    Math.round(
      (await page.locator(".widget-frame").first().boundingBox()).height,
    ) === 464,
  );
  await page.goto(`${base}/?page=modularity&density=compact`);
  await page.locator(".module-cell .widget-frame").first().waitFor();
  ok(
    "modularity uses compact grid rows",
    (await page
      .locator(".module-canvas")
      .evaluate((e) => getComputedStyle(e).gridAutoRows)) === "94px",
  );
  ok(
    "modularity uses compact widgets",
    Math.round(
      (await page.locator(".module-cell .widget-frame").first().boundingBox())
        .height,
    ) === 302,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/?page=gallery&density=compact`);
  await page.locator(".gallery-item").last().waitFor();
  ok(
    "mobile compact height",
    (await dimensions()).every((c) => c.height === 221),
  );
  ok(
    "mobile page no horizontal overflow",
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  );
  await page.screenshot({ path: "qa/density-mobile.png", fullPage: true });
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} finally {
  fs.writeFileSync(
    "qa/density-report.json",
    JSON.stringify(
      { base, checkedAt: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await browser.close();
}
