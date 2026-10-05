import {it} from 'node:test';
import assert from 'node:assert/strict';
import {rangeFor, draftFromEvent, validateDraft, newDraft, changeDraftZone} from '../../src/calendar/model.ts';
it('leap February month range is half-open',()=>assert.deepEqual(rangeFor('2024-02-29','month'),{start:'2024-02-01',end:'2024-03-01'}));
it('December range rolls into next year',()=>assert.deepEqual(rangeFor('2026-12-31','month'),{start:'2026-12-01',end:'2027-01-01'}));
it('year range starts in January and ends next January',()=>assert.deepEqual(rangeFor('2024-02-29','year'),{start:'2024-01-01',end:'2025-01-01'}));
it('timed event colour survives editing and zone conversion',()=>{
const event={id:'colour',title:'Colour',allDay:false as const,start:'2026-10-05T01:00:00Z',end:'2026-10-05T02:00:00Z',timeZone:'Asia/Singapore',color:'rose' as const};
const draft=changeDraftZone(draftFromEvent(event,'UTC'),'Europe/London');
const saved=validateDraft(draft).event!;
assert.equal(saved.color,'rose');assert.equal(saved.allDay,false);if(!saved.allDay)assert.equal(saved.start,event.start);
});
it('all-day colour survives inclusive editor and exclusive model',()=>{
const event={id:'all-day',title:'All day',allDay:true as const,startDate:'2026-10-05',endDate:'2026-10-08',color:'teal' as const};
const saved=validateDraft(draftFromEvent(event,'UTC')).event!;
assert.equal(saved.color,'teal');assert.equal(saved.allDay,true);if(saved.allDay)assert.equal(saved.endDate,event.endDate);
});
it('new and legacy events default to theme colour',()=>{
assert.equal(newDraft('2026-10-05','UTC','2026-10-05T00:00:00Z').color,'accent');
assert.equal(draftFromEvent({id:'legacy',title:'Legacy',allDay:true,startDate:'2026-10-05',endDate:'2026-10-06'},'UTC').color,'accent');
});
