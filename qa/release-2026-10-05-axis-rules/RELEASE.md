# FrontX numeric-axis release — 2026-10-05

Status: deployed and publicly verified at https://frontx.constructor.rocks.
Owner authorization: “Делай деплой, чтобы у разработчиков тоже это всё ушло. и в этот выкладывай на GitHub.”

Source commit: `194bb07159770df7c2434e11126eabf2c4ad17dd`, pushed fast-forward to existing GitHub origin/main before publication. Baseline: HEAD `2daa268` and public runtime `aadbe1220058c2f4eb5d212258488adecf690974`. No unrelated changes; clean selected checkout. Root Claude handoff index reviewed: FrontX calendar already integrated; no deployed/ready entries await integration for this app. Studio and its release pipeline are unchanged.

Scope: shared numeric axis helper, rounded 1/2/5 steps, adaptive density, bounded percentage/score presets, all numeric Cartesian widget consumers, mobile terminal-label inset, developer guidelines/link, refreshed downloadable archive and regression evidence. No dependency or platform configuration change.

Transport: existing official Hostinger source-archive API (`hosting_deploy-js-application`) to powderblue-skunk-609923.hostingersite.com / frontx.constructor.rocks. No GitHub workflows configured (API confirmed zero); retained established manual release path. Existing Node 20 / Vite / npm / dist settings retained. Deployment `01a10b6b-3705-7026-8bae-88d823eec0d6` completed **2026-10-05 09:36:19 UTC** (17:36:19 Singapore). Previous deployment `01a10b4b-9237-732b-9d57-9bcc650a6d42` remains rollback reference. No DNS/account/other website changes.

Source fingerprint: `5cec81bee32d2fa47a5a1c96d7b49545cbfd9d1ec86d41f65641ca2029cdd5d4`.
Full developer archive SHA-256: `551ccd3cfc41a98e213a57b7e8e3d8845f997dfb5c0e30ad8b4bdb100aceeda8`.

Preflight: all 105 allowlisted source hashes and ZIP entries matched verified local source. Reused unchanged production build and 171 built-preview assertions from qa/axis-rules/REPORT.md; seven calculation tests reconfirmed. Exact source-to-deployment-archive match rechecked immediately before publication; GitHub main confirmed at the selected commit. Active-deployment list showed no competing release.

Public verification: **23 HTTP + 171 browser assertions passed**, zero page errors. Exact fingerprint, live entry resources, byte-identical updated source archive and all handoff documents including CHART-AXES.md; existing calendar source bundle retained. Nine affected chart kinds at standard/compact sizes, dual-axis dark mode, mobile 390 px, nice/regular ticks, numeric label containment and no overlap, bounded percentages, keyboard/Back, unchanged Data values across density. Inspected final public mobile screenshot: 100% fully visible. See http-report.json, browser-report.json and screenshots here.

The subsequent release-record commit is evidence only and does not change the deployed source or fingerprint. Original local QA report describes its pre-release boundary historically; this record supersedes the publication status. Developers can now download updated compositions and rules or pull GitHub main. Existing consuming applications still need to adopt those sources; this release does not publish a new @gears-frontx/ui-kit package or modify Nikita's application directly.
