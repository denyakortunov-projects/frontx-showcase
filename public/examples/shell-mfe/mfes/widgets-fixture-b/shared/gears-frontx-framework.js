var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "node_modules/react/cjs/react.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop2() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop2, noop2) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop2, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState9, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState9, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState9) {
      return ReactSharedInternals.H.useState(initialState9);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.2.4";
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_production();
    } else {
      module.exports = null;
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config.key && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      };
    }
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = jsxProd;
    exports.jsxs = jsxProd;
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_jsx_runtime_production();
    } else {
      module.exports = null;
    }
  }
});

// ../../../packages/framework/dist/chunk-D3LRZABL.js
import { createSlice } from "@gears-frontx/state";
import { eventBus, getStore } from "@gears-frontx/state";
import { apiRegistry, isMockPlugin } from "@gears-frontx/api";
import {
  peekSharedFetchCache,
  releaseSharedFetchCache,
  retainSharedFetchCache
} from "@gears-frontx/api";

// node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager = class extends Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();

// node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (callback, delay) => setTimeout(callback, delay),
  clearTimeout: (timeoutId) => clearTimeout(timeoutId),
  setInterval: (callback, delay) => setInterval(callback, delay),
  clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
  // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
  // type at app boot; and if we leave that type, then any new timer provider
  // would need to support the default provider's concrete timer ID, which is
  // infeasible across environments.
  //
  // We settle for type safety for the TimeoutProvider type, and accept that
  // this class is unsafe internally to allow for extension.
  #provider = defaultTimeoutProvider;
  #providerCalled = false;
  setTimeoutProvider(provider) {
    if (false) {
      if (this.#providerCalled && provider !== this.#provider) {
        console.error(
          `[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.`,
          { previous: this.#provider, provider }
        );
      }
    }
    this.#provider = provider;
    if (false) {
      this.#providerCalled = false;
    }
  }
  setTimeout(callback, delay) {
    if (false) {
      this.#providerCalled = true;
    }
    return this.#provider.setTimeout(callback, delay);
  }
  clearTimeout(timeoutId) {
    this.#provider.clearTimeout(timeoutId);
  }
  setInterval(callback, delay) {
    if (false) {
      this.#providerCalled = true;
    }
    return this.#provider.setInterval(callback, delay);
  }
  clearInterval(intervalId) {
    this.#provider.clearInterval(intervalId);
  }
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0);
}

