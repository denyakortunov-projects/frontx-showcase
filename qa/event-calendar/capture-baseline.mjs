import { chromium } from 'playwright';
const browser = await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1600,height:1000},reducedMotion:'reduce'});
 for (const [name,query] of [['gallery','page=gallery'],['widget','page=widget&widget=calendar'],['elements','page=elements'],['themes','page=themes']]) {
  await page.goto(`http://127.0.0.1:5201/?${query}`); await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(400);
  await page.screenshot({path:`qa/event-calendar/baseline-${name}.png`});
 }
} finally {await browser.close()}
