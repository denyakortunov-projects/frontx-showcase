// node_modules/@gears-frontx/mfes/dist/index.js
var LazyLoaderRegistry = class _LazyLoaderRegistry {
  static instance;
  resolvers = /* @__PURE__ */ new Map();
  nextId = 0;
  // @cpt-begin:cpt-frontx-algo-mfe-loading-lazy-import-abi:p1:inst-lai-register-resolver
  /**
   * Ensure the singleton is created and the narrow `__FRONTX_LAZY__` global is
   * exposed exactly once. Subsequent calls return the cached singleton.
   *
   * The global surface is deliberately minimal — a single `resolve(id, path)`
   * method — so blob-realm loader stubs can reach the host-side resolver
   * without leaking handler internals.
   */
  static ensureExposed() {
    if (this.instance) return this.instance;
    const inst = new _LazyLoaderRegistry();
    this.instance = inst;
    const host = globalThis;
    host.__FRONTX_LAZY__ = {
      resolve: (id, path) => inst.resolve(id, path)
    };
    return inst;
  }
  /**
   * Register a per-load resolver and return its unique load ID.
   *
   * The ID is injected into the per-load loader stub blob so that
   * `__frontx_lazy(path)` calls from compiled chunks route back to the
   * resolver that owns the correct blob URL chain.
   */
  register(resolver) {
    const id = `lz-${++this.nextId}`;
    this.resolvers.set(id, resolver);
    return id;
  }
  // @cpt-end:cpt-frontx-algo-mfe-loading-lazy-import-abi:p1:inst-lai-register-resolver
  resolve(id, path) {
    const resolver = this.resolvers.get(id);
    if (!resolver) {
      return Promise.reject(
        new Error(`__frontx_lazy: no resolver registered for loader id '${id}'`)
      );
    }
    return resolver(path);
  }
};
function isInfrastructureLifecycleAction(actionType, typeSystem) {
  return actionType === typeSystem.resolveLoadExtActionId() || actionType === typeSystem.resolveMountExtActionId() || actionType === typeSystem.resolveUnmountExtActionId();
}
var ActionHandler = class {
  /**
   * Create an `ActionHandler` instance from a plain async function.
   *
   * Convenience wrapper for one-off handlers — strategies use this inside
   * `ExtensionDomainImplementationFactory.build(ctx)` to push mount/unmount
   * handlers via `ctx.registerHandler` without writing a full subclass.
   *
   * @param fn - Async function `(actionTypeId, payload) => Promise<void>`.
   * @returns An `ActionHandler` instance that delegates to `fn`.
   *
   * @example
   * ```typescript
   * ctx.registerHandler(ctx.typeSystem.resolveMountExtActionId(),
   *   ActionHandler.fromFunction((_t, p) => strategy.mount(p as ActionPayload)));
   * ```
   */
  static fromFunction(fn) {
    return new FunctionActionHandler(fn);
  }
};
var FunctionActionHandler = class extends ActionHandler {
  constructor(fn) {
    super();
    this.fn = fn;
  }
  fn;
  handleAction(actionTypeId, payload) {
    return this.fn(actionTypeId, payload);
  }
};
var ActionsChainsMediator = class {
};
var ParentMfeBridge = class {
};
var ChildMfeBridge = class {
};
var MfeBridgeFactory = class {
};
var MfeHandler = class {
  /**
   * Base type ID that this handler can handle.
   * The registry matches entries using typeSystem.isTypeOf(entryTypeId, handledBaseTypeId).
   */
  handledBaseTypeId;
  /**
   * Priority for handler selection.
   * Higher priority handlers are tried first.
   * Default: 0
   */
  priority;
  /**
   * The registering registry's type system, or absent while the handler
   * belongs to no registry.
   *
   * Registration is the only channel: a handler is constructed by the host
   * application (`new MfeHandlerMF(entryBaseTypeId)`) long before any registry
   * exists, so it cannot be a constructor argument. A handler that is never
   * registered resolves references from its own state alone and refuses the
   * ones it cannot.
   */
  typeSystem;
  constructor(handledBaseTypeId, priority = 0) {
    this.handledBaseTypeId = handledBaseTypeId;
    this.priority = priority;
  }
  /**
   * Receive the type system of the registry this handler is being registered
   * into. Called by the registry once per handler at registration.
   *
   * Implemented on the base class so every handler gains the plugin without
   * restating the wiring. A handler binds to one plugin for its lifetime:
   * re-attaching the same instance is a no-op, and a different one is refused
   * rather than swapped in. Subclass caches are keyed by extension or manifest
   * id alone, so a silent swap would let a load started under the first
   * registry be answered from a document the second plugin resolved.
   *
   * @param typeSystem - The registering registry's injected plugin
   * @throws Error if a different plugin is already attached
   */
  attachTypeSystem(typeSystem) {
    if (this.typeSystem && this.typeSystem !== typeSystem) {
      throw new Error(
        `MFE handler for base type '${this.handledBaseTypeId}' is already bound to a type system. One handler instance cannot be shared across registries - construct a separate handler for each registry.`
      );
    }
    this.typeSystem = typeSystem;
  }
};
var MfeRegistry = class {
};
var MfeRegistryFactory = class {
};
var MountStrategy = class {
};
var ExtensionReleaser = class {
  constructor(mounter) {
    this.mounter = mounter;
  }
  mounter;
  /**
   * The container-release callback registered for an extension id, set by
   * the mount strategy that mounted it (`registerDestroy`) and consumed —
   * read and removed in the same step — by the `release()` call that
   * settles it, so it runs exactly once even when several callers overlap
   * on the SAME extension id.
   */
  destroysByExtension = /* @__PURE__ */ new Map();
  /**
   * The settlement promise of a release currently running for a given
   * extension id on this releaser's mounter. Read by the mount-ext prologue
   * (`MountExtActionHandler`) together with `ExtensionMounter.getUnmountInFlight`
   * so a waiting mount settles only once BOTH the physical unmount and its
   * registered destroy have run.
   */
  releasesInFlight = /* @__PURE__ */ new Map();
  /**
   * The in-flight release settlement for `extensionId` on this releaser's
   * mounter, if `release` is currently running one, or `undefined`.
   */
  inFlight(extensionId) {
    return this.releasesInFlight.get(extensionId);
  }
  /**
   * Register the container-release callback for `extensionId` that the
   * NEXT `release(extensionId)` call must run alongside its physical
   * unmount. Called once, by the mount strategy, right after a SUCCESSFUL
   * `mounter.mount(extensionId, container)` — a fresh registration
   * overwrites whatever was registered before it, since a re-mounted
   * extension gets a fresh container and therefore a fresh destroy.
   *
   * @param extensionId - ID of the extension whose destroy is registered.
   * @param destroy - The container-release callback for `extensionId`.
   */
  registerDestroy(extensionId, destroy) {
    this.destroysByExtension.set(extensionId, destroy);
  }
  /**
   * Unmount `extensionId` on this releaser's mounter via `mounter.unmount()`
   * and then run the destroy registered for it — coalescing every
   * concurrent `release` call for the SAME extension id onto ONE shared
   * "unmount then destroy" operation.
   *
   * A call joining an already-in-flight release simply awaits the same
   * settlement; only the call that starts the release reads and removes
   * the registered destroy, so it runs exactly once regardless of how many
   * callers overlap on the same extension id.
   *
   * Whether `mounter.unmount()` fulfills or rejects, the registered destroy
   * still runs: on fulfillment its own failure is what the caller sees; on
   * rejection it runs for its side effect only and the unmount error stays
   * the one the caller sees.
   *
   * @param extensionId - ID of the extension being released.
   */
  release(extensionId) {
    const existing = this.releasesInFlight.get(extensionId);
    if (existing) {
      return existing;
    }
    const takeDestroy = () => {
      const destroy = this.destroysByExtension.get(extensionId);
      this.destroysByExtension.delete(extensionId);
      return destroy;
    };
    let settleWork;
    let rejectWork;
    const work = new Promise((resolve, reject) => {
      settleWork = resolve;
      rejectWork = reject;
    });
    this.releasesInFlight.set(extensionId, work);
    const cleanup = () => {
      if (this.releasesInFlight.get(extensionId) === work) {
        this.releasesInFlight.delete(extensionId);
      }
    };
    try {
      this.mounter.unmount(extensionId).then(
        () => {
          try {
            takeDestroy()?.();
            cleanup();
            settleWork();
          } catch (error) {
            cleanup();
            rejectWork(error);
          }
        },
        (error) => {
          try {
            takeDestroy()?.();
          } catch {
          }
          cleanup();
          rejectWork(error);
        }
      );
    } catch (error) {
      try {
        takeDestroy()?.();
      } catch {
      }
      cleanup();
      rejectWork(error);
    }
    return work;
  }
};
var ExtensionReleaserProvider = class _ExtensionReleaserProvider {
  static releasersByMounter = /* @__PURE__ */ new WeakMap();
  constructor() {
  }
  /**
   * @param mounter - The mounter to resolve the releaser for.
   * @returns The SAME `ExtensionReleaser` for every call given the same
   *   `mounter`.
   */
  static for(mounter) {
    let releaser = _ExtensionReleaserProvider.releasersByMounter.get(mounter);
    if (!releaser) {
      releaser = new ExtensionReleaser(mounter);
      _ExtensionReleaserProvider.releasersByMounter.set(mounter, releaser);
    }
    return releaser;
  }
};
var ConcurrentMountStrategy = class extends MountStrategy {
  constructor(mounter, hooks) {
    super();
    this.mounter = mounter;
    this.hooks = hooks;
  }
  mounter;
  hooks;
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-match-strategy
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-concurrent
  async mount(payload) {
    const extensionId = payload.subject;
    const container = this.hooks.create(extensionId);
    try {
      await this.mounter.mount(extensionId, container);
    } catch (error) {
      this.hooks.destroy(extensionId);
      throw error;
    }
    ExtensionReleaserProvider.for(this.mounter).registerDestroy(extensionId, () => this.hooks.destroy(extensionId));
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-concurrent
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-match-strategy
  async unmount(payload) {
    const extensionId = payload.subject;
    await ExtensionReleaserProvider.for(this.mounter).release(extensionId);
  }
};
var OptionalMountStrategy = class extends MountStrategy {
  constructor(mounter, hooks, registry, domainId) {
    super();
    this.mounter = mounter;
    this.hooks = hooks;
    this.registry = registry;
    this.domainId = domainId;
  }
  mounter;
  hooks;
  registry;
  domainId;
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-optional-displace
  async mount(payload) {
    const subject = payload.subject;
    const mounted = this.registry.getMountedExtensions(this.domainId);
    if (mounted.length === 1 && mounted[0] === subject) {
      return;
    }
    if (mounted.length === 1 && mounted[0] !== subject) {
      const priorOccupant = mounted[0];
      await ExtensionReleaserProvider.for(this.mounter).release(priorOccupant);
    }
    const container = this.hooks.create(subject);
    try {
      await this.mounter.mount(subject, container);
    } catch (error) {
      this.hooks.destroy(subject);
      throw error;
    }
    ExtensionReleaserProvider.for(this.mounter).registerDestroy(subject, () => this.hooks.destroy(subject));
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-optional-displace
  async unmount(payload) {
    const subject = payload.subject;
    const mounted = this.registry.getMountedExtensions(this.domainId);
    if (!mounted.includes(subject)) {
      return;
    }
    await ExtensionReleaserProvider.for(this.mounter).release(subject);
  }
};
var ExclusiveMountStrategy = class extends MountStrategy {
  constructor(mounter, hooks, registry, domainId) {
    super();
    this.mounter = mounter;
    this.hooks = hooks;
    this.registry = registry;
    this.domainId = domainId;
  }
  mounter;
  hooks;
  registry;
  domainId;
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-exclusive-evict
  async mount(payload) {
    const subject = payload.subject;
    const mounted = this.registry.getMountedExtensions(this.domainId);
    if (mounted.length === 1 && mounted[0] === subject) {
      return;
    }
    for (const siblingId of mounted) {
      if (siblingId !== subject) {
        await ExtensionReleaserProvider.for(this.mounter).release(siblingId);
      }
    }
    const container = this.hooks.create(subject);
    try {
      await this.mounter.mount(subject, container);
    } catch (error) {
      this.hooks.destroy(subject);
      throw error;
    }
    ExtensionReleaserProvider.for(this.mounter).registerDestroy(subject, () => this.hooks.destroy(subject));
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-exclusive-mount
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-exclusive-evict
  // ExclusiveMountStrategy intentionally does NOT implement the optional
  // `unmount` method declared on the MountStrategy base class. Eviction
  // happens only as a side effect of mounting a different extension.
};
var ExtensionDomainImplementation = class {
  /**
   * @internal — called by the registry only during `registerDomain`.
   */
  _getMountStrategiesInternal() {
    return this.getMountStrategies();
  }
};
var ExtensionDomainImplementationFactory = class {
};
var ExtensionMounter = class {
};
var DomainLifecycleTrigger = class {
};
var InvalidatableDomainContext = class {
  constructor(_mounter, _lifecycleTrigger, typeSystem) {
    this._mounter = _mounter;
    this._lifecycleTrigger = _lifecycleTrigger;
    this.typeSystem = typeSystem;
  }
  _mounter;
  _lifecycleTrigger;
  typeSystem;
  valid = true;
  collectedHandlers = /* @__PURE__ */ new Map();
  // Action types prepopulated by the registry (e.g., LoadExtHandler) — excluded
  // from cross-validation's "no extra handlers" check since the spec restricts
  // that check to handlers registered via `ctx.registerHandler`.
  prepopulatedActionTypes = /* @__PURE__ */ new Set();
  get mounter() {
    if (!this.valid) {
      throw new Error("DomainContext invalidated after registration");
    }
    return this._mounter;
  }
  get lifecycleTrigger() {
    if (!this.valid) {
      throw new Error("DomainContext invalidated after registration");
    }
    return this._lifecycleTrigger;
  }
  registerHandler(actionType, handler) {
    if (!this.valid) {
      throw new Error("DomainContext.registerHandler called after registration");
    }
    this.collectedHandlers.set(actionType, handler);
  }
  /**
   * Pre-populate a handler in the collector without requiring context validity.
   * Used by the registry to inject the standard `LoadExtHandler` before
   * calling `factory.build(ctx)`. Prepopulated handlers are tracked separately
   * so cross-validation can exclude them from the "no extra handlers" check.
   */
  prepopulateHandler(actionType, handler) {
    this.collectedHandlers.set(actionType, handler);
    this.prepopulatedActionTypes.add(actionType);
  }
  /**
   * Return the set of action types that were prepopulated by the registry
   * (vs. registered by the domain factory via `registerHandler`).
   */
  getPrepopulatedActionTypes() {
    return this.prepopulatedActionTypes;
  }
  /**
   * Mark the context as invalid. All subsequent accessor and method calls throw.
   * Called by the registry in the `finally` block after `factory.build`.
   */
  invalidate() {
    this.valid = false;
  }
  /**
   * Return the handlers collected during `factory.build(ctx)`.
   * Called by the registry to persist them to the mediator.
   */
  getCollectedHandlers() {
    return this.collectedHandlers;
  }
  /**
   * Clear all collected handlers. Called on atomic rollback when
   * `factory.build` throws or cross-validation fails.
   */
  clearCollectedHandlers() {
    this.collectedHandlers.clear();
    this.prepopulatedActionTypes.clear();
  }
};
var RuntimeCoordinator = class {
};
var NoHandlerForActionTargetError = class extends Error {
  constructor(target, actionType) {
    super(
      `No handler found for target '${target}' and action type '${actionType}'`
    );
    this.target = target;
    this.actionType = actionType;
    this.name = "NoHandlerForActionTargetError";
  }
  target;
  actionType;
};
var NoActionsChainHandlerError = class extends Error {
  constructor(extensionId) {
    super(
      `No cross-hop envelope receiver registered for extension '${extensionId}'.`
    );
    this.extensionId = extensionId;
    this.name = "NoActionsChainHandlerError";
  }
  extensionId;
  code = "NO_ACTIONS_CHAIN_HANDLER";
};
var BridgeDisposedError = class extends Error {
  constructor(extensionId) {
    super(`Bridge has been disposed for extension '${extensionId}'`);
    this.extensionId = extensionId;
    this.name = "BridgeDisposedError";
  }
  extensionId;
  code = "BRIDGE_DISPOSED";
};
var BridgeInactiveError = class extends Error {
  constructor(extensionId) {
    super(`Extension '${extensionId}' is not currently mounted; its bridge is inactive.`);
    this.extensionId = extensionId;
    this.name = "BridgeInactiveError";
  }
  extensionId;
  code = "BRIDGE_INACTIVE";
};
var MfeError = class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "MfeError";
  }
  code;
};
var DomainValidationError = class extends MfeError {
  constructor(domainId, cause) {
    const detail = cause?.message ?? "validation failed";
    super(`Domain validation failed for '${domainId}': ${detail}`, "DOMAIN_VALIDATION_ERROR");
    this.domainId = domainId;
    this.cause = cause;
    this.name = "DomainValidationError";
  }
  domainId;
  cause;
};
var MfeLoadError = class extends MfeError {
  constructor(message, entryTypeId, cause) {
    super(`Failed to load MFE '${entryTypeId}': ${message}`, "MFE_LOAD_ERROR");
    this.entryTypeId = entryTypeId;
    this.cause = cause;
    this.name = "MfeLoadError";
  }
  entryTypeId;
  cause;
};
var ExtensionTypeError = class extends MfeError {
  constructor(extensionTypeId, requiredBaseTypeId) {
    super(
      `Extension type '${extensionTypeId}' does not derive from required base type '${requiredBaseTypeId}'`,
      "EXTENSION_TYPE_ERROR"
    );
    this.extensionTypeId = extensionTypeId;
    this.requiredBaseTypeId = requiredBaseTypeId;
    this.name = "ExtensionTypeError";
  }
  extensionTypeId;
  requiredBaseTypeId;
};
var MfeTypeConformanceError = class extends MfeError {
  constructor(typeId, expectedBaseType) {
    super(
      `Type '${typeId}' does not conform to base type '${expectedBaseType}'`,
      "MFE_TYPE_CONFORMANCE_ERROR"
    );
    this.typeId = typeId;
    this.expectedBaseType = expectedBaseType;
    this.name = "MfeTypeConformanceError";
  }
  typeId;
  expectedBaseType;
};
var UnsupportedLifecycleStageError = class extends MfeError {
  constructor(message, stageId, entityId, supportedStages) {
    super(message, "UNSUPPORTED_LIFECYCLE_STAGE");
    this.stageId = stageId;
    this.entityId = entityId;
    this.supportedStages = supportedStages;
    this.name = "UnsupportedLifecycleStageError";
  }
  stageId;
  entityId;
  supportedStages;
};
var EntryTypeNotHandledError = class extends MfeError {
  constructor(entryTypeId, registeredHandlerBaseTypeIds) {
    const handlerList = registeredHandlerBaseTypeIds.length > 0 ? registeredHandlerBaseTypeIds.join(", ") : "(none)";
    super(
      `No registered handler can handle entry type '${entryTypeId}'. Registered handler base type IDs: ${handlerList}`,
      "ENTRY_TYPE_NOT_HANDLED"
    );
    this.entryTypeId = entryTypeId;
    this.registeredHandlerBaseTypeIds = registeredHandlerBaseTypeIds;
    this.name = "EntryTypeNotHandledError";
  }
  entryTypeId;
  registeredHandlerBaseTypeIds;
};
var DomainUnregisteringError = class extends MfeError {
  constructor(domainId, extensionId) {
    super(
      `Cannot register extension '${extensionId}': domain '${domainId}' is being unregistered.`,
      "DOMAIN_UNREGISTERING_ERROR"
    );
    this.domainId = domainId;
    this.extensionId = extensionId;
    this.name = "DomainUnregisteringError";
  }
  domainId;
  extensionId;
};
function createShadowRoot(element, options = {}) {
  const { mode = "open", delegatesFocus = false } = options;
  let shadowRoot;
  if (element.shadowRoot) {
    shadowRoot = element.shadowRoot;
  } else {
    shadowRoot = element.attachShadow({ mode, delegatesFocus });
  }
  const isolationStyleId = "__frontx-shadow-isolation__";
  if (!shadowRoot.getElementById(isolationStyleId)) {
    const styleElement = document.createElement("style");
    styleElement.id = isolationStyleId;
    styleElement.textContent = `
:host {
  all: initial;
  display: block;
}
    `.trim();
    shadowRoot.appendChild(styleElement);
  }
  return shadowRoot;
}
function injectCssVariables(shadowRoot, variables) {
  const styleId = "__frontx-css-variables__";
  let styleElement = shadowRoot.getElementById(styleId);
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    shadowRoot.appendChild(styleElement);
  }
  const cssRules = Object.entries(variables).map(([key, value]) => `  ${key}: ${value};`).join("\n");
  styleElement.textContent = `
:host {
${cssRules}
}
  `.trim();
}
function injectStylesheet(shadowRoot, css, id) {
  let styleElement = null;
  if (id) {
    styleElement = shadowRoot.getElementById(id);
  }
  if (!styleElement) {
    styleElement = document.createElement("style");
    if (id) {
      styleElement.id = id;
    }
    shadowRoot.appendChild(styleElement);
  }
  styleElement.textContent = css;
}
function validateContract(entry, domain, typeSystem) {
  const errors = [];
  for (const prop of entry.requiredProperties) {
    if (!domain.sharedProperties.includes(prop)) {
      errors.push({
        type: "missing_property",
        details: `Entry requires property '${prop}' not provided by domain`
      });
    }
  }
  for (const action of domain.extensionsActions) {
    if (!entry.actions.includes(action)) {
      errors.push({
        type: "unsupported_action",
        details: `Domain requires action '${action}' but entry does not support it`
      });
    }
  }
  for (const action of entry.domainActions) {
    if (isInfrastructureLifecycleAction(action, typeSystem)) {
      continue;
    }
    if (!domain.actions.includes(action)) {
      errors.push({
        type: "unhandled_domain_action",
        details: `Entry requires domain action '${action}' but domain does not support it`
      });
    }
  }
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, errors: [] };
}
function formatContractErrors(result) {
  if (result.valid) {
    return "Contract is valid";
  }
  const lines = ["Contract validation failed:"];
  for (const error of result.errors) {
    lines.push(`  - [${error.type}] ${error.details}`);
  }
  return lines.join("\n");
}
function validateDomainLifecycleHooks(domain) {
  const errors = [];
  if (!domain.lifecycle || domain.lifecycle.length === 0) {
    return { valid: true, errors: [] };
  }
  for (const hook of domain.lifecycle) {
    if (!domain.lifecycleStages.includes(hook.stage)) {
      errors.push({
        stage: hook.stage,
        message: `Domain lifecycle hook references unsupported stage '${hook.stage}'. Supported stages: ${domain.lifecycleStages.join(", ")}`
      });
    }
  }
  return { valid: errors.length === 0, errors };
}
function validateExtensionLifecycleHooks(extension, domain) {
  const errors = [];
  if (!extension.lifecycle || extension.lifecycle.length === 0) {
    return { valid: true, errors: [] };
  }
  for (const hook of extension.lifecycle) {
    if (!domain.extensionsLifecycleStages.includes(hook.stage)) {
      errors.push({
        stage: hook.stage,
        message: `Extension lifecycle hook references unsupported stage '${hook.stage}'. Domain '${domain.id}' supports: ${domain.extensionsLifecycleStages.join(", ")}`
      });
    }
  }
  return { valid: errors.length === 0, errors };
}
function validateExtensionType(plugin, domain, extension) {
  if (!domain.extensionsTypeId) {
    return;
  }
  if (!plugin.isTypeOf(extension.id, domain.extensionsTypeId)) {
    throw new ExtensionTypeError(extension.id, domain.extensionsTypeId);
  }
}
var ExtensionManager = class {
};
var MountManager = class {
};
var RuntimeBridgeFactory = class {
};
var RetryHandler = class {
  /**
   * Retry an async operation with exponential backoff.
   *
   * @param operation - Operation to retry
   * @param maxRetries - Maximum number of retries (default: 3)
   * @param initialDelay - Initial delay in ms (default: 1000)
   * @returns Result of the operation
   */
  async retry(operation, maxRetries = 3, initialDelay = 1e3) {
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < maxRetries) {
          const delay = initialDelay * Math.pow(2, attempt);
          await this.delay(delay);
        }
      }
    }
    throw lastError ?? new Error("Operation failed after retries");
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};
var ChildMfeBridgeImpl = class extends ChildMfeBridge {
  extDomainId;
  extensionId;
  /**
   * Internal: property subscriptions.
   * Maps propertyTypeId to callbacks.
   */
  propertySubscribers = /* @__PURE__ */ new Map();
  /**
   * Internal: current property values (populated from domain state).
   */
  properties = /* @__PURE__ */ new Map();
  /**
   * Internal: receiver of a hand-over through this bridge. Wired by
   * `DefaultMfeRegistry.relinkInboundBridge` to
   * `DefaultMfeRegistry.receiveCrossHopNode`, duck-typed for cross-copy
   * safety. Throws to refuse the hand-over, or returns having accepted it.
   */
  crossHopEnvelopeHandler = null;
  /**
   * Internal: the registry's own `executeActionsChain`, injected by the
   * bridge factory during wiring (`cpt-frontx-adr-mfe-runtime-public-surface`).
   */
  executeActionsChainCallback = null;
  /**
   * Internal: callback for registering this MFE's action handler in the parent mediator.
   * The callback receives the actionTypeId and handler class instance.
   */
  registerActionHandlerCallback = null;
  /**
   * Internal: whether this bridge is currently mounted. `false` between an
   * unmount (or failed mount) and the next reactivation.
   */
  active = false;
  /**
   * Internal: whether this bridge has been permanently torn down (the
   * extension it belongs to was unregistered). Once `true`, stays `true`.
   */
  destroyed = false;
  constructor(extDomainId, extensionId) {
    super();
    this.extDomainId = extDomainId;
    this.extensionId = extensionId;
  }
  /**
   * INTERNAL: Reactivate this bridge for a fresh mount. Called by the
   * runtime bridge factory. Throws if the bridge has been permanently
   * disposed.
   *
   * @internal
   */
  activate() {
    if (this.destroyed) {
      throw new BridgeDisposedError(this.extensionId);
    }
    this.active = true;
  }
  /**
   * INTERNAL: Deactivate this bridge on unmount or mount failure. Handler
   * registrations and property subscriptions survive.
   *
   * @internal
   */
  deactivate() {
    this.active = false;
  }
  /**
   * INTERNAL: Whether this bridge is currently mounted and not destroyed.
   *
   * @internal
   */
  isActive() {
    return this.active && !this.destroyed;
  }
  /**
   * INTERNAL: Whether this bridge has been permanently disposed.
   *
   * @internal
   */
  isDestroyed() {
    return this.destroyed;
  }
  /**
   * Hand an actions chain to the registry's `executeActionsChain`, adding
   * no coordination logic, and return nothing. The only public API for
   * actions chain execution from child MFEs
   * (`cpt-frontx-adr-child-mfe-host-access`). While this bridge is disposed,
   * inactive, or not wired to a dispatch callback, it hands nothing over.
   *
   * @param chain - Actions chain to execute.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-fwd-exec-chain
  executeActionsChain(chain) {
    if (this.destroyed || !this.active || !this.executeActionsChainCallback) {
      return;
    }
    this.executeActionsChainCallback(chain);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-fwd-exec-chain
  /**
   * Register the receiver of a hand-over through this bridge
   * (`cpt-frontx-adr-action-dispatch-and-chaining`).
   * Compare-and-clear unsubscribe: since this bridge object is the SAME one
   * handed to every mount of this extension (`inst-bridge-lifetime`), an
   * unsubscribe captured by an earlier registration must not clobber a
   * DIFFERENT handler installed after it replaced this one.
   *
   * @internal concrete-only; not part of the abstract `ChildMfeBridge` contract.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-relink-downward-delivery
  onCrossHopEnvelope(handler) {
    if (this.crossHopEnvelopeHandler !== null) {
      console.warn(`onCrossHopEnvelope: replacing existing handler for extension '${this.extensionId}'`);
    }
    this.crossHopEnvelopeHandler = handler;
    return () => {
      if (this.crossHopEnvelopeHandler === handler) {
        this.crossHopEnvelopeHandler = null;
      }
    };
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-relink-downward-delivery
  /**
   * Subscribe to a specific property's updates.
   *
   * @param propertyTypeId - Type ID of the property to subscribe to
   * @param callback - Callback to invoke when property updates
   * @returns Unsubscribe function
   */
  subscribeToProperty(propertyTypeId, callback) {
    let subscribers = this.propertySubscribers.get(propertyTypeId);
    if (!subscribers) {
      subscribers = /* @__PURE__ */ new Set();
      this.propertySubscribers.set(propertyTypeId, subscribers);
    }
    subscribers.add(callback);
    return () => {
      subscribers?.delete(callback);
      if (subscribers && subscribers.size === 0) {
        this.propertySubscribers.delete(propertyTypeId);
      }
    };
  }
  /**
   * Get a property's current value synchronously.
   *
   * @param propertyTypeId - Type ID of the property to get
   * @returns Current property value, or undefined if not set
   */
  getProperty(propertyTypeId) {
    return this.properties.get(propertyTypeId);
  }
  /**
   * INTERNAL: Called by ParentMfeBridge when domain property changes.
   * Always records the value. Subscribers are notified only while the
   * bridge is active; no replay happens on reactivation.
   *
   * @param propertyTypeId - Type ID of the property that changed
   * @param value - New property value
   */
  receivePropertyUpdate(propertyTypeId, value) {
    if (this.destroyed) {
      return;
    }
    this.properties.set(propertyTypeId, value);
    if (!this.active) {
      return;
    }
    const propertySubscribers = this.propertySubscribers.get(propertyTypeId);
    if (propertySubscribers) {
      for (const callback of propertySubscribers) {
        try {
          callback(value);
        } catch (error) {
          console.error(`Error in property subscriber for '${propertyTypeId}':`, error);
        }
      }
    }
  }
  /**
   * INTERNAL: Set the registry's `executeActionsChain` callback. Called by
   * the bridge factory during wiring.
   *
   * @param callback - The registry's own `executeActionsChain` method.
   */
  setExecuteActionsChainCallback(callback) {
    this.executeActionsChainCallback = callback;
  }
  /**
   * INTERNAL: Set callback for action handler registration.
   * Called by bridge factory during wiring.
   *
   * @param callback - Callback that registers the handler in the parent mediator
   */
  setRegisterActionHandlerCallback(callback) {
    this.registerActionHandlerCallback = callback;
  }
  /**
   * Register a handler for a specific action type on this MFE.
   * Delegates to the wired callback which calls mediator.registerHandler().
   * May be called multiple times — once per action type. The registration
   * survives this bridge's deactivation and is released only at the
   * extension's permanent unregistration.
   *
   * @param actionTypeId - The action type this handler handles
   * @param handler - The ActionHandler instance to invoke
   * @throws Error if the callback was not wired by the bridge factory (programming error)
   */
  registerActionHandler(actionTypeId, handler) {
    if (!this.registerActionHandlerCallback) {
      throw new Error("registerActionHandler callback not wired");
    }
    this.registerActionHandlerCallback(actionTypeId, handler);
  }
  /**
   * INTERNAL: Pass a hand-over from the parent — a downward forwarding
   * entry — to the registered receiver,
   * which accepts or refuses it. Called by
   * `ParentMfeBridgeImpl.sendCrossHopEnvelope()`. With the bridge disposed or
   * inactive, or no receiver registered, refuses without invoking the
   * receiver, leaving no side effect here, so the delivering runtime
   * executes the `fallback`.
   *
   * @throws {BridgeDisposedError} If the bridge has been permanently disposed
   * @throws {BridgeInactiveError} If the extension is registered but not currently mounted
   * @throws {NoActionsChainHandlerError} If no receiver is registered
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-child-invoke
  handleCrossHopEnvelope(envelope) {
    if (this.destroyed) {
      throw new BridgeDisposedError(this.extensionId);
    }
    if (!this.active) {
      throw new BridgeInactiveError(this.extensionId);
    }
    if (this.crossHopEnvelopeHandler === null) {
      throw new NoActionsChainHandlerError(this.extensionId);
    }
    this.crossHopEnvelopeHandler(envelope);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-child-invoke
  /**
   * INTERNAL: Permanent teardown, called by the bridge factory only when the
   * extension this bridge belongs to is unregistered.
   */
  destroy() {
    this.registerActionHandlerCallback = null;
    this.propertySubscribers.clear();
    this.properties.clear();
    this.crossHopEnvelopeHandler = null;
    this.executeActionsChainCallback = null;
    this.active = false;
    this.destroyed = true;
  }
};
var MfeBridgeFactoryDefault = class extends MfeBridgeFactory {
  create(domainId, _entryTypeId, instanceId) {
    return new ChildMfeBridgeImpl(domainId, instanceId);
  }
  dispose(bridge) {
    bridge.destroy();
  }
};
function sourceImports(source, packageName) {
  return bareSpecifierPattern(packageName).test(source);
}
function bareSpecifierPattern(packageName) {
  const specifierPart = packageName.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  return new RegExp(
    String.raw`(from|import)(\s*["'])(${specifierPart})(["'])`,
    "g"
  );
}
function rewriteBareSpecifier(source, packageName, replacement) {
  return source.replace(
    bareSpecifierPattern(packageName),
    `$1$2${replacement}$4`
  );
}
function findSurvivingDeclaredSharedDepSpecifier(source, declaredNames) {
  for (const name of declaredNames) {
    if (sourceImports(source, name)) {
      return name;
    }
  }
  return void 0;
}
function inlineContentSchemes() {
  return ["blob:", "data:"];
}
async function importBlobModule(blobUrl) {
  if (!inlineContentSchemes().some((scheme) => blobUrl.startsWith(scheme))) {
    throw new TypeError(
      `importBlobModule accepts only ${inlineContentSchemes().join(" or ")} URLs, received: ${blobUrl}`
    );
  }
  return await import(
    /* webpackIgnore: true */
    /* @vite-ignore */
    blobUrl
  );
}
function buildLazyLoaderStubSource(loaderId) {
  const schemeCheck = inlineContentSchemes().map((scheme) => `u.startsWith(${JSON.stringify(scheme)})`).join("||");
  return `const __id=${JSON.stringify(loaderId)};
export const __frontx_lazy=async(p)=>{const u=await globalThis.__FRONTX_LAZY__.resolve(__id,p);if(!(${schemeCheck}))throw new TypeError('__frontx_lazy resolved a non-inline-content URL: '+u);return import(u);};
`;
}
var GENERIC_IMPORT_SPECIFIER_PATTERN = /(from|import)(\s*["'])([^"']+)(["'])/g;
var WELL_FORMED_MODULE_SPECIFIER_PATTERN = /^(@[a-zA-Z0-9][a-zA-Z0-9._~-]*\/)?[a-zA-Z0-9][a-zA-Z0-9._~-]*(?:\/[a-zA-Z0-9._~-]+)*$/;
function findUndeclaredWellFormedSpecifiers(source, declaredNames) {
  const found = [];
  const seen = /* @__PURE__ */ new Set();
  for (const match of source.matchAll(GENERIC_IMPORT_SPECIFIER_PATTERN)) {
    const specifier = match[3];
    if (declaredNames.has(specifier)) {
      continue;
    }
    if (!WELL_FORMED_MODULE_SPECIFIER_PATTERN.test(specifier)) {
      continue;
    }
    if (seen.has(specifier)) {
      continue;
    }
    seen.add(specifier);
    found.push(specifier);
  }
  return found;
}
var LruCache = class {
  constructor(capacity) {
    this.capacity = capacity;
    if (!Number.isFinite(capacity) || capacity <= 0) {
      throw new RangeError(`LruCache capacity must be a positive integer, got ${capacity}`);
    }
  }
  capacity;
  map = /* @__PURE__ */ new Map();
  get(key) {
    if (!this.map.has(key)) return void 0;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      if (oldestKey !== void 0) this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
  delete(key) {
    return this.map.delete(key);
  }
  has(key) {
    return this.map.has(key);
  }
};
var SHARED_DEP_TEXT_CACHE_PROTOCOL_VERSION = 1;
var SHARED_DEP_TEXT_CACHE_KEY = /* @__PURE__ */ Symbol.for(
  "@gears-frontx/mfes:shared-dep-text-cache:1"
);
var SHARED_DEP_TEXT_CACHE_CAPACITY = 128;
var RealmSharedDepTextCacheProvider = class _RealmSharedDepTextCacheProvider {
  /**
   * This evaluated copy's OWN fallback cache, used when the realm rendezvous
   * slot cannot be understood (`inst-rsdc-fallback-local`). A private static
   * field — not `Symbol.for(...)`-anchored on `globalThis` — is exactly what
   * makes it copy-local rather than realm-shared: every independently loaded
   * copy of this package gets its own module instance of this class, and
   * therefore its own private `fallbackCache` field, while every call to
   * {@link RealmSharedDepTextCacheProvider.getCache} FROM THIS SAME COPY sees
   * the same field.
   *
   * Lazily created (not initialized at module-evaluation time) and memoized
   * here, rather than constructed fresh inside
   * {@link RealmSharedDepTextCacheProvider.getCache} on every fallback call:
   * a fresh `new LruCache(...)` per call would give every handler THIS COPY
   * constructs its own separate fallback cache, defeating the intra-copy
   * sharing `inst-rsdc-fallback-local` requires — "reuse degrades to copy
   * scope", not "reuse degrades to nothing". Two DIFFERENT, incompatible
   * copies still get two different fallback caches, because each has its own
   * module instance of this file and therefore its own `fallbackCache`
   * field — the intended separation.
   */
  static fallbackCache;
  static getFallbackCache() {
    if (_RealmSharedDepTextCacheProvider.fallbackCache === void 0) {
      _RealmSharedDepTextCacheProvider.fallbackCache = new LruCache(
        SHARED_DEP_TEXT_CACHE_CAPACITY
      );
    }
    return _RealmSharedDepTextCacheProvider.fallbackCache;
  }
  /**
   * Type-guard, not a cast: narrows `unknown` without trusting the caller.
   * Recognizes a realm-shared cache's structural shape (`get`/`set`/`delete`)
   * without trusting class identity, which cannot be relied upon across
   * independently evaluated copies (see the doc comment on
   * {@link SharedDepTextCache}). Pure and stateless — no substitution is ever
   * needed for this recognition — so it is a static method.
   */
  static isStructurallyConformingCache(candidate) {
    return typeof candidate === "object" && candidate !== null && typeof candidate.get === "function" && typeof candidate.set === "function" && typeof candidate.delete === "function";
  }
  /**
   * Recognizes a same-protocol entry by its `v` field and by the operations
   * the loading path needs of `cache` — never by class identity, which
   * cannot be relied upon across independently evaluated copies (see the
   * doc comment on {@link SharedDepTextCache}).
   */
  static isRecognizedEntry(candidate) {
    if (typeof candidate !== "object" || candidate === null) {
      return false;
    }
    const maybeEntry = candidate;
    return maybeEntry.v === SHARED_DEP_TEXT_CACHE_PROTOCOL_VERSION && _RealmSharedDepTextCacheProvider.isStructurallyConformingCache(maybeEntry.cache);
  }
  /**
   * Returns the bounded shared-dependency source-text cache this copy's loads
   * consult: the one cache every compatible, independently loaded copy in the
   * realm converges on, or a cache local to this copy when the realm's entry
   * cannot be understood.
   *
   * Realizes `cpt-frontx-algo-mfe-isolation-realm-shared-dep-cache-rendezvous`.
   * Called once per `MfeHandlerMF` construction (`private readonly
   * sharedDepTextCache = RealmSharedDepTextCacheProvider.getCache();`) — the
   * field is instance-held, but the cache it names is realm-shared
   * (`inst-rsdc-hold-reference`).
   */
  // @cpt-begin:cpt-frontx-algo-mfe-isolation-realm-shared-dep-cache-rendezvous:p1:inst-rsdc-read-slot
  static getCache() {
    const host = globalThis;
    const existing = host[SHARED_DEP_TEXT_CACHE_KEY];
    if (existing === void 0) {
      const cache = new LruCache(SHARED_DEP_TEXT_CACHE_CAPACITY);
      const entry = {
        v: SHARED_DEP_TEXT_CACHE_PROTOCOL_VERSION,
        cache
      };
      host[SHARED_DEP_TEXT_CACHE_KEY] = entry;
      return cache;
    }
    if (_RealmSharedDepTextCacheProvider.isRecognizedEntry(existing)) {
      return existing.cache;
    }
    console.debug(
      `[MfeHandlerMF] Realm shared-dependency source-text cache rendezvous slot (${String(SHARED_DEP_TEXT_CACHE_KEY)}) carries an entry this copy does not recognize as protocol version ${SHARED_DEP_TEXT_CACHE_PROTOCOL_VERSION}. Leaving that entry untouched and falling back to a cache local to this copy \u2014 reuse degrades to copy scope rather than failing the load.`
    );
    return _RealmSharedDepTextCacheProvider.getFallbackCache();
  }
};
var AttemptSourceTextLedger = class {
  entries = [];
  released = false;
  /**
   * Record that this attempt is waiting on `promise` under `key` in
   * `cache`. Entries that settle before {@link release} are marked and
   * skipped there: a settled entry is not one the attempt is still
   * waiting on, and dropping it would only cost the cache a legitimate
   * hit. Recording stops once the ledger is released — anything the
   * abandoned attempt's background work registers afterwards belongs to
   * that work, not to a retry this ledger can still speak for.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-loading-attempt-timeout:p1:inst-lto-release-record-cache
  record(cache, key, promise) {
    if (this.released) {
      return;
    }
    const entry = { cache, key, promise, settled: false };
    const markSettled = () => {
      entry.settled = true;
    };
    promise.then(markSettled, markSettled);
    this.entries.push(entry);
  }
  // @cpt-end:cpt-frontx-algo-mfe-loading-attempt-timeout:p1:inst-lto-release-record-cache
  /**
   * Release the still-unsettled cache entries this attempt was waiting on.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-loading-attempt-timeout:p1:inst-lto-release-abandoned-source-text
  release() {
    this.released = true;
    for (const entry of this.entries) {
      if (entry.settled) {
        continue;
      }
      if (entry.cache.get(entry.key) === entry.promise) {
        entry.cache.delete(entry.key);
      }
    }
    this.entries.length = 0;
  }
  // @cpt-end:cpt-frontx-algo-mfe-loading-attempt-timeout:p1:inst-lto-release-abandoned-source-text
};
var FetchBudget = class {
  available;
  waiters = [];
  constructor(width) {
    this.available = width;
  }
  acquire() {
    if (this.available > 0) {
      this.available -= 1;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.waiters.push(resolve);
    });
  }
  /**
   * Hand the slot directly to the longest-waiting acquirer when there is
   * one (rather than incrementing and letting an arbitrary waiter win the
   * next turn of the event loop), which is what keeps the in-flight count
   * exactly at the width under saturation.
   */
  release() {
    const next = this.waiters.shift();
    if (next !== void 0) {
      next();
      return;
    }
    this.available += 1;
  }
};
var ManifestCache = class {
  manifests = /* @__PURE__ */ new Map();
  cacheManifest(manifest) {
    this.manifests.set(manifest.id, manifest);
  }
  getManifest(manifestId) {
    return this.manifests.get(manifestId);
  }
};
var RUNTIME_STYLE_ID_PREFIX = "__frontx-mfe-runtime-style-";
var MAX_CONCURRENT_FETCHES = 6;
async function boundedMap(items, task) {
  const results = new Array(items.length);
  let cursor = 0;
  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      try {
        const value = await task(items[index], index);
        results[index] = { status: "fulfilled", value };
      } catch (error) {
        results[index] = { status: "rejected", reason: error };
      }
    }
  };
  const workerCount = Math.min(MAX_CONCURRENT_FETCHES, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}
