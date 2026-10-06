/**
 * Data Display Elements Category
 *
 * Demonstrates: Table, Badge, Tooltip
 */
import React from 'react';
interface DataDisplayElementsProps {
    t: (key: string) => string;
    /**
     * Element inside this MFE's shadow root that the tooltip popup portals into.
     * Left to the kit's `<body>` default the popup lands in the light DOM, where
     * neither the adopted component stylesheets nor this host's tokens reach it.
     */
    portalContainer: React.RefObject<HTMLElement | null>;
}
export declare const DataDisplayElements: React.FC<DataDisplayElementsProps>;
export {};
