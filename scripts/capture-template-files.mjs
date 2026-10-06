/** Refresh selected, unmodified source files from the pinned template checkout. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.argv[2];
if(!root) throw new Error('Pass the pinned template repository directory');
const ref='3b6cddb2a700ae76bc5e1991204e127de566d597';
const selections={
  shell: {folder:'template-shell', files:[
    ['frontx-template.json','Template identity and ownership'],
    ['src-app/app/main.tsx','Create the host and register its services'],
    ['src-app/app/App.tsx','Application providers and layout'],
    ['src-app/app/mfe/bootstrap.ts','Register and load microfrontends'],
    ['vite.config.ts','Host build configuration'],
  ]},
  mfe: {folder:'template-mfe',files:[
    ['frontx-template.json','Workspace identity and ownership'],
    ['src-app/mfe_packages/demo-mfe/mfe.json','Declare the example screens'],
    ['src-app/mfe_packages/demo-mfe/src/lifecycle-helloworld.tsx','Mount and unmount Hello World'],
    ['src-app/mfe_packages/demo-mfe/src/screens/helloworld/HelloWorldScreen.tsx','The Hello World screen'],
    ['src-app/mfe_packages/demo-mfe/vite.config.ts','Expose independently built modules'],
    ['src-app/mfe_packages/_blank-mfe/src/lifecycle.tsx','The Blank Home entry'],
  ]},
  guardrails: {folder:'template-design-guardrails',files:[
    ['frontx-template.json','Template identity and ownership'],
    ['DESIGN.md','Design conventions for a project'],
    ['src-app/verify_packages/design-verify/src/dev-entry.ts','Development-time verification entry'],
    ['src-app/verify_packages/design-verify/runner/config.mjs','Verification runner configuration'],
  ]},
};
const snapshot={ref,repository:'https://github.com/constructorfabric/gears-frontx-templates',templates:{}};
for(const [slug,{folder,files}] of Object.entries(selections)) {
  snapshot.templates[slug]=files.map(([file,description])=>{
    const content=fs.readFileSync(path.join(root,folder,file),'utf8');
    return {path:file,description,content,sha256:crypto.createHash('sha256').update(content).digest('hex'),url:`${snapshot.repository}/blob/${ref}/${folder}/${file}`};
  });
}
fs.mkdirSync('src/site/data',{recursive:true});
fs.writeFileSync('src/site/data/template-files.json',JSON.stringify(snapshot,null,2)+'\n');
fs.mkdirSync('public/template-source',{recursive:true});
for(const name of ['LICENSE','NOTICE']) fs.copyFileSync(path.join(root,name),`public/template-source/${name}.txt`);
console.log('Captured 15 original source files; Apache LICENSE and NOTICE preserved.');
