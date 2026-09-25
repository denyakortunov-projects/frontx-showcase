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
const geometry = () =>
  p
    .locator(
      "h1,.elements-card,.elements-card h2,.elements-card button,.elements-card input",
    )
    .evaluateAll((es) =>
      es.map((e) => {
        const s = getComputedStyle(e),
          r = e.getBoundingClientRect();
        return {
          font: s.fontFamily,
          size: s.fontSize,
          weight: s.fontWeight,
          spacing: s.letterSpacing,
          radius: s.borderRadius,
          x: r.x,
          y: r.y,
          w: r.width,
          h: r.height,
        };
      }),
    );
try {
  for (const width of [1600, 390]) {
    await p.setViewportSize({ width, height: 1000 });
    await p.goto(`${base}/?page=elements&theme=fabric&mode=light`);
    await p.locator(".elements-card").last().waitFor();
    const baseline = JSON.stringify(await geometry());
    for (const mode of ["light", "dark"]) {
      if (mode === "dark")
        await p
          .getByRole("button", { name: "Switch to dark theme", exact: true })
          .click();
      for (const theme of [
        "fabric",
        "editorial",
        "terminal",
        "iris",
        "lagoon",
      ]) {
        await p
          .getByRole("button", { name: `${theme} theme`, exact: true })
          .click();
        ok(
          `${width} ${theme} preserves ${mode}`,
          (await p.locator("html").getAttribute("data-theme")) === mode,
        );
        ok(
          `${width} ${theme} same type and geometry ${mode}`,
          JSON.stringify(await geometry()) === baseline,
        );
        if (theme === "terminal")
          await p.screenshot({
            path: `qa/green-${mode}-${width}.png`,
            fullPage: true,
          });
      }
    }
    await p
      .getByRole("button", { name: "terminal theme", exact: true })
      .click();
    await p
      .getByRole("button", { name: "Switch to light theme", exact: true })
      .click();
    ok(
      `${width} light toggle preserves green`,
      (await p.locator("html").getAttribute("data-brand")) === "terminal",
    );
    await p.goBack();
    ok(
      `${width} Back restores dark green`,
      (await p.locator("html").getAttribute("data-theme")) === "dark" &&
        (await p.locator("html").getAttribute("data-brand")) === "terminal",
    );
  }
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} finally {
  fs.writeFileSync(
    "qa/palette-modes-report.json",
    JSON.stringify(
      { base, checkedAt: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await b.close();
}
