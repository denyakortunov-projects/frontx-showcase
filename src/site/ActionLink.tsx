import {Button} from '@gears-frontx/ui-kit/button';
import {ArrowUpRight, ArrowRight} from 'lucide-react';
export default function ActionLink({href,children,primary=false,external=false}:{href:string;children:string;primary?:boolean;external?:boolean}) {
  return <Button render={<a href={href} />} nativeButton={false} role="link" variant={primary?'default':'outline'} className={`site-action${primary ? " site-action--primary" : ""}`} icon={external?<ArrowUpRight size={16}/>:<ArrowRight size={16}/>}>{children}</Button>;
}
