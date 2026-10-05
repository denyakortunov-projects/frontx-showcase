import { chromium } from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const checks=[],errors=[],metrics=[];
page.on('pageerror',e=>errors.push(e.message));
const check=(name,ok)=>{checks.push({name,passed:!!ok});if(!ok)throw Error(name)};
const routes=['gallery','event-calendar','date-picker','elements','layouts','modularity','themes','handoff'];
try {
 for(const width of [1440,1920,390,320]) {
  await page.setViewportSize({width,height:1000});
  const headers=[];
  for(const route of routes){
   await page.goto(`http://127.0.0.1:5202/?page=${route}&theme=fabric`);await page.locator('.showcase-page-header').waitFor();await page.evaluate(()=>document.fonts.ready);
   const m=await page.locator('.showcase-page-header h1').evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {font:s.fontSize,weight:s.fontWeight,tracking:s.letterSpacing,line:s.lineHeight,x:r.x,y:r.y,text:e.textContent}});
   headers.push(m);metrics.push({width,route,...m});
   check(`${route}/${width} one heading`,await page.locator('h1').count()===1);
   check(`${route}/${width} no page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   if(['gallery','event-calendar','date-picker','elements'].includes(route)&&[1440,390].includes(width))await page.screenshot({path:`qa/page-consistency/${route}-${width}.png`});
  }
  check(`${width} identical page typography and origin`,headers.every(m=>['font','weight','tracking','line','x','y'].every(k=>m[k]===headers[0][k])));
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:5202/?page=date-picker');
 await page.getByRole('tab',{name:'Integration',exact:true}).click();await page.getByRole('heading',{name:'Integrate Date picker'}).waitFor();check('integration URL addressable',new URL(page.url()).searchParams.get('pickTab')==='integration');check('documentation separated from previews',await page.getByRole('button',{name:'Choose date',exact:true}).count()===0);
 await page.goBack();await page.getByRole('button',{name:'Choose date',exact:true}).waitFor();check('Back restores preview',true);
 await page.getByRole('tab',{name:'Preview',exact:true}).focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');await page.getByRole('heading',{name:'Integrate Date picker'}).waitFor();check('tabs keyboard navigation',true);
 for(const theme of ['fabric','editorial','terminal','iris','lagoon']) {await page.goto(`http://127.0.0.1:5202/?page=date-picker&theme=${theme}&mode=dark`);await page.locator('.showcase-page-header').waitFor();check(`${theme} dark header`,await page.locator('h1').evaluate(e=>getComputedStyle(e).fontSize==='32px'));}
 check('zero browser errors',errors.length===0);
 console.log(JSON.stringify({passed:checks.length,errors}));
} catch(e){console.error(e);process.exitCode=1;await page.screenshot({path:'qa/page-consistency/failure.png'});}finally{fs.writeFileSync('qa/page-consistency/report.json',JSON.stringify({checks,errors,metrics},null,2));await browser.close();}
