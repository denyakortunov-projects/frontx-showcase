import {useEffect,useRef,useState} from 'react';
export default function BlueprintScene(){
 const svgRef=useRef<SVGSVGElement>(null);const rootRef=useRef<HTMLDivElement>(null);const [cycle,setCycle]=useState(0);
 useEffect(()=>{const root=rootRef.current,hero=root?.closest<HTMLElement>('.fx-hero');if(!root||!hero)return;
  const align=()=>{const svg=svgRef.current;if(!svg)return;const a=svg.getBoundingClientRect(),b=hero.getBoundingClientRect();if(!a.width)return;hero.style.setProperty('--bp-grid',`${a.width/768*12}px`);hero.style.setProperty('--bp-grid-x',`${a.left-b.left}px`);hero.style.setProperty('--bp-grid-y',`${a.top-b.top}px`);};
  let active=false;const activate=()=>{const r=root.getBoundingClientRect();const next=document.documentElement.dataset.frontxVersion==='1'&&r.width>0&&r.bottom>0&&r.top<innerHeight;if(next&&!active)setCycle(v=>v+1);active=next;align();};
  const resize=new ResizeObserver(align);resize.observe(root);resize.observe(hero);
  const visible=new IntersectionObserver(activate,{threshold:.1});visible.observe(root);
  const version=new MutationObserver(activate);version.observe(document.documentElement,{attributes:true,attributeFilter:['data-frontx-version']});activate();
  return()=>{resize.disconnect();visible.disconnect();version.disconnect();};},[]);
 return <div ref={rootRef} className="blueprint-scene">
 <svg key={cycle} ref={svgRef} viewBox="0 0 768 552" role="img" aria-labelledby="blueprint-title blueprint-desc">
 <title id="blueprint-title">FrontX: App Shell, Screen Template and UI Kit</title><desc id="blueprint-desc">An application shell, a self-contained screen and shared interface controls draw in sequence, with a short label for each part.</desc>
 <g className="bp-layer bp-shell">
  <rect pathLength="1" className="bp-outline" x="48" y="72" width="528" height="348" rx="18"/>
  <g className="bp-detail">
   <path className="bp-divider" d="M48 132H576M120 132V420"/>
   <rect className="bp-fill" x="72" y="96" width="120" height="10" rx="5"/>
   <rect className="bp-fill" x="516" y="96" width="36" height="10" rx="5"/>
   {[168,216,264,312].map((y,i)=><g key={y}><rect className={i===0?'bp-solid':'bp-fill'} x="72" y={y} width="24" height="24" rx="6"/>{i===0&&<g className="bp-nav-glyph">{[0,1,2,3].map(n=><rect key={n} x={78+n%2*7} y={174+Math.floor(n/2)*7} width="5" height="5" rx="1"/>)}</g>}</g>)}
   <circle className="bp-fill" cx="84" cy="384" r="10"/>
  </g>
  <g className="bp-label bp-label-shell"><circle cx="432" cy="72" r="3.5"/><path pathLength="1" d="M432 72V48H456"/><text x="468" y="48" dominantBaseline="middle">App Shell</text></g>
 </g>
 <g className="bp-layer bp-module">
  <rect pathLength="1" className="bp-outline bp-module-surface" x="144" y="156" width="384" height="228" rx="14"/>
  <g className="bp-detail">
   <rect className="bp-highlight" x="168" y="180" width="36" height="36" rx="9"/>
   <rect className="bp-fill" x="216" y="180" width="144" height="10" rx="5"/>
   <rect className="bp-fill" x="216" y="202" width="96" height="8" rx="4"/>
   <rect className="bp-highlight" x="444" y="180" width="60" height="28" rx="7"/>
   <rect className="bp-soft" x="168" y="240" width="336" height="120" rx="10"/>
   {[260,296,332].map((y,i)=><g key={y}><rect className="bp-fill" x="180" y={y} width="16" height="16" rx="4"/><rect className="bp-fill" x="208" y={y+4} width={i===1?108:132} height="8" rx="4"/><rect className="bp-tag" x="420" y={y} width="66" height="16" rx="8"/></g>)}
   <path className="bp-divider" d="M180 288H492M180 324H492"/>
  </g>
  <g className="bp-label bp-label-module"><circle cx="528" cy="252" r="3.5"/><path pathLength="1" d="M528 252H600"/><text x="612" y="252" dominantBaseline="middle">Screen Template</text></g>
 </g>
 <g className="bp-layer bp-kit">
  <rect pathLength="1" className="bp-outline bp-kit-surface" x="180" y="456" width="408" height="72" rx="14"/>
  <g className="bp-detail">
   <rect className="bp-action" x="196" y="476" width="66" height="32" rx="8"/>
   <rect className="bp-control" x="274" y="476" width="132" height="32" rx="8"/>
   <circle cx="288" cy="490" r="5"/><path d="M292 494L296 498"/>
   <rect className="bp-fill" x="306" y="487" width="78" height="7" rx="3.5"/>
   <rect className="bp-action" x="420" y="480" width="24" height="24" rx="6"/><path className="bp-check" d="M426 492L431 497L439 487"/>
   <rect className="bp-action" x="458" y="480" width="48" height="24" rx="12"/><circle className="bp-knob" cx="494" cy="492" r="8"/>
   <rect className="bp-control" x="520" y="480" width="48" height="24" rx="6"/><rect className="bp-fill" x="530" y="489" width="28" height="6" rx="3"/>
  </g>
  <g className="bp-label bp-label-kit"><circle cx="588" cy="492" r="3.5"/><path pathLength="1" d="M588 492H612"/><text x="624" y="492" dominantBaseline="middle">UI Kit</text></g>
 </g>
 </svg>
 </div>;
}
