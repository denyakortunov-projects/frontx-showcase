import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
import { KitThemedLifecycle } from './shared/KitThemedLifecycle';
declare class ProfileLifecycle extends KitThemedLifecycle {
    constructor();
    protected renderContent(bridge: ChildMfeBridge): React.ReactNode;
    mount(container: Element | ShadowRoot, bridge: ChildMfeBridge): void;
}
/**
 * Export a singleton instance of the lifecycle class.
 * Module Federation expects a default export; the handler calls
 * moduleFactory() which returns this module, then validates it
 * has mount/unmount methods.
 */
declare const _default: ProfileLifecycle;
export default _default;
