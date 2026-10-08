export const componentCatalogue = [
 {id:'buttons',title:'Buttons',family:'Actions',file:'Buttons',api:'button',state:'Disabled actions',note:'Primary and secondary actions with local feedback.',props:['variant: default · outline · secondary · ghost','disabled: boolean','onClick: event handler']},
 {id:'input',title:'Text fields',family:'Forms',file:'Input',api:'input',state:'Validation error',note:'A labelled, controlled field with an associated message.',props:['value / onChange: controlled text','aria-invalid: validation state','aria-describedby: associated help or error']},
 {id:'checkbox',title:'Selection',family:'Forms',file:'Checkbox',api:'checkbox',state:'Disabled selection',note:'An explicit choice with controlled checked state.',props:['checked: boolean','onCheckedChange: checked-state callback','disabled: boolean']},
 {id:'status-badges',title:'Status badges',family:'Feedback',file:'Badges',api:'badge',state:'Status variants',note:'State labels that retain their meaning without color.',props:['variant: default · secondary · outline · destructive','children: a readable state label']},
 {id:'tabs',title:'Tabs',family:'Navigation',file:'Tabs',api:'tabs',state:'Disabled settings tab',note:'Related views with keyboard navigation.',props:['defaultValue: initial selected value','TabsTrigger value: unique tab identity','TabsContent value: matching panel identity']},
 {id:'avatar-group',title:'People',family:'Data display',file:'People',api:'avatar',state:'Initials fallback',note:'A group of people with accessible names.',props:['Avatar: person container','AvatarFallback: content when no image is shown','AvatarGroup: shared layout']},
 {id:'table',title:'Data table',family:'Data display',file:'Table',api:'table',state:'Empty result',note:'A small table with application-owned filtering.',props:['Table label: accessible table name','TableHeader / TableBody: semantic sections','TableCell colSpan: empty-state span']},
 {id:'progress',title:'Progress',family:'Feedback',file:'Progress',api:'progress',state:'Completed',note:'A measured value with a readable label.',props:['value: completion value','aria-label: accessible name']},
] as const;
export type ComponentId = typeof componentCatalogue[number]['id'];
export const additionalElements = [
 {title:'Accordion',family:'Disclosure',id:'accordion'}, {title:'Alert',family:'Feedback',id:'alert'},
 {title:'Slider',family:'Forms',id:'slider'}, {title:'Switch',family:'Forms',id:'switch'},
 {title:'Radio group',family:'Forms',id:'radio-group'}, {title:'Textarea',family:'Forms',id:'textarea'},
 {title:'Select',family:'Forms',id:'select'}, {title:'Dropdown menu',family:'Actions',id:'dropdown-menu'},
 {title:'Dialog',family:'Disclosure',id:'dialog'}, {title:'Tooltip',family:'Disclosure',id:'tooltip'},
 {title:'Popover',family:'Disclosure',id:'popover'}, {title:'Skeleton',family:'Feedback',id:'skeleton'},
];
