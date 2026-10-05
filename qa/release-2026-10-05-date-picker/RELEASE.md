# FrontX Date picker and regional formats release · 2026-10-05

Status: deployed and publicly verified at https://frontx.constructor.rocks.
Authorization: owner explicitly requested “делай деплой” after local implementation and verification.

Source commit: `f834ac9aa9f5fbd73f436bb4281c76ef8abd0ab8`, pushed fast-forward to existing origin/main before publication. Clean app working tree at selection; unrelated root workspace changes excluded. Subsequent release-evidence commit changes no runtime source.

Scope: refreshed shared DateCalendar and responsive single/range picker; direct month/year navigation; browser regional defaults and explicit Formats controls; event calendar regional captions, week boundary and 12/24-hour display; local/host timezone options; updated component archives and integration guidance. These remain reusable prototype compositions of installed FrontX primitives.

Release fingerprint: `f7b35f6d740118469ad1593a74c91b6b23d2bb5ea03dccb87e4e2c3ed6469af8`.
Full source archive SHA-256: `2a46181c313cd6dda3efc1f1e072268f8bb43172d07d86196d46717e4c2b5d68`.
Component archive SHA-256: `b4510d0d062f2da6ace8bd8edb360b5096cd1ddea37b9e4da044df37b0e4704a`.

Transport: existing Hostinger origin powderblue-skunk-609923.hostingersite.com and alias frontx.constructor.rocks, official @hostinger/mcp 2.4.0 hosting_deploy-js-application with allowlisted archive. Node 20 / Vite / npm / dist retained. No DNS, hosting settings, dependencies or other sites changed. Deployment `01a10b29-3303-7294-9ccc-45f08eacedfd` completed **2026-10-05 08:24:23 UTC**. Previous deployment `01a10ade-fcc8-7179-b0b3-f759236f14ba` / source `4d8f7532b14d37a92abdf4e6afe0443981f851cb` is the rollback reference.

Local build, model, isolated integration and visual evidence reused from unchanged source in ../date-picker-refresh/REPORT.md, including its recorded sequencing limits. Release preflight reran 122 archive/source checks. Claude handoff index reviewed: no unintegrated deployed or ready entries affecting FrontX. Native Claude audit was read-only; dispositions remain in the root workspace delegation record.

Public verification: **21 HTTP + 41 interaction + 23 regional-format checks passed**, zero browser errors. HTTP verified exact release fingerprint, entry assets and byte-identical archives/guides. Browser checks covered distant year selection, keyboard selection/focus, Back, incomplete/completed ranges, Clear/Done, 320/390px popup geometry, 5 themes × light/dark, event year navigation, mobile event creation/discard, browser locale defaults and six region choices, explicit 12/24-hour/week-start overrides, mobile formats and integration links. Reviewed public Russian desktop and mobile range screenshots. Test drafts stayed in isolated browser mock state.

Limits: public prototype and integration source; no production persistence or calendar-service integration claimed. Browser regional preferences do not expose all custom OS settings. This release does not establish stakeholder approval of platform API, product scope or timeline.
