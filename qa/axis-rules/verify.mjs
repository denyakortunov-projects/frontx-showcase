import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.DEMO_URL || 'http://127.0.0.1:5207';
const b=await chromium.launch({channel:'chrome',headless:true});
const p=await b.newPage({viewport:{width:1600,height:1000},reducedMotion:'reduce'});
const checks=[],errors=[];p.on('pageerror',e=>errors.push(e.message));
function ok(name,value){checks.push({name,passed:!!value});if(!value)throw Error(name);}
const number=label=>Number(label.replaceAll(',','').replace('%','').replace(/K$/, 'e3').replace(/M$/,'e6').replace(/B$/,'e9'));
async function inspect(kind,density,width=6,mode='light'){
 await p.goto(`${base}/?page=widget&widget=${kind}&width=${width}&height=304&density=${density}&mode=${mode}`);
 await p.locator('.recharts-surface').waitFor();
 await p.waitForTimeout(150); // allow ResizeObserver and the responsive chart to settle
 const axes=await p.locator('.recharts-yAxis-tick-labels,.recharts-xAxis-tick-labels').evaluateAll(es=>es.map(e=>({
   labels:[...e.querySelectorAll('text')].map(t=>t.textContent),
   boxes:[...e.querySelectorAll('text')].map(t=>{const r=t.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}}),
 })));
 const svg=await p.locator('.recharts-surface').boundingBox();
 const numeric=axes.filter(a=>a.labels.length && a.labels.every(s=>Number.isFinite(number(s))));
 ok(`${kind}/${density}/${width}/${mode}: numeric axes`,numeric.length === (['composed','scatter','bubble'].includes(kind)?2:1));
 for(const [index,axis] of numeric.entries()){
  ok(`${kind}/${density} axis ${index}: labels contained in SVG`,axis.boxes.every(r=>r.x>=svg.x-1&&r.right<=svg.x+svg.width+1&&r.y>=svg.y-1&&r.bottom<=svg.y+svg.height+1));
  const values=axis.labels.map(number).sort((a,b)=>a-b),step=values[1]-values[0];
  const normalized=Number((step/10**Math.floor(Math.log10(step))).toPrecision(8));
  ok(`${kind}/${density} axis ${index}: nice equal unique ticks`,new Set(values).size===values.length &&
    ([1,2,5].includes(normalized)||(['stacked','scatter','bubble'].includes(kind)&&step===25)) &&
    values.every((v,i)=>i===0||Math.abs((v-values[i-1])/step-1)<1e-8));
  ok(`${kind}/${density} axis ${index}: labels do not overlap`,axis.boxes.every((a,i)=>axis.boxes.slice(i+1).every(c=>a.right<=c.x||c.right<=a.x||a.bottom<=c.y||c.bottom<=a.y)));
  if(['stacked','scatter','bubble'].includes(kind))ok(`${kind}: bounded 0–100`,values[0]===0&&values.at(-1)===100);
 }
 ok(`${kind}/${density}: no page overflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 return numeric.map(a=>a.labels);
}
try{
 for(const kind of ['area','line','bar','ranked','stacked','scatter','bubble','composed','waterfall']){
  for(const density of ['standard','compact'])await inspect(kind,density);
 }
 await inspect('composed','standard',6,'dark');
 await p.locator('.widget-frame').screenshot({path:'qa/axis-rules/dual-dark.png'});
 await inspect('line','standard');
 await p.locator('.widget-frame').screenshot({path:'qa/axis-rules/after-line.png'});
 const data=p.getByRole('tab',{name:'Data',exact:true});await data.focus();await p.keyboard.press('Enter');
 await p.locator('.data-scroll tbody tr').first().waitFor();
 const standardData=await p.locator('.data-scroll').innerText();
 ok('Data tab keyboard accessible',await data.getAttribute('aria-selected')==='true');
 await p.goBack();await p.locator('.recharts-surface').waitFor();
 ok('Back restores preview',await p.getByRole('tab',{name:'Preview',exact:true}).getAttribute('aria-selected')==='true');
 await inspect('line','compact');await p.getByRole('tab',{name:'Data',exact:true}).click();
 ok('density preserves exact Data values',await p.locator('.data-scroll').innerText()===standardData);
 await p.setViewportSize({width:390,height:1000});
 for(const kind of ['bar','composed','scatter','stacked'])await inspect(kind,'compact',3);
 await p.locator('.widget-frame').screenshot({path:'qa/axis-rules/mobile.png'});
 await p.goto(`${base}/?page=handoff`);
 ok('policy discoverable in handoff',await p.getByRole('link',{name:'Numeric-axis rules and integration'}).count()===1);
 const policy=await p.request.get(`${base}/handoff/CHART-AXES.md`);
 ok('policy downloadable',policy.ok()&&(await policy.text()).includes('1, 2 or 5'));
 ok('no runtime errors',errors.length===0);
 console.log(JSON.stringify({passed:checks.length,errors}));
}catch(error){await p.screenshot({path:'qa/axis-rules/failure.png',fullPage:true});throw error;}
finally{fs.writeFileSync('qa/axis-rules/browser-report.json',JSON.stringify({base,checks,errors},null,2)+'\n');await b.close();}
