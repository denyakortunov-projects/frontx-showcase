import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const snapshot=JSON.parse(fs.readFileSync('src/site/data/template-files.json','utf8'));
const runtime='public/examples/shell-mfe';
const provenance=JSON.parse(fs.readFileSync(`${runtime}/provenance.json`,'utf8'));
assert.equal(snapshot.ref,provenance.templateRef);
assert(fs.readFileSync('src/site/content.ts','utf8').includes(snapshot.ref));
let files=0;
for(const list of Object.values(snapshot.templates)) {
  assert.equal(new Set(list.map(f=>f.path)).size,list.length);
  for(const file of list) {
    assert.equal(createHash('sha256').update(file.content).digest('hex'),file.sha256);
    assert(file.url.includes(`/blob/${snapshot.ref}/`));
    files++;
  }
}
for(const file of ['LICENSE','NOTICE','THIRD-PARTY-NOTICES.txt','website-adapter.js']) assert(fs.statSync(`${runtime}/${file}`).size>0);
const manifests=JSON.parse(fs.readFileSync(`${runtime}/generated-mfe-manifests.json`,'utf8'));
let assets=0;
for(const {manifest,entries} of manifests) {
  const local=manifest.metaData.publicPath.replace('__FRONTX_EXAMPLE_ORIGIN__','public');
  assert(local.startsWith(`${runtime}/mfes/`));
  for(const dep of manifest.shared) { assert(fs.existsSync(path.join(local,dep.chunkPath)),`Missing shared dependency ${dep.chunkPath}`); assets++; }
  // Host entry metadata is the actual shadow-root stylesheet source.
  for(const entry of entries) {
    for(const css of entry.exposeAssets.css.sync) assert(fs.existsSync(path.join(local,css)),`Missing host CSS ${css}`);
    if(manifest.name==='demoMfe') assert(entry.exposeAssets.css.sync.some(css=>/^assets\/kitThemeScope-[A-Za-z0-9_-]+\.css$/.test(css)), 'Missing shared UI Kit stylesheet in host entry');
  }
  for(const expose of JSON.parse(fs.readFileSync(path.join(local,'mf-manifest.json'),'utf8')).exposes) {
    for(const group of [expose.assets.js,expose.assets.css]) {
      for(const asset of [...group.sync,...group.async]) { assert(fs.existsSync(path.join(local,asset)),`Missing expose asset ${asset}`); assets++; }
    }
  }
}
console.log(`PASS: ${files} source hashes, pinned revision, licenses and ${assets} runtime asset references.`);
