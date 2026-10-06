/**
 * Overlay Elements Category
 *
 * Demonstrates: Dialog
 */
import React from 'react';
interface OverlayElementsProps {
    t: (key: string) => string;
    /**
     * Element inside this MFE's shadow root that the dialog portals into. Left to
     * the kit's `<body>` default the popup lands in the light DOM, where neither
     * the adopted component stylesheets nor this host's tokens reach it.
     */
    portalContainer: React.RefObject<HTMLElement | null>;
}
export declare const OverlayElements: React.FC<OverlayElementsProps>;
export {};
