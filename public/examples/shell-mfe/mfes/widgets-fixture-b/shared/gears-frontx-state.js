// ../../../packages/state/dist/index.js
import {
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import {
  createSlice as rtkCreateSlice
} from "@reduxjs/toolkit";
var EventBusImpl = class {
  handlers = /* @__PURE__ */ new Map();
  /**
   * Emit an event with payload.
   * Type-safe: payload must match event type in EventPayloadMap.
   * Payload is optional for void events.
   */
  // @cpt-algo:cpt-frontx-algo-state-management-eventbus-emit:p1
  emit(eventType, ...args) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const payload = args[0];
      handlers.forEach((handler) => handler(payload));
    }
  }
  /**
   * Subscribe to an event.
   * Type-safe: handler receives correct payload type for event.
   * Returns subscription object with unsubscribe method.
   */
  // @cpt-algo:cpt-frontx-algo-state-management-eventbus-subscribe:p1
  // @cpt-flow:cpt-frontx-flow-state-management-type-augmentation:p1
  on(eventType, handler) {
    const key = eventType;
    if (!this.handlers.has(key)) {
      this.handlers.set(key, /* @__PURE__ */ new Set());
    }
    this.handlers.get(key).add(handler);
    return {
      unsubscribe: () => {
        const handlers = this.handlers.get(key);
        if (handlers) {
          handlers.delete(handler);
          if (handlers.size === 0) {
            this.handlers.delete(key);
          }
        }
      }
    };
  }
  /**
   * Subscribe to event, but only fire once then auto-unsubscribe.
   * Type-safe: handler receives correct payload type for event.
   */
  // @cpt-algo:cpt-frontx-algo-state-management-eventbus-subscribe-once:p2
  once(eventType, handler) {
    const wrappedHandler = (payload) => {
      handler(payload);
      subscription.unsubscribe();
    };
    const subscription = this.on(eventType, wrappedHandler);
    return subscription;
  }
  /**
   * Remove all handlers for an event type.
   */
  clear(eventType) {
    this.handlers.delete(eventType);
  }
  /**
   * Remove all event handlers.
   */
  clearAll() {
    this.handlers.clear();
  }
};
var eventBus = new EventBusImpl();
var staticReducers = {};
var dynamicReducers = {};
var storeInstance = null;
var effectCleanups = /* @__PURE__ */ new Map();
function createStore(initialReducers = {}) {
  staticReducers = { ...initialReducers };
  const rootReducer = Object.keys(staticReducers).length > 0 ? combineReducers(staticReducers) : (state) => state ?? {};
  storeInstance = configureStore({
    reducer: rootReducer
  });
  const instance = storeInstance;
  const store = {
    getState: () => instance.getState(),
    dispatch: instance.dispatch,
    subscribe: instance.subscribe,
    replaceReducer: instance.replaceReducer,
    [Symbol.observable]: () => instance[Symbol.observable]()
  };
  return store;
}
function getStore() {
  if (!storeInstance) {
    return createStore();
  }
  const instance = storeInstance;
  return {
    getState: () => instance.getState(),
    dispatch: instance.dispatch,
    subscribe: instance.subscribe,
    replaceReducer: instance.replaceReducer,
    [Symbol.observable]: () => instance[Symbol.observable]()
  };
}
function registerSlice(slice, initEffects) {
  if (!storeInstance) {
    createStore();
  }
  const sliceName = slice.name;
  const reducer = slice.reducer;
  const previousCleanup = effectCleanups.get(sliceName);
  if (previousCleanup) {
    previousCleanup();
    effectCleanups.delete(sliceName);
  }
  if (dynamicReducers[sliceName]) {
    if (initEffects) {
      const cleanup = initEffects(storeInstance.dispatch);
      if (cleanup) {
        effectCleanups.set(sliceName, cleanup);
      }
    }
    return;
  }
  if (sliceName.includes("/")) {
    const parts = sliceName.split("/");
    if (parts.length !== 2) {
      throw new Error(
        `Invalid domain slice key: "${sliceName}".
Domain-based slices must use "screensetId/domain" format (exactly 2 parts).
Examples: "chat/threads", "chat/messages", "dashboard/widgets"
Invalid: "chat/messages/extra" (too many parts)`
      );
    }
    if (parts[0] === "" || parts[1] === "") {
      throw new Error(
        `Invalid domain slice key: "${sliceName}".
Both screensetId and domain must be non-empty.
Fix: Use format "screensetId/domain" (e.g., "chat/threads")`
      );
    }
  }
  dynamicReducers[sliceName] = reducer;
  const rootReducer = combineReducers({
    ...staticReducers,
    ...dynamicReducers
  });
  storeInstance.replaceReducer(rootReducer);
  if (initEffects) {
    const cleanup = initEffects(storeInstance.dispatch);
    if (cleanup) {
      effectCleanups.set(sliceName, cleanup);
    }
  }
}
function unregisterSlice(sliceName) {
  if (!storeInstance) {
    return;
  }
  if (!dynamicReducers[sliceName]) {
    console.warn(`Slice "${sliceName}" is not registered. Skipping.`);
    return;
  }
  const cleanup = effectCleanups.get(sliceName);
  if (cleanup) {
    cleanup();
    effectCleanups.delete(sliceName);
  }
  delete dynamicReducers[sliceName];
  const allReducers = { ...staticReducers, ...dynamicReducers };
  const rootReducer = Object.keys(allReducers).length > 0 ? combineReducers(allReducers) : (state) => state ?? {};
  storeInstance.replaceReducer(rootReducer);
}
function hasSlice(sliceName) {
  return sliceName in dynamicReducers || sliceName in staticReducers;
}
function getRegisteredSlices() {
  return [
    ...Object.keys(staticReducers),
    ...Object.keys(dynamicReducers)
  ];
}
function resetStore() {
  effectCleanups.forEach((cleanup) => cleanup());
  effectCleanups.clear();
  Object.keys(dynamicReducers).forEach((key) => delete dynamicReducers[key]);
  staticReducers = {};
  storeInstance = null;
}
function createSlice(options) {
  const rtkSlice = rtkCreateSlice(options);
  const result = {
    slice: {
      name: rtkSlice.name,
      reducer: rtkSlice.reducer
    }
  };
  const reducerFns = rtkSlice.actions;
  for (const key of Object.keys(reducerFns)) {
    result[key] = reducerFns[key];
  }
  return result;
}
var eventBus2 = eventBus;
export {
  createSlice,
  createStore,
  eventBus2 as eventBus,
  getRegisteredSlices,
  getStore,
  hasSlice,
  registerSlice,
  resetStore,
  unregisterSlice
};
