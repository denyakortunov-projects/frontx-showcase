/**
 * CategoryMenu Component
 *
 * Renders a tree of the showcase's categories, each with element sub-items.
 * Clicking a category or element scrolls to it.
 * Active element is highlighted.
 */
import React from 'react';
interface CategoryMenuProps {
    /**
     * Translation function from useScreenTranslations
     */
    t: (key: string) => string;
    /**
     * Currently active element ID (for highlighting)
     */
    activeElement?: string;
    /**
     * Container ref to access the shadow root for element queries
     */
    containerRef: React.RefObject<HTMLElement | null>;
}
/**
 * CategoryMenu component for UIKit Elements screen.
 *
 * Displays a hierarchical menu of categories and elements.
 * Clicking an item scrolls to the corresponding section.
 */
export declare const CategoryMenu: React.FC<CategoryMenuProps>;
export {};
