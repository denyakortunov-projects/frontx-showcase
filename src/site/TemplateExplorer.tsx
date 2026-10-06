import {useEffect, useRef, useState} from 'react';
import {Button} from '@gears-frontx/ui-kit/button';
import {Input} from '@gears-frontx/ui-kit/input';
import {Tabs, TabsContent, TabsTrigger} from '@gears-frontx/ui-kit/tabs';
import {SectionTabs} from '../showcase/SectionTabs';
import {ArrowUpRight, FileCode2, FolderOpen, Play, RotateCcw, Search, Layers, Code2} from 'lucide-react';
import CodeBlock from './CodeBlock';
import './template-explorer.css';

export type TemplateFile = {path:string;description:string;content:string;sha256:string;url:string};
type View = 'files'|'example';
const exampleBase='/examples/shell-mfe/';

/** Read-only source navigator. URL state is validated against the pinned file list. */
export default function TemplateExplorer({files,slug,revision}:{files:TemplateFile[];slug:string;revision:string}) {
  const hasExample=slug!=='guardrails';
  const [view,setView]=useState<View>('files');
  const [selected,setSelected]=useState(files[0].path);
  const [filter,setFilter]=useState('');
  const [notice,setNotice]=useState('');
  const [exampleScreen,setExampleScreen]=useState('hello-world');
  useEffect(()=>{
    function restore() {
      const url=new URL(location.href), requested=url.searchParams.get('file');
      const validFile=!requested || files.some(f=>f.path===requested);
      const requestedView=url.searchParams.get('view');
      const validView=!requestedView || requestedView==='files' || (requestedView==='example' && hasExample);
      setSelected(validFile && requested ? requested:files[0].path);
      setView(requestedView==='example' && hasExample?'example':'files');
      setFilter(url.searchParams.get('find')??'');
      setExampleScreen(url.searchParams.get('example')==='blank-home'?'blank-home':'hello-world');
      setNotice(!validFile?'That file is not in this selection. Showing the template manifest.':!validView?'This view is unavailable for this template. Showing files.':'');
      if(!validFile || !validView) {
        if(!validFile) url.searchParams.delete('file');
        if(!validView) url.searchParams.delete('view');
        history.replaceState(null,'',url);
      }
    }
    restore();window.addEventListener('popstate',restore);
    return ()=>window.removeEventListener('popstate',restore);
  },[files,hasExample]);
  function update(nextView:View,nextFile=selected) {
    const url=new URL(location.href);
    url.searchParams.set('view',nextView);url.searchParams.set('file',nextFile);
    if(url.href!==location.href) history.pushState(null,'',url);
    setView(nextView);setSelected(nextFile);setNotice('');
  }
  const file=files.find(f=>f.path===selected)??files[0];
  const shown=files.filter(f=>`${f.path} ${f.description}`.toLowerCase().includes(filter.toLowerCase()));
  return <section className="template-explorer" aria-label="Explore template">
    <Tabs value={view} onValueChange={v=>update(v as View)}>
      <div className="explorer-heading">
        <SectionTabs aria-label="Template views">
          <TabsTrigger value="files"><Code2 size={15}/> Files</TabsTrigger>
          {hasExample && <TabsTrigger value="example"><Play size={14}/> Example</TabsTrigger>}
        </SectionTabs>
        <span className="source-version">Source <code>{revision.slice(0,8)}</code></span>
      </div>
      <p role="status" className={notice?'explorer-notice':'visually-hidden'}>{notice}</p>
      <TabsContent value="files" animate={false}>
        <div className="file-workbench">
          <aside className="file-sidebar" aria-label="Key source files">
            <div className="file-list-heading"><FolderOpen size={17}/><strong>Key files</strong><span>{files.length}</span></div>
            <div className="file-search"><Search size={14}/><Input aria-label="Find a file" placeholder="Find a file…" value={filter} onChange={e=>{
              const value=e.target.value;setFilter(value);
              const url=new URL(location.href);if(value)url.searchParams.set('find',value);else url.searchParams.delete('find');history.replaceState(null,'',url);
            }}/></div>
            <nav className="file-list" aria-label="Files">
              {shown.map(f=><Button key={f.path} variant={f.path===selected?'secondary':'ghost'} aria-current={f.path===selected?'true':undefined} className="file-choice" onClick={()=>update('files',f.path)}>
                <FileCode2 size={16}/><span><strong>{f.path.split('/').pop()}</strong><small>{f.path.includes('/')?f.path.slice(0,f.path.lastIndexOf('/')):'Template root'}</small></span>
              </Button>)}
              {!shown.length && <div className="file-empty"><p>No matching files.</p><Button variant="ghost" size="sm" onClick={()=>{setFilter('');const u=new URL(location.href);u.searchParams.delete('find');history.replaceState(null,'',u);}}>Clear search</Button></div>}
            </nav>
            <p className="file-scope">Selected original files.<br/><a href={files[0].url.replace('/blob/','/tree/').replace('/frontx-template.json','')} className="text-link">Full repository <ArrowUpRight size={13}/></a></p>
          </aside>
          <div className="file-document">
            <header><div><h2>{file.description}</h2><p>{file.path}</p></div><a className="text-link" href={file.url}>GitHub <ArrowUpRight size={14}/></a></header>
            <CodeBlock key={file.path} code={file.content} label={file.path.split('/').pop()!} kind="source"/>
            <footer><span>{file.content.trimEnd().split('\n').length} lines · Unmodified source</span><a href="/template-source/LICENSE.txt">Apache-2.0</a><a href="/template-source/NOTICE.txt">Notice</a></footer>
          </div>
        </div>
      </TabsContent>
      {hasExample && <TabsContent value="example" animate={false}><TemplateExample screen={exampleScreen} onScreen={screen=>{
        const u=new URL(location.href);u.searchParams.set('example',screen);
        if(u.href!==location.href)history.pushState(null,'',u);setExampleScreen(screen);
      }}/></TabsContent>}
    </Tabs>
  </section>;
}

