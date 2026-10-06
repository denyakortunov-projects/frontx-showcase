# Practical documentation — 6 October 2026

Status: verified locally; owner design review pending. User requests the next stage before providing feedback. Existing nested FrontX site only; no publication, new repository or app. Previous Astro/quickstart/explorer source is baseline (BASELINE.json); its design remains awaiting owner review. No Figma selected. Studio is unchanged.

Scope: Docs index, first-change guide for existing Blank Home, shared guide navigation, plain-text equivalent and links from Quickstart/MFE. Preserve existing quickstart commands, showcase, templates and site tokens. Source: pinned templates 3b6cddb2 and published CLI 0.3.0-alpha.7 plus existing consumer evidence. No new API, automatic upgrade, new MFE generator or production readiness claim.

Components: SiteLayout, ActionLink, CodeBlock, installed FrontX Button, existing page-intro/guide-card/quickstart layout. DocsNav is a semantic documentation composition, not a parallel control library. Story gap: this site has no Astro story catalogue; runtime docs routes are examples. No Studio story impacted.

Inventory: /docs/ card links; /docs/first-change/ section anchors, code copy, source links, troubleshooting details and plain text; /get-started/ navigation and next step; MFE template next step. Test direct route, reload, Back/Forward, keyboard focus/copy, mobile 320/390 plus desktop 1280/1600/1920, no overflow, representative existing quickstart and template navigation. Motion unchanged. New composition awaits visual acceptance.

Plan: source-check paths/commands; patch a disposable existing consumer and type-check/build then restore source; implement from shared content; run site build and local link/content checks; browser-verify; record limitations. Native Claude reviews supplied instruction text only, not code/browser. No full accessibility or upstream application audit implied.


## Verified evidence

- `site-build.log`: template integrity check, TypeScript, retained Vite Showcase and Astro static build passed (nine pages).
- `consumer-type-check.log` and `consumer-build.log`: exact two-string edit to the existing scratch consumer passed workspace checks. Source restored in `finally` (`CONSUMER.json`), then original workspace artifacts rebuilt (`consumer-restored-build.log`). The edited screen was not separately browser-run; the expected-result figure is labelled explanatory, not a live preview. The preceding quickstart/explorer provided the original two-screen browser evidence.
- `CONTENT-CHECK.json`: 122 internal links/anchors resolve, all three GitHub source paths exist in the pinned archive, seven translation keys retained and only two changed; both code blocks identical in HTML/plain-text output. `HTTP.json`: seven relevant routes/downloads return 200.
- `BROWSER.json`: desktop 1280/1600/1920 and mobile 320/390 without document overflow; three equal cards on desktop, one column on mobile. Local code scrolling retained. No new motion except reduced-motion-aware card hover.
- Pointer/keyboard: Docs → guide, Quickstart next step → guide, guide → existing UI Kit handoff and Back, hash anchor → Back/Forward/reload, Enter Copy feedback, Enter troubleshooting disclosure. Tab focuses guide navigation with a solid visible outline. Website Copy reports success; native clipboard read surfaced an older value, so clipboard byte parity is not claimed (different clipboard surfaces were not diagnosed).
- `before-quickstart.png` / `after-quickstart.png` at 1600×1000: brand, typography and command component preserved; intended new guide navigation inserts a row and shifts content below. Docs and guide captures show the new composition. Mobile screenshots inspected; 1280/1600/1920 guide captures retained. No Figma or pixel-perfect claim.
- Sample browser console returned zero errors. Existing template routes and source/example implementation unchanged except the MFE guide link. No package/dependency changes in this slice.

Claude reviewed the supplied text only. Three findings applied/adapted; categorical JSON type-check assertion and erroneous six-key count corrected using actual source. Full raw response and dispositions: workspace docs/qa/claude-delegations/2026-10-06-frontx-first-change/.

Not covered: new-user usability study, full WCAG audit, Windows/minimum Node, real backend, agent setup, new MFE creation or upgrade execution. Preserved all earlier local work and old public artifacts. No deployment. Next: owner review of the accumulated site, then a scoped visual/content iteration or verified integration example. No new release promise.
