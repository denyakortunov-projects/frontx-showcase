# Template explorer

The three existing `/templates/:slug/` pages compose `TemplateExplorer` over installed FrontX Button, Input and Tabs, the shared Showcase `SectionTabs`, and the shared `CodeBlock`. SiteLayout and tokens remain unchanged. Controls are not duplicated primitives. `CodeBlock` now accepts `kind="source"`; its default command behavior is preserved for Get started.

`src/site/data/template-files.json` contains 15 selected original files, SHA-256 values and immutable source URLs, not a complete repository mirror. `scripts/capture-template-files.mjs <pinned checkout>` deliberately refreshes that snapshot and the Apache LICENSE/NOTICE. File and view query values are allowlisted; invalid values display a notice and are removed with replaceState. `find` preserves the filter; `example` preserves the chosen initial example screen. Copy feedback resets when the selected file changes. The browser's own iframe history handles navigation inside the upstream example.

The Example panel on Shell/MFE shows the same composed Shell + MFE build. It is not an output of MFE alone. Guardrails has no Example tab: it adds rules/verification, not a runtime screen. The panel loads no example runtime until a preview button is pressed. Reloading the outer page remembers the chosen screen but requires another explicit Load action.

## Runtime artifact

`public/examples/shell-mfe/` is a generated static example snapshot in this existing site's artifact, not a second project or deployment target. It is built from the previously verified CLI consumer with exact upstream template source. The source browser always shows original files, not website-adapted copies.

To deliberately refresh it, first create/build/type-check the pinned consumer using Get started and the recorded quickstart environment. Then:

```
node scripts/prepare-template-example.mjs /absolute/verified-consumer /absolute/pinned-template-repository
npm run build
```

The preparer does not install packages. It compares 596 non-documentation/non-test source files against the supplied pinned repository, excluding CLI metadata, merged package manifests and lockfile. It temporarily adapts the host bootstrap in that disposable consumer, builds, and restores the original source in finally. It copies already-built MFE artifacts from that same verified consumer. Therefore run the documented consumer build first; this script alone is not proof those prior artifacts were rebuilt. Exact source, lock hash and build evidence are recorded in the QA folder.

Website adapter differences: subpath asset/manifest URLs, same-origin publicPath resolution, scoped manifest fetch normalization, initially collapsed menu at <=640px through the existing layout event, the same six Lucide menu glyphs bundled locally rather than fetched via Iconify, CSP, and a readiness/error message to the embedding page. Readiness requires a mounted shadow-root screen; iframe load alone is insufficient. Messages require exact origin and frame source. A 15-second timeout offers Reload, separate opening and the local guide. It does not automatically relabel a blocked frame as a defect in the source template.

The example's own CSP allows blob modules and dynamic schema compilation (`unsafe-eval`, required by this pinned GTS validator), while limiting connections to its own origin/blob. This policy exists only on the example HTML, not the Astro site. The iframe permits scripts and same-origin; it is a trusted local example, not a security boundary for arbitrary/untrusted code. It has no top-navigation/popups/forms permission. Synthetic data only; no production auth/backend. Shell settings stay within upstream frontend behavior. No automatic remote code execution or credential use.

Apache LICENSE/NOTICE and installed dependency license texts are retained. Upstream audit findings (23, including 11 high) remain; embedding a working demo is not security certification or release approval. Other template screens remain reachable but only Hello World and Blank Home are the promised test scope.

`npm run check:templates` checks pinned source hashes, licensing files and 253 MFE asset references before every site build. Regenerate deliberately, not during a visitor request. Existing Showcase source downloads still describe their prior release; this change does not silently replace them.

Astro CSS minification is disabled locally after isolating pathological optimizer time (minified build 58s; identical source with only CSS minification disabled <1s). JS remains minified; Showcase keeps its existing Vite settings. Temporary build diagnostics were restored; no dependency version changed.

Final visual correction: the demo manifest omitted the existing shared UI Kit stylesheet. The website adapter includes it for each exposed screen; source files remain original. Numbered duplicate generated files caused a confirmed Stale NFS file handle (-70) during Astro public-asset copying. The entire artifact folder is preserved in ignored generated-artifact-backup/; only canonical filenames were copied back. Their origin remains unconfirmed. Earlier CSS-optimizer diagnosis was not established; default minification is restored.
