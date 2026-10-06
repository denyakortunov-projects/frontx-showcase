import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
import { KitThemedLifecycle } from './shared/KitThemedLifecycle';
declare class UIKitElementsLifecycle extends KitThemedLifecycle {
    constructor();
    protected renderContent(bridge: ChildMfeBridge): React.ReactNode;
}
/**
 * Export a singleton instance of the lifecycle class.
 * Module Federation expects a default export; the handler calls
 * moduleFactory() which returns this module, then validates it
 * has mount/unmount methods.
 */
declare const _default: UIKitElementsLifecycle;
export default _default;
