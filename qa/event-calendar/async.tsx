// Isolated test consumer of the same runtime composition; not a product route.
import React,{useState,useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import '@gears-frontx/ui-kit/theme.css';
import '../../src/style.css';
import {EventCalendar} from '../../src/calendar/EventCalendar';
import {INITIAL_EVENTS,DEMO_NOW,DEMO_DATE} from '../../src/calendar/fixtures';
import type {CalendarPosition} from '../../src/calendar/types';
const test={guard:null as null|(()=>Promise<boolean>),resolve:()=>{},reject:()=>{},calls:0};
(window as any).calendarTest=test;
function Host(){
 const [events,setEvents]=useState(INITIAL_EVENTS);
 const [position,setPosition]=useState<CalendarPosition>({date:DEMO_DATE,view:'week',agendaSpan:'week',selectedId:null});
 const register=useCallback((guard:null|(()=>Promise<boolean>))=>{test.guard=guard},[]);
 return <div style={{padding:32}}><EventCalendar events={events} position={position} onPositionChange={setPosition} now={DEMO_NOW} timeZone="Asia/Singapore" registerNavigationGuard={register} onSave={async e=>{test.calls++;await new Promise<void>((resolve,reject)=>{test.resolve=resolve;test.reject=()=>reject(Error('Adapter failed'))});setEvents(old=>[...old.filter(x=>x.id!==e.id),e])}}/></div>
}
createRoot(document.getElementById('root')!).render(<Host/>);
