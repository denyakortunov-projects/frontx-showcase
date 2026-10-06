import { firstChangeMarkdown } from '../../site/first-change';
export const prerender = true;
export function GET() {
  return new Response(firstChangeMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
