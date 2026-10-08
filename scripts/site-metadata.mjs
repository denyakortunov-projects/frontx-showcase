export const siteOrigin = 'https://frontx.constructor.rocks';
export const defaultDescription = 'FrontX is an open-source development kit for complex web interfaces, designed for AI-assisted coding.';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function siteMetadata({title = 'FrontX · Constructor Fabric', description = defaultDescription, pathname = '/'} = {}) {
  const url = new URL(pathname, siteOrigin); url.search = ''; url.hash = '';
  const image = `${siteOrigin}/brand/frontx-share.png`;
  const meta = (key, content, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(content)}"/>`;
  return [
    '<link rel="icon" href="/favicon.ico?v=constructor-fabric" sizes="16x16 32x32 48x48"/>',
    '<link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png"/>',
    '<link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg?v=constructor-fabric"/>',
    '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=constructor-fabric"/>',
    '<link rel="manifest" href="/site.webmanifest"/>',
    `<link rel="canonical" href="${escape(url.href)}"/>`,
    meta('application-name', 'FrontX'), meta('apple-mobile-web-app-title', 'FrontX'),
    meta('theme-color', '#2852ed'),
    ...Object.entries({'og:type':'website','og:site_name':'FrontX · Constructor Fabric','og:locale':'en_US','og:title':title,'og:description':description,'og:url':url.href,'og:image':image,'og:image:type':'image/png','og:image:width':'1200','og:image:height':'630','og:image:alt':'FrontX by Constructor Fabric. Build complex apps with a shared foundation.'}).map(([k,v])=>meta(k,v,true)),
    meta('twitter:card','summary_large_image'), meta('twitter:title',title), meta('twitter:description',description), meta('twitter:image',image), meta('twitter:image:alt','FrontX by Constructor Fabric — a shared foundation for AI-assisted coding.')
  ].join('\n');
}
