# FrontX calendar release · 2026-10-05

Status: deployed and publicly verified at https://frontx.constructor.rocks.
Authorization: “Ну всё тогда, всё публикуй, делай деплой.”

Scope: EventCalendar, DatePicker with single/range/mobile variants, shared section and segmented controls, component download and integration documentation. All are prototype compositions of the installed FrontX UI Kit, not new published kit exports.

Selected baseline: 67605262247b8ca418139f4aaccdd9fff1101d12 (also origin/main before release). Accepted local changes are documented in qa/event-calendar, qa/calendar-refresh, qa/calendar-polish and qa/component-handoff. Existing unrelated root-workspace changes are excluded.

Runtime fingerprint: 440c8188b0b21c6b332107fb98da20e8f4672027f8ce5059778ef230123fe0ab.
Release source fingerprint: ac222b0201b4dec2b8af13be8cf5e1dbe580a59c1041b6042b14930ca4266b84.

Local verification reused for the unchanged runtime: TypeScript/Vite build; 43 component-handoff browser checks; 20 shared segmented-control checks; 32 extracted-component archive checks including isolated compilation. Release preflight reran the 86 source archive/hash/parity checks and git diff whitespace check. Historical calendar checks remain recorded against their own source versions, not claimed as rerun.

Transport: official @hostinger/mcp 2.4.0 hosting_deploy-js-application with the allowlisted source archive. Existing origin powderblue-skunk-609923.hostingersite.com, custom alias frontx.constructor.rocks. No DNS, account, or other site changes. Prior release deployment 01a0dc04-2708-734d-abcc-be917930a0d8 remains the rollback reference. No dependency or application edits are introduced for this deployment.

Release source commit: `4d8f7532b14d37a92abdf4e6afe0443981f851cb`, pushed to existing origin/main before deployment. Subsequent release-record commits change only QA documentation and evidence, not deployed application sources.

Hostinger deployment: `01a10ade-fcc8-7179-b0b3-f759236f14ba`, completed 2026-10-05 07:03:09 UTC. Source archive SHA-256: `63512514850226252a3a29d1ca7c8392d98286b0ec6a620156fad39aa4bb92a3`.

Public verification: 21 HTTP checks passed (exact release fingerprint, entry assets, byte-for-byte matching source/component archives and integration guides); 39 Chrome browser checks passed with zero page errors. Covered single-date keyboard/Back/clear, inline selection, date range, responsive popup at 320/390px, 5 themes × light/dark, shared tab keyboard interaction, download links, chart Data/React, activity/Elements, mobile calendar tabs, and mock event creation. Reviewed public desktop calendar and mobile picker screenshots. Test-created events existed only in the isolated browser's local mock state.

Verification harness corrections: changed Fetch Response.ok from method to property; narrowed tab count to role=tablist because the final shared styling also includes segmented button groups. Both checks were rerun successfully; no application code was changed.

Limits: this publishes a prototype and integration source, not production persistence, real booking/calendar services, or stakeholder approval of the platform API/scope.
