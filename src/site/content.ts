export const repos = {
  fabric: 'https://github.com/constructorfabric',
  frontx: 'https://github.com/constructorfabric/gears-frontx',
  templates: 'https://github.com/constructorfabric/gears-frontx-templates',
};
export const coreRef = 'e372e693db2566e08593390df044964464eadaf8';
export const templateRef = '3b6cddb2a700ae76bc5e1991204e127de566d597';
export const templates = [
  {slug:'shell',name:'Shell',type:'Application foundation',description:'Give your frontend a home.',detail:'A host application that routes and mounts microfrontends, with its own build and development tooling.',path:'template-shell',version:'0.1.0-alpha.5',requires:'A new project',includes:['Application host and layout','Microfrontend mounting and routing','Build and development tooling'],icon:'shell'},
  {slug:'mfe',name:'MFE workspace',type:'Project extension',description:'Make room for independent UI.',detail:'Add a workspace for UI units, with host communication and an independent build. Apply it once, then create units inside it.',path:'template-mfe',version:'0.1.0-alpha.2',requires:'An existing application shell',includes:['An isolated frontend workspace','Host communication boundary','A foundation for multiple UI units'],icon:'mfe'},
  {slug:'guardrails',name:'Design Guardrails',type:'Rules & verification',description:'Keep the team on the same page.',detail:'Add design rules, agent guidance and interface checks to an existing project. This template adds no runtime screen.',path:'template-design-guardrails',version:'0.1.0-alpha.0',requires:'An existing project',includes:['Design standards and conventions','Guidance for coding agents','Interface verification tooling'],icon:'rules'},
];
export const manifestUrl = (path:string) => `${repos.templates}/blob/${templateRef}/${path}/frontx-template.json`;
