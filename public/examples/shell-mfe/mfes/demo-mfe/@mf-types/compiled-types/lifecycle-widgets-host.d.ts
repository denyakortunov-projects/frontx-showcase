/**
 * demo-mfe widgets-host lifecycle.
 *
 * Constructs a nested FrontX app that owns the widgets ExtensionDomain (per
 * Phase 1.5 audit Q5 single-owner rule). The widgets domain GTS instance is
 * authored inside `demo-mfe/mfe.json`'s `domains[]` array — content-addressed
 * by its GTS instance ID and registered into the nested type system from the
 * global runtime-fetched manifest. TypeScript transports the entity, never
 * defines it.
 *
 * Discovery follows the Phase 5.6 runtime-fetch contract: this nested app
 * fetches the same `generated-mfe-manifests.json` the host bootstrap fetches.
 * For each MFE package in the global manifest, schemas / manifest / domains /
 * entries are registered opaquely on the nested type system (Phase 6.7 order:
 * schemas → manifest → domains → entries → extensions). The widgets domain
 * instance is located in the registered domains by its GTS instance ID, then
 * the nested app takes ownership via `registry.registerDomain(domain, factory)`.
 * Extensions whose `domain` matches the widgets domain are registered opaquely
 * on the nested registry. No build-time imports of foreign-package mfe.json
 * files, no hardcoded URLs, no GTS-entity decomposition in L4 code.
 *
 * The widgets domain is itself routed (its own flat `route: "widgets"`,
 * admitted by this nested app's own injected `FrameworkRouter` — ADR 0036):
 * `WidgetsHostScreen`'s own domain-slot attach starts that router's observer
 * for this domain, and every settled mount/unmount is reflected into the URL
 * automatically from there, exactly like the shell's own domains — this
 * module builds no routing wiring of its own.
 */
import React from 'react';
import { ThemeAwareReactLifecycle, type ExtensionDomain, type FrontXApp, type ChildMfeBridge, type MfeMountContext } from '@gears-frontx/react';
export declare const widgetsHostApp: FrontXApp;
/**
 * Bootstrap demo-mfe's widgets-host child runtime:
 *   1. Fetch the global manifest at runtime from the public-asset URL the
 *      generation script writes (Phase 5.6 contract).
 *   2. First pass: register every package's schemas opaquely on the child
 *      type system so derived-schema chains resolve regardless of package
 *      iteration order.
 *   3. Second pass: for each package, register manifest, domains, then
 *      entries opaquely on the child type system (Phase 6.7 order:
 *      schemas → manifest → domains → entries → extensions). While iterating
 *      domains, locate the widgets domain by its GTS instance ID so the
 *      nested app can take ownership of it via `registry.registerDomain(...)`.
 *   4. Take ownership of the widgets domain (registerDomain on the nested
 *      registry, paired with the local `WidgetsDomainFactory`) — skipped when
 *      a cached registry (a remount) already owns it.
 *   5. Third pass: for each extension whose target domain is the widgets
 *      domain, register it opaquely on the child registry — skipped per
 *      extension already registered.
 *
 * GTS entities flow through unchanged — no spread, no override, no
 * decomposition, no L4 reconstruction. The generation script inlines the
 * resolved `MfManifest` object into each entry's `manifest` field so entries
 * are registered opaquely without any consumer-side spread. The widgets
 * domain instance is authored once in `demo-mfe/mfe.json` (`domains[]`) and
 * arrives here through the same fetched manifest pipeline as every other GTS
 * entity.
 *
 * Returns the located widgets domain declaration so the caller can read its
 * `route` and `defaultActionTimeout` without a second manifest walk.
 *
 * Exported for tests so they can run it without a full `mount()` cycle:
 * production code reaches this only through
 * `DemoMfeWidgetsHostLifecycle.mount()`.
 */
export declare function bootstrapWidgetsRuntime(app: FrontXApp): Promise<ExtensionDomain>;
declare class DemoMfeWidgetsHostLifecycle extends ThemeAwareReactLifecycle {
    /**
     * The `bootstrapWidgetsRuntime(...)` promise started synchronously (before
     * any `await`) inside `mount()`, and awaited by `mount()` itself before
     * `mount()`'s own returned promise settles. This is what closes the async
     * race: `registry.registerDomain(widgetsDomain, ...)` — the call that
     * makes the widgets domain routable/forward-able from the shell's
     * mediator — happens inside this promise's chain, and `mount()` does not
     * resolve until it has completed. `WidgetsHostScreen` also subscribes to
     * this SAME promise (passed down as a prop) purely to drive its own
     * loading/error UI; it never re-invokes `bootstrapWidgetsRuntime`.
     */
    private bootstrapPromise;
    /**
     * Resolves once `ExtensionDomainSlot`'s `onAttached` callback has fired for
     * the widgets domain and this screen's own auto-mount-on-attach pass has
     * settled for every extension currently registered on this domain — i.e.
     * `DefaultExtensionMounter.attach(root)` has actually run, so the domain
     * has a DOM root to mount into, AND the opening write (or its deferral) is
     * already made. `mount()` awaits this ALONGSIDE `bootstrapPromise` (see
     * that field's doc comment for why `registerDomain` completing is
     * necessary but not sufficient): `ExtensionDomainSlot` only renders — and
     * only then, on a LATER React commit, attaches — once `WidgetsHostScreen`'s
     * own `ready` state flips true, which itself only happens after
     * `bootstrapPromise` resolves. Without also awaiting this signal, a
     * chain's `next` continuation targeting this domain (routable as soon as
     * `bootstrapPromise` resolves) can reach `ConcurrentMountStrategy.mount()`
     * before the mounter has a root, and `DefaultExtensionMounter.mount()`
     * throws "no root attached for domain ...".
     */
    private domainAttachedPromise;
    /**
     * Resolve function for `domainAttachedPromise`, wired to `WidgetsHostScreen`'s
     * `onDomainAttached` prop each `mount()`. Set synchronously inside `mount()`
     * before `WidgetsHostScreen` is rendered, so the prop is always defined by
     * the time the component's `handleAttached` callback could possibly fire.
     */
    private onDomainAttached;
    constructor();
    mount(container: Element | ShadowRoot, bridge: ChildMfeBridge, mountContext?: MfeMountContext): Promise<void>;
    protected renderContent(): React.ReactNode;
}
declare const lifecycle: DemoMfeWidgetsHostLifecycle;
export default lifecycle;
