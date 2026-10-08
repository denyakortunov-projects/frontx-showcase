import { firstChangeAgentTask } from '../../site/first-change';
export const prerender = true;
export function GET() {
  return new Response(firstChangeAgentTask + '\n', { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
