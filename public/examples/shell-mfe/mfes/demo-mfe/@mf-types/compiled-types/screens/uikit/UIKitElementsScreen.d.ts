/**
 * UIKit Elements Screen
 *
 * Showcase of @gears-frontx/ui-kit's published component surface.
 * Features:
 * - CategoryMenu over the kit's categories
 * - One demo per exported kit component
 * - Lazy loading for category components
 * - Scroll-to-element navigation
 * - i18n support for all text
 * - Theme and language reactivity via bridge
 */
import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
interface UIKitElementsScreenProps {
    bridge: ChildMfeBridge;
}
/**
 * UIKit Elements Screen component.
 *
 * Displays a showcase of every component @gears-frontx/ui-kit exports, with:
 * - CategoryMenu navigation
 * - Lazy-loaded category sections
 * - Scroll-to-element functionality
 * - Full i18n support
 * - Theme and language reactivity
 */
export declare const UIKitElementsScreen: React.FC<UIKitElementsScreenProps>;
export {};
