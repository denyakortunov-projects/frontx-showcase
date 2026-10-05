import { chromium } from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1280,height:800}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5201/qa/event-calendar/probe.html');await page.getByText('Concurrent 0',{exact:true}).waitFor({state:'attached'}); await page.waitForTimeout(1200); await page.screenshot({path:'qa/event-calendar/probe-debug.png'});
 console.log((await page.locator('body').innerText()).slice(0,1800));
 console.log(await page.getByText('Concurrent 0',{exact:true}).evaluate(e=>e.parentElement.outerHTML));
 console.log(await page.getByText('Concurrent 0',{exact:true}).evaluate(e=>({rect:e.getBoundingClientRect().toJSON(),parent:e.closest('a')?.outerHTML,styles:getComputedStyle(e).display}))); await page.getByText('Concurrent 0',{exact:true}).click();
 await page.screenshot({path:'qa/event-calendar/engine-probe.png'});
 const result={errors,clicks:await page.evaluate(()=>window.probe),count:await page.getByText(/Concurrent/).count()};
 fs.writeFileSync('qa/event-calendar/engine-probe.json',JSON.stringify(result,null,2)); console.log(JSON.stringify(result));
 if(errors.length||result.clicks[0]!=='0'||result.count!==5)throw Error('probe failed');
}finally{await browser.close()}
