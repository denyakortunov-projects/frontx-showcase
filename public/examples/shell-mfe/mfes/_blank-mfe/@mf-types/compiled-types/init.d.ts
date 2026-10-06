/**
 * MFE Bootstrap — executed once when any entry first loads.
 * Creates the minimal FrontX app, registers slices, effects, and API services.
 * Cache/runtime note:
 * - The host app owns the shared runtime via queryCache().
 * - Child apps join that shared QueryClient via queryCacheShared().
 * - Do not add queryCache(), a second createFrontX(), or QueryClientProvider here.
 */
declare const mfeApp: import("@gears-frontx/framework").FrontXApp;
export { mfeApp };
