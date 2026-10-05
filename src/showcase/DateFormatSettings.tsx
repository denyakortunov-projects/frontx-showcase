import { useId } from "react";
import { Button } from "@gears-frontx/ui-kit/button";
import { Popover, PopoverTrigger, PopoverContent } from "@gears-frontx/ui-kit/popover";
import { NativeSelect } from "@gears-frontx/ui-kit/native-select";
import { Settings2 } from "lucide-react";
import { preferencesFromQuery, useDatePreferences } from "../date-picker/date-preferences";
import "./date-format-settings.css";
export function DateFormatSettings({query, update}: {query:URLSearchParams;update:(v:Record<string,string>)=>unknown}) {
 const id=useId();const settings=preferencesFromQuery(query);const resolved=useDatePreferences(settings);
 const sample=new Date(2026,9,5,17,30);
 return <Popover><PopoverTrigger render={<Button variant="outline" size="sm" icon={<Settings2/>}/>}>Formats</PopoverTrigger>
 <PopoverContent className="date-format-settings" align="end" aria-label="Date and time formats">
 <label htmlFor={id+'locale'}>Region</label><NativeSelect id={id+'locale'} value={settings.locale??'system'} onChange={e=>update({dateLocale:e.target.value==='system'?'':e.target.value})}>
 <option value="system">Browser / system</option><option value="en-GB">English · United Kingdom</option><option value="en-US">English · United States</option><option value="de-DE">Deutsch · Deutschland</option><option value="fr-FR">Français · France</option><option value="ru-RU">Русский · Россия</option><option value="ja-JP">日本語 · 日本</option>
 </NativeSelect>
 <label htmlFor={id+'time'}>Time format</label><NativeSelect id={id+'time'} value={settings.timeFormat} onChange={e=>update({timeFormat:e.target.value==='system'?'':e.target.value})}><option value="system">Regional default</option><option value="12">12-hour · 5:30 PM</option><option value="24">24-hour · 17:30</option></NativeSelect>
 <label htmlFor={id+'week'}>Week starts on</label><NativeSelect id={id+'week'} value={settings.weekStartsOn??'system'} onChange={e=>update({weekStart:e.target.value==='system'?'':e.target.value})}><option value="system">Regional default</option><option value="1">Monday</option><option value="0">Sunday</option><option value="6">Saturday</option></NativeSelect>
 <output aria-live="polite">{sample.toLocaleDateString(resolved.locale,{dateStyle:'short',calendar:'gregory'})} · {sample.toLocaleTimeString(resolved.locale,{hour:'numeric',minute:'2-digit',hourCycle:resolved.hourCycle})}<small>{resolved.locale}</small></output>
 </PopoverContent></Popover>
}
