import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
import { ThemeAwareReactLifecycle } from '@gears-frontx/react';
declare class CurrentThemeLifecycle extends ThemeAwareReactLifecycle {
    constructor();
    protected renderContent(bridge: ChildMfeBridge): React.ReactNode;
}
/**
 * Export a singleton instance of the lifecycle class.
 * Module Federation expects a default export; the handler calls
 * moduleFactory() which returns this module, then validates it
 * has mount/unmount methods.
 */
declare const _default: CurrentThemeLifecycle;
export default _default;