var DETERMINISTIC_LOAD_FAILURE = /* @__PURE__ */ Symbol("frontx.deterministicLoadFailure");
function markDeterministicLoadFailure(error) {
  Object.defineProperty(error, DETERMINISTIC_LOAD_FAILURE, { value: true });
  return error;
}
var DETERMINISTIC_FAILURE = /* @__PURE__ */ Symbol("frontx.deterministicFailure");
function isDeterministicFailureSentinel(value) {
  return typeof value === "object" && value !== null && DETERMINISTIC_FAILURE in value;
}
function isDeterministicLoadFailure(error) {
  return typeof error === "object" && error !== null && error[DETERMINISTIC_LOAD_FAILURE] === true;
}
function isWellFormedContentHash(hash) {
  return /^[0-9a-f]{64}$/.test(hash);
}
function describeSharedDepCycle(pending) {
  const names = [...pending.keys()];
  return names.map((name) => {
    const importsOthers = names.filter(
      (other) => other !== name && sourceImports(pending.get(name) ?? "", other)
    );
    return importsOthers.length > 0 ? `'${name}' (imports ${importsOthers.map((o) => `'${o}'`).join(", ")})` : `'${name}'`;
  }).join(", ");
}
function createChainBuildState() {
  return {
    failed: false,
    fetchBudget: new FetchBudget(MAX_CONCURRENT_FETCHES),
    reportedCycles: /* @__PURE__ */ new Set()
  };
}
var SOURCE_TEXT_CACHE_CAPACITY = 256;
var SHARED_DEP_ADOPTION_NOTICE_CACHE_CAPACITY = 64;
var MfeHandlerMF = class _MfeHandlerMF extends MfeHandler {
  /**
   * Process-wide load cache.
   *
   * Keyed by the EXTENSION INSTANCE ID — the `id` field of the registered
   * `MfeExtension` whose entry is being loaded. Two extensions registered
   * against the same `MfeEntry` definition (sibling extensions sharing an
   * `entry.id`) populate DISTINCT cache entries — distinct blob URL chains,
   * distinct module evaluations, distinct module-scope state — per ADR-0004
   * (`cpt-frontx-adr-mfe-load-isolation`) + ADR-0020
   * (`cpt-frontx-adr-mfe-state-lifecycle-boundary`) isolation invariant.
   * Sibling isolation is the handler's responsibility, not the MFE author's.
   *
   * Re-mount of the SAME extension instance (same `extensionId`) reuses the
   * cached load — same blob URLs, same module instance, same
   * `MfeEntryLifecycle` reference, satisfying the never-revoke invariant.
   *
   * Cache lifetime = page lifetime. No eviction except on load failure
   * (a rejected promise is removed so a subsequent load can retry from
   * scratch). Memory bound = catalog-bounded by unique extension instance
   * IDs ever loaded.
   */
  // @cpt-dod:cpt-frontx-dod-mfe-isolation-handler-load-cache:p1
  static loadCache = /* @__PURE__ */ new Map();
  bridgeFactory;
  manifestCache;
  config;
  retryHandler;
  // LRU-bounded so a long-running host that loads many distinct MFEs cannot
  // grow the cache without limit. Expose-chunk source text has no reuse
  // value after its load settles, so oldest-first eviction is acceptable.
  sourceTextCache = new LruCache(
    SOURCE_TEXT_CACHE_CAPACITY
  );
  /**
   * Reference to the realm-wide shared-dependency source-text cache,
   * obtained through the internal rendezvous accessor
   * {@link RealmSharedDepTextCacheProvider.getCache} rather than constructed here. The
   * FIELD is instance-held — every `MfeHandlerMF` instance calls the
   * accessor once, at construction — but the CACHE it names is shared
   * realm-wide across every compatible, independently loaded copy of this
   * package: two loads whose deduplication key already agrees that they
   * reuse the same emitted build (`cpt-frontx-adr-shared-dep-dedup-key`)
   * fetch that build's source text once for the whole realm, not once per
   * handler and not once per copy — including a nested extension host
   * that constructs its own `MfeHandlerMF` from its own independently
   * loaded copy of this package.
   *
   * Keyed on a two-tier scheme: when a shared-dep entry declares a
   * `contentHash`, the key is `name@version@contentHash`; when no
   * `contentHash` is declared, the key falls back to
   * `name@version@<resolved chunk URL>`, so reuse is scoped to that one
   * manifest's own resolved URL rather than shared cross-MFE
   * (`cpt-frontx-adr-shared-dep-dedup-key`).
   *
   * The realm-wide bound is 128 resident MAPPINGS, not per handler and not
   * per copy — see `RealmSharedDepTextCacheProvider.ts` — and bounds mapping
   * count, not retained bytes: no byte ceiling is claimed on this cache's
   * behalf. Its lifetime is the realm's page lifetime: a resident fulfilled
   * value stays strongly reachable for as long as it survives eviction, and
   * no handler discard, registry disposal, extension unmount, or extension
   * unregistration clears or releases it — there is no retainer count.
   *
   * The rendezvous this cache is reached through is TRUSTED same-realm
   * coordination state, not an authenticity or confidentiality boundary: a
   * structurally conforming entry is adopted whichever same-realm code
   * published it (`cpt-frontx-adr-shared-dep-cache-reach`
   * records this as an accepted consequence, not a gap to close).
   */
  // @cpt-dod:cpt-frontx-dod-mfe-isolation-realm-shared-dep-text-cache:p1
  // @cpt-begin:cpt-frontx-algo-mfe-isolation-realm-shared-dep-cache-rendezvous:p1:inst-rsdc-hold-reference
  sharedDepTextCache = RealmSharedDepTextCacheProvider.getCache();
  // @cpt-end:cpt-frontx-algo-mfe-isolation-realm-shared-dep-cache-rendezvous:p1:inst-rsdc-hold-reference
  /**
   * Tracks which `name@version` + manifest id pairs have already received
   * the adoption notice emitted when a shared-dep entry declares no
   * `contentHash` (see `inst-emit-adoption-notice`). Scoped to the handler
   * instance, so the notice fires at most once per pair across every load
   * this handler serves — not once per load — while the pair's entry
   * survives in this ledger.
   *
   * LRU-bounded for the same reason as `sourceTextCache` and
   * `sharedDepTextCache`: an unbounded ledger would retain one string per
   * pair for the handler's entire lifetime. Eviction here only means the
   * pair may be renotified later; it never affects correctness of the load.
   */
  sharedDepAdoptionNoticesEmitted = new LruCache(
    SHARED_DEP_ADOPTION_NOTICE_CACHE_CAPACITY
  );
  constructor(handledBaseTypeId, config = {}) {
    super(handledBaseTypeId, 0);
    this.bridgeFactory = new MfeBridgeFactoryDefault();
    this.manifestCache = new ManifestCache();
    this.retryHandler = new RetryHandler();
    this.config = {
      timeout: config.timeout ?? 3e4,
      retries: config.retries ?? 2
    };
  }
  /**
   * Load an MFE bundle using Module Federation.
   *
   * Cache is keyed by `extensionId` (the extension instance ID), not by
   * `entry.id`. Two extensions sharing the same `entry` definition get
   * distinct cache entries and distinct module evaluations.
   */
  // @cpt-flow:cpt-frontx-flow-mfe-isolation-load:p1
  async load(entry, extensionId) {
    const cached = _MfeHandlerMF.loadCache.get(extensionId);
    if (cached !== void 0) {
      return cached;
    }
    const promise = this.retryHandler.retry(
      async () => {
        const ledger = new AttemptSourceTextLedger();
        try {
          return await this.withLoadTimeout(
            this.loadInternal(entry, extensionId, ledger),
            entry.id,
            ledger
          );
        } catch (error) {
          if (isDeterministicLoadFailure(error)) {
            return { [DETERMINISTIC_FAILURE]: error };
          }
          throw error;
        }
      },
      this.config.retries ?? 0,
      1e3
    ).then((result) => {
      if (isDeterministicFailureSentinel(result)) {
        throw result[DETERMINISTIC_FAILURE];
      }
      return result;
    });
    _MfeHandlerMF.loadCache.set(extensionId, promise);
    promise.catch(() => {
      if (_MfeHandlerMF.loadCache.get(extensionId) === promise) {
        _MfeHandlerMF.loadCache.delete(extensionId);
      }
    });
    return promise;
  }
  /**
   * Race a single load attempt against `this.config.timeout`.
   *
   * `config.timeout` is consulted here rather than left unused: without a
   * race against a timer, `RetryHandler.retry` only retries on a thrown
   * error, so a load that hangs (network never resolves, a dependency
   * cycle, etc.) leaves the returned promise pending forever. Racing the
   * attempt against a timer converts that into BOUNDED FAILURE: after a
   * known wall-clock budget the caller gets a diagnostic `MfeLoadError`
   * instead of a promise that never settles.
   *
   * The race is also a recovery path, not only a bound.
   * {@link fetchSourceText} stores the in-flight fetch promise in the
   * handler-level, URL-keyed `sourceTextCache` (and
   * {@link fetchSharedDepSources} does the same in the
   * two-tier-keyed `sharedDepTextCache`) and evicts it only when
   * that promise REJECTS, so a fetch that never settles would never be
   * evicted and every retry would rejoin the same hung promise and expire
   * against its own budget in turn. On expiry this method therefore
   * releases the entries the abandoned attempt was waiting on, through
   * that attempt's {@link AttemptSourceTextLedger} and under the same
   * identity check the eviction-on-rejection uses, so the next attempt
   * issues its own fetch and can actually succeed.
   *
   * Releasing those cache entries is not cancellation: this method still
   * does not cancel the underlying fetch/blob-URL work in flight when the
   * timer wins the race — there is no `AbortController`
   * plumbed through this file (see the sibling {@link boundedMap} fan-out,
   * which relies on a `ChainBuildState` token rather than cancellation
   * for the same reason) — so a timed-out attempt's background work keeps
   * running to completion and its results are simply never observed by
   * this call.
   *
   * `this.config.timeout` is never `undefined` in practice — the
   * constructor fills `config.timeout ?? 30000`, and `??` only substitutes
   * `null`/`undefined`, so an explicit `0` (or any other falsy number)
   * passed by a caller survives the constructor unchanged. A timeout of
   * `0` is the conventional "disable the timeout" idiom, so it — and any
   * other non-positive value — is treated as "no timeout" below rather
   * than as a zero-delay timer that would fail every attempt immediately.
   *
   * This method races ONE attempt, not one `load()` call. `RetryHandler`
   * (see {@link RetryHandler.retry}) wraps every retry of a failed attempt
   * in its own call to this method, so with the defaults (`timeout: 30000`,
   * `retries: 2`) a single `load()` call's worst-case wall clock is roughly
   * `timeout × (retries + 1)` plus `RetryHandler`'s exponential backoff
   * between attempts — on the order of 90+ seconds, not the 30 seconds the
   * `timeout` field name alone would suggest.
   */
  // @cpt-algo:cpt-frontx-algo-mfe-loading-attempt-timeout:p1
  // @cpt-dod:cpt-frontx-dod-mfe-loading-attempt-timeout:p1
  withLoadTimeout(attempt, entryId, ledger) {
    const timeoutMs = this.config.timeout;
    if (timeoutMs === void 0 || timeoutMs <= 0) {
      return attempt;
    }
    let timer;
    const timeout = new Promise((_resolve, reject) => {
      timer = setTimeout(() => {
        reject(
          new MfeLoadError(
            `MFE load for '${entryId}' timed out after ${timeoutMs}ms`,
            entryId
          )
        );
        ledger?.release();
      }, timeoutMs);
    });
    return Promise.race([attempt, timeout]).finally(() => clearTimeout(timer));
  }
  /**
   * Internal load implementation.
   * Each call creates a fully isolated module evaluation chain via blob URLs.
   */
  async loadInternal(entry, extensionId, ledger) {
    const manifest = await this.resolveManifest(entry.manifest);
    this.manifestCache.cacheManifest(manifest);
    const { moduleFactory, stylesheetPaths, baseUrl } = await this.loadExposedModuleIsolated(
      manifest,
      entry.exposedModule,
      entry.exposeAssets,
      entry.id,
      extensionId,
      ledger
    );
    const loadedModule = moduleFactory();
    if (!this.isValidLifecycleModule(loadedModule)) {
      throw new MfeLoadError(
        `Module '${entry.exposedModule}' must implement MfeEntryLifecycle interface (mount/unmount)`,
        entry.id
      );
    }
    return this.wrapLifecycleWithStylesheets(
      loadedModule,
      stylesheetPaths,
      baseUrl
    );
  }
  /**
   * Load an exposed module with full per-runtime isolation.
   *
   * Creates a per-load blob URL chain:
   *  1. Shared dep standalone ESM files are blob-URL'd first (leaves first, dependency order)
   *  2. The expose chunk and all its static deps are blob-URL'd with bare specifiers
   *     rewritten to shared dep blob URLs
   *
   * baseUrl is derived from manifest.metaData.publicPath rather than parsing
   * remoteEntry.js — the publicPath field gives the exact chunk base URL.
   *
   * Blob URLs are NOT revoked — modules with top-level await continue
   * evaluating after import() resolves, and revoking during async evaluation
   * causes ERR_FILE_NOT_FOUND. Blob URLs are cleaned up by the browser on
   * page unload.
   */
  async loadExposedModuleIsolated(manifest, exposedModule, exposeAssets, entryId, extensionId, ledger) {
    const baseUrl = manifest.metaData.publicPath;
    this.assertResolvedPublicPath(baseUrl, entryId);
    const sharedDepBlobUrls = await this.buildSharedDepBlobUrls(
      manifest,
      entryId,
      extensionId,
      ledger
    );
    const exposeChunkFilename = exposeAssets.js.sync[0];
    if (!exposeChunkFilename) {
      throw new MfeLoadError(
        `Cannot resolve expose chunk for '${exposedModule}': exposeAssets.js.sync is empty`,
        entryId
      );
    }
    const loadState = {
      blobUrlMap: /* @__PURE__ */ new Map(),
      inFlight: /* @__PURE__ */ new Map(),
      baseUrl,
      entryId,
      sharedDepBlobUrls,
      entryChunkFilename: exposeChunkFilename,
      attemptLedger: ledger
    };
    const build = createChainBuildState();
    const stylesheetPaths = [
      ...exposeAssets.css.sync,
      ...exposeAssets.css.async
    ];
    await this.createBlobUrlChain(loadState, exposeChunkFilename, build);
    const exposeBlobUrl = loadState.blobUrlMap.get(exposeChunkFilename);
    if (!exposeBlobUrl) {
      throw new MfeLoadError(
        `Failed to create blob URL for expose chunk '${exposeChunkFilename}'`,
        entryId
      );
    }
    const exposeModule = await importBlobModule(exposeBlobUrl);
    const moduleRecord = exposeModule;
    return {
      moduleFactory: () => moduleRecord["default"] ?? exposeModule,
      stylesheetPaths,
      baseUrl
    };
  }
  /**
   * Guard against Module Federation's unresolved `"auto"` publicPath
   * placeholder reaching the fetch layer.
   *
   * `MfManifestMetaData.publicPath` is documented (and by the handler's own
   * contract, at {@link loadExposedModuleIsolated}) as an already-resolved
   * absolute URL or `'/'` — never the literal string MF 2.0 emits when a
   * remote's `vite.config.ts` does not set an explicit `publicPath` (MF's
   * own runtime resolves `"auto"` from the script tag that loaded
   * `remoteEntry.js`; this handler never loads `remoteEntry.js` at all, so
   * that resolution point does not exist here — see the file header comment).
   *
   * The handler has no channel to recover the real origin at this point:
   * `manifest` arrives either inlined in `MfeEntryMF` or looked up by ID from
   * an in-process cache (see {@link resolveManifest}), with no fetch
   * response / page-relative context carried alongside it. Resolving
   * `"auto"` to a concrete origin is therefore the responsibility of
   * whatever produces the `MfManifest` (e.g. a build-time manifest
   * aggregator) — NOT this handler.
   *
   * Without this guard, `"auto"`/`"auto/"` gets silently concatenated into
   * every chunk fetch URL, producing a same-origin relative request that a
   * Vite dev server's SPA fallback answers with a 200 index.html — a load
   * failure that looks like a `SyntaxError` deep in module evaluation
   * instead of a clear, fail-fast diagnostic at the point of the actual
   * misconfiguration.
   */
  assertResolvedPublicPath(publicPath, entryId) {
    if (publicPath === "auto" || publicPath === "auto/") {
      throw new MfeLoadError(
        `manifest.metaData.publicPath is the unresolved Module Federation placeholder "${publicPath}". This handler requires an already-resolved absolute URL (or '/') \u2014 resolve "auto" to the MFE's real serving origin when producing the MfManifest (e.g. in the build-time manifest generator), not at handler load time.`,
        entryId
      );
    }
  }
  // @cpt-begin:cpt-frontx-flow-mfe-isolation-load:p1:inst-if-bad-lifecycle
  // Lifecycle contract validation failure path
  // @cpt-end:cpt-frontx-flow-mfe-isolation-load:p1:inst-if-bad-lifecycle
  // @cpt-begin:cpt-frontx-flow-mfe-isolation-load:p1:inst-evict-raise
  // Evict cache and raise load error on bad lifecycle
  // @cpt-end:cpt-frontx-flow-mfe-isolation-load:p1:inst-evict-raise
  // @cpt-begin:cpt-frontx-flow-mfe-isolation-load:p1:inst-validate-lifecycle
  isValidLifecycleModule(module) {
    if (typeof module !== "object" || module === null) {
      return false;
    }
    const candidate = module;
    return typeof candidate.mount === "function" && typeof candidate.unmount === "function";
  }
  // @cpt-end:cpt-frontx-flow-mfe-isolation-load:p1:inst-validate-lifecycle
  // @cpt-begin:cpt-frontx-flow-mfe-isolation-load:p1:inst-cache-promise
  wrapLifecycleWithStylesheets(lifecycle, stylesheetPaths, baseUrl) {
    if (stylesheetPaths.length === 0) {
      return lifecycle;
    }
    return {
      // @cpt-begin:cpt-frontx-state-mfe-isolation-module-lifecycle:p1:inst-to-active
      mount: async (container, bridge) => {
        await this.injectRemoteStylesheets(container, stylesheetPaths, baseUrl);
        await lifecycle.mount(container, bridge);
      },
      // @cpt-end:cpt-frontx-state-mfe-isolation-module-lifecycle:p1:inst-to-active
      // @cpt-begin:cpt-frontx-state-mfe-isolation-module-lifecycle:p1:inst-to-disposed
      unmount: async (container) => {
        this.removeInjectedStylesheets(container);
        await lifecycle.unmount(container);
      }
      // @cpt-end:cpt-frontx-state-mfe-isolation-module-lifecycle:p1:inst-to-disposed
    };
  }
  // @cpt-end:cpt-frontx-flow-mfe-isolation-load:p1:inst-cache-promise
  async injectRemoteStylesheets(container, stylesheetPaths, baseUrl) {
    stylesheetPaths.forEach((path, index) => {
      const targetId = `${RUNTIME_STYLE_ID_PREFIX}${index}`;
      this.upsertStyleElement(
        container,
        { href: new URL(path, baseUrl).href },
        targetId
      );
    });
  }
  removeInjectedStylesheets(container) {
    const injectedStyles = container.querySelectorAll(
      `link[id^="${RUNTIME_STYLE_ID_PREFIX}"], style[id^="${RUNTIME_STYLE_ID_PREFIX}"]`
    );
    injectedStyles.forEach((styleElement) => styleElement.remove());
  }
  upsertStyleElement(container, stylesheet, id) {
    let styleElement = null;
    if ("getElementById" in container && typeof container.getElementById === "function") {
      styleElement = container.getElementById(id);
    } else if (container instanceof Element) {
      styleElement = container.querySelector(`[id="${id}"]`);
    }
    if (stylesheet.href) {
      if (!styleElement || styleElement.tagName !== "LINK") {
        styleElement?.remove();
        const linkElement2 = document.createElement("link");
        linkElement2.id = id;
        linkElement2.rel = "stylesheet";
        container.appendChild(linkElement2);
        styleElement = linkElement2;
      }
      const linkElement = styleElement;
      linkElement.href = stylesheet.href;
      return;
    }
    if (!styleElement || styleElement.tagName !== "STYLE") {
      styleElement?.remove();
      const inlineStyleElement = document.createElement("style");
      inlineStyleElement.id = id;
      container.appendChild(inlineStyleElement);
      styleElement = inlineStyleElement;
    }
    styleElement.textContent = stylesheet.css ?? "";
  }
  /**
   * Resolve manifest from reference.
   *
   * Accepts an inline MfManifest object (caches it) or a string type ID
   * (looks up from cache, then from the registry-supplied type system).
   * Schema validation is the type system plugin's responsibility — the
   * handler trusts registered manifests are valid.
   */
  async resolveManifest(manifestRef) {
    if (typeof manifestRef === "object" && manifestRef !== null) {
      this.manifestCache.cacheManifest(manifestRef);
      return manifestRef;
    }
    if (typeof manifestRef === "string") {
      const cached = this.manifestCache.getManifest(manifestRef);
      if (cached) {
        return cached;
      }
      const fromTypeSystem = this.typeSystem?.getSchema(manifestRef);
      if (isMfManifest(fromTypeSystem)) {
        this.manifestCache.cacheManifest(fromTypeSystem);
        return fromTypeSystem;
      }
      throw new MfeLoadError(
        `Manifest '${manifestRef}' not found. Provide the manifest inline in MfeEntryMF, ensure another entry from the same remote was loaded first, or register the manifest with the type system of the registry this handler is registered into.`,
        manifestRef
      );
    }
    throw new MfeLoadError(
      "Manifest reference must be a string (type ID) or MfManifest object",
      "invalid-manifest-ref"
    );
  }
  // ---- Shared dep blob URL construction ----
  // @cpt-algo:cpt-frontx-algo-mfe-isolation-build-shared-dep-blob-urls:p1
  /**
   * Build blob URLs for all shared dependencies from standalone ESM files.
   *
   * Processes shared deps in manifest order (must be dependency-ordered: leaves first).
   * Each dep's standalone ESM may import other shared deps as bare specifiers —
   * those are rewritten to already-resolved blob URLs before creating the blob.
   * Per-load fresh blob URLs ensure isolated module instances.
   */
  async buildSharedDepBlobUrls(manifest, entryId, extensionId, ledger) {
    this.assertUniqueSharedDepNames(manifest, entryId);
    const sources = await this.fetchSharedDepSources(manifest, ledger);
    const sharedNames = new Set(manifest.shared.map((d) => d.name));
    return this.createBlobUrlsInDependencyOrder(
      sources,
      sharedNames,
      entryId,
      extensionId
    );
  }
  /**
   * Fail fast with a diagnostic when `manifest.shared` declares the same
   * package name more than once (regardless of version) — see the comment
   * on {@link buildSharedDepBlobUrls} for why this is preferred over
   * re-keying `sources`/`sharedDepBlobUrls` to `name@version`.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-isolation-build-shared-dep-blob-urls:p1:inst-assert-unique-names
  assertUniqueSharedDepNames(manifest, entryId) {
    const seen = /* @__PURE__ */ new Set();
    for (const dep of manifest.shared) {
      if (seen.has(dep.name)) {
        throw new MfeLoadError(
          `manifest.shared of '${manifest.id}' declares '${dep.name}' more than once. Shared dependency names must be unique within a manifest \u2014 blob URL construction keys sources and rewrite maps by bare package name, so a duplicate silently overwrites the earlier entry.`,
          entryId
        );
      }
      seen.add(dep.name);
    }
  }
  // @cpt-end:cpt-frontx-algo-mfe-isolation-build-shared-dep-blob-urls:p1:inst-assert-unique-names
  /**
   * Fetch standalone ESM source text for each shared dep.
   * sharedDepTextCache dedups on a two-tier key: when a `contentHash` is
   * declared, the key is `name@version@contentHash` and reuse spans ALL
   * MFEs — the first MFE to load react@19.2.4 at a given build hash fetches
   * it from its server, and every other MFE declaring that same
   * name@version@contentHash gets a cache hit regardless of their server
   * URL. Without a declared `contentHash`, the key falls back to
   * `name@version@<resolved chunk URL>`, so reuse is scoped to that one
   * manifest's own URL instead of shared cross-MFE.
   *
   * A rejected shared-dep fetch surfaces only once every sibling in the
   * batch has settled. Nothing is gained by aborting sooner: the batch is
   * dispatched concurrently, so the fetches a short-circuit could skip are
   * only those still queued behind the concurrency width, while the ones
   * already issued cannot be cancelled (no `AbortController` is plumbed
   * through this file — same reason the chain build uses a failure token
   * rather than cancellation), and the shared-dep list is short by
   * construction (the packages an MFE declares external). The failure
   * reported is deterministic regardless: the first in the manifest's
   * declaration order, not whichever fetch lost the wall-clock race.
   */
  async fetchSharedDepSources(manifest, ledger) {
    const settled = await boundedMap(manifest.shared, async (dep) => {
      const absoluteUrl = dep.chunkPath.startsWith("http") ? dep.chunkPath : manifest.metaData.publicPath + dep.chunkPath;
      let cacheKey;
      if (dep.contentHash !== void 0 && isWellFormedContentHash(dep.contentHash)) {
        cacheKey = `${dep.name}@${dep.version}@${dep.contentHash}`;
      } else {
        cacheKey = `${dep.name}@${dep.version}@${absoluteUrl}`;
        const noticeKey = `${dep.name}@${dep.version}@${manifest.id}`;
        if (!this.sharedDepAdoptionNoticesEmitted.has(noticeKey)) {
          this.sharedDepAdoptionNoticesEmitted.set(noticeKey, true);
          const reason = dep.contentHash === void 0 ? "carries no contentHash" : `declares a malformed contentHash ('${dep.contentHash}')`;
          console.warn(
            `Shared dependency '${dep.name}@${dep.version}' declared by manifest '${manifest.id}' ${reason}. Cross-MFE reuse is disabled for this dependency; its source text will be keyed on this manifest's own resolved chunk URL rather than shared with other microfrontends declaring the same name@version.`
          );
        }
      }
      const cache = this.sharedDepTextCache;
      let textPromise = cache.get(cacheKey);
      if (textPromise === void 0) {
        textPromise = this.fetchSourceText(absoluteUrl, ledger);
        const rejectedPromise = textPromise;
        rejectedPromise.catch(() => {
          if (cache.get(cacheKey) === rejectedPromise) {
            cache.delete(cacheKey);
          }
        });
        cache.set(cacheKey, textPromise);
      }
      ledger?.record(cache, cacheKey, textPromise);
      const text = await textPromise;
      return { name: dep.name, text };
    });
    const failure = settled.find(
      (result) => result.status === "rejected"
    );
    if (failure) {
      throw failure.reason;
    }
    const sources = /* @__PURE__ */ new Map();
    for (const result of settled) {
      if (result.status === "fulfilled") {
        sources.set(result.value.name, result.value.text);
      }
    }
    return sources;
  }
  /**
   * Create blob URLs in dependency order: leaves first, dependents follow.
   *
   * The order is derived from the fetched sources themselves rather than
   * from `manifest.shared[]`'s enumeration order. Shared dependencies that
   * import one another circularly admit no such order, and minting them
   * anyway would leave their bare specifiers unrewritten inside a blob that
   * therefore cannot be instantiated at all — so that case fails the load
   * with a diagnostic naming them.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-isolation-build-shared-dep-blob-urls:p1:inst-resolve-order
  createBlobUrlsInDependencyOrder(sources, sharedNames, entryId, extensionId) {
    const blobUrls = /* @__PURE__ */ new Map();
    const pending = new Map(sources);
    while (pending.size > 0) {
      const before = pending.size;
      for (const [name, source] of pending) {
        if (this.isDepReadyToResolve(name, source, sharedNames, blobUrls)) {
          blobUrls.set(
            name,
            this.createRewrittenBlobUrl(
              source,
              blobUrls,
              sharedNames,
              name,
              entryId,
              extensionId
            )
          );
          pending.delete(name);
        }
      }
      if (pending.size === before) {
        throw markDeterministicLoadFailure(
          new MfeLoadError(
            `circular shared dependencies: no dependency order exists over ${describeSharedDepCycle(pending)}. Minting them anyway would leave those bare specifiers unrewritten inside blobs that cannot be instantiated. Rebuild the microfrontend so that its shared dependencies do not import one another circularly.`,
            entryId
          )
        );
      }
    }
    return blobUrls;
  }
  // @cpt-end:cpt-frontx-algo-mfe-isolation-build-shared-dep-blob-urls:p1:inst-for-each-resolved
  // @cpt-end:cpt-frontx-algo-mfe-isolation-build-shared-dep-blob-urls:p1:inst-resolve-order
  isDepReadyToResolve(name, source, sharedNames, blobUrls) {
    return [...sharedNames].every(
      (other) => other === name || blobUrls.has(other) || !sourceImports(source, other)
    );
  }
  createRewrittenBlobUrl(source, blobUrls, sharedNames, depName, entryId, extensionId) {
    const rewritten = this.rewriteBareSpecifiers(source, blobUrls);
    const survivor = findSurvivingDeclaredSharedDepSpecifier(rewritten, sharedNames);
    if (survivor !== void 0) {
      throw markDeterministicLoadFailure(
        new MfeLoadError(
          `shared-dep chunk '${depName}' still imports the bare specifier '${survivor}' after rewriting its declared shared dependencies, for microfrontend '${extensionId}'. Every declared shared-dependency name that survives rewriting must resolve to a blob URL; this indicates a rewrite defect, UNLESS '${survivor}' names '${depName}' itself \u2014 a chunk cannot import its own not-yet-minted blob URL, so a shared dep that bare-imports its own package name is a producer-build problem, not a rewrite defect in this handler.`,
          entryId
        )
      );
    }
    const undeclared = findUndeclaredWellFormedSpecifiers(rewritten, sharedNames);
    for (const specifier of undeclared) {
      console.warn(
        `shared-dep chunk '${depName}' imports '${specifier}', which is not declared in manifest.shared[], for microfrontend '${extensionId}'. This specifier cannot resolve inside an isolated module; declare it in manifest.shared[] if it should be shared, or remove the import if it is unused. The load proceeds \u2014 this is a diagnostic only.`
      );
    }
    const blob = new Blob([rewritten], { type: "text/javascript" });
    return URL.createObjectURL(blob);
  }
  /**
   * Apply all shared dep bare specifier rewrites to a source text.
   */
  rewriteBareSpecifiers(source, sharedDepBlobUrls) {
    let rewritten = source;
    for (const [name, blobUrl] of sharedDepBlobUrls) {
      rewritten = rewriteBareSpecifier(rewritten, name, blobUrl);
    }
    return rewritten;
  }
  // ---- Blob URL chain creation ----
  /**
   * Recursively create blob URLs for a module and all its static dependencies.
   *
   * Processes dependencies depth-first so that when a module's imports are
   * rewritten, all its dependencies already have blob URLs in the shared map.
   * Common dependencies are processed once per load (shared blobUrlMap).
   *
   * Concurrent calls for the same filename are deduplicated via the inFlight
   * map — callers await the same promise rather than returning early with no
   * result. This prevents a race where sibling ESM modules with top-level
   * await, and the sibling fan-out in {@link createBlobUrlChainInternal},
   * trigger overlapping resolution for the same dependency;
   * {@link resolveLazyChunk} is the current beneficiary that actually calls
   * back into this method from outside the static-import recursion.
   *
   * Cycle detection is tracked on the shared `inFlight` entry rather than on
   * any single call's recursion path, because the path a cycle is *detected*
   * on is not necessarily the path it was *created* on. A linear cycle
   * (chunk A imports B, B imports A) is visible on one call stack and a
   * simple "have I already seen this filename on my own way down" check
   * catches it. A cycle that closes across two independent branches does
   * not stay on one call stack: if a diamond (E imports A and B; A imports
   * C; B imports C; C imports back to B) fans A and B out concurrently, C is
   * reached only via A's path, so a plain per-call ancestor set never
   * contains "B" when C statically imports it — B was never on that
   * particular branch. Meanwhile B is independently blocked joining C's
   * `inFlight` promise (ordinary, legitimate dedup, not yet a cycle), so B
   * and C now await each other with no rejection, no timeout, and no retry
   * path (the `loadCache` entry never settles).
   *
   * `ancestors` is therefore not a per-call snapshot: it *is* the mutable
   * lineage stored on the filename's own `inFlight` entry (see
   * `LoadBlobState.inFlight`), threaded live through the recursion that
   * builds that filename's dependencies. When a second branch joins an
   * already in-flight filename instead of constructing it, that branch
   * contributes its own lineage into the joined entry's lineage before
   * awaiting it (synchronously, with no `await` between the check and the
   * contribution — the same discipline the `blobUrlMap`/`inFlight`
   * check-then-set already relies on, which is also why this method stays
   * non-`async`). Because the lineage object is shared by reference, that
   * contribution is visible the moment the joined filename's own
   * construction next reads it — including when it later closes the cycle
   * by requesting a dependency that is now present in its own (grown)
   * lineage. In the diamond above: B joining C's promise contributes B's
   * lineage into C's entry; when C's construction goes on to request B, its
   * own lineage now contains "B", the ordinary ancestor check fires, and C
   * fails the chain build instead of joining B's promise. A detected cycle
   * is fatal here, exactly as it is for circular shared deps in
   * {@link createBlobUrlsInDependencyOrder}: there is no order in which the
   * blob URLs on a cycle could be minted, and the alternative — leaving the
   * cycle-closing specifier pointing at a plain chunk URL — would evaluate
   * that module, and its whole origin-resolved subgraph, outside the load's
   * isolated graph.
   */
  // @cpt-algo:cpt-frontx-algo-mfe-isolation-blob-url-chain:p1
  createBlobUrlChain(loadState, filename, build, ancestors = /* @__PURE__ */ new Set()) {
    if (loadState.blobUrlMap.has(filename)) {
      return Promise.resolve();
    }
    if (ancestors.has(filename)) {
      return Promise.reject(
        this.onDependencyCycleDetected(
          loadState,
          build,
          filename,
          ancestors,
          "own lineage"
        )
      );
    }
    const existing = loadState.inFlight.get(filename);
    if (existing) {
      const union = new Set(ancestors);
      for (const inherited of existing.lineage) union.add(inherited);
      if (union.has(filename)) {
        return Promise.reject(
          this.onDependencyCycleDetected(
            loadState,
            build,
            filename,
            union,
            "joined lineage"
          )
        );
      }
      for (const inherited of ancestors) existing.lineage.add(inherited);
      return this.joinInFlightConstruction(
        loadState,
        filename,
        build,
        ancestors,
        existing
      );
    }
    const lineage = new Set(ancestors);
    const dropIfUnproductive = () => {
      if (loadState.blobUrlMap.has(filename)) return;
      if (loadState.inFlight.get(filename)?.promise === promise) {
        loadState.inFlight.delete(filename);
      }
    };
    const promise = this.createBlobUrlChainInternal(
      loadState,
      filename,
      build,
      lineage
    ).then(
      () => {
        dropIfUnproductive();
      },
      (error) => {
        dropIfUnproductive();
        throw error;
      }
    );
    loadState.inFlight.set(filename, { promise, lineage });
    return promise;
  }
  /**
   * Await a construction another branch already had in flight, then verify
   * it actually produced something — and construct it ourselves if it did
   * not.
   *
   * An `inFlight` entry is a join point for a construction in progress, not
   * a record that one succeeded: the entry's construction can settle
   * cleanly without minting a blob URL (a sibling of ITS build failed and it
   * abandoned the chunk — see `inst-settle-drop-inflight`). Dropping the unproductive entry helps the
   * NEXT requester, but not one that already joined the promise: that
   * joiner would resume, find no `blobUrlMap` entry for the filename, and
   * fail its own load at {@link rewriteModuleImports} for a chunk nothing
   * ever tried to build on its behalf.
   *
   * So the joiner re-attempts the construction inside its OWN build. By the
   * time this resumes, the entry it joined has already been pruned —
   * `dropIfUnproductive` runs inside the `.then` of the very promise
   * awaited here, so it cannot race the re-attempt — and the recursive call
   * re-enters {@link createBlobUrlChain} with this requester's own
   * `ancestors`, so the re-attempt is subject to the same lineage cycle
   * checks as any other request and cannot reintroduce a circular wait.
   *
   * The re-attempt is skipped when this build has itself failed: the absence
   * from `blobUrlMap` is then this build's own outcome, not a hole left by
   * someone else's.
   */
  async joinInFlightConstruction(loadState, filename, build, ancestors, joined) {
    await joined.promise;
    if (loadState.blobUrlMap.has(filename)) return;
    if (build.failed) return;
    return this.createBlobUrlChain(loadState, filename, build, ancestors);
  }
  /**
   * The single point at which a detected dependency cycle becomes a
   * failure — both detection sites in {@link createBlobUrlChain} route
   * through here, and a future mechanism that could actually LOAD a cyclic
   * graph (a per-load naming layer) substitutes here rather than reopening
   * either site's check-then-set region.
   *
   * Returns the error rather than throwing it, so the callers can reject
   * without awaiting anything and without becoming `async` — the
   * `blobUrlMap`/`inFlight` check-then-set in {@link createBlobUrlChain}
   * must stay synchronous.
   *
   * The diagnostic IS the report: the condition is fatal, so a console
   * warning alongside it would be noise. It is raised once per chunk per
   * chain build, since several branches can reach the same cycle before
   * `build.failed` is observed by all of them.
   */
  onDependencyCycleDetected(loadState, build, filename, lineage, detectedVia) {
    const alreadyReported = build.reportedCycles.has(filename);
    build.reportedCycles.add(filename);
    const message = alreadyReported ? `dependency cycle: chunk '${filename}' \u2014 already diagnosed for this chain build by the branch that reached the cycle first.` : `dependency cycle: chunk '${filename}' is already in the ${detectedVia} of the branch requesting it (${[...lineage].join(" \u2192 ")}). A cyclic chunk graph has no order in which per-load blob URLs could be minted, and resolving the cycle-closing import from its origin URL would evaluate that module outside this load's isolated graph. Rebuild the microfrontend so that its chunk graph is acyclic.`;
    return markDeterministicLoadFailure(
      new MfeLoadError(message, loadState.entryId)
    );
  }
  async createBlobUrlChainInternal(loadState, filename, build, ancestors) {
    if (build.failed) {
      return;
    }
    const chunkUrl = filename.startsWith("http://") || filename.startsWith("https://") ? filename : loadState.baseUrl + filename;
    await build.fetchBudget.acquire();
    let source;
    try {
      if (build.failed) {
        return;
      }
      source = await this.fetchSourceText(chunkUrl, loadState.attemptLedger);
    } finally {
      build.fetchBudget.release();
    }
    if (build.failed) {
      return;
    }
    const deps = this.parseStaticImportFilenames(source, filename);
    const childAncestors = new Set(ancestors);
    childAncestors.add(filename);
    const settled = await Promise.allSettled(
      deps.map(
        (dep) => this.createBlobUrlChain(loadState, dep, build, childAncestors)
      )
    );
    const failure = settled.find(
      (result) => result.status === "rejected"
    );
    if (failure) {
      build.failed = true;
      throw failure.reason;
    }
    if (build.failed) {
      return;
    }
    let rewritten = this.rewriteModuleImports(source, loadState, filename);
    rewritten = this.rewriteImportMetaUrl(rewritten, chunkUrl);
    rewritten = this.rewriteBareSpecifiers(rewritten, loadState.sharedDepBlobUrls);
    if (rewritten.includes("__frontx_lazy(")) {
      const loaderUrl = this.ensureLazyLoaderUrl(loadState);
      rewritten = `import{__frontx_lazy}from${JSON.stringify(loaderUrl)};
${rewritten}`;
    }
    const blob = new Blob([rewritten], { type: "text/javascript" });
    const blobUrl = URL.createObjectURL(blob);
    loadState.blobUrlMap.set(filename, blobUrl);
  }
  // ---- Lazy-import ABI runtime resolver (ADR-0022) ----
  /**
   * Mint (lazily) and return this load's `__frontx_lazy` loader stub blob URL.
   *
   * The stub is a tiny ESM module that re-exports a `__frontx_lazy` function
   * closed over this load's resolver id. Vendor MFE chunks transformed by
   * the build plugin reference `__frontx_lazy` as an imported binding from
   * this stub URL — that import is injected at the top of every chunk that
   * uses the identifier (see {@link createBlobUrlChainInternal}).
   *
   * Stub URL is per-load (sibling loads get distinct stubs) and never
   * revoked — per ADR-0004 + ADR-0022 the stub joins the parent load's
   * blob URL chain and shares its page-lifetime invariant.
   */
  // @cpt-algo:cpt-frontx-algo-mfe-loading-lazy-import-abi:p1
  ensureLazyLoaderUrl(loadState) {
    if (loadState.lazyLoaderUrl !== void 0) return loadState.lazyLoaderUrl;
    const registry = LazyLoaderRegistry.ensureExposed();
    const loaderId = registry.register((path) => this.resolveLazyChunk(path, loadState));
    const stubSource = buildLazyLoaderStubSource(loaderId);
    const blob = new Blob([stubSource], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    loadState.lazyLoaderUrl = url;
    return url;
  }
  /**
   * Resolve a vendor-relative lazy-import path to a per-load blob URL.
   *
   * The vendor's compiled chunk emits `__frontx_lazy('./LayoutElements-X.js')`
   * (sibling chunk reference — Rollup constant-folds the path to a hashed
   * filename relative to the importing chunk's directory). All MFE chunks
   * share a single output directory, so the path resolves to a filename
   * under `loadState.baseUrl`.
   *
   * The chunk is then funneled through {@link createBlobUrlChain}, which
   * fetches its source (via the URL-keyed `sourceTextCache`), recursively
   * rewrites bare specifiers + nested `__frontx_lazy()` calls (the static-
   * chain path takes care of both), mints a blob URL in this load's
   * `blobUrlMap`, and returns. Subsequent `__frontx_lazy(...)` calls for the
   * same path within the same load reuse the cached blob URL.
   *
   * This call site runs after `load()` has already resolved (the caller is
   * runtime code inside an already-mounted MFE, not the initial load
   * chain), so it has no static-import ancestor path to seed
   * `createBlobUrlChain`'s lineage with — the host-side registry this stub
   * calls through (see {@link ensureLazyLoaderUrl}) does not thread the
   * calling chunk's own filename back to us, so it genuinely cannot be
   * determined here. Seeding with the entry chunk instead still gives
   * `createBlobUrlChain` a non-empty starting lineage to grow from, which is
   * what the cross-branch join/contribute mechanism it implements needs to
   * detect a cycle between two lazy chunks triggered concurrently and
   * cross-referencing each other — the same shape of deadlock the
   * class-level doc comment on {@link createBlobUrlChain} describes for the
   * static-import case, reachable here too because this does not start a
   * disconnected, empty lineage against the load's shared `inFlight` map.
   */
  async resolveLazyChunk(relPath, loadState) {
    const filename = this.resolveRelativePath(
      loadState.entryChunkFilename,
      relPath
    );
    const build = createChainBuildState();
    await this.createBlobUrlChain(
      loadState,
      filename,
      build,
      /* @__PURE__ */ new Set([loadState.entryChunkFilename])
    );
    const blobUrl = loadState.blobUrlMap.get(filename);
    if (blobUrl === void 0) {
      throw new MfeLoadError(
        `__frontx_lazy: failed to mint blob URL for lazy chunk '${relPath}'`,
        loadState.entryId
      );
    }
    return blobUrl;
  }
  /**
   * Replace all `import.meta.url` references with the chunk's real base URL.
   *
   * The base URL is the directory containing the chunk (trailing slash included),
   * derived by stripping the filename from the full chunk URL. This is the URL
   * that relative `new URL("../x", import.meta.url)` calls should resolve against.
   */
  rewriteImportMetaUrl(source, chunkAbsoluteUrl) {
    const lastSlash = chunkAbsoluteUrl.lastIndexOf("/");
    const chunkBaseUrl = lastSlash >= 0 ? chunkAbsoluteUrl.slice(0, lastSlash + 1) : chunkAbsoluteUrl;
    return source.replace(/import\.meta\.url/g, JSON.stringify(chunkBaseUrl));
  }
  // ---- Source text fetching and parsing ----
  /**
   * Fetch the source text of a chunk. Uses an in-memory cache so each URL
   * is fetched at most once across all loads.
   */
  fetchSourceText(absoluteChunkUrl, ledger) {
    const cached = this.sourceTextCache.get(absoluteChunkUrl);
    if (cached !== void 0) {
      ledger?.record(this.sourceTextCache, absoluteChunkUrl, cached);
      return cached;
    }
    const fetchPromise = fetch(absoluteChunkUrl).then((response) => {
      if (!response.ok) {
        throw new MfeLoadError(
          `HTTP ${response.status} fetching chunk source: ${absoluteChunkUrl}`,
          absoluteChunkUrl
        );
      }
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("text/html")) {
        throw new MfeLoadError(
          `Server returned HTML for chunk URL (Content-Type: ${contentType}). The chunk does not exist at the expected path: ${absoluteChunkUrl}. Run "npm run generate:mfe-manifests" to synchronize chunk paths with the current MFE build.`,
          absoluteChunkUrl
        );
      }
      return response.text();
    }).then((text) => {
      if (text.trimStart().startsWith("<")) {
        throw new MfeLoadError(
          `Chunk response starts with "<" \u2014 server returned HTML instead of JavaScript: ${absoluteChunkUrl}. Run "npm run generate:mfe-manifests" to synchronize chunk paths with the current MFE build.`,
          absoluteChunkUrl
        );
      }
      return text;
    }).catch((error) => {
      this.sourceTextCache.delete(absoluteChunkUrl);
      if (error instanceof MfeLoadError) {
        throw error;
      }
      throw new MfeLoadError(
        `Network error fetching chunk source: ${absoluteChunkUrl}: ${error instanceof Error ? error.message : String(error)}`,
        absoluteChunkUrl,
        error instanceof Error ? error : void 0
      );
    });
    this.sourceTextCache.set(absoluteChunkUrl, fetchPromise);
    ledger?.record(this.sourceTextCache, absoluteChunkUrl, fetchPromise);
    return fetchPromise;
  }
  /**
   * Extract resolved filenames from static import statements.
   *
   * Matches all relative imports (both './' and '../' prefixed) and resolves
   * them relative to the importing chunk's path. For example, a chunk at
   * '__federation_shared_@gears-frontx/react.js' importing '../runtime.js' resolves
   * to 'runtime.js' (relative to baseUrl).
   */
  parseStaticImportFilenames(source, chunkFilename) {
    const filenames = [];
    const namedRegex = /from\s*['"](\.\.?\/[^'"]+)['"]/g;
    let match;
    while ((match = namedRegex.exec(source)) !== null) {
      filenames.push(this.resolveRelativePath(chunkFilename, match[1]));
    }
    filenames.push(
      ...this.parseBareSideEffectImportFilenames(source, chunkFilename)
    );
    return [...new Set(filenames)];
  }
  parseBareSideEffectImportFilenames(source, chunkFilename) {
    const filenames = [];
    let cursor = 0;
    while (cursor < source.length) {
      const importIndex = source.indexOf("import", cursor);
      if (importIndex === -1) {
        break;
      }
      if (!this.hasBareImportBoundary(source, importIndex)) {
        cursor = importIndex + "import".length;
        continue;
      }
      let specifierIndex = this.skipImportWhitespace(
        source,
        importIndex + "import".length
      );
      const quote = source[specifierIndex];
      if (quote !== '"' && quote !== "'") {
        cursor = importIndex + "import".length;
        continue;
      }
      specifierIndex += 1;
      if (!this.isRelativeImportSpecifier(source, specifierIndex)) {
        cursor = specifierIndex;
        continue;
      }
      let specifierEnd = specifierIndex;
      while (specifierEnd < source.length && source[specifierEnd] !== quote) {
        specifierEnd += 1;
      }
      if (specifierEnd >= source.length) {
        break;
      }
      filenames.push(
        this.resolveRelativePath(
          chunkFilename,
          source.slice(specifierIndex, specifierEnd)
        )
      );
      cursor = specifierEnd + 1;
    }
    return filenames;
  }
  hasBareImportBoundary(source, importIndex) {
    let boundaryIndex = importIndex - 1;
    while (boundaryIndex >= 0 && this.isBareImportWhitespace(source[boundaryIndex])) {
      boundaryIndex -= 1;
    }
    return boundaryIndex < 0 || source[boundaryIndex] === ";" || source[boundaryIndex] === "\n";
  }
  skipImportWhitespace(source, index) {
    let cursor = index;
    while (cursor < source.length && this.isImportWhitespace(source[cursor])) {
      cursor += 1;
    }
    return cursor;
  }
  isRelativeImportSpecifier(source, index) {
    return source[index] === "." && (source[index + 1] === "/" || source[index + 1] === "." && source[index + 2] === "/");
  }
  isBareImportWhitespace(char) {
    return char === " " || char === "	" || char === "\r";
  }
  isImportWhitespace(char) {
    return this.isBareImportWhitespace(char) || char === "\n";
  }
  /**
   * Rewrite all relative imports in a module's source text.
   *
   * Handles both './' and '../' relative imports. Each relative specifier
   * is resolved against the chunk's own path to produce a normalized key
   * for the blobUrlMap lookup.
   *
   * A dependency missing from `blobUrlMap` has no sanctioned reading: it is
   * a chunk that was never built, and no case exists in which an absence is
   * deliberate, because a detected dependency cycle fails the build where
   * it is detected.
   * Emitting an origin URL for an absent dependency would silently hand
   * back a module that evaluates outside the load's isolated graph with its
   * own bare specifiers unrewritten — a far worse outcome than a
   * diagnostic, so it fails the load instead.
   */
  rewriteModuleImports(source, loadState, chunkFilename) {
    const resolve = (relPath) => {
      const resolved = this.resolveRelativePath(chunkFilename, relPath);
      const blobUrl = loadState.blobUrlMap.get(resolved);
      if (blobUrl) return blobUrl;
      throw new MfeLoadError(
        `Chunk '${chunkFilename}' imports '${relPath}' (resolved to '${resolved}'), which has no blob URL in this load \u2014 its construction never completed. There is no sanctioned reason for the absence: a detected dependency cycle fails the build where it is detected. Refusing to rewrite the import to its origin URL, which would evaluate that module outside the load's isolated module graph.`,
        loadState.entryId
      );
    };
    let result = source.replace(
      /from\s*'(\.\.?\/[^']+)'/g,
      (_match, relPath) => `from '${resolve(relPath)}'`
    );
    result = result.replace(
      /from\s*"(\.\.?\/[^"]+)"/g,
      (_match, relPath) => `from "${resolve(relPath)}"`
    );
    result = result.replace(
      /import\s*'(\.\.?\/[^']+)'\s*;?/g,
      (_match, relPath) => `import '${resolve(relPath)}';`
    );
    result = result.replace(
      /import\s*"(\.\.?\/[^"]+)"\s*;?/g,
      (_match, relPath) => `import "${resolve(relPath)}";`
    );
    return result;
  }
  /**
   * Resolve a relative import path against the importing chunk's filename.
   *
   * Uses URL resolution to correctly handle '../' traversals. For example:
   *  - resolveRelativePath('__federation_shared_@gears-frontx/react.js', '../runtime.js')
   *    → 'runtime.js'
   *  - resolveRelativePath('expose-Widget1.js', './dep.js')
   *    → 'dep.js'
   */
  resolveRelativePath(fromChunkFilename, relativeSpecifier) {
    if (fromChunkFilename.startsWith("http://") || fromChunkFilename.startsWith("https://")) {
      return new URL(relativeSpecifier, fromChunkFilename).href;
    }
    const syntheticBase = "http://r/";
    const fromUrl = new URL(fromChunkFilename, syntheticBase);
    const resolved = new URL(relativeSpecifier, fromUrl);
    return resolved.pathname.slice(1);
  }
};
function isMfManifest(value) {
  if (typeof value !== "object" || value === null) return false;
  return "id" in value && typeof value.id === "string" && "name" in value && typeof value.name === "string" && "metaData" in value && typeof value.metaData === "object" && value.metaData !== null && "shared" in value && Array.isArray(value.shared);
}
var RENDEZVOUS_PROTOCOL_VERSION = 3;
var RENDEZVOUS_KEY = /* @__PURE__ */ Symbol.for("@gears-frontx/mfes:mount-context:1");
var LINK_PROPERTY_KEY = /* @__PURE__ */ Symbol.for("@gears-frontx/mfes:inbound-bridge-link:1");
function getRendezvousStack() {
  const host = globalThis;
  let stack = host[RENDEZVOUS_KEY];
  if (!stack) {
    stack = [];
    host[RENDEZVOUS_KEY] = stack;
  }
  return stack;
}
function pushAmbientMountingBridge(bridge) {
  getRendezvousStack().push({ v: RENDEZVOUS_PROTOCOL_VERSION, bridge, adopters: [] });
}
function popAmbientMountingBridge() {
  return getRendezvousStack().pop()?.adopters ?? [];
}
function registerInboundBridgeLink(bridge, link) {
  bridge[LINK_PROPERTY_KEY] = link;
}
function unregisterInboundBridgeLink(bridge) {
  delete bridge[LINK_PROPERTY_KEY];
}
function adoptAmbientInboundBridgeLink(relink) {
  const stack = getRendezvousStack();
  const entry = stack[stack.length - 1];
  if (!entry) {
    return void 0;
  }
  if (entry.v !== RENDEZVOUS_PROTOCOL_VERSION) {
    console.debug(
      `[DefaultMfeRegistry] Mount-context rendezvous entry carries an unrecognized protocol version (found ${entry.v}, this copy recognizes ${RENDEZVOUS_PROTOCOL_VERSION}). Treating this registry as a root registry rather than misattributing another extension's bridge.`
    );
    return void 0;
  }
  const link = entry.bridge[LINK_PROPERTY_KEY];
  if (!link) {
    console.debug(
      "[DefaultMfeRegistry] A mount is synchronously in progress but no inbound-bridge link was found on its bridge. Treating this registry as a root registry."
    );
    return void 0;
  }
  entry.adopters.push(relink);
  return link;
}
var arrivalEdgeByAction = /* @__PURE__ */ new WeakMap();
function tagArrivalEdge(action, edge) {
  arrivalEdgeByAction.set(action, edge);
}
function getArrivalEdge(action) {
  return arrivalEdgeByAction.get(action);
}
var CROSS_HOP_PROTOCOL_VERSION = 1;
var CrossHopRoute = class {
  constructor(sendFn) {
    this.sendFn = sendFn;
  }
  sendFn;
  /**
   * Hand the envelope across this hop. Throws to refuse; returns once the
   * far side accepted.
   */
  send(envelope) {
    this.sendFn(envelope);
  }
};
var ActionTimeoutResolver = class {
  /**
   * @param declaredTimeout - The action's declared timeout, if any.
   * @param domain - The target's domain, whose `defaultActionTimeout` applies
   *   when the action declares no timeout.
   * @param targetId - The target id, named in the error thrown when neither
   *   a declared timeout nor a domain exists.
   * @returns The timeout in milliseconds.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-resolve-timeout
  resolve(declaredTimeout, domain, targetId) {
    if (declaredTimeout !== void 0) {
      return declaredTimeout;
    }
    if (domain) {
      return domain.defaultActionTimeout;
    }
    throw new Error('Cannot resolve timeout: no domain found for target "' + targetId + '"');
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-resolve-timeout
};
var DeclaredTimeoutActionHandler = class extends ActionHandler {
  /**
   * A direct call through the public `ActionHandler` surface carries no
   * declared timeout — resolved to the domain default by
   * `handleActionWithDeclaredTimeout`'s own timeout resolution.
   */
  async handleAction(actionTypeId, payload) {
    return this.handleActionWithDeclaredTimeout(actionTypeId, payload, void 0);
  }
};
function isCrossHopRoute(resolved) {
  return resolved instanceof CrossHopRoute;
}
var DefaultActionsChainsMediator = class extends ActionsChainsMediator {
  /**
   * The Type System plugin instance.
   */
  typeSystem;
  /**
   * Domain state lookup for per-action timeout resolution.
   */
  getDomainState;
  /**
   * Registered-extension entry lookup for the declaration check.
   */
  getExtensionEntry;
  /**
   * Resolves a downward forwarding entry for a target, excluding an entry
   * whose bridge equals the action's arrival edge.
   */
  resolveForwardingEntry;
  /**
   * Resolves the escalation route through this registry's inbound bridge;
   * `undefined` at the shell.
   */
  resolveEscalation;
  /**
   * Keyed handler registry: targetId → (actionTypeId → handler).
   */
  actionHandlers = /* @__PURE__ */ new Map();
  /**
   * Extension target → domain id, for resolving the domain default timeout
   * of an extension-targeted action.
   */
  targetDomainMap = /* @__PURE__ */ new Map();
  /**
   * The shared per-action timeout rule, also used by the occupancy queue.
   */
  actionTimeoutResolver;
  constructor(config) {
    super();
    this.typeSystem = config.typeSystem;
    this.getDomainState = config.getDomainState;
    this.getExtensionEntry = config.getExtensionEntry;
    this.resolveForwardingEntry = config.resolveForwardingEntry;
    this.resolveEscalation = config.resolveEscalation;
    this.actionTimeoutResolver = config.actionTimeoutResolver ?? new ActionTimeoutResolver();
  }
  /**
   * Execute an actions chain. Returns nothing awaitable.
   *
   * @param chain - The actions chain to execute.
   */
  // @cpt-begin:cpt-frontx-flow-mfe-host-communication-dispatch-chain:p1:inst-invoke-execute
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-accept-yields-nothing
  executeActionsChain(chain) {
    void this.executeChain(chain);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-accept-yields-nothing
  // @cpt-end:cpt-frontx-flow-mfe-host-communication-dispatch-chain:p1:inst-invoke-execute
  /**
   * Accept a sub-chain handed over across a hop and execute it after this
   * call returns. The caller has already checked the envelope version and
   * this registry's disposal. A chain handed down from the parent has its
   * action resolved by this runtime's own handlers only, never escalated.
   *
   * @internal
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-receive-transfer
  // @cpt-begin:cpt-frontx-flow-mfe-host-communication-dispatch-chain:p1:inst-flow-accepted-continues
  receiveHandedOverChain(chain, fromParent = false) {
    void Promise.resolve().then(() => this.executeChain(chain, !fromParent));
  }
  // @cpt-end:cpt-frontx-flow-mfe-host-communication-dispatch-chain:p1:inst-flow-accepted-continues
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-receive-transfer
  /**
   * Execute `chain.action`, then `chain.next` recursively on success or
   * `chain.fallback` recursively on failure. An absent branch ends the
   * chain. A sub-chain handed over across a hop ends here. Never rejects.
   */
  // @cpt-algo:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1
  async executeChain(chain, escalate = true) {
    try {
      const { action } = chain;
      const resolved = this.resolveHandler(action.target, action.type, getArrivalEdge(action), escalate);
      if (!resolved) {
        throw new NoHandlerForActionTargetError(action.target, action.type);
      }
      if (isCrossHopRoute(resolved)) {
        resolved.send({ version: CROSS_HOP_PROTOCOL_VERSION, chain });
        return;
      }
      this.typeSystem.register(action);
      this.checkDeclaration(action);
      await this.invokeWithinTimeout(action, resolved);
    } catch {
      if (chain?.fallback) {
        return this.executeChain(chain.fallback);
      }
      return;
    }
    if (chain.next) {
      return this.executeChain(chain.next);
    }
    return;
  }
  /**
   * Declaration check: the target entry must declare the action type in its
   * receivable `actions`. Infrastructure lifecycle actions are exempt; a
   * target with no registered entry is not checked.
   */
  checkDeclaration(action) {
    if (isInfrastructureLifecycleAction(action.type, this.typeSystem)) {
      return;
    }
    const entry = this.getExtensionEntry(action.target);
    if (entry && !entry.actions.includes(action.type)) {
      throw new Error(
        `Action type '${action.type}' is not declared by target entry '${entry.id}'`
      );
    }
  }
  /**
   * Invoke the handler within the per-action timeout: the action's declared
   * timeout, otherwise the domain default. Rejects on handler failure or
   * timeout expiry.
   */
  invokeWithinTimeout(action, handler) {
    const timeout = this.actionTimeoutResolver.resolve(
      action.timeout,
      this.resolveDomain(action.target),
      action.target
    );
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Action timeout after ${timeout}ms`));
      }, timeout);
      const settle = (outcome) => {
        clearTimeout(timer);
        outcome();
      };
      try {
        const invocation = handler instanceof DeclaredTimeoutActionHandler ? handler.handleActionWithDeclaredTimeout(action.type, action.payload, action.timeout) : handler.handleAction(action.type, action.payload);
        invocation.then(
          () => settle(resolve),
          (error) => settle(() => reject(error))
        );
      } catch (error) {
        settle(() => reject(error));
      }
    });
  }
  /**
   * Resolve the handler for a (targetId, actionTypeId) pair: exact
   * (target, action type) keyed handler, then a downward forwarding entry (excluding one whose
   * bridge equals the arrival edge), then escalation unless `escalate` is
   * false.
   *
   * @returns The handler or cross-hop route, or undefined if none resolves.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-keyed-lookup
  resolveHandler(targetId, actionTypeId, arrivalEdge, escalate) {
    const targetHandlers = this.actionHandlers.get(targetId);
    if (targetHandlers) {
      const handler = targetHandlers.get(actionTypeId);
      if (handler) {
        return handler;
      }
    }
    const forwardingRoute = this.resolveForwardingEntry?.(targetId, arrivalEdge);
    if (forwardingRoute) {
      return forwardingRoute;
    }
    return escalate ? this.resolveEscalation?.() : void 0;
  }
  /**
   * Resolve the domain of a target: the target itself when it is a domain,
   * otherwise the domain an extension target was registered under.
   */
  resolveDomain(targetId) {
    const domainState = this.getDomainState(targetId);
    if (domainState) {
      return domainState.domain;
    }
    const domainId = this.targetDomainMap.get(targetId);
    return domainId ? this.getDomainState(domainId)?.domain : void 0;
  }
  /**
   * Register a handler for a specific (targetId, actionTypeId) pair.
   *
   * @param targetId - ID of the target (domain or extension)
   * @param actionTypeId - The action type this handler handles
   * @param handler - Handler to invoke
   * @param domainId - Domain ID for extension targets (default timeout resolution)
   */
  registerHandler(targetId, actionTypeId, handler, domainId) {
    let targetHandlers = this.actionHandlers.get(targetId);
    if (!targetHandlers) {
      targetHandlers = /* @__PURE__ */ new Map();
      this.actionHandlers.set(targetId, targetHandlers);
    }
    targetHandlers.set(actionTypeId, handler);
    if (domainId !== void 0) {
      this.targetDomainMap.set(targetId, domainId);
    }
  }
  /**
   * Unregister a handler for a specific (targetId, actionTypeId) pair.
   */
  unregisterHandler(targetId, actionTypeId) {
    const targetHandlers = this.actionHandlers.get(targetId);
    if (targetHandlers) {
      targetHandlers.delete(actionTypeId);
      if (targetHandlers.size === 0) {
        this.actionHandlers.delete(targetId);
        this.targetDomainMap.delete(targetId);
      }
    }
  }
  /**
   * Unregister every handler for a target.
   */
  unregisterAllHandlers(targetId) {
    this.actionHandlers.delete(targetId);
    this.targetDomainMap.delete(targetId);
  }
};
var WeakMapRuntimeCoordinator = class extends RuntimeCoordinator {
  /**
   * Private WeakMap for runtime coordination.
   *
   * The WeakMap keys on container Elements, so when a container is garbage
   * collected, the RuntimeConnection is automatically cleaned up.
   *
   * @private
   */
  connections = /* @__PURE__ */ new WeakMap();
  /**
   * Register a runtime connection for a container element.
   *
   * @param container - The DOM element containing the MFE
   * @param connection - The runtime connection metadata
   */
  register(container, connection) {
    this.connections.set(container, connection);
  }
  /**
   * Get the runtime connection for a container element.
   *
   * @param container - The DOM element to lookup
   * @returns The runtime connection, or undefined if not registered
   */
  get(container) {
    return this.connections.get(container);
  }
  /**
   * Unregister a runtime connection for a container element.
   *
   * @param container - The DOM element to unregister
   */
  unregister(container) {
    this.connections.delete(container);
  }
};
var DefaultExtensionManager = class extends ExtensionManager {
  domains = /* @__PURE__ */ new Map();
  extensions = /* @__PURE__ */ new Map();
  typeSystem;
  triggerLifecycle;
  triggerDomainOwnLifecycle;
  unmountExtension;
  releaseExtensionBridge;
  validateEntryType;
  /**
   * The router snapshotted by the factory, or `undefined` for a standalone
   * registry. Presented an extension through `registerExtension` after
   * every runtime check passes and before the extension's state is stored
   * (`cpt-frontx-algo-mfe-registry-router-admission` `inst-algo-ra-present-extension`)
   * — this is the one point in the registration flow that precedes storage,
   * since `DefaultExtensionManager.registerExtension` itself commits state.
   */
  router;
  constructor(config) {
    super();
    this.typeSystem = config.typeSystem;
    this.triggerLifecycle = config.triggerLifecycle;
    this.triggerDomainOwnLifecycle = config.triggerDomainOwnLifecycle;
    this.unmountExtension = config.unmountExtension;
    this.releaseExtensionBridge = config.releaseExtension;
    this.validateEntryType = config.validateEntryType;
    this.router = config.router;
  }
  // @cpt-begin:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-register-domain-call
  // Type-system registration for the domain deliberately does not happen
  // here: the provider's `register()` cannot validate without also
  // persisting the domain to the GtsStore (no validate-only call exists on
  // the port), so registering this early would leave a router-rejected (or
  // factory/cardinality-rejected) domain durably registered with the type
  // system before the caller (`DefaultMfeRegistry.registerDomain`) ever
  // reaches router admission. That caller runs
  // `this.typeSystem.register(declaration)` itself, after every one of its
  // own checks — including router admission — passes
  // (`cpt-frontx-algo-mfe-registry-router-admission` `inst-algo-ra-present-domain`).
  // This method only validates and records the in-memory, fully reversible
  // domain state: every failure path downstream calls `unregisterDomain` to
  // undo it.
  registerDomain(domain) {
    const lifecycleValidation = validateDomainLifecycleHooks(domain);
    if (!lifecycleValidation.valid) {
      const firstError = lifecycleValidation.errors[0];
      const stageId = firstError?.stage ?? "unknown";
      const message = firstError?.message ?? `Unsupported lifecycle stage '${stageId}'`;
      throw new UnsupportedLifecycleStageError(
        message,
        stageId,
        domain.id,
        domain.lifecycleStages
      );
    }
    this.domains.set(domain.id, {
      domain,
      properties: /* @__PURE__ */ new Map(),
      extensions: /* @__PURE__ */ new Set(),
      propertySubscribers: /* @__PURE__ */ new Map(),
      mountedExtensions: [],
      mounter: null,
      lifecycleTrigger: null,
      implementation: null
    });
  }
  // @cpt-end:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-register-domain-call
  async unregisterDomain(domainId) {
    const domainState = this.domains.get(domainId);
    if (!domainState) {
      return;
    }
    const extensionIds = Array.from(domainState.extensions);
    for (const extensionId of extensionIds) {
      await this.unregisterExtension(extensionId);
    }
    this.triggerDomainOwnLifecycle(
      domainId,
      this.typeSystem.resolveLifecycleStageDestroyedId()
    );
    this.domains.delete(domainId);
  }
  // @cpt-begin:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-register-extension
  async registerExtension(extension) {
    const domainState = this.domains.get(extension.domain);
    if (!domainState) {
      throw new Error(
        `Cannot register extension '${extension.id}': domain '${extension.domain}' is not registered. Register the domain first using registerDomain().`
      );
    }
    const entry = this.resolveEntry(extension.entry);
    if (!entry) {
      throw new Error(
        `Entry '${extension.entry}' not found. Entries must be resolved before extension registration.`
      );
    }
    const contractResult = validateContract(entry, domainState.domain, this.typeSystem);
    if (!contractResult.valid) {
      const details = contractResult.errors.map((e) => `  - ${e.type}: ${e.details}`).join("\n");
      throw new Error(
        `Contract validation failed for extension '${extension.entry}' in domain '${extension.domain}':
${details}`
      );
    }
    validateExtensionType(this.typeSystem, domainState.domain, extension);
    const lifecycleValidation = validateExtensionLifecycleHooks(
      extension,
      domainState.domain
    );
    if (!lifecycleValidation.valid) {
      const firstError = lifecycleValidation.errors[0];
      throw new UnsupportedLifecycleStageError(
        firstError?.message ?? `Unsupported lifecycle stage`,
        firstError?.stage ?? "unknown",
        extension.id,
        domainState.domain.extensionsLifecycleStages
      );
    }
    this.validateEntryType(entry.id);
    if (this.router) {
      this.router.registerExtension(extension);
    }
    try {
      this.typeSystem.register(extension);
    } catch (cause) {
      if (this.router) {
        try {
          this.router.releaseExtension(extension.id);
        } catch (releaseError) {
          console.error(
            `[DefaultExtensionManager] releaseExtension failed for '${extension.id}':`,
            releaseError
          );
        }
      }
      throw cause;
    }
    const extensionState = {
      extension,
      entry,
      bridge: null,
      childBridge: null,
      loadState: "idle",
      mountState: "unmounted",
      container: null,
      lifecycle: null,
      error: void 0
    };
    this.extensions.set(extension.id, extensionState);
    domainState.extensions.add(extension.id);
    this.triggerLifecycle(
      extension.id,
      this.typeSystem.resolveLifecycleStageInitId()
    );
  }
  // @cpt-end:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-register-extension
  async unregisterExtension(extensionId) {
    const extensionState = this.extensions.get(extensionId);
    if (!extensionState) {
      return;
    }
    if (extensionState.mountState === "mounted") {
      await this.unmountExtension(extensionId);
    }
    this.triggerLifecycle(
      extensionId,
      this.typeSystem.resolveLifecycleStageDestroyedId()
    );
    this.releaseExtensionBridge(extensionId);
    const domainState = this.domains.get(extensionState.extension.domain);
    if (domainState) {
      domainState.extensions.delete(extensionId);
    }
    this.extensions.delete(extensionId);
  }
  getDomainState(domainId) {
    return this.domains.get(domainId);
  }
  getExtensionState(extensionId) {
    return this.extensions.get(extensionId);
  }
  getExtensionStatesForDomain(domainId) {
    const domainState = this.domains.get(domainId);
    if (!domainState) {
      return [];
    }
    const states = [];
    for (const extensionId of domainState.extensions) {
      const extensionState = this.extensions.get(extensionId);
      if (extensionState) {
        states.push(extensionState);
      }
    }
    return states;
  }
  updateSharedProperty(propertyId, value) {
    const matchingDomainStates = [];
    for (const domainState of this.domains.values()) {
      if (domainState.domain.sharedProperties.includes(propertyId)) {
        matchingDomainStates.push(domainState);
      }
    }
    if (matchingDomainStates.length === 0) {
      return;
    }
    const ephemeralId = `${propertyId}frontx.mfes.comm.runtime.v1`;
    this.typeSystem.register({ id: ephemeralId, value });
    for (const domainState of matchingDomainStates) {
      domainState.properties.set(propertyId, value);
      const subscribers = domainState.propertySubscribers.get(propertyId);
      if (subscribers) {
        for (const callback of subscribers) {
          callback(propertyId, value);
        }
      }
    }
  }
  getDomainProperty(domainId, propertyTypeId) {
    const domainState = this.domains.get(domainId);
    if (!domainState) {
      throw new Error(`Domain '${domainId}' not registered`);
    }
    return domainState.properties.get(propertyTypeId);
  }
  resolveEntry(entryId) {
    for (const state of this.extensions.values()) {
      if (state.entry.id === entryId) {
        return state.entry;
      }
    }
    const schema = this.typeSystem.getSchema(entryId);
    if (schema && this.isMfeEntry(schema)) {
      return schema;
    }
    return void 0;
  }
  isMfeEntry(value) {
    if (typeof value !== "object" || value === null) return false;
    const candidate = value;
    return typeof candidate.id === "string" && Array.isArray(candidate.requiredProperties) && Array.isArray(candidate.actions) && Array.isArray(candidate.domainActions);
  }
  clear() {
    for (const extensionId of Array.from(this.extensions.keys())) {
      this.releaseExtensionBridge(extensionId);
    }
    this.domains.clear();
    this.extensions.clear();
  }
  getMountedExtensions(domainId) {
    const domainState = this.domains.get(domainId);
    if (!domainState) {
      return [];
    }
    return domainState.mountedExtensions.slice();
  }
  addMountedExtension(domainId, extensionId) {
    const domainState = this.domains.get(domainId);
    if (!domainState) {
      return;
    }
    if (!domainState.mountedExtensions.includes(extensionId)) {
      domainState.mountedExtensions.push(extensionId);
    }
  }
  removeMountedExtension(domainId, extensionId) {
    const domainState = this.domains.get(domainId);
    if (!domainState) {
      return;
    }
    const idx = domainState.mountedExtensions.indexOf(extensionId);
    if (idx !== -1) {
      domainState.mountedExtensions.splice(idx, 1);
    }
  }
  // @cpt-begin:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-domain-registered
  setDomainImplementation(domainId, mounter, lifecycleTrigger, implementation) {
    const domainState = this.domains.get(domainId);
    if (!domainState) {
      throw new Error(`Domain '${domainId}' not registered`);
    }
    domainState.mounter = mounter;
    domainState.lifecycleTrigger = lifecycleTrigger;
    domainState.implementation = implementation;
  }
  // @cpt-end:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-domain-registered
};
var LifecycleManager = class {
};
var DefaultLifecycleManager = class extends LifecycleManager {
  /**
   * Extension manager for accessing extension and domain state.
   */
  extensionManager;
  /**
   * The registry's `executeActionsChain`, which each hook's chain is handed to.
   */
  executeActionsChain;
  constructor(extensionManager, executeActionsChain) {
    super();
    this.extensionManager = extensionManager;
    this.executeActionsChain = executeActionsChain;
  }
  /**
   * Trigger a lifecycle stage for a specific extension. Hands the chain of
   * every hook registered for the given stage, in declaration order, to
   * `executeActionsChain` without awaiting it.
   *
   * @param extensionId - ID of the extension
   * @param stageId - ID of the lifecycle stage to trigger
   */
  triggerLifecycleStage(extensionId, stageId) {
    const extensionState = this.extensionManager.getExtensionState(extensionId);
    if (!extensionState) {
      throw new Error(`Cannot trigger lifecycle stage: extension '${extensionId}' is not registered`);
    }
    this.triggerLifecycleStageInternal(extensionState.extension, stageId);
  }
  /**
   * Trigger a lifecycle stage for all extensions in a domain.
   * Useful for custom stages like "refresh" that affect all widgets.
   *
   * @param domainId - ID of the domain
   * @param stageId - ID of the lifecycle stage to trigger
   */
  triggerDomainLifecycleStage(domainId, stageId) {
    const domainState = this.extensionManager.getDomainState(domainId);
    if (!domainState) {
      throw new Error(`Cannot trigger lifecycle stage: domain '${domainId}' is not registered`);
    }
    const extensionStates = this.extensionManager.getExtensionStatesForDomain(domainId);
    for (const extensionState of extensionStates) {
      this.triggerLifecycleStageInternal(extensionState.extension, stageId);
    }
  }
  /**
   * Trigger a lifecycle stage for a domain itself.
   * Executes hooks registered on the domain entity.
   *
   * @param domainId - ID of the domain
   * @param stageId - ID of the lifecycle stage to trigger
   */
  triggerDomainOwnLifecycleStage(domainId, stageId) {
    const domainState = this.extensionManager.getDomainState(domainId);
    if (!domainState) {
      throw new Error(`Cannot trigger lifecycle stage: domain '${domainId}' is not registered`);
    }
    this.triggerLifecycleStageInternal(domainState.domain, stageId);
  }
  /**
   * Internal helper for triggering lifecycle stages.
   *
   * Collects hooks matching the stage and hands their actions chains, one
   * per hook, in declaration order, to `executeActionsChain` without
   * awaiting any of them (`inst-algo-lst-collect`,
   * `inst-algo-lst-dispatch-order`). Declaration order governs dispatch
   * order only (`inst-algo-lst-no-completion-order`). Returns once every
   * collected hook's chain has been handed over
   * (`inst-algo-lst-return-non-blocking`).
   *
   * @param entity - Extension or ExtensionDomain entity
   * @param stageId - ID of the lifecycle stage to trigger
   * @private
   */
  triggerLifecycleStageInternal(entity, stageId) {
    if (!entity.lifecycle) {
      return;
    }
    const hooks = entity.lifecycle.filter((hook) => hook.stage === stageId);
    if (hooks.length === 0) {
      return;
    }
    for (const hook of hooks) {
      this.executeActionsChain(hook.actions_chain);
    }
    return;
  }
};
var RENDEZVOUS_PROTOCOL_VERSION2 = 1;
var OCCUPANT_VALUE_KEY = /* @__PURE__ */ Symbol.for("@gears-frontx/mfes:occupant-value:1");
function isStructuralWeakMap(candidate) {
  if (typeof candidate !== "object" || candidate === null) {
    return false;
  }
  const maybeMap = candidate;
  return typeof maybeMap.get === "function" && typeof maybeMap.set === "function" && typeof maybeMap.has === "function" && typeof maybeMap.delete === "function";
}
function isRecognizedEntry(candidate) {
  if (typeof candidate !== "object" || candidate === null) {
    return false;
  }
  const maybeEntry = candidate;
  return maybeEntry.v === RENDEZVOUS_PROTOCOL_VERSION2 && isStructuralWeakMap(maybeEntry.values);
}
function resolveValuesMap() {
  const host = globalThis;
  const existing = host[OCCUPANT_VALUE_KEY];
  if (existing === void 0) {
    const values = /* @__PURE__ */ new WeakMap();
    host[OCCUPANT_VALUE_KEY] = { v: RENDEZVOUS_PROTOCOL_VERSION2, values };
    return values;
  }
  if (isRecognizedEntry(existing)) {
    return existing.values;
  }
  console.debug(
    `[occupant-value-rendezvous] Realm occupant-value rendezvous slot (${String(OCCUPANT_VALUE_KEY)}) carries an entry this copy does not recognize as protocol version ${RENDEZVOUS_PROTOCOL_VERSION2}. Leaving that entry untouched \u2014 every mount this copy performs proceeds with no occupant value crossing.`
  );
  return void 0;
}
function associateOccupantValue(bridge, value) {
  resolveValuesMap()?.set(bridge, value);
}
function readOccupantValue(bridge) {
  if (!bridge) {
    return void 0;
  }
  return resolveValuesMap()?.get(bridge);
}
function releaseOccupantValue(bridge) {
  if (!bridge) {
    return;
  }
  resolveValuesMap()?.delete(bridge);
}
var DefaultMountManager = class extends MountManager {
  extensionManager;
  resolveHandler;
  coordinator;
  typeSystem;
  triggerLifecycle;
  /**
   * The registry's `executeActionsChain` — wired to the child bridge's
   * public capability (`dispatchActionsChain` param of `acquireBridge`)
   * (`cpt-frontx-adr-mfe-runtime-public-surface`).
   */
  dispatchActionsChain;
  hostRuntime;
  registerExtensionActionHandler;
  unregisterExtensionActionHandler;
  bridgeFactory;
  buildInboundBridgeLink;
  retractInboundBridgeLink;
  /** The router snapshotted by the factory, or `undefined` for a standalone registry. */
  router;
  /**
   * Reads this registry's own inbound bridge, if any — the enclosing-value
   * key for `assignOccupantValue` (`inst-ov-enclosing-value`). Threaded in
   * the same way as `buildInboundBridgeLink`/`retractInboundBridgeLink`
   * rather than as a new method on `MfeRegistry` or `DefaultMfeRegistry`.
   */
  getInboundBridge;
  /**
   * The `ChildMfeBridge` whose inbound link is registered for each extension,
   * set at the first mount after each registration and deleted by
   * `releaseExtension`. Distinct from an extension's retained bridge pair on
   * `ExtensionState`: this map tracks the one bridge object a descendant
   * registry may have propagated advertisements through, so
   * `releaseExtension` can trigger parent-owned retraction
   * (`inst-retract-advertisements`) for it.
   */
  childBridgesByExtension = /* @__PURE__ */ new Map();
  /**
   * The re-link callbacks of the registries that adopted an inbound link in
   * the latest mount window that produced a claim, keyed by extension id. A
   * fresh claim replaces the entry (unlinking the adopters it supersedes).
   * `releaseExtension` unlinks the adopters (`relink(null)`) but keeps the
   * entry, so the next mount after re-registration re-offers them the current
   * link. An ordinary unmount leaves the entry unchanged.
   */
  inboundAdoptersByExtension = /* @__PURE__ */ new Map();
  /**
   * The in-flight `loadExtension` promise for an extension currently in
   * `loadState === 'loading'`, keyed by extension id. A second concurrent
   * `loadExtension` call for the same extension awaits this promise instead
   * of returning immediately, so it observes the same completion (or
   * failure) as the original caller rather than resolving before the load
   * has actually finished.
   */
  inFlightLoadsByExtension = /* @__PURE__ */ new Map();
  /**
   * The in-flight `mountExtension` promise for an extension currently in
   * `mountState === 'mounting'`, keyed by extension id. A second concurrent
   * `mountExtension` call for the same extension awaits this promise instead
   * of starting a second mount, so both callers observe the same mounted
   * bridge (or the same failure) rather than one racing past the other's
   * still-in-progress mount work.
   */
  inFlightMountsByExtension = /* @__PURE__ */ new Map();
  constructor(config) {
    super();
    this.extensionManager = config.extensionManager;
    this.resolveHandler = config.resolveHandler;
    this.coordinator = config.coordinator;
    this.typeSystem = config.typeSystem;
    this.triggerLifecycle = config.triggerLifecycle;
    this.dispatchActionsChain = config.dispatchActionsChain;
    this.hostRuntime = config.hostRuntime;
    this.registerExtensionActionHandler = config.registerExtensionActionHandler;
    this.unregisterExtensionActionHandler = config.unregisterExtensionActionHandler;
    this.bridgeFactory = config.bridgeFactory;
    this.buildInboundBridgeLink = config.buildInboundBridgeLink;
    this.retractInboundBridgeLink = config.retractInboundBridgeLink;
    this.router = config.router;
    this.getInboundBridge = config.getInboundBridge;
  }
  async loadExtension(extensionId) {
    const extensionState = this.extensionManager.getExtensionState(extensionId);
    if (!extensionState) {
      throw new Error(
        `Cannot load extension '${extensionId}': extension is not registered. Call registerExtension() first.`
      );
    }
    if (extensionState.loadState === "loaded") {
      return;
    }
    if (extensionState.loadState === "loading") {
      const inFlight = this.inFlightLoadsByExtension.get(extensionId);
      if (inFlight) {
        return inFlight;
      }
    }
    extensionState.loadState = "loading";
    extensionState.error = void 0;
    const loadPromise = (async () => {
      try {
        const entry = extensionState.entry;
        const handler = this.resolveHandler(entry.id);
        if (!handler) {
          throw new Error(
            `No MFE handler registered that can handle entry type '${entry.id}'. Provide handlers via 'mfeHandlers' in MfeRegistryConfig.`
          );
        }
        const lifecycle = await handler.load(entry, extensionState.extension.id);
        extensionState.lifecycle = lifecycle;
        extensionState.loadState = "loaded";
      } catch (error) {
        extensionState.loadState = "error";
        extensionState.error = error instanceof Error ? error : new Error(String(error));
        throw error;
      }
    })().finally(() => {
      this.inFlightLoadsByExtension.delete(extensionId);
    });
    this.inFlightLoadsByExtension.set(extensionId, loadPromise);
    return loadPromise;
  }
  async preloadExtension(extensionId) {
    return this.loadExtension(extensionId);
  }
  // @cpt-begin:cpt-frontx-state-extension-domain-governance-admission:p1:inst-adm-t5
  // @cpt-begin:cpt-frontx-state-extension-domain-governance-admission:p1:inst-adm-t11
  // A fresh mount that reaches this method — because the mount-ext prologue
  // (`MountExtActionHandler`) found the extension neither already mounted nor
  // in-flight, including one that proceeded after an in-progress unmount
  // just settled — is an ordinary ADMITTED -> MOUNTED transition through
  // this same method: it re-enters MOUNTED under `inst-adm-t5` below and
  // triggers `activated` again (`inst-me-activated-once`).
  async mountExtension(extensionId, container) {
    const extensionState = this.extensionManager.getExtensionState(extensionId);
    if (!extensionState) {
      throw new Error(
        `Cannot mount extension '${extensionId}': extension is not registered. Call registerExtension() first.`
      );
    }
    if (extensionState.mountState === "mounted") {
      return extensionState.bridge;
    }
    if (extensionState.mountState === "mounting") {
      const inFlight = this.inFlightMountsByExtension.get(extensionId);
      if (inFlight) {
        return inFlight;
      }
    }
    extensionState.mountState = "mounting";
    extensionState.error = void 0;
    const mountPromise = (async () => {
      let acquiredParentBridge;
      try {
        if (extensionState.loadState !== "loaded") {
          await this.loadExtension(extensionId);
        }
        const domainState = this.extensionManager.getDomainState(extensionState.extension.domain);
        if (!domainState) {
          throw new Error(
            `Cannot mount extension '${extensionId}': domain '${extensionState.extension.domain}' is not registered.`
          );
        }
        const existing = extensionState.bridge && extensionState.childBridge ? { parentBridge: extensionState.bridge, childBridge: extensionState.childBridge } : void 0;
        const { parentBridge, childBridge } = this.bridgeFactory.acquireBridge(
          domainState,
          extensionId,
          existing,
          (chain) => this.dispatchActionsChain(chain),
          (extId, actionTypeId, handler, domainId) => this.registerExtensionActionHandler(extId, actionTypeId, handler, domainId)
        );
        acquiredParentBridge = parentBridge;
        extensionState.bridge = parentBridge;
        extensionState.childBridge = childBridge;
        const existingConnection = this.coordinator.get(container);
        if (existingConnection) {
          existingConnection.bridges.set(extensionId, parentBridge);
        } else {
          this.coordinator.register(container, {
            hostRuntime: this.hostRuntime,
            bridges: /* @__PURE__ */ new Map([[extensionId, parentBridge]])
          });
        }
        const hostElement = container;
        const shadowRoot = createShadowRoot(hostElement);
        extensionState.shadowRoot = shadowRoot;
        const lifecycle = extensionState.lifecycle;
        if (!lifecycle) {
          throw new Error(
            `Cannot mount extension '${extensionId}': lifecycle not loaded. This should not happen - loadExtension should have cached the lifecycle.`
          );
        }
        const mountContext = {
          extensionId,
          domainId: extensionState.extension.domain
        };
        if (this.router) {
          const enclosingValue = readOccupantValue(this.getInboundBridge());
          const occupantValue = this.router.assignOccupantValue({
            domain: domainState.domain,
            extension: extensionState.extension,
            enclosingValue
          });
          associateOccupantValue(childBridge, occupantValue);
        }
        let mintedLink;
        if (!this.childBridgesByExtension.has(extensionId)) {
          mintedLink = this.buildInboundBridgeLink(extensionId, childBridge, parentBridge);
          registerInboundBridgeLink(childBridge, mintedLink);
          this.childBridgesByExtension.set(extensionId, childBridge);
        }
        const retainedAdopters = this.inboundAdoptersByExtension.get(extensionId);
        if (mintedLink && retainedAdopters) {
          for (const relink of retainedAdopters) {
            relink(mintedLink);
          }
        }
        pushAmbientMountingBridge(childBridge);
        let mountInvocation;
        try {
          mountInvocation = lifecycle.mount(shadowRoot, childBridge, mountContext);
        } finally {
          const claimed = popAmbientMountingBridge();
          if (claimed.length > 0) {
            const superseded = this.inboundAdoptersByExtension.get(extensionId);
            if (superseded) {
              for (const relink of superseded) {
                relink(null);
              }
            }
            this.inboundAdoptersByExtension.set(extensionId, claimed);
          }
        }
        await mountInvocation;
        extensionState.container = container;
        extensionState.mountState = "mounted";
        this.triggerLifecycle(
          extensionId,
          this.typeSystem.resolveLifecycleStageActivatedId()
        );
        return parentBridge;
      } catch (error) {
        extensionState.mountState = "error";
        extensionState.error = error instanceof Error ? error : new Error(String(error));
        if (acquiredParentBridge) {
          this.bridgeFactory.deactivateBridge(acquiredParentBridge);
        }
        throw error;
      }
    })().finally(() => {
      this.inFlightMountsByExtension.delete(extensionId);
    });
    this.inFlightMountsByExtension.set(extensionId, mountPromise);
    return mountPromise;
  }
  // @cpt-end:cpt-frontx-state-extension-domain-governance-admission:p1:inst-adm-t11
  // @cpt-end:cpt-frontx-state-extension-domain-governance-admission:p1:inst-adm-t5
  // @cpt-begin:cpt-frontx-state-extension-domain-governance-admission:p1:inst-adm-t10
  async unmountExtension(extensionId) {
    const extensionState = this.extensionManager.getExtensionState(extensionId);
    if (!extensionState) {
      return;
    }
    if (extensionState.mountState !== "mounted") {
      return;
    }
    this.triggerLifecycle(
      extensionId,
      this.typeSystem.resolveLifecycleStageDeactivatedId()
    );
    let failure;
    const container = extensionState.container;
    try {
      const lifecycle = extensionState.lifecycle;
      if (lifecycle && container) {
        const unmountTarget = extensionState.shadowRoot ?? container;
        await lifecycle.unmount(unmountTarget);
      }
    } catch (error) {
      failure = { error };
    }
    try {
      if (extensionState.bridge) {
        this.bridgeFactory.deactivateBridge(extensionState.bridge);
      }
      if (container) {
        const connection = this.coordinator.get(container);
        if (connection) {
          connection.bridges.delete(extensionId);
          if (connection.bridges.size === 0) {
            this.coordinator.unregister(container);
          }
        }
      }
    } catch (cleanupError) {
      failure = failure ?? { error: cleanupError };
    }
    extensionState.container = null;
    extensionState.shadowRoot = void 0;
    if (failure) {
      extensionState.mountState = "error";
      extensionState.error = failure.error instanceof Error ? failure.error : new Error(String(failure.error));
      throw failure.error;
    }
    extensionState.mountState = "unmounted";
    extensionState.error = void 0;
  }
  // @cpt-end:cpt-frontx-state-extension-domain-governance-admission:p1:inst-adm-t10
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-retract-advertisements
  releaseExtension(extensionId) {
    const childBridge = this.childBridgesByExtension.get(extensionId);
    if (childBridge) {
      this.retractInboundBridgeLink(childBridge);
      const adopters = this.inboundAdoptersByExtension.get(extensionId);
      if (adopters) {
        for (const relink of adopters) {
          relink(null);
        }
      }
    }
    const extensionState = this.extensionManager.getExtensionState(extensionId);
    if (extensionState?.bridge) {
      const domainState = this.extensionManager.getDomainState(extensionState.extension.domain);
      if (domainState) {
        this.bridgeFactory.destroyBridge(domainState, extensionState.bridge);
      }
    }
    releaseOccupantValue(extensionState?.childBridge ?? void 0);
    try {
      this.unregisterExtensionActionHandler(extensionId);
    } catch (unregisterError) {
      console.error(
        `[MountManager] Failed to unregister extension action handler for '${extensionId}':`,
        unregisterError
      );
    }
    this.childBridgesByExtension.delete(extensionId);
    if (extensionState) {
      extensionState.bridge = null;
      extensionState.childBridge = null;
    }
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-retract-advertisements
  setTheme(_cssVars) {
  }
};
var OperationSerializer = class {
  /**
   * Operation queues keyed by entity ID.
   * Maps entity IDs to their current operation promise chain.
   */
  operationQueues = /* @__PURE__ */ new Map();
  /**
   * Serialize operations per entity ID to prevent race conditions.
   * Operations on the same entity ID are queued and executed sequentially.
   * Operations on different entity IDs can execute concurrently.
   *
   * @param entityId - Entity ID to serialize operations on
   * @param operation - Operation function to execute
   * @returns Promise resolving to operation result
   */
  async serializeOperation(entityId, operation) {
    const existingQueue = this.operationQueues.get(entityId) ?? Promise.resolve();
    const newQueue = existingQueue.then(
      () => operation(),
      () => operation()
      // Execute even if previous operation failed
    );
    const voidQueue = newQueue.then(() => {
    }, () => {
    });
    this.operationQueues.set(entityId, voidQueue);
    try {
      return await newQueue;
    } finally {
      if (this.operationQueues.get(entityId) === voidQueue) {
        this.operationQueues.delete(entityId);
      }
    }
  }
  /**
   * Clear all operation queues.
   * This is called during disposal to cleanup internal state.
   */
  clear() {
    this.operationQueues.clear();
  }
};
var ParentMfeBridgeImpl = class extends ParentMfeBridge {
  /**
   * Reference to the child bridge.
   */
  childBridge;
  /**
   * Permanent-disposal state, delegated to the child bridge — the single
   * source of truth for both active/inactive and destroyed state
   * (`inst-bridge-lifetime`).
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-bridge-lifetime
  get destroyed() {
    return this.childBridge.isDestroyed();
  }
  get active() {
    return this.childBridge.isActive();
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-bridge-lifetime
  /**
   * Property update subscribers - tracks callbacks registered in domain.propertySubscribers.
   * Maps propertyTypeId to the subscriber callback, so we can remove them on disposal.
   * INTERNAL: Set by bridge factory during creation.
   */
  propertySubscribers = /* @__PURE__ */ new Map();
  /**
   * The GTS id of the extension this bridge belongs to; stable across every
   * mount of that extension.
   */
  instanceId;
  constructor(childBridge) {
    super();
    this.childBridge = childBridge;
    this.instanceId = childBridge.extensionId;
  }
  /**
   * INTERNAL: Access the child bridge this parent bridge wraps.
   */
  getChildBridge() {
    return this.childBridge;
  }
  /**
   * Hand a sub-chain to the child MFE's registry — used by a downward
   * forwarding entry (`cpt-frontx-adr-action-dispatch-and-chaining`). Throws to refuse, with
   * no side effect in the child runtime, or returns having accepted;
   * nothing comes back.
   *
   * @internal concrete-only; not part of the abstract `ParentMfeBridge` contract.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-parent-send-chain
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-deliver-to-child
  sendCrossHopEnvelope(envelope) {
    if (this.destroyed) {
      throw new BridgeDisposedError(this.instanceId);
    }
    if (!this.active) {
      throw new BridgeInactiveError(this.instanceId);
    }
    this.childBridge.handleCrossHopEnvelope(envelope);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-deliver-to-child
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-parent-send-chain
  /**
   * Called by MfeRegistry when a domain property is updated.
   * Forwards the update to the child bridge. Recorded on the child bridge
   * even while inactive, but its subscribers are only notified while active
   * (`ChildMfeBridgeImpl.receivePropertyUpdate`).
   *
   * @param propertyTypeId - Type ID of the property
   * @param value - New property value
   */
  receivePropertyUpdate(propertyTypeId, value) {
    if (this.destroyed) {
      return;
    }
    const sharedProperty = { id: propertyTypeId, value };
    this.childBridge.receivePropertyUpdate(propertyTypeId, sharedProperty);
  }
  /**
   * Register a property subscriber that was added to domain.propertySubscribers.
   * INTERNAL: Called by bridge factory during setup.
   * Tracked so we can remove it from domain.propertySubscribers on disposal.
   *
   * @param propertyTypeId - Property type ID
   * @param subscriber - Subscriber callback
   */
  registerPropertySubscriber(propertyTypeId, subscriber) {
    this.propertySubscribers.set(propertyTypeId, subscriber);
  }
  /**
   * Get all registered property subscribers for cleanup.
   * INTERNAL: Called by bridge factory during disposal to remove subscribers from domain.
   *
   * @returns Map of propertyTypeId to subscriber callbacks
   */
  getPropertySubscribers() {
    return this.propertySubscribers;
  }
  /**
   * Permanent teardown, performed only when the extension this bridge
   * belongs to is unregistered — never on an ordinary unmount, which instead
   * goes through the runtime bridge factory's `deactivateBridge`.
   *
   * NOTE: This does NOT remove property subscribers from domain.propertySubscribers.
   * The bridge factory must handle that cleanup using getPropertySubscribers().
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-parent-handle
  dispose() {
    if (this.destroyed) {
      return;
    }
    this.propertySubscribers.clear();
    this.childBridge.destroy();
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-bridge-delegation:p1:inst-parent-handle
};
var ActiveGuardActionHandler = class extends ActionHandler {
  constructor(bridge, inner) {
    super();
    this.bridge = bridge;
    this.inner = inner;
  }
  bridge;
  inner;
  async handleAction(actionTypeId, payload) {
    if (this.bridge.isDestroyed()) {
      throw new BridgeDisposedError(this.bridge.extensionId);
    }
    if (!this.bridge.isActive()) {
      throw new BridgeInactiveError(this.bridge.extensionId);
    }
    return this.inner.handleAction(actionTypeId, payload);
  }
};
var DefaultRuntimeBridgeFactory = class extends RuntimeBridgeFactory {
  /**
   * Acquire the bridge pair for an extension's mount.
   *
   * INTERNAL: Called by mountExtension.
   *
   * @param domainState - Domain state containing properties and subscribers
   * @param extensionId - ID of the extension
   * @param existing - The extension's already-minted bridge pair, if this is a remount
   * @param dispatchActionsChain - The registry's `executeActionsChain` (void); wired to the
   *   child bridge's public `executeActionsChain` capability ONLY
   * @param registerExtensionActionHandler - Callback for registering per-(extensionId, actionTypeId) handlers
   * @returns Object containing parent and child bridge instances
   */
  acquireBridge(domainState, extensionId, existing, dispatchActionsChain, registerExtensionActionHandler) {
    if (existing) {
      const { parentBridge, childBridge: childBridge2 } = existing;
      if (!(parentBridge instanceof ParentMfeBridgeImpl) || !(childBridge2 instanceof ChildMfeBridgeImpl)) {
        throw new Error(`acquireBridge: expected concrete bridge impls for extension '${extensionId}'`);
      }
      childBridge2.setExecuteActionsChainCallback(dispatchActionsChain);
      childBridge2.setRegisterActionHandlerCallback((actionTypeId, handler) => {
        registerExtensionActionHandler(
          extensionId,
          actionTypeId,
          new ActiveGuardActionHandler(childBridge2, handler),
          domainState.domain.id
        );
      });
      childBridge2.activate();
      return existing;
    }
    const childBridge = new ChildMfeBridgeImpl(domainState.domain.id, extensionId);
    const parentBridgeImpl = new ParentMfeBridgeImpl(childBridge);
    childBridge.setExecuteActionsChainCallback(dispatchActionsChain);
    childBridge.setRegisterActionHandlerCallback((actionTypeId, handler) => {
      registerExtensionActionHandler(
        extensionId,
        actionTypeId,
        new ActiveGuardActionHandler(childBridge, handler),
        domainState.domain.id
      );
    });
    for (const [propertyTypeId, rawValue] of domainState.properties) {
      parentBridgeImpl.receivePropertyUpdate(propertyTypeId, rawValue);
    }
    for (const propertyTypeId of domainState.domain.sharedProperties) {
      if (!domainState.propertySubscribers.has(propertyTypeId)) {
        domainState.propertySubscribers.set(propertyTypeId, /* @__PURE__ */ new Set());
      }
      const subscriber = (receivedPropertyTypeId, value) => {
        parentBridgeImpl.receivePropertyUpdate(receivedPropertyTypeId, value);
      };
      domainState.propertySubscribers.get(propertyTypeId).add(subscriber);
      parentBridgeImpl.registerPropertySubscriber(propertyTypeId, subscriber);
    }
    childBridge.activate();
    return { parentBridge: parentBridgeImpl, childBridge };
  }
  /**
   * Deactivate a bridge on unmount or mount failure. The pair is retained.
   *
   * @param parentBridge - Parent bridge to deactivate
   */
  deactivateBridge(parentBridge) {
    if (!(parentBridge instanceof ParentMfeBridgeImpl)) {
      throw new Error("deactivateBridge requires a ParentMfeBridgeImpl instance");
    }
    parentBridge.getChildBridge().deactivate();
  }
  /**
   * Permanently tear down a bridge pair and clean up domain subscribers.
   * INTERNAL: Called only by `releaseExtension`, on the extension's
   * permanent unregistration.
   *
   * @param domainState - Domain state containing property subscribers
   * @param parentBridge - Parent bridge to dispose
   */
  destroyBridge(domainState, parentBridge) {
    if (!(parentBridge instanceof ParentMfeBridgeImpl)) {
      throw new Error("destroyBridge requires a ParentMfeBridgeImpl instance");
    }
    const impl = parentBridge;
    const subscribers = impl.getPropertySubscribers();
    for (const [propertyTypeId, subscriber] of subscribers) {
      const domainSubscribers = domainState.propertySubscribers.get(propertyTypeId);
      if (domainSubscribers) {
        domainSubscribers.delete(subscriber);
      }
    }
    parentBridge.dispose();
  }
};
function assertLifecyclePayload(payload) {
  if (typeof payload?.["subject"] !== "string") {
    throw new Error("LifecycleActionPayload: missing or non-string subject field");
  }
}
var LoadExtHandler = class extends ActionHandler {
  constructor(operationSerializer, mountManager) {
    super();
    this.operationSerializer = operationSerializer;
    this.mountManager = mountManager;
  }
  operationSerializer;
  mountManager;
  /**
   * Handle a `load_ext` action by serializing the load operation on the extension queue.
   *
   * @param _actionTypeId - Action type ID (unused — handler is registered per type)
   * @param payload - Action payload containing the target extension subject
   */
  async handleAction(_actionTypeId, payload) {
    assertLifecyclePayload(payload);
    const extensionId = payload.subject;
    await this.operationSerializer.serializeOperation(
      extensionId,
      () => this.mountManager.loadExtension(extensionId)
    );
  }
};
function extractGtsPackage(entityId) {
  if (!entityId.includes("~")) {
    throw new Error(
      `extractGtsPackage: Entity ID does not contain '~' delimiter. Expected a valid GTS instance ID, got: '${entityId}'. Valid GTS IDs have the format 'type~instance' or 'type~derivedType~instance'.`
    );
  }
  if (entityId.endsWith("~")) {
    throw new Error(
      `extractGtsPackage: Entity ID is a schema type ID (ends with '~'). This function requires an instance ID, not a type ID. Got: '${entityId}'. Schema type IDs define types, not instances.`
    );
  }
  const segments = entityId.split("~");
  const instancePortion = segments[segments.length - 1];
  const dotSegments = instancePortion.split(".");
  if (dotSegments.length < 2) {
    throw new Error(
      `extractGtsPackage: Entity ID has fewer than 2 dot-segments in its instance portion. Expected format 'vendor.package.rest.v1', got instance portion: '${instancePortion}' from entity ID: '${entityId}'. A valid GTS package requires at least two dot-segments (e.g., 'frontx.demo').`
    );
  }
  return `${dotSegments[0]}.${dotSegments[1]}`;
}
var DefaultExtensionMounter = class extends ExtensionMounter {
  constructor(domainId, mountManager, addMountedExtension, removeMountedExtension, getMountedExtensions) {
    super();
    this.domainId = domainId;
    this.mountManager = mountManager;
    this.addMountedExtension = addMountedExtension;
    this.removeMountedExtension = removeMountedExtension;
    this.getMountedExtensions = getMountedExtensions;
    this.releaser = ExtensionReleaserProvider.for(this);
  }
  domainId;
  mountManager;
  addMountedExtension;
  removeMountedExtension;
  getMountedExtensions;
  attachedRoot = null;
  // Tracks the per-extension containers so detach can remove them from root.
  containers = /* @__PURE__ */ new Map();
  /**
   * The in-flight `mount()` call for an extension currently being mounted,
   * keyed by extension id, together with the container that call was given.
   * A second concurrent `mount()` call for the same extension id AND THE
   * SAME container object awaits the first's promise instead of running the
   * mount pipeline (and appending a second, duplicate container) a second
   * time.
   *
   * `container` is never supplied by an external caller or action payload —
   * every mount strategy creates it internally via `this.hooks.create(extensionId)`
   * before calling `mounter.mount(extensionId, container)`. So a second
   * concurrent call for the same extension id with a DIFFERENT container can
   * only mean a bug in the calling strategy's own internal state management
   * (e.g. it created a container twice for what it thought were two mounts
   * of the same extension). That is not a legitimate case to route around
   * gracefully — see the hard invariant check in `mount()` below.
   */
  inFlightMountsByExtension = /* @__PURE__ */ new Map();
  /**
   * The settlement promise of an extension currently being unmounted through
   * this mounter, keyed by extension id — populated for the whole duration of
   * `unmount()`, whether that call originates from the domain's explicit
   * `unmount_ext` action handler or from a mount strategy's own eviction or
   * displacement of a sibling. The mount-ext prologue (`MountExtActionHandler`,
   * `cpt-frontx-algo-extension-domain-governance-mount-execution` `inst-me-await-unmount-settle`)
   * consults this map for the extension it is about to mount, before any
   * strategy runs, so a mount request arriving while that same extension is
   * being unmounted waits for the unmount to settle instead of racing it.
   */
  unmountInFlightByExtension = /* @__PURE__ */ new Map();
  /**
   * The SAME releaser `ExtensionReleaserProvider.for(this)` resolves for
   * every caller targeting this mounter — strategies (`ConcurrentMountStrategy.ts`, `OptionalMountStrategy.ts`, `ExclusiveMountStrategy.ts`)
   * resolve it independently through the same provider, so this mounter
   * never owns a releaser of its own distinct from the one they reach.
   * Resolved once, after `super()`, and reused for every `detach()` call.
   */
  releaser;
  attach(root) {
    this.attachedRoot = root;
  }
  async detach() {
    this.attachedRoot = null;
    const mounted = Array.from(this.getMountedExtensions(this.domainId));
    const failures = [];
    for (const extId of mounted) {
      try {
        await this.releaser.release(extId);
      } catch (error) {
        failures.push(error);
      }
    }
    if (failures.length === 1) {
      throw failures[0];
    }
    if (failures.length > 1) {
      const { AggregateError: AggregateErrorCtor } = globalThis;
      throw new AggregateErrorCtor(
        failures,
        `ExtensionMounter.detach: ${failures.length} extensions in domain '${this.domainId}' failed to unmount.`
      );
    }
    return;
  }
  async mount(extensionId, container) {
    if (!this.attachedRoot) {
      throw new Error(
        `ExtensionMounter.mount: no root attached for domain '${this.domainId}'. Call attach(element) before mounting extensions.`
      );
    }
    const inFlight = this.inFlightMountsByExtension.get(extensionId);
    if (inFlight) {
      if (inFlight.container !== container) {
        throw new Error(
          `ExtensionMounter.mount: internal invariant violated for extension '${extensionId}' in domain '${this.domainId}' \u2014 a mount is already in flight for this extension with a DIFFERENT container. This indicates a bug in the calling mount strategy, not a legitimate concurrent-mount scenario.`
        );
      }
      return inFlight.promise;
    }
    const mountWork = (async () => {
      await this.mountManager.mountExtension(extensionId, container);
      const root = this.attachedRoot;
      if (!root) {
        const error = new Error(
          `ExtensionMounter.mount: domain '${this.domainId}' root was detached during mounting of extension '${extensionId}'. The domain's root element must remain attached for the entire duration of the mount operation.`
        );
        try {
          await this.mountManager.unmountExtension(extensionId);
        } catch (compensationError) {
          error.cause = compensationError;
        }
        throw error;
      }
      try {
        root.appendChild(container);
        this.containers.set(extensionId, container);
        this.addMountedExtension(this.domainId, extensionId);
      } catch (error) {
        container.parentNode?.removeChild(container);
        this.containers.delete(extensionId);
        this.removeMountedExtension(this.domainId, extensionId);
        try {
          await this.mountManager.unmountExtension(extensionId);
        } catch {
        }
        throw error;
      }
    })();
    this.inFlightMountsByExtension.set(extensionId, { promise: mountWork, container });
    try {
      await mountWork;
    } finally {
      this.inFlightMountsByExtension.delete(extensionId);
    }
  }
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-await-unmount-settle
  /**
   * @param extensionId - ID of the extension being unmounted.
   */
  async unmount(extensionId) {
    const inFlight = this.unmountInFlightByExtension.get(extensionId);
    if (inFlight) {
      return inFlight;
    }
    let settlePlaceholder;
    let rejectPlaceholder;
    const placeholder = new Promise((resolve, reject) => {
      settlePlaceholder = resolve;
      rejectPlaceholder = reject;
    });
    this.unmountInFlightByExtension.set(extensionId, placeholder);
    const unmountWork = (async () => {
      try {
        await this.mountManager.unmountExtension(extensionId);
      } finally {
        const container = this.containers.get(extensionId);
        container?.parentNode?.removeChild(container);
        this.containers.delete(extensionId);
        this.removeMountedExtension(this.domainId, extensionId);
      }
    })();
    unmountWork.then(settlePlaceholder, rejectPlaceholder);
    try {
      await placeholder;
    } finally {
      if (this.unmountInFlightByExtension.get(extensionId) === placeholder) {
        this.unmountInFlightByExtension.delete(extensionId);
      }
    }
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-await-unmount-settle
  /**
   * The settlement promise of an unmount currently in flight for
   * `extensionId` through this mounter, or `undefined` if none is in
   * progress. Consulted by the mount-ext prologue — never by a strategy —
   * so the check runs strategy-agnostically, above every strategy's own
   * mount body.
   */
  getUnmountInFlight(extensionId) {
    return this.unmountInFlightByExtension.get(extensionId);
  }
};
var MountExtActionHandler = class extends DeclaredTimeoutActionHandler {
  /**
   * @param inner - The handler the domain factory registered for
   *   `mount_ext` — ultimately a bound
   *   `strategy.mount(...)` call.
   * @param domainId - The domain this `mount_ext` handler was registered
   *   for.
   * @param admissionReader - Resolves the domain an extension is admitted
   *   to.
   * @param mountedReader - Reads whether an extension is currently in the
   *   addressed domain's mount set.
   * @param unmountInFlightReader - Reads the in-flight unmount settlement
   *   for an extension in this domain, if one is running (Concurrent path).
   * @param actionTimeoutResolver - The shared timeout rule, used to resolve
   *   a caller's own timer value for the occupancy queue.
   * @param domainReader - Reads this domain's declaration (for its
   *   `defaultActionTimeout`), or `undefined` if the domain is no longer
   *   registered.
   * @param queue - This domain's occupancy queue (Optional/Exclusive), or
   *   `undefined` for a Concurrent domain.
   * @param concurrentJoiner - This domain's same-extension mount joiner
   *   (Concurrent), or `undefined` for an Optional/Exclusive domain.
   */
  constructor(inner, domainId, admissionReader, mountedReader, unmountInFlightReader, actionTimeoutResolver, domainReader, queue, concurrentJoiner, router) {
    super();
    this.inner = inner;
    this.domainId = domainId;
    this.admissionReader = admissionReader;
    this.mountedReader = mountedReader;
    this.unmountInFlightReader = unmountInFlightReader;
    this.actionTimeoutResolver = actionTimeoutResolver;
    this.domainReader = domainReader;
    this.queue = queue;
    this.concurrentJoiner = concurrentJoiner;
    this.router = router;
  }
  inner;
  domainId;
  admissionReader;
  mountedReader;
  unmountInFlightReader;
  actionTimeoutResolver;
  domainReader;
  queue;
  concurrentJoiner;
  router;
  /**
   * Runs the domain's registered `mount_ext` handler and, where a router is
   * injected, reports its settled outcome to it exactly once — after the
   * handler settles and before this method's own caller (the occupancy
   * queue's turn, or the Concurrent joiner's task) returns control to the
   * mediator, so the report precedes the chain's `next`/`fallback`
   * (`inst-me-report-settled`, `inst-me-report-before-next`). The report
   * never changes the outcome: a throwing `reportSettled` is logged and
   * swallowed (`inst-me-report-failure-isolated`).
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-report-settled
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-report-once-per-execution
  // Called exactly once per execution that reaches `this.inner` — the
  // domain's own registered `mount_ext` handler — from each of this
  // class's two fresh-mount call sites; every caller that joined or shared
  // that one execution settles on its outcome without this method running
  // again, so one execution produces exactly one `reportSettled` call.
  async runAndReportSettled(actionTypeId, payload) {
    let succeeded = true;
    let failure;
    try {
      await this.inner.handleAction(actionTypeId, payload);
    } catch (error) {
      succeeded = false;
      failure = error;
    }
    if (this.router) {
      try {
        this.router.reportSettled({
          actionTypeId,
          domainId: this.domainId,
          payload,
          succeeded
        });
      } catch (reportError) {
        console.error(
          `[MountExtActionHandler] reportSettled failed for domain '${this.domainId}', subject '${String(payload?.subject)}':`,
          reportError
        );
      }
    }
    if (!succeeded) {
      throw failure;
    }
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-report-settled
  async handleActionWithDeclaredTimeout(actionTypeId, payload, declaredTimeout) {
    const subject = payload?.subject;
    if (typeof subject !== "string") {
      return this.inner.handleAction(actionTypeId, payload);
    }
    const extensionId = subject;
    if (this.admissionReader.domainOf(extensionId) !== this.domainId) {
      throw new Error(
        `mount_ext: extension '${extensionId}' is not admitted to domain '${this.domainId}'.`
      );
    }
    if (!this.queue) {
      return this.handleConcurrentMount(actionTypeId, payload, extensionId);
    }
    const unmountInFlight = this.unmountInFlightReader.inFlight(extensionId);
    if (this.mountedReader.isMounted(extensionId) && this.queue.isEmpty() && !this.queue.isClosed() && !unmountInFlight) {
      return;
    }
    const timeoutMs = this.actionTimeoutResolver.resolve(declaredTimeout, this.domainReader(), this.domainId);
    await this.queue.submit(
      "mount",
      extensionId,
      timeoutMs,
      () => this.runMountAtTurn(extensionId, actionTypeId, payload)
    );
  }
  /**
   * Evaluated against the domain's mount set present the moment this
   * entry starts running (`inst-me-queue-evaluate-at-turn`). Reached only
   * for a fresh mount started as the running entry — an already-mounted, a
   * joined, or a still-occupant-at-turn request never runs the strategy
   * (`inst-me-no-rerun-eviction`).
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-no-rerun-eviction
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-evaluate-at-turn
  async runMountAtTurn(extensionId, actionTypeId, payload) {
    for (let inFlightUnmount = this.unmountInFlightReader.inFlight(extensionId); inFlightUnmount; inFlightUnmount = this.unmountInFlightReader.inFlight(extensionId)) {
      try {
        await inFlightUnmount;
      } catch (unmountError) {
        throw this.mapUnmountFailure(extensionId, unmountError);
      }
    }
    if (this.admissionReader.domainOf(extensionId) !== this.domainId) {
      throw new Error(
        `mount_ext: extension '${extensionId}' is no longer admitted to domain '${this.domainId}'.`
      );
    }
    if (this.mountedReader.isMounted(extensionId)) {
      return;
    }
    return this.runAndReportSettled(actionTypeId, payload);
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-evaluate-at-turn
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-no-rerun-eviction
  /**
   * The Concurrent-domain mount path: no occupancy queue — same-extension
   * joining runs through `concurrentJoiner`; different extensions' fresh
   * mounts are independent.
   */
  async handleConcurrentMount(actionTypeId, payload, extensionId) {
    await this.concurrentJoiner.run(extensionId, async () => {
      for (; ; ) {
        if (this.admissionReader.domainOf(extensionId) !== this.domainId) {
          throw new Error(
            `mount_ext: extension '${extensionId}' is not admitted to domain '${this.domainId}'.`
          );
        }
        const inFlightUnmount = this.unmountInFlightReader.inFlight(extensionId);
        if (inFlightUnmount) {
          try {
            await inFlightUnmount;
          } catch (unmountError) {
            throw this.mapUnmountFailure(extensionId, unmountError);
          }
          continue;
        }
        if (this.mountedReader.isMounted(extensionId)) {
          return;
        }
        break;
      }
      return this.runAndReportSettled(actionTypeId, payload);
    });
  }
  /**
   * Maps a failure from an awaited in-progress unmount into the mount
   * request's own failure, shared by the Concurrent path and the occupancy
   * queue's at-turn wait.
   *
   * @param extensionId - ID of the extension whose mount was waiting on the
   *   unmount.
   * @param unmountError - The error the awaited unmount rejected with.
   * @returns The error to throw for this mount request, carrying
   *   `unmountError` as its `cause`.
   */
  mapUnmountFailure(extensionId, unmountError) {
    const failure = new Error(
      `mount_ext: extension '${extensionId}' could not be mounted in domain '${this.domainId}' because the in-progress unmount it was waiting on failed.`
    );
    failure.cause = unmountError;
    return failure;
  }
};
var UnmountExtActionHandler = class extends DeclaredTimeoutActionHandler {
  /**
   * @param inner - The handler the domain factory registered for
   *   `unmount_ext` — ultimately a bound
   *   `strategy.unmount(...)` call.
   * @param domainId - The domain this `unmount_ext` handler was registered
   *   for.
   * @param admissionReader - Resolves the domain an extension is admitted
   *   to.
   * @param mountedReader - Reads whether an extension is currently in the
   *   addressed domain's mount set.
   * @param actionTimeoutResolver - The shared timeout rule.
   * @param domainReader - Reads this domain's declaration (for its
   *   `defaultActionTimeout`).
   * @param queue - This domain's occupancy queue (Optional), or `undefined`
   *   for a Concurrent domain.
   * @param concurrentJoiner - This domain's same-extension mount joiner
   *   (Concurrent), used to await an in-flight mount of the same subject, or
   *   `undefined` for an Optional domain.
   */
  constructor(inner, domainId, admissionReader, mountedReader, actionTimeoutResolver, domainReader, queue, concurrentJoiner, router) {
    super();
    this.inner = inner;
    this.domainId = domainId;
    this.admissionReader = admissionReader;
    this.mountedReader = mountedReader;
    this.actionTimeoutResolver = actionTimeoutResolver;
    this.domainReader = domainReader;
    this.queue = queue;
    this.concurrentJoiner = concurrentJoiner;
    this.router = router;
  }
  inner;
  domainId;
  admissionReader;
  mountedReader;
  actionTimeoutResolver;
  domainReader;
  queue;
  concurrentJoiner;
  router;
  /**
   * Runs the domain's registered `unmount_ext` handler and, where a router
   * is injected, reports its settled outcome to it exactly once, mirroring
   * `MountExtActionHandler.runAndReportSettled` (`inst-me-report-settled`,
   * `inst-me-report-before-next`, `inst-me-report-failure-isolated`).
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-report-settled
  async runAndReportSettled(actionTypeId, payload) {
    let succeeded = true;
    let failure;
    try {
      await this.inner.handleAction(actionTypeId, payload);
    } catch (error) {
      succeeded = false;
      failure = error;
    }
    if (this.router) {
      try {
        this.router.reportSettled({
          actionTypeId,
          domainId: this.domainId,
          payload,
          succeeded
        });
      } catch (reportError) {
        console.error(
          `[UnmountExtActionHandler] reportSettled failed for domain '${this.domainId}', subject '${String(payload?.subject)}':`,
          reportError
        );
      }
    }
    if (!succeeded) {
      throw failure;
    }
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-report-settled
  async handleActionWithDeclaredTimeout(actionTypeId, payload, declaredTimeout) {
    const subject = payload?.subject;
    if (typeof subject !== "string") {
      return this.inner.handleAction(actionTypeId, payload);
    }
    const extensionId = subject;
    if (!this.queue) {
      return this.handleConcurrentUnmount(actionTypeId, payload, extensionId);
    }
    const timeoutMs = this.actionTimeoutResolver.resolve(declaredTimeout, this.domainReader(), this.domainId);
    await this.queue.submit(
      "unmount",
      extensionId,
      timeoutMs,
      () => this.runUnmountAtTurn(extensionId, actionTypeId, payload)
    );
  }
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-evaluate-at-turn
  async runUnmountAtTurn(extensionId, actionTypeId, payload) {
    if (this.admissionReader.domainOf(extensionId) !== this.domainId) {
      throw new Error(
        `unmount_ext: extension '${extensionId}' is no longer admitted to domain '${this.domainId}'.`
      );
    }
    if (this.mountedReader.isMounted(extensionId)) {
      return this.runAndReportSettled(actionTypeId, payload);
    }
    return;
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-evaluate-at-turn
  /**
   * The Concurrent-domain unmount path — waits for an in-progress mount of
   * the same extension to settle before proceeding.
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-um-await-mount-settle
  async handleConcurrentUnmount(actionTypeId, payload, extensionId) {
    const inFlightMount = this.concurrentJoiner?.inFlight(extensionId);
    if (inFlightMount) {
      try {
        await inFlightMount;
      } catch {
        return;
      }
    }
    return this.runAndReportSettled(actionTypeId, payload);
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-um-await-mount-settle
};
var OccupancyCaller = class {
  /**
   * @param task - The mutation this caller contributes. Every caller
   *   supplies its own task, whether it creates its entry or joins one
   *   already in the queue — the entry runs the task of whichever caller
   *   is still live at its turn (`inst-me-queue-evaluate-at-turn`).
   */
  constructor(task) {
    this.task = task;
    let resolve;
    let reject;
    this.settlement = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolveCaller = resolve;
    this.rejectCaller = reject;
  }
  task;
  settled = false;
  timer;
  resolveCaller;
  rejectCaller;
  /** This caller's own settlement — resolved on success, rejected on failure. */
  settlement;
  /** This caller's own contributed task. */
  getTask() {
    return this.task;
  }
  /** Whether this caller has settled — by success, by failure, or by its own timed-out departure from a pending entry. */
  isSettled() {
    return this.settled;
  }
  /**
   * Arms this caller's own timer. `onFire` runs once, when the timer fires,
   * unless this caller has already settled by another route.
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-caller-timer
  armTimer(timeoutMs, onFire) {
    this.timer = setTimeout(() => {
      this.timer = void 0;
      if (!this.settled) {
        onFire();
      }
    }, timeoutMs);
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-caller-timer
  clearTimer() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.timer = void 0;
    }
  }
  /** Settles this caller successfully, clearing its own timer. A caller that has already settled is left unchanged. */
  succeed() {
    if (this.settled) {
      return;
    }
    this.settled = true;
    this.clearTimer();
    this.resolveCaller();
  }
  /** Settles this caller with a failure, clearing its own timer. A caller that has already settled is left unchanged. */
  fail(error) {
    if (this.settled) {
      return;
    }
    this.settled = true;
    this.clearTimer();
    this.rejectCaller(error);
  }
};
var OccupancyEntry = class {
  constructor(operation, subject) {
    this.operation = operation;
    this.subject = subject;
  }
  operation;
  subject;
  started = false;
  /** Every caller that joined this entry, in join order. */
  callers = [];
  addCaller(caller) {
    this.callers.push(caller);
  }
  removeCaller(caller) {
    const index = this.callers.indexOf(caller);
    if (index !== -1) {
      this.callers.splice(index, 1);
    }
  }
  /** Whether this entry has begun running its own task. */
  hasStarted() {
    return this.started;
  }
  /**
   * The first caller, in join order, still in this entry and not settled —
   * neither timed out nor otherwise failed. A caller that timed out of a
   * pending entry has already left `callers`
   * (`inst-me-queue-pending-timeout`); this method exists so a caller that
   * settled without leaving `callers` is never chosen either
   * (`inst-me-queue-evaluate-at-turn`).
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-evaluate-at-turn
  firstLiveCaller() {
    return this.callers.find((caller) => !caller.isSettled());
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-evaluate-at-turn
  /**
   * Whether an entry for `operation`/`subject` would join this one —
   * requires the same operation AND the same subject: a mount of A never
   * joins an unmount of A, and an unmount of A never joins a mount of A
   * (`inst-me-queue-join-same-operation-subject`).
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-join-same-operation-subject
  matches(operation, subject) {
    return this.operation === operation && this.subject === subject;
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-join-same-operation-subject
  /**
   * Invoke the still-live caller's own task exactly once — the first caller
   * in join order that is still in this entry and not settled
   * (`inst-me-queue-evaluate-at-turn`). Marked started BEFORE the task
   * actually runs — a caller's timer that fires once this call has begun
   * always observes `hasStarted()` as true, even while the task's own
   * synchronous prefix is still running. A live caller always exists here:
   * an entry is started either on creation, holding the caller that created
   * it, or on promotion from the pending slot, which is cleared as soon as
   * its last caller times out (`inst-me-queue-pending-timeout`) and whose
   * remaining callers are all unsettled.
   */
  run() {
    this.started = true;
    const caller = this.firstLiveCaller();
    return caller.getTask()();
  }
  /** Settles every caller of this entry with the same outcome. */
  settleAll(outcome) {
    for (const caller of [...this.callers]) {
      if (outcome.success) {
        caller.succeed();
      } else {
        caller.fail(outcome.error);
      }
    }
  }
};
var DomainOccupancyCoordinator = class {
  /**
   * @param domainId - The domain this queue belongs to, named in every
   *   failure message this queue produces.
   */
  constructor(domainId) {
    this.domainId = domainId;
  }
  domainId;
  running;
  pending;
  /** Set by `close()`: the suffix every later request's failure message carries. */
  closedReasonSuffix;
  /** Whether the queue holds neither a running nor a pending entry. */
  isEmpty() {
    return !this.running && !this.pending;
  }
  /**
   * Whether `close()` has run: the domain is being unregistered, and every
   * request submitted from now on fails at once
   * (`inst-me-queue-domain-unregister`).
   */
  isClosed() {
    return this.closedReasonSuffix !== void 0;
  }
  /**
   * Submit a request for `operation` on `subject`. Returns THIS caller's own
   * settlement — resolved or rejected independently of every other caller
   * of the same entry.
   *
   * @param timeoutMs - This caller's own timer value, already resolved by
   *   the shared timeout rule (`ActionTimeoutResolver`).
   * @param task - This caller's own mutation. Every caller supplies its own
   *   task — one that creates its entry and one that joins an existing
   *   entry alike. When the entry starts, it runs the task of whichever of
   *   its callers is still live at that turn
   *   (`inst-me-queue-evaluate-at-turn`).
   */
  submit(operation, subject, timeoutMs, task) {
    if (this.closedReasonSuffix !== void 0) {
      return Promise.reject(
        new Error(
          `${operation}_ext: request for '${subject}' in domain '${this.domainId}' ${this.closedReasonSuffix}`
        )
      );
    }
    const caller = new OccupancyCaller(task);
    if (!this.running) {
      const entry2 = new OccupancyEntry(operation, subject);
      this.admit(entry2, caller, timeoutMs);
      this.startRunning(entry2);
      return caller.settlement;
    }
    if (this.pending && this.pending.matches(operation, subject)) {
      this.admit(this.pending, caller, timeoutMs);
      return caller.settlement;
    }
    if (this.running.matches(operation, subject)) {
      if (this.pending) {
        this.settlePendingFailure("was replaced in the occupancy queue by a newer request.");
      }
      this.admit(this.running, caller, timeoutMs);
      return caller.settlement;
    }
    if (!this.pending) {
      const entry2 = new OccupancyEntry(operation, subject);
      this.pending = entry2;
      this.admit(entry2, caller, timeoutMs);
      return caller.settlement;
    }
    this.settlePendingFailure("was replaced in the occupancy queue by a newer request.");
    const entry = new OccupancyEntry(operation, subject);
    this.pending = entry;
    this.admit(entry, caller, timeoutMs);
    return caller.settlement;
  }
  /**
   * Closes the queue. The pending entry leaves the queue without starting;
   * each of its callers fails and takes its own `fallback` — the running
   * entry is not interrupted (`inst-me-queue-domain-unregister`). Every
   * request submitted after this call fails at once without entering a
   * slot, so when the running entry completes nothing is promoted.
   *
   * @param reasonSuffix - Appended to the failure message named after each
   *   failed request's own operation/subject/domain.
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-domain-unregister
  close(reasonSuffix) {
    this.closedReasonSuffix = reasonSuffix;
    this.settlePendingFailure(reasonSuffix);
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-domain-unregister
  /** Reopens a closed queue, so requests submitted after this call are admitted again. */
  reopen() {
    this.closedReasonSuffix = void 0;
  }
  /** Adds `caller` to `entry` and arms its own timer. */
  admit(entry, caller, timeoutMs) {
    entry.addCaller(caller);
    caller.armTimer(timeoutMs, () => this.onCallerTimerFired(entry, caller, timeoutMs));
  }
  /**
   * A caller's own timer fired. The running entry is never replaced,
   * removed, or interrupted by a caller's timer — only a caller of the
   * PENDING entry that has not yet started is removed and failed alone; the
   * pending entry itself leaves the queue only once its last caller has
   * left, and never starts
   * (`inst-me-queue-pending-timeout`, `inst-me-queue-running-never-interrupted`).
   */
  onCallerTimerFired(entry, caller, timeoutMs) {
    if (entry.hasStarted()) {
      return;
    }
    entry.removeCaller(caller);
    const message = `${entry.operation}_ext: request for '${entry.subject}' in domain '${this.domainId}' timed out after ${timeoutMs}ms while queued.`;
    caller.fail(new Error(message));
    if (entry.callers.length === 0 && this.pending === entry) {
      this.pending = void 0;
    }
  }
  /** Fails every caller of the pending entry, if any, and clears the slot. */
  settlePendingFailure(reasonSuffix) {
    const entry = this.pending;
    if (!entry) {
      return;
    }
    this.pending = void 0;
    const message = `${entry.operation}_ext: request for '${entry.subject}' in domain '${this.domainId}' ${reasonSuffix}`;
    entry.settleAll({ success: false, error: new Error(message) });
  }
  /**
   * Starts `entry` as the running entry, invoking the task of whichever of
   * its callers is still live at this turn
   * (`inst-me-queue-evaluate-at-turn`) synchronously — a synchronous throw
   * from that task counts as failure.
   */
  startRunning(entry) {
    this.running = entry;
    let settlement;
    try {
      settlement = entry.run();
    } catch (error) {
      this.finishRunning(entry, { success: false, error });
      return;
    }
    settlement.then(
      () => this.finishRunning(entry, { success: true }),
      (error) => this.finishRunning(entry, { success: false, error })
    );
  }
  /**
   * When the running entry finishes, each of its callers continues — on
   * success with its own `next`, on failure with its own `fallback`. The
   * entry leaves the queue, and the pending entry, if any, is promoted to
   * running and started (`inst-me-queue-complete-running`).
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-complete-running
  finishRunning(entry, outcome) {
    if (this.running === entry) {
      this.running = void 0;
    }
    entry.settleAll(outcome);
    if (!this.running && this.pending) {
      const promoted = this.pending;
      this.pending = void 0;
      this.startRunning(promoted);
    }
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-queue-complete-running
};
var ConcurrentMountJoiner = class {
  inFlightByExtension = /* @__PURE__ */ new Map();
  /**
   * The in-flight fresh-mount placeholder for `extensionId`, if this joiner
   * has one running, or `undefined`.
   */
  inFlight(extensionId) {
    return this.inFlightByExtension.get(extensionId);
  }
  /**
   * Run a fresh physical mount for `extensionId` by invoking `task` exactly
   * once. A second call for the SAME extension id while the first is still
   * running joins the first's placeholder instead of invoking `task` again.
   *
   * A placeholder settlement is published BEFORE `task` is invoked — not
   * after — so a call that re-enters this method for the SAME extension id
   * synchronously (from `task`'s own synchronous prefix) finds the entry
   * already in flight and joins it instead of starting a second physical
   * mount.
   */
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-join-in-progress-mount
  run(extensionId, task) {
    const existing = this.inFlightByExtension.get(extensionId);
    if (existing) {
      return existing;
    }
    let settle;
    let reject;
    const placeholder = new Promise((resolve, rej) => {
      settle = resolve;
      reject = rej;
    });
    this.inFlightByExtension.set(extensionId, placeholder);
    const cleanup = () => {
      if (this.inFlightByExtension.get(extensionId) === placeholder) {
        this.inFlightByExtension.delete(extensionId);
      }
    };
    try {
      task().then(
        () => {
          cleanup();
          settle();
        },
        (error) => {
          cleanup();
          reject(error);
        }
      );
    } catch (error) {
      cleanup();
      reject(error);
    }
    return placeholder;
  }
  // @cpt-end:cpt-frontx-algo-extension-domain-governance-mount-execution:p2:inst-me-join-in-progress-mount
};
var DefaultDomainLifecycleTrigger = class extends DomainLifecycleTrigger {
  constructor(domainId, lifecycleManager) {
    super();
    this.domainId = domainId;
    this.lifecycleManager = lifecycleManager;
  }
  domainId;
  lifecycleManager;
  triggerExtensionStage(extId, stageId) {
    this.lifecycleManager.triggerLifecycleStage(extId, stageId);
  }
  triggerStage(stageId) {
    this.lifecycleManager.triggerDomainLifecycleStage(this.domainId, stageId);
  }
  triggerOwnStage(stageId) {
    this.lifecycleManager.triggerDomainOwnLifecycleStage(this.domainId, stageId);
  }
};
function isActiveBridge(bridge) {
  const candidate = bridge;
  return typeof candidate.isActive === "function" ? candidate.isActive() : true;
}
var DefaultMfeRegistry = class _DefaultMfeRegistry extends MfeRegistry {
  /**
   * Structural (duck-typed) check for `onCrossHopEnvelope`, deliberately NOT
   * `instanceof ChildMfeBridgeImpl`: the bridge adopted from the ambient
   * mounting-bridge rendezvous may have been constructed by a different,
   * independently loaded copy of this package than the one running this
   * check (`cpt-frontx-adr-mfe-load-isolation`), so the two sides cannot rely
   * on sharing a class definition — only on the bridge object's own shape.
   * Pure and stateless — no substitution is ever needed for this
   * recognition — so it is a private static method.
   */
  static hasOnCrossHopEnvelopeMethod(bridge) {
    return typeof bridge.onCrossHopEnvelope === "function";
  }
  /**
   * Type System plugin instance.
   * All type validation and schema operations go through this plugin.
   */
  typeSystem;
  /**
   * Extension manager for managing extension and domain state.
   */
  extensionManager;
  /**
   * Lifecycle manager for triggering lifecycle stages.
   */
  lifecycleManager;
  /**
   * Mount manager for loading and mounting MFEs.
   */
  mountManager;
  /**
   * Runtime bridge factory for creating bridge connections.
   */
  bridgeFactory;
  /**
   * Runtime coordinator for managing runtime connections.
   */
  coordinator;
  /**
   * Actions chains mediator. Held as the concrete type for the internal
   * member this registry wires: `receiveHandedOverChain`.
   */
  mediator;
  /**
   * The one shared per-action timeout rule — the SAME instance injected into
   * `this.mediator` and handed to every domain's own internal mount/unmount
   * handlers, so the mediator's own per-action bound and the occupancy
   * queue's per-caller timer apply the identical rule
   * (`cpt-frontx-algo-mfe-host-communication-mediator-dispatch`
   * `inst-resolve-timeout`).
   */
  actionTimeoutResolver;
  /**
   * Every registered Optional/Exclusive domain's own occupancy queue, keyed
   * by domain id — populated in `registerDomain` once cross-validation
   * succeeds, and removed once `unregisterDomain` (or `dispose`) tears the
   * domain down, so this map never outlives the domain it belongs to.
   */
  occupancyCoordinatorsByDomain = /* @__PURE__ */ new Map();
  /**
   * Domain ids currently inside `unregisterDomain`, from the moment
   * unregistration starts until the domain id is fully freed (even on
   * failure) — closes `registerExtension` to that domain id for the
   * duration, so a registration racing the drain loop's final empty query
   * can never be admitted against a domain state `unregisterDomain` then
   * removes (`cpt-frontx-algo-mfe-registry-domain-unregister-closes-admission`
   * `inst-algo-du-close-first`).
   */
  domainsUnregistering = /* @__PURE__ */ new Set();
  /**
   * Operation serializer for per-entity concurrency control.
   */
  operationSerializer;
  /**
   * Registered MFE handlers.
   */
  handlers = [];
  /**
   * This registry's link to its immediate parent registry, through the
   * bridge its own host extension received at mount time (the "inbound
   * bridge") — automatically adopted in the constructor via ambient
   * mount-context discovery (`inst-adopt-ambient-bridge`), never via a
   * config field or method call. `null` for a root/shell registry.
   *
   * This is the mechanism that makes cross-nesting reachability work: a
   * registry constructed synchronously inside an extension's own `mount()`
   * body automatically gains a channel to propagate advertisements upward,
   * escalate unresolved dispatches upward, and retract advertisements on
   * disposal — all without any growth to the public surface (MFES-6).
   */
  inboundBridgeLink = null;
  /** Unsubscribe for the automatic downward actions-chain delivery wired in the constructor. */
  inboundActionsChainUnsubscribe = null;
  /**
   * Downward forwarding entries this registry holds for targets advertised
   * by a descendant registry through registration propagation, keyed by
   * target id (`cpt-frontx-algo-mfe-host-communication-registration-propagation`).
   */
  forwardingEntries = /* @__PURE__ */ new Map();
  /**
   * Target ids this registry itself has successfully propagated upward
   * through its own inbound bridge — tracked so disposal/unregistration can
   * retract exactly what was propagated (`inst-retract-advertisements`).
   */
  propagatedTargetIds = /* @__PURE__ */ new Set();
  /**
   * Every target this registry would advertise if linked — its own admitted
   * domains and extensions, by target id. Populated on admission regardless of whether
   * this registry currently holds an inbound bridge, and consulted by
   * `repropagateThroughInboundBridge` so a re-link (`relinkInboundBridge`)
   * re-advertises every target this registry still holds, not merely the ones
   * it happened to hold at the moment of its ORIGINAL link.
   */
  advertisableTargets = /* @__PURE__ */ new Set();
  /**
   * The revoker for each `InboundBridgeLink` this registry has minted, keyed
   * by the `ChildMfeBridge` it was minted for. Flipped by
   * `retractInboundBridgeLinkFor` so a reference to that link retained beyond
   * retraction — by any copy of the runtime — can never again propagate,
   * retract, or escalate (`inst-revoked-link-inert`), independent of and in
   * addition to `relinkInboundBridge(null)` on the child side.
   */
  linkRevokersByBridge = /* @__PURE__ */ new WeakMap();
  /**
   * GTS package to extension ID mappings.
   */
  packages = /* @__PURE__ */ new Map();
  /**
   * Set by `dispose()`. A disposed registry refuses every hand-over across a
   * hop (`inst-receive-refusal-check`).
   */
  disposed = false;
  /**
   * The router snapshotted by the factory, or `undefined` for a standalone
   * registry (`cpt-frontx-dod-mfe-registry-router-configuration`). Every
   * `if (this.router)` branch in this class is skipped entirely when this is
   * `undefined`, leaving a standalone registry's behavior unchanged
   * (`inst-algo-ra-standalone`).
   */
  router;
  /**
   * Extension and domain ids this registry's router actually admitted —
   * populated only on a successful `router.registerExtension`/`registerDomain`
   * call — so release notifications (`releaseExtension`/`releaseDomain`) are
   * sent only for what the router admitted, never for a registration it
   * never saw or rejected (`cpt-frontx-algo-mfe-registry-router-admission`).
   */
  routerAdmittedExtensionIds = /* @__PURE__ */ new Set();
  routerAdmittedDomainIds = /* @__PURE__ */ new Set();
  constructor(config) {
    super();
    if (!config.typeSystem) {
      throw new Error(
        "MfeRegistry requires a TypeSystemPlugin. Provide it via config.typeSystem parameter. Use createMfeRegistryFactory().build({ typeSystem: gtsPlugin }) to create an instance."
      );
    }
    this.typeSystem = config.typeSystem;
    this.router = config.router;
    this.operationSerializer = new OperationSerializer();
    this.coordinator = new WeakMapRuntimeCoordinator();
    this.bridgeFactory = new DefaultRuntimeBridgeFactory();
    this.actionTimeoutResolver = new ActionTimeoutResolver();
    this.mediator = new DefaultActionsChainsMediator({
      typeSystem: this.typeSystem,
      getDomainState: (domainId) => this.extensionManager.getDomainState(domainId),
      getExtensionEntry: (extensionId) => this.extensionManager.getExtensionState(extensionId)?.entry,
      resolveForwardingEntry: (targetId, arrivalEdge) => this.resolveForwardingEntryRoute(targetId, arrivalEdge),
      resolveEscalation: () => this.resolveEscalationRoute(),
      actionTimeoutResolver: this.actionTimeoutResolver
    });
    this.extensionManager = new DefaultExtensionManager({
      typeSystem: this.typeSystem,
      // Internal lifecycle trigger — bypasses the public surface (removed in spec v1.6).
      triggerLifecycle: (extensionId, stageId) => this.triggerLifecycleStageInternal(extensionId, stageId),
      triggerDomainOwnLifecycle: (domainId, stageId) => this.triggerDomainOwnLifecycleStageInternal(domainId, stageId),
      // Bypass OperationSerializer: the parent operation (unregisterExtension)
      // already holds the serializer lock for this entity ID, so we cannot
      // re-enter registry.executeActionsChain. Routing through the per-domain
      // DefaultExtensionMounter keeps mount-set bookkeeping (removeMountedExtension)
      // and DOM container teardown centralized while still avoiding the lock.
      unmountExtension: (extensionId) => this.bypassUnmountExtension(extensionId),
      releaseExtension: (extensionId) => this.mountManager.releaseExtension(extensionId),
      validateEntryType: (entryTypeId) => this.validateEntryType(entryTypeId),
      router: this.router
    });
    this.lifecycleManager = new DefaultLifecycleManager(
      this.extensionManager,
      (chain) => this.executeActionsChain(chain)
    );
    this.mountManager = new DefaultMountManager({
      extensionManager: this.extensionManager,
      resolveHandler: (entryTypeId) => this.resolveHandler(entryTypeId),
      coordinator: this.coordinator,
      typeSystem: this.typeSystem,
      triggerLifecycle: (extensionId, stageId) => this.triggerLifecycleStageInternal(extensionId, stageId),
      dispatchActionsChain: (chain) => this.executeActionsChain(chain),
      hostRuntime: this,
      registerExtensionActionHandler: (extensionId, actionTypeId, handler, domainId) => this.mediator.registerHandler(extensionId, actionTypeId, handler, domainId),
      unregisterExtensionActionHandler: (extensionId) => this.mediator.unregisterAllHandlers(extensionId),
      bridgeFactory: this.bridgeFactory,
      buildInboundBridgeLink: (extensionId, childBridge, parentBridge) => this.buildInboundBridgeLinkFor(extensionId, childBridge, parentBridge),
      retractInboundBridgeLink: (childBridge) => this.retractInboundBridgeLinkFor(childBridge),
      router: this.router,
      getInboundBridge: () => this.inboundBridgeLink?.edge
    });
    const adopted = adoptAmbientInboundBridgeLink((link) => this.relinkInboundBridge(link));
    this.relinkInboundBridge(adopted ?? null);
    if (config.mfeHandlers) {
      for (const handler of config.mfeHandlers) {
        handler.attachTypeSystem(this.typeSystem);
        this.handlers.push(handler);
      }
      this.handlers.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    }
  }
  // ─── Cross-nesting reachability: propagation, escalation, retraction ──────
  // @cpt-algo:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2
  /**
   * The ONE place this registry's inbound-bridge link state changes — used
   * both by the constructor's initial ambient adoption and by the mount
   * manager's retention record (unlink on unregistration or supersession,
   * re-offer on a later mount). A no-op if `link` is already this registry's
   * current link.
   *
   * @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-relink-repropagate
   */
  relinkInboundBridge(link) {
    if (this.inboundBridgeLink === link) return;
    this.inboundActionsChainUnsubscribe?.();
    this.inboundActionsChainUnsubscribe = null;
    this.propagatedTargetIds.clear();
    this.inboundBridgeLink = link;
    if (!link) return;
    if (_DefaultMfeRegistry.hasOnCrossHopEnvelopeMethod(link.edge)) {
      this.inboundActionsChainUnsubscribe = link.edge.onCrossHopEnvelope(
        (envelope) => this.receiveCrossHopNode(envelope, true)
      );
    }
    this.repropagateThroughInboundBridge();
    if (this.router) {
      this.router.supplyNavigation(() => readOccupantValue(this.inboundBridgeLink?.edge));
    }
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-relink-repropagate
  /**
   * Re-advertise, through this registry's (newly re-linked) inbound bridge,
   * every target this registry currently holds: each domain and extension
   * admitted to it directly, and every forwarding entry it holds on behalf
   * of its own descendants. Called only from `relinkInboundBridge`, after
   * the link is already in place, so `propagateAdvertisementUpward`'s own
   * already-propagated guard (`propagatedTargetIds`) governs whether any given
   * target actually re-propagates further.
   */
  repropagateThroughInboundBridge() {
    for (const targetId of this.advertisableTargets) {
      this.propagateAdvertisementUpward(targetId);
    }
    for (const targetId of this.forwardingEntries.keys()) {
      this.propagateAdvertisementUpward(targetId);
    }
  }
  /**
   * Build the `InboundBridgeLink` a nested registry — one constructed
   * synchronously inside this extension's own `mount()` body — will
   * automatically adopt as its inbound bridge. Called by `DefaultMountManager`
   * right before invoking `lifecycle.mount(...)`.
   *
   * `inst-inbound-bridge-internal` is a surface-shape claim about the
   * abstract `ChildMfeBridge` contract, marked at its declaration in
   * `handler/ChildMfeBridge.ts` rather than here.
   */
  buildInboundBridgeLinkFor(extensionId, childBridge, parentBridge) {
    const sendDown = (envelope) => {
      if (!(parentBridge instanceof ParentMfeBridgeImpl)) {
        throw new Error(`Internal: expected a ParentMfeBridgeImpl for extension '${extensionId}'`);
      }
      parentBridge.sendCrossHopEnvelope(envelope);
    };
    let revoked = false;
    this.linkRevokersByBridge.set(childBridge, () => {
      revoked = true;
    });
    return {
      edge: childBridge,
      // @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-propagate-upward
      propagateAdvertisement: (targetId) => revoked ? false : this.admitAdvertisement(targetId, childBridge, sendDown),
      // @cpt-end:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-propagate-upward
      retractAdvertisement: (targetId) => {
        if (!revoked) this.retractForwardingEntry(targetId, childBridge);
      },
      // Calls `tagArrivalEdge` (realizes inst-tag-arrival-edge; canonical
      // marker kept at that function's definition in inbound-bridge-link.ts
      // to avoid a second code location for the same instruction ID).
      // Minted and executed entirely on THIS (the parent) registry's own
      // side, using this copy's own `tagArrivalEdge`/`getArrivalEdge` pair —
      // never the child's — so the tag is visible to this same registry's
      // own `resolveHandler` regardless of whether the child that escalated
      // through this link is evaluating a different, independently loaded
      // copy of this package (`inst-mint-escalation-on-link`).
      // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-escalation-lookup
      escalate: (envelope) => {
        if (revoked) {
          throw new Error(`Inbound bridge link for '${extensionId}' has been revoked.`);
        }
        if (!isActiveBridge(childBridge)) {
          throw new BridgeInactiveError(extensionId);
        }
        tagArrivalEdge(envelope.chain.action, childBridge);
        this.receiveCrossHopNode(envelope);
      }
      // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-escalation-lookup
    };
  }
  /**
   * Receiving-ancestor side of propagation: admit (or reject) an advertisement
   * from a descendant registry.
   *
   * @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-collision-check
   */
  admitAdvertisement(targetId, edge, sendDown) {
    const hasLocalTarget = !!this.extensionManager.getDomainState(targetId) || !!this.extensionManager.getExtensionState(targetId);
    const existing = this.forwardingEntries.get(targetId);
    if (existing && existing.edge === edge) {
      return true;
    }
    if (hasLocalTarget || this.forwardingEntries.has(targetId)) {
      console.error(
        `[DefaultMfeRegistry] Advertisement collision for target '${targetId}': an ancestor already holds a local registration or a forwarding entry for this identifier. Rejecting the advertisement \u2014 it will not be reachable through this path.`
      );
      return false;
    }
    this.forwardingEntries.set(targetId, { edge, sendDown });
    this.propagateAdvertisementUpward(targetId);
    return true;
  }
  /**
   * Compose and propagate an advertisement for a locally-admitted target
   * upward through this registry's inbound bridge, if it has one.
   */
  propagateAdvertisementUpward(targetId) {
    if (!this.inboundBridgeLink) {
      return;
    }
    if (this.propagatedTargetIds.has(targetId)) {
      return;
    }
    const accepted = this.inboundBridgeLink.propagateAdvertisement(targetId);
    if (accepted) {
      this.propagatedTargetIds.add(targetId);
    }
  }
  /**
   * Retract a target this registry itself previously propagated upward
   * (called from `unregisterDomain`/`unregisterExtension`/`dispose`).
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-retract-advertisements
  retractPropagatedTarget(targetId) {
    if (this.propagatedTargetIds.delete(targetId) && this.inboundBridgeLink) {
      this.inboundBridgeLink.retractAdvertisement(targetId);
    }
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-retract-advertisements
  /**
   * Receiving-ancestor side of retraction: drop a forwarding entry this
   * registry holds for a descendant's target, then re-propagate the
   * retraction further up if this registry itself has an inbound bridge.
   * Acts on the route only: a sub-chain the far side already accepted
   * through this entry keeps executing there (`inst-retract-advertisements`).
   */
  retractForwardingEntry(targetId, edge) {
    const entry = this.forwardingEntries.get(targetId);
    if (!entry || entry.edge !== edge) {
      return;
    }
    this.forwardingEntries.delete(targetId);
    if (this.inboundBridgeLink) {
      this.inboundBridgeLink.retractAdvertisement(targetId);
    }
  }
  /**
   * Parent-triggered retraction (`inst-retract-advertisements`): revoke every
   * forwarding entry this registry holds that was propagated through a
   * SPECIFIC descendant's inbound bridge — called by `DefaultMountManager`
   * only from `releaseExtension` (the destroy path, when the extension is
   * unregistered), never from an ordinary unmount or a mount failure: those
   * two instead deactivate the acquired bridge (`bridgeFactory.deactivateBridge`),
   * leaving this registry's forwarding entries and inbound link intact so a
   * later remount resumes delivery on the same bridge. This retraction runs
   * regardless of whether the nested registry that extension hosts ever
   * disposes itself. After this runs, the parent's own forwarding-entry
   * state for that bridge is fully clean, so a later registration of the
   * extension re-advertises without collision, and a retained child
   * registry's own further attempts to propagate or retract through its
   * now-revoked link simply fail to find an entry to
   * touch here — never crash, never resurrect stale routing.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-retract-advertisements
  retractInboundBridgeLinkFor(childBridge) {
    this.linkRevokersByBridge.get(childBridge)?.();
    for (const [targetId, entry] of Array.from(this.forwardingEntries.entries())) {
      if (entry.edge === childBridge) {
        this.retractForwardingEntry(targetId, childBridge);
      }
    }
    unregisterInboundBridgeLink(childBridge);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-retract-advertisements
  /**
   * Mediator-injected tier-2 resolution: a downward forwarding entry for
   * `targetId`, excluding one whose bridge equals the chain's tagged arrival
   * edge (loop containment).
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-forwarding-entry-lookup
  resolveForwardingEntryRoute(targetId, arrivalEdge) {
    const entry = this.forwardingEntries.get(targetId);
    if (!entry) {
      return void 0;
    }
    if (arrivalEdge !== void 0 && entry.edge === arrivalEdge) {
      return void 0;
    }
    return new CrossHopRoute(entry.sendDown);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-forwarding-entry-lookup
  /**
   * Mediator-injected tier-3 resolution: the escalation route bound to this
   * registry's inbound bridge. `undefined` when this registry holds no
   * inbound bridge (it is the shell). Arrival-edge tagging is NOT done here
   * — it happens inside `link.escalate` itself, minted by the PARENT
   * registry at link time (`buildInboundBridgeLinkFor`), so that the tag is
   * written and later read by the same (parent) copy of this package
   * regardless of which copy this (child) registry belongs to.
   *
   * Deliberately target-blind by design: by the time the mediator's
   * escalation tier runs, tiers 1-2 have already exhausted every way THIS
   * registry could resolve the target locally. A nested registry structurally
   * cannot know what an ancestor registry holds — so escalation always tries
   * upward regardless of which target failed to resolve here. Not needing
   * `targetId` is not an oversight; it reflects that structural blindness.
   *
   * @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-escalation-lookup
   */
  resolveEscalationRoute() {
    const link = this.inboundBridgeLink;
    if (!link) {
      return void 0;
    }
    return new CrossHopRoute((envelope) => link.escalate(envelope));
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-escalation-lookup
  // ─── Private lifecycle trigger helpers ─────────────────────────────────────
  /**
   * Internal: trigger a lifecycle stage for a specific extension.
   * Used by collaborators that hold no public method of their own for it.
   */
  triggerLifecycleStageInternal(extensionId, stageId) {
    this.lifecycleManager.triggerLifecycleStage(extensionId, stageId);
  }
  /**
   * Internal: auto-unmount path used by `DefaultExtensionManager.unregisterExtension`.
   *
   * Resolves the extension's domain, then releases it through
   * `ExtensionReleaserProvider.for(mounter)` — the same route an ordinary
   * `unmount_ext` action takes — so mount-set bookkeeping
   * (`removeMountedExtension`), `MountManager.unmountExtension`, AND the
   * container destroy registered by the mount strategy that created it
   * (`ContainerHooks.destroy`, via `ExtensionReleaser.registerDestroy`) all
   * run for this extension, exactly as they do for any other unmount.
   *
   * The serializer lock for this extension is already held by the parent
   * `unregisterExtension` operation; the mounter does not re-acquire it, so
   * no deadlock is possible.
   */
  async bypassUnmountExtension(extensionId) {
    const extState = this.extensionManager.getExtensionState(extensionId);
    if (!extState) {
      return;
    }
    const domainState = this.extensionManager.getDomainState(extState.extension.domain);
    const mounter = domainState?.mounter;
    if (mounter) {
      await ExtensionReleaserProvider.for(mounter).release(extensionId);
      return;
    }
    await this.mountManager.unmountExtension(extensionId);
  }
  /**
   * Internal: trigger a lifecycle stage on the domain entity itself.
   */
  triggerDomainOwnLifecycleStageInternal(domainId, stageId) {
    this.lifecycleManager.triggerDomainOwnLifecycleStage(domainId, stageId);
  }
  // ─── Entry type validation ────────────────────────────────────────────────
  validateEntryType(entryTypeId) {
    if (this.handlers.length === 0) {
      return;
    }
    const canHandle = this.handlers.some(
      (handler) => this.typeSystem.isTypeOf(entryTypeId, handler.handledBaseTypeId)
    );
    if (!canHandle) {
      throw new EntryTypeNotHandledError(
        entryTypeId,
        this.handlers.map((h) => h.handledBaseTypeId)
      );
    }
  }
  resolveHandler(entryTypeId) {
    return this.handlers.find(
      (handler) => this.typeSystem.isTypeOf(entryTypeId, handler.handledBaseTypeId)
    );
  }
  // ─── registerDomain ───────────────────────────────────────────────────────
  /**
   * Register an extension domain.
   */
  registerDomain(declaration, factory) {
    if (this.extensionManager.getDomainState(declaration.id)) {
      throw new DomainValidationError(
        declaration.id,
        new Error(`domain '${declaration.id}' is already registered`)
      );
    }
    this.extensionManager.registerDomain(declaration);
    const mounter = new DefaultExtensionMounter(
      declaration.id,
      this.mountManager,
      (domainId, extId) => this.extensionManager.addMountedExtension(domainId, extId),
      (domainId, extId) => this.extensionManager.removeMountedExtension(domainId, extId),
      (domainId) => this.extensionManager.getMountedExtensions(domainId)
    );
    const lifecycleTrigger = new DefaultDomainLifecycleTrigger(declaration.id, this.lifecycleManager);
    const ctx = new InvalidatableDomainContext(mounter, lifecycleTrigger, this.typeSystem);
    ctx.prepopulateHandler(
      this.typeSystem.resolveLoadExtActionId(),
      new LoadExtHandler(this.operationSerializer, this.mountManager)
    );
    let implementation;
    try {
      implementation = factory.build(ctx);
    } catch (error) {
      ctx.clearCollectedHandlers();
      this.extensionManager.unregisterDomain(declaration.id).catch(() => {
      });
      throw error;
    } finally {
      ctx.invalidate();
    }
    const mountStrategies = implementation._getMountStrategiesInternal();
    try {
      this.crossValidateHandlers(declaration, mountStrategies, ctx);
    } catch (error) {
      ctx.clearCollectedHandlers();
      this.extensionManager.unregisterDomain(declaration.id).catch(() => {
      });
      throw error;
    }
    if (this.router) {
      try {
        this.router.registerDomain(declaration);
        this.routerAdmittedDomainIds.add(declaration.id);
      } catch (error) {
        ctx.clearCollectedHandlers();
        this.extensionManager.unregisterDomain(declaration.id).catch(() => {
        });
        throw error;
      }
    }
    try {
      this.typeSystem.register(declaration);
    } catch (cause) {
      const err = cause instanceof Error ? cause : new Error(String(cause));
      this.releaseRouterDomain(declaration.id);
      ctx.clearCollectedHandlers();
      this.extensionManager.unregisterDomain(declaration.id).catch(() => {
      });
      throw new DomainValidationError(declaration.id, err);
    }
    const isConcurrent = mountStrategies[0] instanceof ConcurrentMountStrategy;
    const concurrentJoiner = isConcurrent ? new ConcurrentMountJoiner() : void 0;
    const queue = isConcurrent ? void 0 : new DomainOccupancyCoordinator(declaration.id);
    if (queue) {
      this.occupancyCoordinatorsByDomain.set(declaration.id, queue);
    }
    const admissionReader = {
      domainOf: (extensionId) => this.extensionManager.getExtensionState(extensionId)?.extension.domain
    };
    const mountedReader = {
      isMounted: (extensionId) => this.extensionManager.getMountedExtensions(declaration.id).includes(extensionId)
    };
    const domainReader = () => this.extensionManager.getDomainState(declaration.id)?.domain;
    const mountExtActionId = this.typeSystem.resolveMountExtActionId();
    const unmountExtActionId = this.typeSystem.resolveUnmountExtActionId();
    for (const [actionType, handler] of ctx.getCollectedHandlers()) {
      let wrapped = handler;
      if (actionType === mountExtActionId) {
        wrapped = new MountExtActionHandler(
          handler,
          declaration.id,
          admissionReader,
          mountedReader,
          {
            inFlight: (extensionId) => ExtensionReleaserProvider.for(mounter).inFlight(extensionId) ?? mounter.getUnmountInFlight(extensionId)
          },
          this.actionTimeoutResolver,
          domainReader,
          queue,
          concurrentJoiner,
          this.router
        );
      } else if (actionType === unmountExtActionId) {
        wrapped = new UnmountExtActionHandler(
          handler,
          declaration.id,
          admissionReader,
          mountedReader,
          this.actionTimeoutResolver,
          domainReader,
          queue,
          concurrentJoiner,
          this.router
        );
      }
      this.mediator.registerHandler(declaration.id, actionType, wrapped);
    }
    this.extensionManager.setDomainImplementation(
      declaration.id,
      mounter,
      lifecycleTrigger,
      implementation
    );
    this.advertisableTargets.add(declaration.id);
    this.propagateAdvertisementUpward(declaration.id);
    this.triggerDomainOwnLifecycleStageInternal(
      declaration.id,
      this.typeSystem.resolveLifecycleStageInitId()
    );
  }
  /**
   * Cross-validate handlers vs declaration AND strategy/cardinality matrix.
   *
   * @throws {Error} on any violation.
   */
  // @cpt-algo:cpt-frontx-algo-extension-domain-governance-strategy-cardinality:p1
  // @cpt-state:cpt-frontx-state-extension-domain-governance-cardinality:p2
  // @cpt-dod:cpt-frontx-dod-extension-domain-governance-cardinality-enforcement:p1
  // @cpt-begin:cpt-frontx-algo-extension-domain-governance-strategy-cardinality:p1:inst-sc-identify-strategy
  crossValidateHandlers(declaration, strategies, ctx) {
    if (strategies.length === 0) {
      throw new Error(
        `Domain '${declaration.id}': domain implementation must capture at least one MountStrategy instance.`
      );
    }
    const strategy = strategies[0];
    let requireMount;
    let requireUnmount;
    let forbidUnmount;
    let strategyName;
    if (strategy instanceof ConcurrentMountStrategy) {
      strategyName = "ConcurrentMountStrategy";
      requireMount = true;
      requireUnmount = true;
      forbidUnmount = false;
    } else if (strategy instanceof OptionalMountStrategy) {
      strategyName = "OptionalMountStrategy";
      requireMount = true;
      requireUnmount = true;
      forbidUnmount = false;
    } else if (strategy instanceof ExclusiveMountStrategy) {
      strategyName = "ExclusiveMountStrategy";
      requireMount = true;
      requireUnmount = false;
      forbidUnmount = true;
    } else {
      throw new Error(
        `Domain '${declaration.id}': unrecognized MountStrategy class. The cardinality matrix only handles ConcurrentMountStrategy, OptionalMountStrategy, and ExclusiveMountStrategy. Custom strategy classes are not supported (per ADR-0009).`
      );
    }
    const declaredActions = declaration.actions;
    const mountExtActionId = this.typeSystem.resolveMountExtActionId();
    const unmountExtActionId = this.typeSystem.resolveUnmountExtActionId();
    const hasMountExt = declaredActions.includes(mountExtActionId);
    const hasUnmountExt = declaredActions.includes(unmountExtActionId);
    if (requireMount && !hasMountExt) {
      throw new Error(
        `Domain '${declaration.id}': ${strategyName} requires '${mountExtActionId}' in declaration.actions.`
      );
    }
    if (requireUnmount && !hasUnmountExt) {
      throw new Error(
        `Domain '${declaration.id}': ${strategyName} requires '${unmountExtActionId}' in declaration.actions.`
      );
    }
    if (forbidUnmount && hasUnmountExt) {
      throw new Error(
        `Domain '${declaration.id}': ${strategyName} forbids '${unmountExtActionId}' in declaration.actions, but declared action '${unmountExtActionId}' violates this rule.`
      );
    }
    const collectedHandlers = ctx.getCollectedHandlers();
    for (const actionType of declaredActions) {
      if (!collectedHandlers.has(actionType)) {
        throw new Error(
          `Domain '${declaration.id}': declaration lists '${actionType}' but no handler was registered via ctx.registerHandler.`
        );
      }
    }
    const prepopulated = ctx.getPrepopulatedActionTypes();
    for (const [actionType] of collectedHandlers) {
      if (prepopulated.has(actionType)) continue;
      if (!declaredActions.includes(actionType)) {
        throw new Error(
          `Domain '${declaration.id}': handler registered for '${actionType}' but '${actionType}' is not declared in declaration.actions.`
        );
      }
    }
  }
  // ─── Execute actions chain ────────────────────────────────────────────────
  // @cpt-begin:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-mount-action
  /**
   * Execute an actions chain through this registry's mediator. Takes only
   * the chain and returns nothing awaitable.
   */
  // @cpt-begin:cpt-frontx-flow-mfe-host-communication-dispatch-chain:p1:inst-invoke-execute
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-accept-yields-nothing
  executeActionsChain(chain) {
    this.mediator.executeActionsChain(chain);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-accept-yields-nothing
  // @cpt-end:cpt-frontx-flow-mfe-host-communication-dispatch-chain:p1:inst-invoke-execute
  // @cpt-end:cpt-frontx-flow-extension-domain-governance-admission:p1:inst-mount-action
  /**
   * Receiving side of every hand-over into this registry — a downward
   * forwarding entry or an upward escalation. Refuses, with no side effect here, when the envelope carries a
   * version this copy does not recognize or this registry is disposed;
   * otherwise accepts, and the sub-chain executes after this call returns.
   * A chain handed down from the parent (`fromParent`) is never escalated.
   *
   * @throws {Error} to refuse the hand-over.
   */
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-receive-hand-over
  receiveCrossHopNode(envelope, fromParent = false) {
    if (envelope.version !== CROSS_HOP_PROTOCOL_VERSION || this.disposed) {
      throw new Error(
        this.disposed ? "Hand-over refused: this registry has been disposed." : `Hand-over refused: unrecognized cross-hop envelope version ${String(envelope.version)}.`
      );
    }
    this.mediator.receiveHandedOverChain(envelope.chain, fromParent);
  }
  // @cpt-end:cpt-frontx-algo-mfe-host-communication-mediator-dispatch:p1:inst-receive-hand-over
  // ─── Shared property ──────────────────────────────────────────────────────
  updateSharedProperty(propertyId, value) {
    this.extensionManager.updateSharedProperty(propertyId, value);
  }
  getDomainProperty(domainId, propertyTypeId) {
    return this.extensionManager.getDomainProperty(domainId, propertyTypeId);
  }
  // ─── Query ────────────────────────────────────────────────────────────────
  /**
   * Get the insertion-ordered list of currently-mounted extension IDs for a domain.
   */
  getMountedExtensions(domainId) {
    return this.extensionManager.getMountedExtensions(domainId);
  }
  /**
   * Returns the per-domain `ExtensionMounter` instance.
   * Called by the React `ExtensionDomainSlot` to call attach/detach.
   *
   * @throws {Error} if domain is not registered.
   */
  getMounter(domainId) {
    const state = this.extensionManager.getDomainState(domainId);
    if (!state || !state.mounter) {
      throw new Error(
        `getMounter: domain '${domainId}' is not registered or has no mounter. Call registerDomain before accessing the mounter.`
      );
    }
    return state.mounter;
  }
  getParentBridge(extensionId) {
    return this.extensionManager.getExtensionState(extensionId)?.bridge ?? null;
  }
  // @cpt-flow:cpt-frontx-flow-mfe-registry-register-validate-mount:p1
  // @cpt-algo:cpt-frontx-algo-mfe-registry-register-extension:p2
  async registerExtension(extension) {
    return this.operationSerializer.serializeOperation(extension.id, async () => {
      if (this.domainsUnregistering.has(extension.domain)) {
        throw new DomainUnregisteringError(extension.domain, extension.id);
      }
      if (this.extensionManager.getExtensionState(extension.id)) {
        throw new Error(`Extension '${extension.id}' is already registered.`);
      }
      await this.extensionManager.registerExtension(extension);
      if (this.router) {
        this.routerAdmittedExtensionIds.add(extension.id);
      }
      this.advertisableTargets.add(extension.id);
      this.propagateAdvertisementUpward(extension.id);
      try {
        const packageId = extractGtsPackage(extension.id);
        if (!this.packages.has(packageId)) {
          this.packages.set(packageId, /* @__PURE__ */ new Set());
        }
        this.packages.get(packageId).add(extension.id);
      } catch {
      }
    });
  }
  // @cpt-state:cpt-frontx-state-mfe-registry-entry-lifecycle:p2
  async unregisterExtension(extensionId) {
    return this.operationSerializer.serializeOperation(extensionId, async () => {
      await this.extensionManager.unregisterExtension(extensionId);
      this.releaseRouterExtension(extensionId);
      this.retractPropagatedTarget(extensionId);
      this.advertisableTargets.delete(extensionId);
      try {
        const packageId = extractGtsPackage(extensionId);
        const extensionSet = this.packages.get(packageId);
        if (extensionSet) {
          extensionSet.delete(extensionId);
          if (extensionSet.size === 0) {
            this.packages.delete(packageId);
          }
        }
      } catch {
      }
    });
  }
  async unregisterDomain(domainId) {
    return this.operationSerializer.serializeOperation(domainId, async () => {
      this.domainsUnregistering.add(domainId);
      try {
        this.occupancyCoordinatorsByDomain.get(domainId)?.close("was unregistered while the request was queued.");
        let liveExtensionIds = this.extensionManager.getExtensionStatesForDomain(domainId).map((state) => state.extension.id);
        while (liveExtensionIds.length > 0) {
          for (const extensionId of liveExtensionIds) {
            await this.unregisterExtension(extensionId);
          }
          liveExtensionIds = this.extensionManager.getExtensionStatesForDomain(domainId).map((state) => state.extension.id);
        }
        await this.extensionManager.unregisterDomain(domainId);
        this.mediator.unregisterAllHandlers(domainId);
        this.occupancyCoordinatorsByDomain.delete(domainId);
        this.releaseRouterDomain(domainId);
        this.retractPropagatedTarget(domainId);
        this.advertisableTargets.delete(domainId);
      } finally {
        this.domainsUnregistering.delete(domainId);
        if (this.extensionManager.getDomainState(domainId)) {
          this.occupancyCoordinatorsByDomain.get(domainId)?.reopen();
        }
      }
    });
  }
  /**
   * Release notification helpers shared by `unregisterExtension`,
   * `unregisterDomain`, and `dispose` — sent only for an id the router
   * actually admitted, and never allowed to throw past this point: a
   * release is resource cleanup, never refused
   * (`inst-algo-ra-release-failure`). Resource cleanup, not an occupancy
   * action: these releases dispatch no `unmount_ext` and send no
   * settled-action report, so they give the router no occupancy action to
   * reflect into the URL (`inst-algo-ra-cleanup-no-report`).
   */
  // @cpt-begin:cpt-frontx-algo-mfe-registry-router-admission:p1:inst-algo-ra-cleanup-no-report
  // @cpt-begin:cpt-frontx-algo-mfe-registry-router-admission:p1:inst-algo-ra-release-failure
  releaseRouterExtension(extensionId) {
    if (!this.router || !this.routerAdmittedExtensionIds.delete(extensionId)) {
      return;
    }
    try {
      this.router.releaseExtension(extensionId);
    } catch (error) {
      console.error(`[DefaultMfeRegistry] releaseExtension failed for '${extensionId}':`, error);
    }
  }
  releaseRouterDomain(domainId) {
    if (!this.router || !this.routerAdmittedDomainIds.delete(domainId)) {
      return;
    }
    try {
      this.router.releaseDomain(domainId);
    } catch (error) {
      console.error(`[DefaultMfeRegistry] releaseDomain failed for '${domainId}':`, error);
    }
  }
  // @cpt-end:cpt-frontx-algo-mfe-registry-router-admission:p1:inst-algo-ra-release-failure
  // @cpt-end:cpt-frontx-algo-mfe-registry-router-admission:p1:inst-algo-ra-cleanup-no-report
  getExtension(extensionId) {
    return this.extensionManager.getExtensionState(extensionId)?.extension;
  }
  getDomain(domainId) {
    return this.extensionManager.getDomainState(domainId)?.domain;
  }
  getExtensionsForDomain(domainId) {
    const extensionStates = this.extensionManager.getExtensionStatesForDomain(domainId);
    return extensionStates.map((state) => state.extension);
  }
  getRegisteredPackages() {
    return Array.from(this.packages.keys());
  }
  getExtensionsForPackage(packageId) {
    const extensionIdSet = this.packages.get(packageId);
    if (!extensionIdSet) {
      return [];
    }
    const extensions = [];
    for (const extensionId of extensionIdSet) {
      const extension = this.getExtension(extensionId);
      if (extension) {
        extensions.push(extension);
      }
    }
    return extensions;
  }
  /**
   * Get domain state for a registered domain.
   * INTERNAL: Used by ActionsChainsMediator for domain resolution.
   */
  getDomainState(domainId) {
    return this.extensionManager.getDomainState(domainId);
  }
  setTheme(cssVars) {
    this.mountManager.setTheme(cssVars);
  }
  // @cpt-begin:cpt-frontx-algo-mfe-host-communication-registration-propagation:p2:inst-retract-own-advertisements
  dispose() {
    this.disposed = true;
    for (const targetId of Array.from(this.propagatedTargetIds)) {
      this.retractPropagatedTarget(targetId);
    }
    this.forwardingEntries.clear();
    this.advertisableTargets.clear();
    this.relinkInboundBridge(null);
    for (const extensionId of Array.from(this.routerAdmittedExtensionIds)) {
      this.releaseRouterExtension(extensionId);
    }
    for (const domainId of Array.from(this.routerAdmittedDomainIds)) {
      this.releaseRouterDomain(domainId);
    }
    this.extensionManager.clear();
    this.operationSerializer.clear();
    this.packages.clear();
    this.handlers.length = 0;
    for (const coordinator of this.occupancyCoordinatorsByDomain.values()) {
      coordinator.close("was disposed with the registry while the request was queued.");
    }
    this.occupancyCoordinatorsByDomain.clear();
    void this.coordinator;
  }
};
var DefaultMfeRegistryFactory = class extends MfeRegistryFactory {
  instance = null;
  // A snapshot of the plugin, not the config object it arrived in: the caller
  // keeps a reference to that object and may reassign `typeSystem` on it, which
  // would leave the mismatch check below comparing the new plugin against
  // itself and handing back a registry bound to the old one.
  cachedTypeSystem = null;
  // A snapshot of the router (or its absence), taken from the configuration
  // rather than the caller's config object, for the same reason as
  // `cachedTypeSystem` above. `undefined` here means "built with no router",
  // compared by identity so a router supplied after the first build omitted
  // one, or omitted after one was supplied, is a mismatch like any other.
  cachedRouter = void 0;
  /**
   * Build a MfeRegistry instance with the provided configuration.
   *
   * On first call: creates a new DefaultMfeRegistry, caches it alongside the
   * plugin it was bound to, returns it.
   * On subsequent calls: validates the supplied plugin is the one the cached
   * registry was built with, returns cached instance.
   *
   * @param config - Registry configuration (must include typeSystem)
   * @returns The MfeRegistry singleton instance
   * @throws Error if called with a different plugin after first build
   */
  // @cpt-begin:cpt-frontx-flow-mfe-registry-factory-build:p1:inst-flow-fb-01
  build(config) {
    if (this.instance) {
      if (this.cachedTypeSystem && config.typeSystem !== this.cachedTypeSystem) {
        throw new Error(
          `MfeRegistry already built with a different TypeSystemPlugin. Cannot rebuild with a different configuration. Expected: ${this.cachedTypeSystem.name}, Got: ${config.typeSystem.name}`
        );
      }
      if (config.router !== this.cachedRouter) {
        throw new Error(
          `MfeRegistry already built with a different router (or a different router presence). Cannot rebuild with a different configuration. Expected: ${this.cachedRouter ? "a router" : "no router"}, Got: ${config.router ? "a router" : "no router"}`
        );
      }
      return this.instance;
    }
    this.cachedTypeSystem = config.typeSystem;
    this.cachedRouter = config.router;
    this.instance = new DefaultMfeRegistry(config);
    return this.instance;
  }
};
function createMfeRegistryFactory() {
  return new DefaultMfeRegistryFactory();
}
var MfeStateContainer = class {
};
export {
  ActionHandler,
  ActionsChainsMediator,
  BridgeDisposedError,
  BridgeInactiveError,
  ChildMfeBridge,
  ConcurrentMountStrategy,
  DomainLifecycleTrigger,
  DomainUnregisteringError,
  DomainValidationError,
  EntryTypeNotHandledError,
  ExclusiveMountStrategy,
  ExtensionDomainImplementation,
  ExtensionDomainImplementationFactory,
  ExtensionManager,
  ExtensionMounter,
  ExtensionTypeError,
  InvalidatableDomainContext,
  LazyLoaderRegistry,
  LifecycleManager,
  LoadExtHandler,
  LruCache,
  MfeBridgeFactory,
  MfeError,
  MfeHandler,
  MfeHandlerMF,
  MfeLoadError,
  MfeRegistry,
  MfeRegistryFactory,
  MfeStateContainer,
  MfeTypeConformanceError,
  MountManager,
  MountStrategy,
  NoActionsChainHandlerError,
  NoHandlerForActionTargetError,
  OperationSerializer,
  OptionalMountStrategy,
  ParentMfeBridge,
  RetryHandler,
  RuntimeBridgeFactory,
  RuntimeCoordinator,
  UnsupportedLifecycleStageError,
  WeakMapRuntimeCoordinator,
  createMfeRegistryFactory,
  createShadowRoot,
  extractGtsPackage,
  formatContractErrors,
  importBlobModule,
  injectCssVariables,
  injectStylesheet,
  isInfrastructureLifecycleAction,
  rewriteBareSpecifier,
  sourceImports,
  validateContract,
  validateDomainLifecycleHooks,
  validateExtensionLifecycleHooks,
  validateExtensionType
};
