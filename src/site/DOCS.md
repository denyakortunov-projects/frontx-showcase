# Practical documentation

Routes: `/docs/` chooses a path; `/get-started/` retains the verified pinned quickstart; `/docs/first-change/` makes one edit to its existing Blank Home example. The main Docs link now opens the overview; existing direct quickstart links remain valid.

`DocsNav.astro` is shared guide navigation using semantic links with aria-current; it is not an in-page tab widget. `docs.css` contains only documentation compositions. SiteLayout, tokens, ActionLink and CodeBlock stay canonical. Cards link directly, summaries expand with native keyboard behavior, and code stays readable without hydration. No extra UI dependency.

`first-change.ts` is the shared source for the rendered tutorial and `/docs/first-change.md`. Keep command blocks, prerequisites, expected result and troubleshooting in sync through this module. Source paths point to the same pinned revision as the templates. The expected-result figure is illustrative; it does not run a second copy of the example. The unchanged real demo remains on template pages.

Editing en.json changes the screen heading only; menu metadata is separate. The current dev:all builds then previews microfrontends, so translation changes also require a restart. Do not invent a scaffold command or present provenance as conflict-free upgrades. Source inspection, exact edit type-check/build and browser documentation flows: qa/first-change-2026-10-06/PARITY.md. Original scratch source and artifacts were restored afterward.

The website uses UI Kit alpha.5; the pinned template has its own alpha.3 dependency. This guide does not align/update dependencies or change the runtime example. No release or production-readiness claim.
