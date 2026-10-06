/** Build a website-only deployment adapter from the verified temporary consumer.
 * Usage: node scripts/prepare-template-example.mjs /absolute/consumer /absolute/pinned-repository
 * Does not install packages or modify upstream repositories. Source edits are restored.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const [consumerArg, sourceArg] = process.argv.slice(2);
if (!consumerArg || !sourceArg) throw new Error('Expected verified consumer and pinned repository paths');
const consumer = fs.realpathSync(consumerArg), source = fs.realpathSync(sourceArg);
const ref = '3b6cddb2a700ae76bc5e1991204e127de566d597';
const base = '/examples/shell-mfe/';
const output = path.resolve('public/examples/shell-mfe');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const packages = {'3099':'_blank-mfe','3001':'demo-mfe','3201':'widgets-fixture-a','3202':'widgets-fixture-b'};
// Verify original template source before applying the documented hosting adapter.
let sourceFiles = 0;
function verify(dir, relative = '') {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const rel = path.join(relative,entry.name), full = path.join(dir,entry.name);
    if (entry.isDirectory()) { if (!['manual-auth-tests','__tests__','__test-utils__'].includes(entry.name)) verify(full,rel); continue; }
    if (!entry.isFile()) continue;
    // CLI-managed ownership/metadata is not part of a runtime source comparison.
    if (rel.startsWith('.frontx/') || rel === 'frontx-template.json' || rel === 'package-lock.json' || rel.endsWith('.md') || rel === 'package.json' || rel.includes('vitest.')) continue;
    const target = path.join(consumer,rel);
    if (!fs.existsSync(target) || sha(fs.readFileSync(target)) !== sha(fs.readFileSync(full))) throw new Error(`Consumer differs from pinned source: ${rel}`);
    sourceFiles++;
  }
}
verify(path.join(source,'template-shell'));
verify(path.join(source,'template-mfe'));
const bootstrap = path.join(consumer,'src-app/app/mfe/bootstrap.ts');
const original = fs.readFileSync(bootstrap,'utf8');
const main = path.join(consumer,'src-app/app/main.tsx');
const originalMain = fs.readFileSync(main,'utf8');
const menu = path.join(consumer,'src-app/app/layout/Menu.tsx');
const originalMenu = fs.readFileSync(menu,'utf8');
const marker = "const MFE_MANIFESTS_URL = '/generated-mfe-manifests.json';";
const parse = 'const manifests = (await response.json()) as MfeManifestConfig[];';
if (!original.includes(marker) || !original.includes(parse)) throw new Error('Upstream adapter anchor changed');
try {
  fs.writeFileSync(bootstrap, '// Modified for the FrontX website example: same-origin subpath manifest resolution.\n' + original.replace(marker,`const MFE_MANIFESTS_URL = '${base}generated-mfe-manifests.json';`).replace(parse, 'const manifests = JSON.parse((await response.text()).replaceAll("__FRONTX_EXAMPLE_ORIGIN__", window.location.origin)) as MfeManifestConfig[];'));
  if(!originalMain.includes('FrontXProvider, apiRegistry') || !originalMain.includes("createRoot(document.getElementById('root')!).render(")) throw new Error('Upstream menu adapter anchor changed');
  fs.writeFileSync(main,originalMain.replace('FrontXProvider, apiRegistry','FrontXProvider, eventBus, apiRegistry').replace("createRoot(document.getElementById('root')!).render(","// Modified for the website example: start with collapsed navigation on narrow frames.\nif (window.matchMedia('(max-width: 640px)').matches) eventBus.emit('layout/menu/collapsed', { collapsed: true });\ncreateRoot(document.getElementById('root')!).render("));
  const iconImport="import { Icon } from '@iconify/react';";
  if(!originalMenu.includes(iconImport)) throw new Error('Upstream icon adapter anchor changed');
  fs.writeFileSync(menu,originalMenu.replace(iconImport,`// Modified for the website example: bundle the same Lucide glyphs without an external icon service.
import { Home, Globe, User, Palette, Component, LayoutGrid } from 'lucide-react';
const glyphs: Record<string, typeof Home> = {'lucide:home':Home,'lucide:globe':Globe,'lucide:user':User,'lucide:palette':Palette,'lucide:component':Component,'lucide:layout-grid':LayoutGrid};
const Icon = ({icon,className}:{icon:string;className?:string}) => { const Glyph=glyphs[icon]??Component; return <Glyph className={className}/>; };`));
  execFileSync(process.execPath,[path.join(consumer,'node_modules/vite/bin/vite.js'),'build','--base',base,'--outDir',output,'--emptyOutDir'],{cwd:consumer,stdio:'inherit'});
} finally { fs.writeFileSync(bootstrap,original); fs.writeFileSync(main,originalMain); fs.writeFileSync(menu,originalMenu); }
let manifests = fs.readFileSync(path.join(consumer,'public/generated-mfe-manifests.json'),'utf8');
for (const [port,pkg] of Object.entries(packages)) {
  manifests = manifests.replaceAll(`http://localhost:${port}/`,`__FRONTX_EXAMPLE_ORIGIN__${base}mfes/${pkg}/`);
  fs.cpSync(path.join(consumer,`src-app/mfe_packages/${pkg}/dist`),path.join(output,`mfes/${pkg}`),{recursive:true});
}
fs.writeFileSync(path.join(output,'generated-mfe-manifests.json'),manifests);
// A nested widget demo loads the same manifest separately. Keep its request local.
function adaptNested(dir) {
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if(e.isDirectory()) adaptNested(p);
    else if(e.name.endsWith('.js')) {
      const s=fs.readFileSync(p,'utf8');
      if(s.includes('/generated-mfe-manifests.json')) {
        // The primary example only advertises Hello World/Blank Home. This secondary
        // widget route is preserved, but is not part of the acceptance claim.
        fs.writeFileSync(p,'/* Modified for website subpath hosting. */\n'+s.replaceAll('/generated-mfe-manifests.json',`${base}generated-mfe-manifests.json`));
      }
    }
  }
}
adaptNested(path.join(output,'mfes'));
// The pinned demo manifest omits its shared UI Kit stylesheet from exposes.
// Include that existing compiled stylesheet before each screen's own CSS.
// This is a website artifact correction, not an upstream source modification.
const demoPath=path.join(output,'mfes/demo-mfe');
const kitCss=fs.readdirSync(path.join(demoPath,'assets')).filter(name=>/^kitThemeScope-[A-Za-z0-9_-]+\.css$/.test(name));
if(kitCss.length!==1) throw new Error('Expected one shared demo UI Kit stylesheet');
const demoManifestPath=path.join(demoPath,'mf-manifest.json');
const demoManifest=JSON.parse(fs.readFileSync(demoManifestPath,'utf8'));
for(const expose of demoManifest.exposes) expose.assets.css.sync=[...new Set([`assets/${kitCss[0]}`,...expose.assets.css.sync])];
demoManifest.websiteAdapterNote='Modified: include the existing shared UI Kit stylesheet omitted from this pinned manifest.';
fs.writeFileSync(demoManifestPath,JSON.stringify(demoManifest,null,2)+'\n');
// The host consumes copied entry assets rather than the standalone manifest.
const hostManifestPath=path.join(output,'generated-mfe-manifests.json');
const hostManifests=JSON.parse(fs.readFileSync(hostManifestPath,'utf8'));
for(const item of hostManifests) {
  if(item.manifest.name!==demoManifest.name) continue;
  for(const entry of item.entries) entry.exposeAssets.css.sync=[...new Set([`assets/${kitCss[0]}`,...entry.exposeAssets.css.sync])];
}
fs.writeFileSync(hostManifestPath,JSON.stringify(hostManifests,null,2)+'\n');

