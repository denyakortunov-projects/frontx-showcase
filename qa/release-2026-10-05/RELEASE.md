# FrontX calendar release · 2026-10-05

Status: preparing the user-authorized release to https://frontx.constructor.rocks only.
Authorization: “Ну всё тогда, всё публикуй, делай деплой.”

Scope: EventCalendar, DatePicker with single/range/mobile variants, shared section and segmented controls, component download and integration documentation. All are prototype compositions of the installed FrontX UI Kit, not new published kit exports.

Selected baseline: 67605262247b8ca418139f4aaccdd9fff1101d12 (also origin/main before release). Accepted local changes are documented in qa/event-calendar, qa/calendar-refresh, qa/calendar-polish and qa/component-handoff. Existing unrelated root-workspace changes are excluded.

Runtime fingerprint: 440c8188b0b21c6b332107fb98da20e8f4672027f8ce5059778ef230123fe0ab.
Release source fingerprint: ac222b0201b4dec2b8af13be8cf5e1dbe580a59c1041b6042b14930ca4266b84.

Local verification reused for the unchanged runtime: TypeScript/Vite build; 43 component-handoff browser checks; 20 shared segmented-control checks; 32 extracted-component archive checks including isolated compilation. Release preflight reran the 86 source archive/hash/parity checks and git diff whitespace check. Historical calendar checks remain recorded against their own source versions, not claimed as rerun.

Transport: official @hostinger/mcp 2.4.0 hosting_deploy-js-application with the allowlisted source archive. Existing origin powderblue-skunk-609923.hostingersite.com, custom alias frontx.constructor.rocks. No DNS, account, or other site changes. Prior release deployment 01a0dc04-2708-734d-abcc-be917930a0d8 remains the rollback reference. No dependency or application edits are introduced for this deployment.

Public verification and exact release commit will be recorded after deployment.
