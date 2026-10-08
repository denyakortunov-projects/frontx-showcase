import {Input} from '@gears-frontx/ui-kit';
import {ArrowUpRight,Search,LayoutGrid,Braces,MousePointer2,TextCursorInput,Table2,Bell,PanelTop,Layers,CalendarDays,ChartNoAxesCombined} from 'lucide-react';
import {PageHeader} from './PageHeader';
import {componentCatalogue,additionalElements} from './component-catalogue';
import './component-guide.css';
const icons={'Actions':MousePointer2,'Forms':TextCursorInput,'Data display':Table2,'Feedback':Bell,'Navigation':PanelTop,'Disclosure':Layers};
const all=[...componentCatalogue.map(c=>({...c,href:`?page=component&component=${c.id}`,ready:true})),...additionalElements.map(c=>({...c,href:`?page=elements#component-${c.id}`,ready:false}))];
export function ComponentOverview({query,update}:{query:URLSearchParams;update:(values:Record<string,string>)=>Promise<void>}){
 const search=query.get('find')||'';
 const filtered=all.filter(c=>`${c.title} ${c.family}`.toLowerCase().includes(search.toLowerCase()));
 return <div className="component-overview"><PageHeader title="UI Kit" actions={<a className="component-install-link" href="?page=handoff"><Braces size={16}/>Installation & integration<ArrowUpRight size={14}/></a>}/>
 <div className="component-overview-heading"><p>Controls, patterns and data views for your application.</p><Input aria-label="Find a component" placeholder="Find a component…" value={search} onChange={e=>{const url=new URL(location.href);if(e.target.value)url.searchParams.set("find",e.target.value);else url.searchParams.delete("find");history.replaceState(history.state,"",url);window.dispatchEvent(new PopStateEvent("popstate"));}} icon={<Search size={16}/>}/></div>
 <div className="component-family-list">{Object.entries(icons).map(([family,Icon])=>{
 const items=filtered.filter(c=>c.family===family);return items.length>0&&<section key={family}><h2><Icon size={18}/>{family}<span>{items.length}</span></h2><div className="component-family-items">{items.map(c=><a key={c.id} href={c.href}><span>{c.title}</span><span className="component-entry-meta">{c.ready?'Preview & code':'Live example'}<ArrowUpRight size={14}/></span></a>)}</div></section>})}</div>
 {filtered.length===0&&<p className="component-empty" role="status">No components match “{search}”. Try a component name or family.</p>}
 {!search&&<div className="component-collections"><a href="?page=gallery"><ChartNoAxesCombined size={23}/><div><h2>Charts & widgets</h2><p>18 data visualizations and interactive examples</p></div><ArrowUpRight size={17}/></a><a href="?page=event-calendar"><CalendarDays size={23}/><div><h2>Calendars & dates</h2><p>Event scheduling and date selection</p></div><ArrowUpRight size={17}/></a><a href="?page=layouts"><LayoutGrid size={23}/><div><h2>Compositions</h2><p>Components working together in a layout</p></div><ArrowUpRight size={17}/></a></div>}
 </div>;
}
