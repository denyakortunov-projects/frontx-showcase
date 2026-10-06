/**
 * widgets-fixture-b — leaf widget MFE lifecycle.
 *
 * Renders a labelled card inside the widgets domain slot. Mounts concurrently
 * alongside widgets-fixture-a's alpha/beta instances under the widgets domain's
 * `ConcurrentMountStrategy` (owned by demo-mfe's child FrontX app at runtime).
 */
import React from 'react';
import { ThemeAwareReactLifecycle, type ChildMfeBridge, type MfeMountContext } from '@gears-frontx/react';
declare class WidgetsFixtureBLifecycle extends ThemeAwareReactLifecycle {
    constructor();
    mount(container: Element | ShadowRoot, bridge: ChildMfeBridge, mountContext?: MfeMountContext): void;
    protected renderContent(_bridge: ChildMfeBridge): React.ReactNode;
}
declare const _default: WidgetsFixtureBLifecycle;
export default _default;
