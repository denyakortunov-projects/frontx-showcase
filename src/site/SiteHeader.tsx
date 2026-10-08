import BrandLockup from './BrandLockup';
import {repos} from './content';
export default function SiteHeader({section=''}:{section?:string;search?:string;onVersionChange?:(version:string)=>void}) {
 return <header className="site-header frontx-chrome"><div className="site-header-inner">
  <BrandLockup/>
  <nav className="site-nav" aria-label="Main navigation">
   <a href="/" data-frontx-home aria-current={section===''?'page':undefined}>Home</a>
   <a href="/templates/" aria-current={section==='templates'?'page':undefined}>Templates</a>
   <a href="/showcase/?page=overview" aria-current={section==='kit'?'page':undefined}>UI Kit</a>
   <a href="/libraries/" aria-current={section==='libraries'?'page':undefined}>Libraries</a>
   <a href="/docs/" aria-current={section==='docs'?'page':undefined}>Docs</a>
  </nav>
  <div className="site-header-actions"><a href={repos.frontx} className="fx-github">GitHub</a></div>
 </div></header>;
}