/** Genuine upstream build, loaded only after an explicit preview action. */
function TemplateExample({screen,onScreen}:{screen:string;onScreen:(screen:string)=>void}) {
  const [started,setStarted]=useState(false), [attempt,setAttempt]=useState(0);
  const [status,setStatus]=useState<'idle'|'loading'|'loaded'|'slow'|'error'>('idle');
  const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const frame=useRef<HTMLIFrameElement>(null);
  useEffect(()=>{
    function result(event:MessageEvent) {
      if(event.origin!==location.origin || event.source!==frame.current?.contentWindow || event.data?.type!=='frontx-template-example')return;
      if(event.data.status==='ready'){clearTimeout(timer.current);setStatus('loaded');}
      else if(event.data.status==='error'){clearTimeout(timer.current);setStatus('error');}
      else if(event.data.status==='slow')setStatus(s=>s==='loaded'?s:'slow');
    }
    window.addEventListener('message',result);
    return ()=>{clearTimeout(timer.current);window.removeEventListener('message',result);};
  },[]);
  useEffect(()=>{
    if(!started)return;
    clearTimeout(timer.current);setStatus('loading');
    timer.current=setTimeout(()=>setStatus(s=>s==='loading'?'slow':s),15000);
  },[screen,started,attempt]);
  function start(next=screen) {
    onScreen(next);setStarted(true);setAttempt(x=>x+1);
  }
  return <div className="template-example">
    <div className="example-context"><div><h2>Shell + MFE</h2><p>A composed example from both templates. Adapted for this site’s paths and narrow-screen navigation. The Files tab shows unchanged source.</p></div><a className="text-link" href="/get-started/">Run it locally <ArrowUpRight size={14}/></a></div>
    <div className="example-toolbar">
      <span><Layers size={15}/> Included screens</span>
      <Button variant="outline" size="sm" onClick={()=>start('hello-world')}>Hello World</Button>
      <Button variant="outline" size="sm" onClick={()=>start('blank-home')}>Blank Home</Button>
      {started && <Button variant="ghost" size="sm" onClick={()=>start()} icon={<RotateCcw size={14}/>}>Reload</Button>}
      <a className="text-link" href={`${exampleBase}?screen=${screen}`} target="_blank" rel="noopener noreferrer">Open example <ArrowUpRight size={14}/></a>
    </div>
    {!started ? <div className="example-start"><div className="example-symbol"><Layers size={32}/></div><h3>A host. Two microfrontends.</h3><p>Load the working template example. It uses synthetic data and stays inside this page.</p><Button onClick={()=>start()} icon={<Play size={16}/>}>Load example</Button></div> : <>
      <p role="status" className="example-status">{status==='loading'?'Loading example…':status==='slow'?'This is taking longer than expected. Reload or open the example separately.':status==='error'?'The example reported an error. Try Reload or follow the local guide.':'Example ready. Use its menu to explore.'}</p>
      <iframe key={attempt} ref={frame} title="Live Shell and MFE example" src={`${exampleBase}?screen=${screen}`} sandbox="allow-scripts allow-same-origin" onError={()=>{clearTimeout(timer.current);setStatus('error');}}/>
    </>}
    <details className="source-disclosure"><summary>Build, source and limits</summary><p>Built from template revision 3b6cddb2. The website adapter changes asset and manifest paths, initially collapses the menu on narrow screens, bundles the same menu icons locally, and loads the shared UI Kit stylesheet omitted from the demo manifest. Hello World and Blank Home are the checked scenarios. This is a development example with synthetic data, not a production-ready application. Upstream dependency audit findings remain; see the <a href="/get-started/#verification">verification note</a>.</p><p><a href={`${exampleBase}provenance.json`}>Build provenance</a> · <a href={`${exampleBase}THIRD-PARTY-NOTICES.txt`}>Dependency notices</a></p></details>
  </div>;
}
