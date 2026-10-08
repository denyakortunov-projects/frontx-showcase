import {useEffect,useRef,useState} from 'react';
const parts=['chassis','content','navigation','search','side','module'];
type Phase='waiting'|'playing'|'complete'|'fallback';
export default function ReliefScene(){
 const scene=useRef<HTMLDivElement>(null);
 const loaded=useRef(new Set<string>());
 const failed=useRef(false);
 const [phase,setPhase]=useState<Phase>('waiting');
 const arrived=(part:string)=>{
  loaded.current.add(part);
  if(!failed.current&&loaded.current.size===parts.length)setPhase(current=>current==='waiting'?'playing':current);
 };
 const fallback=()=>{failed.current=true;setPhase('fallback');};
 useEffect(()=>{
  scene.current?.querySelectorAll<HTMLImageElement>('.relief-part').forEach(img=>{
   if(img.complete){if(img.naturalWidth)loaded.current.add(img.dataset.part!);else fallback();}
  });
  if(!failed.current&&loaded.current.size===parts.length)setPhase('playing');
  const timeout=window.setTimeout(()=>setPhase(current=>current==='waiting'?'fallback':current),8000);
  return()=>window.clearTimeout(timeout);
 },[]);
 return <div ref={scene} className={`relief-scene relief-${phase}${phase==='complete'?' relief-playing':''}`} role="img" aria-label="A FrontX application assembled from its shell, navigation, search and screen templates.">
  <div className="relief-aura" aria-hidden="true"/>
  <div className="relief-render">{parts.map(part=><img className={`relief-part relief-${part}`} key={part} data-part={part} src={`/images/${part==='chassis'?'frontx-soft-insertion':part==='navigation'?'frontx-insertion':'frontx-material'}/${part}.png`} width="1920" height="900" alt="" aria-hidden="true" onLoad={()=>arrived(part)} onError={fallback} onAnimationEnd={part==='module'?event=>{if(event.animationName==='relief-insert')setPhase(current=>current==='playing'?'complete':current)}:undefined} fetchPriority={part==='chassis'?'high':'auto'} />)}
   {phase==='fallback'&&<img className="relief-poster" src="/images/frontx-material/assembled.png" width="1920" height="900" alt="" aria-hidden="true"/>}
  </div>
  <noscript><style>{'.relief-scene .relief-part{opacity:1;translate:0 0}'}</style></noscript>
 </div>;
}
