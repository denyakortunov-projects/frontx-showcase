/**
 * The frame one showcased kit component sits in.
 *
 * Shared by every category so the demos stay uniform, and so the DOM id the
 * category menu scrolls to is written in exactly one place.
 */
import React from 'react';
export interface ElementDemoProps {
    /** Element id from `CATEGORY_ELEMENTS`; the DOM id becomes `element-<id>`. */
    id: string;
    title: string;
    description: string;
    children: React.ReactNode;
}
export declare const ElementDemo: React.FC<ElementDemoProps>;
