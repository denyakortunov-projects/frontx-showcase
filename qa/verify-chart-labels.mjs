import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.DEMO_URL || "http://127.0.0.1:5201";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({
  viewport: { width: 1600, height: 1000 },
  reducedMotion: "reduce",
});
const checks = [],
  errors = [];
p.on("pageerror", (e) => errors.push(e.message));
const ok = (name, v) => {
  checks.push({ name, passed: !!v });
  if (!v) throw Error(name);
};
try {
  for (const mode of ["light", "dark"]) {
    for (const width of [3, 6, 12]) {
      await p.goto(
        `${base}/?page=widget&widget=funnel&width=${width}&height=304&mode=${mode}`,
      );
      await p.locator(".funnel-stages li").last().waitFor();
      ok(
        `funnel ${mode} ${width} five aligned stages`,
        (await p.locator(".funnel-stages li").count()) === 5,
      );
      ok(
        `funnel ${mode} ${width} no floating labels`,
        (await p.locator(".recharts-label-list").count()) === 0,
      );
      ok(
        `funnel ${mode} ${width} fits`,
        await p
          .locator(".funnel-layout")
          .evaluate(
            (e) =>
              e.scrollWidth <= e.clientWidth + 1 &&
              e.scrollHeight <= e.clientHeight + 1,
          ),
      );
      if (width === 6) {
        await p.mouse.move(0, 0);
        await p
          .locator(".widget-frame")
          .screenshot({ path: `qa/funnel-clean-${mode}.png` });
      }
      await p.goto(
        `${base}/?page=widget&widget=treemap&width=${width}&height=304&mode=${mode}`,
      );
      await p.locator(".adoption-tile").last().waitFor();
      ok(
        `treemap ${mode} ${width} nine unlayered tiles`,
        (await p.locator(".adoption-tile").count()) === 9 &&
          (await p.locator(".adoption-tile rect").count()) === 9,
      );
      ok(
        `treemap ${mode} ${width} text contained`,
        await p.locator(".adoption-tile").evaluateAll((es) =>
          es.every((e) => {
            const r = e.querySelector("rect").getBoundingClientRect();
            return [...e.querySelectorAll("text")].every((t) => {
              const box = t.getBoundingClientRect();
              return box.right <= r.right + 1 && box.bottom <= r.bottom + 1;
            });
          }),
        ),
      );
      if (width === 6) {
        await p.mouse.move(0, 0);
        await p
          .locator(".widget-frame")
          .screenshot({ path: `qa/treemap-clean-${mode}.png` });
      }
    }
  }
  await p.goto(`${base}/?page=widget&widget=funnel&width=6`);
  const displayed = await p.locator(".funnel-stages strong").allTextContents();
  await p.getByRole("tab", { name: "Data", exact: true }).click();
  await p.locator(".data-scroll tbody tr").first().waitFor();
  const data = await p
    .locator(".data-scroll tbody tr")
    .evaluateAll((rs) => rs.map((r) => r.cells[1].textContent));
  ok(
    "funnel counts match Data",
    JSON.stringify(displayed) === JSON.stringify(data),
  );
  await p.setViewportSize({ width: 390, height: 1000 });
  for (const kind of ["funnel", "treemap"]) {
    await p.goto(`${base}/?page=widget&widget=${kind}&width=3&height=304`);
    await p.locator(".widget-frame").waitFor();
    ok(
      `${kind} mobile fits`,
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    await p
      .locator(".widget-frame")
      .screenshot({ path: `qa/${kind}-clean-mobile.png` });
  }
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} finally {
  fs.writeFileSync(
    "qa/chart-labels-report.json",
    JSON.stringify(
      { base, checkedAt: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await b.close();
}
