import {it} from 'node:test';import assert from 'node:assert/strict';
import {weekStart,rangeFor,formatAgendaTime,formatEventTime} from '../../src/calendar/model.ts';
import {resolveDatePreferences} from '../../src/date-picker/date-preferences.ts';
it('Sunday-first week includes Sunday across a month/year boundary',()=>assert.deepEqual(rangeFor('2027-01-01','week',0),{start:'2026-12-27',end:'2027-01-03'}));
it('Saturday-first calendar and Monday-first calendar retain correct week boundary',()=>{assert.equal(weekStart('2026-10-05',6),'2026-10-03');assert.equal(weekStart('2026-10-05',1),'2026-10-05')});
it('regions determine week and clock while explicit host settings win',()=>{assert.equal(resolveDatePreferences('en-US').weekStartsOn,0);assert.equal(resolveDatePreferences('en-US').hour12,true);assert.equal(resolveDatePreferences('ru-RU').weekStartsOn,1);assert.equal(resolveDatePreferences('en-US','24',1).hour12,false);assert.equal(resolveDatePreferences('en-US','24',1).weekStartsOn,1)});
const overnight={id:'night',title:'Night',allDay:false as const,start:'2026-10-05T22:00:00Z',end:'2026-10-06T01:00:00Z',timeZone:'UTC'};
it('12h continuation respects local segment midnight and preserves arrows',()=>{const text=formatAgendaTime(overnight,'2026-10-06','UTC','en-US',true);assert.match(text,/↳.*12:00.*AM.*01:00.*AM/);assert.equal(formatAgendaTime(overnight,'2026-10-05','UTC','en-GB',false),'22:00 – 24:00 ↗')});
it('changing format does not change event instants',()=>{const before=JSON.stringify(overnight);assert.match(formatEventTime(overnight,'UTC','en-US',true),/PM/);assert.doesNotMatch(formatEventTime(overnight,'UTC','en-US',false),/AM|PM/);assert.equal(JSON.stringify(overnight),before)});
