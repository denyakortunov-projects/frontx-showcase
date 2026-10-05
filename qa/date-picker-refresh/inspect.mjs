import {chromium} from 'playwright';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://127.0.0.1:5202/?page=date-picker');await p.locator('.frontx-date-calendar').waitFor();await p.screenshot({path:'qa/date-picker-refresh/desktop.png',fullPage:true});
console.log(await p.locator('.date-picker-inline').ariaSnapshot());
await p.getByRole('button',{name:'Choose date range',exact:true}).click();await p.getByRole('dialog').waitFor();await p.screenshot({path:'qa/date-picker-refresh/range.png'});console.log(await p.getByRole('dialog').ariaSnapshot());
await p.setViewportSize({width:320,height:740});await p.screenshot({path:'qa/date-picker-refresh/mobile-popup.png'});console.log(await p.getByRole('dialog').evaluate(e=>({rect:e.getBoundingClientRect().toJSON(),width:innerWidth})));await b.close();
