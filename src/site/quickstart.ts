import { templateRef } from './content';

export const cliVersion = '0.3.0-alpha.7';
const cli = `npm exec --yes --package=@gears-frontx/cli@${cliVersion} -- frontx`;
const source = `github:constructorfabric/gears-frontx-templates`;
export const quickstartSteps = [
  {
    id: 'prepare', title: 'Create a clean workspace', label: 'Workspace',
    description: 'Run these steps in the same terminal. Keep the template inventory local to this workspace; an existing project is not required.',
    code: `mkdir frontx-start && cd frontx-start\nexport FRONTX_INVENTORY_ROOT="$PWD/.frontx-inventory"`,
    result: 'A new workspace with its own template inventory. No global CLI installation.',
  },
  {
    id: 'install', title: 'Install the two templates', label: 'Install templates',
    description: 'Both templates come from the same pinned source revision. The CLI downloads them into the inventory.',
    code: `${cli} install \\\n  ${source}//template-shell@${templateRef}\n${cli} install \\\n  ${source}//template-mfe@${templateRef}`,
    result: 'The CLI reports that frontx-template-shell and frontx-template-mfe are installed.',
  },
  {
    id: 'assemble', title: 'Assemble Shell + MFE', label: 'Assemble project',
    description: 'Seed the host first, then add the microfrontend workspace. These commands use the full template identities, not their directory names.',
    code: `${cli} seed \\\n  @gears-frontx/frontx-template-shell ./my-app\n${cli} add \\\n  @gears-frontx/frontx-template-mfe ./my-app`,
    result: 'The project appears in my-app. Its .frontx directory records both applied templates.',
  },
  {
    id: 'run', title: 'Run the included examples', label: 'Run examples',
    description: 'Install the combined workspace, then start the host and its example microfrontends. Keep this terminal running.',
    code: 'cd my-app\nnpm install\nFRONTX_INCLUDE_TEMPLATE_EXAMPLES=1 npm run dev:all',
    result: 'Open http://localhost:5173. Example screens should appear in the host menu.',
  },
];
