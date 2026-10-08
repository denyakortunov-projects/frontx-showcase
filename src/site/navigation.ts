// V2 is the public default. Explicit ?v=1 remains a bounded legacy review link.
export function syncSiteNavigation() {
 const version=new URLSearchParams(location.search).get('v')==='1'?'1':'2';
 document.documentElement.dataset.frontxVersion=version;
 document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(link=>{
  const raw=link.getAttribute('href')!;
  if(raw.startsWith('#')||link.hasAttribute('download'))return;
  const url=new URL(raw,location.href);
  if(url.origin!==location.origin||!['/','/templates/','/docs/','/get-started/','/showcase/','/libraries/'].some(path=>path==='/'?url.pathname==='/':url.pathname.startsWith(path)))return;
  if(version==='1')url.searchParams.set('v','1');
  else url.searchParams.delete('v');
  link.href=url.pathname+url.search+url.hash;
 });
}
export function initSiteNavigation() {
 syncSiteNavigation();window.addEventListener('popstate',syncSiteNavigation);
 return ()=>window.removeEventListener('popstate',syncSiteNavigation);
}
