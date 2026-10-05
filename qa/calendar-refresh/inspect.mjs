import {chromium} from 'playwright';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1600,height:1100},reducedMotion:'reduce'});p.on('pageerror',console.error);
for(const view of ['week','month','year']){await p.goto(`http://127.0.0.1:5202/?page=event-calendar&calView=${view}`);await p.locator('.event-calendar').waitFor();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);await p.screenshot({path:`qa/calendar-refresh/${view}-first.png`});console.log(view,await p.locator('.cal-view-switch').innerText(),await p.locator('.cal-view-switch button').evaluateAll(es=>es.map(e=>({text:e.textContent,pressed:e.getAttribute('aria-pressed'),data:e.hasAttribute('data-pressed')}))))}
await b.close();
