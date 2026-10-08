import {lazy,Suspense} from 'react';
import {Tabs,TabsTrigger,TabsContent,Button} from '@gears-frontx/ui-kit';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {SectionTabs} from './SectionTabs';
import {PageHeader} from './PageHeader';
import CodeBlock from '../site/CodeBlock';
import {componentCatalogue} from './component-catalogue';
import './component-guide.css';
const sources=import.meta.glob('./examples/*Example.tsx',{query:'?raw',import:'default',eager:true}) as Record<string,string>;
const previews={
 Buttons:lazy(()=>import('./examples/ButtonsExample')),Input:lazy(()=>import('./examples/InputExample')),
 Checkbox:lazy(()=>import('./examples/CheckboxExample')),Badges:lazy(()=>import('./examples/BadgesExample')),
 Tabs:lazy(()=>import('./examples/TabsExample')),People:lazy(()=>import('./examples/PeopleExample')),
 Table:lazy(()=>import('./examples/TableExample')),Progress:lazy(()=>import('./examples/ProgressExample')),
};
export function ComponentGuide({query,update}:{query:URLSearchParams;update:(values:Record<string,string>)=>Promise<void>}){
 const item=componentCatalogue.find(c=>c.id===query.get('component'));
 if(!item)return <div className="component-not-found"><h1>Component not found</h1><a href="?page=overview">Browse components</a></div>;
 const Preview=previews[item.file];
 const tab=['preview','code','states'].includes(query.get('tab')||'')?query.get('tab')!:'preview';
 const source=sources[`./examples/${item.file}Example.tsx`];
 return <div className="component-guide">
  <a className="component-back" href="?page=overview"><ArrowLeft size={15}/>All components</a>
  <PageHeader title={item.title} actions={<span className="showcase-page-meta">{item.family}</span>}/>
  <p className="component-summary">{item.note}</p>
  <Tabs value={tab} onValueChange={value=>void update({tab:String(value)})}>
   <SectionTabs aria-label="Component example"><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Code</TabsTrigger><TabsTrigger value="states">States</TabsTrigger></SectionTabs>
   <TabsContent value="preview"><div className="component-demo"><Suspense fallback={<p role="status">Loading example…</p>}><Preview key={item.id}/></Suspense></div></TabsContent>
   <TabsContent value="code"><CodeBlock label={`${item.title} example`} kind="source" code={source}/></TabsContent>
   <TabsContent value="states"><div className="component-state-label">{item.state}</div><div className="component-demo"><Suspense fallback={<p role="status">Loading example…</p>}><Preview key={`${item.id}-state`} disabled invalid empty complete/></Suspense></div></TabsContent>
  </Tabs>
  <div className="component-guide-bottom"><section><h2>Use in your app</h2><CodeBlock label="Install UI Kit" code="npm install @gears-frontx/ui-kit@0.4.0-alpha.5"/><p>The example includes the theme import. Load it once in your application entry. Preview state props belong to this example, not to the UI Kit API.</p><a href={`/handoff/components/${item.file}Example.tsx`} download>Download this example<ArrowUpRight size={14}/></a></section>
  <section><h2>Component contract</h2><ul>{item.props.map(prop=><li key={prop}><code>{prop}</code></li>)}</ul><a href={`/handoff/components/${item.api}.d.ts`}>Type definitions · 0.4.0-alpha.5<ArrowUpRight size={14}/></a>{item.id==='table'&&<p>This example uses Table primitives. Filtering belongs to the example; it does not document a DataTable API.</p>}</section></div>
 </div>;
}
