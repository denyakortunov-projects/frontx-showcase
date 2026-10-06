import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
import { ThemeAwareReactLifecycle } from '@gears-frontx/react';
declare class BlankMfeLifecycle extends ThemeAwareReactLifecycle {
    constructor();
    /**
     * The base class adopts the host document's stylesheets into the shadow root;
     * the kit's tokens are not among them, and this is the hook the base class
     * documents for exactly that gap.
     *
     * These tokens compose with the base resets the same base class injects:
     * `injectBaseResets` paints `:host` with `var(--foreground)` and
     * `var(--background)` (full CSS colours since the shell's token migration),
     * and the kit declares those same names as complete colours on the same
     * `:host`, so the host paints in the kit's palette for the active theme.
     * The kit's own `[data-theme]` rule paints the screen root, which is the
     * shadow root's only rendered child and sits at the host's origin covering
     * its full width and height. A screen that leaves part of the host
     * uncovered has to paint the host itself.
     *
     * `@gears-frontx/mfes` exports `injectStylesheet`, which is these three lines
     * plus id-keyed idempotency, and is deliberately not used: it takes a
     * `ShadowRoot` where this hook is handed `Element | ShadowRoot`, and the
     * package is not a runtime dependency of an MFE.
     */
    protected initializeStyles(container: Element | ShadowRoot): void;
    protected renderContent(bridge: ChildMfeBridge): React.ReactNode;
}
/**
 * Export a singleton instance of the lifecycle class.
 * Module Federation expects a default export; the handler calls
 * moduleFactory() which returns this module, then validates it
 * has mount/unmount methods.
 */
declare const _default: BlankMfeLifecycle;
export default _default;
