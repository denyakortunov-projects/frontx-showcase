import {siteMetadata} from './site-metadata.mjs';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
// Vite prefixes static CSS/HTML URLs with /showcase/. Serve the exact shared assets there.
copyFileSync(new URL("../public/favicon.svg", import.meta.url), new URL("../public/showcase/favicon.svg", import.meta.url));
mkdirSync(new URL("../public/showcase/fonts/", import.meta.url), {recursive:true});
copyFileSync(new URL("../public/fonts/inter-latin.woff2", import.meta.url), new URL("../public/showcase/fonts/inter-latin.woff2", import.meta.url));

// Social crawlers read static HTML, so catalogue metadata is written at build time.
const entry = new URL('../public/showcase/index.html', import.meta.url);
let html = readFileSync(entry, 'utf8');
html = html.replace(/<link\b[^>]*rel="icon"[^>]*>/g, '');
html = html.replace('</head>', siteMetadata({title:'UI Kit · FrontX', description:'Explore FrontX components, charts and screen examples for complex web interfaces.', pathname:'/showcase/'}) + '</head>');
writeFileSync(entry, html);

// Downloadable examples are the same files compiled and shown in the catalogue.
await (async()=>{const fs=await import("node:fs/promises");await fs.mkdir("public/handoff/components",{recursive:true});for(const name of await fs.readdir("src/showcase/examples")){if(name.endsWith("Example.tsx"))await fs.copyFile(`src/showcase/examples/${name}`,`public/handoff/components/${name}`);}})();

await (async()=>{const fs=await import("node:fs/promises");for(const name of ["button","input","checkbox","badge","tabs","avatar","table","progress"]){await fs.copyFile(`node_modules/@gears-frontx/ui-kit/dist/components/${name}/${name}.d.ts`,`public/handoff/components/${name}.d.ts`);}})();
