# Template explorer - local slice, 6 October 2026

Fresh record adapted from workspace PIXEL_PERFECT_ACCEPTANCE_CONTRACT.md. Baseline: previous local Astro + quickstart slice, requested continuation; hashes BASELINE.json. Preserve prior changes; no new app, repository, UI library or deployment.

Plan: inspect pinned template source and licenses; add source browser to the three template pages with honest scope, direct permalinks and file selection in URL; integrate a real bounded example if upstream build can be isolated without changing its meaning. Keep runtime and selected files traceable to the same revision. Do not label a simulated architecture view as a running Shell.

Components: SiteLayout, ActionLink, installed FrontX Button, SectionTabs/Base UI Tabs, CodeBlock. Verify desktop 1440, tablet 768, mobile 390/320, keyboard, Back/reload, file selection, malformed URL fallback, source links, and actual example loading/failure/reset. Template source is read-only; no editor/execute affordance. No motion added without reduced-motion behavior. Studio is unchanged; its catalogue and browser checks are out of scope. New compositions documented with actual consumer routes.

Build/type-check, source provenance and browser checks completed below. Owner visual acceptance separate from technical verification. No publication.

## Verified result

Technical status: verified locally; design acceptance: awaiting owner review. No Figma selected. No deployment.

| Surface | Verified states / evidence |
| --- | --- |
| Three template pages | 15 selected original files. Shell main.tsx, MFE HelloWorldScreen.tsx and Guardrails DESIGN.md show distinct content and immutable GitHub links. Guardrails has no Example tab. Source hashes and repo archive hash in FINAL-SOURCE.json. |
| File explorer | Search/no matches/Clear, Enter on Copy, distinct file selection, Back, reload, unknown view/file notice and safe URL replacement. Tab arrows move focus, Enter activates. File/filter/example choices URL-addressable. Code remains selectable and locally scrollable. Clipboard success feedback observed; OS clipboard bytes not independently measured. |
| Example | Genuine static Shell with remote MFE modules, click-to-load. Hello World and Blank Home render and report ready. Reload/alternate initial screen work; refresh retains choice but requires explicit load again. Final sample console has zero new errors. |
| Failure | CDP blocked only this tab's example assets; timeout appeared with Reload/open alternatives. Block list removed, reload recovered. No browser configuration override retained. |
| Responsive | 320, 390, 768, 1440 document widths do not exceed viewport (scrollbar accounts for 15px difference). File list has bounded scrolling on narrow screens. Example starts with collapsed navigation on narrow frames and bundled Lucide glyphs. Reviewed files-mobile.png, files-desktop.png, example-mobile.png and example-desktop.png. |
| Source/build | Source snapshot uses original Apache files at 3b6cddb2a700ae76bc5e1991204e127de566d597. Preparer checked 596 source files; website adapter explicitly recorded, original consumer files restored. 15 hashes, licensing files and 253 asset references pass check:templates. Full TypeScript + Vite Showcase + Astro build passes site-build.log. 84 SSR local links/anchors checked; no missing targets. Eleven HTTP responses including artifacts/notices return 200 (HTTP.json). |

Components: installed FrontX Button/Input/Tabs; shared SectionTabs; CodeBlock kind=source; SiteLayout and tokens. TemplateExplorer is a documentation composition, not another primitive. Shared SectionTabs minimum height now accommodates kit size classes (44px/default, 36px/small), preventing clipped triggers in Astro. CodeBlock default commands mode is preserved. Usage and state guidance in src/site/TEMPLATE-EXPLORER.md. No applicable Studio story changed; actual FrontX routes and retained Showcase are representative consumers.

Runtime adaptations: same-origin subpath manifest/asset resolution, CSP, readiness/error bridge, initially collapsed narrow-frame menu through existing layout event, same six Lucide menu icons locally bundled instead of remote Iconify requests. The original source viewer stays unchanged. No real auth/backend or API integration. Parent validates frame/origin for status messages. Iframe allows same-origin/scripts for the trusted demo; not a security sandbox for arbitrary code. Dynamic schema compilation requires unsafe-eval inside this example only; outer site policy is untouched. Upstream dependency audit findings remain, disclosed in guide/example. All other upstream example screens are available but outside the promised two-screen validation.

Build diagnosis: a later build failed with Stale NFS file handle (-70) while copying a numbered generated duplicate. Preserved the entire generated folder in ignored generated-artifact-backup/ and copied canonical filenames back. Default CSS/JS minification restored; full build now passes. The earlier CSS-optimizer hypothesis was not established. Temporary Astro internal instrumentation was restored byte-for-byte. Only known task build processes were stopped; no unrelated servers touched.

Native Claude reviewed the plan only, not code/browser. Three findings adapted: original-versus-composed distinction, actual readiness/failure state rather than iframe load, and URL validation. Full dispositions in workspace docs/qa/claude-delegations/2026-10-06-frontx-template-explorer/RECORD.md; log status verified.

Not covered: whole upstream application audit, Windows, minimum Node runtime, real-user usability, full WCAG/contrast audit, security remediation, hosting release. Source fixture/build report is local evidence, not product scope or delivery-date approval. Existing prior local Astro changes preserved. Screenshots document the new composition, not a pixel-perfect claim.

Review: http://127.0.0.1:5215/templates/mfe/ . Next proposed slice: practical use-case documentation from verified APIs, after local composition review. Publication remains separately authorized.

Representative shared-control regression: retained Event calendar tab list renders at 44px with 42px scroll height (no clipping); Preview to Playground click renders the playground. Get started's original Copy Workspace still announces success after hydration. No claim of a full calendar interaction sweep in this slice.

Final visual correction: the demo manifest omitted the existing shared UI Kit stylesheet. The website adapter includes it for each exposed screen; source files remain original. Numbered duplicate generated files caused a confirmed Stale NFS file handle (-70) during Astro public-asset copying. The entire artifact folder is preserved in ignored generated-artifact-backup/; only canonical filenames were copied back. Their origin remains unconfirmed. Earlier CSS-optimizer diagnosis was not established; default minification is restored.

Final CSS verification: Hello World action now renders with 36px height, 8px radius, blue background and 16px horizontal padding; cards also styled. Corrected both standalone federation manifest and host entry exposeAssets. Browser checked on final build.
