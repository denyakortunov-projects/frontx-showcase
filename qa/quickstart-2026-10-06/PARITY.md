# Get started slice — acceptance record

Adapted from the workspace implementation/acceptance contract for FrontX. User requested continuation of the preceding Astro website plan. Baseline is the preceding local slice (file hashes in BASELINE.json); HEAD still identifies the previous published Showcase. No unrelated changes overwritten. No Figma target or Studio changes.

## Scope and source

Continue in apps/frontx-showcase. Verify a disposable external consumer using published CLI 0.3.0-alpha.7 and template commit 3b6cddb2a700ae76bc5e1991204e127de566d597. Keep new website architecture, existing Showcase, theme tokens and navigation intact. No deployment. Do not modify upstream templates to make a false passing quickstart.

## Route / component / interaction inventory

- /get-started/: existing shared SiteLayout, ActionLink/Button, typography/tokens; add verified instruction composition and semantic pre/code blocks. Clipboard control must reuse FrontX Button, support keyboard, announce success and leave code selectable on failure or without JS.
- /templates/shell/ and /templates/mfe/: link into the relevant step and report only verified scope. Guardrails remains source-inspected only.
- /: CTA changes only if successful clean run establishes an actionable quickstart.
- /get-started/#ai: preserve existing anchor and honest boundary: AI Kit installation is a separate, untested path.
- Source links remain pinned. In-page navigation uses real anchors, browser Back and reload.

## Responsive / evidence

Use current FrontX website contract: desktop 1440, tablet 768, mobile 390/320. Code may scroll within its panel but must not widen the page. Match current header, spacing, typography, buttons; keep documentation out of product demo routes. No new perpetual motion. Check primary links, copy pointer/keyboard, deep links, Back/reload, console, source downloads. before-desktop.png records current guide. Browser and command results are recorded below.

Technical completion and user design acceptance remain separate. New guide awaits user review. Existing Studio catalogue/story checks do not apply to unchanged Studio; this app's new composition is verified on its actual documentation route.

## Verification result - local, 6 October 2026

- Website TypeScript + preserved Vite Showcase + Astro build passed (site-build.log). No source changes after this build. 78 local links/anchors checked; zero missing targets (FINAL-CHECKS.json). Six selected HTTP routes returned 200, including Markdown and retained Showcase (HTTP.json).
- Real consumer: published CLI 0.3.0-alpha.7, templates 3b6cddb2a700ae76bc5e1991204e127de566d597. Install, seed, add, dependency install, build and type-check passed. Hello World and Blank Home rendered through the real Shell. Back/reload passed. Runtime logs, versions, source/lock hashes and limitations in RUN-RESULT.json and logs/. Exact generated guide scaffold steps also replayed in a second empty directory (guide-replay.log).
- macOS Node 25.1.0/npm 11.6.2 tested. Source CI advertises Node 24.14.x/25.x; minimum version and Windows unverified. Example visibility requires FRONTX_INCLUDE_TEMPLATE_EXAMPLES=1, included in guide. AI Kit, authentication and production deployment not tested.
- Consumer npm audit reports 23 findings (11 high, 11 moderate, 1 low), including runtime packages; not established to be dev-only. Disclosed in the verification note; no production-readiness claim. No upstream dependency changes.
- Responsive DOM widths 320/390/768/1440 equal viewport widths. Desktop/mobile screenshots reviewed and saved as after-desktop.png/after-mobile.png. Code scrolls locally, no page overflow. Mobile navigation fits two columns. No motion added.
- Homepage Get started, MFE template to assemble deep link, reload and Back checked. Pointer Copy Install templates and keyboard Enter on Copy Workspace announce success. Copy reuses FrontX Button; code remains selectable. Browser clipboard API returned success, but OS clipboard bytes were not independently confirmed via automation bridge. Error fallback implemented but not fault-injected. No console errors observed.
- Plain-text guide is a download link returning 200 text/markdown. Both representations consume quickstartSteps. Baseline hashes confirm only seven intended site files changed in this slice; Showcase components, tokens and product interactions unchanged.
- Native Claude performed bounded read-only instruction review. Dispositions, including rejected unsupported security claim, recorded in workspace docs/qa/claude-delegations/2026-10-06-frontx-quickstart/RECORD.md; index status verified. Not a browser audit.

Reused SiteLayout, ActionLink, installed FrontX Button and existing typography/tokens. CodeBlock is a documentation composition, not another primitive; representative consumer /get-started/. No separate Studio story applies to unchanged Studio. Full WCAG audit, real-user usability testing and owner visual acceptance remain outside this check.

Fixture servers stopped; preview remains http://127.0.0.1:5215/get-started/. No deployment, emails, upstream writes or release archive regeneration.
