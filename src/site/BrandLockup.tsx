export default function BrandLockup({compact=false}:{compact?:boolean}) {
 return <a className={`frontx-lockup${compact?' frontx-lockup--compact':''}`} href="/" data-frontx-home aria-label="Constructor Fabric · FrontX home"><img src="/brand/constructor-weave.svg" width="30" height="30" alt=""/><span>Constructor Fabric</span><span className="frontx-divider" aria-hidden="true">/</span><span>Front<span className="frontx-x">X</span></span>{!compact&&<span className="frontx-gear">Gear</span>}</a>;
}
