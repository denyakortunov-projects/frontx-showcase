# FrontX Astro website release — 6 October 2026

Status: deployed and publicly verified at https://frontx.constructor.rocks.

Owner explicitly requested publication of the new site and confirmed `frontx.constructor.rocks`. Existing origin: `powderblue-skunk-609923.hostingersite.com`. Scope: accumulated Astro entry, templates/source explorer, licensed Shell/MFE example, libraries, quickstart, docs and first-change guide; preserved Vite Showcase and legacy links. Baseline Git commit: `4780fd3943af085f18a235a6455e3684b5e4d69d`. Root handoff index reviewed; no pending FrontX handoff. Studio and other websites excluded.

Transport: existing manual Hostinger source archive API. GitHub API reports no workflows, Hostinger reports no Git repositories or auto-deployment. Prior live deployment `01a10b6b-3705-7026-8bae-88d823eec0d6` is the rollback reference. Astro requires Node >=22.12; package engines declare this for archive detection. No DNS or account changes.

Existing exact-source local evidence: `qa/astro-site`, `qa/quickstart-2026-10-06`, `qa/template-explorer-2026-10-06`, `qa/first-change-2026-10-06`. Reviewed existing desktop/mobile, keyboard, source selection, example loading, copy and history results. This is a review website and does not assert production readiness of the illustrative integrations.

Preflight passed: 552 exact source hashes and archive entries; prior first-change UI source hashes unchanged; full production build and clean extracted-source npm ci/build passed. New version 0.3.0. Source fingerprint `c94d80937134efe74281135e4d9b1dc91c4c8cb01d8ef872beacf07bce9ee0ac`. Developer archive SHA-256 `bfc3a46f4b25b5bc5405031abb1b897a3e9020ab6a2fa8cbc67e7600a5c506c9`. Deployment archive SHA-256 `3b96f704bf1d86c5e355b744b00ba2e694363792aa0fb455e02b44238e11c5a5`.

Source commit: `e7e1181e999a69c7bc537f258e0bc3e17255ae53`, pushed to existing origin/main. Hostinger automatically detected Astro / Node 22 / npm / dist from the archive. Deployment `01a110a3-442e-71a9-80d2-6752fdac8f13` started at 2026-10-06T09:54:57Z. No manual build-setting changes. Vendor snapshot retains upstream notice whitespace; git diff whitespace warnings there are not application-source changes.

Completed 2026-10-06T09:55:45Z (17:55:45 Singapore). Public verification passed: exact release fingerprint, byte-identical developer archive, 25 HTTP resources including all nine Astro pages, Showcase, entry assets, documentation downloads and example inputs. Browser smoke confirmed homepage diagram interaction, source/exemplar tabs, live Shell/MFE readiness and Hello World, old calendar URL redirect with retained parameters and loaded Event calendar, first-change guide and copy feedback. No console errors observed in the checked flows. Prior desktop/mobile evidence remains applicable to unchanged UI source.

GitHub main contains the selected source. Follow-up evidence commit changes only release records, not the deployed build. UI Kit, calendar component package, Studio, DNS and other sites remain unchanged. No additional rollout is started.
