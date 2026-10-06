import{createFrontX as l,effects as x,queryCacheShared as c,mock as a,ThemeAwareReactLifecycle as f}from"@gears-frontx/react";var d={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=Symbol.for("react.transitional.element"),p=Symbol.for("react.fragment");function i(u,e,t){var r=null;if(t!==void 0&&(r=""+t),e.key!==void 0&&(r=""+e.key),"key"in e){t={};for(var n in e)n!=="key"&&(t[n]=e[n])}else t=e;return e=t.ref,{$$typeof:m,type:u,key:r,ref:e!==void 0?e:null,props:t}}s.Fragment=p;s.jsx=i;s.jsxs=i;d.exports=s;var o=d.exports;const v=l().use(x()).use(c()).use(a()).build();class E extends f{constructor(){super(v)}mount(e,t,r){console.info(`[widget-b ${t.extensionId}] mount`),super.mount(e,t,r)}renderContent(e){return o.jsxs("div",{"data-fixture-id":"widgets-fixture-b",className:"m-2 rounded-lg border-2 border-muted-foreground bg-muted p-4 text-foreground",children:[o.jsx("strong",{children:"Widget B (fixture-b)"}),o.jsx("p",{className:"mt-1 text-sm",children:"Mounted concurrently in the widgets domain."})]})}}const h=new E;export{h as default};
