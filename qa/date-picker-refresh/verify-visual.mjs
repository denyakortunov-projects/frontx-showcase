import {chromium} from 'playwright';import fs from 'node:fs';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1440,height:1000},locale:'en-GB',reducedMotion:'reduce'});const checks=[];const ok=(name,pass)=>{checks.push({name,passed:!!pass});if(!pass)throw Error(name)};
try{
 const manifest=await(await p.request.get('https://frontx.constructor.rocks/release.json')).json();ok('accepted public baseline remains exact source',manifest.sourceFingerprint==='ac222b0201b4dec2b8af13be8cf5e1dbe580a59c1041b6042b14930ca4266b84');
 await p.goto('https://frontx.constructor.rocks/?page=date-picker&dateLocale=en-GB&theme=fabric');await p.locator('.date-picker-inline [role=grid]').waitFor();await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'qa/date-picker-refresh/before-1440.png'});
 await p.goto('http://127.0.0.1:5202/?page=date-picker&dateLocale=en-GB&theme=fabric');await p.locator('.date-picker-inline .date-dropdown').first().waitFor();await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'qa/date-picker-refresh/after-1440.png'});
 for(const width of [1280,1600,1920,320,390]){await p.setViewportSize({width,height:1000});await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));ok(`${width} page fits`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));ok(`${width} inline surface fits parent`,await p.locator('.date-picker-inline .date-grid').evaluate(e=>e.getBoundingClientRect().right<=innerWidth));}
 await p.setViewportSize({width:1440,height:1000});
 for(const theme of ['fabric','editorial','terminal','iris','lagoon'])for(const mode of ['light','dark']){
 await p.goto(`http://127.0.0.1:5202/?page=date-picker&dateLocale=en-GB&theme=${theme}&mode=${mode}`);await p.getByRole('button',{name:'Choose date',exact:true}).click();await p.getByRole('dialog').waitFor();
 const ratios=await p.getByRole('dialog').evaluate(root=>{
  const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');
  const rgba=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data]};
  const bg=el=>{let c=[255,255,255];for(const node of [el,...function*(e){while(e.parentElement){e=e.parentElement;yield e}}(el)].reverse()){const v=rgba(getComputedStyle(node).backgroundColor),a=v[3]/255;c=c.map((x,i)=>v[i]*a+x*(1-a))}return c};
  const lum=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
  return ['.date-day button[data-selected-single]','.date-outside button','.date-day:not(.date-outside):not(.date-today) button:not([data-selected-single])'].map(sel=>{const el=root.querySelector(sel),fg=lum(rgba(getComputedStyle(el).color)),back=lum(bg(el));return {sel,ratio:(Math.max(fg,back)+.05)/(Math.min(fg,back)+.05)}});
 });ok(`${theme}/${mode} date text contrast`,ratios.every(x=>x.ratio>=4.5));
 }
 console.log(JSON.stringify({passed:checks.length}));
}catch(e){console.error(e);process.exitCode=1}finally{fs.writeFileSync('qa/date-picker-refresh/visual-report.json',JSON.stringify({checks,at:new Date().toISOString()},null,2));await b.close()}
