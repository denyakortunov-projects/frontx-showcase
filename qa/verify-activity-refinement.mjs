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
const ok = (name, value) => {
  checks.push({ name, passed: !!value });
  if (!value) throw Error(name);
};
try {
  for (const mode of ["light", "dark"]) {
    for (const [width, days] of [
      [3, 30],
      [6, 90],
      [12, 365],
    ]) {
      await p.goto(
        `${base}/?page=widget&widget=heatmap&width=${width}&mode=${mode}`,
      );
      await p.getByText(new RegExp(`Last ${days} days ·`)).waitFor();
      ok(
        `${mode} ${width} shows ${days} days`,
        (await p.locator(".token-activity rect title").count()) === days,
      );
      await p.getByRole("tab", { name: "Cumulative", exact: true }).click();
      const value = Number(
        (await p.locator(".token-activity__selected").innerText())
          .match(/: ([\d,]+) tokens/)[1]
          .replaceAll(",", ""),
      );
      await p.getByRole("tab", { name: "Data", exact: true }).click();
      await p.locator(".data-scroll tbody tr").first().waitFor();
      const sum = await p
        .locator(".data-scroll tbody tr")
        .evaluateAll(
          (rows, n) =>
            rows
              .slice(-n)
              .reduce(
                (v, r) =>
                  v + Number(r.cells[1].textContent.replaceAll(",", "")),
                0,
              ),
          days,
        );
      ok(`${mode} ${days} cumulative matches visible data`, value === sum);
      await p.getByRole("tab", { name: "Preview", exact: true }).click();
      await p.mouse.move(0, 0);
      await p
        .locator(".widget-frame")
        .screenshot({ path: `qa/activity-refined-${mode}-${days}.png` });
    }
    await p.goto(`${base}/?page=widget&widget=treemap&width=6&mode=${mode}`);
    await p.locator(".widget-frame svg").waitFor();
    ok(
      `${mode} mosaic has 9 leaf tiles only`,
      (await p.locator('.adoption-tile > rect').count()) ===
        9,
    );
    ok(
      `${mode} no total drawn beneath tiles`,
      await p
        .locator(".widget-frame svg text")
        .allTextContents()
        .then((t) => !t.includes("3600")),
    );
    await p.mouse.move(0, 0);
    await p
      .locator(".widget-frame")
      .screenshot({ path: `qa/treemap-refined-${mode}.png` });
  }
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} finally {
  fs.writeFileSync(
    "qa/activity-refinement-report.json",
    JSON.stringify(
      { base, checkedAt: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await b.close();
}
