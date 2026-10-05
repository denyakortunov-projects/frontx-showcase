import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.DEMO_URL || "http://127.0.0.1:5201";
const out = "qa/event-calendar";
const checks = [];
const errors = [];
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({
  viewport: { width: 1600, height: 1000 },
  reducedMotion: "reduce",
});
p.setDefaultTimeout(7000);
p.on("pageerror", (e) => errors.push(e.message));
p.on("response",r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
const ok = (name, value) => {
  checks.push({ name, passed: !!value });
  if (!value) throw Error(name);
};
const goto = async (query = "") => {
  await p.goto(`${base}/?page=event-calendar${query}`);
  await p.locator(".event-calendar").first().waitFor();
  await p.evaluate(() => document.fonts.ready);
};
const close = async () => {
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Close", exact: true })
    .click();
};
const select = async (id) => {
  await p.locator(`[data-event-id="${id}"]`).first().click();
  await p.getByRole("dialog").waitFor();
};
const shot = async (name) => {
  await p.screenshot({ path: `${out}/${name}.png` });
};
const overflow = async () =>
  p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
try {
  await goto();
  ok(
    "week default",
    (await p
      .getByRole("tab", { name: "Week", exact: true })
      .getAttribute("aria-selected")) === "true",
  );
  ok(
    "shared grid all-day fixture",
    (await p.getByText("Workshop", { exact: true }).count()) > 0,
  );
  await shot("week");
  await p.getByRole("button", { name: "New event", exact: true }).click();
  await p.getByRole("button", { name: "Create event", exact: true }).click();
  ok(
    "blank title validation",
    await p.getByText("Title is required", { exact: true }).isVisible(),
  );
  await p.getByLabel("Title", { exact: true }).fill("Regression event");
  await p
    .getByLabel("Description", { exact: true })
    .fill("Synthetic description");
  await p.getByRole("button", { name: "Create event", exact: true }).click();
  await p
    .getByRole("heading", { name: "Regression event", exact: true })
    .waitFor();
  ok("created event has URL", !!new URL(p.url()).searchParams.get("calEvent"));
  const created = new URL(p.url()).searchParams.get("calEvent");
  await p.getByRole("button", { name: "Edit event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Changed but not saved");
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("button", { name: "Keep editing", exact: true }).click();
  ok(
    "keep draft",
    (await p.getByLabel("Title", { exact: true }).inputValue()) ===
      "Changed but not saved",
  );
  await p.keyboard.press("Escape");
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  await p
    .getByRole("heading", { name: "Regression event", exact: true })
    .waitFor();
  ok("discard preserves saved title", true);
  await p.getByRole("button", { name: "Edit event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Edited event");
  await p.getByRole("button", { name: "Save changes", exact: true }).click();
  await p.getByRole("heading", { name: "Edited event", exact: true }).waitFor();
  ok("save edit", true);
  await close();
  await p.getByRole("tab", { name: "Day", exact: true }).click();
  await p.getByRole("tab", { name: "Agenda", exact: true }).click();
  ok(
    "agenda range inherited day",
    new URL(p.url()).searchParams.get("calSpan") === "day",
  );
  await select(created);
  ok(
    "same event across views",
    await p
      .getByRole("heading", { name: "Edited event", exact: true })
      .isVisible(),
  );
  await close();
  await p
    .getByRole("button", { name: "Charts & widgets", exact: true })
    .click();
  await p.getByRole("button", { name: "Calendar", exact: true }).click();
  await select(created);
  ok(
    "edits survive route changes",
    await p
      .getByRole("heading", { name: "Edited event", exact: true })
      .isVisible(),
  );
  await p.getByRole("button", { name: "Delete event", exact: true }).click();
  await p.getByRole("button", { name: "Keep event", exact: true }).click();
  ok(
    "delete cancel retains event",
    await p
      .getByRole("heading", { name: "Edited event", exact: true })
      .isVisible(),
  );
  await p.getByRole("button", { name: "Delete event", exact: true }).click();
  await p.getByRole("button", { name: "Delete", exact: true }).click();
  await p.getByRole("dialog").waitFor({ state: "hidden" });
  ok("delete clears URL", !new URL(p.url()).searchParams.get("calEvent"));
  ok(
    "delete removes row",
    (await p.locator(`[data-event-id="${created}"]`).count()) === 0,
  );
  // Dirty Back must restore the URL and then replay only after discard.
  await goto();
  await p.getByRole("tab", { name: "Day", exact: true }).click();
  const dayUrl = p.url();
  await select("planning");
  const detailUrl = p.url();
  await p.getByRole("button", { name: "Edit event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Unsaved Back");
  await p.evaluate(() => history.back());
  await p.getByRole("button", { name: "Keep editing", exact: true }).waitFor();
  ok("Back restores guarded entry", p.url() === detailUrl);
  await p.getByRole("button", { name: "Keep editing", exact: true }).click();
  ok(
    "Back keep retains draft",
    (await p.getByLabel("Title", { exact: true }).inputValue()) ===
      "Unsaved Back",
  );
  await p.evaluate(() => history.back());
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  await p.waitForURL(dayUrl);
  ok("Back discard replays target", true);
  await p.evaluate(() => history.forward());
  await p
    .getByRole("heading", { name: "Weekly planning", exact: true })
    .waitFor();
  ok("Forward restores selection", true);
  await close();
  // Keyboard grid all-day and timed creation.
  await p.getByRole("group", { name: "Time grid", exact: true }).focus();
  await p.keyboard.press("Home");
  await p.keyboard.press("Enter");
  ok(
    "all-day keyboard prefilled",
    await p.getByRole("checkbox", { name: "All day", exact: true }).isChecked(),
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("group", { name: "Time grid", exact: true }).focus();
  await p.keyboard.press("ArrowDown");
  await p.keyboard.press("Enter");
  ok(
    "keyboard timed slot",
    (await p.getByLabel("Start time", { exact: true }).inputValue()) ===
      "09:30",
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  // Pointer slot and all-day lane.
  const col = await p
    .locator('.fc-timegrid-col[data-date="2026-10-05"]')
    .boundingBox();
  const row = await p
    .locator('.fc-timegrid-slot[data-time="12:00:00"]')
    .last()
    .boundingBox();
  await p.mouse.click(col.x + col.width / 2, row.y + 8);
  ok(
    "pointer time slot",
    (await p.getByLabel("Start time", { exact: true }).inputValue()) ===
      "12:00",
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.locator('.fc-daygrid-day[data-date="2026-10-05"]').click();
  ok(
    "pointer all-day lane",
    await p.getByRole("checkbox", { name: "All day", exact: true }).isChecked(),
  );
  await p.getByLabel("Title", { exact: true }).fill("All-day test");
  await p.getByRole("button", { name: "Create event", exact: true }).click();
  ok(
    "all-day save",
    await p
      .getByRole("heading", { name: "All-day test", exact: true })
      .isVisible(),
  );
  await close();
  // Timed/all-day preservation and validation.
  await select("planning");
  await p.getByRole("button", { name: "Edit event", exact: true }).click();
  await p.getByRole("checkbox", { name: "All day", exact: true }).check();
  await p.getByRole("checkbox", { name: "All day", exact: true }).uncheck();
  ok(
    "timed values retained through toggle",
    (await p.getByLabel("Start time", { exact: true }).inputValue()) ===
      "09:00",
  );
  await p.getByLabel("End time", { exact: true }).fill("08:00");
  await p.getByRole("button", { name: "Save changes", exact: true }).click();
  ok(
    "negative duration rejected",
    await p.getByText("End must be after start", { exact: true }).isVisible(),
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  await close();
  // Real DST fields, not just model tests.
  await goto("&calDate=2026-11-01&calView=day&calZone=America%2FNew_York");
  await p.getByRole("button", { name: "New event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Fold");
  await p.getByLabel("Start time", { exact: true }).fill("01:30");
  await p.getByLabel("End time", { exact: true }).fill("02:30");
  await p.getByLabel("Start occurrence", { exact: true }).selectOption("later");
  ok(
    "fold choice remains visible",
    await p.getByLabel("Start occurrence", { exact: true }).isVisible(),
  );
  await p.getByRole("button", { name: "Create event", exact: true }).click();
  await p.getByRole("heading", { name: "Fold", exact: true }).waitFor();
  ok("fold resolved save", true);
  await close();
  await goto("&calDate=2026-03-08&calView=day&calZone=America%2FNew_York");
  await p.getByRole("button", { name: "New event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Gap");
  await p.getByLabel("Start time", { exact: true }).fill("02:30");
  await p.getByLabel("End time", { exact: true }).fill("03:30");
  await p.getByRole("button", { name: "Create event", exact: true }).click();
  ok(
    "gap rejected in form",
    await p.getByText("Time falls in DST gap", { exact: true }).isVisible(),
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  await goto("&calState=save-error");
  await p.getByRole("button", { name: "New event", exact: true }).click();
  await p.getByLabel("Title", { exact: true }).fill("Retry draft");
  await p.getByRole("button", { name: "Create event", exact: true }).click();
  ok(
    "save failure retains draft",
    (await p.getByLabel("Title", { exact: true }).inputValue()) ===
      "Retry draft",
  );
  ok(
    "save error feedback",
    await p
      .getByRole("alert")
      .filter({ hasText: "Simulated save failure" })
      .isVisible(),
  );
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  await p.getByRole("button", { name: "Discard changes", exact: true }).click();
  for (const state of ["empty", "loading", "error", "read-only"]) {
    await goto(`&calState=${state}`);
    ok(
      `state ${state}`,
      await p
        .locator(".event-calendar")
        .getByText(
          state === "empty"
            ? "No events in this period."
            : state === "loading"
              ? "Loading events…"
              : state === "error"
                ? "Events could not be loaded."
                : "Read only",
          { exact: true },
        )
        .isVisible(),
    );
    if (state === "read-only")
      ok(
        "readonly no create",
        (await p
          .getByRole("button", { name: "New event", exact: true })
          .count()) === 0,
      );
    if (state === "error") {
      await p.getByRole("button", { name: "Try again", exact: true }).click();
      ok(
        "retry recovers",
        await p.getByText("Weekly planning", { exact: true }).isVisible(),
      );
    }
  }
  await goto("&calState=overlaps");
  const more = p.locator(".fc-timegrid-more-link");
  await more.first().click();
  ok(
    "overflow opens all five",
    (await p.getByRole("dialog").locator("[data-event-id]").count()) === 5,
  );
  await p.keyboard.press("Escape");
  for (const width of [1120, 640, 360, 280]) {
    await goto(
      `&calWidth=${width}&calHeight=${width < 600 ? 360 : 640}&calDensity=compact`,
    );
    ok(`container ${width} no page overflow`, await overflow());
    ok(
      `view for ${width}`,
      (await p.locator(".event-calendar").getAttribute("data-view")) ===
        (width < 620 ? "agenda" : "week"),
    );
    await shot(`width-${width}`);
  }
  await goto("&calWidth=280&calAdaptive=fixed");
  ok(
    "forced week remains week",
    (await p.locator(".event-calendar").getAttribute("data-view")) === "week",
  );
  ok(
    "forced week scroll is local",
    (await p
      .locator(".cal-body")
      .evaluate((e) => e.scrollWidth > e.clientWidth)) && (await overflow()),
  );
  await goto("&calTab=embedded");
  const instances = p.locator(".event-calendar");
  ok("two instances", (await instances.count()) === 2);
  await instances
    .nth(0)
    .getByRole("button", { name: "Next period", exact: true })
    .click();
  ok(
    "instances independent",
    await instances
      .nth(1)
      .getByText("Weekly planning", { exact: true })
      .isVisible(),
  );
  await shot("embedded");
  for (const theme of ["fabric", "editorial", "terminal", "iris", "lagoon"])
    for (const mode of ["light", "dark"]) {
      await goto(`&theme=${theme}&mode=${mode}`);
      ok(
        `${theme} ${mode} root`,
        (await p.locator("html").getAttribute("data-brand")) === theme,
      );
      await shot(`${theme}-${mode}`);
      await select("planning");
      await shot(`${theme}-${mode}-details`);
      await p.getByRole("button", { name: "Edit event", exact: true }).click();
      ok(
        `${theme} ${mode} editor`,
        (await p.getByLabel("Title", { exact: true }).inputValue()) ===
          "Weekly planning",
      );
      await shot(`${theme}-${mode}-editor`);
      await p.getByRole("button", { name: "Cancel", exact: true }).click();
      await close();
    }
  for (const [w, h] of [
    [1280, 800],
    [1920, 1200],
    [390, 844],
  ]) {
    await p.setViewportSize({ width: w, height: h });
    await goto();
    ok(`viewport ${w} no overflow`, await overflow());
    await shot(`viewport-${w}`);
  }
  await p.setViewportSize({ width: 1600, height: 1000 });
  await goto("&calDate=invalid&calEvent=missing");
  ok(
    "unknown event",
    await p
      .getByRole("heading", { name: "Event unavailable", exact: true })
      .isVisible(),
  );
  await p
    .getByRole("button", { name: "Return to calendar", exact: true })
    .click();
  ok(
    "invalid date fallback",
    (await p
      .getByRole("tab", { name: "Week", exact: true })
      .getAttribute("aria-selected")) === "true",
  );
  await goto("&calEvent=planning");
  await p.reload();
  await p
    .getByRole("heading", { name: "Weekly planning", exact: true })
    .waitFor();
  ok("selection reload", true);
  for (const [page, widget] of [
    ["gallery", ""],
    ["widget", "calendar"],
    ["layouts", ""],
    ["modularity", ""],
    ["elements", ""],
    ["themes", ""],
    ["handoff", ""],
  ]) {
    await p.goto(`${base}/?page=${page}&widget=${widget}`);
    await p.locator("main").waitFor();
    ok(
      `legacy ${page} renders`,
      (await p.locator("main").innerText()).length > 100,
    );
    if (widget === "calendar")
      ok(
        "legacy calendar is revenue",
        (await p.locator(".revenue-metric-summary strong").innerText()) ===
          "$74,000",
      );
    if (["gallery", "elements", "themes"].includes(page))
      await shot(`after-${page}`);
  }
  ok("no runtime errors", errors.length === 0);
  console.log(JSON.stringify({ passed: checks.length, errors }));
} catch (e) {
  await shot("failure");
  console.error(e);
  process.exitCode = 1;
} finally {
  fs.writeFileSync(
    `${out}/browser-report.json`,
    JSON.stringify(
      { base, at: new Date().toISOString(), checks, errors },
      null,
      2,
    ),
  );
  await b.close();
}
