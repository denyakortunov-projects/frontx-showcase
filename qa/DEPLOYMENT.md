# FrontX showcase publication — 2026-09-25

User explicitly authorized a separate demo website and publication at frontx.constructor.rocks, plus adding its DNS record in GoDaddy. Studio and other websites were not deployed or changed.

## Published source

- URL: https://frontx.constructor.rocks
- Temporary Hostinger origin: https://powderblue-skunk-609923.hostingersite.com
- Source commit: `c7e0208968dbe6a2ba57914c6f904e437521e67f`
- Source fingerprint: `de2a2f9c1c944502c3764ec0f33b73c7cfb31fd2e7a3af66d3008d3273e8b92c`
- Public source archive SHA256: `a3dff48736a16574dc06137bf144043d91b9bfa54c3be75452c156a5fd7a871d`
- Deployment UUID: `01a0d8ca-da59-73bb-a4c7-a9feca7301e8`
- Hostinger state: completed; 13:39:27–13:40:09 UTC (42 seconds).
- Transport: official @hostinger/mcp hosting_deployJsApplication, allowlisted source ZIP (no credentials, node_modules, .git or workspace material). Vite build, Node 20, npm, output dist.
- This independent local repository has no GitHub remote or automatic deployment configured. Future releases must remain explicitly requested.

## Domain and HTTPS

- Created only one new website on the existing Business plan; frontx.constructor.rocks is its parked domain alias, sharing the new website document root.
- Added only GoDaddy A record `frontx → 147.93.78.101`; actual authoritative TTL is 600 seconds.
- Nameservers remain ns27.domaincontrol.com and ns28.domaincontrol.com. Other records unchanged.
- The initial DNS save was blocked by automatic review because the IP also hosts Studio. Before retrying, the new site's Hostinger Plan details explicitly confirmed Website IP address 147.93.78.101, and a direct HTTP request with the FrontX Host header returned its exact release fingerprint. The subsequently reviewed save succeeded.
- DNS record confirmed in GoDaddy and by an authoritative query.
- Hostinger SSL: active, HTTPS redirect enabled, no last error; certificate expires 2026-12-24T12:45:39Z.
- HTTPS verification used normal certificate validation; no TLS bypass.

## Evidence

- Production preview: all 49 browser checks passed, no JS errors (qa/ACCEPTANCE.md).
- Public temporary origin browser smoke: 10 charts, detail sizing, theme switch, paired table and developer page passed, no JS errors.
- Final custom domain opened in Chrome and rendered all 10 charts.
- Custom-domain HTTP verification at 2026-09-25T13:45:10.590Z: exact release fingerprint, JS/CSS assets, both Markdown handoff documents, source ZIP download and SHA256 all passed.
- Public source ZIP is 51,255 bytes. Data are synthetic.
- Credentials remain outside repositories at ~/.config/hostinger/api-token; see shared access guide. No secrets were included in the build or handoff bundle.

This is a reviewable demo and proposed integration contract. It does not claim production readiness or an accepted FrontX schema. Drag/resize dashboard editing remains a later scope.

## Expansion v0.2.0 — 2026-09-25

- Explicit owner requests: expand the showcase, publish to the existing FrontX site, and update its associated GitHub repository after the build.
- Source commit: `e5ab664bc0f07a93036caf4502e0dd2e7a8bb837`, pushed fast-forward to `main` at https://github.com/denyakortunov-projects/frontx-showcase. Repository remote was established after the initial release recorded above; no automatic hosting deployment is configured.
- Source fingerprint: `5deeb0f16b6fcf86e9fbef2885a71c027eeae034f93a613c5c64796e9a2930e2`.
- Public archive SHA256: `986d7e115e9dc3998c09b5ab3e047df78d92b49d67f217792bd63e5345d4fd51`; 86,387 bytes; 27 allowlisted source files.
- Hostinger deployment: `01a0d8f7-4c67-7295-ac13-3a584016b3f4`, completed 14:28:00–14:28:46 UTC (46 seconds). Same official API source-archive transport, existing site and parked alias; no DNS or other website changes.
- Before release, HTTPS still served the exact accepted prior fingerprint. Selected source had a clean Git worktree; production build and 141 browser checks passed before publication.
- HTTPS verification at 14:29:10 UTC matched the new fingerprint, both exact JS/CSS assets, handoff documents and source ZIP SHA256. Eight public browser checks passed with no JavaScript errors: 18 widgets, 20 elements, Iris dark theme, Base UI menu, independent grid width, cumulative activity mode and distinct build details.
- Evidence: `EXPANSION-2026-09-25.md`, `expansion-report.json`, `utilities-report.json`, `elements-extras-report.json`, `public-expansion-report.json`, `public-browser-expansion-report.json`.
- This documentation-only release record follows the source commit; it does not alter the deployed runtime or public fingerprint.

## Review refinements v0.2.1 — 2026-09-25

- Source `6f9f2bdfe2c35b13775f60ebbe2a9ffcd95bed47`; GitHub main updated fast-forward.
- Fingerprint `40b8e57a58e4ad20e0f2f5a9d6e3e0651479eb8b10ce98113d1e4cd619681e6f`; source ZIP SHA256 `2f37a33aa004ef9c9b46ec41cc225857756f0dfb9392e453bb4a263cc925aba0`, 87,584 bytes.
- Deployment `01a0d905-0cf3-7395-ba35-b22294b8354f` completed 14:43:02–14:43:33 UTC (31 seconds), same existing FrontX Hostinger site.
- HTTP verification at 14:44:47 UTC confirmed exact fingerprint/assets/archive. Thirteen public browser checks passed, including independent green light/dark mode, compact monthly activity, calendar without scrolling and leaf-only treemap.
- Local verification: 43 calendar/comparison checks, 17 activity/mosaic checks, 45 palette/mode geometry checks, and 17 existing utility interaction checks passed with no runtime errors. See REFINEMENTS-2026-09-25.md.
- While this release was building, owner further requested cleaner funnel and mosaic labels. That follow-up is a separate forward patch; this verified release is its baseline.
