/**
 * MFE Bootstrap
 *
 * Creates the MFE-local FrontX app instance, registers slices with effects,
 * and registers API services. This module is imported once (as a side effect)
 * by ThemeAwareReactLifecycle, which provides the FrontXProvider to all screens.
 *
 * The MFE bundles its own copy of @gears-frontx/react, giving it isolated singletons:
 * - eventBus (no cross-MFE event leakage)
 * - apiRegistry (isolated service instances)
 * - storeInstance (isolated Redux store)
 */
declare const mfeApp: import("@gears-frontx/framework").FrontXApp;
export { mfeApp };
