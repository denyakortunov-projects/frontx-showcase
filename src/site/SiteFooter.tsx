import BrandLockup from './BrandLockup';
import {ArrowUpRight} from 'lucide-react';
import {repos} from './content';
export default function SiteFooter(){return <footer className="site-footer frontx-chrome"><BrandLockup compact/><nav aria-label="Source repositories"><a href={repos.frontx}>GitHub <ArrowUpRight size={14}/></a><a href={repos.templates}>Templates <ArrowUpRight size={14}/></a><a href="/docs/">Documentation</a></nav></footer>}
