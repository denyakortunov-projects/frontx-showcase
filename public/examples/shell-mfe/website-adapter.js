/* FrontX website hosting adapter. Original template sources remain unchanged.
 * Only the pinned example's manifest gets origin substitution. No other fetch
 * is intercepted. CSP prevents connections to external origins.
 */
(() => {
  const manifestPath = '/examples/shell-mfe/generated-mfe-manifests.json';
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input), location.href);
    const response = await originalFetch(input, init);
    if (url.origin !== location.origin || url.pathname !== manifestPath || !response.ok) return response;
    return new Response((await response.text()).replaceAll('__FRONTX_EXAMPLE_ORIGIN__', location.origin), {
      status: response.status, headers: {'Content-Type':'application/json'},
    });
  };
  const report = status => parent !== window && parent.postMessage({type:'frontx-template-example',status},location.origin);
  window.addEventListener('error',()=>report('error'));
  window.addEventListener('unhandledrejection',()=>report('error'));
  let ticks = 0;
  function hasScreen(root) {
    for (const element of root.querySelectorAll('*')) {
      if (element.shadowRoot && (element.shadowRoot.querySelector('h1') || hasScreen(element.shadowRoot))) return true;
    }
    return false;
  }
  const check = setInterval(()=>{
    if (hasScreen(document)) { clearInterval(check); report('ready'); }
    else if (++ticks >= 60) { clearInterval(check); report('slow'); }
  },250);
})();
