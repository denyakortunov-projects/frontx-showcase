import {useEffect,useState} from 'react';
import {Button} from '@gears-frontx/ui-kit/button';
import {SegmentedControl} from '../showcase/SegmentedControl';
import {PanelsTopLeft, Layers, Component, Braces, ArrowUpRight, Check, Boxes, Palette, Workflow} from 'lucide-react';
const steps = [
 {id:'templates',label:'Templates',title:'A starting point. Not a blank page.',text:'Shell, MFE workspace and design rules give your project a structure.',href:'/templates/',link:'Explore templates',icon:PanelsTopLeft},
 {id:'libraries',label:'Libraries',title:'Choose the parts your project needs.',text:'Add runtime capabilities, API services and, optionally, the FrontX UI Kit.',href:'/libraries/',link:'Explore libraries',icon:Component},
 {id:'app',label:'Your app',title:'Your interface. Your business logic.',text:'Connect UI units inside a shell. Use the visual layer that fits your product.',href:'/get-started/',link:'Choose a starting path',icon:Boxes},
];
export default function AssemblyDiagram() {
 const [step,setStep]=useState('templates'); const [ready,setReady]=useState(false);
 useEffect(()=>{const read=()=>{const next=new URLSearchParams(location.search).get('scene');setStep(steps.some(s=>s.id===next)?next!:'templates')};read();setReady(true);window.addEventListener('popstate',read);return()=>window.removeEventListener('popstate',read)},[]);
 const select=(next:string)=>{setStep(next);const url=new URL(location.href);url.searchParams.set('scene',next);history.pushState({},'',url)};
 const current=steps.find(s=>s.id===step)!;
 return <div className="assembly" data-scene={step}>
   <div className="assembly-toolbar"><span><Workflow size={14}/> How FrontX fits together</span><span className="assembly-count">0{steps.indexOf(current)+1} / 03</span></div>
   <div className="assembly-stage" aria-label="Illustration of templates, libraries and application structure">
    <div className="orbit-ring ring-one" aria-hidden="true"/><div className="orbit-ring ring-two" aria-hidden="true"/>
    <div className="assembly-plane plane-shell"><div className="plane-heading"><PanelsTopLeft size={17}/><strong>Shell</strong><span>Host & navigation</span></div><div className="app-interior"><div className="app-sidebar"><Boxes size={17}/><i/><i/><i/></div><div className="app-units"><div><Component size={17}/><span>UI unit A</span></div><div><Layers size={17}/><span>UI unit B</span></div><p>Your product logic</p></div></div></div>
    <div className="assembly-plane plane-mfe"><div className="plane-heading"><Layers size={17}/><strong>MFE workspace</strong><span>Independent UI units</span></div><div className="module-slots"><span>UI unit A</span><span>UI unit B</span><span>+ Your code</span></div></div>
    <div className="assembly-plane plane-library"><div className="plane-heading"><Braces size={17}/><strong>{step==='templates'?'Design Guardrails':'Libraries'}</strong><span>{step==='templates'?'Rules & checks':'Reusable capabilities'}</span></div><div className="library-chips">{step==='templates'?<><span>Design rules</span><span>Agent guidance</span><span>Verification</span></>:<><span>Runtime</span><span>API</span><span><Palette size={12}/> UI Kit <small>optional</small></span></>}</div></div>
   </div>
   <div className="assembly-explanation" aria-live="polite"><h2>{current.title}</h2><p>{current.text}</p><a href={current.href}>{current.link}<ArrowUpRight size={14}/></a></div>
   <div className="assembly-controls">{ready?<SegmentedControl label="Explore FrontX layers" value={step} onChange={select} options={steps.map(s=>({value:s.id,label:s.label}))}/>:<span className="assembly-loading">Templates · Libraries · Your app</span>}<Button variant="ghost" disabled={!ready} aria-label="Next diagram step" onClick={()=>select(steps[(steps.indexOf(current)+1)%steps.length].id)} icon={<ArrowUpRight size={17}/>} /></div>
   <p className="diagram-caption">Architecture illustration · CLI + AI Kit help assemble and update the project.</p>
 </div>
}
