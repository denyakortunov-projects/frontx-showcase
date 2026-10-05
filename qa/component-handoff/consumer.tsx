// Verification fixture in the existing application, not a new app or product route.
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@gears-frontx/ui-kit/theme.css';
import { ControlledCalendar } from '../../src/calendar/examples/ControlledCalendar';
import { ResponsiveDatePicker } from '../../src/date-picker/ResponsiveDatePicker';
function Consumer(){
 const [date,setDate]=useState<Date>();
 return <main style={{padding:24,fontFamily:'var(--font-sans)',color:'var(--foreground)',background:'var(--background)'}}>
  <h1>Isolated FrontX consumer</h1><div style={{maxWidth:360,marginBottom:24}}><ResponsiveDatePicker aria-label="Choose date" selected={date} onSelect={setDate}/></div><ControlledCalendar/>
 </main>;
}
createRoot(document.getElementById('root')!).render(<Consumer/>);
