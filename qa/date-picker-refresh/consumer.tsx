import {useState} from 'react';import {createRoot} from 'react-dom/client';
import '@gears-frontx/ui-kit/theme.css';
import {fr} from 'date-fns/locale';
import {ResponsiveDatePicker} from '../../src/date-picker/ResponsiveDatePicker';
import {DateCalendar} from '../../src/date-picker/DateCalendar';
import {EventCalendar} from '../../src/calendar/EventCalendar';
import type {CalendarPosition, CalendarEvent} from '../../src/calendar/types';
function Consumer(){
 const [date,setDate]=useState<Date|undefined>(new Date(2026,9,5));
 const [range,setRange]=useState<{from:Date|undefined;to?:Date}>();
 const [events,setEvents]=useState<CalendarEvent[]>([]);
 const [position,setPosition]=useState<CalendarPosition>({date:'2026-10-05',view:'year',agendaSpan:'day',selectedId:null});
 return <main style={{padding:12,fontFamily:'var(--font-sans)',background:'var(--background)',color:'var(--foreground)'}}>
 <h1>Independent form</h1>
 <div style={{maxWidth:360}}>
 <ResponsiveDatePicker aria-label="Travel date" selected={date} onSelect={setDate} startMonth={new Date(2025,0)} endMonth={new Date(2030,11)} disabled={{dayOfWeek:[0,6]}} locale={fr}/>
 <ResponsiveDatePicker aria-label="Trip" mode="range" selected={range} onSelect={setRange} closeOnSelect/>
 <ResponsiveDatePicker aria-label="Typed date" variant="input" selected={date} onSelect={setDate}/>
 <output id="range">{range?.from?.toDateString()}|{range?.to?.toDateString()}</output>
 <DateCalendar mode="single" selected={date} onSelect={setDate} locale={fr} disabled={{dayOfWeek:[0,6]}}/>
 </div>
 <EventCalendar events={events} position={position} onPositionChange={setPosition} locale="de-DE" timeZone="Asia/Singapore" timeZones={['Asia/Tokyo','Pacific/Auckland']} onSave={event=>setEvents(old=>[...old.filter(e=>e.id!==event.id),event])} onDelete={id=>setEvents(old=>old.filter(e=>e.id!==id))}/>
 </main>
}
createRoot(document.getElementById('root')!).render(<Consumer/>);