const index=path.join(output,'index.html');
fs.copyFileSync('scripts/template-example-adapter.js',path.join(output,'website-adapter.js'));
fs.writeFileSync(index,fs.readFileSync(index,'utf8').replace('<head>',`<head>\n<meta http-equiv="Content-Security-Policy" content="default-src 'self' blob: data:; script-src 'self' blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' blob:; img-src 'self' data: blob:; object-src 'none'; base-uri 'self'; form-action 'none'">\n<script src="${base}website-adapter.js"></script>`).replace('<title>FrontX</title>','<title>Shell + MFE · FrontX example</title>'));
fs.copyFileSync(path.join(source,'LICENSE'),path.join(output,'LICENSE'));
fs.copyFileSync(path.join(source,'NOTICE'),path.join(output,'NOTICE'));
fs.copyFileSync(path.join(source,'LICENSE'),path.join(output,'LICENSE.txt'));
fs.copyFileSync(path.join(source,'NOTICE'),path.join(output,'NOTICE.txt'));
// Preserve installed dependency license texts. Deliberately includes more than
// the runtime bundle so a transitive attribution is not silently omitted.
const notices=[];
function licenses(dir) {
  for(const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if(e.isSymbolicLink()) continue;
    if(e.isDirectory()) licenses(p);
    else if(/^(license|licence|notice)(\.|$)/i.test(e.name)) notices.push(`\n\n--- ${path.relative(consumer,p)} ---\n${fs.readFileSync(p,'utf8')}`);
  }
}
licenses(path.join(consumer,'node_modules'));
fs.writeFileSync(path.join(output,'THIRD-PARTY-NOTICES.txt'),notices.join(''));
const adapter={templateRef:ref,sourceFilesVerified:sourceFiles,build:'Vite production build of verified consumer; website subpath adapter',changes:['Shell manifest URL and origin resolution','Host asset base','MFE public paths','Website CSP','Initially collapsed menu at narrow widths using the existing layout event','Same six menu Lucide glyphs bundled locally instead of Iconify network requests','Include existing shared UI Kit CSS omitted from demo manifest'],verifiedScreens:['hello-world','blank-home'],limitations:['No authentication/backend','Upstream dependency audit findings remain','Other template example routes outside checked scope'],lockSha256:sha(fs.readFileSync(path.join(consumer,'package-lock.json')))};
fs.writeFileSync(path.join(output,'provenance.json'),JSON.stringify(adapter,null,2)+'\n');
console.log(JSON.stringify(adapter,null,2));
