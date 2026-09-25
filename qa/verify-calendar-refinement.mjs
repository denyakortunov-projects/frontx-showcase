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
async function fit(name) {
  await p.locator(".utility-calendar [data-day]").last().waitFor();
  await p.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  ok(
    name,
    await p.locator(".utility-calendar-widget").evaluate((e) => {
      const frame = e.closest(".widget-body").getBoundingClientRect(),
        calendar = e.querySelector(".utility-calendar").getBoundingClientRect();
      return (
        e.scrollHeight <= e.clientHeight + 1 &&
        calendar.bottom <= frame.bottom + 1 &&
        calendar.right <= frame.right + 1 &&
        calendar.top >= frame.top - 1
      );
    }),
  );
  ok(
    name + " six complete weeks",
    (await p.locator(".utility-calendar [data-day]").count()) === 42,
  );
}
try {
  for (const mode of ["light", "dark"]) {
    for (const width of [3, 6, 12]) {
      await p.goto(
        `${base}/?page=widget&widget=calendar&height=304&width=${width}&mode=${mode}`,
      );
      await fit(`calendar fits M ${width} ${mode}`);
      await p.getByRole("button", { name: "Go to the next month" }).click();
      await fit(`October fits M ${width} ${mode}`);
    }
  }
  await p.goto(`${base}/?page=widget&widget=calendar&height=304&width=6`);
  await p.locator('[data-day="2026-09-03"] button').click();
  await p.getByRole("dialog").waitFor();
  ok(
    "release details",
    await p
      .getByRole("dialog")
      .innerText()
      .then((t) => t.includes("Navigation refresh")),
  );
  await p.keyboard.press("Escape");
  await p.getByRole("dialog").waitFor({ state: "hidden" });
  ok(
    "focus returns to chosen day",
    await p
      .locator('[data-day="2026-09-03"] button')
      .evaluate((e) => e === document.activeElement),
  );
  await p.keyboard.press("ArrowRight");
  await p.keyboard.press("Enter");
  await p.getByRole("dialog").waitFor();
  ok(
    "keyboard date details",
    await p
      .getByRole("dialog")
      .innerText()
      .then(
        (t) => t.includes("September 4") && t.includes("No scheduled releases"),
      ),
  );
  await p.keyboard.press("Escape");
  await p.goto(`${base}/?page=widget&widget=stacked&height=304&width=6`);
  ok(
    "new chart label",
    (await p.locator("h1").innerText()) === "Audience by channel",
  );
  ok(
    "horizontal chart segments",
    (await p.locator(".recharts-bar-rectangle").count()) === 10,
  );
  await p.getByRole("tab", { name: "Data", exact: true }).click();
  await p.locator(".data-scroll tbody tr").first().waitFor();
  ok(
    "five channels total 100 percent",
    await p
      .locator(".data-scroll tbody tr")
      .evaluateAll(
        (rs) =>
          rs.length === 5 &&
          rs.every(
            (r) =>
              Number(r.cells[1].textContent) +
                Number(r.cells[2].textContent) ===
              100,
          ),
      ),
  );
  for (const width of [1600, 390, 320]) {
    await p.setViewportSize({ width, height: 1000 });
    await p.goto(`${base}/?page=gallery`);
    await fit(`gallery calendar ${width}`);
    ok(
      "gallery count " + width,
      (await p.locator(".gallery-item").count()) === 18,
    );
    ok(
      "page fits " + width,
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    await p.mouse.move(0, 0);
    await p
      .locator(".gallery-item")
      .filter({ hasText: "Release calendar" })
      .screenshot({ path: `qa/calendar-refined-${width}.png` });
    await p
      .locator(".gallery-item")
      .filter({ hasText: "Audience by channel" })
      .screenshot({ path: `qa/channel-refined-${width}.png` });
  }
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} finally {
  fs.writeFileSync(
    "qa/calendar-refinement-report.json",
    JSON.stringify(
      { base, checkedAt: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await b.close();
}
