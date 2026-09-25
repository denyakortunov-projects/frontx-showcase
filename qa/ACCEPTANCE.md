# FrontX Showcase — scope and acceptance
Status: implementation in progress; design awaiting owner review.
User authorized a separate interactive catalogue and publishing, preferred frontx.constructor.rocks, on 2026-09-25. Latest scope includes modular grid, chart variety including polar, Fabric elements, documentation and developer handoff. Existing Studio/Fabric deployments remain outside this change.
No accepted before-state for this new site. Source: FrontX published UI Kit 0.4.0-alpha.5 (research develop 2fb1435), existing Fabric/Studio patterns as reference. Figma not selected. New composition is a proposal, not canonical Studio redesign.
Reused: @gears-frontx/ui-kit Button/Card/Table/Chart/Tabs and semantic tokens; Lucide; Recharts v3. No new primitive library.
Routes: gallery, widget detail, layouts, elements, handoff; URL parameters preserve theme, selected widget, view and playground dimensions/state. Browser Back/Forward required.
States: ready/loading/empty/error, light/dark, Fabric/editorial themes. Controls: navigation, examples, preview/code/data, width/height, theme, range, table sorting, copy/download, layout presets.
Responsive: desktop 1280/1600/1920, narrow 390 and 320. Body no horizontal overflow; tables may scroll locally. Reduced motion respected. All data synthetic; no production APIs or generated AI claims.
Evidence: build, browser screenshots/interactions, final source and deployment hashes to be recorded here. Publication requires verified app build and public exact source check. No Studio CI run for unchanged Studio.

## Local verification 2026-09-25
- npm build: TypeScript and Vite succeeded. Existing chart dependencies produce 226KB gzip JS; no backend needed.
- Installed Chrome, headless Playwright: 49 interaction/reflow checks passed, zero browser page errors. Includes ten charts, category/search, dimension controls, JSON download, period/data changes, retry/loading/empty, themes and Back/Forward, three compositions, aligned chart/table bounds, kit buttons/switch/tabs, five routes at 1920/1280/390/320, keyboard skip navigation.
- Screenshot review found and corrected rounded duplicate axis labels, absent pie/radial center text, overly long ranked labels, mobile radar clipping, and 320px navigation overflow. Source edited afterward only to shorten one synthetic display name; final build/targeted check required before release.
- Exact chart/table numeric fixture equality follows the shared chartData function; independent live data integration is not claimed.
- Delegation used gpt-6-luna for isolated chart/data code, handoff prose and official API research. Lead reviewed/fixed output and ran browser checks. No Claude Code delegation in this implementation slice.
- User accepted general plan and palette direction, not final visual design. Production readiness, GTS adoption and a complete manual screen-reader audit are not claimed.

Final production-build verification: the same 49 checks passed against Vite preview on port 5199, zero browser errors. Final source fingerprint: de2a2f9c1c944502c3764ec0f33b73c7cfb31fd2e7a3af66d3008d3273e8b92c. Source archive is allowlisted (15 files), contains no credentials or project-private material. Radar uses shorter equivalent labels at narrow widths; full dimension names remain in Data.
Publication uses the official Hostinger API with the user-authorized shared credential at ~/.config/hostinger/api-token. No token is stored in this repository. Existing Studio/Fabric release surfaces are untouched. Constructor.rocks authoritative DNS is at GoDaddy; temporary Hostinger hostname will be used first.
