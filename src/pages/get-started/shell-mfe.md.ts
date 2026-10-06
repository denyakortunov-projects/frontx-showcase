import { quickstartSteps, cliVersion } from '../../site/quickstart';
import { repos, templateRef } from '../../site/content';
export const prerender = true;
export function GET() {
  const text = `# FrontX: run Shell + MFE

Tested environment: Node.js 25.1.0, npm 11.6.2. Commands use a macOS/Linux shell.
Upstream CI targets Node.js 24.14+; that minimum has not been verified locally.
Verified on 6 October 2026, macOS, Node.js 25.1.0, npm 11.6.2.
CLI: ${cliVersion}. Template revision: ${templateRef}.
Source: ${repos.templates}/tree/${templateRef}

Use a new folder and the same terminal for every step. Free localhost ports 5173, 3001, 3099, 3201 and 3202. No global CLI installation is needed.

${quickstartSteps.map((s,i)=>`## ${i+1}. ${s.title}\n\n${s.description}\n\n\`\`\`sh\n${s.code}\n\`\`\`\n\nExpected: ${s.result}`).join('\n\n')}

Choose Hello World in the menu: expect “Hello World from MFE”. Choose Blank Home to load another module. Without FRONTX_INCLUDE_TEMPLATE_EXAMPLES=1, template examples are deliberately hidden. Stop servers with Ctrl+C.

## Next step

Make your first change: /docs/first-change.md — edit the existing Blank Home English title, then rebuild and reopen it.

## Verification boundary

Template install, seed, add, dependency installation, build, type-check and the Hello World / Blank Home browser path passed, including Back and reload. This is a development example, not a production-readiness claim. Its dependency tree reported 23 npm audit findings (1 low, 11 moderate, 11 high); upstream dependencies were not changed. Run npm audit and review affected packages before adopting this example. Production deployment, authentication, upgrades, Windows and the minimum Node.js version were not verified locally. AI Kit setup is a separate, untested path.

The templates README (${repos.templates}/blob/${templateRef}/README.md#consuming-a-template) shows “seed shell --source …” and “add mfe --source …”, which differ from CLI ${cliVersion}; this guide follows the published CLI help and the commands actually exercised. After adding MFE, npm install updates the Shell-only lockfile with the new workspace.
`;
  return new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
