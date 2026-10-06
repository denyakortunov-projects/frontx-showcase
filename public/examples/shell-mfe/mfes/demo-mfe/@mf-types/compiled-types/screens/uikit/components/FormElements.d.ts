/**
 * Form Elements Category
 *
 * Demonstrates: Field, Label, Input, Textarea, Select, Checkbox, RadioGroup, Switch
 */
import React from 'react';
interface FormElementsProps {
    t: (key: string) => string;
    /**
     * Element inside this MFE's shadow root that Select's popup portals into.
     * Left to the kit's `<body>` default the popup lands in the light DOM, where
     * neither the adopted component stylesheets nor this host's tokens reach it.
     */
    portalContainer: React.RefObject<HTMLElement | null>;
}
export declare const FormElements: React.FC<FormElementsProps>;
export {};
