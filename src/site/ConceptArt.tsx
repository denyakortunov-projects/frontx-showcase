/** Decorative, resolution-independent objects shared by the hero and template catalogue. */
export default function ConceptArt({kind}:{kind:'shell'|'mfe'|'guardrails'|'assembly'}) {
 return <div className={`concept-art concept-${kind}`} aria-hidden="true">
  <div className="concept-halo"/>
  {kind==='shell'?<div className="layer-object"><i/><i/><i/></div>:
   kind==='mfe'?<div className="module-object"><i/><i/><i/><i/></div>:
   kind==='guardrails'?<div className="frame-object"><i/><i/><i/><i/><span/></div>:
   <div className="assembly-object"><span className="join-line join-h"/><span className="join-line join-v"/><i/><i/><i/><i/><b/></div>}
 </div>
}
