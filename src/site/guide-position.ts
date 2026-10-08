/** Mark document position, never imply a command was executed successfully. */
export function initGuidePosition(){
 const nav=document.querySelector<HTMLElement>('nav[aria-label="Quickstart steps"],nav[aria-label="First change steps"]');
 if(!nav)return;
 const links=Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href*="#"]'));
 const sections=links.map(link=>document.getElementById(new URL(link.href).hash.slice(1)));
 let pending=false;
 const update=()=>{pending=false;let active=0;sections.forEach((section,index)=>{if(section&&section.getBoundingClientRect().top<=window.innerHeight*.4)active=index});links.forEach((link,index)=>{if(index===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})};
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
}
