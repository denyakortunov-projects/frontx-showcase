import { chromium } from 'playwright';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1600,height:1000}});
await p.goto('http://127.0.0.1:5202/?page=event-calendar&calTab=playground');await p.locator('[data-event-id=london]').scrollIntoViewIfNeeded();await p.screenshot({path:'qa/calendar-polish/before-friday.png'});await p.goto('http://127.0.0.1:5202/?page=event-calendar');await p.locator('.event-calendar').nth(1).scrollIntoViewIfNeeded();await p.screenshot({path:'qa/calendar-polish/before-compact.png'});await b.close();
