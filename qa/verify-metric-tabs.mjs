import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.env.DEMO_URL||'http://127.0.0.1:5201';
const browser=await chromium.launch({channel:'chrome',headless:true});
const p=await browser.newPage({viewport:{width:1600,height:1000},reducedMotion:'reduce'});
const checks=[],errors=[];p.on('pageerror',e=>errors.push(e.message));
const ok=(name,v)=>{checks.push({name,passed:!!v});if(!v)throw Error(name)};
try {
for(const mode of ['light','dark']) {
 for(const size of [1600,390]) {
  await p.setViewportSize({width:size,height:1000});
  await p.goto(`${base}/?page=widget&widget=calendar&width=3&height=304&mode=${mode}`);
  await p.locator('.revenue-metric .recharts-area').waitFor();
  ok(`metric ${mode} ${size} value`,await p.locator('.revenue-metric-summary > strong').innerText()==='$74,000');
  ok(`metric ${mode} ${size} fits`,await p.locator('.revenue-metric').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1));
  await p.locator('.widget-frame').screenshot({path:`qa/revenue-${mode}-${size}.png`});
  await p.getByRole('tab',{name:'Data',exact:true}).click();
  ok(`metric ${mode} ${size} paired data`,await p.locator('.data-scroll tbody tr').count()===25);
  await p.goto(`${base}/?page=widget&widget=heatmap&width=3&height=304&mode=${mode}`);
  for(const name of ['Daily','Weekly','Cumulative']) {
   await p.getByRole('tab',{name,exact:true}).click();
   ok(`activity ${mode} ${size} ${name} selected`,await p.getByRole('tab',{name,exact:true}).getAttribute('aria-selected')==='true');
   ok(`activity ${mode} ${size} ${name} visible fill`,await p.getByRole('tab',{name,exact:true}).evaluate(e=>getComputedStyle(e).backgroundColor===getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || getComputedStyle(e).backgroundColor!==getComputedStyle(e.parentElement).backgroundColor));
  }
  await p.locator('.widget-frame').screenshot({path:`qa/activity-selected-${mode}-${size}.png`});
 }
}
ok('no runtime errors',errors.length===0);console.log(JSON.stringify({passed:checks.length,errors}));
} finally {fs.writeFileSync('qa/metric-tabs-report.json',JSON.stringify({base,checkedAt:new Date().toISOString(),checks,errors},null,2));await browser.close()}
