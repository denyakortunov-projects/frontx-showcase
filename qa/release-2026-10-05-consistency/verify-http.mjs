import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
const base='https://frontx.constructor.rocks';
const expected=JSON.parse(readFileSync('public/release.json','utf8'));
const checks=[];
const check=(name,ok)=>{checks.push({name,passed:!!ok});if(!ok)throw Error(name)};
const get=async path=>{const r=await fetch(base+path,{signal:AbortSignal.timeout(30000)});check(`HTTP ${path}`,r.ok);return r};
const manifest=await(await get('/release.json')).json();
check('exact release fingerprint',manifest.sourceFingerprint===expected.sourceFingerprint);
const html=await(await get('/')).text();
const assets=[...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(m=>m[1]);
for(const asset of assets){const r=await get(asset);check(`asset type ${asset}`,!(r.headers.get('content-type')||'').includes('text/html'));}
for(const file of ['frontx-showcase-source.zip','frontx-calendar-components.zip','EVENT-CALENDAR.md','DATE-PICKER.md','README.md','CONTRACT.md','ControlledCalendar.tsx']){
 const path='/handoff/'+file;const bytes=Buffer.from(await(await get(path)).arrayBuffer());const local=readFileSync('public'+path);
 check(`exact bytes ${file}`,bytes.equals(local));
}
const report={base,verifiedAt:new Date().toISOString(),sourceFingerprint:manifest.sourceFingerprint,archiveSha256:manifest.archiveSha256,assets,checks};
writeFileSync('qa/release-2026-10-05-consistency/http-report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:checks.length,sourceFingerprint:manifest.sourceFingerprint}));
