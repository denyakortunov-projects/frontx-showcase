import { type ChildMfeBridge, type MfeEntryLifecycle } from '@gears-frontx/react';
/**
 * This runtime can be mounted into a new container while an older container's
 * unmount is still settling, so each container gets its own `WidgetAMount` and
 * Root (H3). The app itself is the one module-level app above, never per mount.
 */
declare class WidgetsFixtureALifecycle implements MfeEntryLifecycle<ChildMfeBridge> {
    private readonly mounts;
    private isMounted;
    mount(container: Element | ShadowRoot, bridge: ChildMfeBridge): void;
    unmount(container: Element | ShadowRoot): void | Promise<void>;
}
declare const lifecycle: WidgetsFixtureALifecycle;
export default lifecycle;