// node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveQueryBoolean(option, query) {
  return typeof option === "function" ? option(query) : option;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) && Array.isArray(b)) {
      for (let i = 0; i < b.length; i++) {
        if (!partialMatchKey(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    const bKeys = Object.keys(b);
    for (const key of bKeys) {
      if (!partialMatchKey(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
  if (a === b) {
    return a;
  }
  if (depth > 500) return b;
  const array = isPlainArray(a) && isPlainArray(b);
  if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
  const aItems = array ? a : Object.keys(a);
  const aSize = aItems.length;
  const bItems = array ? b : Object.keys(b);
  const bSize = bItems.length;
  const copy = array ? new Array(bSize) : {};
  let equalItems = 0;
  for (let i = 0; i < bSize; i++) {
    const key = array ? i : bItems[i];
    const aItem = a[key];
    const bItem = b[key];
    if (aItem === bItem) {
      copy[key] = aItem;
      if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
      continue;
    }
    if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
      copy[key] = bItem;
      continue;
    }
    const v = replaceEqualDeep(aItem, bItem, depth + 1);
    copy[key] = v;
    if (v === aItem) equalItems++;
  }
  return aSize === bSize && equalItems === aSize ? a : copy;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (false) {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
        throw error;
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (false) {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
  let consumed = false;
  let signal;
  Object.defineProperty(object, "signal", {
    enumerable: true,
    get: () => {
      signal ??= getSignal();
      if (consumed) {
        return signal;
      }
      consumed = true;
      if (signal.aborted) {
        onCancelled();
      } else {
        signal.addEventListener("abort", onCancelled, { once: true });
      }
      return signal;
    }
  });
  return object;
}

// node_modules/@tanstack/query-core/build/modern/environmentManager.js
var environmentManager = /* @__PURE__ */ (() => {
  let isServerFn = () => isServer;
  return {
    /**
     * Returns whether the current runtime should be treated as a server environment.
     */
    isServer() {
      return isServerFn();
    },
    /**
     * Overrides the server check globally.
     */
    setIsServer(isServerValue) {
      isServerFn = isServerValue;
    }
  };
})();

// node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}

// node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

// node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager = class extends Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();

// node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let continueFn;
  const thenable = pendingThenable();
  const isResolved = () => thenable.status !== "pending";
  const cancel = (cancelOptions) => {
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions);
      reject(error);
      config.onCancel?.(error);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved() || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved()) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved()) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved()) {
        return;
      }
      const retry = config.retry ?? (environmentManager.isServer() ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    status: () => thenable.status,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

// node_modules/@tanstack/query-core/build/modern/removable.js
var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      this.#gcTimeout = timeoutManager.setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (environmentManager.isServer() ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (this.#gcTimeout !== void 0) {
      timeoutManager.clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};

// node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          addConsumeAwareSignal(
            object,
            () => context.signal,
            () => cancelled = true
          );
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject(context.signal.reason);
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}

// node_modules/@tanstack/query-core/build/modern/query.js
var Query = class extends Removable {
  #queryType;
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return this.#queryType;
  }
  get promise() {
    return this.#retryer?.promise;
  }
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    if (options?._type) {
      this.#queryType = options._type;
    }
    this.updateGcTime(this.options.gcTime);
    if (this.state && this.state.data === void 0) {
      const defaultState = getDefaultState(this.options);
      if (defaultState.data !== void 0) {
        this.setState(
          successState(defaultState.data, defaultState.dataUpdatedAt)
        );
        this.#initialState = defaultState;
      }
    }
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state) {
    this.#dispatch({ type: "setState", state });
  }
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  get resetState() {
    return this.#initialState;
  }
  reset() {
    this.destroy();
    this.setState(this.resetState);
  }
  isActive() {
    return this.observers.some(
      (observer) => resolveQueryBoolean(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === skipToken || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
      );
    }
    return false;
  }
  isStale() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) {
      return true;
    }
    if (staleTime === "static") {
      return false;
    }
    if (this.state.isInvalidated) {
      return true;
    }
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed || this.#isInitialPausedFetch()) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  #isInitialPausedFetch() {
    return this.state.fetchStatus === "paused" && this.state.status === "pending";
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  async fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle" && // If the promise in the retryer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    this.#retryer?.status() !== "rejected") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (false) {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: this.#client,
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#client,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    const behavior = this.#queryType === "infinite" ? infiniteQueryBehavior(
      this.options.pages
    ) : this.options.behavior;
    behavior?.onFetch(context, this);
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    this.#retryer = createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      onCancel: (error) => {
        if (error instanceof CancelledError && error.revert) {
          this.setState({
            ...this.#revertState,
            fetchStatus: "idle"
          });
        }
        abortController.abort();
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    try {
      const data = await this.#retryer.start();
      if (data === void 0) {
        if (false) {
          console.error(
            `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
          );
        }
        throw new Error(`${this.queryHash} data is undefined`);
      }
      this.setData(data);
      this.#cache.config.onSuccess?.(data, this);
      this.#cache.config.onSettled?.(
        data,
        this.state.error,
        this
      );
      return data;
    } catch (error) {
      if (error instanceof CancelledError) {
        if (error.silent) {
          return this.#retryer.promise;
        } else if (error.revert) {
          if (this.state.data === void 0) {
            throw error;
          }
          return this.state.data;
        }
      }
      this.#dispatch({
        type: "error",
        error
      });
      this.#cache.config.onError?.(
        error,
        this
      );
      this.#cache.config.onSettled?.(
        this.state.data,
        error,
        this
      );
      throw error;
    } finally {
      this.scheduleGc();
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          const newState = {
            ...state,
            ...successState(action.data, action.dataUpdatedAt),
            dataUpdateCount: state.dataUpdateCount + 1,
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          this.#revertState = action.manual ? newState : void 0;
          return newState;
        case "error":
          const error = action.error;
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error",
            // flag existing data as invalidated if we get a background error
            // note that "no data" always means stale so we can set unconditionally here
            isInvalidated: true
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function successState(data, dataUpdatedAt) {
  return {
    data,
    dataUpdatedAt: dataUpdatedAt ?? Date.now(),
    error: null,
    isInvalidated: false,
    status: "success"
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

// node_modules/@tanstack/query-core/build/modern/mutation.js
var Mutation = class extends Removable {
  #client;
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.#client = config.client;
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    const onContinue = () => {
      this.#dispatch({ type: "continue" });
    };
    const mutationFnContext = {
      client: this.#client,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    this.#retryer = createRetryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables, mutationFnContext);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !this.#retryer.canStart();
    try {
      if (restored) {
        onContinue();
      } else {
        this.#dispatch({ type: "pending", variables, isPaused });
        if (this.#mutationCache.config.onMutate) {
          await this.#mutationCache.config.onMutate(
            variables,
            this,
            mutationFnContext
          );
        }
        const context = await this.options.onMutate?.(
          variables,
          mutationFnContext
        );
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await this.#retryer.start();
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this,
        mutationFnContext
      );
      await this.options.onSuccess?.(
        data,
        variables,
        this.state.context,
        mutationFnContext
      );
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this,
        mutationFnContext
      );
      await this.options.onSettled?.(
        data,
        null,
        variables,
        this.state.context,
        mutationFnContext
      );
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this,
          mutationFnContext
        );
      } catch (e) {
        void Promise.reject(e);
      }
      try {
        await this.options.onError?.(
          error,
          variables,
          this.state.context,
          mutationFnContext
        );
      } catch (e) {
        void Promise.reject(e);
      }
      try {
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this,
          mutationFnContext
        );
      } catch (e) {
        void Promise.reject(e);
      }
      try {
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context,
          mutationFnContext
        );
      } catch (e) {
        void Promise.reject(e);
      }
      this.#dispatch({ type: "error", error });
      throw error;
    } finally {
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

// node_modules/@tanstack/query-core/build/modern/mutationCache.js
var MutationCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set();
    this.#scopes = /* @__PURE__ */ new Map();
    this.#mutationId = 0;
  }
  #mutations;
  #scopes;
  #mutationId;
  build(client, options, state) {
    const mutation = new Mutation({
      client,
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        this.#scopes.set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            this.#scopes.delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = this.#scopes.get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find(
        (m) => m.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  getAll() {
    return Array.from(this.#mutations);
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(noop))
      )
    );
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}

// node_modules/@tanstack/query-core/build/modern/queryCache.js
var QueryCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => matchQuery(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

// node_modules/@tanstack/query-core/build/modern/queryClient.js
var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new QueryCache();
    this.#mutationCache = config.mutationCache || new MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1) return;
    this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0) return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = this.#queryCache.get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(
      () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(
      options.queryHash
    )?.state;
  }
  removeQueries(filters) {
    const queryCache2 = this.#queryCache;
    notifyManager.batch(() => {
      queryCache2.findAll(filters).forEach((query) => {
        queryCache2.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache2 = this.#queryCache;
    return notifyManager.batch(() => {
      queryCache2.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(
        {
          type: "active",
          ...filters
        },
        options
      );
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(
      () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      return this.refetchQueries(
        {
          ...filters,
          type: filters?.refetchType ?? filters?.type ?? "active"
        },
        options
      );
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(
      () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(
      resolveStaleTime(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  fetchInfiniteQuery(options) {
    options._type = "infinite";
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  ensureInfiniteQueryData(options) {
    options._type = "infinite";
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) {
      return this.#mutationCache.resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};

// ../../../packages/framework/dist/chunk-D3LRZABL.js
import { eventBus as eventBus2 } from "@gears-frontx/state";
import {
  ExtensionDomainImplementationFactory,
  ExtensionDomainImplementation,
  ConcurrentMountStrategy,
  ExclusiveMountStrategy,
  ActionHandler
} from "@gears-frontx/mfes";
var SLICE_KEY = "mock";
var initialState = {
  enabled: false
};
var { slice, setMockEnabled } = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setMockEnabled: (state, action) => {
      state.enabled = action.payload;
    }
  }
});
var mockSlice = slice;
var mockActions = { setMockEnabled };
var mockSlice_default = slice.reducer;
function hasPluginManagement(protocol) {
  return "plugins" in protocol && typeof protocol.plugins === "object";
}
var MockEvents = {
  Toggle: "mock/toggle"
};
function syncMockPlugins(enabled) {
  for (const service of apiRegistry.getAll()) {
    const registeredPlugins = service.getPlugins();
    for (const [protocol, plugins] of registeredPlugins) {
      if (!hasPluginManagement(protocol)) continue;
      for (const plugin of plugins) {
        if (isMockPlugin(plugin)) {
          if (enabled) {
            const existingPlugins = protocol.plugins.getAll();
            if (!existingPlugins.includes(plugin)) {
              protocol.plugins.add(plugin);
            }
          } else {
            protocol.plugins.remove(plugin);
          }
        }
      }
    }
  }
}
function initMockEffects() {
  const store = getStore();
  const unsubscribe = eventBus.on(MockEvents.Toggle, (payload) => {
    store.dispatch(setMockEnabled(payload.enabled));
    syncMockPlugins(payload.enabled);
  });
  const currentState = store.getState();
  if ("mock" in currentState && currentState.mock && typeof currentState.mock === "object" && "enabled" in currentState.mock) {
    syncMockPlugins(currentState.mock.enabled);
  }
  return () => {
    unsubscribe.unsubscribe();
  };
}
function toggleMockMode(enabled) {
  eventBus.emit(MockEvents.Toggle, { enabled });
}
var QUERY_CACHE_RUNTIME_CHANGED_EVENT = "cache/runtime/changed";
var SHARED_QUERY_CLIENT_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:shared-client");
var SHARED_QUERY_CLIENT_RETAINERS_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:shared-client-retainers");
var SHARED_QUERY_CLIENT_CONFIG_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:shared-client-config");
var SHARED_QUERY_CLIENT_TEARDOWN_TOKEN_SYMBOL = /* @__PURE__ */ Symbol.for(
  "frontx:query-cache:shared-client-teardown-token"
);
var QUERY_CLIENT_BROADCAST_TARGET_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:broadcast-target");
var QUERY_CLIENT_BROADCAST_COUNTER_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:broadcast-counter");
var APP_QUERY_CLIENT_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:app-client");
var APP_QUERY_CLIENT_RESOLVER_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:app-client-resolver");
var APP_QUERY_CLIENT_ACTIVATOR_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:query-cache:app-client-activator");
var DUPLICATE_PLUGIN_CLEANUP_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:plugin:duplicate-cleanup");
var cacheEffectsByClient = /* @__PURE__ */ new WeakMap();
function finalizeCacheEffectsEntry(queryClient, entry) {
  if (entry.disposed) {
    return;
  }
  entry.disposed = true;
  entry.cleanup();
  cacheEffectsByClient.delete(queryClient);
}
function emitSharedQueryClientRuntimeChanged(available) {
  eventBus2.emit(QUERY_CACHE_RUNTIME_CHANGED_EVENT, { available });
}
function subscribeQueryCacheRuntimeChanged(listener) {
  return eventBus2.on(QUERY_CACHE_RUNTIME_CHANGED_EVENT, () => {
    listener();
  });
}
function resolveQueryCacheConfig(config) {
  return {
    staleTime: config?.staleTime ?? 3e4,
    gcTime: config?.gcTime ?? 3e5,
    refetchOnWindowFocus: config?.refetchOnWindowFocus ?? true
  };
}
function isSameQueryCacheConfig(left, right) {
  return left.staleTime === right.staleTime && left.gcTime === right.gcTime && left.refetchOnWindowFocus === right.refetchOnWindowFocus;
}
function resolveSharedQueryClientRetainers(host) {
  const retainers = host[SHARED_QUERY_CLIENT_RETAINERS_SYMBOL];
  if (typeof retainers !== "number" || !Number.isFinite(retainers) || retainers < 0) {
    return 0;
  }
  return retainers;
}
function resolveSharedQueryClientTeardownToken(host) {
  const token = host[SHARED_QUERY_CLIENT_TEARDOWN_TOKEN_SYMBOL];
  if (typeof token !== "number" || !Number.isInteger(token) || token < 0) {
    return 0;
  }
  return token;
}
function ensureQueryClientBroadcastTarget(queryClient) {
  const clientWithMetadata = queryClient;
  const existingTarget = clientWithMetadata[QUERY_CLIENT_BROADCAST_TARGET_SYMBOL];
  if (typeof existingTarget === "string" && existingTarget.length > 0) {
    return existingTarget;
  }
  const host = globalThis;
  const nextCounter = (host[QUERY_CLIENT_BROADCAST_COUNTER_SYMBOL] ?? 0) + 1;
  host[QUERY_CLIENT_BROADCAST_COUNTER_SYMBOL] = nextCounter;
  const broadcastTarget = `query-cache-${nextCounter}`;
  clientWithMetadata[QUERY_CLIENT_BROADCAST_TARGET_SYMBOL] = broadcastTarget;
  return broadcastTarget;
}
function attachQueryClientToApp(app, queryClient) {
  app[APP_QUERY_CLIENT_SYMBOL] = queryClient;
}
function detachQueryClientFromApp(app, queryClient) {
  const clientApp = app;
  if (clientApp[APP_QUERY_CLIENT_SYMBOL] === queryClient) {
    delete clientApp[APP_QUERY_CLIENT_SYMBOL];
  }
}
function attachQueryClientResolverToApp(app, resolver) {
  app[APP_QUERY_CLIENT_RESOLVER_SYMBOL] = resolver;
}
function detachQueryClientResolverFromApp(app) {
  delete app[APP_QUERY_CLIENT_RESOLVER_SYMBOL];
}
function attachQueryClientActivatorToApp(app, activator) {
  app[APP_QUERY_CLIENT_ACTIVATOR_SYMBOL] = activator;
}
function detachQueryClientActivatorFromApp(app) {
  delete app[APP_QUERY_CLIENT_ACTIVATOR_SYMBOL];
}
function createSharedQueryClient(config) {
  const resolvedConfig = resolveQueryCacheConfig(config);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: resolvedConfig.staleTime,
        gcTime: resolvedConfig.gcTime,
        retry: 0,
        refetchOnWindowFocus: resolvedConfig.refetchOnWindowFocus
      }
    }
  });
  ensureQueryClientBroadcastTarget(queryClient);
  const host = globalThis;
  host[SHARED_QUERY_CLIENT_CONFIG_SYMBOL] = resolvedConfig;
  return queryClient;
}
function getSharedQueryClient(config) {
  const host = globalThis;
  const existingClient = host[SHARED_QUERY_CLIENT_SYMBOL];
  const resolvedConfig = resolveQueryCacheConfig(config);
  if (!existingClient) {
    const createdClient = createSharedQueryClient(config);
    host[SHARED_QUERY_CLIENT_SYMBOL] = createdClient;
    return createdClient;
  }
  const existingConfig = host[SHARED_QUERY_CLIENT_CONFIG_SYMBOL];
  if (existingConfig && !isSameQueryCacheConfig(existingConfig, resolvedConfig)) {
    throw new Error(
      "[Gears FrontX] queryCache() received a config that conflicts with the existing shared QueryClient."
    );
  }
  ensureQueryClientBroadcastTarget(existingClient);
  return existingClient;
}
function peekSharedQueryClient() {
  return globalThis[SHARED_QUERY_CLIENT_SYMBOL];
}
function retainSharedQueryClient(config) {
  const host = globalThis;
  const queryClient = getSharedQueryClient(config);
  const retainers = resolveSharedQueryClientRetainers(host);
  host[SHARED_QUERY_CLIENT_RETAINERS_SYMBOL] = retainers + 1;
  if (retainers === 0) {
    host[SHARED_QUERY_CLIENT_TEARDOWN_TOKEN_SYMBOL] = resolveSharedQueryClientTeardownToken(host) + 1;
  }
  emitSharedQueryClientRuntimeChanged(true);
  return queryClient;
}
function retainExistingSharedQueryClient() {
  const host = globalThis;
  const queryClient = host[SHARED_QUERY_CLIENT_SYMBOL];
  if (!queryClient) {
    throw new Error(
      "[Gears FrontX] queryCacheShared() requires an existing host queryCache() runtime."
    );
  }
  ensureQueryClientBroadcastTarget(queryClient);
  const retainers = resolveSharedQueryClientRetainers(host);
  host[SHARED_QUERY_CLIENT_RETAINERS_SYMBOL] = retainers + 1;
  if (retainers === 0) {
    host[SHARED_QUERY_CLIENT_TEARDOWN_TOKEN_SYMBOL] = resolveSharedQueryClientTeardownToken(host) + 1;
  }
  return queryClient;
}
function releaseSharedQueryClient() {
  const host = globalThis;
  const retainers = resolveSharedQueryClientRetainers(host);
  if (retainers === 0) {
    return { released: false, isLastRetainer: false, teardownToken: 0 };
  }
  if (retainers === 1) {
    const teardownToken = resolveSharedQueryClientTeardownToken(host) + 1;
    host[SHARED_QUERY_CLIENT_RETAINERS_SYMBOL] = 0;
    host[SHARED_QUERY_CLIENT_TEARDOWN_TOKEN_SYMBOL] = teardownToken;
    return { released: true, isLastRetainer: true, teardownToken };
  }
  host[SHARED_QUERY_CLIENT_RETAINERS_SYMBOL] = retainers - 1;
  return { released: true, isLastRetainer: false, teardownToken: 0 };
}
function finalizeReleasedSharedQueryClient(queryClient, teardownToken) {
  const host = globalThis;
  if (host[SHARED_QUERY_CLIENT_SYMBOL] !== queryClient) {
    return false;
  }
  if (resolveSharedQueryClientRetainers(host) !== 0) {
    return false;
  }
  if (resolveSharedQueryClientTeardownToken(host) !== teardownToken) {
    return false;
  }
  queryClient.clear();
  delete host[SHARED_QUERY_CLIENT_SYMBOL];
  delete host[SHARED_QUERY_CLIENT_RETAINERS_SYMBOL];
  delete host[SHARED_QUERY_CLIENT_CONFIG_SYMBOL];
  delete host[SHARED_QUERY_CLIENT_TEARDOWN_TOKEN_SYMBOL];
  emitSharedQueryClientRuntimeChanged(false);
  return true;
}
function resetSharedQueryClient() {
  const host = globalThis;
  const client = host[SHARED_QUERY_CLIENT_SYMBOL];
  if (client) {
    const cacheEffects = cacheEffectsByClient.get(client);
    if (cacheEffects) {
      finalizeCacheEffectsEntry(client, cacheEffects);
    }
    client.clear();
  }
  delete host[SHARED_QUERY_CLIENT_SYMBOL];
  delete host[SHARED_QUERY_CLIENT_RETAINERS_SYMBOL];
  delete host[SHARED_QUERY_CLIENT_CONFIG_SYMBOL];
  delete host[SHARED_QUERY_CLIENT_TEARDOWN_TOKEN_SYMBOL];
  emitSharedQueryClientRuntimeChanged(false);
}
function isNonEmptyQueryCacheKey(queryKey) {
  return Array.isArray(queryKey) && queryKey.length > 0;
}
function isLocalBroadcast(queryClient, payload) {
  if (payload === null || typeof payload !== "object") {
    return false;
  }
  const candidate = payload;
  return candidate.source === ensureQueryClientBroadcastTarget(queryClient);
}
function invalidateSharedFetchCache(cache, filters) {
  if (!cache) {
    return;
  }
  if (filters.exact === false) {
    cache.invalidateMany?.({
      key: filters.queryKey,
      exact: false
    });
    if (!cache.invalidateMany) {
      cache.clear();
    }
    return;
  }
  cache.invalidate(filters.queryKey);
}
function toScopedInvalidateFilters(payload) {
  if (payload === null || typeof payload !== "object") {
    return null;
  }
  const candidate = payload;
  if (!isNonEmptyQueryCacheKey(candidate.queryKey)) {
    return null;
  }
  return {
    queryKey: candidate.queryKey,
    ...candidate.exact === void 0 ? {} : { exact: candidate.exact },
    ...candidate.refetchType === void 0 ? {} : { refetchType: candidate.refetchType }
  };
}
function toScopedCacheSetPayload(payload) {
  if (payload === null || typeof payload !== "object") {
    return null;
  }
  const candidate = payload;
  if (!isNonEmptyQueryCacheKey(candidate.queryKey)) {
    return null;
  }
  if (!Object.prototype.hasOwnProperty.call(candidate, "dataOrUpdater")) {
    return null;
  }
  return {
    queryKey: candidate.queryKey,
    dataOrUpdater: candidate.dataOrUpdater,
    ...typeof candidate.source === "string" ? { source: candidate.source } : {}
  };
}
function toScopedCacheRemovePayload(payload) {
  if (payload === null || typeof payload !== "object") {
    return null;
  }
  const candidate = payload;
  if (!isNonEmptyQueryCacheKey(candidate.queryKey)) {
    return null;
  }
  return {
    queryKey: candidate.queryKey,
    ...typeof candidate.source === "string" ? { source: candidate.source } : {}
  };
}
async function cancelQueriesForTeardown(queryClient) {
  let cancelError;
  try {
    await queryClient.cancelQueries();
  } catch (error) {
    cancelError = error;
  }
  if (cancelError) {
    throw cancelError;
  }
}
function runQueryTeardown(queryClient, callbacks, failureMessage) {
  void cancelQueriesForTeardown(queryClient).then(() => {
    callbacks.onSuccess?.();
  }).catch((error) => {
    callbacks.onFailure?.();
    console.error(failureMessage, error);
  }).finally(() => {
    callbacks.onSettled?.();
  });
}
function createCacheEffects(queryClient) {
  const mockToggleSub = eventBus2.on(MockEvents.Toggle, () => {
    runQueryTeardown(
      queryClient,
      {
        onSettled: () => {
          queryClient.clear();
          peekSharedFetchCache()?.clear();
        }
      },
      "[Gears FrontX] Failed to clear query cache after mock toggle"
    );
  });
  const invalidateSub = eventBus2.on("cache/invalidate", (payload) => {
    const filters = toScopedInvalidateFilters(payload);
    if (!filters) {
      return;
    }
    if (!isLocalBroadcast(queryClient, payload)) {
      void queryClient.invalidateQueries(filters);
    }
    invalidateSharedFetchCache(peekSharedFetchCache(), filters);
  });
  const setSub = eventBus2.on("cache/set", (payload) => {
    const cacheSetPayload = toScopedCacheSetPayload(payload);
    if (!cacheSetPayload) {
      return;
    }
    if (!isLocalBroadcast(queryClient, cacheSetPayload)) {
      queryClient.setQueryData(cacheSetPayload.queryKey, cacheSetPayload.dataOrUpdater);
    }
    peekSharedFetchCache()?.invalidate(cacheSetPayload.queryKey);
  });
  const removeSub = eventBus2.on("cache/remove", (payload) => {
    const cacheRemovePayload = toScopedCacheRemovePayload(payload);
    if (!cacheRemovePayload) {
      return;
    }
    if (!isLocalBroadcast(queryClient, cacheRemovePayload)) {
      queryClient.removeQueries({ queryKey: cacheRemovePayload.queryKey });
    }
    peekSharedFetchCache()?.invalidate(cacheRemovePayload.queryKey);
  });
  return () => {
    mockToggleSub.unsubscribe();
    invalidateSub.unsubscribe();
    setSub.unsubscribe();
    removeSub.unsubscribe();
  };
}
function retainCacheEffects(queryClient) {
  const existingEntry = cacheEffectsByClient.get(queryClient);
  if (existingEntry) {
    existingEntry.retainers += 1;
    return () => {
      if (existingEntry.disposed) {
        return;
      }
      existingEntry.retainers -= 1;
      if (existingEntry.retainers === 0) {
        finalizeCacheEffectsEntry(queryClient, existingEntry);
      }
    };
  }
  const entry = {
    retainers: 1,
    cleanup: createCacheEffects(queryClient),
    disposed: false
  };
  cacheEffectsByClient.set(queryClient, entry);
  return () => {
    if (entry.disposed) {
      return;
    }
    entry.retainers -= 1;
    if (entry.retainers === 0) {
      finalizeCacheEffectsEntry(queryClient, entry);
    }
  };
}
function queryCache(config) {
  let queryClient;
  let cleanup = null;
  let sharedFetchCacheRetained = false;
  let sharedRetainerReleased = false;
  function releasePluginRetainer() {
    if (!queryClient || sharedRetainerReleased) {
      return { released: false, isLastRetainer: false, teardownToken: 0 };
    }
    sharedRetainerReleased = true;
    const release = releaseSharedQueryClient();
    return {
      released: release.released,
      isLastRetainer: release.isLastRetainer,
      teardownToken: release.teardownToken
    };
  }
  function releasePluginSharedFetchCacheRetainer() {
    if (!sharedFetchCacheRetained) {
      return;
    }
    sharedFetchCacheRetained = false;
    releaseSharedFetchCache();
  }
  const plugin = {
    name: "queryCache",
    [DUPLICATE_PLUGIN_CLEANUP_SYMBOL]() {
      const { released } = releasePluginRetainer();
      if (!released) {
        return;
      }
      releasePluginSharedFetchCacheRetainer();
    },
    onInit(app) {
      if (!queryClient) {
        queryClient = retainSharedQueryClient(config);
        retainSharedFetchCache();
        sharedFetchCacheRetained = true;
        cleanup = retainCacheEffects(queryClient);
      }
      attachQueryClientToApp(app, queryClient);
    },
    onDestroy(app) {
      if (queryClient) {
        detachQueryClientFromApp(app, queryClient);
      }
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
      const { released, isLastRetainer, teardownToken } = releasePluginRetainer();
      if (!released) {
        return;
      }
      const sharedQueryClient = queryClient;
      if (!sharedQueryClient) {
        return;
      }
      const isLastSharedRetainer = isLastRetainer;
      if (isLastSharedRetainer) {
        runQueryTeardown(
          sharedQueryClient,
          {
            onSettled: () => {
              finalizeReleasedSharedQueryClient(sharedQueryClient, teardownToken);
              releasePluginSharedFetchCacheRetainer();
            }
          },
          "[Gears FrontX] Failed to destroy query cache runtime"
        );
        return;
      }
      releasePluginSharedFetchCacheRetainer();
    }
  };
  return plugin;
}
function queryCacheShared() {
  let queryClient;
  let cleanup = null;
  let sharedFetchCacheRetained = false;
  let sharedRetainerReleased = false;
  function ensureSharedQueryClient(app) {
    if (queryClient) {
      attachQueryClientToApp(app, queryClient);
      return queryClient;
    }
    if (!peekSharedQueryClient()) {
      return void 0;
    }
    queryClient = retainExistingSharedQueryClient();
    attachQueryClientToApp(app, queryClient);
    if (!sharedFetchCacheRetained) {
      retainSharedFetchCache();
      sharedFetchCacheRetained = true;
    }
    cleanup = retainCacheEffects(queryClient);
    return queryClient;
  }
  function releasePluginRetainer() {
    if (!queryClient || sharedRetainerReleased) {
      return { released: false, isLastRetainer: false, teardownToken: 0 };
    }
    sharedRetainerReleased = true;
    const release = releaseSharedQueryClient();
    return {
      released: release.released,
      isLastRetainer: release.isLastRetainer,
      teardownToken: release.teardownToken
    };
  }
  function releasePluginSharedFetchCacheRetainer() {
    if (!sharedFetchCacheRetained) {
      return;
    }
    sharedFetchCacheRetained = false;
    releaseSharedFetchCache();
  }
  const plugin = {
    name: "queryCacheShared",
    [DUPLICATE_PLUGIN_CLEANUP_SYMBOL]() {
      const { released } = releasePluginRetainer();
      if (!released) {
        return;
      }
      releasePluginSharedFetchCacheRetainer();
    },
    onInit(app) {
      attachQueryClientResolverToApp(app, () => app[APP_QUERY_CLIENT_SYMBOL]);
      attachQueryClientActivatorToApp(app, () => ensureSharedQueryClient(app));
      ensureSharedQueryClient(app);
    },
    onDestroy(app) {
      detachQueryClientResolverFromApp(app);
      detachQueryClientActivatorFromApp(app);
      if (queryClient) {
        detachQueryClientFromApp(app, queryClient);
      }
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
      const { released, isLastRetainer, teardownToken } = releasePluginRetainer();
      if (!released) {
        return;
      }
      const isLastSharedRetainer = isLastRetainer;
      if (isLastSharedRetainer) {
        const sharedQueryClient = queryClient;
        if (!sharedQueryClient) {
          return;
        }
        runQueryTeardown(
          sharedQueryClient,
          {
            onSettled: () => {
              finalizeReleasedSharedQueryClient(sharedQueryClient, teardownToken);
              releasePluginSharedFetchCacheRetainer();
            }
          },
          "[Gears FrontX] Failed to destroy shared query cache runtime"
        );
        return;
      }
      releasePluginSharedFetchCacheRetainer();
    }
  };
  return plugin;
}
var TestDomainImpl = class extends ExtensionDomainImplementation {
  _strategies;
  constructor(strategies) {
    super();
    this._strategies = strategies;
  }
  getMountStrategies() {
    return this._strategies;
  }
};
var TestContainerProvider = class extends ExtensionDomainImplementationFactory {
  mockContainer = typeof document !== "undefined" ? document.createElement("div") : {};
  _pendingDeclaration = null;
  _registry = null;
  constructor(_container) {
    super();
    if (_container) this.mockContainer = _container;
  }
  setRegistry(registry) {
    this._registry = registry;
    return this;
  }
  prepareForDomain(declaration) {
    this._pendingDeclaration = declaration;
    return this;
  }
  build(ctx) {
    const declaration = this._pendingDeclaration;
    this._pendingDeclaration = null;
    if (!declaration) {
      throw new Error("TestContainerProvider.build called without prepareForDomain");
    }
    const actions2 = declaration.actions ?? [];
    const mountExtActionId = ctx.typeSystem.resolveMountExtActionId();
    const unmountExtActionId = ctx.typeSystem.resolveUnmountExtActionId();
    const declaredMountAction = actions2.includes(mountExtActionId) ? mountExtActionId : void 0;
    const declaredUnmountAction = actions2.includes(unmountExtActionId) ? unmountExtActionId : void 0;
    const container = this.mockContainer;
    const hooks = {
      create: () => container,
      destroy: () => void 0
    };
    const strategies = [];
    if (declaredMountAction && declaredUnmountAction) {
      const strategy = new ConcurrentMountStrategy(ctx.mounter, hooks);
      strategies.push(strategy);
      ctx.registerHandler(
        declaredMountAction,
        ActionHandler.fromFunction((_t, p) => strategy.mount(p))
      );
      ctx.registerHandler(
        declaredUnmountAction,
        ActionHandler.fromFunction((_t, p) => strategy.unmount(p))
      );
    } else if (declaredMountAction) {
      if (!this._registry) {
        throw new Error("TestContainerProvider: ExclusiveMountStrategy requires setRegistry(registry) before registering an exclusive domain");
      }
      const strategy = new ExclusiveMountStrategy(ctx.mounter, hooks, this._registry, declaration.id);
      strategies.push(strategy);
      ctx.registerHandler(
        declaredMountAction,
        ActionHandler.fromFunction((_t, p) => strategy.mount(p))
      );
    }
    return new TestDomainImpl(strategies);
  }
};

// node_modules/@gears-frontx/routing/dist/index.js
var RoutingError = class _RoutingError extends Error {
  code;
  /** Set only for `invalid-shell-subroute` / `invalid-foreign-segment` /
   * `invalid-domain-key` / `invalid-extension-token`, and
   * for `replaced-old-extension-absent`, where it is the old extension
   * token no entry under `domainKey` carries. */
  value;
  /** Set for `invalid-param-name` / `duplicate-param-name`, and for
   * `invalid-domain-key` / `invalid-extension-token` only when thrown by
   * grammar serialize (FEATURE §3, Grammar Serialize, step 2.1), naming the
   * offending entry. */
  entry;
  /** Set only for `duplicate-extension`. */
  entries;
  /** Set for `reordered-not-permutation` and
   * `replaced-old-extension-absent`. */
  domainKey;
  /** Set only for `reordered-not-permutation`. */
  reordered;
  /** Set only for `reentrant-round-limit-exceeded` — the bound that was
   * reached, so a consumer reading this error need not know the constant to
   * report it. */
  limit;
  constructor(code, message, extra) {
    super(message);
    this.name = "RoutingError";
    this.code = code;
    this.value = extra?.value;
    this.entry = extra?.entry;
    this.entries = extra?.entries;
    this.domainKey = extra?.domainKey;
    this.reordered = extra?.reordered;
    this.limit = extra?.limit;
  }
  /**
   * A `shellSubroute` argument given to grammar serialize contains `?`, `#`,
   * or `&` — a grammar delimiter that would otherwise reparse into a
   * different, corrupted structure the instant the written URL is read back
   * (FEATURE §3, Grammar Serialize, step 0).
   */
  static invalidShellSubroute(value) {
    return new _RoutingError(
      "invalid-shell-subroute",
      `Invalid shell subroute (contains "?", "#", or "&"): "${value}"`,
      { value }
    );
  }
  /**
   * A `foreignSegments` entry given to grammar serialize contains `&` or
   * `#` — the same reparse hazard `invalidShellSubroute` guards against, for
   * the other input a caller building a `SerializeInput` by hand controls
   * directly: an embedded `&` splits it into an entry-or-foreign-segment
   * position it never had, and an embedded `#` moves everything after it
   * out of the query string and into the fragment (FEATURE §3, Grammar
   * Serialize, step 1).
   */
  static invalidForeignSegment(value) {
    return new _RoutingError(
      "invalid-foreign-segment",
      `Invalid foreign segment (contains "&" or "#"): "${value}"`,
      { value }
    );
  }
  /**
   * A `domainKey` argument failed the `domain-key` production (ADR 0003,
   * "Tokens"). `entry` is set only when this is thrown by grammar serialize,
   * which names the offending entry, not merely its `domainKey` value
   * (FEATURE §3, Grammar Serialize, step 2.1).
   */
  static invalidDomainKey(value, entry) {
    return new _RoutingError("invalid-domain-key", `Invalid domain key: "${value}"`, {
      value,
      entry
    });
  }
  /**
   * An `extension` argument failed the `name` alphabet. `entry` is set only
   * when this is thrown by grammar serialize (FEATURE §3, Grammar
   * Serialize, step 2.1; see `invalidDomainKey`).
   */
  static invalidExtensionToken(value, entry) {
    return new _RoutingError(
      "invalid-extension-token",
      `Invalid extension token: "${value}"`,
      { value, entry }
    );
  }
  /**
   * A serialize-input entry carried a param whose own `name` is the empty
   * string. `param-name = 1*( pchar-safe | pct-encoded )` (ADR 0003,
   * "Tokens") requires at least one character — unlike `param-value`, which
   * the identical production allows empty — so this is not this package's
   * own added restriction, only the grammar's own rule enforced at write
   * time, the third case of the same reparse-hazard family
   * `invalidShellSubroute` and `invalidForeignSegment` guard against: an
   * unvalidated empty name would serialize to a bare `;=value` segment that
   * reparses as a malformed entry, dropped whole, the instant the written
   * URL is read back (FEATURE §3, Grammar Serialize, step 2.2).
   */
  static invalidParamName(entry) {
    return new _RoutingError(
      "invalid-param-name",
      `Entry "${entry.domainKey}=${entry.extension}" carries a param with an empty name`,
      { entry }
    );
  }
  /** A serialize-input entry carried two params of the identical `name`. */
  static duplicateParamName(entry) {
    return new _RoutingError(
      "duplicate-param-name",
      `Entry "${entry.domainKey}=${entry.extension}" carries a duplicate param name`,
      { entry }
    );
  }
  /**
   * A serialize-input list carried two entries sharing the identical
   * `domainKey` and `extension` — reached either by a caller building that
   * list directly, or by the URL back-projection helper, whose delta named
   * a token the current location already carries under that domain key.
   */
  static duplicateExtension(entries) {
    return new _RoutingError(
      "duplicate-extension",
      `Duplicate entry "${entries[0].domainKey}=${entries[0].extension}"`,
      { entries }
    );
  }
  /**
   * A back-projection call's own `reordered` list is not exactly a
   * permutation of `domainKey`'s own entries surviving the delta's other
   * operations — missing a survivor, naming an extra token, or naming one
   * twice.
   */
  static reorderedNotPermutation(domainKey, reordered) {
    return new _RoutingError(
      "reordered-not-permutation",
      `"${domainKey}" back-projection reordered list is not a permutation of its surviving entries: [${reordered.join(", ")}]`,
      { domainKey, reordered }
    );
  }
  /**
   * A back-projection call's own `replaced` pair named an `oldExtension`
   * that no entry under `domainKey` currently carries. `replaced` exists to
   * stand a new entry at an old entry's *own position*; with no such entry
   * there is no such position, so the operation the pair asks for cannot be
   * performed at all. Appending the new entry instead would silently turn
   * the pair into an `added` and put it at the end of the full list — the
   * entry order `replaced` was introduced to stop producing.
   *
   * `domainKey` and `value` together say exactly what is missing: there is
   * no entry `value` under `domainKey`. That is what a consumer acts on —
   * re-read the live entry list, recompute the delta against it, and call
   * again naming the operation that list actually admits (an `added` for a
   * position that does not yet exist).
   */
  static replacedOldExtensionAbsent(domainKey, oldExtension) {
    return new _RoutingError(
      "replaced-old-extension-absent",
      `"${domainKey}" back-projection replaced pair names old extension "${oldExtension}", which no entry under that domain key currently carries \u2014 there is no position to stand the new entry at`,
      { domainKey, value: oldExtension }
    );
  }
  /**
   * `resolveNavigationHistory` was called with no adapter override in a
   * realm carrying no `window` at all (an SSR render, most commonly) — the
   * default `HistoryAdapter` has no browser API to construct itself over.
   * Thrown instead of letting a raw `ReferenceError: window is not defined`
   * surface from deep inside that construction, so an SSR caller gets a
   * recognizable, `instanceof RoutingError` failure naming the actual cause
   * instead of an unrelated-looking crash.
   */
  static noNavigationHistoryInRealm() {
    return new _RoutingError(
      "no-navigation-history-in-realm",
      "resolveNavigationHistory() was called with no adapter override in a realm with no `window` \u2014 pass an explicit HistoryAdapter (an SSR-safe one, or a test double) instead of relying on the default browser adapter."
    );
  }
  /**
   * A re-entrancy drain ran `limit` consecutive rounds without the queue
   * ever emptying — a callback that navigates, or mutates a
   * registered-extensions source, every single time it is notified, feeding
   * the drain a fresh round for each one it completes.
   *
   * Thrown rather than reported and swallowed, because the alternative is
   * the behaviour this bound exists to end: the drain is a loop, not a
   * recursion, so an unbounded one produces no stack overflow and no error
   * of any kind — the realm simply stops making progress, indefinitely,
   * with nothing to see. `site` names which drain reached the bound so the
   * consumer knows which of its own callbacks to look at.
   */
  static reentrantRoundLimitExceeded(site, limit) {
    return new _RoutingError(
      "reentrant-round-limit-exceeded",
      `${site}: ${String(limit)} consecutive deferred rounds ran without the queue emptying \u2014 a callback is triggering a new round every time it is notified. The queue was abandoned to end the loop.`,
      { limit }
    );
  }
};
function readWindowLocation() {
  return {
    path: window.location.pathname,
    search: window.location.search.startsWith("?") ? window.location.search.slice(1) : window.location.search,
    hash: window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash
  };
}
function createWindowHistoryAdapter() {
  return {
    getLocation: readWindowLocation,
    pushState(path, state) {
      window.history.pushState(state, "", path);
    },
    replaceState(path, state) {
      window.history.replaceState(state, "", path);
    },
    getState() {
      return window.history.state;
    },
    go(delta) {
      window.history.go(delta);
    },
    onPop(listener) {
      window.addEventListener("popstate", listener);
      return () => {
        window.removeEventListener("popstate", listener);
      };
    }
  };
}
var REENTRANT_ROUND_LIMIT = 100;
function reportRoutingDefect(message, cause) {
  const prefixed = `[@gears-frontx/routing] ${message}`;
  if (cause === void 0) {
    console.error(prefixed);
  } else {
    console.error(prefixed, cause);
  }
}
var FanOutDispatcher = class {
  live = /* @__PURE__ */ new Set();
  dispatching = false;
  pending = [];
  // @cpt-begin:cpt-frontx-algo-routing-navigation-substrate-fanout-dispatch:p2:inst-add-subscriber
  subscribe(callback) {
    const token = { callback };
    this.live.add(token);
    return () => {
      this.live.delete(token);
    };
  }
  /**
   * Dispatches one round for `notification`. A round triggered while another
   * is already in progress — a subscriber that navigates from inside its own
   * callback — is deferred to run after the in-progress round finishes,
   * never folded into it (step 4.4, reentrant navigation). Deferral is
   * bounded: a subscriber that queues a fresh round from every round it
   * receives is a feedback loop, not a cascade, and the drain below stops
   * and throws rather than serving it forever (step 4.4.2).
   */
  dispatch(notification) {
    if (this.dispatching) {
      this.pending.push(notification);
      return;
    }
    this.dispatching = true;
    try {
      this.runRound(notification);
      let drained = 0;
      while (this.pending.length > 0) {
        if (drained >= REENTRANT_ROUND_LIMIT) {
          this.pending.length = 0;
          throw RoutingError.reentrantRoundLimitExceeded(
            "navigation fan-out dispatch",
            REENTRANT_ROUND_LIMIT
          );
        }
        drained += 1;
        const next = this.pending.shift();
        if (next !== void 0) {
          this.runRound(next);
        }
      }
    } finally {
      this.dispatching = false;
    }
  }
  // @cpt-begin:cpt-frontx-algo-routing-navigation-substrate-fanout-dispatch:p2:inst-dispatch-round
  runRound(notification) {
    const snapshot = Array.from(this.live);
    for (const token of snapshot) {
      if (!this.live.has(token)) {
        continue;
      }
      try {
        token.callback(notification);
      } catch (error) {
        reportRoutingDefect("a navigation subscriber threw during a fan-out round", error);
      }
    }
  }
  // @cpt-end:cpt-frontx-algo-routing-navigation-substrate-fanout-dispatch:p2:inst-dispatch-round
};
var POSITION_STATE_KEY = "@gears-frontx/routing";
function isPositionState(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { position } = value;
  return typeof position === "number" && Number.isSafeInteger(position) && position >= 0;
}
function readPosition(rawState) {
  if (typeof rawState !== "object" || rawState === null) {
    return void 0;
  }
  const namespaced = rawState[POSITION_STATE_KEY];
  return isPositionState(namespaced) ? namespaced.position : void 0;
}
function writePosition(rawState, position) {
  const base = typeof rawState === "object" && rawState !== null ? rawState : {};
  return { ...base, [POSITION_STATE_KEY]: { position } };
}
function readInitialPosition(adapter) {
  return readPosition(adapter.getState()) ?? 0;
}
function createNavigationHistory(adapter) {
  const dispatcher = new FanOutDispatcher();
  let position = readInitialPosition(adapter);
  function currentLocation() {
    return { ...adapter.getLocation(), position };
  }
  adapter.onPop(() => {
    position = readPosition(adapter.getState()) ?? 0;
    dispatcher.dispatch({ location: currentLocation(), kind: "history" });
  });
  return {
    // @cpt-begin:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-branch-immediate
    get location() {
      return currentLocation();
    },
    // @cpt-end:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-branch-immediate
    // @cpt-begin:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-branch-subscribe
    // @cpt-begin:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-subscribe
    subscribe(subscriber) {
      return dispatcher.subscribe(subscriber);
    },
    // @cpt-end:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-subscribe
    // @cpt-end:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-branch-subscribe
    // @cpt-begin:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-immediate-call
    // @cpt-begin:cpt-frontx-algo-routing-navigation-substrate-fanout-dispatch:p2:inst-when-own-navigation-call
    // @cpt-begin:cpt-frontx-algo-routing-navigation-substrate-position-tracking:p2:inst-on-own-write
    push(path) {
      const nextPosition = position + 1;
      adapter.pushState(path, writePosition(void 0, nextPosition));
      position = nextPosition;
      dispatcher.dispatch({ location: currentLocation(), kind: "push" });
    },
    replace(path) {
      adapter.replaceState(path, writePosition(adapter.getState(), position));
      dispatcher.dispatch({ location: currentLocation(), kind: "replace" });
    },
    // @cpt-end:cpt-frontx-algo-routing-navigation-substrate-position-tracking:p2:inst-on-own-write
    // @cpt-end:cpt-frontx-algo-routing-navigation-substrate-fanout-dispatch:p2:inst-when-own-navigation-call
    // `go` is deliberately not dispatched here — it is observed only through
    // the `onPop` registration above, asynchronously, once the adapter's own
    // move actually lands (§1.5, Contract commitment; §3, step 3 rationale).
    // Its own destination position is restored there too, from the
    // browser's own persisted per-entry state, not adjusted by `delta` here.
    go(delta) {
      adapter.go(delta);
    }
    // @cpt-end:cpt-frontx-flow-routing-navigation-substrate-imperative-navigation:p1:inst-immediate-call
  };
}
var NAVIGATION_HISTORY_KEY = /* @__PURE__ */ Symbol.for("@gears-frontx/routing/navigation-history/v1");
function resolveNavigationHistory(createAdapter = createWindowHistoryAdapter) {
  const realm = globalThis;
  const existing = realm[NAVIGATION_HISTORY_KEY];
  if (existing === void 0) {
    if (createAdapter === createWindowHistoryAdapter && typeof window === "undefined") {
      throw RoutingError.noNavigationHistoryInRealm();
    }
    const instance = createNavigationHistory(createAdapter());
    realm[NAVIGATION_HISTORY_KEY] = instance;
    return instance;
  }
  return existing;
}
var NAME_PATTERN = /^[a-z][a-z0-9-]*$/;
var validateName = (candidate) => NAME_PATTERN.test(candidate);
var deriveExtensionToken = (route) => {
  if (route === void 0) {
    return void 0;
  }
  const candidate = route.startsWith("/") ? route.slice(1) : route;
  if (validateName(candidate)) {
    return candidate;
  }
  return void 0;
};
var namesEqual = (a, b) => a === b;
var RAW_CHAR = /^[A-Za-z0-9\-_.~/:@,!'()*?]$/;
var ENCODE_SPECIAL = {
  ";": "%3B",
  "=": "%3D",
  "&": "%26",
  "#": "%23",
  "%": "%25",
  "+": "%2B",
  " ": "%20"
};
var HEX_PAIR = /^[0-9a-fA-F]{2}$/;
var UTF8_ENCODER = new TextEncoder();
var UTF8_DECODER = new TextDecoder("utf-8", { fatal: true });
function encodePercent(value) {
  let out = "";
  for (const char of value) {
    const special = ENCODE_SPECIAL[char];
    if (special !== void 0) {
      out += special;
      continue;
    }
    if (char.length === 1 && RAW_CHAR.test(char)) {
      out += char;
      continue;
    }
    for (const byte of UTF8_ENCODER.encode(char)) {
      out += "%" + byte.toString(16).toUpperCase().padStart(2, "0");
    }
  }
  return out;
}
function decodePercent(raw) {
  let out = "";
  let bytes = [];
  const flushBytes = () => {
    if (bytes.length === 0) {
      return true;
    }
    try {
      out += UTF8_DECODER.decode(Uint8Array.from(bytes));
      return true;
    } catch {
      return false;
    } finally {
      bytes = [];
    }
  };
  let i = 0;
  while (i < raw.length) {
    const char = raw[i];
    if (char === "%") {
      const hex = raw.slice(i + 1, i + 3);
      if (!HEX_PAIR.test(hex)) {
        return null;
      }
      bytes.push(parseInt(hex, 16));
      i += 3;
      continue;
    }
    if (!flushBytes()) {
      return null;
    }
    out += char;
    i += 1;
  }
  if (!flushBytes()) {
    return null;
  }
  return out;
}
var parseGrammar = (input) => {
  let shellSubroute;
  let search;
  let hash;
  if (typeof input === "string") {
    const hashIndex = input.indexOf("#");
    const beforeHash = hashIndex === -1 ? input : input.slice(0, hashIndex);
    hash = hashIndex === -1 ? void 0 : input.slice(hashIndex + 1);
    const queryIndex = beforeHash.indexOf("?");
    if (queryIndex === -1) {
      shellSubroute = beforeHash;
      search = "";
    } else {
      shellSubroute = beforeHash.slice(0, queryIndex);
      search = beforeHash.slice(queryIndex + 1);
    }
  } else {
    shellSubroute = input.shellSubroute;
    search = input.search;
    hash = input.hash;
    if (search.startsWith("?")) {
      reportRoutingDefect(
        'a query string was given to the grammar parser with its leading "?" still attached; a HistoryAdapter reports `search` without it (the shape `window.location.search` carries, minus the delimiter). Parsing continued on the stripped value.'
      );
      search = search.slice(1);
    }
    if (hash?.startsWith("#") === true) {
      reportRoutingDefect(
        'a fragment was given to the grammar parser with its leading "#" still attached; a HistoryAdapter reports `hash` without it. Parsing continued on the stripped value.'
      );
      hash = hash.slice(1);
    }
  }
  if (hash === "") {
    hash = void 0;
  }
  if (search === "") {
    return { shellSubroute, hash, entries: [], foreignSegments: [], warnings: [] };
  }
  const entries = [];
  const foreignSegments = [];
  const warnings = [];
  const rawEntries = search.split("&");
  for (const rawEntry of rawEntries) {
    if (rawEntry === "") {
      continue;
    }
    const [head, ...paramSegments] = rawEntry.split(";");
    const headEquals = head.indexOf("=");
    const candidateDomainKey = headEquals === -1 ? "" : head.slice(0, headEquals);
    const candidateExtension = headEquals === -1 ? "" : head.slice(headEquals + 1);
    if (headEquals === -1 || !validateName(candidateDomainKey)) {
      foreignSegments.push(rawEntry);
      continue;
    }
    if (!validateName(candidateExtension)) {
      const isEntryCandidate = paramSegments.length > 0;
      if (isEntryCandidate) {
        warnings.push({ code: "malformed-entry", rawEntry });
      }
      foreignSegments.push(rawEntry);
      continue;
    }
    const domainKey = candidateDomainKey;
    const extension = candidateExtension;
    if (entries.some((entry) => entry.domainKey === domainKey && entry.extension === extension)) {
      warnings.push({ code: "duplicate-extension", rawEntry });
      continue;
    }
    const params = [];
    let entryAbandoned = false;
    const warningsBeforeThisEntry = warnings.length;
    for (const segment of paramSegments) {
      const segmentEquals = segment.indexOf("=");
      const rawName = segmentEquals === -1 ? segment : segment.slice(0, segmentEquals);
      const rawValue = segmentEquals === -1 ? "" : segment.slice(segmentEquals + 1);
      const decodedName = decodePercent(rawName);
      const decodedValue = decodePercent(rawValue);
      const escapeBroken = decodedName === null || decodedValue === null;
      const nameEmpty = decodedName === "";
      if (escapeBroken || nameEmpty) {
        entryAbandoned = true;
        break;
      }
      const existingIndex = params.findIndex((param) => param.name === decodedName);
      if (existingIndex !== -1) {
        params[existingIndex] = { name: decodedName, value: decodedValue };
        warnings.push({ code: "duplicate-parameter", rawEntry });
      } else {
        params.push({ name: decodedName, value: decodedValue });
      }
    }
    if (entryAbandoned) {
      warnings.length = warningsBeforeThisEntry;
      warnings.push({ code: "malformed-entry", rawEntry });
      foreignSegments.push(rawEntry);
      continue;
    }
    entries.push({ domainKey, extension, params });
  }
  return { shellSubroute, hash, entries, foreignSegments, warnings };
};
var serializeGrammar = (input) => {
  const { shellSubroute, hash, entries } = input;
  const foreignSegments = input.foreignSegments ?? [];
  if (/[?#&]/.test(shellSubroute)) {
    throw RoutingError.invalidShellSubroute(shellSubroute);
  }
  for (const segment of foreignSegments) {
    if (/[&#]/.test(segment)) {
      throw RoutingError.invalidForeignSegment(segment);
    }
  }
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    if (!validateName(entry.domainKey)) {
      throw RoutingError.invalidDomainKey(entry.domainKey, entry);
    }
    if (!validateName(entry.extension)) {
      throw RoutingError.invalidExtensionToken(entry.extension, entry);
    }
    for (const param of entry.params) {
      if (param.name === "") {
        throw RoutingError.invalidParamName(entry);
      }
    }
    const seenParamNames = /* @__PURE__ */ new Set();
    for (const param of entry.params) {
      if (seenParamNames.has(param.name)) {
        throw RoutingError.duplicateParamName(entry);
      }
      seenParamNames.add(param.name);
    }
    for (let j = 0; j < i; j += 1) {
      const earlier = entries[j];
      if (earlier.domainKey === entry.domainKey && earlier.extension === entry.extension) {
        throw RoutingError.duplicateExtension([earlier, entry]);
      }
    }
  }
  const entryTexts = entries.map((entry) => {
    let text = `${entry.domainKey}=${entry.extension}`;
    for (const param of entry.params) {
      text += `;${encodePercent(param.name)}`;
      if (param.value !== "") {
        text += `=${encodePercent(param.value)}`;
      }
    }
    return text;
  });
  const joinedEntries = entryTexts.join("&");
  const joined = [joinedEntries, ...foreignSegments].filter((part) => part !== "").join("&");
  if (entries.length === 0 && foreignSegments.length === 0) {
    return hash !== void 0 && hash !== "" ? `${shellSubroute}#${hash}` : shellSubroute;
  }
  return hash !== void 0 && hash !== "" ? `${shellSubroute}?${joined}#${hash}` : `${shellSubroute}?${joined}`;
};
function validateBackProjectionInput(domainKey, delta) {
  if (!validateName(domainKey)) {
    throw RoutingError.invalidDomainKey(domainKey);
  }
  for (const clearedKey of delta.clearedDomainKeys ?? []) {
    if (!validateName(clearedKey)) {
      throw RoutingError.invalidDomainKey(clearedKey);
    }
  }
  for (const added of delta.added ?? []) {
    if (!validateName(added.extension)) {
      throw RoutingError.invalidExtensionToken(added.extension);
    }
  }
  for (const removed of delta.removed ?? []) {
    if (!validateName(removed)) {
      throw RoutingError.invalidExtensionToken(removed);
    }
  }
  for (const pair of delta.payloadChanged ?? []) {
    if (!validateName(pair.extension)) {
      throw RoutingError.invalidExtensionToken(pair.extension);
    }
  }
  for (const pair of delta.replaced ?? []) {
    if (!validateName(pair.oldExtension)) {
      throw RoutingError.invalidExtensionToken(pair.oldExtension);
    }
    if (!validateName(pair.entry.extension)) {
      throw RoutingError.invalidExtensionToken(pair.entry.extension);
    }
  }
  for (const token of delta.reordered ?? []) {
    if (!validateName(token)) {
      throw RoutingError.invalidExtensionToken(token);
    }
  }
}
function createBackProjectEntries(history) {
  return (domainKey, delta, verb, pageHash) => {
    validateBackProjectionInput(domainKey, delta);
    runBackProjection(history, domainKey, delta, verb, pageHash);
  };
}
function runBackProjection(history, domainKey, delta, verb, pageHash) {
  const location = history.location;
  const parsed = parseGrammar({
    shellSubroute: location.path,
    search: location.search,
    hash: location.hash
  });
  const removedTokens = new Set(delta.removed ?? []);
  const replacedByOldExtension = new Map(
    (delta.replaced ?? []).map((pair) => [pair.oldExtension, pair.entry])
  );
  const payloadByExtension = new Map(
    (delta.payloadChanged ?? []).map((pair) => [pair.extension, pair.params])
  );
  const ownIndices = [];
  parsed.entries.forEach((entry, index) => {
    if (entry.domainKey === domainKey) {
      ownIndices.push(index);
    }
  });
  const ownExtensions = new Set(ownIndices.map((index) => parsed.entries[index].extension));
  for (const oldExtension of replacedByOldExtension.keys()) {
    if (!ownExtensions.has(oldExtension)) {
      throw RoutingError.replacedOldExtensionAbsent(domainKey, oldExtension);
    }
  }
  const transformedByIndex = /* @__PURE__ */ new Map();
  for (const index of ownIndices) {
    const entry = parsed.entries[index];
    const extension = entry.extension;
    const replacement = replacedByOldExtension.get(extension);
    if (replacement !== void 0) {
      transformedByIndex.set(index, {
        domainKey,
        extension: replacement.extension,
        params: replacement.params
      });
      continue;
    }
    if (removedTokens.has(extension)) {
      transformedByIndex.set(index, null);
      continue;
    }
    const changedParams = payloadByExtension.get(extension);
    if (changedParams !== void 0) {
      transformedByIndex.set(index, { domainKey, extension, params: changedParams });
      continue;
    }
    transformedByIndex.set(index, entry);
  }
  if (delta.reordered !== void 0) {
    const survivingIndices = ownIndices.filter((index) => transformedByIndex.get(index) !== null);
    const survivorByCurrentExtension = /* @__PURE__ */ new Map();
    for (const index of survivingIndices) {
      const survivor = transformedByIndex.get(index);
      if (survivor !== void 0 && survivor !== null) {
        survivorByCurrentExtension.set(parsed.entries[index].extension, survivor);
      }
    }
    const reorderedTokenSet = new Set(delta.reordered);
    const isPermutation = delta.reordered.length === survivorByCurrentExtension.size && reorderedTokenSet.size === survivorByCurrentExtension.size && delta.reordered.every((token) => survivorByCurrentExtension.has(token));
    if (!isPermutation) {
      throw RoutingError.reorderedNotPermutation(domainKey, delta.reordered);
    }
    const newOrder = delta.reordered.map((token) => survivorByCurrentExtension.get(token));
    survivingIndices.forEach((index, position) => {
      transformedByIndex.set(index, newOrder[position]);
    });
  }
  const clearedDomainKeys = new Set((delta.clearedDomainKeys ?? []).filter((key) => key !== domainKey));
  const composed = [];
  parsed.entries.forEach((entry, index) => {
    if (transformedByIndex.has(index)) {
      const transformed = transformedByIndex.get(index);
      if (transformed !== null && transformed !== void 0) {
        composed.push(transformed);
      }
      return;
    }
    if (clearedDomainKeys.has(entry.domainKey)) {
      return;
    }
    composed.push(entry);
  });
  for (const added of delta.added ?? []) {
    composed.push({ domainKey, extension: added.extension, params: added.params });
  }
  const serialized = serializeGrammar({
    shellSubroute: parsed.shellSubroute,
    hash: pageHash !== void 0 ? pageHash : parsed.hash,
    entries: composed,
    // A foreign query segment — an OAuth `code`/`state`, an analytics
    // `utm_*` parameter — is never this helper's own business to touch; it
    // passes straight through, unchanged, from parse to this single write.
    foreignSegments: parsed.foreignSegments
  });
  history[verb](serialized);
  return;
}
var resolveEntries = (domainKey, entries, source) => {
  const filtered = entries.filter((entry) => entry.domainKey === domainKey);
  const registrations = source.getRegistrations();
  const resolved = filtered.map((entry) => {
    const registration = registrations.find(
      (candidate) => namesEqual(candidate.extension, entry.extension)
    );
    if (registration !== void 0) {
      return {
        extension: entry.extension,
        params: entry.params,
        resolution: { resolved: true, routeOwner: registration.routeOwner }
      };
    }
    return {
      extension: entry.extension,
      params: entry.params,
      resolution: { resolved: false }
    };
  });
  return resolved;
};
function validateRegistrations(source) {
  for (const registration of source.getRegistrations()) {
    if (!validateName(registration.extension)) {
      throw RoutingError.invalidExtensionToken(registration.extension);
    }
  }
}
function validateDomainKeyAndRegistrations(domainKey, source) {
  if (!validateName(domainKey)) {
    throw RoutingError.invalidDomainKey(domainKey);
  }
  validateRegistrations(source);
}
function resolveCurrentEntries(history, domainKey, source) {
  const location = history.location;
  const parsed = parseGrammar({
    shellSubroute: location.path,
    search: location.search,
    hash: location.hash
  });
  return resolveEntries(domainKey, parsed.entries, source);
}
function paramsEqual(a, b) {
  return a.length === b.length && a.every((p, i) => p.name === b[i].name && p.value === b[i].value);
}
function resolutionsEqual(a, b) {
  if (!a.resolved || !b.resolved) {
    return a.resolved === b.resolved;
  }
  return Object.is(a.routeOwner, b.routeOwner);
}
function computeDiff(previous, current) {
  const previousByExtension = new Map(previous.map((entry) => [entry.extension, entry]));
  const currentByExtension = new Map(current.map((entry) => [entry.extension, entry]));
  const added = [];
  const payloadChanged = [];
  const resolutionChanged = [];
  for (const entry of current) {
    const before = previousByExtension.get(entry.extension);
    if (before === void 0) {
      added.push(entry.extension);
      continue;
    }
    if (!paramsEqual(before.params, entry.params)) {
      payloadChanged.push(entry.extension);
    } else if (!resolutionsEqual(before.resolution, entry.resolution)) {
      resolutionChanged.push(entry.extension);
    }
  }
  const removed = [];
  for (const entry of previous) {
    if (!currentByExtension.has(entry.extension)) {
      removed.push(entry.extension);
    }
  }
  const previousCommonOrder = previous.filter((entry) => currentByExtension.has(entry.extension)).map((entry) => entry.extension);
  const currentCommonOrder = current.filter((entry) => previousByExtension.has(entry.extension)).map((entry) => entry.extension);
  const reordered = previousCommonOrder.length !== currentCommonOrder.length || previousCommonOrder.some((token, index) => token !== currentCommonOrder[index]);
  const unresolved = current.filter((entry) => !entry.resolution.resolved).map((entry) => entry.extension);
  return { added, removed, payloadChanged, reordered, resolutionChanged, unresolved };
}
function diffIsEmpty(diff) {
  return diff.added.length === 0 && diff.removed.length === 0 && diff.payloadChanged.length === 0 && !diff.reordered && diff.resolutionChanged.length === 0;
}
function createObserverBoundTo(history) {
  return (domainKey, source, onTransition) => {
    validateDomainKeyAndRegistrations(domainKey, source);
    let previous = resolveCurrentEntries(history, domainKey, source);
    let released = false;
    let reporting = false;
    let pendingRounds = 0;
    function reresolveAndReport() {
      if (released) {
        return;
      }
      if (reporting) {
        pendingRounds += 1;
        return;
      }
      reporting = true;
      let roundLimitBreached = false;
      try {
        reresolveAndReportRound();
      } finally {
        try {
          let drained = 0;
          while (pendingRounds > 0 && !released) {
            if (drained >= REENTRANT_ROUND_LIMIT) {
              pendingRounds = 0;
              roundLimitBreached = true;
              break;
            }
            drained += 1;
            pendingRounds -= 1;
            try {
              reresolveAndReportRound();
            } catch (error) {
              reportRoutingDefect("a transition callback threw during a deferred round", error);
            }
          }
        } finally {
          pendingRounds = 0;
          reporting = false;
        }
      }
      if (roundLimitBreached) {
        throw RoutingError.reentrantRoundLimitExceeded(
          "transition observer re-resolution",
          REENTRANT_ROUND_LIMIT
        );
      }
    }
    function reresolveAndReportRound() {
      const current = resolveCurrentEntries(history, domainKey, source);
      const diff = computeDiff(previous, current);
      if (diffIsEmpty(diff)) {
        previous = current;
      } else {
        onTransition({ domainKey, entries: current, diff });
        previous = current;
      }
    }
    const unsubscribeFanout = history.subscribe(() => {
      reresolveAndReport();
    });
    let unsubscribeSource;
    if (source.onChange !== void 0) {
      unsubscribeSource = source.onChange(() => {
        validateRegistrations(source);
        try {
          reresolveAndReport();
        } catch (error) {
          reportRoutingDefect(
            "a transition callback threw while the registered-extensions source was reporting a change",
            error
          );
        }
      });
    }
    try {
      onTransition({
        domainKey,
        entries: previous,
        diff: {
          added: previous.map((entry) => entry.extension),
          removed: [],
          payloadChanged: [],
          reordered: false,
          resolutionChanged: [],
          unresolved: previous.filter((entry) => !entry.resolution.resolved).map((entry) => entry.extension)
        }
      });
    } catch (error) {
      unsubscribeFanout();
      if (unsubscribeSource !== void 0) {
        unsubscribeSource();
      }
      throw error;
    }
    const release = () => {
      if (released) {
        return;
      }
      released = true;
      unsubscribeFanout();
      if (unsubscribeSource !== void 0) {
        unsubscribeSource();
      }
      return;
    };
    return release;
  };
}
function createRouteSignal(history) {
  return {
    backProjectEntries: createBackProjectEntries(history),
    createObserver: createObserverBoundTo(history)
  };
}

// node_modules/@gears-frontx/routing-tanstack/dist/index.js
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function decodeComponentOrRaw(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
function parseSearchString(search) {
  const trimmed = search.startsWith("?") ? search.slice(1) : search;
  if (trimmed === "") {
    return [];
  }
  return trimmed.split("&").map((pair) => {
    const eq = pair.indexOf("=");
    if (eq === -1) {
      return { name: decodeComponentOrRaw(pair), value: "" };
    }
    return { name: decodeComponentOrRaw(pair.slice(0, eq)), value: decodeComponentOrRaw(pair.slice(eq + 1)) };
  });
}
function buildSearchString(params) {
  if (params.length === 0) {
    return "";
  }
  return `?${params.map((param) => `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`).join("&")}`;
}
var ROUTE_PARAM_NAME = "route";
function projectParamsToVirtualLocation(params) {
  const routeParam = params.find((param) => param.name === ROUTE_PARAM_NAME);
  const pathname = `/${routeParam?.value ?? ""}`;
  const search = buildSearchString(params.filter((param) => param.name !== ROUTE_PARAM_NAME));
  return { pathname, search };
}
function projectVirtualLocationToParams(pathname, search) {
  const routeValue = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const routeParams = routeValue === "" ? [] : [{ name: ROUTE_PARAM_NAME, value: routeValue }];
  return [...routeParams, ...parseSearchString(search)];
}
function splitHref(path) {
  const hashIndex = path.indexOf("#");
  const withoutHash = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const hash = hashIndex === -1 ? void 0 : path.slice(hashIndex + 1);
  const searchIndex = withoutHash.indexOf("?");
  const pathname = searchIndex === -1 ? withoutHash : withoutHash.slice(0, searchIndex);
  const search = searchIndex === -1 ? "" : withoutHash.slice(searchIndex);
  return { pathname, search, hash };
}
var attachByHistory = /* @__PURE__ */ new WeakMap();
function defaultReportError(error) {
  console.error("[@gears-frontx/routing-tanstack] navigation blocker or subscriber failed:", error);
}
function dispatchToSubscribers(subscribers, args, reportError2) {
  for (const subscriber of Array.from(subscribers)) {
    if (!subscribers.has(subscriber)) {
      continue;
    }
    try {
      subscriber(args);
    } catch (error) {
      reportError2(error);
    }
  }
}
function buildHistoryLocation(parts, position) {
  const state = { __TSR_index: position };
  return {
    href: `${parts.pathname}${parts.search}`,
    pathname: parts.pathname,
    search: parts.search,
    // The virtual location carries no hash of its own (DESIGN §3.1); the
    // page's own hash is the location-preserving-helper's own concern.
    hash: "",
    state
  };
}
function toSubscriberAction(kind) {
  switch (kind) {
    case "push":
      return { type: "PUSH" };
    case "replace":
      return { type: "REPLACE" };
    case "history":
      return { type: "GO", index: 0 };
  }
}
function adaptVirtualLocationHistory(navigationHistory, source, options = {}) {
  const reportError2 = options.reportError ?? defaultReportError;
  let currentLocation = buildHistoryLocation(
    projectParamsToVirtualLocation(source.readParams() ?? []),
    navigationHistory.location.position
  );
  const subscribers = /* @__PURE__ */ new Set();
  let blockers = [];
  let unsubscribeFromNavigationHistory;
  function attachToNavigationHistory() {
    if (unsubscribeFromNavigationHistory !== void 0) {
      return;
    }
    const previousLocation = currentLocation;
    const params = source.readParams();
    if (params !== void 0) {
      currentLocation = buildHistoryLocation(projectParamsToVirtualLocation(params), navigationHistory.location.position);
    }
    if (currentLocation.href !== previousLocation.href) {
      const args = { location: currentLocation, action: toSubscriberAction("history") };
      dispatchToSubscribers(subscribers, args, reportError2);
    }
    unsubscribeFromNavigationHistory = navigationHistory.subscribe((notification) => {
      const params2 = source.readParams();
      if (params2 === void 0) {
        return;
      }
      currentLocation = buildHistoryLocation(projectParamsToVirtualLocation(params2), notification.location.position);
      const args = { location: currentLocation, action: toSubscriberAction(notification.kind) };
      dispatchToSubscribers(subscribers, args, reportError2);
    });
  }
  const write = (path, verb, hash) => {
    const { pathname, search } = splitHref(path);
    try {
      source.write(pathname, search, verb, hash);
    } catch (error) {
      reportError2(error);
      return;
    }
  };
  const tryNavigation = async (path, verb, navigateOpts) => {
    if (navigateOpts?.ignoreBlocker ?? false) {
      write(path, verb, splitHref(path).hash);
      return;
    }
    if (typeof document !== "undefined" && blockers.length > 0) {
      const { hash: hash2, ...pathnameAndSearch } = splitHref(path);
      const nextPosition = verb === "push" ? navigationHistory.location.position + 1 : navigationHistory.location.position;
      const nextLocation = buildHistoryLocation(pathnameAndSearch, nextPosition);
      const action = verb === "push" ? "PUSH" : "REPLACE";
      for (const blocker of blockers) {
        let shouldBlock;
        try {
          shouldBlock = await blocker.blockerFn({ currentLocation, nextLocation, action });
        } catch (error) {
          reportError2(error);
          return;
        }
        if (shouldBlock) {
          return;
        }
      }
      write(path, verb, hash2);
      return;
    }
    const { hash } = splitHref(path);
    write(path, verb, hash);
  };
  const history = {
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-expose-direct-members
    get location() {
      return currentLocation;
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-expose-direct-members
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-missing-members
    // Derived from the navigation substrate's
    // own `Location.position`
    // (`cpt-frontx-algo-routing-navigation-substrate-position-tracking`),
    // never a counter this adapter keeps of its own — the substrate is the
    // one party correct across every write *and* every externally observed
    // traversal (a real back/forward step, a third-party `go`, a second
    // router sharing the identical shared history), which a provider-local
    // counter could only ever approximate.
    get length() {
      return navigationHistory.location.position + 1;
    },
    subscribers,
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-missing-members
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-adapt-subscribe
    // The other half of step 7 — the internal registration against
    // `NavigationHistory` lives in `attachToNavigationHistory` above; this is
    // the public `RouterHistory#subscribe(cb)` member step 7 also names,
    // collecting `cb` into the same `subscribers` set that internal
    // registration's own callback fans out over.
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-adapt-subscribe
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-expose-direct-members
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-accept-discard-entry-state
    // `_state` is named with a leading underscore because it is accepted
    // and dropped, and that is a recognized, degraded adaptation rather than
    // an oversight (FEATURE §3, step 6). The navigation substrate excludes
    // caller-owned per-entry state from its contract outright — `push` and
    // `replace` take a path alone, its `Location` shape has no field for
    // one, and it owns the browser's own per-entry state exclusively under a
    // single key of its own, rewriting it on every write
    // (`cpt-frontx-feature-routing-navigation-substrate` §1.5,
    // "Entry-carried state — not part of this contract"). So there is
    // nowhere to put this value that survives what a consumer would expect
    // it to survive. A map held here in memory would read as a fix and
    // would be emptied by the first reload and bypassed by the first back
    // step, which is a worse outcome than not offering the member at all.
    //
    // Consumer-visible consequence: `useLocation().state` and
    // `navigate({ state })` never carry a consumer's own value, and route
    // masking, which the engine builds on that same per-entry state, does
    // not work. The `__TSR_index` this adapter does put in `location.state`
    // is the engine's own housekeeping, derived from the substrate's
    // `Location.position` (`buildHistoryLocation` above) and never from a
    // caller.
    push: (path, _state, navigateOpts) => {
      void tryNavigation(path, "push", navigateOpts);
    },
    replace: (path, _state, navigateOpts) => {
      void tryNavigation(path, "replace", navigateOpts);
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-accept-discard-entry-state
    // No optimistic local adjustment here —
    // `go`/`back`/`forward` simply delegate to the shared
    // history and let its own asynchronous `popstate` observation
    // (`cpt-frontx-algo-routing-navigation-substrate-position-tracking`,
    // step 3) restore `Location.position` from the browser's own
    // persisted per-entry state once the move actually lands. A stale
    // `length`/`canGoBack` read in between the call and that
    // confirmation is the same brief window `NavigationHistory#go` itself
    // already has (§1.5, "observed asynchronously... never dispatched
    // directly"), not a new one this adapter introduces.
    go: (delta) => {
      navigationHistory.go(delta);
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-expose-direct-members
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-missing-members
    back: () => {
      navigationHistory.go(-1);
    },
    forward: () => {
      navigationHistory.go(1);
    },
    // `> 0`, no `|| canGoBackFallback()` — a fallback that read
    // `window.history.length > 1` reported `true` in almost every real tab
    // regardless of this occupant's own stack;
    // `Location.position` is accurate from construction (cold mount reads
    // `0`, per the substrate's own Position Tracking), so no fallback is
    // needed at all.
    canGoBack: () => navigationHistory.location.position > 0,
    flush: () => {
    },
    // @cpt-algo:cpt-frontx-algo-routing-engine-provider-teardown:p2
    // @cpt-dod:cpt-frontx-dod-routing-engine-provider-teardown:p1
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-teardown:p2:inst-when-unmount
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-teardown:p2:inst-invoke-unsubscribe
    destroy: () => {
      unsubscribeFromNavigationHistory?.();
      unsubscribeFromNavigationHistory = void 0;
      return;
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-teardown:p2:inst-when-unmount
    notify: (action) => {
      const args = { location: currentLocation, action };
      dispatchToSubscribers(subscribers, args, reportError2);
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-missing-members
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-create-href
    createHref: (href) => {
      const { pathname, search, hash } = splitHref(href);
      return source.createHref(pathname, search, hash);
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-create-href
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-block-degraded
    block: (blocker) => {
      blockers = [...blockers, blocker];
      return () => {
        blockers = blockers.filter((registered) => registered !== blocker);
      };
    },
    _getBlockers: () => [...blockers]
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-block-degraded
  };
  attachByHistory.set(history, attachToNavigationHistory);
  return history;
}
function resolveOwnEntry(navigationHistory, entryAddress) {
  const { path, search, hash } = navigationHistory.location;
  const { entries } = parseGrammar({ shellSubroute: path, search, hash });
  return entries.find(
    (entry) => namesEqual(entry.domainKey, entryAddress.domainKey) && namesEqual(entry.extension, entryAddress.extension)
  );
}
function createComposedVirtualLocationSource(navigationHistory, entryAddress) {
  const { backProjectEntries } = createRouteSignal(navigationHistory);
  return {
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-expose-direct-members
    readParams: () => resolveOwnEntry(navigationHistory, entryAddress)?.params,
    // Because `payloadChanged` replaces an entry's entire parameter list
    // rather than merging into it, any parameter of this occupant's own
    // entry that is not `route` and not a member of TanStack's own current
    // search is dropped here for free — the new list is built purely from
    // the virtual location just navigated to (FEATURE §3, step 2).
    //
    // Once this occupant's own entry is no longer present in the URL
    // (step 8's own absent-entry case), there is nothing of its own left to
    // write to — issuing `backProjectEntries` anyway would still write
    // *something* (the unchanged URL, since there is no matching entry for
    // `payloadChanged` to touch), a spurious history entry and a spurious
    // fan-out round for every other subscriber over a navigation that
    // changes nothing (FEATURE §3, step 8.1: "no write-back runs, because
    // there is no longer an entry of this occupant's own to write to").
    //
    // A caller-supplied `hash` is applied to the
    // page's own hash, never to this entry. The core's own
    // `backProjectEntries` now takes an optional page-hash parameter for
    // exactly this — this call passes `hash` straight through instead of
    // running its own parse → serialize → push sequence, so the single
    // history write both operations need stays inside the helper's own
    // "never through a separate parse/serialize/push sequence of this
    // provider's own" guarantee (FEATURE (engine-provider) §3, step 2).
    // `hash === undefined` omits the parameter so the helper preserves
    // whatever hash is currently in the URL, matching this source's own
    // given-versus-absent convention.
    write: (pathname, search, verb, hash) => {
      if (resolveOwnEntry(navigationHistory, entryAddress) === void 0) {
        return;
      }
      const params = projectVirtualLocationToParams(pathname, search);
      backProjectEntries(
        entryAddress.domainKey,
        { payloadChanged: [{ extension: entryAddress.extension, params }] },
        verb,
        hash
      );
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-expose-direct-members
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-create-href
    // Composes the full composed-application URL by calling the navigation
    // substrate's own grammar serializer over the current entry list with
    // this occupant's own entry replaced by the one the target virtual
    // location projects back to — never by concatenating path fragments
    // (FEATURE §3, step 4). `hash` follows `write`'s own given-versus-absent
    // convention above.
    createHref: (pathname, search, hash) => {
      const newParams = projectVirtualLocationToParams(pathname, search);
      const { shellSubroute, hash: currentHash, entries, foreignSegments } = parseGrammar({
        shellSubroute: navigationHistory.location.path,
        search: navigationHistory.location.search,
        hash: navigationHistory.location.hash
      });
      const updatedEntries = entries.map(
        (entry) => namesEqual(entry.domainKey, entryAddress.domainKey) && namesEqual(entry.extension, entryAddress.extension) ? { domainKey: entry.domainKey, extension: entry.extension, params: newParams } : entry
      );
      return serializeGrammar({
        shellSubroute,
        hash: hash ?? currentHash,
        entries: updatedEntries,
        // A foreign query segment is never this derivation's own business —
        // carried through unchanged, exactly as the core's own
        // back-projection helper does for the real write this href previews.
        foreignSegments
      });
    }
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-history-adaptation:p2:inst-derive-create-href
  };
}
function adaptComposedHistory(navigationHistory, entryAddress, options) {
  return adaptVirtualLocationHistory(navigationHistory, createComposedVirtualLocationSource(navigationHistory, entryAddress), options);
}
function createStandaloneVirtualLocationSource(navigationHistory) {
  return {
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-standalone-deployment:p2:inst-project-standalone-location
    // The page's own pathname is this occupant's entire virtual pathname,
    // and the page's own search is its entire virtual search — no `route`
    // parameter to extract, because there is no enclosing entry (step
    // 1.1). Never `undefined`: unlike a composed occupant's own entry, the
    // page's own address is always present.
    readParams: () => projectVirtualLocationToParams(navigationHistory.location.path, navigationHistory.location.search),
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-standalone-deployment:p2:inst-project-standalone-location
    // @cpt-begin:cpt-frontx-algo-routing-engine-provider-standalone-deployment:p2:inst-standalone-write-back
    // `push`/`replace` call the page's own history directly with the page's
    // own pathname and search built from the virtual location — the same
    // `NavigationHistory` instance the composed source reads from, but
    // through its own `push`/`replace`, never `backProjectEntries` (step
    // 1.2). `NavigationHistory`'s own `push`/`replace` already are the
    // page's own `history.pushState`/`replaceState` at the adapter layer
    // (`cpt-frontx-algo-routing-navigation-substrate-singleton-resolution`);
    // no separate `window.history` call is made here.
    //
    // The hash written is `hash` when the caller gave one (a hash
    // passed to a navigation is applied to the page's own hash) — otherwise
    // the page's own current hash is carried forward verbatim (matches
    // the composed source, whose write-back re-serializes the current hash
    // it never touches) — a virtual location carries no hash of its own
    // (DESIGN §3.1), so leaving it off here on an unspecified-hash call
    // would silently clear the page's own fragment on every standalone
    // navigation, a parity break the AC (composed/standalone identical
    // result) forbids.
    write: (pathname, search, verb, hash) => {
      const effectiveHash = hash ?? navigationHistory.location.hash;
      const hashSuffix = effectiveHash === "" ? "" : `#${effectiveHash}`;
      navigationHistory[verb](`${pathname}${search}${hashSuffix}`);
    },
    // @cpt-end:cpt-frontx-algo-routing-engine-provider-standalone-deployment:p2:inst-standalone-write-back
    // Composes the page's own full address directly — no composed URL and
    // no grammar serializer exist to call in this mode. `hash` follows the
    // identical given-versus-absent convention `write` documents above.
    createHref: (pathname, search, hash) => {
      const effectiveHash = hash ?? navigationHistory.location.hash;
      const hashSuffix = effectiveHash === "" ? "" : `#${effectiveHash}`;
      return `${pathname}${search}${hashSuffix}`;
    }
  };
}
function adaptStandaloneHistory(navigationHistory, options) {
  return adaptVirtualLocationHistory(navigationHistory, createStandaloneVirtualLocationSource(navigationHistory), options);
}
function adaptProviderHistory(navigationHistory, entryAddress, options) {
  if (entryAddress === void 0) {
    return adaptStandaloneHistory(navigationHistory, options);
  }
  return adaptComposedHistory(navigationHistory, entryAddress, options);
}

// ../../../packages/framework/dist/chunk-AZ2BNYUN.js
var NO_DOMAIN_STATUS = { entries: 0, unresolved: 0 };
var ROUTED_ROUTES_SLOT = /* @__PURE__ */ Symbol.for("@gears-frontx/framework:routed-domain-routes:3");
function isRoutedRouteHolder(value) {
  return typeof value === "object" && value !== null && typeof value.domainId === "string" && typeof value.ownerId === "symbol";
}
function isRoutedRoutesEntry(value) {
  return typeof value === "object" && value !== null && value.v === 2 && value.routes instanceof Map;
}
function sharedRoutedRoutes() {
  const realm = globalThis;
  const existing = realm[ROUTED_ROUTES_SLOT];
  if (isRoutedRoutesEntry(existing)) return existing.routes;
  if (existing !== void 0) {
    console.error("[router] routed-domain-routes rendezvous slot is malformed; treating it as absent");
  }
  const routes = /* @__PURE__ */ new Map();
  realm[ROUTED_ROUTES_SLOT] = { v: 2, routes };
  return routes;
}
var NESTED_DOMAIN_KEYS_SLOT = /* @__PURE__ */ Symbol.for("@gears-frontx/framework:nested-domain-keys:1");
function isNestedDomainKeysEntry(value) {
  return typeof value === "object" && value !== null && value.v === 1 && value.byOwner instanceof Map;
}
function sharedNestedDomainKeys() {
  const realm = globalThis;
  const existing = realm[NESTED_DOMAIN_KEYS_SLOT];
  if (isNestedDomainKeysEntry(existing)) return existing.byOwner;
  if (existing !== void 0) {
    console.error("[router] nested-domain-keys rendezvous slot is malformed; treating it as absent");
  }
  const byOwner = /* @__PURE__ */ new Map();
  realm[NESTED_DOMAIN_KEYS_SLOT] = { v: 1, byOwner };
  return byOwner;
}
function ownerKey(address) {
  return `${address.domainKey}\0${address.extension}`;
}
function extensionRouteOf(extension) {
  return extension.route?.replace(/^\//, "");
}
function extensionTokenOf(extension) {
  const raw = extensionRouteOf(extension);
  return raw === void 0 ? void 0 : deriveExtensionToken(raw);
}
var FrameworkRouter = class {
  constructor(options) {
    this.options = options;
  }
  options;
  registry;
  // Resolved lazily, on first actual use (a domain's observer starting, or
  // an adapted history/navigation facade being built) rather than at
  // construction: `microfrontends()` constructs this router unconditionally
  // for every app, including one under test in a realm with no `window`,
  // where `resolveNavigationHistory()` throws by design absent an explicit
  // adapter. A build that never routes anything never needs a history at
  // all.
  cachedHistory;
  cachedSignal;
  domainsById = /* @__PURE__ */ new Map();
  extensionsById = /* @__PURE__ */ new Map();
  routedRoutes = sharedRoutedRoutes();
  nestedDomainKeys = sharedNestedDomainKeys();
  ownEntryAddressReader;
  navFacade;
  cachedHandle;
  settledListeners = /* @__PURE__ */ new Set();
  /** This instance's own identity in the realm-global routed-routes rendezvous (O1) — an opaque, unforgeable value compared only by reference, so ownership checks hold even across independently loaded copies of this class. */
  instanceId = /* @__PURE__ */ Symbol("frontx-router-instance");
  history() {
    if (!this.cachedHistory) this.cachedHistory = resolveNavigationHistory();
    return this.cachedHistory;
  }
  signal() {
    if (!this.cachedSignal) this.cachedSignal = createRouteSignal(this.history());
    return this.cachedSignal;
  }
  /**
   * Builds a fresh `RouterHistory` adapted over this copy's own occupant
   * value (or standalone, when this copy has none) — the input the
   * ecosystem's default engine-provider package's `createProviderRouter`/
   * `EngineProvider` consume to build and render this extension's own
   * router (ADR 0036, "An MFE ... supplies its route tree to its own
   * framework instance ... which builds and renders that extension's one
   * router"). Never exposes the occupant value itself — only the
   * already-scoped history object a conforming engine provider needs.
   */
  adaptHistory() {
    return adaptProviderHistory(this.history(), this.ownEntryAddress());
  }
  /**
   * The extension-local navigation facade (ADR 0036, "The navigation
   * facade"): confined to this occupant's own pathname and search
   * parameters, usable outside React and before any `EngineProvider`
   * rendered over `adaptHistory()` has attached — built against its own,
   * separate adapted-history instance so it works independently of
   * whichever render uses `adaptHistory()` for its own router. Exposes
   * neither the router, the occupant value, nor raw history.
   *
   * `location()` (D21 — each runtime reads AND writes only its own entry's
   * parameters) reads this occupant's own current `{pathname, search}` —
   * never a sibling occupant's or the composed page's own — so a caller
   * outside React (an `ActionHandler`, not a rendered route) can merge its
   * own existing params into a write instead of overwriting them. Rebuilds
   * a FRESH `adaptProviderHistory` on every call rather than reading off the
   * one cached below: an adapted history's own `.location` only tracks
   * live changes once something calls routing-tanstack's own
   * `attachAdaptedHistory` on it (`EngineProvider`'s own mount effect does
   * that for the RENDERED router) — this facade deliberately never attaches
   * its own instance, so it would otherwise read back whatever was current
   * at its first construction forever, including never seeing its own
   * earlier `navigate`/`replace` calls. Construction itself, though, always
   * projects from the live, current params for this occupant's own entry —
   * so a throwaway instance read immediately after building it is exactly
   * as current as the write path that already ran through the SAME
   * underlying `NavigationHistory`.
   *
   * With no occupant value (`ownEntryAddress()` undefined — a registry never
   * supplied one, which is true of every root/shell runtime and of an MFE
   * previewed on its own with nothing mounting it), this runtime owns no
   * private subroute of its own (D21) to read or write through this facade.
   * `navigate`/`replace` therefore refuse rather than falling back to
   * `adaptProviderHistory`'s own page-address mode, which would otherwise
   * hand host code (or, for the shell, application code) an unscoped writer
   * onto the composed page's raw URL — exactly the write D21 reserves for
   * occupancy changes made only as a byproduct of `mount_ext`/`unmount_ext`.
   * An MFE rendered standalone still navigates: its own rendered route tree
   * (`EngineProvider` over `adaptHistory()`/`buildExtensionHistory`) already
   * runs in this same page-address mode — a framework-owned path, not this
   * imperative facade.
   */
  navigation() {
    const ownAddress = this.ownEntryAddress();
    if (ownAddress === void 0) {
      return this.unscopedNavigationFacade();
    }
    if (!this.navFacade) {
      const history = adaptProviderHistory(this.history(), ownAddress);
      this.navFacade = {
        navigate: (path) => history.push(path),
        replace: (path) => history.replace(path),
        location: () => {
          const fresh = adaptProviderHistory(this.history(), this.ownEntryAddress());
          return { pathname: fresh.location.pathname, search: fresh.location.search };
        }
      };
    }
    return this.navFacade;
  }
  /**
   * The facade `navigation()` returns for a runtime with no occupant value
   * (no private subroute of its own, D21) — `location()` still reads the
   * composed page's current pathname/search (a read exposes nothing
   * `navigation()`'s own SEC guarantee does not already accept, same ground
   * as the realm rendezvous slot and the raw URL being readable by any
   * same-realm script), but `navigate`/`replace` refuse: this runtime has no
   * entry of its own to confine a write to, and the composed page's entries
   * change only as a byproduct of `mount_ext`/`unmount_ext` (D21), never by
   * a direct call through this facade. Built fresh on every `navigation()`
   * call (never cached) — whether an occupant value is present can change
   * once `supplyNavigation` runs, and a cached refusal must not survive that.
   */
  unscopedNavigationFacade() {
    const refuse = () => {
      throw new Error(
        "[router] navigation().navigate()/.replace() refused: this runtime has no occupant value of its own \u2014 a root/shell runtime, or an MFE previewed with nothing mounting it, owns no private subroute to write through this facade. A standalone MFE still navigates through its own rendered route tree (adaptHistory()/EngineProvider), never through app.mfeRouter.navigation()."
      );
    };
    return {
      navigate: refuse,
      replace: refuse,
      location: () => {
        const { path, search } = this.history().location;
        return { pathname: path, search };
      }
    };
  }
  /**
   * The narrow, app-facing handle `microfrontends()` publishes as
   * `app.mfeRouter` (ADR 0036) — a fresh plain object delegating to this
   * same instance, carrying none of `RouterPort`'s members or
   * `attachRegistry`, so this class itself is never reachable from an app
   * object. Memoized: every caller across one build receives referentially
   * the same handle.
   */
  asHandle() {
    if (!this.cachedHandle) {
      this.cachedHandle = {
        navigation: () => this.navigation()
      };
    }
    return this.cachedHandle;
  }
  /**
   * Template-only wiring call. The registry is this router's own consumer
   * (it is `MfeRegistryConfig.router`), so it cannot be supplied at
   * construction — call once, immediately after
   * `mfeRegistryFactory.build({ ..., router: this })` returns, before any
   * domain or extension registers.
   */
  attachRegistry(registry) {
    this.registry = registry;
    routersByRegistry.set(registry, this);
  }
  requireRegistry() {
    if (!this.registry) {
      throw new Error("[router] attachRegistry() must be called before any domain or extension registers");
    }
    return this.registry;
  }
  /** This router's own occupant's entry address — set once `supplyNavigation` runs; `undefined` for a root (shell) registry, a standalone mount, or a copy that backed away from the occupant-value rendezvous. */
  ownEntryAddress() {
    const value = this.ownEntryAddressReader?.();
    return isEntryAddress(value) ? value : void 0;
  }
  // ------------------------------------------------------------------
  // RouterPort
  // ------------------------------------------------------------------
  registerDomain(domain) {
    const route = domain.route;
    if (route === void 0) return;
    if (!validateName(route)) {
      throw new Error(`[router] domain "${domain.id}" declares an invalid route "${route}"`);
    }
    const currentHolder = this.routedRoutes.get(route);
    if (currentHolder !== void 0) {
      if (currentHolder.domainId !== domain.id) {
        throw new Error(`[router] domain route "${route}" is already used by another routed domain live in the page`);
      }
      if (currentHolder.ownerId !== this.instanceId) {
        throw new Error(
          `[router] domain route "${route}" is already registered for domain "${domain.id}" by a distinct router instance`
        );
      }
    }
    const typeSystem = this.options.typeSystem;
    const mountActionType = typeSystem.resolveMountExtActionId();
    const unmountExtActionId = typeSystem.resolveUnmountExtActionId();
    const unmountActionType = domain.actions.includes(unmountExtActionId) ? unmountExtActionId : void 0;
    this.routedRoutes.set(route, { domainId: domain.id, ownerId: this.instanceId });
    let existing = this.domainsById.get(domain.id);
    if (existing && existing.domainKey !== route) {
      this.releaseDomain(domain.id);
      existing = void 0;
    }
    if (existing) {
      existing.mountActionType = mountActionType;
      existing.unmountActionType = unmountActionType;
    } else {
      this.domainsById.set(domain.id, {
        domainId: domain.id,
        domainKey: route,
        mountActionType,
        unmountActionType,
        tokens: /* @__PURE__ */ new Set(),
        statusListeners: /* @__PURE__ */ new Set(),
        release: void 0,
        initialObserved: false,
        status: NO_DOMAIN_STATUS,
        pendingWrite: void 0,
        pendingVerb: void 0,
        pendingChanges: /* @__PURE__ */ new Map()
      });
    }
    const enclosing = this.ownEntryAddress();
    if (enclosing) {
      const key = ownerKey(enclosing);
      const set = this.nestedDomainKeys.get(key) ?? /* @__PURE__ */ new Set();
      set.add(route);
      this.nestedDomainKeys.set(key, set);
    }
  }
  releaseDomain(domainId) {
    const state = this.domainsById.get(domainId);
    if (!state) return;
    state.release?.();
    this.cancelPendingWrite(state);
    this.domainsById.delete(domainId);
    const holder = this.routedRoutes.get(state.domainKey);
    if (holder !== void 0 && isRoutedRouteHolder(holder) && holder.ownerId === this.instanceId) {
      this.routedRoutes.delete(state.domainKey);
    }
    const enclosing = this.ownEntryAddress();
    if (enclosing) {
      this.nestedDomainKeys.get(ownerKey(enclosing))?.delete(state.domainKey);
    }
  }
  registerExtension(extension) {
    const state = this.domainsById.get(extension.domain);
    const token = state ? extensionTokenOf(extension) : void 0;
    if (state && token !== void 0) {
      if (state.tokens.has(token)) {
        throw new Error(`[router] extension token "${token}" is already registered in domain "${extension.domain}"`);
      }
      state.tokens.add(token);
    }
    this.extensionsById.set(extension.id, { domainId: extension.domain, token });
  }
  releaseExtension(extensionId) {
    const bookkeeping = this.extensionsById.get(extensionId);
    if (!bookkeeping) return;
    this.extensionsById.delete(extensionId);
    if (bookkeeping.token === void 0) return;
    this.domainsById.get(bookkeeping.domainId)?.tokens.delete(bookkeeping.token);
  }
  assignOccupantValue(assignment) {
    const state = this.domainsById.get(assignment.domain.id);
    const token = extensionTokenOf(assignment.extension);
    if (!state || token === void 0) return void 0;
    const address = { domainKey: state.domainKey, extension: token };
    return address;
  }
  reportSettled(report) {
    try {
      this.reflectSettled(report);
    } finally {
      this.notifySettled();
    }
  }
  /**
   * Subscribes to every settled `mount_ext`/`unmount_ext` report this router
   * receives, in any domain, succeeded or not. The mounted set changes only as
   * the result of those actions, so this is the signal a mounted-set reader
   * re-reads on. Returns the release.
   */
  subscribeSettled(listener) {
    this.settledListeners.add(listener);
    return () => {
      this.settledListeners.delete(listener);
    };
  }
  notifySettled() {
    for (const listener of [...this.settledListeners]) {
      try {
        listener();
      } catch (error) {
        console.error("[router] a settled listener threw", error);
      }
    }
  }
  reflectSettled(report) {
    if (!report.succeeded) return;
    const history = report.payload.history ?? "push";
    if (history === "none") return;
    const state = this.domainsById.get(report.domainId);
    if (!state) return;
    const extension = this.requireRegistry().getExtension(report.payload.subject);
    const token = extension ? extensionTokenOf(extension) : void 0;
    if (token === void 0) return;
    const change = report.actionTypeId === state.unmountActionType ? "remove" : report.actionTypeId === state.mountActionType ? "add" : void 0;
    if (change === void 0) return;
    this.writeSettledEntry(state, token, change, history === "replace" ? "replace" : "push");
  }
  /** Called by `cpt-frontx-algo-mfe-host-communication-occupant-value-rendezvous`, `inst-ov-supply-navigation`, once this copy's registry adopts an inbound bridge. */
  supplyNavigation(readOccupantValue) {
    this.ownEntryAddressReader = readOccupantValue;
  }
  // ------------------------------------------------------------------
  // Template-only surface — not part of `RouterPort`.
  // ------------------------------------------------------------------
  /** Starts observing a routed domain's own URL entries. Call once that domain's own DOM slot has attached a root (D11 — dispatching before that would only fail). A second call while the domain is already observed reuses the running observer. */
  startDomain(domainId) {
    const state = this.domainsById.get(domainId);
    if (!state || state.release) return;
    state.release = this.signal().createObserver(
      state.domainKey,
      this.extensionsSource(domainId),
      (t) => this.onTransition(state, t)
    );
  }
  /** Releases a routed domain's own observer. Call from the same slot's detach. Calling it for a domain that is not observed does nothing. */
  stopDomain(domainId) {
    const state = this.domainsById.get(domainId);
    if (!state) return;
    state.release?.();
    state.release = void 0;
    state.initialObserved = false;
    this.cancelPendingWrite(state);
    state.status = NO_DOMAIN_STATUS;
    for (const listener of [...state.statusListeners]) {
      try {
        listener();
      } catch (error) {
        console.error(`[router] a status listener for ${domainId} threw`, error);
      }
    }
  }
  extensionsSource(domainId) {
    return {
      getRegistrations: () => this.requireRegistry().getExtensionsForDomain(domainId).flatMap((extension) => {
        const token = extensionTokenOf(extension);
        return token === void 0 ? [] : [{ extension: token, routeOwner: extension.id }];
      })
    };
  }
  /** O6: translate every difference the signal reports between the domain's URL entries and what is mounted into `mount_ext`/`unmount_ext` chains carrying history intent `none`. Never mounts or unmounts directly. */
  onTransition(state, transition) {
    const registry = this.requireRegistry();
    const mounted = new Set(registry.getMountedExtensions(state.domainId));
    for (const token of [...transition.diff.added, ...transition.diff.resolutionChanged]) {
      const entry = transition.entries.find((e) => e.extension === token);
      if (!entry || !entry.resolution.resolved) continue;
      const owner = entry.resolution.routeOwner;
      if (mounted.has(owner)) continue;
      this.dispatch(state.domainId, state.mountActionType, owner, "none");
    }
    for (const token of transition.diff.removed) {
      const owner = this.ownerOfToken(state, token);
      if (owner === void 0 || !mounted.has(owner)) continue;
      if (state.unmountActionType === void 0) continue;
      this.dispatch(state.domainId, state.unmountActionType, owner, "none");
    }
    state.status = {
      entries: transition.entries.length,
      unresolved: transition.entries.filter((e) => !e.resolution.resolved).length
    };
    for (const listener of [...state.statusListeners]) {
      try {
        listener();
      } catch (error) {
        console.error(`[router] a status listener for ${state.domainId} threw`, error);
      }
    }
    if (state.initialObserved) {
      const unresolved = [...transition.diff.added, ...transition.diff.resolutionChanged].filter(
        (token) => transition.entries.some((e) => e.extension === token && !e.resolution.resolved)
      );
      if (unresolved.length > 0) {
        console.error(
          `[router] domain "${state.domainId}" has no registered extension for ${unresolved.map((t) => `"${t}"`).join(", ")}`
        );
      }
    }
    state.initialObserved = true;
  }
  /** The routed domain's own current URL-entry status (entry count, unresolved count) — `{entries: 0, unresolved: 0}` for a domain this router does not know or has not started observing. */
  domainStatus(domainId) {
    return this.domainsById.get(domainId)?.status ?? NO_DOMAIN_STATUS;
  }
  /** Subscribes to changes in `domainStatus(domainId)`. Returns a no-op release for an unknown domain. */
  subscribeDomainStatus(domainId, listener) {
    const state = this.domainsById.get(domainId);
    if (!state) return () => {
    };
    state.statusListeners.add(listener);
    return () => state.statusListeners.delete(listener);
  }
  ownerOfToken(state, token) {
    return this.requireRegistry().getExtensionsForDomain(state.domainId).find((e) => extensionTokenOf(e) === token)?.id;
  }
  dispatch(domainId, actionType, subject, history) {
    this.requireRegistry().executeActionsChain({
      action: { type: actionType, target: domainId, payload: { subject, history } }
    });
  }
  /**
   * O5/O7: a settled `mount_ext` adds only its own subject's entry and a
   * settled `unmount_ext` removes only its own subject's entry, clearing in
   * the same write every nested domain key the departing token is known to
   * own. The domain's other entries — mounted, still mounting, or unresolved
   * — are never rewritten: a URL-initiated mount that is still in flight has
   * its entry in the URL already, and only its own settle may touch it.
   *
   * When this domain's own enclosing entry has not yet landed (D11 — e.g.
   * Widgets Host auto-mounts before its own screen entry lands), the write
   * is DEFERRED behind a single `history().subscribe()` armed once per
   * domain, not once per settle: several settles arriving before the
   * enclosing entry lands (e.g. three opening mounts, each its own
   * `reportSettled` call) accumulate their subjects in `pendingChanges` and
   * re-use the SAME pending subscription instead of stacking one listener
   * per settle. Whether each entry is actually missing or present is
   * decided against the LIVE `ownEntries(domainKey)` only once the write
   * runs (`writeNow`) — never from values captured when it was armed.
   *
   * Collapsed history intent: 'replace' wins over 'push'. The opening case
   * this collapses is auto-mount-on-attach, which always carries 'replace'
   * (amend the enclosing entry once it exists, not push a new history
   * entry per occupant) — a 'push' arriving while a 'replace' is already
   * pending must not downgrade the eventual write to 'push', so the merge
   * is a one-way ratchet toward 'replace'.
   */
  writeSettledEntry(state, token, change, verb) {
    const enclosing = this.ownEntryAddress();
    if (enclosing && !this.enclosingPresent(enclosing)) {
      state.pendingChanges.set(token, change);
      state.pendingVerb = state.pendingVerb === "replace" || verb === "replace" ? "replace" : "push";
      if (state.pendingWrite) return;
      const release = this.history().subscribe(() => {
        if (!this.enclosingPresent(enclosing)) return;
        state.pendingWrite = void 0;
        const finalVerb = state.pendingVerb ?? verb;
        const changes = new Map(state.pendingChanges);
        state.pendingVerb = void 0;
        state.pendingChanges.clear();
        release();
        this.writeNow(state, changes, finalVerb);
      });
      state.pendingWrite = release;
      return;
    }
    this.writeNow(state, /* @__PURE__ */ new Map([[token, change]]), verb);
  }
  /** Applies the given per-token changes against the LIVE `ownEntries(domainKey)` and performs the back-projection — the one place `writeSettledEntry` actually writes, whether called directly or from a collapsed deferred write. */
  writeNow(state, changes, verb) {
    const ownTokens = this.ownEntries(state.domainKey);
    const added = [...changes].filter(([t, c]) => c === "add" && !ownTokens.includes(t)).map(([t]) => t);
    const removedTokens = [...changes].filter(([t, c]) => c === "remove" && ownTokens.includes(t)).map(([t]) => t);
    if (state.unmountActionType === void 0 && added.length > 0) {
      removedTokens.push(...ownTokens.filter((t) => !added.includes(t) && !removedTokens.includes(t)));
    }
    if (added.length === 0 && removedTokens.length === 0) return;
    const departingOwnerKeys = removedTokens.map((token) => ownerKey({ domainKey: state.domainKey, extension: token }));
    const clearedDomainKeys = this.collectNestedDomainKeysRecursive(departingOwnerKeys);
    if (added.length === 1 && removedTokens.length === 1) {
      this.signal().backProjectEntries(
        state.domainKey,
        {
          replaced: [{ oldExtension: removedTokens[0], entry: { extension: added[0], params: [] } }],
          clearedDomainKeys: [...clearedDomainKeys]
        },
        verb
      );
    } else {
      this.signal().backProjectEntries(
        state.domainKey,
        {
          added: added.map((extension) => ({ extension, params: [] })),
          removed: removedTokens,
          clearedDomainKeys: [...clearedDomainKeys]
        },
        verb
      );
    }
  }
  /**
   * O7: collects every domain key nested transitively beneath the given
   * departing owners — the domains they registered directly, the domains
   * THOSE domains' own occupants registered, and so on to any depth — so a
   * departing host's structural reset clears the complete set in the same
   * write, not just its own direct children. `nestedDomainKeys` is keyed by
   * owner (`domainKey` + extension token), so descending one level from an
   * already-cleared domain key means finding every owner key recorded
   * UNDER that domain key, whichever extension token occupies it; `ownerKey`
   * encodes the domain key as a `\0`-terminated prefix, so a prefix scan
   * over the whole rendezvous map is what resolves that without knowing in
   * advance which token(s) occupy a nested domain.
   *
   * Cycle/duplicate-safe: a domain key already collected is never re-queued,
   * so a cycle in the nesting graph (unreachable in practice, but not
   * excluded by the data shape) terminates instead of looping.
   */
  collectNestedDomainKeysRecursive(departingOwnerKeys) {
    const collected = /* @__PURE__ */ new Set();
    const frontier = [];
    const enqueue = (domainKey) => {
      if (collected.has(domainKey)) return;
      collected.add(domainKey);
      frontier.push(domainKey);
    };
    for (const owner of departingOwnerKeys) {
      this.nestedDomainKeys.get(owner)?.forEach(enqueue);
    }
    while (frontier.length > 0) {
      const domainKey = frontier.pop();
      const prefix = `${domainKey}\0`;
      for (const [owner, nested] of this.nestedDomainKeys) {
        if (!owner.startsWith(prefix)) continue;
        nested.forEach(enqueue);
      }
    }
    return collected;
  }
  /** Drops a deferred write armed for this domain, if any — called from `stopDomain`/`releaseDomain` so a domain going away never fires a write later against a domain that is not observed. */
  cancelPendingWrite(state) {
    state.pendingWrite?.();
    state.pendingWrite = void 0;
    state.pendingVerb = void 0;
    state.pendingChanges.clear();
  }
  ownEntries(domainKey) {
    const { path, search, hash } = this.history().location;
    return parseEntries(path, search, hash).filter((e) => e.domainKey === domainKey).map((e) => e.extension);
  }
  enclosingPresent(enclosing) {
    const { path, search, hash } = this.history().location;
    return parseEntries(path, search, hash).some(
      (e) => e.domainKey === enclosing.domainKey && e.extension === enclosing.extension
    );
  }
};
function isEntryAddress(value) {
  return typeof value === "object" && value !== null && typeof value.domainKey === "string" && typeof value.extension === "string";
}
var ROUTERS_BY_REGISTRY_SLOT = /* @__PURE__ */ Symbol.for("@gears-frontx/framework:routers-by-registry:1");
function sharedRoutersByRegistry() {
  const realm = globalThis;
  const existing = realm[ROUTERS_BY_REGISTRY_SLOT];
  if (existing instanceof WeakMap) {
    return existing;
  }
  if (existing !== void 0) {
    console.error("[router] routers-by-registry rendezvous slot is malformed; treating it as absent");
  }
  const map = /* @__PURE__ */ new WeakMap();
  realm[ROUTERS_BY_REGISTRY_SLOT] = map;
  return map;
}
var routersByRegistry = sharedRoutersByRegistry();
function parseEntries(shellSubroute, search, hash) {
  return parseGrammar({ shellSubroute, search, hash }).entries;
}

// ../../../packages/framework/dist/index.js
import { getStore as getStore2, registerSlice } from "@gears-frontx/state";
import { apiRegistry as apiRegistry2 } from "@gears-frontx/api";
import { eventBus as eventBus3 } from "@gears-frontx/state";
import { eventBus as eventBus22 } from "@gears-frontx/state";
import { combineReducers } from "@reduxjs/toolkit";
import { createSlice as createSlice2 } from "@gears-frontx/state";
import { createSlice as createSlice22 } from "@gears-frontx/state";
import { createSlice as createSlice3 } from "@gears-frontx/state";
import { createSlice as createSlice4 } from "@gears-frontx/state";
import { createSlice as createSlice5 } from "@gears-frontx/state";
import { createSlice as createSlice6 } from "@gears-frontx/state";
import { createSlice as createSlice7 } from "@gears-frontx/state";
import { eventBus as eventBus32 } from "@gears-frontx/state";
import { i18nRegistry as singletonI18nRegistry, Language } from "@gears-frontx/i18n";
import {
  RestPlugin,
  RestProtocol
} from "@gears-frontx/api";
import { createMfeRegistryFactory } from "@gears-frontx/mfes";
import { eventBus as eventBus6 } from "@gears-frontx/state";
import { createSlice as createSlice8 } from "@gears-frontx/state";
import { eventBus as eventBus4, getStore as getStore22 } from "@gears-frontx/state";
import { eventBus as eventBus5 } from "@gears-frontx/state";
import {
  FRONTX_ACTION_LOAD_EXT,
  FRONTX_ACTION_MOUNT_EXT,
  FRONTX_ACTION_UNMOUNT_EXT
} from "@gears-frontx/gts-plugin";
import {
  FRONTX_ACTION_LOAD_EXT as FRONTX_ACTION_LOAD_EXT2,
  FRONTX_ACTION_MOUNT_EXT as FRONTX_ACTION_MOUNT_EXT2,
  FRONTX_ACTION_UNMOUNT_EXT as FRONTX_ACTION_UNMOUNT_EXT2
} from "@gears-frontx/gts-plugin";
import {
  FRONTX_ACTION_LOAD_EXT as FRONTX_ACTION_LOAD_EXT3,
  FRONTX_ACTION_MOUNT_EXT as FRONTX_ACTION_MOUNT_EXT3,
  FRONTX_ACTION_UNMOUNT_EXT as FRONTX_ACTION_UNMOUNT_EXT3
} from "@gears-frontx/gts-plugin";
import {
  ChildMfeBridge,
  ParentMfeBridge,
  MfeHandler,
  MfeBridgeFactory,
  ActionHandler as ActionHandler2,
  MfeRegistry,
  MfeRegistryFactory,
  ExtensionDomainImplementationFactory as ExtensionDomainImplementationFactory2,
  ExtensionDomainImplementation as ExtensionDomainImplementation2,
  ExtensionMounter,
  MountStrategy,
  ConcurrentMountStrategy as ConcurrentMountStrategy2,
  OptionalMountStrategy,
  ExclusiveMountStrategy as ExclusiveMountStrategy2
} from "@gears-frontx/mfes";
import { MfeHandlerMF } from "@gears-frontx/mfes";
import { gtsPlugin } from "@gears-frontx/gts-plugin";
import {
  createShadowRoot,
  injectCssVariables,
  extractGtsPackage
} from "@gears-frontx/mfes";
import { eventBus as eventBus9, createStore, getStore as getStore5, registerSlice as registerSlice2, hasSlice, createSlice as createSlice9 } from "@gears-frontx/state";
import { eventBus as eventBus7, getStore as getStore3 } from "@gears-frontx/state";
import { eventBus as eventBus8, getStore as getStore4 } from "@gears-frontx/state";
import {
  apiRegistry as apiRegistry22,
  BaseApiService,
  RestProtocol as RestProtocol2,
  RestEndpointProtocol,
  SseProtocol,
  SseStreamProtocol,
  ApiPluginBase,
  ApiPlugin,
  ApiProtocol,
  RestPlugin as RestPlugin2,
  RestPluginWithConfig,
  SsePlugin,
  SsePluginWithConfig,
  resetSharedFetchCache,
  isShortCircuit,
  isRestShortCircuit,
  isSseShortCircuit,
  MOCK_PLUGIN,
  isMockPlugin as isMockPlugin2
} from "@gears-frontx/api";
import { i18nRegistry, I18nRegistryImpl, createI18nRegistry, Language as Language2, SUPPORTED_LANGUAGES, getLanguageMetadata, TextDirection, LanguageDisplayMode } from "@gears-frontx/i18n";
import {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelative,
  formatNumber,
  formatPercent,
  formatCompact,
  formatCurrency,
  compareStrings,
  createCollator
} from "@gears-frontx/i18n";
import { I18nRegistryImpl as I18nRegistryImpl2 } from "@gears-frontx/i18n";
var DUPLICATE_PLUGIN_CLEANUP_SYMBOL2 = /* @__PURE__ */ Symbol.for(
  "frontx:plugin:duplicate-cleanup"
);
function isPluginFactory(value) {
  return typeof value === "function";
}
function resolvePlugin(plugin) {
  return isPluginFactory(plugin) ? plugin() : plugin;
}
function resolvePluginNameHint(plugin) {
  if (isPluginFactory(plugin)) {
    return plugin.name || void 0;
  }
  return plugin.name;
}
function cleanupSkippedDuplicatePlugin(plugin) {
  plugin[DUPLICATE_PLUGIN_CLEANUP_SYMBOL2]?.();
}
var buildState = "idle";
function assertBuildable() {
  if (buildState === "building") {
    throw new Error(
      "createFrontX().build() was called while another build is in progress. A runtime builds exactly one FrontX app."
    );
  }
  if (buildState === "built") {
    throw new Error(
      "A FrontX app has already been built in this runtime. A runtime builds exactly one app: create it once at module level and reuse it."
    );
  }
}
var FrontXAppBuilderImpl = class {
  plugins = [];
  config;
  constructor(config = {}) {
    this.config = {
      name: "Gears FrontX App",
      devMode: false,
      strictMode: false,
      ...config
    };
  }
  /**
   * Add a plugin to the application.
   * Also accepts an array of plugins (for preset support).
   */
  // @cpt-begin:cpt-frontx-flow-framework-composition-app-bootstrap:p1:inst-1
  // @cpt-begin:cpt-frontx-state-framework-composition-builder:p1:inst-1
  use(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach((p) => this.use(p));
      return this;
    }
    const pluginNameHint = resolvePluginNameHint(plugin);
    if (pluginNameHint && this.plugins.some((p) => p.name === pluginNameHint)) {
      if (!isPluginFactory(plugin)) {
        cleanupSkippedDuplicatePlugin(plugin);
      }
      if (this.config.devMode) {
        console.warn(
          `Plugin "${pluginNameHint}" is already registered. Skipping duplicate.`
        );
      }
      return this;
    }
    const resolved = resolvePlugin(plugin);
    if (this.plugins.some((p) => p.name === resolved.name)) {
      cleanupSkippedDuplicatePlugin(resolved);
      if (this.config.devMode) {
        console.warn(
          `Plugin "${resolved.name}" is already registered. Skipping duplicate.`
        );
      }
      return this;
    }
    this.plugins.push(resolved);
    return this;
  }
  // @cpt-end:cpt-frontx-flow-framework-composition-app-bootstrap:p1:inst-1
  // @cpt-end:cpt-frontx-state-framework-composition-builder:p1:inst-1
  /**
   * Add multiple plugins at once.
   */
  useAll(plugins) {
    plugins.forEach((plugin) => this.use(plugin));
    return this;
  }
  /**
   * Build the application.
   */
  // @cpt-begin:cpt-frontx-flow-framework-composition-app-bootstrap:p1:inst-2
  // @cpt-begin:cpt-frontx-state-framework-composition-builder:p1:inst-2
  build() {
    assertBuildable();
    buildState = "building";
    let created;
    try {
      created = this.createApp();
    } catch (error) {
      buildState = "idle";
      throw error;
    }
    buildState = "built";
    const { app, orderedPlugins } = created;
    orderedPlugins.forEach((plugin) => {
      if (plugin.onInit) {
        plugin.onInit(app);
      }
    });
    return app;
  }
  createApp() {
    const orderedPlugins = this.resolveDependencies();
    orderedPlugins.forEach((plugin) => {
      if (plugin.onRegister) {
        plugin.onRegister(this, plugin._configType);
      }
    });
    const aggregated = this.aggregateProvides(orderedPlugins);
    const store = this.createStoreWithSlices(aggregated.slices);
    aggregated.effects.forEach((initEffect) => {
      initEffect(store.dispatch);
    });
    const app = {
      config: this.config,
      store,
      themeRegistry: aggregated.registries.themeRegistry,
      apiRegistry: apiRegistry2,
      i18nRegistry: aggregated.registries.i18nRegistry,
      mfeRegistry: void 0,
      actions: aggregated.actions,
      destroy: () => this.destroyApp(orderedPlugins, app)
    };
    const mfeRegistryDescriptor = Object.getOwnPropertyDescriptor(
      aggregated.registries,
      "mfeRegistry"
    );
    if (mfeRegistryDescriptor) {
      Object.defineProperty(app, "mfeRegistry", mfeRegistryDescriptor);
    }
    for (const key of Object.keys(aggregated.app)) {
      if (key in app) {
        throw new Error(
          `Plugin app extension "${key}" conflicts with an existing app property.`
        );
      }
    }
    Object.assign(app, aggregated.app);
    return { app, orderedPlugins };
  }
  // @cpt-end:cpt-frontx-flow-framework-composition-app-bootstrap:p1:inst-2
  // @cpt-end:cpt-frontx-state-framework-composition-builder:p1:inst-2
  /**
   * Resolve plugin dependencies using topological sort.
   */
  // @cpt-begin:cpt-frontx-algo-framework-composition-dep-resolution:p1:inst-1
  // @cpt-begin:cpt-frontx-flow-framework-composition-plugin-dependency:p1:inst-2
  resolveDependencies() {
    const resolved = [];
    const visited = /* @__PURE__ */ new Set();
    const visiting = /* @__PURE__ */ new Set();
    const visit = (plugin) => {
      if (visited.has(plugin.name)) return;
      if (visiting.has(plugin.name)) {
        throw new Error(
          `Circular dependency detected: ${plugin.name} depends on itself or creates a cycle.`
        );
      }
      visiting.add(plugin.name);
      if (plugin.dependencies) {
        for (const depName of plugin.dependencies) {
          const dep = this.plugins.find((p) => p.name === depName);
          if (!dep) {
            if (this.config.strictMode) {
              throw new Error(
                `Plugin "${plugin.name}" requires "${depName}" but it is not registered.
Add the missing plugin: .use(${depName}())`
              );
            } else {
              console.warn(
                `Plugin "${plugin.name}" requires "${depName}" but it is not registered. Some features may not work correctly.`
              );
              continue;
            }
          }
          visit(dep);
        }
      }
      visiting.delete(plugin.name);
      visited.add(plugin.name);
      resolved.push(plugin);
    };
    this.plugins.forEach(visit);
    return resolved;
  }
  // @cpt-end:cpt-frontx-algo-framework-composition-dep-resolution:p1:inst-1
  // @cpt-end:cpt-frontx-flow-framework-composition-plugin-dependency:p1:inst-2
  /**
   * Aggregate all provides from plugins.
   */
  // @cpt-begin:cpt-frontx-algo-framework-composition-provides-aggregation:p1:inst-1
  aggregateProvides(plugins) {
    const registries = {};
    const app = {};
    const slices = [];
    const effects2 = [];
    const actions2 = {};
    plugins.forEach((plugin) => {
      if (!plugin.provides) return;
      if (plugin.provides.registries) {
        Object.defineProperties(
          registries,
          Object.getOwnPropertyDescriptors(plugin.provides.registries)
        );
      }
      if (plugin.provides.app) {
        Object.assign(app, plugin.provides.app);
      }
      if (plugin.provides.slices) {
        slices.push(...plugin.provides.slices);
      }
      if (plugin.provides.effects) {
        effects2.push(...plugin.provides.effects);
      }
      if (plugin.provides.actions) {
        Object.assign(actions2, plugin.provides.actions);
      }
    });
    return { registries, app, slices, effects: effects2, actions: actions2 };
  }
  // @cpt-end:cpt-frontx-algo-framework-composition-provides-aggregation:p1:inst-1
  /**
   * Create store with all aggregated slices.
   */
  createStoreWithSlices(slices) {
    const store = getStore2();
    slices.forEach((slice9) => {
      registerSlice(slice9);
    });
    return store;
  }
  /**
   * Destroy the app and cleanup resources.
   */
  // @cpt-begin:cpt-frontx-flow-framework-composition-teardown:p2:inst-1
  destroyApp(plugins, app) {
    [...plugins].reverse().forEach((plugin) => {
      if (plugin.onDestroy) {
        plugin.onDestroy(app);
      }
    });
  }
  // @cpt-end:cpt-frontx-flow-framework-composition-teardown:p2:inst-1
};
function createFrontX(config) {
  return new FrontXAppBuilderImpl(config);
}
function createThemeRegistry() {
  const themes2 = /* @__PURE__ */ new Map();
  let currentThemeId = null;
  const subscribers = /* @__PURE__ */ new Set();
  let version = 0;
  function notifySubscribers() {
    version++;
    subscribers.forEach((callback) => {
      callback();
    });
  }
  function applyCSSVariables(variables) {
    if (typeof document === "undefined") return;
    const existing = document.getElementById("frontx-theme-vars");
    let styleEl;
    if (existing instanceof HTMLStyleElement) {
      styleEl = existing;
    } else {
      existing?.remove();
      styleEl = document.createElement("style");
      styleEl.id = "frontx-theme-vars";
      document.head.appendChild(styleEl);
    }
    const sheet = styleEl.sheet;
    if (!sheet) return;
    while (sheet.cssRules.length > 0) sheet.deleteRule(0);
    const parts = [];
    for (const [key, value] of Object.entries(variables)) {
      parts.push(`${key}: ${value}`);
    }
    if (parts.length === 0) return;
    sheet.insertRule(`:root:root { ${parts.join("; ")} }`, 0);
  }
  return {
    register(config) {
      if (themes2.has(config.id)) {
        console.warn(`Theme "${config.id}" is already registered. Skipping.`);
        return;
      }
      themes2.set(config.id, config);
      if (config.default && currentThemeId === null) {
        this.apply(config.id);
      }
    },
    get(id) {
      return themes2.get(id);
    },
    getAll() {
      return Array.from(themes2.values());
    },
    apply(id) {
      const config = themes2.get(id);
      if (!config) {
        console.warn(`Theme "${id}" not found. Cannot apply.`);
        return;
      }
      applyCSSVariables(config.variables);
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", config.appearance ?? "light");
      }
      currentThemeId = id;
      notifySubscribers();
    },
    getCurrent() {
      return currentThemeId ? themes2.get(currentThemeId) : void 0;
    },
    subscribe(callback) {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
    getVersion() {
      return version;
    }
  };
}
function changeTheme(payload) {
  eventBus3.emit("theme/changed", payload);
}
function themes() {
  const themeRegistry = createThemeRegistry();
  let themeChangedSubscription;
  return {
    name: "themes",
    dependencies: [],
    provides: {
      registries: {
        themeRegistry
      },
      actions: {
        changeTheme
      }
    },
    // @cpt-begin:cpt-frontx-flow-framework-composition-theme-propagation:p1:inst-2
    // @cpt-begin:cpt-frontx-dod-framework-composition-propagation:p1:inst-1
    onInit() {
      themeChangedSubscription = eventBus3.on("theme/changed", (payload) => {
        themeRegistry.apply(payload.themeId);
      });
      const themes2 = themeRegistry.getAll();
      if (themes2.length > 0) {
        themeRegistry.apply(themes2[0].id);
      }
    },
    onDestroy() {
      themeChangedSubscription?.unsubscribe();
      themeChangedSubscription = void 0;
    }
    // @cpt-end:cpt-frontx-flow-framework-composition-theme-propagation:p1:inst-2
    // @cpt-end:cpt-frontx-dod-framework-composition-propagation:p1:inst-1
  };
}
var SLICE_KEY2 = "layout/header";
var initialState2 = {
  user: null,
  loading: false
};
var { slice: slice2, setUser, setLoading, clearUser } = createSlice2({
  name: SLICE_KEY2,
  initialState: initialState2,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    }
  }
});
var headerSlice = slice2;
var headerActions = { setUser, setLoading, clearUser };
var headerSlice_default = slice2.reducer;
var SLICE_KEY22 = "layout/footer";
var initialState22 = {
  visible: true
};
var { slice: slice22, setFooterVisible, setFooterConfig, ...restActions } = createSlice22({
  name: SLICE_KEY22,
  initialState: initialState22,
  reducers: {
    setFooterVisible: (state, action) => {
      state.visible = action.payload;
    },
    setFooterConfig: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});
var footerSlice = slice22;
var footerActions = { setFooterVisible, setFooterConfig, ...restActions };
var footerSlice_default = slice22.reducer;
var SLICE_KEY3 = "layout/menu";
var initialState3 = {
  collapsed: false,
  items: [],
  visible: true
};
var { slice: slice3, toggleMenu, setMenuCollapsed, setMenuItems, setMenuVisible, setMenuConfig } = createSlice3({
  name: SLICE_KEY3,
  initialState: initialState3,
  reducers: {
    toggleMenu: (state) => {
      state.collapsed = !state.collapsed;
    },
    setMenuCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setMenuItems: (state, action) => {
      state.items = action.payload;
    },
    setMenuVisible: (state, action) => {
      state.visible = action.payload;
    },
    setMenuConfig: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});
var menuSlice = slice3;
var menuActions = { toggleMenu, setMenuCollapsed, setMenuItems, setMenuVisible, setMenuConfig };
var menuSlice_default = slice3.reducer;
var SLICE_KEY4 = "layout/sidebar";
var initialState4 = {
  collapsed: false,
  position: "left",
  title: null,
  content: null,
  visible: false,
  width: 256
};
var {
  slice: slice4,
  toggleSidebar,
  setSidebarCollapsed,
  setSidebarPosition,
  setSidebarTitle,
  setSidebarContent,
  setSidebarVisible,
  setSidebarWidth,
  setSidebarConfig
} = createSlice4({
  name: SLICE_KEY4,
  initialState: initialState4,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setSidebarPosition: (state, action) => {
      state.position = action.payload;
    },
    setSidebarTitle: (state, action) => {
      state.title = action.payload;
    },
    setSidebarContent: (state, action) => {
      state.content = action.payload;
    },
    setSidebarVisible: (state, action) => {
      state.visible = action.payload;
    },
    setSidebarWidth: (state, action) => {
      state.width = action.payload;
    },
    setSidebarConfig: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});
var sidebarSlice = slice4;
var sidebarActions = {
  toggleSidebar,
  setSidebarCollapsed,
  setSidebarPosition,
  setSidebarTitle,
  setSidebarContent,
  setSidebarVisible,
  setSidebarWidth,
  setSidebarConfig
};
var sidebarSlice_default = slice4.reducer;
var SLICE_KEY5 = "layout/popup";
var initialState5 = {
  stack: []
};
var { slice: slice5, openPopup, closePopup, closeTopPopup, closeAllPopups } = createSlice5({
  name: SLICE_KEY5,
  initialState: initialState5,
  reducers: {
    openPopup: (state, action) => {
      const zIndex = 1e3 + state.stack.length * 10;
      state.stack.push({ ...action.payload, zIndex });
    },
    closePopup: (state, action) => {
      state.stack = state.stack.filter((popup) => popup.id !== action.payload);
    },
    closeTopPopup: (state) => {
      state.stack.pop();
    },
    closeAllPopups: (state) => {
      state.stack = [];
    }
  }
});
var popupSlice = slice5;
var popupActions = { openPopup, closePopup, closeTopPopup, closeAllPopups };
var popupSlice_default = slice5.reducer;
var SLICE_KEY6 = "layout/overlay";
var initialState6 = {
  visible: false
};
var { slice: slice6, showOverlay, hideOverlay, setOverlayVisible } = createSlice6({
  name: SLICE_KEY6,
  initialState: initialState6,
  reducers: {
    showOverlay: (state) => {
      state.visible = true;
    },
    hideOverlay: (state) => {
      state.visible = false;
    },
    setOverlayVisible: (state, action) => {
      state.visible = action.payload;
    }
  }
});
var overlaySlice = slice6;
var overlayActions = { showOverlay, hideOverlay, setOverlayVisible };
var overlaySlice_default = slice6.reducer;
var SLICE_KEY7 = "app/tenant";
var initialState7 = {
  tenant: null,
  loading: false
};
var { slice: slice7, setTenant, setTenantLoading, clearTenant } = createSlice7({
  name: SLICE_KEY7,
  initialState: initialState7,
  reducers: {
    setTenant: (state, action) => {
      state.tenant = action.payload;
      state.loading = false;
    },
    setTenantLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearTenant: (state) => {
      state.tenant = null;
      state.loading = false;
    }
  }
});
var tenantSlice = slice7;
var tenantActions = { setTenant, setTenantLoading, clearTenant };
var tenantSlice_default = slice7.reducer;
var LAYOUT_SLICE_NAME = "layout";
var TENANT_SLICE_NAME = "app/tenant";
var layoutDomainReducers = {
  header: headerSlice_default,
  footer: footerSlice_default,
  menu: menuSlice_default,
  sidebar: sidebarSlice_default,
  popup: popupSlice_default,
  overlay: overlaySlice_default
};
var layoutReducer = combineReducers(layoutDomainReducers);
function showPopup(payload) {
  eventBus22.emit("layout/popup/requested", payload);
}
function hidePopup() {
  eventBus22.emit("layout/popup/hidden");
}
function showOverlay2(payload) {
  eventBus22.emit("layout/overlay/requested", payload);
}
function hideOverlay2() {
  eventBus22.emit("layout/overlay/hidden");
}
function toggleMenuCollapsed(payload) {
  eventBus22.emit("layout/menu/collapsed", payload);
}
function toggleSidebarCollapsed(payload) {
  eventBus22.emit("layout/sidebar/collapsed", payload);
}
function setHeaderVisible(_visible) {
}
function layout() {
  let subscriptions = [];
  return {
    name: "layout",
    dependencies: [],
    provides: {
      slices: [
        headerSlice,
        footerSlice,
        menuSlice,
        sidebarSlice,
        popupSlice,
        overlaySlice
      ],
      actions: {
        showPopup,
        hidePopup,
        showOverlay: showOverlay2,
        hideOverlay: hideOverlay2,
        toggleMenuCollapsed,
        toggleSidebarCollapsed,
        // Direct slice actions for backward compatibility
        setHeaderVisible,
        setFooterVisible: footerActions.setFooterVisible,
        setMenuCollapsed: menuActions.setMenuCollapsed,
        setSidebarCollapsed: sidebarActions.setSidebarCollapsed
      }
    },
    onInit(app) {
      const dispatch = app.store.dispatch;
      subscriptions.push(eventBus22.on("layout/popup/requested", (payload) => {
        dispatch(popupActions.openPopup({
          id: payload.id,
          title: payload.title ?? "",
          component: ""
          // Payload doesn't include component - this needs review
        }));
      }));
      subscriptions.push(eventBus22.on("layout/popup/hidden", () => {
        dispatch(popupActions.closeAllPopups());
      }));
      subscriptions.push(eventBus22.on("layout/overlay/requested", (_payload) => {
        dispatch(overlayActions.showOverlay());
      }));
      subscriptions.push(eventBus22.on("layout/overlay/hidden", () => {
        dispatch(overlayActions.hideOverlay());
      }));
      subscriptions.push(eventBus22.on("layout/menu/collapsed", (payload) => {
        dispatch(menuActions.setMenuCollapsed(payload.collapsed));
      }));
      subscriptions.push(eventBus22.on("layout/sidebar/collapsed", (payload) => {
        dispatch(sidebarActions.setSidebarCollapsed(payload.collapsed));
      }));
    },
    onDestroy() {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
      subscriptions = [];
    }
  };
}
function setLanguage(payload) {
  eventBus32.emit("i18n/language/changed", payload);
}
function i18n() {
  const i18nRegistry2 = singletonI18nRegistry;
  let languageChangedSubscription;
  return {
    name: "i18n",
    dependencies: [],
    provides: {
      registries: {
        i18nRegistry: i18nRegistry2
      },
      actions: {
        setLanguage
      }
    },
    // @cpt-begin:cpt-frontx-flow-framework-composition-i18n-propagation:p1:inst-2
    // @cpt-begin:cpt-frontx-dod-framework-composition-propagation:p1:inst-2
    onInit() {
      languageChangedSubscription = eventBus32.on(
        "i18n/language/changed",
        async (payload) => {
          await i18nRegistry2.setLanguage(payload.language);
        }
      );
      i18nRegistry2.setLanguage(Language.English).catch((err) => {
        console.warn("[Gears FrontX] Failed to load initial translations:", err);
      });
    },
    onDestroy() {
      languageChangedSubscription?.unsubscribe();
      languageChangedSubscription = void 0;
    }
    // @cpt-end:cpt-frontx-flow-framework-composition-i18n-propagation:p1:inst-2
    // @cpt-end:cpt-frontx-dod-framework-composition-propagation:p1:inst-2
  };
}
function effects() {
  return {
    name: "effects",
    dependencies: [],
    onInit() {
    }
  };
}
function buildCapabilities(provider) {
  return {
    hasGetIdentity: typeof provider.getIdentity === "function",
    hasGetPermissions: typeof provider.getPermissions === "function",
    hasCanAccess: typeof provider.canAccess === "function",
    hasCanAccessMany: typeof provider.canAccessMany === "function",
    hasEvaluateAccess: typeof provider.evaluateAccess === "function",
    hasEvaluateMany: typeof provider.evaluateMany === "function",
    hasRefresh: typeof provider.refresh === "function",
    hasSubscribe: typeof provider.subscribe === "function"
  };
}
function classifyAbortReason(signal) {
  const reason = signal.reason;
  if (reason instanceof Error && reason.name === "TimeoutError") return "timeout";
  return "aborted";
}
function isAccessDecision(value) {
  return value === "allow" || value === "deny";
}
function normalizeDecision(value) {
  return value === "allow" ? "allow" : "deny";
}
function isPlainObject2(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
function isAccessReason(value) {
  return typeof value === "string";
}
function isAccessJsonValue(value, seen = /* @__PURE__ */ new WeakSet()) {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return true;
  }
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  if (Array.isArray(value)) {
    if (seen.has(value)) return false;
    seen.add(value);
    return value.every((entry) => isAccessJsonValue(entry, seen));
  }
  if (isPlainObject2(value)) {
    if (seen.has(value)) return false;
    seen.add(value);
    return Object.values(value).every((entry) => isAccessJsonValue(entry, seen));
  }
  return false;
}
function isAccessConstraint(value) {
  return isPlainObject2(value) && Object.values(value).every((entry) => isAccessJsonValue(entry));
}
function isAccessConstraints(value) {
  return Array.isArray(value) && value.every((entry) => isAccessConstraint(entry));
}
function isAccessMeta(value) {
  return isPlainObject2(value) && Object.values(value).every((entry) => isAccessJsonValue(entry));
}
function normalizeEvaluation(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { decision: "deny", reason: "provider_error" };
  }
  const maybeEvaluation = value;
  if (!isAccessDecision(maybeEvaluation.decision)) {
    return { decision: "deny", reason: "provider_error" };
  }
  if (maybeEvaluation.constraints !== void 0 && !isAccessConstraints(maybeEvaluation.constraints)) {
    return { decision: "deny", reason: "provider_error" };
  }
  if (maybeEvaluation.reason !== void 0 && !isAccessReason(maybeEvaluation.reason)) {
    return { decision: "deny", reason: "provider_error" };
  }
  if (maybeEvaluation.meta !== void 0 && !isAccessMeta(maybeEvaluation.meta)) {
    return { decision: "deny", reason: "provider_error" };
  }
  const normalized = { decision: maybeEvaluation.decision };
  if (maybeEvaluation.constraints !== void 0) {
    normalized.constraints = maybeEvaluation.constraints;
  }
  if (maybeEvaluation.reason !== void 0) {
    normalized.reason = maybeEvaluation.reason;
  }
  if (maybeEvaluation.meta !== void 0) {
    normalized.meta = maybeEvaluation.meta;
  }
  return normalized;
}
async function safeCanAccess(provider, caps, query, ctx) {
  if (!query.action || !query.resource) return "deny";
  if (!caps.hasCanAccess) return "deny";
  let session;
  try {
    session = await provider.getSession(ctx);
  } catch {
    return "deny";
  }
  if (session === null) return "deny";
  try {
    return normalizeDecision(await provider.canAccess?.(query, ctx));
  } catch {
    return "deny";
  }
}
async function safeEvaluateAccess(provider, caps, query, ctx) {
  if (!query.action || !query.resource) {
    return { decision: "deny", reason: "malformed" };
  }
  if (!caps.hasEvaluateAccess) {
    return { decision: "deny", reason: "unsupported" };
  }
  let session;
  try {
    session = await provider.getSession(ctx);
  } catch {
    return { decision: "deny", reason: "unauthenticated" };
  }
  if (session === null) {
    return { decision: "deny", reason: "unauthenticated" };
  }
  try {
    return normalizeEvaluation(await provider.evaluateAccess?.(query, ctx));
  } catch {
    const signal = ctx?.signal;
    if (signal?.aborted) {
      return { decision: "deny", reason: classifyAbortReason(signal) };
    }
    return { decision: "deny", reason: "provider_error" };
  }
}
async function safeCanAccessMany(provider, caps, queries, ctx) {
  if (queries.length === 0) return [];
  if (queries.some((query) => !query.action || !query.resource)) {
    const decisions = [];
    for (const query of queries) {
      decisions.push(await safeCanAccess(provider, caps, query, ctx));
    }
    return decisions;
  }
  if (caps.hasCanAccessMany) {
    let session;
    try {
      session = await provider.getSession(ctx);
    } catch {
      return queries.map(() => "deny");
    }
    if (session === null) return queries.map(() => "deny");
    try {
      const decisions = await provider.canAccessMany?.(queries, ctx);
      if (!Array.isArray(decisions) || decisions.length !== queries.length) {
        return queries.map(() => "deny");
      }
      return decisions.map((decision) => normalizeDecision(decision));
    } catch {
      return queries.map(() => "deny");
    }
  }
  const results = [];
  for (const query of queries) {
    results.push(await safeCanAccess(provider, caps, query, ctx));
  }
  return results;
}
async function safeEvaluateMany(provider, caps, queries, ctx) {
  if (queries.length === 0) return [];
  if (queries.some((query) => !query.action || !query.resource)) {
    const evaluations = [];
    for (const query of queries) {
      evaluations.push(await safeEvaluateAccess(provider, caps, query, ctx));
    }
    return evaluations;
  }
  if (caps.hasEvaluateMany) {
    let session;
    try {
      session = await provider.getSession(ctx);
    } catch {
      return queries.map(() => ({ decision: "deny", reason: "unauthenticated" }));
    }
    if (session === null) {
      return queries.map(() => ({ decision: "deny", reason: "unauthenticated" }));
    }
    try {
      const evaluations = await provider.evaluateMany?.(queries, ctx);
      if (!Array.isArray(evaluations) || evaluations.length !== queries.length) {
        return queries.map(() => ({ decision: "deny", reason: "provider_error" }));
      }
      return evaluations.map((evaluation) => normalizeEvaluation(evaluation));
    } catch {
      const signal = ctx?.signal;
      if (signal?.aborted) {
        const reason = classifyAbortReason(signal);
        return queries.map(() => ({ decision: "deny", reason }));
      }
      return queries.map(() => ({ decision: "deny", reason: "provider_error" }));
    }
  }
  const results = [];
  for (const query of queries) {
    results.push(await safeEvaluateAccess(provider, caps, query, ctx));
  }
  return results;
}
function isSupportedAuthTransportMethod(method) {
  return method === "GET" || method === "POST" || method === "PUT" || method === "DELETE" || method === "PATCH" || method === "HEAD" || method === "OPTIONS";
}
function toAuthTransportRequest(request) {
  if (!isSupportedAuthTransportMethod(request.method)) return null;
  let body;
  if (typeof request.body === "string") {
    body = request.body;
  } else if (request.body !== void 0) {
    try {
      body = JSON.stringify(request.body);
    } catch {
      body = void 0;
    }
  }
  return {
    url: request.url,
    method: request.method,
    headers: request.headers,
    body,
    signal: request.signal
  };
}
function isRelativeUrl(url) {
  return url.startsWith("/") && !url.startsWith("//");
}
function getOrigin(url) {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}
function getRuntimeOrigin() {
  const maybeLocation = globalThis.location;
  if (!maybeLocation?.origin || maybeLocation.origin === "null") return null;
  return maybeLocation.origin;
}
function shouldIncludeCredentials(url, allowedOrigins) {
  if (isRelativeUrl(url)) return true;
  const origin = getOrigin(url);
  if (!origin) return false;
  const runtimeOrigin = getRuntimeOrigin();
  if (runtimeOrigin && origin === runtimeOrigin) return true;
  if (!allowedOrigins || allowedOrigins.length === 0) return false;
  return allowedOrigins.includes(origin);
}
var AuthRestPlugin = class extends RestPlugin {
  constructor(config) {
    super();
    this.config = config;
  }
  config;
  /** Shared in-flight refresh promise — deduplicates concurrent 401 refresh calls. */
  refreshPromise = null;
  async onRequest(ctx) {
    const session = await this.config.provider.getSession({ signal: ctx.signal });
    if (!session) return ctx;
    if (session.kind === "cookie") {
      if (!shouldIncludeCredentials(ctx.url, this.config.frontxApi?.allowedCookieOrigins)) return ctx;
      const next = { ...ctx, withCredentials: true };
      const csrfHeaderName = this.config.frontxApi?.csrfHeaderName;
      if (csrfHeaderName && session.csrfToken) {
        return {
          ...next,
          headers: {
            ...next.headers,
            [csrfHeaderName]: session.csrfToken
          }
        };
      }
      return next;
    }
    if (session.kind === "bearer" && session.token) {
      return {
        ...ctx,
        headers: {
          ...ctx.headers,
          Authorization: `Bearer ${session.token}`
        }
      };
    }
    return ctx;
  }
  async onError(ctx) {
    const requestForHook = toAuthTransportRequest(ctx.request);
    if (requestForHook) {
      this.config.provider.onTransportError?.({
        request: requestForHook,
        error: ctx.error,
        status: ctx.response?.status
      });
    }
    if (ctx.response?.status !== 401) return ctx.error;
    if (ctx.retryCount !== 0) return ctx.error;
    if (!this.config.provider.refresh) return ctx.error;
    if (!this.refreshPromise) {
      this.refreshPromise = this.config.provider.refresh().finally(() => {
        this.refreshPromise = null;
      });
    }
    let refreshed;
    try {
      refreshed = await this.refreshPromise;
    } catch {
      return ctx.error;
    }
    if (!refreshed) return ctx.error;
    if (refreshed.kind === "bearer") {
      if (!refreshed.token) return ctx.error;
      return ctx.retry({
        headers: { Authorization: `Bearer ${refreshed.token}` }
      });
    }
    if (refreshed.kind === "cookie") {
      return ctx.retry();
    }
    return ctx.error;
  }
};
function frontxApiTransport() {
  return (args) => {
    const restPlugin = new AuthRestPlugin({
      provider: args.provider,
      frontxApi: {
        allowedCookieOrigins: args.allowedCookieOrigins,
        csrfHeaderName: args.csrfHeaderName
      }
    });
    args.addRestPlugin(restPlugin);
    return {
      destroy: () => {
        args.removeRestPlugin(AuthRestPlugin);
      }
    };
  };
}
function auth(config) {
  const transport = config.transport ?? frontxApiTransport();
  let binding = null;
  const caps = buildCapabilities(config.provider);
  return {
    name: "auth",
    // @cpt-begin:cpt-frontx-flow-auth-plugin-transport-binding:p1:inst-provides
    provides: {
      app: {
        auth: {
          provider: config.provider,
          capabilities: caps,
          getSession: (ctx) => config.provider.getSession(ctx),
          checkAuth: (ctx) => config.provider.checkAuth(ctx),
          logout: (ctx) => config.provider.logout(ctx),
          login: config.provider.login?.bind(config.provider),
          handleCallback: config.provider.handleCallback?.bind(config.provider),
          refresh: config.provider.refresh?.bind(config.provider),
          getIdentity: config.provider.getIdentity?.bind(config.provider),
          getPermissions: config.provider.getPermissions?.bind(config.provider),
          canAccess: (query, ctx) => safeCanAccess(config.provider, caps, query, ctx),
          canAccessMany: (queries, ctx) => safeCanAccessMany(config.provider, caps, queries, ctx),
          evaluateAccess: (query, ctx) => safeEvaluateAccess(config.provider, caps, query, ctx),
          evaluateMany: (queries, ctx) => safeEvaluateMany(config.provider, caps, queries, ctx),
          subscribe: config.provider.subscribe?.bind(config.provider)
        }
      }
    },
    // @cpt-end:cpt-frontx-flow-auth-plugin-transport-binding:p1:inst-provides
    // @cpt-begin:cpt-frontx-flow-auth-plugin-transport-binding:p1:inst-on-init
    onInit(app) {
      binding = transport({
        provider: config.provider,
        allowedCookieOrigins: config.frontxApi?.allowedCookieOrigins,
        csrfHeaderName: config.frontxApi?.csrfHeaderName,
        addRestPlugin: (plugin) => app.apiRegistry.plugins.add(RestProtocol, plugin),
        removeRestPlugin: (pluginClass) => app.apiRegistry.plugins.remove(RestProtocol, pluginClass)
      });
    },
    // @cpt-end:cpt-frontx-flow-auth-plugin-transport-binding:p1:inst-on-init
    // @cpt-begin:cpt-frontx-flow-auth-plugin-transport-binding:p1:inst-on-destroy
    onDestroy(_app) {
      binding?.destroy();
      binding = null;
      const providerDestroyResult = config.provider.destroy?.();
      if (providerDestroyResult && typeof providerDestroyResult === "object" && "catch" in providerDestroyResult) {
        void providerDestroyResult.catch(() => void 0);
      }
    }
    // @cpt-end:cpt-frontx-flow-auth-plugin-transport-binding:p1:inst-on-destroy
  };
}
function isDevEnvironment() {
  if (typeof window === "undefined") return false;
  const { hostname } = window.location;
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local");
}
function mock(config) {
  let cleanup = null;
  return {
    name: "mock",
    dependencies: ["effects"],
    provides: {
      slices: [mockSlice],
      actions: {
        toggleMockMode
      }
    },
    onInit() {
      cleanup = initMockEffects();
      const isDev = isDevEnvironment();
      const enabledByDefault = config?.enabledByDefault ?? isDev;
      if (enabledByDefault) {
        toggleMockMode(true);
      }
    },
    onDestroy() {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
    }
  };
}
var mfeRegistryFactory = createMfeRegistryFactory();
var FRONTX_MFE_ENTRY_MF = "gts.frontx.mfes.mfe.entry.v1~frontx.mfes.mfe.entry_mf.v1~";
var FRONTX_SCREEN_EXTENSION_TYPE = "gts.frontx.mfes.ext.extension.v1~frontx.screensets.layout.screen.v1~";
var FRONTX_SHARED_PROPERTY_THEME = "gts.frontx.mfes.comm.shared_property.v1~frontx.mfes.comm.theme.v1~";
var FRONTX_SHARED_PROPERTY_LANGUAGE = "gts.frontx.mfes.comm.shared_property.v1~frontx.mfes.comm.language.v1~";
var SLICE_KEY8 = "mfe";
var initialState8 = {
  registrationStates: {},
  errors: {}
};
var { slice: slice8, ...actions } = createSlice8({
  name: SLICE_KEY8,
  initialState: initialState8,
  reducers: {
    // Registration state reducers
    setExtensionRegistering: (state, action) => {
      state.registrationStates[action.payload.extensionId] = "registering";
    },
    setExtensionRegistered: (state, action) => {
      state.registrationStates[action.payload.extensionId] = "registered";
    },
    setExtensionUnregistered: (state, action) => {
      state.registrationStates[action.payload.extensionId] = "unregistered";
    },
    setExtensionError: (state, action) => {
      state.registrationStates[action.payload.extensionId] = "error";
      state.errors[action.payload.extensionId] = action.payload.error;
    }
  }
});
var mfeSlice = slice8;
var {
  setExtensionRegistering,
  setExtensionRegistered,
  setExtensionUnregistered,
  setExtensionError
} = actions;
function selectExtensionState(state, extensionId) {
  return state.mfe?.registrationStates[extensionId] ?? "unregistered";
}
function selectRegisteredExtensions(state) {
  const mfe = state.mfe;
  if (!mfe) return [];
  return Object.entries(mfe.registrationStates).filter(([_, regState]) => regState === "registered").map(([extensionId]) => extensionId);
}
function selectExtensionError(state, extensionId) {
  return state.mfe?.errors[extensionId];
}
var slice_default = slice8.reducer;
var FRONTX_POPUP_DOMAIN = "gts.frontx.mfes.ext.domain.v1~frontx.screensets.layout.popup.v1";
var FRONTX_SIDEBAR_DOMAIN = "gts.frontx.mfes.ext.domain.v1~frontx.screensets.layout.sidebar.v1";
var FRONTX_SCREEN_DOMAIN = "gts.frontx.mfes.ext.domain.v1~frontx.screensets.layout.screen.v1";
var FRONTX_OVERLAY_DOMAIN = "gts.frontx.mfes.ext.domain.v1~frontx.screensets.layout.overlay.v1";
var MfeEvents = {
  RegisterExtensionRequested: "mfe/registerExtensionRequested",
  UnregisterExtensionRequested: "mfe/unregisterExtensionRequested"
};
function initMfeEffects(getRegistry) {
  const store = getStore22();
  const unsubscribers = [];
  const unsubRegisterExtension = eventBus4.on(MfeEvents.RegisterExtensionRequested, async (payload) => {
    const { extension } = payload;
    try {
      store.dispatch(setExtensionRegistering({ extensionId: extension.id }));
      await getRegistry().registerExtension(extension);
      store.dispatch(setExtensionRegistered({ extensionId: extension.id }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown registration error";
      store.dispatch(setExtensionError({ extensionId: extension.id, error: errorMessage }));
    }
  });
  unsubscribers.push(unsubRegisterExtension);
  const unsubUnregisterExtension = eventBus4.on(MfeEvents.UnregisterExtensionRequested, async (payload) => {
    const { extensionId } = payload;
    try {
      await getRegistry().unregisterExtension(extensionId);
      store.dispatch(setExtensionUnregistered({ extensionId }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown unregistration error";
      store.dispatch(setExtensionError({ extensionId, error: errorMessage }));
    }
  });
  unsubscribers.push(unsubUnregisterExtension);
  return () => {
    unsubscribers.forEach((unsub) => unsub.unsubscribe());
  };
}
var mfeRegistry = null;
var registryInitializer = null;
function setMfeRegistry(registry) {
  mfeRegistry = registry;
}
function bindMfeRegistryInitializer(initializer) {
  registryInitializer = initializer;
}
function requireRegistry() {
  if (mfeRegistry) return mfeRegistry;
  if (registryInitializer) return registryInitializer();
  throw new Error("MFE registry not initialized. The microfrontends plugin must be built before using lifecycle actions.");
}
function resolveDomainId(registry, extensionId) {
  const extension = registry.getExtension(extensionId);
  if (!extension) {
    throw new Error(`Extension '${extensionId}' is not registered. Register it before calling lifecycle actions.`);
  }
  return extension.domain;
}
function loadExtension(extensionId) {
  const registry = requireRegistry();
  const domainId = resolveDomainId(registry, extensionId);
  registry.executeActionsChain({
    action: {
      type: FRONTX_ACTION_LOAD_EXT,
      target: domainId,
      payload: { subject: extensionId }
    }
  });
}
function mountExtension(extensionId) {
  const registry = requireRegistry();
  const domainId = resolveDomainId(registry, extensionId);
  registry.executeActionsChain({
    action: {
      type: FRONTX_ACTION_MOUNT_EXT,
      target: domainId,
      payload: { subject: extensionId }
    }
  });
}
function unmountExtension(extensionId) {
  const registry = requireRegistry();
  const domainId = resolveDomainId(registry, extensionId);
  const domain = registry.getDomain(domainId);
  if (domain === void 0) {
    throw new Error(
      `MFE unmount failed: domain '${domainId}' is not registered (extension '${extensionId}'). Register the domain before unmounting.`
    );
  }
  const supportsUnmount = domain.actions.includes(FRONTX_ACTION_UNMOUNT_EXT);
  if (!supportsUnmount) {
    console.warn(
      `[MFE] Skipping unmount for ${extensionId}: domain '${domainId}' uses swap semantics and does not support ${FRONTX_ACTION_UNMOUNT_EXT}.`
    );
    return;
  }
  registry.executeActionsChain({
    action: {
      type: FRONTX_ACTION_UNMOUNT_EXT,
      target: domainId,
      payload: { subject: extensionId }
    }
  });
}
function registerExtension(extension) {
  eventBus5.emit(MfeEvents.RegisterExtensionRequested, { extension });
}
function unregisterExtension(extensionId) {
  eventBus5.emit(MfeEvents.UnregisterExtensionRequested, { extensionId });
}
var INIT_ONLY_LIFECYCLE_STAGES = [
  "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.init.v1"
];
var DEFAULT_LIFECYCLE_STAGES = [
  "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.init.v1",
  "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.activated.v1",
  "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.deactivated.v1",
  "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.destroyed.v1"
];
var screenDomain = {
  id: FRONTX_SCREEN_DOMAIN,
  route: "screen",
  actions: [FRONTX_ACTION_LOAD_EXT2, FRONTX_ACTION_MOUNT_EXT2],
  extensionsActions: [],
  sharedProperties: [
    FRONTX_SHARED_PROPERTY_THEME,
    FRONTX_SHARED_PROPERTY_LANGUAGE
  ],
  defaultActionTimeout: 3e4,
  lifecycleStages: [...INIT_ONLY_LIFECYCLE_STAGES],
  extensionsLifecycleStages: [...DEFAULT_LIFECYCLE_STAGES],
  extensionsTypeId: FRONTX_SCREEN_EXTENSION_TYPE,
  lifecycle: void 0
};
var sidebarDomain = {
  id: FRONTX_SIDEBAR_DOMAIN,
  route: "sidebar",
  actions: [FRONTX_ACTION_LOAD_EXT2, FRONTX_ACTION_MOUNT_EXT2, FRONTX_ACTION_UNMOUNT_EXT2],
  extensionsActions: [],
  sharedProperties: [
    FRONTX_SHARED_PROPERTY_THEME,
    FRONTX_SHARED_PROPERTY_LANGUAGE
  ],
  defaultActionTimeout: 3e4,
  lifecycleStages: [...DEFAULT_LIFECYCLE_STAGES],
  extensionsLifecycleStages: [...DEFAULT_LIFECYCLE_STAGES],
  lifecycle: void 0
};
var popupDomain = {
  id: FRONTX_POPUP_DOMAIN,
  route: "popup",
  actions: [FRONTX_ACTION_LOAD_EXT2, FRONTX_ACTION_MOUNT_EXT2, FRONTX_ACTION_UNMOUNT_EXT2],
  extensionsActions: [],
  sharedProperties: [
    FRONTX_SHARED_PROPERTY_THEME,
    FRONTX_SHARED_PROPERTY_LANGUAGE
  ],
  defaultActionTimeout: 3e4,
  lifecycleStages: [...DEFAULT_LIFECYCLE_STAGES],
  extensionsLifecycleStages: [...DEFAULT_LIFECYCLE_STAGES],
  lifecycle: void 0
};
var overlayDomain = {
  id: FRONTX_OVERLAY_DOMAIN,
  route: "overlay",
  actions: [FRONTX_ACTION_LOAD_EXT2, FRONTX_ACTION_MOUNT_EXT2, FRONTX_ACTION_UNMOUNT_EXT2],
  extensionsActions: [],
  sharedProperties: [
    FRONTX_SHARED_PROPERTY_THEME,
    FRONTX_SHARED_PROPERTY_LANGUAGE
  ],
  defaultActionTimeout: 3e4,
  lifecycleStages: [...DEFAULT_LIFECYCLE_STAGES],
  extensionsLifecycleStages: [...DEFAULT_LIFECYCLE_STAGES],
  lifecycle: void 0
};
var sharedRouter;
function sharedFrameworkRouter(typeSystem) {
  if (!sharedRouter) sharedRouter = new FrameworkRouter({ typeSystem });
  return sharedRouter;
}
function microfrontends(config) {
  const router = sharedFrameworkRouter(config.typeSystem);
  let registry;
  let builtApp;
  const subscriptions = [];
  const applyCurrentState = (built, app) => {
    try {
      const theme = app.themeRegistry?.getCurrent();
      if (theme) {
        built.setTheme(theme.variables);
        built.updateSharedProperty(FRONTX_SHARED_PROPERTY_THEME, theme.id);
      }
      const language = app.i18nRegistry?.getLanguage();
      if (language) {
        built.updateSharedProperty(FRONTX_SHARED_PROPERTY_LANGUAGE, language);
      }
    } catch (error) {
      console.error("[Gears FrontX] Failed to apply current theme/language to the MFE registry", error);
    }
  };
  const initializeRegistry = () => {
    if (!registry) {
      const built = mfeRegistryFactory.build({
        typeSystem: config.typeSystem,
        mfeHandlers: config.mfeHandlers,
        router
      });
      router.attachRegistry(built);
      setMfeRegistry(built);
      registry = built;
      if (builtApp) {
        applyCurrentState(built, builtApp);
      }
    }
    return registry;
  };
  let effectsCleanup = null;
  return {
    name: "microfrontends",
    dependencies: [],
    provides: {
      registries: {
        // The MFE-enabled MfeRegistry (registerDomain(), registerExtension(), …)
        // as a getter: the first read builds it. Aggregation and app
        // construction copy it by property descriptor so it stays lazy.
        get mfeRegistry() {
          return initializeRegistry();
        }
      },
      // `app.mfeRouter` — the module-augmentation surface (see
      // `FrontXAppRuntimeExtensions`) exposing only `navigation()`, the
      // extension-local navigation facade an MFE reads/drives its own route
      // through (ADR 0036, D5; see `MfeRouterHandle`'s own doc comment for
      // the full contract). Starting/stopping a routed domain's URL observer
      // and building/rendering its route tree are React-owned internal
      // integration, never reached through this handle: `ExtensionDomainSlot`
      // drives attach/detach itself and `ExtensionRouter` builds the route
      // tree (both `@gears-frontx/react`), each backed by the reach-through
      // functions `@gears-frontx/framework/internal` exports. Published via
      // `asHandle()`, never the `router` instance itself, so no `RouterPort`
      // member (or `attachRegistry`) is reachable from an app object.
      app: { mfeRouter: router.asHandle() },
      slices: [mfeSlice],
      // NOTE: Effects are NOT initialized via provides.effects.
      // They are initialized in onInit to capture cleanup references.
      // The framework calls provides.effects at build step 5, then onInit at step 7.
      // We only initialize effects in onInit to avoid duplicate event listeners.
      actions: {
        loadExtension,
        mountExtension,
        unmountExtension,
        registerExtension,
        unregisterExtension
      }
    },
    onInit(app) {
      builtApp = app;
      bindMfeRegistryInitializer(initializeRegistry);
      effectsCleanup = initMfeEffects(initializeRegistry);
      subscriptions.push(
        eventBus6.on("theme/changed", (payload) => {
          if (!registry) return;
          try {
            const themeConfig = app.themeRegistry?.get(payload.themeId);
            if (themeConfig) {
              registry.setTheme(themeConfig.variables);
            }
            registry.updateSharedProperty(FRONTX_SHARED_PROPERTY_THEME, payload.themeId);
          } catch (error) {
            console.error("[Gears FrontX] Failed to propagate theme to MFE domains", error);
            eventBus6.emit("theme/propagation/failed", { themeId: payload.themeId, error });
          }
        }),
        eventBus6.on("i18n/language/changed", (payload) => {
          if (!registry) return;
          try {
            registry.updateSharedProperty(FRONTX_SHARED_PROPERTY_LANGUAGE, payload.language);
          } catch (error) {
            console.error("[Gears FrontX] Failed to propagate language to MFE domains", error);
            eventBus6.emit("i18n/propagation/failed", { language: payload.language, error });
          }
        })
      );
    },
    onDestroy() {
      if (effectsCleanup) {
        effectsCleanup();
        effectsCleanup = null;
      }
      subscriptions.splice(0).forEach((subscription) => subscription.unsubscribe());
    }
  };
}
function full(config) {
  const plugins = [
    effects(),
    themes(),
    layout(),
    i18n(),
    queryCache(),
    mock()
  ];
  if (config?.microfrontends) {
    plugins.push(microfrontends(config.microfrontends));
  }
  if (config?.auth) {
    plugins.push(auth(config.auth));
  }
  return plugins;
}
function minimal() {
  return [
    themes()
  ];
}
var presets = {
  full,
  minimal
};
var TenantEvents = {
  Changed: "app/tenant/changed",
  Cleared: "app/tenant/cleared"
};
function initTenantEffects() {
  const store = getStore3();
  const subChanged = eventBus7.on(TenantEvents.Changed, (payload) => {
    store.dispatch(setTenant(payload.tenant));
  });
  const subCleared = eventBus7.on(TenantEvents.Cleared, () => {
    store.dispatch(clearTenant());
  });
  return () => {
    subChanged.unsubscribe();
    subCleared.unsubscribe();
  };
}
function changeTenant(tenant) {
  eventBus8.emit(TenantEvents.Changed, { tenant });
}
function clearTenantAction() {
  eventBus8.emit(TenantEvents.Cleared, {});
}
function setTenantLoadingState(loading) {
  getStore4().dispatch(setTenantLoading(loading));
}
var ACCOUNTS_DOMAIN = "accounts";
var STATE_PATH_MAPPING = {
  // App state (moved to app slice)
  "uicore.app.user": "app.user",
  "uicore.app.tenant": "app.tenant",
  "uicore.app.language": "app.language",
  "uicore.app.translationsReady": "app.translationsReady",
  "uicore.app.loading": "app.loading",
  "uicore.app.error": "app.error",
  "uicore.app.useMockApi": "app.useMockApi",
  // Layout state (split into domains)
  "uicore.layout.theme": "app.theme",
  // Domain states (moved to layout.*)
  "uicore.header": "layout.header",
  "uicore.footer": "layout.footer",
  "uicore.menu": "layout.menu",
  "uicore.sidebar": "layout.sidebar",
  "uicore.popup": "layout.popup",
  "uicore.overlay": "layout.overlay"
};
var deprecationWarningsEnabled = true;
function setDeprecationWarnings(enabled) {
  deprecationWarningsEnabled = enabled;
}
function isDeprecationWarningsEnabled() {
  return deprecationWarningsEnabled;
}
function createLegacySelector(legacyPath, newSelector, migrationHint) {
  let hasWarned = false;
  return (state) => {
    if (deprecationWarningsEnabled && !hasWarned && false) {
      hasWarned = true;
      const newPath = STATE_PATH_MAPPING[legacyPath] ?? "unknown";
      const hint = migrationHint ?? `Use the new state path: ${newPath}`;
      console.warn(
        `[Gears FrontX Migration] Deprecated selector accessing "${legacyPath}". ${hint}`
      );
    }
    return newSelector(state);
  };
}
function getLayoutDomainState(state, domain) {
  return state.layout[domain];
}
function hasLegacyUicoreState(state) {
  return typeof state === "object" && state !== null && "uicore" in state && typeof state.uicore === "object";
}
function hasNewLayoutState(state) {
  return typeof state === "object" && state !== null && "layout" in state && typeof state.layout === "object";
}
export {
  ACCOUNTS_DOMAIN,
  ActionHandler2 as ActionHandler,
  ApiPlugin,
  ApiPluginBase,
  ApiProtocol,
  BaseApiService,
  ChildMfeBridge,
  ConcurrentMountStrategy2 as ConcurrentMountStrategy,
  ExclusiveMountStrategy2 as ExclusiveMountStrategy,
  ExtensionDomainImplementation2 as ExtensionDomainImplementation,
  ExtensionDomainImplementationFactory2 as ExtensionDomainImplementationFactory,
  ExtensionMounter,
  FRONTX_ACTION_LOAD_EXT3 as FRONTX_ACTION_LOAD_EXT,
  FRONTX_ACTION_MOUNT_EXT3 as FRONTX_ACTION_MOUNT_EXT,
  FRONTX_ACTION_UNMOUNT_EXT3 as FRONTX_ACTION_UNMOUNT_EXT,
  FRONTX_MFE_ENTRY_MF,
  FRONTX_OVERLAY_DOMAIN,
  FRONTX_POPUP_DOMAIN,
  FRONTX_SCREEN_DOMAIN,
  FRONTX_SCREEN_EXTENSION_TYPE,
  FRONTX_SHARED_PROPERTY_LANGUAGE,
  FRONTX_SHARED_PROPERTY_THEME,
  FRONTX_SIDEBAR_DOMAIN,
  I18nRegistryImpl2 as I18nRegistry,
  I18nRegistryImpl,
  LAYOUT_SLICE_NAME,
  Language2 as Language,
  LanguageDisplayMode,
  MOCK_PLUGIN,
  MfeBridgeFactory,
  MfeHandler,
  MfeHandlerMF,
  MfeRegistry,
  MfeRegistryFactory,
  MockEvents,
  MountStrategy,
  OptionalMountStrategy,
  ParentMfeBridge,
  RestEndpointProtocol,
  RestPlugin2 as RestPlugin,
  RestPluginWithConfig,
  RestProtocol2 as RestProtocol,
  STATE_PATH_MAPPING,
  SUPPORTED_LANGUAGES,
  SsePlugin,
  SsePluginWithConfig,
  SseProtocol,
  SseStreamProtocol,
  TENANT_SLICE_NAME,
  TenantEvents,
  TestContainerProvider,
  TextDirection,
  apiRegistry22 as apiRegistry,
  auth,
  changeTenant,
  clearTenant,
  clearTenantAction,
  clearUser,
  closeAllPopups,
  closePopup,
  closeTopPopup,
  compareStrings,
  createCollator,
  createFrontX,
  createI18nRegistry,
  createLegacySelector,
  createShadowRoot,
  createSlice9 as createSlice,
  createStore,
  createThemeRegistry,
  effects,
  eventBus9 as eventBus,
  extractGtsPackage,
  footerActions,
  footerSlice,
  formatCompact,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatRelative,
  formatTime,
  frontxApiTransport,
  full,
  getLanguageMetadata,
  getLayoutDomainState,
  getStore5 as getStore,
  gtsPlugin,
  hasLegacyUicoreState,
  hasNewLayoutState,
  hasSlice,
  headerActions,
  headerSlice,
  hideOverlay,
  i18n,
  i18nRegistry,
  initMockEffects,
  initTenantEffects,
  injectCssVariables,
  isDeprecationWarningsEnabled,
  isMockPlugin2 as isMockPlugin,
  isRestShortCircuit,
  isShortCircuit,
  isSseShortCircuit,
  layout,
  layoutDomainReducers,
  layoutReducer,
  loadExtension,
  menuActions,
  menuSlice,
  mfeRegistryFactory,
  microfrontends,
  minimal,
  mock,
  mockActions,
  mockSlice,
  mountExtension,
  openPopup,
  overlayActions,
  overlayDomain,
  overlaySlice,
  popupActions,
  popupDomain,
  popupSlice,
  presets,
  queryCache,
  queryCacheShared,
  registerExtension,
  registerSlice2 as registerSlice,
  resetSharedFetchCache,
  resetSharedQueryClient,
  screenDomain,
  selectExtensionError,
  selectExtensionState,
  selectRegisteredExtensions,
  setDeprecationWarnings,
  setFooterConfig,
  setFooterVisible,
  setLoading as setHeaderLoading,
  setMenuCollapsed,
  setMenuConfig,
  setMenuItems,
  setMenuVisible,
  setMockEnabled,
  setOverlayVisible,
  setSidebarCollapsed,
  setSidebarConfig,
  setSidebarContent,
  setSidebarPosition,
  setSidebarTitle,
  setSidebarVisible,
  setSidebarWidth,
  setTenant,
  setTenantLoading,
  setTenantLoadingState,
  setUser,
  showOverlay,
  sidebarActions,
  sidebarDomain,
  sidebarSlice,
  subscribeQueryCacheRuntimeChanged,
  tenantActions,
  tenantSlice_default as tenantReducer,
  tenantSlice,
  themes,
  toggleMenu,
  toggleMockMode,
  toggleSidebar,
  unmountExtension,
  unregisterExtension
};
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
