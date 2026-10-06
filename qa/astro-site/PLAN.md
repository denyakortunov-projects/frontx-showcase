# FrontX Astro site — first implementation slice

Owner request 6 October 2026: implement gradually on Astro, attractive explanatory moving visuals, decide site goal/CTA, retain Constructor Fabric/Gear positioning and GitHub routes. No deployment.

Goal: visitor understands FrontX, chooses an appropriate library/template path, and reaches usable source/documentation. GitHub click is a useful handoff, not proof of adoption. No analytics installed. Current quickstart compatibility is unverified: primary first-slice CTA will be Explore FrontX → starting-path guide; GitHub is prominent alongside it. After verified installation, promote Get started. This refines the previous tentative CTA in consultation with independent review, not an external product decision.

- [x] Migrate existing app build to Astro; keep React Showcase on /showcase/ and redirect old ?page= links with full query/hash.
- [x] Static shared branded layout, home, templates index/detail, libraries and starting guide. Existing UI kit primitives/tokens; one React explanatory island.
- [x] Show Templates / Libraries / Your app without pretending to execute tools. Optional UI Kit and separate CLI/AI tools remain explicit.
- [x] Check build, desktop/mobile, keyboard, Back/reload, diagram state and reduced motion; smoke retained gallery/calendar/date picker.
- [x] Record results, limitations and next slice: a pinned and tested Shell+MFE quickstart. No publication.

Astro islands here are website rendering architecture; not evidence of FrontX Shell/MFE integration. The existing Showcase stays a standalone demo. No remote repo or second app created. Avoid dependencies beyond Astro official React integration; no new UI or animation library.

## Next bounded slices

1. Review this local visual direction with Denis; apply layout/copy feedback to the shared site components.
2. Verify the exact supported FrontX/CLI/template versions in an isolated scratch consumer; test Shell + MFE from a clean start. Then write reproducible instructions and promote Get started if the path works.
3. Add a template Files view and a live example tied to its exact source, only after that example is verified. Keep Calendar/Chat outside the template catalogue until actual templates exist.
4. Before any authorized publication: update release/source archives, repeat affected checks and use the existing FrontX release target. Hosting and deployment remain unchanged in this slice.

Build boundary: Astro renders seven static pages and one small React island. The existing Showcase keeps its Vite entry at /showcase/ in the same output directory; this avoids Astro CSS-chunk ordering changing accepted component styles. See README for local development behavior.

## Next slice completed - 6 October 2026

Shell + MFE is verified locally against exact published CLI and pinned template versions. Homepage CTA is now Get started, leading to four reproducible steps. GitHub remains a source handoff. See ../quickstart-2026-10-06/PLAN.md and PARITY.md. Earlier unverified status above records the first slice, not current status. Next: template Files view and source-bound example. No deployment.

## Template explorer slice - 6 October 2026

Added selected original file views to all three template pages and a click-to-load, source-pinned composed Shell/MFE example. Static runtime is part of the same site's output; no new project or deployment target. Source hashes, original LICENSE/NOTICE and dependency attribution preserved. Hosting adapter differences are visible and documented. Verification: ../template-explorer-2026-10-06/PARITY.md. Next proposed slice: review this local composition, then expand practical documentation/use cases from verified APIs rather than adding unverified templates. Publication remains a separate explicit request.


## Practical documentation completed — 6 October 2026

Docs overview and first-change tutorial implemented. Existing Quickstart/MFE detail link to the next step; shared navigation and plain-text version included. The small source edit passed workspace type-check/build; tutorial browser navigation and responsive checks passed. See ../first-change-2026-10-06/PARITY.md. Owner asked to review after this stage; next action is review of the accumulated local site, not another unrequested expansion or deployment.
