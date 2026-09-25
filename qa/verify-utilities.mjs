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
function ok(name, passed) {
  checks.push({ name, passed: !!passed });
  if (!passed) throw Error(name);
}
async function route(q) {
  await page.goto(`${base}/?${q}`);
  await page.locator("h1").waitFor();
}
try {
  await route("page=widget&widget=heatmap&width=12");
  const readout = page.locator(".token-activity__selected");
  const value = async () =>
    Number(
      (await readout.innerText())
        .match(/: ([\d,]+) tokens/)[1]
        .replaceAll(",", ""),
    );
  const daily = await value();
  await page.getByRole("tab", { name: "Weekly", exact: true }).click();
  ok("weekly sums token counts", (await value()) >= daily);
  await page.getByRole("tab", { name: "Cumulative", exact: true }).click();
  const cumulative = await value();
  await page.getByRole("tab", { name: "Data", exact: true }).click();
  await page.locator(".data-scroll tbody tr").first().waitFor();
  const sum = await page
    .locator("tbody tr")
    .evaluateAll((rows) =>
      rows.reduce(
        (n, r) => n + Number(r.cells[1].textContent.replaceAll(",", "")),
        0,
      ),
    );
  ok("cumulative equals 365 daily rows", cumulative === sum);
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  await page.getByRole("application").focus();
  await page.keyboard.press("Home");
  ok(
    "keyboard Home selects first day",
    (await readout.innerText()).includes("Sep 26"),
  );
  await page.keyboard.press("End");
  ok(
    "keyboard End selects last day",
    (await readout.innerText()).includes("Sep 25"),
  );
  await page.keyboard.press("ArrowLeft");
  ok(
    "arrow keys select earlier week",
    (await readout.innerText()).includes("Sep 18"),
  );
  await page.locator(".recharts-scatter-symbol").nth(10).click();
  ok("mouse selects cell", !(await readout.innerText()).includes("Sep 18"));
  await page.locator(".recharts-scatter-symbol").nth(10).hover();
  await page.locator(".token-activity__tooltip").waitFor();
  ok(
    "tooltip shows token total once",
    (await page.locator(".token-activity__tooltip").innerText()).match(
      /tokens/g,
    )?.length === 1,
  );
  for (const mode of ["light", "dark"]) {
    await route(`page=widget&widget=heatmap&width=12&height=304&mode=${mode}`);
    await page.mouse.move(0, 0);
    await page.screenshot({
      path: `qa/final-heatmap-${mode}.png`,
      fullPage: true,
    });
  }
  await route("page=widget&widget=calendar&width=6");
  await page.locator('[data-day="2026-09-03"] button').click();
  ok(
    "calendar date selection",
    await page.getByText("Navigation refresh", { exact: true }).isVisible(),
  );
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "Go to the next month" }).click();
  ok(
    "calendar month navigation",
    await page.getByText("October 2026", { exact: true }).isVisible(),
  );
  await page.getByRole("button", { name: "Go to the previous month" }).click();
  await page.locator('[data-day="2026-09-03"] button').focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  ok(
    "calendar keyboard selection",
    (await page.getByRole("dialog").innerText()).includes("September 4"),
  );
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.getByRole("tab", { name: "Data", exact: true }).click();
  await page.locator(".data-scroll tbody tr").first().waitFor();
  ok(
    "calendar five release rows",
    (await page.locator(".data-scroll tbody tr").count()) === 5,
  );
  await route("page=widget&widget=builds&width=6");
  await page.getByRole("button", { name: "Duration", exact: false }).click();
  ok(
    "build sort",
    await page
      .locator("tbody tr")
      .first()
      .innerText()
      .then((t) => t.includes("#4810")),
  );
  await page.getByRole("button", { name: "#4811", exact: true }).click();
  await page.getByRole("dialog").waitFor();
  ok(
    "unique build details",
    await page
      .getByRole("dialog")
      .innerText()
      .then((t) => t.includes("feature/search") && t.includes("714bc0e")),
  );
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  ok(
    "build dialog focus restored",
    await page
      .getByRole("button", { name: "#4811", exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  for (const width of [1600, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await route("page=gallery");
    await page.mouse.move(0, 0);
    await page.screenshot({
      path: `qa/final-gallery-${width}.png`,
      fullPage: true,
    });
    ok(
      `gallery all 18 at ${width}`,
      (await page.locator(".gallery-item").count()) === 18,
    );
  }
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} finally {
  fs.writeFileSync(
    "qa/utilities-report.json",
    JSON.stringify(
      { base, checkedAt: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await browser.close();
}
