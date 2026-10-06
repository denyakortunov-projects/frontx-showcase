import { repos, templateRef } from './content';

export const homeDirectory = 'src-app/mfe_packages/_blank-mfe/src/screens/home';
export const translationPath = `${homeDirectory}/i18n/en.json`;
export const firstChangeTitle = 'Make your first change.';
export const firstChangeDescription = 'Change the title of Blank Home and see it inside your running Shell.';
export const firstChangePrerequisite = 'Complete Run Shell + MFE first. Use the existing my-app folder, with dependencies installed. Stop its running dev:all process with Ctrl+C and stay in the project root—the folder containing package.json.';
export const editedTranslation = {
  title: 'Project overview',
  description: 'Your first change is running inside the Shell.',
  bridge_info: 'Bridge Info',
  domain_id: 'Domain ID:',
  instance_id: 'Instance ID:',
  current_theme: 'Current Theme:',
  current_language: 'Current Language:',
};
export const sourceFile = (path: string) => `${repos.templates}/blob/${templateRef}/template-mfe/${path}`;
export const projectFiles = [
  { name: 'HomeScreen.tsx', path: `${homeDirectory}/HomeScreen.tsx`, role: 'Screen layout, UI Kit components and bridge subscriptions.' },
  { name: 'i18n/en.json', path: translationPath, role: 'English text for this screen. This is the file you will edit.' },
  { name: 'mfe.json', path: 'src-app/mfe_packages/_blank-mfe/mfe.json', role: 'Module registration and the Blank Home menu entry. Leave it unchanged.' },
];
export const firstChangeSteps = [
  { id: 'locate', title: 'Find the screen', description: 'Blank Home belongs to _blank-mfe. You are changing an included example, not creating a new microfrontend. Keep the application host in src-app/app unchanged.' },
  { id: 'edit', title: 'Change the English text', description: `Open ${translationPath}. Change title and description; keep the other five keys. The complete file for this pinned example is shown below. If you have already customized it, edit only those two values.`, label: 'English screen text', code: JSON.stringify(editedTranslation, null, 2), kind: 'source' as const, result: 'The screen title becomes Project overview. The menu entry remains Blank Home.' },
  { id: 'check', title: 'Check and restart', description: 'Run from the my-app project root. The first command checks the workspace’s TypeScript; dev:all rebuilds the microfrontends, parses their JSON and starts the previews.', label: 'Check and restart', code: 'npm run type-check --workspace=@gears-frontx/blank-mfe\nFRONTX_INCLUDE_TEMPLATE_EXAMPLES=1 npm run dev:all', kind: 'commands' as const, result: 'Keep the terminal running. Restart dev:all after changes inside mfe_packages, including translation JSON: these microfrontends are built previews, not hot-reloaded screens.' },
  { id: 'see', title: 'Open Blank Home', description: 'Open http://localhost:5173 and choose Blank Home. With the host language set to English, the screen should show the title and description below. Other language files are unchanged.' },
];
export const firstChangeTroubleshooting = [
  { title: 'The menu has no example screens', text: 'Stop the development servers and restart with FRONTX_INCLUDE_TEMPLATE_EXAMPLES=1 npm run dev:all. The templates deliberately hide their example entries without this flag.' },
  { title: 'The old title is still visible', text: 'Check that you changed _blank-mfe/src/screens/home/i18n/en.json, that the host language is English, and that you restarted dev:all after saving. Then reload the browser. Editing the translation changes the page title, not the Blank Home menu label.' },
  { title: 'The workspace or a port cannot be found', text: 'Run from my-app, not from the outer frontx-start folder or the template inventory. Complete npm install from the quickstart. The examples use ports 5173, 3001, 3099, 3201 and 3202; stop a previous run before restarting.' },
];
export const provenanceNote = '.frontx/provenance.json records which templates and source versions were applied. It does not prove that your local edits will merge automatically. Keep a recoverable copy of your work and review changes before any upgrade. Do not rerun seed or add to refresh this screen; the MFE template is applied once per project.';

export function firstChangeMarkdown() {
  return `# FrontX: ${firstChangeTitle}\n\n${firstChangeDescription}\n\nPrerequisite: ${firstChangePrerequisite}\nQuickstart: /get-started/shell-mfe.md\nTemplate revision: ${templateRef}\n\n${firstChangeSteps.map((s, i) => `## ${i + 1}. ${s.title}\n\n${s.description}${s.id === 'locate' ? '\n\n' + projectFiles.map(f => `- ${f.path}: ${f.role}\n  Source: ${sourceFile(f.path)}`).join('\n') : ''}${'code' in s ? `\n\n\`\`\`${s.kind === 'source' ? 'json' : 'sh'}\n${s.code}\n\`\`\`\n\n${s.result}` : ''}${s.id === 'see' ? `\n\nExpected:\n${editedTranslation.title}\n${editedTranslation.description}\n\nThe menu label stays Blank Home.` : ''}`).join('\n\n')}\n\n## Troubleshooting\n\n${firstChangeTroubleshooting.map(f => `### ${f.title}\n\n${f.text}`).join('\n\n')}\n\n## Keep track of your changes\n\n${provenanceNote}\n\nVerification: the two-string change passed the existing workspace type-check and build on macOS, Node.js 25.1.0 / npm 11.6.2. The unchanged Shell + MFE startup and two-screen route were checked in the preceding quickstart. This is a small edit to a development example; upgrade, new-MFE creation and production integration are outside this guide. See /get-started/#verification for the pinned example's dependency-audit findings.\n`;
}
