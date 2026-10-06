import __ext_react from "react";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var require_use_sync_external_store_shim_production = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js"(exports) {
    "use strict";
    var React3 = __ext_react;
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useState3 = React3.useState;
    var useEffect4 = React3.useEffect;
    var useLayoutEffect3 = React3.useLayoutEffect;
    var useDebugValue = React3.useDebugValue;
    function useSyncExternalStore$2(subscribe2, getSnapshot2) {
      var value = getSnapshot2(), _useState = useState3({ inst: { value, getSnapshot: getSnapshot2 } }), inst = _useState[0].inst, forceUpdate = _useState[1];
      useLayoutEffect3(
        function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot2;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        },
        [subscribe2, value, getSnapshot2]
      );
      useEffect4(
        function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          return subscribe2(function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          });
        },
        [subscribe2]
      );
      useDebugValue(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function useSyncExternalStore$1(subscribe2, getSnapshot2) {
      return getSnapshot2();
    }
    var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React3.useSyncExternalStore ? React3.useSyncExternalStore : shim;
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_use_sync_external_store_shim_production();
    } else {
      module.exports = null;
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
var require_with_selector_production = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js"(exports) {
    "use strict";
    var React3 = __ext_react;
    var shim = require_shim();
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useSyncExternalStore = shim.useSyncExternalStore;
    var useRef5 = React3.useRef;
    var useEffect4 = React3.useEffect;
    var useMemo4 = React3.useMemo;
    var useDebugValue = React3.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe2, getSnapshot2, getServerSnapshot2, selector, isEqual) {
      var instRef = useRef5(null);
      if (null === instRef.current) {
        var inst = { hasValue: false, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo4(
        function() {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = true;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return memoizedSelection = currentSelection;
              }
              return memoizedSelection = nextSnapshot;
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return memoizedSnapshot = nextSnapshot, currentSelection;
            memoizedSnapshot = nextSnapshot;
            return memoizedSelection = nextSelection;
          }
          var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot2 ? null : getServerSnapshot2;
          return [
            function() {
              return memoizedSelector(getSnapshot2());
            },
            null === maybeGetServerSnapshot ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            }
          ];
        },
        [getSnapshot2, getServerSnapshot2, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe2, instRef[0], instRef[1]);
      useEffect4(
        function() {
          inst.hasValue = true;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_with_selector_production();
    } else {
      module.exports = null;
    }
  }
});

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
var REENTRANT_ROUND_LIMIT = 100;
function reportRoutingDefect(message, cause) {
  const prefixed = `[@gears-frontx/routing] ${message}`;
  if (cause === void 0) {
    console.error(prefixed);
  } else {
    console.error(prefixed, cause);
  }
}
var NAME_PATTERN = /^[a-z][a-z0-9-]*$/;
var validateName = (candidate) => NAME_PATTERN.test(candidate);
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
function createBackProjectEntries(history2) {
  return (domainKey, delta, verb, pageHash) => {
    validateBackProjectionInput(domainKey, delta);
    runBackProjection(history2, domainKey, delta, verb, pageHash);
  };
}
function runBackProjection(history2, domainKey, delta, verb, pageHash) {
  const location = history2.location;
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
  history2[verb](serialized);
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
function resolveCurrentEntries(history2, domainKey, source) {
  const location = history2.location;
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
function createObserverBoundTo(history2) {
  return (domainKey, source, onTransition) => {
    validateDomainKeyAndRegistrations(domainKey, source);
    let previous = resolveCurrentEntries(history2, domainKey, source);
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
      const current = resolveCurrentEntries(history2, domainKey, source);
      const diff = computeDiff(previous, current);
      if (diffIsEmpty(diff)) {
        previous = current;
      } else {
        onTransition({ domainKey, entries: current, diff });
        previous = current;
      }
    }
    const unsubscribeFanout = history2.subscribe(() => {
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
function createRouteSignal(history2) {
  return {
    backProjectEntries: createBackProjectEntries(history2),
    createObserver: createObserverBoundTo(history2)
  };
}

// node_modules/@tanstack/react-router/dist/esm/utils.js
import * as React$1 from "react";

// node_modules/@tanstack/router-core/dist/esm/isServer/client.js
var isServer = false;
var loadServerRoute = void 0;

// node_modules/@tanstack/react-router/dist/esm/utils.js
var useLayoutEffect2 = isServer ?? typeof window === "undefined" ? React$1.useEffect : React$1.useLayoutEffect;

// node_modules/@tanstack/router-core/dist/esm/utils.js
function last(arr) {
  return arr[arr.length - 1];
}
function functionalUpdate(updater, previous) {
  if (typeof updater === "function") return updater(previous);
  return updater;
}
var hasOwn = Object.prototype.hasOwnProperty;
function hasKeys(obj) {
  for (const key in obj) if (hasOwn.call(obj, key)) return true;
  return false;
}
var createNull = () => /* @__PURE__ */ Object.create(null);
var nullReplaceEqualDeep = (prev, next) => replaceEqualDeep(prev, next, true);
function replaceEqualDeep(prev, next, _nullProto, _depth = 0) {
  if (isServer) return next;
  if (prev === next) return prev;
  if (_depth++ > 500) return next;
  const array = Array.isArray(prev) && Array.isArray(next);
  if (!array && !(isPlainObject(prev) && isPlainObject(next))) return next;
  const prevKeys = Object.keys(prev);
  const previousCount = prevKeys.length;
  const nextKeys = Object.keys(next);
  const length = nextKeys.length;
  if (array ? previousCount !== prev.length || length !== next.length || previousCount && last(prevKeys) !== `${previousCount - 1}` || length && last(nextKeys) !== `${length - 1}` : previousCount !== Object.getOwnPropertyNames(prev).length || length !== Object.getOwnPropertyNames(next).length || Object.getOwnPropertySymbols(next).length) return next;
  let i = 0;
  let child;
  let previous;
  let key;
  if (array) {
    for (; i < length; i++) {
      key = i;
      previous = prev[key];
      child = next[key];
      child = previous === child ? previous : typeof previous === "object" ? replaceEqualDeep(previous, child, _nullProto, _depth) : child;
      if (child !== previous) break;
    }
    if (i === length && previousCount === length) return prev;
  } else {
    let equal = previousCount === length;
    let unchanged = true;
    for (; i < length; i++) {
      key = nextKeys[i];
      previous = prev[key];
      const incoming = next[key];
      child = previous === incoming ? previous : typeof previous === "object" ? replaceEqualDeep(previous, incoming, _nullProto, _depth) : incoming;
      equal &&= child === previous && (prevKeys[i] === key || hasOwn.call(prev, key));
      unchanged &&= Object.is(child, incoming);
      prevKeys[i] = child;
    }
    if (equal) return Object.getOwnPropertySymbols(prev).length ? next : prev;
    if (unchanged) return next;
  }
  const copy = array ? nextKeys.fill(0) : _nullProto ? createNull() : {};
  for (let j = 0; j < length; j++) {
    key = array ? j : nextKeys[j];
    if (array) {
      previous = prev[key];
      if (j > i) {
        child = next[key];
        child = previous === child ? previous : typeof previous === "object" ? replaceEqualDeep(previous, child, _nullProto, _depth) : child;
      }
      copy[key] = j < i ? previous : child;
    } else copy[key] = prevKeys[j];
  }
  return copy;
}
function isPlainObject(o) {
  if (!o || typeof o !== "object") return false;
  return (Object.getPrototypeOf(o)?.constructor ?? Object) === Object;
}
function deepEqual(a, b, partial, explicitUndefined) {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0, l = a.length; i < l; i++) {
      const av = a[i];
      const bv = b[i];
      if (av !== bv && !deepEqual(av, bv, partial, explicitUndefined)) return false;
    }
    return true;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    if (partial) {
      for (const k in b) if (explicitUndefined || b[k] !== void 0) {
        if (!deepEqual(a[k], b[k], partial, explicitUndefined)) return false;
      }
      return true;
    }
    let aCount = 0;
    if (explicitUndefined) aCount = Object.keys(a).length;
    else for (const k in a) if (a[k] !== void 0) aCount++;
    for (const k in b) if (explicitUndefined || b[k] !== void 0) {
      if (aCount-- === 0 || !deepEqual(a[k], b[k], partial, explicitUndefined)) return false;
    }
    return aCount === 0;
  }
  return false;
}
var PATH_UNSAFE_RE = /[\x00-\x1f\x7f"<>`{}]/g;
function sanitizePathSegment(segment) {
  return segment.replace(PATH_UNSAFE_RE, (ch) => "%" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"));
}
function decodeSegment(segment) {
  let decoded;
  try {
    decoded = decodeURI(segment);
  } catch {
    decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
      try {
        return decodeURI(match);
      } catch {
        return match;
      }
    });
  }
  return sanitizePathSegment(decoded);
}
var DEFAULT_PROTOCOL_ALLOWLIST = [
  "http:",
  "https:",
  "mailto:",
  "tel:"
];
function getUrlScheme(url) {
  if (url[0] === "/") return;
  if (!url.includes(":")) return;
  return /^[\x00-\x20]*([a-z][a-z\d+.\t\n\r-]*:)/i.exec(url)?.[1]?.replace(/[\t\n\r]/g, "").toLowerCase();
}
var protocolRelativePrefixRegex = /^[\x00-\x20]*[\\/][\t\n\r]*[\\/]/;
function isDangerousProtocol(url, allowlist) {
  if (!url) return false;
  if (protocolRelativePrefixRegex.test(url)) return true;
  const scheme = getUrlScheme(url);
  return scheme ? !allowlist.has(scheme) : false;
}
function decodePath(path) {
  if (!path) return path;
  let result = path;
  if (/[%\\\x00-\x1f\x7f]/.test(path)) {
    const re = /%25|%5C/gi;
    let cursor = 0;
    let match;
    result = "";
    while (null !== (match = re.exec(path))) {
      result += decodeSegment(path.slice(cursor, match.index)) + match[0];
      cursor = re.lastIndex;
    }
    result += decodeSegment(cursor ? path.slice(cursor) : path);
  }
  return result;
}
function encodePathLikeUrl(path) {
  if (!/[\s\u0080-\uFFFF]/.test(path)) return path;
  return path.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent);
}
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

// node_modules/@tanstack/router-core/dist/esm/invariant.js
function invariant() {
  throw new Error("Invariant failed");
}

// node_modules/@tanstack/router-core/dist/esm/path.js
function cleanPath(path) {
  return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
  return path === "/" ? path : path.replace(/^\/+/, "");
}
function trimPathRight(path) {
  const len = path.length;
  return len > 1 && path[len - 1] === "/" ? path.replace(/\/+$/, "") : path;
}
function trimPath(path) {
  return trimPathRight(trimPathLeft(path));
}
function removeTrailingSlash(value, basepath) {
  if (value?.endsWith("/") && value !== "/" && value !== `${basepath}/`) return value.slice(0, -1);
  return value;
}
function resolvePath(base, to, trailingSlash = "never", cache) {
  if (to.includes("//")) to = cleanPath(to);
  if (to.startsWith("/")) {
    if (to.length === 1 || trailingSlash === "preserve") return to;
    if (trailingSlash === "always") return to.endsWith("/") ? to : `${to}/`;
    return to.endsWith("/") ? to.slice(0, -1) : to;
  }
  const isBase = to === ".";
  let key;
  if (cache) {
    key = isBase ? base : base + "\0" + to;
    const cached = cache.get(key);
    if (cached) return cached;
  }
  let baseSegments;
  if (isBase) baseSegments = base.split("/");
  else {
    if (base.includes("//")) base = cleanPath(base);
    baseSegments = base.split("/");
    while (baseSegments.length > 1 && last(baseSegments) === "") baseSegments.pop();
    const toSegments = to.split("/");
    for (let index = 0, length = toSegments.length; index < length; index++) {
      const value = toSegments[index];
      if (value === "") {
        if (!index) baseSegments = [value];
        else if (index === length - 1) baseSegments.push(value);
      } else if (value === "..") if (baseSegments.length > 1) baseSegments.pop();
      else baseSegments = [""];
      else if (value === ".") {
      } else baseSegments.push(value);
    }
  }
  if (baseSegments.length > 1) {
    if (last(baseSegments) === "") {
      if (trailingSlash === "never") baseSegments.pop();
    } else if (trailingSlash === "always") baseSegments.push("");
  }
  const joined = baseSegments.join("/");
  const result = (isBase ? cleanPath(joined) : joined) || "/";
  if (key && cache) cache.set(key, result);
  return result;
}
function compileDecodeCharMap(pathParamsAllowedCharacters) {
  const charMap = new Map(pathParamsAllowedCharacters.map((char) => [encodeURIComponent(char), char]));
  const regex = new RegExp([...charMap.keys()].join("|").replace(/[.*()]/g, "\\$&"), "g");
  return (encoded) => encoded.replace(regex, (match) => charMap.get(match) ?? match);
}
function isMissingSplat(value) {
  return value == null || value === "";
}
function encodeParam(key, value, decoder) {
  if (typeof value !== "string") return "" + (value ?? void 0);
  const splat = key === "_splat";
  if (splat && (!value || /^[a-zA-Z0-9\-._~!/]*$/.test(value))) return value;
  let encoded = encodeURIComponent(value);
  if (splat) encoded = encoded.replaceAll("%2F", "/");
  return decoder ? decoder(encoded) : encoded;
}
function interpolatePath(path, segments, params, decoder, usedParams) {
  const trailingSlash = path.endsWith("/") ? "/" : "";
  let joined = "";
  for (const part of segments) {
    if (typeof part === "string") {
      joined += part;
      continue;
    }
    const [kind, key, prefix, rawSuffix] = part;
    const splat = kind === 2;
    const suffix = splat && rawSuffix !== void 0 ? rawSuffix + trailingSlash : rawSuffix;
    let paramValue = params[key];
    if (kind === 3 && paramValue == null) continue;
    if (usedParams) {
      usedParams[key] = paramValue;
      if (splat) usedParams["*"] = paramValue;
    }
    if (splat && isMissingSplat(paramValue)) {
      if (prefix === "/" && !suffix) continue;
      paramValue = "";
    }
    joined += prefix + encodeParam(key, paramValue, decoder) + (suffix || "");
  }
  return joined + trailingSlash || "/";
}

// node_modules/@tanstack/router-core/dist/esm/not-found.js
function notFound(options = {}) {
  options.isNotFound = true;
  if (options.throw) throw options;
  return options;
}
function isNotFound(obj) {
  return obj?.isNotFound === true;
}

// node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js
function getSafeSessionStorage() {
  try {
    return sessionStorage;
  } catch {
    return;
  }
}
var storageKey = "tsr-scroll-restoration-v1_3";
var safeSessionStorage = getSafeSessionStorage();
function createScrollRestorationCache() {
  try {
    return JSON.parse(safeSessionStorage?.getItem("tsr-scroll-restoration-v1_3") || "{}");
  } catch {
    return {};
  }
}
var scrollRestorationCache = /* @__PURE__ */ createScrollRestorationCache();
var scrollRestorationIdAttribute = "data-scroll-restoration-id";
var defaultGetScrollRestorationKey = (location) => {
  return location.state.__TSR_key || location.href;
};
function getScrollRestorationSelector(element) {
  const attrId = element.getAttribute(scrollRestorationIdAttribute);
  if (attrId) return `[${scrollRestorationIdAttribute}="${attrId}"]`;
  let selector = "";
  let el = element;
  let parent;
  while (parent = el.parentNode) {
    let index = 1;
    let sibling = el;
    while (sibling = sibling.previousElementSibling) index++;
    const part = `${el.localName}:nth-child(${index})`;
    selector = selector ? `${part} > ${selector}` : part;
    el = parent;
  }
  return selector;
}
var ignoreScroll = false;
var windowScrollTarget = "window";
function getElement(selector) {
  try {
    return typeof selector === "function" ? selector() : document.querySelector(selector);
  } catch {
  }
}
function getScrollToTopElements(scrollToTopSelectors) {
  const elements = /* @__PURE__ */ new Set();
  for (const selector of scrollToTopSelectors) {
    if (selector === windowScrollTarget) continue;
    const element = getElement(selector);
    if (element) elements.add(element);
  }
  return elements;
}
function setupScrollRestoration(router, force) {
  const shouldSetupScrollRestoration = force ?? router.options.scrollRestoration;
  const scroll = router._scroll;
  if (shouldSetupScrollRestoration) scroll.e = true;
  if (isServer ?? router.isServer) return;
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  const trackedScrollTargets = /* @__PURE__ */ new Set();
  const snapshotCurrentScrollTargets = (restoreKey) => {
    const keyEntry = scrollRestorationCache[restoreKey] ||= {};
    for (const target of trackedScrollTargets) if (target === document) keyEntry[windowScrollTarget] = {
      scrollX,
      scrollY
    };
    else if (target.isConnected) keyEntry[getScrollRestorationSelector(target)] = {
      scrollX: target.scrollLeft,
      scrollY: target.scrollTop
    };
  };
  if (shouldSetupScrollRestoration && !scroll.s) {
    scroll.s = true;
    ignoreScroll = false;
    history.scrollRestoration = "manual";
    document.addEventListener("scroll", (event) => {
      if (ignoreScroll) return;
      trackedScrollTargets.add(event.target);
    }, true);
    router.subscribe("onBeforeLoad", (event) => {
      if (event.fromLocation) snapshotCurrentScrollTargets(getKey(event.fromLocation));
      trackedScrollTargets.clear();
    });
    addEventListener("pagehide", () => {
      history.scrollRestoration = "auto";
      snapshotCurrentScrollTargets(getKey(router.stores.resolvedLocation.get() ?? router.stores.location.get()));
      try {
        safeSessionStorage?.setItem(storageKey, JSON.stringify(scrollRestorationCache));
      } catch {
        if (false) console.warn("[ts-router] Could not persist scroll restoration state to sessionStorage.");
      }
    });
    addEventListener("pageshow", (event) => {
      if (event.persisted) history.scrollRestoration = "manual";
    });
  }
  if (scroll.r) return;
  scroll.r = true;
  router.subscribe("onRendered", (event) => {
    const behavior = router.options.scrollRestorationBehavior;
    const scrollToTopSelectors = router.options.scrollToTopSelectors;
    const shouldResetScroll = scroll.n;
    const hashNavigation = scroll.h;
    let scrollToTopElements;
    trackedScrollTargets.clear();
    scroll.n = true;
    scroll.h = false;
    if (typeof router.options.scrollRestoration === "function" && !router.options.scrollRestoration({ location: router.latestLocation })) return;
    const cacheKey = getKey(event.toLocation);
    const fromCacheKey = event.fromLocation && getKey(event.fromLocation);
    if (scroll.e && fromCacheKey && fromCacheKey !== cacheKey) {
      const fromElementEntries = scrollRestorationCache[fromCacheKey];
      if (fromElementEntries) {
        let toElementEntries = scrollRestorationCache[cacheKey];
        for (const elementSelector in fromElementEntries) {
          if (elementSelector === windowScrollTarget) {
            if (shouldResetScroll) continue;
          } else {
            const element = getElement(elementSelector);
            if (!element) continue;
            if (shouldResetScroll && scrollToTopSelectors) {
              scrollToTopElements ??= getScrollToTopElements(scrollToTopSelectors);
              if (scrollToTopElements.has(element)) continue;
            }
          }
          if (!toElementEntries) toElementEntries = scrollRestorationCache[cacheKey] = {};
          toElementEntries[elementSelector] ??= fromElementEntries[elementSelector];
        }
      }
    }
    ignoreScroll = true;
    try {
      const hash = event.toLocation.hash;
      const hashScrollIntoViewOptions = event.toLocation.state.__hashScrollIntoViewOptions ?? true;
      let windowRestored = false;
      if (shouldResetScroll) {
        if (!hash && scrollToTopSelectors) scrollToTopElements ??= getScrollToTopElements(scrollToTopSelectors);
        const skipWindowRestore = hash && hashScrollIntoViewOptions && hashNavigation;
        const elementEntries = scroll.e ? scrollRestorationCache[cacheKey] : void 0;
        if (elementEntries) for (const elementSelector in elementEntries) {
          const { scrollX: scrollX2, scrollY: scrollY2 } = elementEntries[elementSelector];
          if (elementSelector === windowScrollTarget) {
            if (skipWindowRestore) continue;
            scrollTo({
              top: scrollY2,
              left: scrollX2,
              behavior
            });
            windowRestored = true;
          } else {
            const element = getElement(elementSelector);
            if (element) {
              element.scrollLeft = scrollX2;
              element.scrollTop = scrollY2;
              scrollToTopElements?.delete(element);
            }
          }
        }
        if (!hash) {
          const scrollOptions = {
            top: 0,
            left: 0,
            behavior
          };
          if (!windowRestored) scrollTo(scrollOptions);
          if (scrollToTopElements) for (const element of scrollToTopElements) element.scrollTo(scrollOptions);
        }
      }
      if (!windowRestored && hash && hashScrollIntoViewOptions) document.getElementById(hash)?.scrollIntoView(hashScrollIntoViewOptions);
    } finally {
      ignoreScroll = false;
    }
  });
}

// node_modules/@tanstack/router-core/dist/esm/qss.js
function encode(obj, stringify = String) {
  let result;
  for (const key in obj) {
    const val = obj[key];
    if (val !== void 0) (result ||= new URLSearchParams()).set(key, stringify(val));
  }
  return result ? result.toString() : "";
}
function toValue(str) {
  if (!str) return "";
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str) {
  const searchParams = new URLSearchParams(str);
  const result = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of searchParams.entries()) {
    const previousValue = result[key];
    if (previousValue == null) result[key] = toValue(value);
    else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
    else result[key] = [previousValue, toValue(value)];
  }
  return result;
}

// node_modules/@tanstack/router-core/dist/esm/searchParams.js
var jsonStart = /^(?:\s|["[{\d-]|fa|nu|tr)/;
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
function parseSearchWith(parser) {
  const isJsonParser = parser === JSON.parse;
  return (searchStr) => {
    if (searchStr[0] === "?") searchStr = searchStr.substring(1);
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        if (isJsonParser && !jsonStart.test(value)) continue;
        try {
          query[key] = parser(value);
        } catch (_err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  const isJsonParser = parser === JSON.parse;
  function stringifyValue(val) {
    if (val && typeof val === "object") try {
      return stringify(val);
    } catch (_err) {
    }
    else if (parser && typeof val === "string") {
      if (isJsonParser && !jsonStart.test(val)) return val;
      try {
        parser(val);
        return stringify(val);
      } catch (_err) {
      }
    }
    return val;
  }
  return (search) => {
    const searchStr = encode(search, stringifyValue);
    return searchStr ? `?${searchStr}` : "";
  };
}

// node_modules/@tanstack/router-core/dist/esm/root.js
var rootRouteId = "__root__";

// node_modules/@tanstack/router-core/dist/esm/redirect.js
function redirect(opts) {
  opts.statusCode = opts.statusCode || opts.code || 307;
  const headers = new Headers(opts.headers);
  if (opts.href && headers.get("Location") === null) headers.set("Location", opts.href);
  const response = new Response(null, {
    status: opts.statusCode,
    headers
  });
  response.options = opts;
  if (opts.throw) throw response;
  return response;
}
function isRedirect(obj) {
  return obj instanceof Response && !!obj.options;
}

// node_modules/@tanstack/router-core/dist/esm/sieve-cache.js
function createSieveCache(max) {
  const cache = /* @__PURE__ */ new Map();
  let hand;
  let newest;
  return {
    get(key) {
      const entry = cache.get(key);
      if (!entry) return;
      entry.visited = true;
      return entry.value;
    },
    set(key, value) {
      const existing = cache.get(key);
      if (existing) {
        existing.value = value;
        return;
      }
      if (cache.size >= max) {
        let node = hand?.next().value;
        while (!node || node.visited) {
          if (node) node.visited = false;
          else hand = cache.values();
          node = hand.next().value;
        }
        if (node === newest) hand = void 0;
        cache.delete(node.key);
      }
      const entry = {
        key,
        value,
        visited: false
      };
      newest = entry;
      cache.set(key, entry);
    },
    clear() {
      cache.clear();
      hand = void 0;
      newest = void 0;
    }
  };
}

// node_modules/@tanstack/router-core/dist/esm/new-process-route-tree.js
var SEGMENT_TYPE_INDEX = 4;
var SEGMENT_TYPE_PATHLESS = 5;
function getParamNames(data) {
  const cached = data.names;
  if (cached) return cached;
  const keys = [];
  for (const segment of data) if (typeof segment !== "string") keys.push(segment[1]);
  return data.names = keys;
}
function parseSegment(path, start, end) {
  const part = path.substring(start, end);
  if (part.charCodeAt(0) === 36) return part.length === 1 ? [
    2,
    "_splat",
    "",
    void 0
  ] : [
    1,
    part.substring(1),
    "",
    ""
  ];
  const open = part.indexOf("{");
  if (open >= 0) {
    const close = part.indexOf("}", open);
    const optional = part.charCodeAt(open + 1) === 45;
    const nameStart = open + (optional ? 3 : 2);
    if (close >= 0 && part.charCodeAt(nameStart - 1) === 36 && (!optional || nameStart < close)) {
      const key = part.substring(nameStart, close);
      return [
        optional ? 3 : key ? 1 : 2,
        key || "_splat",
        part.substring(0, open),
        path.substring(start + close + 1, key ? end : path.length)
      ];
    }
  }
  return part;
}
function parseSegments(defaultCaseSensitive, route, start, node, dynamicListsToSort, parentInterpolation) {
  let cursor = start;
  const path = route.fullPath ?? route.from;
  const options = route.options;
  const length = path.length;
  const literalEnd = path.endsWith("/") ? length - 1 : length;
  const caseSensitive = options?.caseSensitive ?? defaultCaseSensitive;
  const parseParams = options?.params?.parse ?? options?.parseParams;
  let interpolation;
  let literalStart = parentInterpolation ? start - 1 : 0;
  if (!node || path.includes("$")) {
    interpolation = parentInterpolation?.slice() ?? [];
    const tail = last(interpolation);
    if (tail && typeof tail !== "string" && tail[0] === 2) {
      interpolation[interpolation.length - 1] = [
        tail[0],
        tail[1],
        tail[2],
        tail[3] === void 0 ? void 0 : tail[3] + path.substring(start - (path[start - 2] === "/" ? 2 : 1), literalEnd)
      ];
      literalStart = length;
    }
  }
  while (cursor < length) {
    const start2 = cursor;
    const next = path.indexOf("/", start2);
    let end = next === -1 ? length : next;
    const segment = parseSegment(path, start2, end);
    cursor = end + 1;
    let nextNode;
    if (typeof segment === "string") {
      if (!node) continue;
      let name = segment;
      let staticChildren;
      if (caseSensitive) staticChildren = node.static ??= /* @__PURE__ */ new Map();
      else {
        name = segment.toLowerCase();
        staticChildren = node.staticInsensitive ??= /* @__PURE__ */ new Map();
      }
      const existingNode = staticChildren.get(name);
      if (existingNode) nextNode = existingNode;
      else {
        const next2 = createSegmentNode(node);
        nextNode = next2;
        staticChildren.set(name, next2);
      }
    } else {
      const kind = segment[0];
      let prefix = segment[2];
      let suffix = segment[3] ?? "";
      if (kind === 2) {
        end = length;
        cursor = end + 1;
      }
      if (interpolation && literalStart < end) {
        if (literalStart < start2 - 1) interpolation.push(path.substring(literalStart, start2 - 1));
        segment[2] = "/" + prefix;
        if (kind === 2 && segment[3] !== void 0 && literalEnd < length) segment[3] = suffix.slice(0, -1);
        interpolation.push(segment);
        literalStart = end;
      }
      if (!node) continue;
      const actuallyCaseSensitive = caseSensitive && !!(prefix || suffix);
      if (!caseSensitive) {
        prefix = prefix.toLowerCase();
        suffix = suffix.toLowerCase();
      }
      const siblings = kind === 1 ? node.dynamic ??= [] : kind === 3 ? node.optional ??= [] : node.wildcard ??= [];
      const existingNode = kind !== 2 && !parseParams && siblings.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
      if (existingNode) nextNode = existingNode;
      else {
        const next2 = createSegmentNode(node, kind, actuallyCaseSensitive, prefix, suffix);
        nextNode = next2;
        siblings.push(next2);
        if (siblings.length === 2) dynamicListsToSort?.push(siblings);
      }
    }
    node = nextNode;
  }
  if (interpolation && literalStart < literalEnd) interpolation.push(path.substring(literalStart, literalEnd));
  const segmentData = interpolation?.slice();
  if (!node) return segmentData;
  if (parseParams && route.children && !route.isRoot && route.id && route.id.charCodeAt(route.id.lastIndexOf("/") + 1) === 95) {
    const pathlessNode = createSegmentNode(node, SEGMENT_TYPE_PATHLESS);
    (node.pathless ??= []).push(pathlessNode);
    node = pathlessNode;
  }
  const isLeaf = (route.path || !route.children) && !route.isRoot;
  if (isLeaf && literalEnd < length) {
    const indexNode = createSegmentNode(node, SEGMENT_TYPE_INDEX);
    node.index = indexNode;
    node = indexNode;
  }
  node.parse = parseParams ?? null;
  node.priority = options?.params?.priority ?? 0;
  if (!node.route) {
    node.data = segmentData;
    if (isLeaf) node.route = route;
  }
  return [
    node,
    cursor,
    segmentData
  ];
}
function sortDynamic(a, b) {
  if (a.parse && !b.parse) return -1;
  if (!a.parse && b.parse) return 1;
  if (a.parse && b.parse && (a.priority || b.priority)) return b.priority - a.priority;
  if (a.prefix && b.prefix && a.prefix !== b.prefix) {
    if (a.prefix.startsWith(b.prefix)) return -1;
    if (b.prefix.startsWith(a.prefix)) return 1;
  }
  if (a.suffix && b.suffix && a.suffix !== b.suffix) {
    if (a.suffix.endsWith(b.suffix)) return -1;
    if (b.suffix.endsWith(a.suffix)) return 1;
  }
  if (a.prefix && !b.prefix) return -1;
  if (!a.prefix && b.prefix) return 1;
  if (a.suffix && !b.suffix) return -1;
  if (!a.suffix && b.suffix) return 1;
  if (a.caseSensitive && !b.caseSensitive) return -1;
  if (!a.caseSensitive && b.caseSensitive) return 1;
  return 0;
}
function createSegmentNode(parent, kind = 0, caseSensitive, prefix, suffix) {
  return {
    kind,
    depth: parent ? parent.depth + 1 : 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    data: void 0,
    parent,
    parse: null,
    priority: 0,
    caseSensitive,
    prefix,
    suffix
  };
}
function processRouteMasks(routeList, processedTree) {
  const segmentTree = createSegmentNode();
  const dynamicListsToSort = [];
  function visit(route, start, parentNode, parentInterpolation) {
    const [node, cursor, segments] = parseSegments(false, route, start, parentNode, dynamicListsToSort, parentInterpolation);
    if (route.children) for (const child of route.children) visit(child, cursor, node, segments);
  }
  for (const route of routeList) visit(route, 1, segmentTree);
  for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
  processedTree.masksTree = segmentTree;
  processedTree.flatCache = createSieveCache(1e3);
}
function findFlatMatch(path, processedTree) {
  path ||= "/";
  const cached = processedTree.flatCache.get(path);
  if (cached !== void 0) return cached;
  const result = findMatch(path, processedTree.masksTree);
  processedTree.flatCache.set(path, result);
  return result;
}
function findSingleMatch(from, caseSensitive, fuzzy, path, processedTree) {
  from ||= "/";
  path ||= "/";
  const key = caseSensitive ? `case\0${from}` : from;
  let tree = processedTree.singleCache.get(key);
  if (!tree) {
    tree = createSegmentNode();
    parseSegments(caseSensitive, { from }, 1, tree);
    processedTree.singleCache.set(key, tree);
  }
  return findMatch(path, tree, fuzzy);
}
function findRouteMatch(path, processedTree, fuzzy = false) {
  const key = fuzzy ? path : `nofuzz\0${path}`;
  const cached = processedTree.matchCache.get(key);
  if (cached !== void 0) return cached;
  path ||= "/";
  let result;
  try {
    result = findMatch(path, processedTree.segmentTree, fuzzy);
  } catch (err) {
    if (err instanceof URIError) result = null;
    else throw err;
  }
  if (result) result.branch = buildRouteBranch(result.route);
  processedTree.matchCache.set(key, result);
  return result;
}
function processRouteTree(routeTree, caseSensitive = false) {
  const segmentTree = createSegmentNode();
  const dynamicListsToSort = [];
  const routesById = {};
  const routesByPath = {};
  let index = 0;
  function visit(route, start, parentNode, parentInterpolation) {
    route.init(index);
    if (route.id in routesById) {
      if (false) throw new Error(`Invariant failed: Duplicate routes found with id: ${String(route.id)}`);
      invariant();
    }
    routesById[route.id] = route;
    if (index !== 0 && route.path) {
      const trimmedFullPath = trimPathRight(route.fullPath);
      if (!routesByPath[trimmedFullPath] || route.fullPath.endsWith("/")) routesByPath[trimmedFullPath] = route;
    }
    index++;
    const [node, cursor, segments] = parseSegments(caseSensitive, route, start, parentNode, dynamicListsToSort, parentInterpolation);
    route._interpolation = segments;
    if (route.children) for (const child of route.children) visit(child, cursor, node, segments);
  }
  visit(routeTree, 1, segmentTree);
  for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
  return {
    processedTree: {
      segmentTree,
      singleCache: createSieveCache(1e3),
      matchCache: createSieveCache(1e3),
      flatCache: null,
      masksTree: null
    },
    routesById,
    routesByPath
  };
}
function findMatch(path, segmentTree, fuzzy = false) {
  const parts = path.split("/");
  const leaf = getNodeMatch(path, parts, segmentTree, fuzzy);
  if (!leaf) return null;
  const [rawParams] = extractParams(path, parts, leaf);
  return {
    route: leaf.node.route,
    rawParams
  };
}
function extractParams(path, parts, leaf) {
  const list = buildBranch(leaf.node);
  const names = leaf.node.data && getParamNames(leaf.node.data);
  const rawParams = /* @__PURE__ */ Object.create(null);
  let partIndex = leaf.extract?.part ?? 0;
  let nodeIndex = leaf.extract?.node ?? 0;
  let pathIndex = leaf.extract?.path ?? 0;
  let paramIndex = leaf.extract?.param ?? 0;
  for (; nodeIndex < list.length; partIndex++, nodeIndex++, pathIndex++) {
    const node = list[nodeIndex];
    if (node.kind === SEGMENT_TYPE_INDEX) break;
    if (node.kind === SEGMENT_TYPE_PATHLESS) {
      partIndex--;
      pathIndex--;
      continue;
    }
    const part = parts[partIndex];
    const currentPathIndex = pathIndex;
    if (part) pathIndex += part.length;
    if (node.kind === 1 || node.kind === 3) {
      const name = names[paramIndex++];
      if (node.kind === 3 && leaf.skipped & 1 << nodeIndex) {
        partIndex--;
        pathIndex = currentPathIndex - 1;
        continue;
      }
      const value = node.suffix || node.prefix ? part.substring(node.prefix.length, part.length - node.suffix.length) : part;
      if (value || node.kind === 1) rawParams[name] = decodeURIComponent(value);
    } else if (node.kind === 2) {
      const n = node;
      const value = path.substring(currentPathIndex + n.prefix.length, path.length - n.suffix.length);
      const splat = decodeURIComponent(value);
      rawParams["*"] = splat;
      rawParams._splat = splat;
      break;
    }
  }
  if (leaf.rawParams) Object.assign(rawParams, leaf.rawParams);
  return [rawParams, {
    part: partIndex,
    node: nodeIndex,
    path: pathIndex,
    param: paramIndex
  }];
}
function buildRouteBranch(route) {
  const list = [route];
  while (route.parentRoute) {
    route = route.parentRoute;
    list.push(route);
  }
  list.reverse();
  return list;
}
function buildBranch(node) {
  const list = Array(node.depth + 1);
  do {
    list[node.depth] = node;
    node = node.parent;
  } while (node);
  return list;
}
function getNodeMatch(path, parts, segmentTree, fuzzy) {
  if (path === "/" && segmentTree.index) return {
    node: segmentTree.index,
    skipped: 0
  };
  const trailingSlash = !last(parts);
  const pathIsIndex = trailingSlash && path !== "/";
  const partsLength = parts.length - (trailingSlash ? 1 : 0);
  const stack = [{
    node: segmentTree,
    index: 1,
    skipped: 0,
    statics: 0,
    dynamics: 0,
    optionals: 0
  }];
  let bestFuzzy = null;
  let bestMatch = null;
  while (stack.length) {
    const frame = stack.pop();
    const { node, index, skipped, statics, dynamics, optionals } = frame;
    let { extract, rawParams } = frame;
    if (node.kind === 2 && node.route && !isFrameMoreSpecific(bestMatch, frame)) continue;
    if (node.parse) {
      if (!validateParseParams(path, parts, frame)) continue;
      rawParams = frame.rawParams;
      extract = frame.extract;
    }
    if (fuzzy && node.route && node.kind !== SEGMENT_TYPE_INDEX && isFrameMoreSpecific(bestFuzzy, frame)) bestFuzzy = frame;
    const isBeyondPath = index === partsLength;
    if (isBeyondPath) {
      if (node.route && (!pathIsIndex || node.kind === SEGMENT_TYPE_INDEX || node.kind === 2) && isFrameMoreSpecific(bestMatch, frame)) bestMatch = frame;
      if (!node.optional && !node.wildcard && !node.index && !node.pathless) continue;
    }
    const part = isBeyondPath ? void 0 : parts[index];
    let lowerPart;
    if (isBeyondPath && node.index) {
      const indexFrame = {
        node: node.index,
        index,
        skipped,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      };
      let indexValid = true;
      if (node.index.parse) {
        if (!validateParseParams(path, parts, indexFrame)) indexValid = false;
      }
      if (indexValid) {
        if (!dynamics && !optionals && !skipped && isPerfectStaticMatch(statics, partsLength)) return indexFrame;
        if (isFrameMoreSpecific(bestMatch, indexFrame)) bestMatch = indexFrame;
      }
    }
    if (node.wildcard) for (let i = node.wildcard.length - 1; i >= 0; i--) {
      const segment = node.wildcard[i];
      const { prefix, suffix } = segment;
      if (prefix) {
        if (isBeyondPath) continue;
        if (!(segment.caseSensitive ? part : lowerPart ??= part.toLowerCase()).startsWith(prefix)) continue;
      }
      if (suffix) {
        if (isBeyondPath) continue;
        const end = parts.slice(index).join("/");
        const suffixPart = end.slice(-suffix.length);
        if ((segment.caseSensitive ? suffixPart : suffixPart.toLowerCase()) !== suffix || end.length - suffix.length < prefix.length) continue;
      }
      stack.push({
        node: segment,
        index: partsLength,
        skipped,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (node.optional) {
      const nextSkipped = skipped | 1 << node.depth + 1;
      for (let i = node.optional.length - 1; i >= 0; i--) {
        const segment = node.optional[i];
        stack.push({
          node: segment,
          index,
          skipped: nextSkipped,
          statics,
          dynamics,
          optionals,
          extract,
          rawParams
        });
      }
      if (!isBeyondPath) for (let i = node.optional.length - 1; i >= 0; i--) {
        const segment = node.optional[i];
        const { prefix, suffix } = segment;
        if (prefix || suffix) {
          const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
          if (prefix && !casePart.startsWith(prefix)) continue;
          if (suffix && casePart.indexOf(suffix, casePart.length - suffix.length) < prefix.length) continue;
        }
        stack.push({
          node: segment,
          index: index + 1,
          skipped,
          statics,
          dynamics,
          optionals: optionals + segmentScore(partsLength, index),
          extract,
          rawParams
        });
      }
    }
    if (!isBeyondPath && node.dynamic && part) for (let i = node.dynamic.length - 1; i >= 0; i--) {
      const segment = node.dynamic[i];
      const { prefix, suffix } = segment;
      if (prefix || suffix) {
        const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
        if (prefix && !casePart.startsWith(prefix)) continue;
        if (suffix && casePart.indexOf(suffix, casePart.length - suffix.length) < prefix.length) continue;
      }
      stack.push({
        node: segment,
        index: index + 1,
        skipped,
        statics,
        dynamics: dynamics + segmentScore(partsLength, index),
        optionals,
        extract,
        rawParams
      });
    }
    if (!isBeyondPath && node.staticInsensitive) {
      const match = node.staticInsensitive.get(lowerPart ??= part.toLowerCase());
      if (match) stack.push({
        node: match,
        index: index + 1,
        skipped,
        statics: statics + segmentScore(partsLength, index),
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (!isBeyondPath && node.static) {
      const match = node.static.get(part);
      if (match) stack.push({
        node: match,
        index: index + 1,
        skipped,
        statics: statics + segmentScore(partsLength, index),
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (node.pathless) for (let i = node.pathless.length - 1; i >= 0; i--) {
      const segment = node.pathless[i];
      stack.push({
        node: segment,
        index,
        skipped,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
  }
  if (bestMatch) return bestMatch;
  if (fuzzy && bestFuzzy) {
    let sliceIndex = bestFuzzy.index;
    for (let i = 0; i < bestFuzzy.index; i++) sliceIndex += parts[i].length;
    const splat = sliceIndex === path.length ? "/" : path.slice(sliceIndex);
    bestFuzzy.rawParams ??= /* @__PURE__ */ Object.create(null);
    bestFuzzy.rawParams["**"] = decodeURIComponent(splat);
    return bestFuzzy;
  }
  return null;
}
function segmentScore(partsLength, index) {
  return 2 ** (partsLength - index - 1);
}
function isPerfectStaticMatch(statics, partsLength) {
  return statics === 2 ** (partsLength - 1) - 1;
}
function validateParseParams(path, parts, frame) {
  let rawParams;
  let state;
  try {
    [rawParams, state] = extractParams(path, parts, frame);
  } catch {
    return null;
  }
  frame.rawParams = rawParams;
  frame.extract = state;
  if (!frame.node.parse) return true;
  try {
    if (frame.node.parse(rawParams) === false) return null;
  } catch {
  }
  return true;
}
function isFrameMoreSpecific(prev, next) {
  if (!prev) return true;
  return next.statics > prev.statics || next.statics === prev.statics && (next.dynamics > prev.dynamics || next.dynamics === prev.dynamics && (next.optionals > prev.optionals || next.optionals === prev.optionals && ((next.node.kind === SEGMENT_TYPE_INDEX) > (prev.node.kind === SEGMENT_TYPE_INDEX) || next.node.kind === SEGMENT_TYPE_INDEX === (prev.node.kind === SEGMENT_TYPE_INDEX) && next.node.depth > prev.node.depth)));
}

// node_modules/@tanstack/router-core/dist/esm/rewrite.js
function rewriteBasepath(basepath, caseSensitive, rewrite) {
  const trimmedBasepath = trimPath(basepath);
  const normalizedBasepath = `/${trimmedBasepath}`;
  const checkBasepath = caseSensitive ? normalizedBasepath : normalizedBasepath.toLowerCase();
  const checkBasepathWithSlash = `${checkBasepath}/`;
  const basepathRewrite = {
    input: ({ url }) => {
      const pathname = caseSensitive ? url.pathname : url.pathname.toLowerCase();
      if (pathname === checkBasepath) url.pathname = "/";
      else if (pathname.startsWith(checkBasepathWithSlash)) url.pathname = url.pathname.slice(normalizedBasepath.length);
      return url;
    },
    output: ({ url }) => {
      url.pathname = cleanPath(`/${trimmedBasepath}${url.pathname}`);
      return url;
    }
  };
  return rewrite ? {
    input: ({ url }) => executeRewriteInput(rewrite, basepathRewrite.input({ url })),
    output: ({ url }) => basepathRewrite.output({ url: executeRewriteOutput(rewrite, url) })
  } : basepathRewrite;
}
function executeRewriteInput(rewrite, url) {
  const res = rewrite?.input?.({ url });
  if (res) {
    if (typeof res === "string") return new URL(res);
    else if (res instanceof URL) return res;
  }
  return url;
}
function executeRewriteOutput(rewrite, url) {
  const res = rewrite?.output?.({ url });
  if (res) {
    if (typeof res === "string") return new URL(res);
    else if (res instanceof URL) return res;
  }
  return url;
}

// node_modules/@tanstack/router-core/dist/esm/stores.js
function createNonReactiveMutableStore(initialValue) {
  let value = initialValue;
  return {
    get() {
      return value;
    },
    set(nextOrUpdater) {
      value = functionalUpdate(nextOrUpdater, value);
    }
  };
}
function createNonReactiveReadonlyStore(read) {
  return { get() {
    return read();
  } };
}
function createRouterStores(initialLocation, config) {
  const { createMutableStore, createReadonlyStore, batch: batch2 } = config;
  const byRoute = /* @__PURE__ */ new Map();
  const status = createMutableStore("idle");
  const location = createMutableStore(initialLocation);
  const resolvedLocation = createMutableStore(void 0);
  const ids = createMutableStore([]);
  const matches = createReadonlyStore(() => ids.get().map((id) => byRoute.get(id).get()));
  const __store = createReadonlyStore(() => ({
    status: status.get(),
    isLoading: status.get() === "pending",
    matches: matches.get(),
    location: location.get(),
    resolvedLocation: resolvedLocation.get()
  }));
  function getMatchStore(routeId) {
    let matchStore = byRoute.get(routeId);
    if (!matchStore) {
      matchStore = createMutableStore(void 0);
      byRoute.set(routeId, matchStore);
    }
    return matchStore;
  }
  const store = {
    status,
    location,
    resolvedLocation,
    ids,
    matches,
    byRoute,
    __store,
    getMatchStore,
    setMatches
  };
  function setMatches(nextMatches) {
    const previousIds = ids.get();
    const nextIds = nextMatches.map((match) => match.routeId);
    batch2(() => {
      if (!arraysEqual(previousIds, nextIds)) ids.set(nextIds);
      for (const id of previousIds) if (!nextIds.includes(id)) byRoute.get(id).set(() => void 0);
      for (const nextMatch of nextMatches) {
        const matchStore = getMatchStore(nextMatch.routeId);
        if (matchStore.get() !== nextMatch) matchStore.set(nextMatch);
      }
    });
  }
  return store;
}

// node_modules/@tanstack/history/dist/esm/index.js
var stateIndexKey = "__TSR_index";
var popStateEvent = "popstate";
var beforeUnloadEvent = "beforeunload";
var protocolRelativePrefix = /^[\x00-\x20]*(?:[\\/][\t\n\r]*){2,}/;
function normalizeProtocolRelative(url) {
  const match = protocolRelativePrefix.exec(url);
  return match ? "/" + url.slice(match[0].length) : url;
}
function normalizeHref(href) {
  if (/[\x00-\x1f\x7f]/.test(href)) href = href.replace(/[\x00-\x1f\x7f]/g, (character) => "	\n\r".includes(character) ? "" : encodeURIComponent(character));
  return normalizeProtocolRelative(href);
}
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  const notify = (action) => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber({
      location,
      action
    }));
  };
  const handleIndexChange = (action) => {
    if (opts.notifyOnIndexChange ?? true) notify(action);
    else location = opts.getLocation();
  };
  const tryNavigation = async ({ task, navigateOpts, ...actionInfo }) => {
    if (navigateOpts?.ignoreBlocker ?? false) {
      task();
      return;
    }
    const blockers = opts.getBlockers?.() ?? [];
    const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
    if (typeof document !== "undefined" && blockers.length && isPushOrReplace) for (const blocker of blockers) {
      const nextLocation = parseHref(actionInfo.path, actionInfo.state);
      if (await blocker.blockerFn({
        currentLocation: location,
        nextLocation,
        action: actionInfo.type
      })) {
        opts.onBlocked?.();
        return;
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    get length() {
      return opts.getLength();
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex + 1, state);
      tryNavigation({
        task: () => {
          opts.pushState(path, state);
          notify({ type: "PUSH" });
        },
        navigateOpts,
        type: "PUSH",
        path,
        state
      });
    },
    replace: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex, state);
      tryNavigation({
        task: () => {
          opts.replaceState(path, state);
          notify({ type: "REPLACE" });
        },
        navigateOpts,
        type: "REPLACE",
        path,
        state
      });
    },
    go: (index, navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.go(index, navigateOpts?.ignoreBlocker ?? false);
          handleIndexChange({
            type: "GO",
            index
          });
        },
        navigateOpts,
        type: "GO"
      });
    },
    back: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.back(navigateOpts?.ignoreBlocker ?? false);
          handleIndexChange({ type: "BACK" });
        },
        navigateOpts,
        type: "BACK"
      });
    },
    forward: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.forward(navigateOpts?.ignoreBlocker ?? false);
          handleIndexChange({ type: "FORWARD" });
        },
        navigateOpts,
        type: "FORWARD"
      });
    },
    canGoBack: () => location.state[stateIndexKey] !== 0,
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      if (!opts.setBlockers) return () => {
      };
      const blockers = opts.getBlockers?.() ?? [];
      opts.setBlockers([...blockers, blocker]);
      return () => {
        const blockers2 = opts.getBlockers?.() ?? [];
        opts.setBlockers?.(blockers2.filter((b) => b !== blocker));
      };
    },
    flush: () => opts.flush?.(),
    destroy: () => opts.destroy?.(),
    notify,
    _getBlockers: () => opts.getBlockers?.() ?? []
  };
}
function assignKeyAndIndex(index, state) {
  const key = createRandomKey();
  return {
    ...state,
    key,
    __TSR_key: key,
    [stateIndexKey]: index
  };
}
function createBrowserHistory(opts) {
  const win = opts?.window ?? (typeof document !== "undefined" ? window : void 0);
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  const createHref = (path) => normalizeHref(opts?.createHref ? opts.createHref(path) : path);
  const parseLocation = opts?.parseLocation ?? (() => parseHref(`${win.location.pathname}${win.location.search}${win.location.hash}`, win.history.state));
  if (!win.history.state?.__TSR_key && !win.history.state?.key) {
    const addedKey = createRandomKey();
    win.history.replaceState({
      [stateIndexKey]: 0,
      key: addedKey,
      __TSR_key: addedKey
    }, "");
  }
  let currentLocation = parseLocation();
  let rollbackLocation;
  let nextPopIsGo = false;
  let ignoreNextPop = false;
  let skipBlockerNextPop = false;
  let ignoreNextBeforeUnload = false;
  const getLocation = () => currentLocation;
  let next;
  const flush2 = () => {
    if (!next) return;
    history2._ignoreSubscribers = true;
    (next[2] ? win.history.pushState : win.history.replaceState)(next[1], "", next[0]);
    history2._ignoreSubscribers = false;
    next = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (isPush, destHref, state) => {
    const href = opts?.createHref ? createHref(destHref) : void 0;
    const hasPendingAction = !!next;
    if (!hasPendingAction) rollbackLocation = currentLocation;
    currentLocation = parseHref(destHref, state);
    next = [
      href ?? currentLocation.href,
      state,
      next?.[2] || isPush
    ];
    if (!hasPendingAction) queueMicrotask(() => flush2());
  };
  const onPushPop = (type) => {
    currentLocation = parseLocation();
    history2.notify({ type });
  };
  const onPushPopEvent = async () => {
    ignoreNextBeforeUnload = false;
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }
    const nextLocation = parseLocation();
    const delta = nextLocation.state[stateIndexKey] - currentLocation.state[stateIndexKey];
    const isForward = delta === 1;
    const isBack = delta === -1;
    const isGo = !isForward && !isBack || nextPopIsGo;
    nextPopIsGo = false;
    const action = isGo ? "GO" : isBack ? "BACK" : "FORWARD";
    const notify = isGo ? {
      type: "GO",
      index: delta
    } : { type: isBack ? "BACK" : "FORWARD" };
    if (skipBlockerNextPop) skipBlockerNextPop = false;
    else {
      const blockers2 = _getBlockers();
      if (typeof document !== "undefined" && blockers2.length) {
        for (const blocker of blockers2) if (await blocker.blockerFn({
          currentLocation,
          nextLocation,
          action
        })) {
          ignoreNextPop = true;
          win.history.go(-delta);
          history2.notify(notify);
          return;
        }
      }
    }
    currentLocation = parseLocation();
    history2.notify(notify);
  };
  const onBeforeUnload = (e) => {
    if (ignoreNextBeforeUnload) {
      ignoreNextBeforeUnload = false;
      return;
    }
    let shouldBlock = false;
    const blockers2 = _getBlockers();
    if (typeof document !== "undefined" && blockers2.length) for (const blocker of blockers2) {
      const shouldHaveBeforeUnload = blocker.enableBeforeUnload ?? true;
      if (shouldHaveBeforeUnload === true) {
        shouldBlock = true;
        break;
      }
      if (typeof shouldHaveBeforeUnload === "function" && shouldHaveBeforeUnload() === true) {
        shouldBlock = true;
        break;
      }
    }
    if (shouldBlock) {
      e.preventDefault();
      return e.returnValue = "";
    }
  };
  const history2 = createHistory({
    getLocation,
    getLength: () => win.history.length,
    pushState: (href, state) => queueHistoryAction(true, href, state),
    replaceState: (href, state) => queueHistoryAction(false, href, state),
    back: (ignoreBlocker) => {
      if (ignoreBlocker) {
        skipBlockerNextPop = true;
        ignoreNextBeforeUnload = true;
      }
      return win.history.back();
    },
    forward: (ignoreBlocker) => {
      if (ignoreBlocker) {
        skipBlockerNextPop = true;
        ignoreNextBeforeUnload = true;
      }
      win.history.forward();
    },
    go: (n, ignoreBlocker) => {
      nextPopIsGo = true;
      if (ignoreBlocker) {
        skipBlockerNextPop = true;
        ignoreNextBeforeUnload = true;
      }
      win.history.go(n);
    },
    createHref: (href) => createHref(href),
    flush: flush2,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
      win.removeEventListener(popStateEvent, onPushPopEvent);
    },
    onBlocked: () => {
      if (rollbackLocation && currentLocation !== rollbackLocation) currentLocation = rollbackLocation;
    },
    getBlockers: _getBlockers,
    setBlockers: _setBlockers,
    notifyOnIndexChange: false
  });
  history2._ignoreNextBeforeUnload = (href) => {
    ignoreNextBeforeUnload = false;
    try {
      href = new URL(href, win.document.baseURI).href;
      ignoreNextBeforeUnload = /^https?:/.test(href) && (!href.includes("#") || href.split("#")[0] !== win.location.href.split("#")[0]);
    } catch {
    }
  };
  win.addEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
  win.addEventListener(popStateEvent, onPushPopEvent);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history2._ignoreSubscribers) onPushPop("PUSH");
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history2._ignoreSubscribers) onPushPop("REPLACE");
    return res;
  };
  return history2;
}
function parseHref(href, state) {
  const sanitizedHref = normalizeHref(href);
  const hashIndex = sanitizedHref.indexOf("#");
  const searchIndex = sanitizedHref.indexOf("?");
  if (!state) {
    const key = createRandomKey();
    state = {
      [stateIndexKey]: 0,
      key,
      __TSR_key: key
    };
  }
  return {
    href: sanitizedHref,
    pathname: sanitizedHref.substring(0, hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : sanitizedHref.length),
    hash: hashIndex > -1 ? sanitizedHref.substring(hashIndex) : "",
    search: searchIndex > -1 ? sanitizedHref.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

// node_modules/@tanstack/router-core/dist/esm/router.js
function isExternalUrl(url, origin) {
  return url.protocol !== "http:" && url.protocol !== "https:" || url.origin !== origin || !!url.username || !!url.password;
}
function getUrlPath(url) {
  return url.pathname + url.search + url.hash;
}
function routeNeedsLoad(route) {
  return route.options.loader || route.options.beforeLoad || route.lazyFn || route.options.component?.preload || route.options.pendingComponent?.preload;
}
function getLocationChangeInfo(location, resolvedLocation) {
  return {
    fromLocation: resolvedLocation,
    toLocation: location,
    pathChanged: resolvedLocation?.pathname !== location.pathname,
    hrefChanged: resolvedLocation?.href !== location.href,
    hashChanged: resolvedLocation?.hash !== location.hash
  };
}
function _getUserHistoryState({ key: _key, __TSR_key: _tsrKey, __TSR_index: _tsrIndex, __hashScrollIntoViewOptions: _hashScroll, ...state }) {
  return state;
}
function lifecycleEnd(matches) {
  return matches.findIndex((match) => match.status === "error" || match.status === "notFound" || match._notFound) + 1;
}
function runRouteLifecycle(router, previous, matches, previousEnd, nextEnd, owner) {
  if (previousEnd) previous = previous.slice(0, previousEnd);
  if (nextEnd) matches = matches.slice(0, nextEnd);
  for (const match of previous) {
    if (owner && router._tx !== owner) return;
    if (!matches.some((candidate) => candidate.routeId === match.routeId)) router.routesById[match.routeId].options.onLeave?.(match);
  }
  for (const match of matches) {
    if (owner && router._tx !== owner) return;
    router.routesById[match.routeId].options[previous.some((candidate) => candidate.routeId === match.routeId) ? "onStay" : "onEnter"]?.(match);
  }
}
var RouterCore = class {
  /**
  * @deprecated Use the `createRouter` function instead
  */
  constructor(options, getStoreConfig) {
    this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
    this._scroll = { n: true };
    this.subscribers = /* @__PURE__ */ new Set();
    this._cache = /* @__PURE__ */ new Map();
    this._committed = [];
    this.startTransition = async (fn) => {
      fn();
      return false;
    };
    this.update = (newOptions) => {
      if (false) {
        if (newOptions.notFoundRoute) console.warn("The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.");
      }
      const prevOptions = this.options;
      this.options = {
        ...prevOptions,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? isServer ?? typeof document === "undefined";
      if (!(isServer ?? this.isServer)) this.staticLocations = /* @__PURE__ */ new WeakMap();
      this.protocolAllowlist = new Set(this.options.protocolAllowlist);
      if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) {
        if (!(isServer ?? this.isServer)) this.history = createBrowserHistory();
      } else this.history = this.options.history;
      this.origin = this.options.origin;
      if (!this.origin) if (!(isServer ?? this.isServer) && window?.origin && window.origin !== "null") this.origin = window.origin;
      else this.origin = "http://localhost";
      const nextBasepath = this.options.basepath ?? "/";
      const nextRewriteOption = this.options.rewrite;
      const rewriteChanged = this.basepath !== nextBasepath || prevOptions?.rewrite !== nextRewriteOption || prevOptions?.caseSensitive !== this.options.caseSensitive;
      if (rewriteChanged) {
        this.basepath = nextBasepath;
        this.rewrite = nextBasepath !== "/" && trimPath(nextBasepath) ? rewriteBasepath(nextBasepath, this.options.caseSensitive, nextRewriteOption) : nextRewriteOption;
      }
      if (this.history) this.updateLatestLocation();
      if (this.options.routeTree !== this.routeTree || (isServer ?? this.isServer) && prevOptions?.caseSensitive !== this.options.caseSensitive) {
        this.routeTree = this.options.routeTree;
        let processRouteTreeResult;
        if ((isServer ?? this.isServer) && globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree && globalThis.__TSR_CACHE__.caseSensitive === this.options.caseSensitive) processRouteTreeResult = globalThis.__TSR_CACHE__.processRouteTreeResult;
        else {
          processRouteTreeResult = this.buildRouteTree();
          if ((isServer ?? this.isServer) && globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
            routeTree: this.routeTree,
            caseSensitive: this.options.caseSensitive,
            processRouteTreeResult
          };
        }
        this.setRoutes(processRouteTreeResult);
      }
      if (!this.stores) {
        if (this.latestLocation) {
          const config = this.getStoreConfig(this);
          this.batch = config.batch;
          this.stores = createRouterStores(this.latestLocation, config);
          if (!(isServer ?? this.isServer)) setupScrollRestoration(this);
        }
      } else if (rewriteChanged) this.stores.location.set(this.latestLocation);
    };
    this.updateLatestLocation = () => {
      this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
    };
    this.buildRouteTree = () => {
      const result = processRouteTree(this.routeTree, this.options.caseSensitive);
      if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
      return {
        ...result,
        resolvePathCache: createSieveCache(1e3)
      };
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      for (const listener of this.subscribers) if (listener.eventType === routerEvent.type) try {
        listener.fn(routerEvent);
      } catch (e) {
        console.error(e);
      }
    };
    this.parseLocation = (locationToParse, previousLocation) => {
      const parse = ({ pathname, search, hash, href }, state) => {
        if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
          const parsedSearch2 = this.options.parseSearch(search);
          const searchStr2 = this.options.stringifySearch(parsedSearch2);
          return {
            href: pathname + searchStr2 + hash,
            publicHref: pathname + searchStr2 + hash,
            pathname: decodePath(pathname),
            external: false,
            searchStr: searchStr2,
            search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch2),
            hash: decodePath(hash.slice(1)),
            state: replaceEqualDeep(previousLocation?.state, state)
          };
        }
        const url = executeRewriteInput(this.rewrite, new URL(href, this.origin));
        const parsedSearch = this.options.parseSearch(url.search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        url.search = searchStr;
        return {
          href: url.href.replace(url.origin, ""),
          publicHref: href,
          pathname: decodePath(normalizeProtocolRelative(url.pathname)),
          external: !!this.rewrite && isExternalUrl(url, this.origin),
          searchStr,
          search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
          hash: decodePath(url.hash.slice(1)),
          state: replaceEqualDeep(previousLocation?.state, state)
        };
      };
      const location = parse(locationToParse, locationToParse.state);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation, {
          ...__tempLocation.state,
          __tempLocation: void 0,
          key: location.state.key,
          __TSR_key: location.state.__TSR_key
        });
        parsedTempLocation.maskedLocation = location;
        return parsedTempLocation;
      }
      return location;
    };
    this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
      if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
        pathname: pathnameOrNext,
        search: locationSearchOrOpts
      }, opts);
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    };
    this.getMatchedRoutes = (pathname) => {
      const rawParams = /* @__PURE__ */ Object.create(null);
      const match = findRouteMatch(trimPathRight(pathname), this.processedTree, true);
      if (match) Object.assign(rawParams, match.rawParams);
      return [
        match?.branch || [this.routesById["__root__"]],
        rawParams,
        match?.route
      ];
    };
    this.buildLocation = (opts) => {
      if (!(isServer ?? this.isServer)) {
        const cached = this.staticLocations.get(opts);
        if (cached) return cached;
      }
      let usedCurrent = false;
      const build = (dest = {}) => {
        if (dest.href) {
          const parsed = parseHref(dest.href, {});
          dest = {
            ...dest,
            to: executeRewriteInput(this.rewrite, new URL(parsed.pathname, this.origin)).pathname,
            search: this.options.parseSearch(parsed.search),
            hash: parsed.hash.slice(1)
          };
        }
        const currentLocation = dest._fromLocation || this._pendingLocation || this.latestLocation;
        let lightweight;
        const current = () => {
          usedCurrent = true;
          return currentLocation;
        };
        const currentMatch = () => {
          usedCurrent = true;
          return lightweight ??= this.matchRoutesLightweight(currentLocation);
        };
        if (false) {
          const [allFromMatches] = this.getMatchedRoutes(dest.from);
          const [matchedRoutes, fullPath2] = currentMatch();
          const matchedFrom = findLast(matchedRoutes, (d) => {
            return comparePaths(d.fullPath, dest.from);
          });
          const matchedCurrent = findLast(allFromMatches, (d) => {
            return comparePaths(d.fullPath, fullPath2);
          });
          if (!matchedFrom && !matchedCurrent) console.warn(`Could not find match for from: ${dest.from}`);
        }
        const to = dest.to ? `${dest.to}` : ".";
        const nextTo = resolvePath(to[0] === "/" ? "" : dest.unsafeRelative === "path" ? current().pathname : dest.from ?? currentMatch()[1], to, this.options.trailingSlash, this.resolvePathCache);
        const destRoute = this.routesByPath[trimPathRight(nextTo)];
        const isTemplate = nextTo.includes("$");
        let destRoutes;
        if (destRoute) destRoutes = destRoute._branch ??= buildRouteBranch(destRoute);
        else if (isTemplate) destRoutes = [];
        else {
          const [matchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(nextTo);
          destRoutes = matchedRoutes;
          if (this.options.notFoundRoute && (!foundRoute || foundRoute.path !== "/" && rawParams["**"])) destRoutes = [...destRoutes, this.options.notFoundRoute];
        }
        const interpolation = isTemplate ? destRoute?._interpolation ?? parseSegments(false, { fullPath: nextTo }, 0) : void 0;
        let nextParams;
        for (const route of destRoutes) {
          const fn = route.options.params?.stringify ?? route.options.stringifyParams;
          if (fn) {
            const fromParams = currentMatch()[3];
            nextParams ??= resolveNextParams(dest.params, fromParams);
            if (!hasKeys(nextParams)) break;
            if (nextParams === fromParams) nextParams = Object.assign(createNull(), nextParams);
            try {
              Object.assign(nextParams, fn(nextParams));
            } catch {
            }
          }
        }
        nextParams ??= resolveNextParams(dest.params, needsInheritedParams(dest.params, interpolation) ? currentMatch()[3] : EMPTY_RECORD);
        const nextPathname = opts.leaveParams ? nextTo : normalizeProtocolRelative(decodePath(interpolation ? interpolatePath(nextTo, interpolation, nextParams, this.pathParamsDecoder) : nextTo));
        if (false) try {
          const foundRoute = this.getMatchedRoutes(nextPathname)[2];
          if (foundRoute?.id !== destRoute.id) console.warn(`Generated path "${nextPathname}" for route "${destRoute.id}" matched route "${foundRoute?.id}" instead. This can happen when multiple route templates resolve to the same URL. Use the route template that matches the intended route, or adjust params.stringify if it changed the target path.`);
        } catch {
        }
        const middlewares = getSearchMiddlewares(destRoutes, opts._includeValidateSearch);
        const fromSearch = () => {
          let search = currentMatch()[2];
          if (opts._includeValidateSearch && this.options.search?.strict) {
            const validatedSearch = {};
            destRoutes.forEach((route) => {
              if (route.options.validateSearch) try {
                Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
                  ...validatedSearch,
                  ...search
                }));
              } catch {
              }
            });
            search = validatedSearch;
          }
          return search;
        };
        const nextSearch = middlewares.length ? applySearchMiddleware(middlewares, fromSearch(), dest) : dest.search === true ? fromSearch() : typeof dest.search === "function" ? dest.search(fromSearch()) : dest.search || EMPTY_RECORD;
        const searchStr = this.options.stringifySearch(nextSearch);
        const hash = dest.hash === true ? current().hash : typeof dest.hash === "function" ? dest.hash(current().hash) : dest.hash || void 0;
        const hashStr = hash ? `#${hash}` : "";
        const nextState = !dest.state ? EMPTY_RECORD : dest.state === true ? current().state : typeof dest.state === "function" ? dest.state(current().state) : dest.state;
        const fullPath = `${nextPathname}${searchStr}${hashStr}`;
        let href;
        let publicHref;
        let external = false;
        if (this.rewrite) {
          const url = new URL(fullPath, this.origin);
          const origin = url.origin;
          const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
          href = getUrlPath(url);
          if (isExternalUrl(rewrittenUrl, origin)) {
            publicHref = rewrittenUrl.href;
            external = true;
          } else publicHref = normalizeProtocolRelative(getUrlPath(rewrittenUrl));
        } else {
          href = encodePathLikeUrl(fullPath);
          publicHref = href;
        }
        return {
          publicHref,
          href,
          pathname: nextPathname,
          search: nextSearch,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          external,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const next = build(opts);
      if (opts.mask) next.maskedLocation = build({
        from: opts.from,
        ...opts.mask
      });
      else if (this.options.routeMasks) {
        const match = findFlatMatch(next.pathname, this.processedTree);
        if (match) {
          const params = Object.assign(createNull(), match.rawParams);
          const { from: _from, params: maskParams, ...maskProps } = match.route;
          const nextParams = resolveNextParams(maskParams, params);
          next.maskedLocation = build({
            from: opts.from,
            ...maskProps,
            params: nextParams
          });
        }
      }
      if (!(isServer ?? this.isServer) && !usedCurrent && opts._fromLocation && !next.maskedLocation) this.staticLocations.set(opts, next);
      return next;
    };
    this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
      if (isServer ?? this.isServer) return;
      const nextLocation = next.maskedLocation ?? next;
      if (nextLocation.external && !(isServer ?? this.isServer)) return documentNavigation(this, nextLocation.publicHref, {
        replace: next.replace,
        ignoreBlocker
      });
      let historyAction;
      const isSameLocation = trimPathRight(this.latestLocation.href) === trimPathRight(next.href) && deepEqual(_getUserHistoryState(next.state), _getUserHistoryState(this.latestLocation.state));
      const previousCommitPromise = this._commitPromise;
      let resolve;
      const commitPromise = new Promise((done) => {
        resolve = done;
      });
      commitPromise.resolve = () => {
        resolve();
        previousCommitPromise?.resolve();
      };
      this._commitPromise = commitPromise;
      if (isSameLocation) this.load();
      else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  __TSR_key: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) nextHistory.state.__tempKey = this.tempLocationKey;
        }
        nextHistory.state = {
          ...nextHistory.state,
          __hashScrollIntoViewOptions: hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true
        };
        this.shouldViewTransition = viewTransition;
        historyAction = next.replace ? "REPLACE" : "PUSH";
        this.history[historyAction === "REPLACE" ? "replace" : "push"](nextHistory.publicHref, nextHistory.state, { ignoreBlocker });
        if (!this.history.subscribers.size) this.load({ action: { type: historyAction } });
      }
      this._scroll.n = next.resetScroll ?? true;
      return this._commitPromise;
    };
    this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, ...rest } = {}) => {
      if (isServer ?? this.isServer) return Promise.resolve();
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      this._pendingLocation = location;
      const commitPromise = this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
      queueMicrotask(() => {
        if (this._pendingLocation === location) this._pendingLocation = void 0;
      });
      return commitPromise;
    };
    this.navigate = async ({ to, reloadDocument, href, publicHref, ...rest }) => {
      if (isServer ?? this.isServer) return;
      const hrefScheme = href ? getUrlScheme(href) : void 0;
      if (hrefScheme || reloadDocument) {
        if (to !== void 0 || !href) {
          const location = this.buildLocation({
            to,
            ...rest
          });
          const publicLocation = location.maskedLocation ?? location;
          href ??= publicLocation.publicHref;
          publicHref ??= publicLocation.publicHref;
        }
        const reloadHref = !hrefScheme && publicHref ? publicHref : href;
        return documentNavigation(this, reloadHref, rest);
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to,
        _isNavigate: true
      });
    };
    this.load = async (opts) => {
      if (isServer ?? this.isServer) return loadServerRoute(this, opts);
      this.updateLatestLocation();
      if (opts?.action) this._scroll.h = opts.action.type === "PUSH" || opts.action.type === "REPLACE";
      await loadClientRoute(this, opts);
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      this.shouldViewTransition = void 0;
      if (shouldViewTransition && !(isServer ?? typeof document === "undefined") && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && window.CSS?.supports?.("selector(:active-view-transition-type(a))")) {
          const next = this.latestLocation;
          const prevLocation = this.stores.resolvedLocation.get();
          const resolvedViewTransitionTypes = typeof shouldViewTransition.types === "function" ? shouldViewTransition.types(getLocationChangeInfo(next, prevLocation)) : shouldViewTransition.types;
          if (resolvedViewTransitionTypes === false) return fn();
          startViewTransitionParams = {
            update: fn,
            types: resolvedViewTransitionTypes
          };
        } else startViewTransitionParams = fn;
        return document.startViewTransition(startViewTransitionParams).updateCallbackDone;
      }
      return fn();
    };
    this.invalidate = (opts) => {
      const committedMatches = this._committed;
      const filter = opts?.filter;
      const preloads = this._preloads;
      const invalidIds = /* @__PURE__ */ new Set();
      const consider = (match) => {
        if (!filter || filter(match)) invalidIds.add(match.id);
      };
      committedMatches.forEach(consider);
      this._cache.forEach(consider);
      preloads?.forEach((matches) => matches.forEach(consider));
      this._tx?.[3].forEach(consider);
      const abort = [];
      for (const [controller, matches] of preloads ?? []) if (matches.some((match) => invalidIds.has(match.id))) {
        preloads.delete(controller);
        abort.push(controller);
      }
      const invalidate = (d) => {
        if (invalidIds.has(d.id)) {
          const route = this.routesById[d.routeId];
          const next = {
            ...d,
            invalid: true,
            ...(opts?.forcePending || d.status === "error" || d.status === "notFound") && routeNeedsLoad(route) ? {
              status: "pending",
              error: void 0
            } : void 0
          };
          d._flight = void 0;
          return next;
        }
        return d;
      };
      this._committed = committedMatches.map(invalidate);
      for (const [id, match] of this._cache) if (invalidIds.has(id)) {
        match.invalid = true;
        if (opts?.forcePending) match.status = "pending";
      }
      for (const id of invalidIds) {
        const flight = this._flights?.get(id);
        this._flights?.delete(id);
        if (flight && !flight[2]) abort.push(flight[1]);
      }
      for (const controller of abort) controller.abort();
      this.shouldViewTransition = false;
      return this.load({ sync: opts?.sync });
    };
    this.resolveRedirect = (redirect2) => {
      const options2 = redirect2.options;
      let href = redirect2.headers.get("Location") || options2.href;
      if (!href) {
        const location = this.buildLocation(options2);
        href = (location.maskedLocation ?? location).publicHref || "/";
      }
      let scheme;
      if (protocolRelativePrefixRegex.test(href) || (scheme = getUrlScheme(href)) && !this.protocolAllowlist.has(scheme)) throw new Error(false ? `Redirect blocked: unsafe protocol in href "${href}". Allowed protocols: ${Array.from(this.protocolAllowlist).join(", ")}.` : "Redirect blocked: unsafe protocol");
      if (scheme === "http:" || scheme === "https:") {
        const url = new URL(href);
        if (url.pathname.startsWith("//")) href = url.href;
        else if (!isExternalUrl(url, this.origin)) {
          href = getUrlPath(url);
          scheme = void 0;
        }
      }
      if (scheme) options2.reloadDocument = true;
      options2.href = href;
      redirect2.headers.set("Location", href);
      return redirect2;
    };
    this.clearCache = (opts) => {
      const cached = this._cache;
      const preloads = this._preloads;
      const filter = opts?.filter;
      const discarded = [];
      const discardedIds = [];
      for (const [id, match] of cached) if (!filter || filter(match)) {
        discardedIds.push(id);
        discarded.push(match);
      }
      const abort = [];
      for (const [controller, matches] of preloads ?? []) if (!filter || matches.some(filter)) {
        abort.push(controller);
        discarded.push(...matches);
      }
      for (const id of discardedIds) cached.delete(id);
      for (const controller of abort) preloads.delete(controller);
      for (const match of discarded) {
        const flight = match._flight;
        match._flight = void 0;
        if (flight && !--flight[2]) {
          if (this._flights?.get(match.id) === flight) this._flights.delete(match.id);
          abort.push(flight[1]);
        }
      }
      for (const controller of abort) controller.abort();
    };
    this.loadRouteChunk = loadRouteChunk;
    this.preloadRoute = (opts) => preloadClientRoute(this, opts);
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? resolvePath(location.from || "", location.to, this.options.trailingSlash, this.resolvePathCache) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      const isPending = this.stores.status.get() === "pending";
      if (opts?.pending && !isPending) return false;
      const baseLocation = opts?.pending ?? !isPending ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
      const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
      if (!match) return false;
      if (location.params) {
        if (!deepEqual(match.rawParams, location.params, true)) return false;
      }
      if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, true) ? match.rawParams : false;
      return match.rawParams;
    };
    this.getStoreConfig = getStoreConfig;
    if (options.pathParamsAllowedCharacters?.length) this.pathParamsDecoder = compileDecodeCharMap(options.pathParamsAllowedCharacters);
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
    });
    if (!(isServer ?? typeof document === "undefined")) self.__TSR_ROUTER__ = this;
  }
  isShell() {
    return !!this.options.isShell;
  }
  get state() {
    return this.stores.__store.get();
  }
  setRoutes(caches) {
    Object.assign(this, caches);
    this.lightweightCache = /* @__PURE__ */ new WeakMap();
    if (!(isServer ?? this.isServer)) this.staticLocations = /* @__PURE__ */ new WeakMap();
    const notFoundRoute = this.options.notFoundRoute;
    if (notFoundRoute) {
      notFoundRoute.init(99999999999);
      if (this.routesById[notFoundRoute.id] !== notFoundRoute) notFoundRoute._interpolation = parseSegments(false, notFoundRoute, 0);
      this.routesById[notFoundRoute.id] = notFoundRoute;
    }
  }
  matchRoutesInternal(next, opts) {
    const [initialMatchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(next.pathname);
    let matchedRoutes = initialMatchedRoutes;
    let isGlobalNotFound = false;
    if (foundRoute ? foundRoute.path !== "/" && rawParams["**"] : trimPathRight(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
    else isGlobalNotFound = true;
    const _notFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
    const matches = new Array(matchedRoutes.length);
    const committed = this._committed;
    const previousAt = (route, index) => {
      const match = committed[index];
      return match?.routeId === route.id ? match : route === this.options.notFoundRoute ? committed.find((candidate) => candidate.routeId === route.id) : void 0;
    };
    let strictParams;
    for (let index = 0; index < matchedRoutes.length; index++) {
      const route = matchedRoutes[index];
      const parentMatch = matches[index - 1];
      let preMatchSearch;
      let strictMatchSearch;
      let searchError;
      {
        const parentSearch = parentMatch?.search ?? next.search;
        const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
          preMatchSearch = {
            ...parentSearch,
            ...strictSearch
          };
          strictMatchSearch = {
            ...parentStrictSearch,
            ...strictSearch
          };
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
          if (opts?.throwOnError) throw searchParamError;
          preMatchSearch = parentSearch;
          strictMatchSearch = {};
          searchError = searchParamError;
        }
      }
      let loaderDeps = "";
      let loaderDepsHash = "";
      try {
        loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
        loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) || "" : "";
      } catch (cause2) {
        if (opts?.throwOnError) throw cause2;
        searchError ??= cause2;
      }
      const usedParams = createNull();
      const interpolatedPath = route._interpolation ? interpolatePath(route.fullPath, route._interpolation, rawParams, this.pathParamsDecoder, usedParams) : route.fullPath;
      const matchId = route.id + interpolatedPath + loaderDepsHash;
      const previousMatch = previousAt(route, index);
      const existingMatch = false ? void 0 : this._cache.get(matchId) ?? (previousMatch?.id === matchId ? previousMatch : void 0);
      strictParams = existingMatch?._strictParams ?? Object.assign(usedParams, strictParams);
      let paramsError;
      if (!existingMatch) try {
        extractStrictParams(route, strictParams);
      } catch (err) {
        if (isNotFound(err) || isRedirect(err)) paramsError = err;
        else paramsError = new PathParamError(err.message, { cause: err });
        if (opts?.throwOnError) throw paramsError;
      }
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) match = {
        ...existingMatch,
        cause,
        search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
        _strictSearch: strictMatchSearch,
        searchError
      };
      else {
        const status = routeNeedsLoad(route) ? "pending" : "success";
        match = {
          id: matchId,
          ssr: isServer ?? this.isServer ? void 0 : route.options.ssr,
          index,
          routeId: route.id,
          params: previousMatch?.params ?? strictParams,
          _strictParams: strictParams,
          pathname: interpolatedPath,
          updatedAt: Date.now(),
          search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError,
          status,
          isFetching: false,
          error: void 0,
          paramsError,
          context: {},
          abortController: opts?._controller ?? new AbortController(),
          cause,
          loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          staticData: route.options.staticData || {},
          fullPath: route.fullPath
        };
      }
      const _notFound = _notFoundRouteId === route.id;
      if (match._notFound && !_notFound) match.error = void 0;
      match._notFound = _notFound;
      matches[index] = match;
    }
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      match.params = match.cause === "stay" ? nullReplaceEqualDeep(match.params, strictParams) : strictParams;
      if (opts?._controller) match.context = {};
    }
    return matches;
  }
  /**
  * Lightweight route matching for buildLocation.
  * Only computes fullPath, accumulated search, and params - skipping expensive
  * operations like AbortController, loaderDeps, and full match objects.
  */
  matchRoutesLightweight(location) {
    const lastRouteId = last(this.stores.ids.get());
    const lastStateMatch = lastRouteId ? this.stores.byRoute.get(lastRouteId).get() : void 0;
    const lastStateMatchId = lastStateMatch?.id;
    const cached = this.lightweightCache.get(location);
    if (cached && cached[0] === lastStateMatchId) return cached[1];
    const [matchedRoutes, rawParams] = this.getMatchedRoutes(location.pathname);
    const lastRoute = last(matchedRoutes);
    const accumulatedSearch = { ...location.search };
    for (const route of matchedRoutes) try {
      Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
    } catch {
    }
    const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
    let params;
    if (canReuseParams) params = lastStateMatch.params;
    else {
      const strictParams = rawParams;
      for (const route of matchedRoutes) try {
        extractStrictParams(route, strictParams);
      } catch {
      }
      params = strictParams;
    }
    const result = [
      matchedRoutes,
      lastRoute.fullPath,
      accumulatedSearch,
      params
    ];
    this.lightweightCache.set(location, [lastStateMatchId, result]);
    return result;
  }
};
async function documentNavigation(router, href, { replace, ignoreBlocker }) {
  if (isDangerousProtocol(href, router.protocolAllowlist)) {
    if (false) console.warn(`Blocked navigation to dangerous protocol: ${href}`);
    return;
  }
  if (!ignoreBlocker) {
    const blockers = router.history._getBlockers();
    for (const blocker of blockers) if (blocker?.blockerFn) {
      if (await blocker.blockerFn({
        currentLocation: router.history.location,
        nextLocation: router.history.location,
        action: replace ? "REPLACE" : "PUSH"
      })) return;
    }
  }
  router.history._ignoreNextBeforeUnload?.(href);
  if (replace) window.location.replace(href);
  else window.location.href = href;
}
if (false) {
  RouterCore.prototype._replaceRouteChunk = replaceRouteChunk;
  RouterCore.prototype._refreshRoute = async function() {
    this._serverResult = void 0;
    this.updateLatestLocation();
    await refreshClientRoute(this);
  };
}
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
    if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
    return result.value;
  }
  if ("parse" in validateSearch2) return validateSearch2.parse(input);
  if (typeof validateSearch2 === "function") return validateSearch2(input);
  return {};
}
function resolveNextParams(spec, base) {
  if (spec === void 0 || spec === true) return base;
  const next = /* @__PURE__ */ Object.create(null);
  if (spec === false || spec === null) return next;
  if (typeof spec === "function") {
    Object.assign(next, base);
    return Object.assign(next, spec(next));
  }
  return Object.assign(next, base, spec);
}
function needsInheritedParams(spec, interpolation) {
  if (typeof spec === "function") return true;
  if (!interpolation || spec === false || spec === null) return false;
  return spec === void 0 || spec === true || interpolation.some((part) => typeof part !== "string" && !hasOwn.call(spec, part[1]));
}
var EMPTY_RECORD = Object.freeze({});
function getSearchMiddlewares(destRoutes, includeValidateSearch) {
  const middlewares = [];
  for (let i = 0; i < destRoutes.length; i++) {
    const routeOptions = destRoutes[i].options;
    if ("search" in routeOptions) {
      if (routeOptions.search?.middlewares) middlewares.push(...routeOptions.search.middlewares);
    } else if (routeOptions.preSearchFilters || routeOptions.postSearchFilters) {
      const legacyMiddleware = ({ search, next }) => {
        const result = next(routeOptions.preSearchFilters ? routeOptions.preSearchFilters.reduce((prev, next2) => next2(prev), search) : search);
        return routeOptions.postSearchFilters ? routeOptions.postSearchFilters.reduce((prev, next2) => next2(prev), result) : result;
      };
      middlewares.push(legacyMiddleware);
    }
    const routeValidateSearch = routeOptions.validateSearch;
    if (includeValidateSearch && routeValidateSearch) {
      const validate = ({ search, next, meta }) => {
        const result = next(search);
        try {
          const validated = validateSearch(routeValidateSearch, result);
          if (meta && validated) {
            for (const key in validated) if (!(key in result)) (meta.defaulted ||= /* @__PURE__ */ new Map()).set(key, validated[key]);
          }
          return {
            ...result,
            ...validated
          };
        } catch {
        }
        return result;
      };
      middlewares.push(validate);
    }
  }
  return middlewares;
}
function applySearchMiddleware(middlewares, search, dest) {
  const applyNext = (index, currentSearch, meta) => {
    if (index >= middlewares.length) {
      if (!dest.search) return {};
      if (dest.search === true) return currentSearch;
      const result = functionalUpdate(dest.search, currentSearch);
      if (meta) meta.explicit = result;
      return result;
    }
    const next = (newSearch, collectMeta) => {
      if (collectMeta) {
        const nextMeta = meta || {};
        return {
          search: applyNext(index + 1, newSearch, nextMeta),
          meta: nextMeta
        };
      }
      return applyNext(index + 1, newSearch, meta);
    };
    return middlewares[index]({
      search: currentSearch,
      next,
      meta
    });
  };
  return applyNext(0, search);
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
  if (notFoundMode !== "root") {
    let fallback;
    for (let i = routes.length - 1; i >= 0; i--) {
      const route = routes[i];
      if (route.options.notFoundComponent) return route.id;
      fallback ||= route.children && route.id;
    }
    if (fallback) return fallback;
  }
  return rootRouteId;
}
function extractStrictParams(route, accumulatedParams) {
  const parseParams = route.options.params?.parse ?? route.options.parseParams;
  if (parseParams) Object.assign(accumulatedParams, parseParams(accumulatedParams));
}

// node_modules/@tanstack/router-core/dist/esm/load-client.js
function preloadComponent(route, type) {
  return route.options[type]?.preload?.();
}
function loadComponents(route, onPendingReady) {
  const component = preloadComponent(route, "component");
  let pending = preloadComponent(route, "pendingComponent");
  if (onPendingReady) if (pending) pending = pending.then(onPendingReady);
  else onPendingReady();
  if (component && pending) return Promise.all([component, pending]).then(() => {
  });
  return component ?? pending;
}
function loadRouteChunk(route, componentType, onPendingReady) {
  const afterLazy = () => componentType === false ? void 0 : componentType ? preloadComponent(route, componentType) : loadComponents(route, onPendingReady);
  const current = route._lazy;
  if (current) return current === true ? afterLazy() : current.then(afterLazy);
  if (!route.lazyFn) return afterLazy();
  const promise = route.lazyFn().then((lazyRoute) => {
    if (true) {
      const { id: _id, ...options } = lazyRoute.options;
      Object.assign(route.options, options);
      route._lazy = true;
    }
  }, (error) => {
    if (true) route._lazy = void 0;
    throw error;
  });
  route._lazy = promise;
  return promise.then(afterLazy);
}
function _getRenderedMatches(matches) {
  const end = matches.findIndex((match) => match.status !== "success" || match._notFound) + 1;
  return end && end < matches.length ? matches.slice(0, end) : matches;
}
var SUCCESS = 0;
var ERROR = 1;
var NOT_FOUND = 2;
var REDIRECTED = 3;
var CANCELED_OUTCOME = [4];
function isControl(result) {
  return typeof result[0] === "number";
}
function waitFor(value, signal) {
  if (signal.aborted) return Promise.race([Promise.reject(signal), value]);
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal);
    signal.addEventListener("abort", abort, { once: true });
    Promise.resolve(value).then(resolve, reject).then(() => signal.removeEventListener("abort", abort));
  });
}
function getRoute(router, match) {
  return router.routesById[match.routeId];
}
function normalize(value, rejected, routeId) {
  if (isRedirect(value)) return [REDIRECTED, value];
  if (isNotFound(value)) {
    value.routeId ||= routeId;
    return [NOT_FOUND, value];
  }
  if (!rejected) return [SUCCESS, value];
  if (typeof value?.then === "function") value = new Error("A Promise was thrown", { cause: value });
  return [ERROR, value];
}
function normalizeError(route, cause) {
  let outcome = normalize(cause, true, route.id);
  if (outcome[0] !== ERROR) return outcome;
  try {
    route.options.onError?.(outcome[1]);
  } catch (onErrorCause) {
    outcome = normalize(onErrorCause, true, route.id);
  }
  return outcome;
}
function normalizeLaneError(router, lane, route, cause, options) {
  if (options[0].signal.aborted) return CANCELED_OUTCOME;
  return materializeRedirect(router, lane, route, normalizeError(route, cause), options);
}
async function contextualize(router, lane, options, end, planSuccessfulLane, retainedEnd) {
  const [location, matches] = lane;
  const signal = options[0].signal;
  const preload = !!options[3];
  for (let index = options[6] ?? 0; index < end; index++) {
    const match = matches[index];
    const route = getRoute(router, match);
    match.abortController = options[0];
    const parentContext = matches[index - 1]?.context ?? router.options.context ?? {};
    const common = {
      params: match.params,
      location,
      navigate: (opts) => router.navigate({
        ...opts,
        _fromLocation: location
      }),
      buildLocation: router.buildLocation,
      cause: preload ? "preload" : match.cause,
      abortController: options[0],
      preload,
      matches,
      routeId: route.id
    };
    try {
      const routeContext = match._ctx ||= route.options.context ? route.options.context({
        ...common,
        deps: match.loaderDeps,
        context: parentContext
      }) || {} : void 0;
      match.context = {
        ...parentContext,
        ...routeContext
      };
    } catch (cause) {
      releaseFlight(router, match);
      return [index, normalizeLaneError(router, lane, route, cause, options)];
    }
    if (signal.aborted) return [index, CANCELED_OUTCOME];
    const validationError = match.paramsError ?? match.searchError;
    if (validationError !== void 0) {
      releaseFlight(router, match);
      return [index, normalizeLaneError(router, lane, route, validationError, options)];
    }
    const beforeLoad = route.options.beforeLoad;
    if (!beforeLoad) continue;
    const previousStatus = match.status;
    if (index >= retainedEnd) {
      match.status = "pending";
      options[7]?.();
    }
    try {
      setFetching(router, match, "beforeLoad", options[0]);
      const value = beforeLoad({
        ...common,
        search: match.search,
        context: match.context,
        ...router.options.additionalContext
      });
      const result = await (typeof value?.then === "function" ? waitFor(value, signal) : value);
      if (signal.aborted) return [index, CANCELED_OUTCOME];
      const outcome = materializeRedirect(router, lane, route, normalize(result, false, route.id), options);
      if (outcome[0] !== SUCCESS) {
        releaseFlight(router, match);
        return [index, outcome];
      }
      match.context = {
        ...match.context,
        ...result
      };
    } catch (cause) {
      releaseFlight(router, match);
      return [index, normalizeLaneError(router, lane, route, cause, options)];
    } finally {
      match.status = previousStatus;
      setFetching(router, match, false, options[0]);
    }
  }
  planSuccessfulLane();
}
function releaseOwnedFlight(router, match, flight) {
  if (!flight || --flight[2]) return;
  if (router._flights?.get(match.id) === flight) {
    const current = router._tx;
    if (current && !current[0].signal.aborted && !current[3].includes(match) && current[3].some((candidate) => candidate.id === match.id) && current[3].some((candidate) => candidate.isFetching === "beforeLoad")) return;
    router._flights.delete(match.id);
  }
  return flight[1];
}
function releaseFlight(router, match) {
  const flight = match._flight;
  match._flight = void 0;
  releaseOwnedFlight(router, match, flight)?.abort();
}
function transferMatchResources(router, previous, next, deferSameIdFlight) {
  const abort = [];
  for (const match of previous) if (!next?.includes(match)) {
    const flight = match._flight;
    match._flight = void 0;
    if (deferSameIdFlight && flight?.[2] === 1 && router._flights?.get(match.id) === flight && next?.some((candidate) => candidate.id === match.id)) flight[2] = 0;
    else {
      const controller = releaseOwnedFlight(router, match, flight);
      if (controller) abort.push(controller);
    }
  }
  for (const controller of abort) controller.abort();
}
function acquireMatchResources(matches) {
  for (const match of matches) {
    const flight = match._flight;
    if (flight) flight[2]++;
  }
}
function setFetching(router, match, value, owner) {
  match.isFetching = value;
  if (owner && router._tx?.[0] !== owner) return;
  const store = router.stores.byRoute.get(match.routeId);
  const presented = store?.get();
  if (presented?.id === match.id) store.set({
    ...presented,
    isFetching: value
  });
}
function getLoaderContext(router, lane, match, route, controller, parentMatchPromise, preload) {
  const location = lane[0];
  return {
    params: match.params,
    location,
    navigate: (opts) => router.navigate({
      ...opts,
      _fromLocation: location
    }),
    cause: preload ? "preload" : match.cause,
    abortController: controller,
    preload,
    deps: match.loaderDeps,
    parentMatchPromise,
    context: match.context,
    route,
    ...router.options.additionalContext
  };
}
async function loadResource(router, lane, match, route, loader, parentMatchPromise, options) {
  const owner = options[0];
  const signal = owner.signal;
  if (signal.aborted) return CANCELED_OUTCOME;
  if (!loader) return [SUCCESS, void 0];
  let flight = match._flight;
  setFetching(router, match, "loader", owner);
  try {
    if (!flight) {
      const controller = new AbortController();
      flight = [
        Promise.resolve().then(() => loader(getLoaderContext(router, lane, match, route, controller, parentMatchPromise, !!options[3]))).then((value) => normalize(value, false, route.id), (cause) => normalize(cause, true, route.id)).then((result) => {
          if (result[0] !== SUCCESS && router._flights?.get(match.id) === flight) {
            router._flights.delete(match.id);
            if (!flight[2]) controller.abort();
          }
          return result[0] === ERROR && flight[2] ? normalizeError(route, result[1]) : result;
        }),
        controller,
        1
      ];
      (router._flights ??= /* @__PURE__ */ new Map()).set(match.id, flight);
    }
    match._flight = flight;
    match.abortController = flight[1];
    return materializeRedirect(router, lane, route, await waitFor(flight[0], signal), options);
  } catch (cause) {
    if (cause !== signal || !signal.aborted) throw cause;
    releaseFlight(router, match);
    return CANCELED_OUTCOME;
  } finally {
    setFetching(router, match, false, owner);
  }
}
function settleInto(match, result, preload) {
  if (result[0] === REDIRECTED) return;
  match.status = "success";
  match.error = void 0;
  if (result[0] === SUCCESS) {
    match.loaderData = result[1];
    match.invalid = false;
    match.updatedAt = Date.now();
    match.preload = preload;
  } else match.invalid = true;
}
function cacheLoaderMatch(router, match, planned) {
  const current = router._cache.get(match.id);
  if (current !== planned || router._committed.some((candidate) => candidate.id === match.id && candidate._flight === match._flight)) return;
  const cached = {
    ...match,
    _notFound: void 0,
    context: {}
  };
  if (cached._flight) cached._flight[2]++;
  router._cache.set(match.id, cached);
  if (current) releaseFlight(router, current);
}
function getParentSnapshot(match, outcome) {
  if (outcome[0] === ERROR || outcome[0] === NOT_FOUND) return {
    ...match,
    status: outcome[0] === ERROR ? "error" : "notFound",
    error: outcome[1],
    _flight: void 0
  };
  return match;
}
function createLoaderTask(router, lane, index, tasks, semanticParent, options, retainedEnd) {
  const match = lane[1][index];
  const route = getRoute(router, match);
  const preload = !!options[3];
  const plannedCacheMatch = router._cache.get(match.id);
  let configured;
  let reload = false;
  let reloadFailure;
  try {
    if (match.status === "success") {
      configured = route.options.shouldReload;
      if (typeof configured === "function") configured = configured(getLoaderContext(router, lane, match, route, options[0], semanticParent, preload));
      if (options[0].signal.aborted) reloadFailure = CANCELED_OUTCOME;
    }
    if (!reloadFailure) if (match.status !== "success") reload = true;
    else {
      const staleAge = preload || match.preload ? route.options.preloadStaleTime ?? router.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? router.options.defaultStaleTime ?? 0;
      reload = !!(match.invalid || configured || configured === void 0 && Date.now() - match.updatedAt >= staleAge && (options[5] || match.cause === "enter" || options[2].some((candidate2) => candidate2.routeId === match.routeId && candidate2.id !== match.id)));
    }
  } catch (cause) {
    match.invalid = true;
    releaseFlight(router, match);
    reloadFailure = normalizeLaneError(router, lane, route, cause, options);
  }
  const routeLoader = route.options.loader;
  const isLoaderFn = typeof routeLoader === "function";
  const loader = isLoaderFn ? routeLoader : routeLoader?.handler;
  const preloadable = !preload || route.options.preload !== false;
  let donor = preloadable && routeLoader && true ? router._flights?.get(match.id) : void 0;
  if (donor === match._flight || reloadFailure) donor = void 0;
  else if (donor && !reload && !preload && configured === void 0) reload = true;
  else if (!reload) donor = void 0;
  const background = !!(routeLoader && reload && match.status === "success" && !preload && !options[4] && ((isLoaderFn ? void 0 : routeLoader.staleReloadMode) ?? router.options.defaultStaleReloadMode) !== "blocking");
  const loaded = reload && preloadable;
  const blocking = loaded && !background && (match.status !== "success" || !!routeLoader);
  const onReady = index >= retainedEnd ? options[7] : void 0;
  const onLazyReady = route.lazyFn && route._lazy !== true ? onReady : void 0;
  if (loaded && !routeLoader) {
    match.invalid = false;
    match.updatedAt = Date.now();
  }
  if (donor) donor[2]++;
  if (blocking) {
    const acceptedFlight = match._flight;
    match._flight = donor;
    releaseOwnedFlight(router, match, acceptedFlight)?.abort();
    if (index >= retainedEnd) match.status = "pending";
    onReady?.();
  }
  if (!loaded) match.isFetching = false;
  const outcome = !reloadFailure && blocking ? loadResource(router, lane, match, route, loader, semanticParent, options).then((result) => {
    settleInto(match, result, preload);
    if (result[0] === SUCCESS) {
      if (routeLoader && !options[0].signal.aborted) cacheLoaderMatch(router, match, plannedCacheMatch);
      if (index >= retainedEnd) match.status = "pending";
    }
    return result;
  }) : Promise.resolve(reloadFailure ?? [SUCCESS, match.loaderData]);
  const chunkFailure = (async () => {
    try {
      const chunk = loadRouteChunk(route, void 0, onLazyReady);
      if (chunk) await waitFor(chunk, options[0].signal);
    } catch (cause) {
      if (!lane[1].some((candidate2, candidateIndex) => candidateIndex <= index && (candidate2.status === "error" || candidate2.status === "notFound" || candidate2._notFound))) return [index, normalizeLaneError(router, lane, route, cause, options)];
    }
    const result = await outcome;
    if (blocking && result[0] === SUCCESS && match.status === "pending" && !options[0].signal.aborted) {
      match.status = "success";
      onReady?.();
    }
  })();
  tasks.push([
    index,
    outcome,
    chunkFailure
  ]);
  if (!background) return outcome.then((result) => getParentSnapshot(match, result));
  const candidate = {
    ...match,
    status: "pending",
    preload: false,
    _flight: donor
  };
  match.invalid = false;
  match.isFetching = "loader";
  const backgroundOutcome = loadResource(router, lane, candidate, route, loader, semanticParent, options).then((result) => {
    match.isFetching = false;
    settleInto(candidate, result, false);
    return result;
  });
  (lane[2] ??= []).push([
    index,
    backgroundOutcome,
    chunkFailure,
    candidate
  ]);
  return backgroundOutcome.then((result) => getParentSnapshot(candidate, result));
}
async function getNotFoundBoundary(router, matches, indexed, signal, fallback = 0) {
  const cause = indexed?.[1][1];
  let index = cause?.routeId ? matches.findIndex((match) => match.routeId === cause.routeId) : indexed?.[0] ?? matches.length - 1;
  if (index < 0) index = 0;
  for (let i = index; i >= 0; i--) {
    const route = getRoute(router, matches[i]);
    try {
      const loading = loadRouteChunk(route, false);
      if (loading) await waitFor(loading, signal);
    } catch (cause2) {
      if (cause2 === signal && signal.aborted) throw cause2;
    }
    if (route.options.notFoundComponent) return i;
  }
  return cause?.routeId ? index : fallback;
}
function discardBackground(router, lane) {
  if (lane[2]) {
    transferMatchResources(router, lane[2].map((task) => task[3]));
    lane[2] = void 0;
  }
}
async function settleTasks(tasks, serialFailure, redirectTasks, gate) {
  let loaderFailure;
  try {
    await Promise.all(tasks.map((task) => task[1].then(async (outcome) => {
      const taskIndex = task[0];
      if (gate && taskIndex >= await gate) return;
      if (outcome[0] >= REDIRECTED) throw [taskIndex, outcome];
      if (!loaderFailure && outcome[0] !== SUCCESS) {
        loaderFailure = [taskIndex, outcome];
        await Promise.all((redirectTasks ?? []).map((nextTask) => {
          if (nextTask[0] <= taskIndex) return;
          return nextTask[1].then((nextOutcome) => {
            if (nextOutcome[0] === REDIRECTED) throw [nextTask[0], nextOutcome];
          });
        }));
      }
    })));
  } catch (cause) {
    return cause;
  }
  return serialFailure ?? loaderFailure;
}
function materializeRedirect(router, lane, route, outcome, options, failed) {
  while (outcome[0] === REDIRECTED) {
    const redirect2 = outcome[1];
    const redirectOptions = redirect2.options;
    try {
      if (redirectOptions.href || redirect2.headers.has("Location")) {
        router.resolveRedirect(redirect2);
        if (redirectOptions.reloadDocument) return outcome;
      }
      if (redirectOptions.reloadDocument ? options[3] : options[1] >= 20) return outcome;
      const location = router.buildLocation({
        ...redirectOptions,
        _fromLocation: lane[0],
        _includeValidateSearch: true
      });
      const publicLocation = location.maskedLocation ?? location;
      if (publicLocation.external) {
        const resolved = redirect2.clone();
        resolved.options = { ...redirectOptions };
        resolved.headers.set("Location", publicLocation.publicHref);
        router.resolveRedirect(resolved);
        return options[3] ? [REDIRECTED, resolved] : [
          REDIRECTED,
          resolved,
          publicLocation
        ];
      }
      return [
        REDIRECTED,
        redirect2,
        location
      ];
    } catch (cause) {
      outcome = failed ? [ERROR, cause] : normalizeError(route, cause);
      failed = true;
    }
  }
  return outcome;
}
async function reduceLane(router, lane, tasks, controller, settlement, onReady) {
  const matches = lane[1];
  let failure = await settlement;
  let redirectLimitExceeded = false;
  const plannedBoundary = matches.findIndex((match) => match._notFound);
  const boundaryOf = (found) => found[1][0] === NOT_FOUND ? getNotFoundBoundary(router, matches, found, controller.signal) : found[0];
  let readinessEnd = plannedBoundary < 0 ? matches.length : plannedBoundary;
  if ((failure?.[1][0] ?? 0) >= REDIRECTED) readinessEnd = 0;
  else if (failure) {
    readinessEnd = failure[2] ??= await boundaryOf(failure);
    for (const task of tasks) {
      if (task[0] >= readinessEnd) break;
      const outcome = await task[1];
      if (outcome[0] !== SUCCESS && outcome[0] < REDIRECTED && !("loaderData" in matches[task[0]])) {
        failure = [task[0], outcome];
        readinessEnd = failure[2] = await boundaryOf(failure);
        break;
      }
    }
  }
  for (const task of tasks) {
    if (task[0] >= readinessEnd) break;
    const chunkFailure = await task[2];
    if (!chunkFailure) continue;
    failure = chunkFailure;
    break;
  }
  if ((failure?.[1][0] ?? 0) >= REDIRECTED) {
    const outcome = failure[1];
    if (outcome[0] !== REDIRECTED || outcome[1].options.reloadDocument || outcome[2]) {
      discardBackground(router, lane);
      return outcome;
    }
    redirectLimitExceeded = true;
    failure = [0, [ERROR, /* @__PURE__ */ new Error("Too many redirects")]];
  }
  const boundary = failure ? failure[2] ?? await boundaryOf(failure) : plannedBoundary;
  if (boundary >= 0) {
    const outcome = failure?.[1];
    const kind = outcome?.[0];
    const match = matches[boundary];
    const cause = outcome?.[1];
    const install = () => {
      if (outcome) {
        match._notFound = void 0;
        if (kind === ERROR) match.status = "error";
        else {
          cause.routeId = match.routeId;
          if (match.routeId === router.routeTree.id) {
            match.status = "success";
            match._notFound = true;
          } else match.status = "notFound";
        }
        match.error = cause;
        match.isFetching = false;
      }
    };
    install();
    if (!outcome) onReady?.();
    const route = getRoute(router, match);
    try {
      await waitFor(outcome ? Promise.resolve().then(() => loadRouteChunk(route, kind === ERROR ? "errorComponent" : "notFoundComponent")) : Promise.all([loadRouteChunk(route), loadRouteChunk(route, "notFoundComponent")]), controller.signal);
    } catch (cause2) {
      if (cause2 === controller.signal && controller.signal.aborted) {
        discardBackground(router, lane);
        return CANCELED_OUTCOME;
      }
    }
    if (!outcome) match.status = "success";
    else if (redirectLimitExceeded) {
      controller.abort();
      await Promise.all([
        ...tasks.map((task) => task[1]),
        ...tasks.map((task) => task[2]),
        ...(lane[2] ?? []).map((task) => task[1])
      ]);
      discardBackground(router, lane);
      transferMatchResources(router, matches);
      install();
    }
  }
  return lane;
}
async function projectLane(router, lane, signal, start = 0, end = lane[1].length) {
  const matches = lane[1];
  for (let index = start; index < end; index++) {
    const match = matches[index];
    const routeOptions = getRoute(router, match).options;
    if (routeOptions.head || routeOptions.scripts) try {
      const context = {
        ssr: router.options.ssr,
        matches,
        match,
        params: match.params,
        loaderData: match.loaderData
      };
      const [head, scripts] = await waitFor(Promise.all([routeOptions.head?.(context), routeOptions.scripts?.(context)]), signal);
      match.meta = head?.meta;
      match.links = head?.links;
      match.headScripts = head?.scripts;
      match.styles = head?.styles;
      match.scripts = scripts;
    } catch (cause) {
      if (cause === signal && signal.aborted) break;
      console.error(cause);
    }
    if (match.status !== "success" || match._notFound) break;
  }
  return lane;
}
async function executeClientLane(router, location, matches, options) {
  const matched = [location, matches];
  const signal = options[0].signal;
  let reduced;
  try {
    const presented = router.stores.matches.get();
    let plannedBoundary = matches.findIndex((match) => match._notFound);
    if (router.options.notFoundMode !== "root" && plannedBoundary >= 0) {
      const boundary = await getNotFoundBoundary(router, matches, void 0, signal, plannedBoundary);
      matches[plannedBoundary]._notFound = void 0;
      matches[boundary]._notFound = true;
      plannedBoundary = boundary;
    }
    let end = plannedBoundary < 0 ? matches.length : plannedBoundary + 1;
    let retainedEnd = 0;
    while (retainedEnd < end && retainedEnd !== plannedBoundary) {
      const match = matches[retainedEnd];
      const committed = options[2][retainedEnd];
      const visible = presented[retainedEnd];
      if (committed?.id !== match.id || committed.status !== "success" || match.preload || visible?.id !== match.id || visible.status !== "success") break;
      retainedEnd++;
      if (committed._notFound || visible._notFound) break;
    }
    const tasks = [];
    const start = options[6] ?? 0;
    let semanticParent = start ? Promise.resolve(matches[start - 1]) : void 0;
    const planSuccessfulLane = () => {
      for (let index = start; index < end; index++) {
        if (signal.aborted) break;
        semanticParent = createLoaderTask(router, matched, index, tasks, semanticParent, options, retainedEnd);
      }
    };
    const failure = await contextualize(router, matched, options, end, planSuccessfulLane, retainedEnd);
    if (failure) {
      options[4] = true;
      end = failure[0];
      if (failure[1][0] === NOT_FOUND) {
        const boundary = await getNotFoundBoundary(router, matches, failure, signal);
        failure[2] = boundary;
        end = Math.min(end, boundary + 1);
      } else if (failure[1][0] >= REDIRECTED) end = 0;
      planSuccessfulLane();
    }
    if (!signal.aborted && !options[3]) {
      const abort = [];
      for (const [id, flight] of router._flights ?? []) if (!flight[2]) {
        router._flights.delete(id);
        abort.push(flight[1]);
      }
      for (const controller of abort) controller.abort();
    }
    const reduction = reduceLane(router, matched, tasks, options[0], settleTasks(tasks, failure, matched[2]), options[7]);
    if (matched[2]?.length) matched[3] = settleTasks(matched[2], void 0, void 0, reduction.then((foreground) => isControl(foreground) ? 0 : _getRenderedMatches(matches).length, () => 0));
    reduced = await reduction;
  } catch (cause) {
    discardBackground(router, matched);
    if (cause === signal && signal.aborted) return CANCELED_OUTCOME;
    throw cause;
  }
  if (isControl(reduced)) return reduced;
  return projectLane(router, reduced, signal, options[6] === matches.length ? options[6] : 0);
}
function offerPending(router, tx) {
  if (router._tx !== tx) return;
  const matches = tx[3];
  const presented = router.stores.matches.get();
  let session = router._pending;
  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    const success = match.status === "success" && !match._notFound;
    const presentedPending = presented[index]?.id === match.id && presented[index]?.status === "pending";
    if (success && !presentedPending) continue;
    const route = getRoute(router, match);
    const delay = success || match.invalid ? 0 : route.options.pendingMs ?? router.options.defaultPendingMs;
    const component = route.options.pendingComponent ?? router.options.defaultPendingComponent;
    if (!component || typeof delay !== "number" || delay === Infinity) {
      if (session) {
        session[0] = tx;
        session[2] = 0;
        session[4] = true;
      }
      return;
    }
    const min = route.options.pendingMinMs ?? router.options.defaultPendingMinMs ?? 0;
    let tookOver = false;
    if (session?.[1] === match.id) {
      tookOver = session[0] !== tx;
      session[0] = tx;
    } else {
      clearTimeout(session?.[3]);
      router._pending = session = void 0;
    }
    if (!session) router._pending = session = [
      tx,
      match.id,
      presentedPending ? Date.now() + min : tx[4] + delay,
      void 0,
      presentedPending || void 0,
      component
    ];
    if (session[4] && !tookOver && session[5] === component) return;
    session[5] = component;
    if (!session[4]) {
      clearTimeout(session[3]);
      const remaining = session[2] - Date.now();
      if (remaining > 0) {
        session[3] = setTimeout(() => offerPending(router, tx), remaining);
        return;
      }
      session[2] = 0;
    }
    const offered = matches.map((match2) => ({
      ...match2,
      _flight: void 0
    }));
    offered[index].status = "pending";
    const ack = session[4] = router.startTransition(() => router.stores.setMatches(offered), offered).then((rendered) => {
      if (rendered && router._pending === session && session[4] === ack && !session[2]) session[2] = Date.now() + min;
      return rendered;
    });
    return;
  }
}
function finishPending(router, tx) {
  const session = router._pending;
  if (router._tx === tx || !router._tx?.[3].some((match) => match.id === session?.[1])) {
    clearTimeout(session?.[3]);
    router._pending = void 0;
  }
}
async function awaitPendingMinimum(router, tx) {
  const session = router._pending;
  if (!session) return;
  clearTimeout(session[3]);
  const remaining = session[2] - Date.now();
  if (!session[4] || remaining <= 0 || !_getRenderedMatches(tx[3]).some((match) => match.id === session[1])) return;
  let timer;
  try {
    await waitFor(new Promise((resolve) => {
      timer = setTimeout(resolve, remaining);
    }), tx[0].signal);
  } catch {
  }
  clearTimeout(timer);
}
function publishMatches(router, matches) {
  router._committed = matches;
  router.stores.setMatches(matches);
}
function commitMatches(router, tx, matches, resolvedPrefix) {
  const previous = router._committed;
  const previousEnd = router._lifecycleEnd;
  const previousCached = router._cache;
  for (const match of matches) {
    match.preload = false;
    if (resolvedPrefix) match._assetEnd = void 0;
  }
  const cut = _getRenderedMatches(matches).length;
  const cached = /* @__PURE__ */ new Map();
  if (true) {
    const now = Date.now();
    const superseded = /* @__PURE__ */ new Set();
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      if (index < cut || match.status === "success") superseded.add(match.id);
    }
    for (const match of [...previous, ...previousCached.values()]) {
      if (match.status !== "success" || superseded.has(match.id)) continue;
      const route = getRoute(router, match);
      if (!route.options.loader || now - match.updatedAt >= (match.preload ? route.options.preloadGcTime ?? router.options.defaultPreloadGcTime ?? 3e5 : route.options.gcTime ?? router.options.defaultGcTime ?? 3e5)) continue;
      cached.set(match.id, previousCached.get(match.id) === match ? match : {
        ...match,
        _flight: void 0,
        isFetching: false,
        context: {}
      });
    }
  }
  tx[3] = [];
  router._cache = cached;
  const nextEnd = router._lifecycleEnd = lifecycleEnd(matches);
  publishMatches(router, matches);
  transferMatchResources(router, [...previousCached.values(), ...previous].filter((match) => match._flight && cached.get(match.id) !== match), matches);
  if (false) {
    const handoff = tx[6]?.[0];
    if (handoff && router._handoff === handoff) handoff[1]();
  }
  runRouteLifecycle(router, previous, matches, previousEnd, nextEnd, tx);
}
async function awaitCurrent(router, owner) {
  let current = router._tx;
  while (current && current !== owner) {
    owner = current;
    await current[5];
    current = router._tx;
  }
}
function followRedirect(router, tx, outcome) {
  const options = outcome[1].options;
  const location = outcome[2];
  if (!location) return router.navigate({
    ...options,
    replace: true,
    ignoreBlocker: true
  });
  if (options.reloadDocument) return router.navigate({
    href: (location.maskedLocation ?? location).publicHref,
    reloadDocument: true,
    replace: true,
    ignoreBlocker: true
  });
  location._redirects = tx[1] + 1;
  router._pendingLocation = location;
  const committed = router.commitLocation({
    ...location,
    viewTransition: options.viewTransition,
    replace: true,
    resetScroll: options.resetScroll,
    hashScrollIntoView: options.hashScrollIntoView,
    ignoreBlocker: true
  });
  queueMicrotask(() => {
    if (router._pendingLocation === location) router._pendingLocation = void 0;
  });
  return committed;
}
async function runBackground(router, tx, base, tasks, settlement) {
  const next = base.map((match) => ({ ...match }));
  acquireMatchResources(next);
  for (const task of tasks) {
    releaseFlight(router, next[task[0]]);
    next[task[0]] = task[3];
  }
  const lane = [tx[2], next];
  let reduced;
  try {
    reduced = await reduceLane(router, lane, tasks, tx[0], settlement);
  } catch (cause) {
    transferMatchResources(router, next);
    throw cause;
  }
  if (isControl(reduced)) {
    transferMatchResources(router, next);
    if (reduced[0] === REDIRECTED && router._tx === tx && router._committed === base) await followRedirect(router, tx, reduced);
    return;
  }
  await projectLane(router, reduced, tx[0].signal);
  if (router._tx !== tx || router._committed !== base) {
    transferMatchResources(router, next);
    return;
  }
  for (const match of next) {
    const cached = router._cache.get(match.id);
    if (cached?._flight && cached._flight === match._flight) {
      router._cache.delete(match.id);
      releaseFlight(router, cached);
    }
  }
  publishMatches(router, next);
  transferMatchResources(router, base, next);
}
async function runClientTransaction(router, tx, forceStaleReload, onReady, sync, resolvedPrefix) {
  const result = await executeClientLane(router, tx[2], tx[3], [
    tx[0],
    tx[1],
    router._committed,
    void 0,
    sync,
    forceStaleReload,
    resolvedPrefix,
    onReady
  ]);
  if (isControl(result)) {
    const follow = result[0] === REDIRECTED && router._tx === tx;
    if (!follow || result[1].options.reloadDocument) finishPending(router, tx);
    transferMatchResources(router, tx[3]);
    tx[3] = [];
    if (!follow) return;
    if (router._tx !== tx) {
      finishPending(router, tx);
      return;
    }
    if (false) router._refreshNextLoad = true;
    await followRedirect(router, tx, result);
    return;
  }
  const matches = result[1];
  if (router._tx === tx) await awaitPendingMinimum(router, tx);
  if (router._tx !== tx) {
    finishPending(router, tx);
    transferMatchResources(router, matches);
    discardBackground(router, result);
    return;
  }
  const toLocation = tx[2];
  const changeInfo = getLocationChangeInfo(toLocation, router.stores.resolvedLocation.get());
  const background = result[2];
  await router.startViewTransition(async () => {
    if (router._tx === tx) await awaitPendingMinimum(router, tx);
    if (router._tx !== tx) {
      finishPending(router, tx);
      transferMatchResources(router, matches);
      discardBackground(router, result);
      return;
    }
    const commit = () => {
      finishPending(router, tx);
      commitMatches(router, tx, matches, resolvedPrefix);
      if (router._tx !== tx) return;
      router.emit({
        type: "onLoad",
        ...changeInfo
      });
      if (router._tx === tx) router.emit({
        type: "onBeforeRouteMount",
        ...changeInfo
      });
    };
    const rendered = await router.startTransition(commit, matches);
    if (false) tx[6] = void 0;
    if (router._tx !== tx) {
      discardBackground(router, result);
      return;
    }
    if (background?.length) runBackground(router, tx, matches, background, result[3]).catch(console.error);
    router.batch(() => {
      router.stores.resolvedLocation.set(toLocation);
      router.stores.status.set("idle");
      if (router._tx === tx) router.emit({
        type: "onResolved",
        ...changeInfo
      });
      if (rendered && router._tx === tx) router.emit({
        type: "onRendered",
        ...changeInfo
      });
    });
    if (router._tx !== tx) return;
    router._commitPromise?.resolve();
    router._commitPromise = void 0;
  });
}
async function loadClientRoute(router, opts) {
  let rematerialize = false;
  if (false) rematerialize = !!router._refreshNextLoad || !!router._tx?.[6];
  const previousOwner = router._tx;
  const resolvedLocation = router.stores.resolvedLocation.get();
  const previousLocation = resolvedLocation ?? router.stores.location.get();
  const location = router.latestLocation;
  const pendingLocation = router._pendingLocation;
  const redirects = pendingLocation?.href === location.href ? pendingLocation._redirects ?? 0 : 0;
  const handoff = router._handoff;
  const hydrationController = rematerialize ? void 0 : handoff?.[0]();
  const preflight = new AbortController();
  const previousPreflight = router._preflight;
  router._preflight = preflight;
  if (!rematerialize && !hydrationController) handoff?.[1]();
  previousPreflight?.abort();
  if (!preflight.signal.aborted) {
    const changeInfo = getLocationChangeInfo(location, resolvedLocation);
    router.emit({
      type: "onBeforeNavigate",
      ...changeInfo
    });
    if (!preflight.signal.aborted) router.emit({
      type: "onBeforeLoad",
      ...changeInfo
    });
  }
  if (preflight.signal.aborted) {
    await awaitCurrent(router, previousOwner);
    return;
  }
  const sameHref = previousLocation.href === location.href;
  let controller = preflight;
  const matches = false ? router.matchRoutes(location, {
    _controller: preflight,
    _rematerialize: true
  }) : router.matchRoutes(location, { _controller: preflight });
  acquireMatchResources(matches);
  const resolvedPrefix = hydrationController ? handoff[1](matches) : void 0;
  if (resolvedPrefix) controller = hydrationController;
  else hydrationController?.abort();
  if (preflight.signal.aborted) {
    transferMatchResources(router, matches);
    await awaitCurrent(router, previousOwner);
    return;
  }
  router._preflight = void 0;
  let settle;
  const run = () => runClientTransaction(router, tx, sameHref, () => offerPending(router, tx), opts?.sync, resolvedPrefix);
  const done = opts?.sync ? new Promise((resolve) => settle = resolve) : Promise.resolve().then(run);
  const tx = [
    controller,
    redirects,
    location,
    matches,
    Date.now(),
    done.then(() => awaitCurrent(router, tx))
  ];
  if (false) {
    tx[6] = [handoff];
    router._refreshNextLoad = void 0;
  }
  router._tx = tx;
  if (previousOwner) {
    for (const match of router.stores.matches.get()) {
      if (router._tx !== tx) break;
      if (match.isFetching) setFetching(router, match, false);
    }
    previousOwner[0].abort();
    transferMatchResources(router, previousOwner[3], tx[3], true);
  }
  if (router._tx !== tx) {
    transferMatchResources(router, tx[3]);
    tx[3] = [];
    settle?.();
    await awaitCurrent(router, tx);
    return;
  }
  router.batch(() => {
    router.stores.status.set("pending");
    router.stores.location.set(location);
  });
  if (resolvedPrefix || !router._committed.length && matches[0]?.status !== "success" && !matches.some((match) => match._notFound)) offerPending(router, tx);
  settle?.(run());
  await tx[5];
}
async function preloadClientRoute(router, opts) {
  if (false) return;
  let location = router.buildLocation(opts);
  for (let redirects = 0; ; redirects++) {
    const base = router._committed;
    const controller = new AbortController();
    let matches;
    let active;
    let result;
    try {
      try {
        matches = router.matchRoutes(location, { _controller: controller });
        acquireMatchResources(matches);
        active = (router._preloads ??= /* @__PURE__ */ new Map()).set(controller, matches);
        result = await executeClientLane(router, location, matches, [
          controller,
          redirects,
          base,
          true
        ]);
      } finally {
        if (active) {
          active = active.delete(controller);
          transferMatchResources(router, matches);
        }
        controller.abort();
      }
      if (!isControl(result)) return result[1];
      if (!active || result.length < 3 || false) return;
      location = result[2];
    } catch (cause) {
      if (!isNotFound(cause)) console.error(cause);
      return;
    }
  }
}

// node_modules/@tanstack/router-core/dist/esm/link.js
var preloadWarning = "Error preloading route! \u261D\uFE0F";

// node_modules/@tanstack/router-core/dist/esm/route.js
var BaseRoute = class {
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  constructor(options) {
    this.init = (originalIndex) => {
      this.originalIndex = originalIndex;
      this._branch = void 0;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) this._path = rootRouteId;
      else if (!this.parentRoute) {
        if (false) throw new Error(`Invariant failed: Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`);
        invariant();
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") path = trimPathLeft(path);
      const customId = options2?.id || path;
      const id = isRoot ? rootRouteId : cleanPath((this.parentRoute.id === "__root__" ? "" : this.parentRoute.id) + "/" + (customId ?? ""));
      if (path === "__root__") path = "/";
      const fullPath = id === "__root__" ? "/" : path === void 0 ? this.parentRoute.fullPath : cleanPath(this.parentRoute.fullPath + "/" + path);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = trimPathRight(fullPath);
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) this.children = children;
      if (typeof children === "object" && children !== null) this.children = Object.values(children);
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn2) => {
      this.lazyFn = lazyFn2;
      return this;
    };
    this.redirect = (opts) => redirect({
      from: this.fullPath,
      ...opts
    });
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
  }
};
var BaseRootRoute = class extends BaseRoute {
  constructor(options) {
    super(options);
  }
};

// node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
import * as React$12 from "react";
var CatchBoundary = class extends React$12.Component {
  constructor(..._args) {
    super(..._args);
    this.state = { error: 0 };
    this.reset = () => {
      this.setState({ error: 0 });
    };
  }
  static getDerivedStateFromProps(props, state) {
    const resetKey = props.getResetKey();
    if (state.error && state.resetKey !== resetKey) return {
      resetKey,
      error: 0
    };
    return { resetKey };
  }
  static getDerivedStateFromError(error) {
    return { error: [error] };
  }
  componentDidCatch(error, errorInfo) {
    this.props.onCatch?.(error, errorInfo);
  }
  render() {
    const error = this.state.error;
    if (error) {
      const element = React$12.createElement(this.props.errorComponent ?? ErrorComponent, {
        error: error[0],
        reset: this.reset
      });
      return false ? wrapInNonRouteComponentContext(element, "errorComponent") : element;
    }
    return this.props.children;
  }
};
function ErrorComponent({ error }) {
  const [show, setShow] = React$12.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    style: {
      padding: ".5rem",
      maxWidth: "100%"
    },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: ".5rem"
        },
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
          style: { fontSize: "1rem" },
          children: "Something went wrong!"
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d) => !d),
          children: show ? "Hide Error" : "Show Error"
        })]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: ".25rem" } }),
      show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error?.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: error.message }) : null
      }) }) : null
    ]
  });
}

// node_modules/@tanstack/react-router/dist/esm/ClientOnly.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
import React from "react";
var getSnapshot = () => true;
var getServerSnapshot = () => false;
function ClientOnly({ children, fallback = null }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(React.Fragment, { children: useHydrated() ? children : fallback });
}
function useHydrated(enabled = true) {
  return React.useSyncExternalStore(subscribe, getSnapshot, enabled ? getServerSnapshot : getSnapshot);
}
function subscribe() {
  return () => {
  };
}

// node_modules/@tanstack/react-router/dist/esm/routerContext.js
import * as React$13 from "react";
var routerContext = React$13.createContext(null);

// node_modules/@tanstack/react-router/dist/esm/useRouter.js
import * as React$14 from "react";
function useRouter(opts) {
  const value = React$14.useContext(routerContext);
  if (!value) warnMissingRouter(opts);
  return value;
}
function warnMissingRouter(opts) {
  if (false) console.warn("Warning: useRouter must be used inside a <RouterProvider> component!");
}

// node_modules/@tanstack/react-router/dist/esm/matchContext.js
import * as React$15 from "react";
var matchContext = React$15.createContext(void 0);
var dummyMatchContext = React$15.createContext(void 0);

// node_modules/@tanstack/react-router/dist/esm/useMatch.js
import * as React$16 from "react";

// node_modules/@tanstack/store/dist/alien.js
// @__NO_SIDE_EFFECTS__
function createReactiveSystem({ update, notify, unwatched }) {
  return {
    link: link2,
    unlink: unlink2,
    propagate: propagate2,
    checkDirty: checkDirty2,
    shallowPropagate: shallowPropagate2
  };
  function link2(dep, sub, version) {
    const prevDep = sub.depsTail;
    if (prevDep !== void 0 && prevDep.dep === dep) return;
    const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
    if (nextDep !== void 0 && nextDep.dep === dep) {
      nextDep.version = version;
      sub.depsTail = nextDep;
      return;
    }
    const prevSub = dep.subsTail;
    if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
    const newLink = sub.depsTail = dep.subsTail = {
      version,
      dep,
      sub,
      prevDep,
      nextDep,
      prevSub,
      nextSub: void 0
    };
    if (nextDep !== void 0) nextDep.prevDep = newLink;
    if (prevDep !== void 0) prevDep.nextDep = newLink;
    else sub.deps = newLink;
    if (prevSub !== void 0) prevSub.nextSub = newLink;
    else dep.subs = newLink;
  }
  function unlink2(link3, sub = link3.sub) {
    const dep = link3.dep;
    const prevDep = link3.prevDep;
    const nextDep = link3.nextDep;
    const nextSub = link3.nextSub;
    const prevSub = link3.prevSub;
    if (nextDep !== void 0) nextDep.prevDep = prevDep;
    else sub.depsTail = prevDep;
    if (prevDep !== void 0) prevDep.nextDep = nextDep;
    else sub.deps = nextDep;
    if (nextSub !== void 0) nextSub.prevSub = prevSub;
    else dep.subsTail = prevSub;
    if (prevSub !== void 0) prevSub.nextSub = nextSub;
    else if ((dep.subs = nextSub) === void 0) unwatched(dep);
    return nextDep;
  }
  function propagate2(link3) {
    let next = link3.nextSub;
    let stack;
    top: do {
      const sub = link3.sub;
      let flags = sub.flags;
      if (!(flags & 60)) sub.flags = flags | 32;
      else if (!(flags & (4 | 8))) flags = 0;
      else if (!(flags & 4)) sub.flags = flags & ~8 | 32;
      else if (!(flags & (16 | 32)) && isValidLink(link3, sub)) {
        sub.flags = flags | (8 | 32);
        flags &= 1;
      } else flags = 0;
      if (flags & 2) notify(sub);
      if (flags & 1) {
        const subSubs = sub.subs;
        if (subSubs !== void 0) {
          const nextSub = (link3 = subSubs).nextSub;
          if (nextSub !== void 0) {
            stack = {
              value: next,
              prev: stack
            };
            next = nextSub;
          }
          continue;
        }
      }
      if ((link3 = next) !== void 0) {
        next = link3.nextSub;
        continue;
      }
      while (stack !== void 0) {
        link3 = stack.value;
        stack = stack.prev;
        if (link3 !== void 0) {
          next = link3.nextSub;
          continue top;
        }
      }
      break;
    } while (true);
  }
  function checkDirty2(link3, sub) {
    let stack;
    let checkDepth = 0;
    let dirty = false;
    top: do {
      const dep = link3.dep;
      const flags = dep.flags;
      if (sub.flags & 16) dirty = true;
      else if ((flags & (1 | 16)) === (1 | 16)) {
        if (update(dep)) {
          const subs = dep.subs;
          if (subs.nextSub !== void 0) shallowPropagate2(subs);
          dirty = true;
        }
      } else if ((flags & (1 | 32)) === (1 | 32)) {
        if (link3.nextSub !== void 0 || link3.prevSub !== void 0) stack = {
          value: link3,
          prev: stack
        };
        link3 = dep.deps;
        sub = dep;
        ++checkDepth;
        continue;
      }
      if (!dirty) {
        const nextDep = link3.nextDep;
        if (nextDep !== void 0) {
          link3 = nextDep;
          continue;
        }
      }
      while (checkDepth--) {
        const firstSub = sub.subs;
        const hasMultipleSubs = firstSub.nextSub !== void 0;
        if (hasMultipleSubs) {
          link3 = stack.value;
          stack = stack.prev;
        } else link3 = firstSub;
        if (dirty) {
          if (update(sub)) {
            if (hasMultipleSubs) shallowPropagate2(firstSub);
            sub = link3.sub;
            continue;
          }
          dirty = false;
        } else sub.flags &= ~32;
        sub = link3.sub;
        const nextDep = link3.nextDep;
        if (nextDep !== void 0) {
          link3 = nextDep;
          continue top;
        }
      }
      return dirty;
    } while (true);
  }
  function shallowPropagate2(link3) {
    do {
      const sub = link3.sub;
      const flags = sub.flags;
      if ((flags & (32 | 16)) === 32) {
        sub.flags = flags | 16;
        if ((flags & (2 | 4)) === 2) notify(sub);
      }
    } while ((link3 = link3.nextSub) !== void 0);
  }
  function isValidLink(checkLink, sub) {
    let link3 = sub.depsTail;
    while (link3 !== void 0) {
      if (link3 === checkLink) return true;
      link3 = link3.prevDep;
    }
    return false;
  }
}

// node_modules/@tanstack/store/dist/atom.js
function toObserver(nextHandler, errorHandler, completionHandler) {
  const isObserver = typeof nextHandler === "object";
  const self2 = isObserver ? nextHandler : void 0;
  return {
    next: (isObserver ? nextHandler.next : nextHandler)?.bind(self2),
    error: (isObserver ? nextHandler.error : errorHandler)?.bind(self2),
    complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self2)
  };
}
var queuedEffects = [];
var cycle = 0;
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
  update(atom) {
    return atom._update();
  },
  notify(effect2) {
    queuedEffects[queuedEffectsLength++] = effect2;
    effect2.flags &= ~2;
  },
  unwatched(atom) {
    if (atom.depsTail !== void 0) {
      atom.depsTail = void 0;
      atom.flags = 1 | 16;
      purgeDeps(atom);
    }
  }
});
var notifyIndex = 0;
var queuedEffectsLength = 0;
var activeSub;
var batchDepth = 0;
function batch(fn) {
  try {
    ++batchDepth;
    fn();
  } finally {
    if (!--batchDepth) flush();
  }
}
function purgeDeps(sub) {
  const depsTail = sub.depsTail;
  let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
  while (dep !== void 0) dep = unlink(dep, sub);
}
function flush() {
  if (batchDepth > 0) return;
  while (notifyIndex < queuedEffectsLength) {
    const effect2 = queuedEffects[notifyIndex];
    queuedEffects[notifyIndex++] = void 0;
    effect2.notify();
  }
  notifyIndex = 0;
  queuedEffectsLength = 0;
}
function createAtom(valueOrFn, options) {
  const isComputed = typeof valueOrFn === "function";
  const getter = valueOrFn;
  const atom = {
    _snapshot: isComputed ? void 0 : valueOrFn,
    subs: void 0,
    subsTail: void 0,
    deps: void 0,
    depsTail: void 0,
    flags: isComputed ? 0 : 1,
    get() {
      if (activeSub !== void 0) link(atom, activeSub, cycle);
      return atom._snapshot;
    },
    subscribe(observerOrFn) {
      const obs = toObserver(observerOrFn);
      const observed = { current: false };
      const e = effect(() => {
        atom.get();
        if (!observed.current) observed.current = true;
        else {
          activeSub = void 0;
          obs.next?.(atom._snapshot);
        }
      });
      return { unsubscribe: () => {
        e.stop();
      } };
    },
    _update(getValue) {
      const prevSub = activeSub;
      const compare = options?.compare ?? Object.is;
      if (isComputed) {
        activeSub = atom;
        ++cycle;
        atom.depsTail = void 0;
      } else if (getValue === void 0) return false;
      if (isComputed) atom.flags = 1 | 4;
      try {
        const oldValue = atom._snapshot;
        const newValue = typeof getValue === "function" ? getValue(oldValue) : getValue === void 0 && isComputed ? getter(oldValue) : getValue;
        if (oldValue === void 0 || !compare(oldValue, newValue)) {
          atom._snapshot = newValue;
          return true;
        }
        return false;
      } finally {
        activeSub = prevSub;
        if (isComputed) atom.flags &= ~4;
        purgeDeps(atom);
      }
    }
  };
  if (isComputed) {
    atom.flags = 1 | 16;
    atom.get = function() {
      const flags = atom.flags;
      if (flags & 16 || flags & 32 && checkDirty(atom.deps, atom)) {
        if (atom._update()) {
          const subs = atom.subs;
          if (subs !== void 0) shallowPropagate(subs);
        }
      } else if (flags & 32) atom.flags = flags & ~32;
      if (activeSub !== void 0) link(atom, activeSub, cycle);
      return atom._snapshot;
    };
  } else atom.set = function(valueOrFn2) {
    if (atom._update(valueOrFn2)) {
      const subs = atom.subs;
      if (subs !== void 0) {
        propagate(subs);
        shallowPropagate(subs);
        flush();
      }
    }
  };
  return atom;
}
function effect(fn) {
  const run = () => {
    const prevSub = activeSub;
    activeSub = effectObj;
    ++cycle;
    effectObj.depsTail = void 0;
    effectObj.flags = 2 | 4;
    try {
      return fn();
    } finally {
      activeSub = prevSub;
      effectObj.flags &= ~4;
      purgeDeps(effectObj);
    }
  };
  const effectObj = {
    deps: void 0,
    depsTail: void 0,
    subs: void 0,
    subsTail: void 0,
    flags: 2 | 4,
    notify() {
      const flags = this.flags;
      if (flags & 16 || flags & 32 && checkDirty(this.deps, this)) run();
      else this.flags = 2;
    },
    stop() {
      this.flags = 0;
      this.depsTail = void 0;
      purgeDeps(this);
    }
  };
  run();
  return effectObj;
}

// node_modules/@tanstack/react-store/dist/useSelector.js
var import_with_selector = __toESM(require_with_selector(), 1);
import { useCallback } from "react";
function defaultCompare(a, b) {
  return a === b;
}
function useSelector(source, selector = (s) => s, options) {
  const compare = options?.compare ?? defaultCompare;
  const subscribe2 = useCallback((handleStoreChange) => {
    const { unsubscribe } = source.subscribe(handleStoreChange);
    return unsubscribe;
  }, [source]);
  const getSnapshot2 = useCallback(() => source.get(), [source]);
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(subscribe2, getSnapshot2, getSnapshot2, selector, compare);
}

// node_modules/@tanstack/react-router/dist/esm/useMatch.js
var dummyMatch = {};
function useStructuralSharing(opts, router) {
  const previousResult = React$16.useRef();
  return (slice) => {
    const selected = opts?.select ? opts.select(slice) : slice;
    if (opts?.structuralSharing ?? router.options.defaultStructuralSharing) return previousResult.current = replaceEqualDeep(previousResult.current, selected);
    return selected;
  };
}
function useMatch(opts) {
  const router = useRouter();
  const nearestRouteId = React$16.useContext(opts.from ? dummyMatchContext : matchContext);
  const routeId = opts.from ?? nearestRouteId;
  const matchStore = router.stores.getMatchStore(routeId);
  if (isServer ?? router.isServer) {
    const match = matchStore.get();
    if (!match) {
      if (opts.shouldThrow ?? true) {
        if (false) throw new Error(`Invariant failed: Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`);
        invariant();
      }
      return;
    }
    return opts.select ? opts.select(match) : match;
  }
  const selector = useStructuralSharing(opts, router);
  const matchSelection = useSelector(matchStore, (match) => match ? selector(match) : dummyMatch);
  if (matchSelection !== dummyMatch) return matchSelection;
  if (opts.shouldThrow ?? true) {
    if (false) throw new Error(`Invariant failed: Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`);
    invariant();
  }
}

// node_modules/@tanstack/react-router/dist/esm/useLoaderData.js
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.loaderData) : match.loaderData;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (match) => {
      return select ? select(match.loaderDeps) : match.loaderDeps;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useParams.js
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useSearch.js
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useNavigate.js
import * as React$17 from "react";
function useNavigate(_defaultOpts) {
  const router = useRouter();
  return React$17.useCallback((options) => {
    return router.navigate({
      ...options,
      from: options.from ?? _defaultOpts?.from
    });
  }, [_defaultOpts?.from, router]);
}

// node_modules/@tanstack/react-router/dist/esm/useRouteContext.js
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}

// node_modules/@tanstack/react-router/dist/esm/link.js
import * as React$18 from "react";
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function useStableValues(...values) {
  const ref = React$18.useRef(values);
  const stable = ref.current;
  values.forEach((value, index) => {
    if (!deepEqual(stable[index], value, false, true)) stable[index] = value;
  });
  return ref.current;
}
function preloadLink(router, options) {
  router.preloadRoute(options).catch((err) => {
    console.warn(err);
    console.warn(preloadWarning);
  });
}
var LINK_SELECTOR_OPTIONS = { compare: (a, b) => a[0] === b[0] && a[1] === b[1] };
function resolveExternalLink(to, protocolAllowlist) {
  const scheme = typeof to === "string" && getUrlScheme(to);
  if (!scheme) return;
  if (!protocolAllowlist.has(scheme)) {
    if (false) console.warn(`Blocked Link with dangerous protocol: ${to}`);
    return null;
  }
  return to;
}
function resolveIsActive(location, next, activeOptions, basepath, isHydrated) {
  const currentPath = removeTrailingSlash(location.pathname, basepath);
  const nextPath = removeTrailingSlash(next.pathname, basepath);
  if (activeOptions?.exact ? currentPath !== nextPath : !(currentPath.startsWith(nextPath) && (currentPath.length === nextPath.length || currentPath[nextPath.length] === "/"))) return false;
  if (activeOptions?.includeSearch ?? true) {
    if (!deepEqual(location.search, next.search, !activeOptions?.exact, activeOptions?.explicitUndefined)) return false;
  }
  if (activeOptions?.includeHash) return isHydrated && location.hash === next.hash;
  return true;
}
function useLinkProps(options, forwardedRef, host) {
  const router = useRouter();
  if (isServer ?? router.isServer) return getServerLinkProps(router, options, forwardedRef, host);
  const innerRef = React$18.useRef(null);
  const mergedRef = React$18.useCallback((element) => {
    innerRef.current = element;
    if (typeof forwardedRef === "function") return forwardedRef(element);
    if (forwardedRef) forwardedRef.current = element;
  }, [forwardedRef]);
  const { activeOptions, to, preload: userPreload, preloadDelay: userPreloadDelay, hashScrollIntoView, replace, startTransition: startTransition2, resetScroll, viewTransition, ignoreBlocker, disabled, target, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart } = options;
  const isHydrated = useHydrated(!!activeOptions?.includeHash);
  const [stableSearch, stableParams, stableActiveOptions] = useStableValues(options.search, options.params, activeOptions);
  const [_options, dest] = React$18.useMemo(() => [options, { ...options }], [
    router,
    options.from,
    options._fromLocation,
    options.hash,
    options.to,
    stableSearch,
    stableParams,
    options.state,
    options.mask,
    options.unsafeRelative
  ]);
  const selectLinkState = React$18.useMemo(() => {
    const directExternalLink = resolveExternalLink(to, router.protocolAllowlist);
    if (directExternalLink !== void 0) {
      const state = [directExternalLink ?? void 0];
      return () => state;
    }
    let inactive;
    let active;
    return (location) => {
      if (!_options._fromLocation) dest._fromLocation = location;
      const next = router.buildLocation(dest);
      const href2 = getHrefOption(next, router, disabled);
      if (!inactive || inactive[0] !== href2) {
        inactive = [href2, !(disabled || href2 && !getUrlScheme(href2)) && void 0];
        active = [href2, true];
      }
      return inactive[1] !== void 0 && resolveIsActive(location, next, stableActiveOptions, router.basepath, isHydrated) ? active : inactive;
    };
  }, [
    stableActiveOptions,
    disabled,
    isHydrated,
    _options,
    dest,
    router,
    to
  ]);
  const [href, isActive] = useSelector(router.stores.location, selectLinkState, LINK_SELECTOR_OPTIONS);
  const externalLink = isActive === void 0 && href;
  const linkDisabled = disabled || href === void 0;
  const hasRenderFetched = React$18.useRef(false);
  const preload = options.reloadDocument || externalLink || linkDisabled ? false : userPreload ?? router.options.defaultPreload;
  const preloadDelay = userPreloadDelay ?? router.options.defaultPreloadDelay ?? 0;
  const enqueuePreload = React$18.useCallback((e) => {
    const isIntersecting = e?.isIntersecting;
    if (!(isIntersecting ?? preload === "intent")) {
      if (isIntersecting === false) cancelPreload(innerRef);
      return;
    }
    if (!preloadDelay) {
      preloadLink(router, _options);
      return;
    }
    if (timeoutMap.has(innerRef)) return;
    timeoutMap.set(innerRef, setTimeout(() => {
      timeoutMap.delete(innerRef);
      preloadLink(router, _options);
    }, preloadDelay));
  }, [
    router,
    _options,
    innerRef,
    preload,
    preloadDelay
  ]);
  React$18.useEffect(() => {
    if (!preload) return;
    if (preload === "render" && !hasRenderFetched.current) {
      hasRenderFetched.current = true;
      preloadLink(router, _options);
    }
    let active = true;
    let observer;
    if (preload === "viewport" && innerRef.current && typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver((entries) => {
        if (active) enqueuePreload(entries.pop());
      }, { rootMargin: "100px" });
      observer.observe(innerRef.current);
    }
    return () => {
      active = false;
      observer?.disconnect();
      cancelPreload(innerRef);
    };
  }, [
    router,
    _options,
    preload,
    enqueuePreload,
    innerRef
  ]);
  const props = collectElementProps(options, host);
  props.ref = forwardedRef ? mergedRef : innerRef;
  if (externalLink) {
    props.href = externalLink;
    return props;
  }
  const handleClick = (e) => {
    const effectiveTarget = target ?? e.currentTarget.getAttribute("target");
    if (!linkDisabled && !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e.button === 0) {
      e.preventDefault();
      router.navigate({
        ..._options,
        replace,
        resetScroll,
        hashScrollIntoView,
        startTransition: startTransition2,
        viewTransition,
        ignoreBlocker
      });
    }
  };
  const handleTouchStart = () => {
    if (preload === "intent") preloadLink(router, _options);
  };
  const handleLeave = () => {
    if (preload === "intent") cancelPreload(innerRef);
  };
  props.onClick = composeHandlers(onClick, handleClick);
  props.onBlur = composeHandlers(onBlur, handleLeave);
  props.onFocus = composeHandlers(onFocus, enqueuePreload);
  props.onMouseEnter = composeHandlers(onMouseEnter, enqueuePreload);
  props.onMouseLeave = composeHandlers(onMouseLeave, handleLeave);
  props.onTouchStart = composeHandlers(onTouchStart, handleTouchStart);
  return applyLinkState(props, options, isActive, href, linkDisabled, host);
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var ROUTER_OPTION_KEYS = /* @__PURE__ */ new Set([
  "to",
  "params",
  "search",
  "hash",
  "state",
  "mask",
  "from",
  "unsafeRelative",
  "_fromLocation",
  "reloadDocument",
  "preload",
  "preloadDelay",
  "preloadIntentProximity",
  "hashScrollIntoView",
  "replace",
  "startTransition",
  "resetScroll",
  "viewTransition",
  "ignoreBlocker",
  "activeProps",
  "inactiveProps",
  "activeOptions",
  "_asChild"
]);
function collectElementProps(options, host) {
  const props = {};
  for (const key in options) {
    if (ROUTER_OPTION_KEYS.has(key) || key === "type" && host !== void 0 || key === "disabled" && host === "a") continue;
    props[key] = options[key];
  }
  return props;
}
function applyLinkState(props, options, isActive, href, linkDisabled, host) {
  const { activeProps, inactiveProps, className, style, target } = options;
  const stateProps = functionalUpdate(isActive ? activeProps : inactiveProps, {}) ?? (isActive ? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT);
  Object.assign(props, stateProps);
  props.href = href;
  if (host !== "a") props.disabled = linkDisabled;
  props.target = target;
  const stateStyle = stateProps.style;
  if (style || stateStyle) props.style = style && stateStyle ? {
    ...style,
    ...stateStyle
  } : style || stateStyle;
  const stateClassName = stateProps.className;
  if (className || stateClassName) props.className = className ? stateClassName ? `${className} ${stateClassName}` : className : stateClassName;
  if (linkDisabled) {
    props.role = "link";
    props["aria-disabled"] = true;
  }
  if (isActive) {
    props["data-status"] = "active";
    props["aria-current"] = "page";
  }
  return props;
}
function getServerLinkProps(router, options, forwardedRef, host) {
  const { to, disabled, activeOptions } = options;
  const directExternalLink = resolveExternalLink(to, router.protocolAllowlist);
  const next = directExternalLink === void 0 ? router.buildLocation(options) : void 0;
  const hrefOption = next ? getHrefOption(next, router, disabled) : directExternalLink ?? void 0;
  const linkDisabled = disabled || !hrefOption;
  const externalLink = directExternalLink ?? (hrefOption && getUrlScheme(hrefOption) ? hrefOption : void 0);
  const props = collectElementProps(options, host);
  props.ref = forwardedRef;
  if (externalLink) {
    props.href = externalLink;
    return props;
  }
  return applyLinkState(props, options, !!next && !(!disabled && !hrefOption) && resolveIsActive(router.stores.location.get(), next, activeOptions, router.basepath, false), hrefOption, linkDisabled, host);
}
var timeoutMap = /* @__PURE__ */ new WeakMap();
var cancelPreload = (eventTarget) => {
  clearTimeout(timeoutMap.get(eventTarget));
  timeoutMap.delete(eventTarget);
};
var composeHandlers = (first, second) => {
  if (!first) return second;
  return (event) => event.defaultPrevented || (first(event), event.defaultPrevented || second(event));
};
function getHrefOption(next, router, disabled) {
  if (disabled) return;
  const location = next.maskedLocation ?? next;
  const href = location.external ? location.publicHref : router.history.createHref(location.publicHref) || "/";
  if ((location.external || href !== location.publicHref) && isDangerousProtocol(href, router.protocolAllowlist)) {
    if (false) console.warn(`Blocked Link with dangerous protocol: ${href}`);
    return;
  }
  return href;
}
var Link = React$18.memo(React$18.forwardRef((props, ref) => {
  const host = props._asChild || "a";
  const linkProps = useLinkProps(props, ref, host);
  const children = typeof props.children === "function" ? props.children({ isActive: linkProps["data-status"] === "active" }) : props.children;
  return React$18.createElement(host, linkProps, children);
}), areLinkPropsEqual);
function areLinkPropsEqual(prev, next) {
  let extraKeys = 0;
  for (const key in next) {
    extraKeys++;
    if (prev[key] === next[key]) continue;
    if (!ROUTER_OPTION_KEYS.has(key) || !deepEqual(prev[key], next[key], false, true)) return false;
  }
  for (const _key in prev) extraKeys--;
  return extraKeys === 0;
}

// node_modules/@tanstack/react-router/dist/esm/route.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
import React2 from "react";
var Route = class extends BaseRoute {
  /**
  * @deprecated Use the `createRoute` function instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        ...opts,
        from: this.id
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        ...opts,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React2.forwardRef((props, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRoute(options) {
  return new Route(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
var RootRoute = class extends BaseRootRoute {
  /**
  * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        ...opts,
        from: this.id
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        ...opts,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React2.forwardRef((props, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}

// node_modules/@tanstack/react-router/dist/esm/not-found.js
import "react";
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function CatchNotFound(props) {
  const router = useRouter();
  if (isServer ?? router.isServer) {
    const resetKey2 = `not-found-${router.stores.location.get().pathname}-${router.stores.status.get()}`;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CatchBoundary, {
      getResetKey: () => resetKey2,
      onCatch: (error, errorInfo) => {
        if (isNotFound(error)) props.onCatch?.(error, errorInfo);
        else throw error;
      },
      errorComponent: ({ error }) => {
        if (isNotFound(error)) return props.fallback?.(error);
        else throw error;
      },
      children: props.children
    });
  }
  const resetKey = `not-found-${useSelector(router.stores.location, (location) => location.pathname)}-${useSelector(router.stores.status)}`;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CatchBoundary, {
    getResetKey: () => resetKey,
    onCatch: (error, errorInfo) => {
      if (isNotFound(error)) props.onCatch?.(error, errorInfo);
      else throw error;
    },
    errorComponent: ({ error }) => {
      if (isNotFound(error)) return props.fallback?.(error);
      else throw error;
    },
    children: props.children
  });
}
function DefaultGlobalNotFound() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Not Found" });
}

// node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function ScriptOnce({ children }) {
  const router = useRouter();
  if (!(isServer ?? router.isServer)) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("script", {
    nonce: router.options.ssr?.nonce,
    dangerouslySetInnerHTML: { __html: children + ";document.currentScript.remove()" }
  });
}

// node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
import "react";
function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) {
      const notFoundElement2 = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(router.options.defaultNotFoundComponent, { ...data });
      return false ? wrapInNonRouteComponentContext(notFoundElement2, "notFoundComponent") : notFoundElement2;
    }
    if (false) {
      if (!route.options.notFoundComponent) console.warn(`Warning: A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<p>Not Found</p>)`);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DefaultGlobalNotFound, {});
  }
  const notFoundElement = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(route.options.notFoundComponent, { ...data });
  return false ? wrapInNonRouteComponentContext(notFoundElement, "notFoundComponent") : notFoundElement;
}

// node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);

// node_modules/@tanstack/router-core/dist/esm/scroll-restoration-script/client.js
function getScrollRestorationScriptForRouter(_router) {
  return null;
}

// node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js
function ScrollRestoration() {
  const script = getScrollRestorationScriptForRouter(useRouter());
  if (!script) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ScriptOnce, { children: script });
}

// node_modules/@tanstack/react-router/dist/esm/Match.js
import * as React$19 from "react";
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function renderPending(router, route) {
  const PendingComponent = route?.options.pendingComponent ?? router.options.defaultPendingComponent;
  if (!PendingComponent) return null;
  const pendingElement = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PendingComponent, {});
  return false ? wrapInNonRouteComponentContext(pendingElement, "pendingComponent") : pendingElement;
}
var outletMatchSelectionEqual = (a, b) => a[0] === b[0] && a[1] === b[1];
var canWrapInSuspense = (router, route, ssr) => !route.isRoot || route.options.shellComponent || route.options.wrapInSuspense || ssr === false || ssr === "data-only" || !((isServer ?? router.isServer) || router.ssr);
var Match = React$19.memo(function MatchImpl({ routeId }) {
  const router = useRouter();
  if (isServer ?? router.isServer) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MatchView, {
    router,
    match: router.stores.byRoute.get(routeId).get()
  });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MatchView, {
    router,
    match: useSelector(router.stores.getMatchStore(routeId))
  });
});
function MatchView({ router, match }) {
  const route = router.routesById[match.routeId];
  const pendingElement = renderPending(router, route);
  const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
  const routeOnCatch = route.options.onCatch ?? router.options.defaultOnCatch;
  const routeNotFoundComponent = route.isRoot ? route.options.notFoundComponent ?? router.options.notFoundRoute?.options.component : route.options.notFoundComponent;
  const resolvedNoSsr = match.ssr === false || match.ssr === "data-only";
  const wrapInSuspense = canWrapInSuspense(router, route, match.ssr) && (route.options.wrapInSuspense ?? pendingElement ?? (route.options.errorComponent?.preload || resolvedNoSsr));
  let content = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MatchInner, { match });
  if (resolvedNoSsr) content = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ClientOnly, {
    fallback: pendingElement,
    children: content
  });
  if (routeNotFoundComponent) content = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CatchNotFound, {
    fallback: (error) => {
      error.routeId ??= match.routeId;
      if (error.routeId !== match.routeId) throw error;
      const notFoundElement = React$19.createElement(routeNotFoundComponent, error);
      return false ? wrapInNonRouteComponentContext(notFoundElement, "notFoundComponent") : notFoundElement;
    },
    children: content
  });
  if (routeErrorComponent) content = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CatchBoundary, {
    getResetKey: () => match,
    errorComponent: routeErrorComponent,
    onCatch: (error, errorInfo) => {
      if (isNotFound(error)) {
        error.routeId ??= match.routeId;
        throw error;
      }
      if (false) console.warn(`Warning: Error in route match: ${match.id}`);
      routeOnCatch?.(error, errorInfo);
    },
    children: content
  });
  if (wrapInSuspense) content = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(React$19.Suspense, {
    fallback: pendingElement,
    children: content
  });
  const scrollRestoration = (isServer ?? router.isServer) && route.parentRoute?.id === rootRouteId && router.options.scrollRestoration ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ScrollRestoration, {}) : null;
  const ShellComponent = route.isRoot ? route.options.shellComponent : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(matchContext.Provider, {
    value: match.routeId,
    children: ShellComponent ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ShellComponent, { children: [content, scrollRestoration] }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [content, scrollRestoration] })
  });
}
var MatchInner = React$19.memo(function MatchInnerImpl({ match }) {
  const router = useRouter();
  const routeId = match.routeId;
  const route = router.routesById[routeId];
  const key = React$19.useMemo(() => {
    const remountDeps = (route.options.remountDeps ?? router.options.defaultRemountDeps)?.({
      routeId,
      loaderDeps: match.loaderDeps,
      params: match._strictParams,
      search: match._strictSearch
    });
    return remountDeps ? JSON.stringify(remountDeps) : void 0;
  }, [
    routeId,
    match.loaderDeps,
    match._strictParams,
    match._strictSearch,
    route.options.remountDeps,
    router.options.defaultRemountDeps
  ]);
  const out = React$19.useMemo(() => {
    const Comp = route.options.component ?? router.options.defaultComponent;
    return Comp ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Comp, {}, key) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Outlet, {});
  }, [
    key,
    route.options.component,
    router.options.defaultComponent
  ]);
  if (match.status === "pending") {
    if (router.ssr && !canWrapInSuspense(router, route, match.ssr)) return out;
    if (router._tx) throw router._tx[5];
    return renderPending(router, route);
  }
  if (match.status === "notFound") return renderRouteNotFound(router, route, match.error);
  if (match.status === "error") {
    if (isServer ?? router.isServer) {
      const errorElement = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)((route.options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent, {
        error: match.error,
        reset: void 0,
        info: { componentStack: "" }
      });
      return false ? wrapInNonRouteComponentContext(errorElement, "errorComponent") : errorElement;
    }
    throw match.error;
  }
  return out;
});
var Outlet = React$19.memo(function OutletImpl() {
  if (false) {
    const nonRouteComponent = React$19.useContext(nonRouteComponentContext);
    if (nonRouteComponent) console.warn(`Warning: An <Outlet /> was rendered inside a ${nonRouteComponent}. <Outlet /> should only be rendered inside a route component.`);
  }
  const router = useRouter();
  const routeId = React$19.useContext(matchContext);
  let parentGlobalNotFound;
  let parentNotFoundError;
  let childRouteId;
  if (isServer ?? router.isServer) {
    const matches = router.stores.matches.get();
    const parentIndex = matches.findIndex((match) => match.routeId === routeId);
    const parentMatch = matches[parentIndex];
    parentGlobalNotFound = !!parentMatch._notFound;
    parentNotFoundError = parentMatch.error;
    childRouteId = matches[parentIndex + 1]?.routeId;
  } else {
    const parentMatchStore = router.stores.getMatchStore(routeId);
    [parentGlobalNotFound, parentNotFoundError] = useSelector(parentMatchStore, (match) => [!!match._notFound, match.error], { compare: outletMatchSelectionEqual });
    childRouteId = useSelector(router.stores.ids, (ids) => {
      return ids[ids.indexOf(routeId) + 1];
    });
  }
  if (parentGlobalNotFound) return renderRouteNotFound(router, router.routesById[routeId], parentNotFoundError);
  if (!childRouteId) return null;
  const nextMatch = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Match, { routeId: childRouteId });
  if (routeId === rootRouteId) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(React$19.Suspense, {
    fallback: renderPending(router),
    children: nextMatch
  });
  return nextMatch;
});

// node_modules/@tanstack/react-router/dist/esm/Transitioner.js
import * as React$110 from "react";
function settleOwner(owner, rendered) {
  const settle = owner[1];
  owner.length = 0;
  settle?.(rendered);
}
function Transitioner({ t }) {
  const router = useRouter();
  const acknowledgement = router._rendered ??= [];
  const mounted = false ? React$110.useRef(false) : void 0;
  router.startTransition = (fn, expected) => new Promise((resolve) => {
    settleOwner(acknowledgement, false);
    acknowledgement.push(expected, resolve);
    t(router);
    React$110.startTransition(fn);
  });
  useLayoutEffect2(() => {
    const unsub = router.history.subscribe(router.load);
    if (mounted?.current) return unsub;
    if (mounted) mounted.current = true;
    router.updateLatestLocation();
    const location = router.latestLocation;
    const nextLocation = router.buildLocation({
      to: location.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if (trimPathRight(location.publicHref) !== trimPathRight(nextLocation.publicHref)) {
      router.commitLocation({
        ...nextLocation,
        replace: true,
        ignoreBlocker: true
      });
      return unsub;
    }
    const resolvedLocation = router.stores.resolvedLocation.get();
    if (resolvedLocation?.href === location.href && resolvedLocation.state.__TSR_key === location.state.__TSR_key) acknowledgement.push(router.stores.matches.get(), (rendered) => {
      if (rendered) router.emit({
        type: "onRendered",
        ...getLocationChangeInfo(resolvedLocation, resolvedLocation)
      });
    });
    else if (!router._tx) router.load({ sync: true }).catch(console.error);
    return unsub;
  }, [router, router.history]);
  return null;
}

// node_modules/@tanstack/react-router/dist/esm/Matches.js
import * as React$111 from "react";
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
function Matches() {
  const router = useRouter();
  const rootRoute = router.routesById[rootRouteId];
  const pendingElement = renderPending(router, rootRoute);
  const inner = /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [!(isServer ?? router.isServer) && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Transitioner, { t: React$111.useState()[1] }), (isServer ?? router.isServer) || router.ssr ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(MatchesInner, {}) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(React$111.Suspense, {
    fallback: pendingElement,
    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(MatchesInner, {})
  })] });
  return router.options.InnerWrap ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
  const router = useRouter();
  const acknowledgement = router._rendered;
  const matches = isServer ?? router.isServer ? router.stores.matches.get() : useSelector(router.stores.matches, (value) => acknowledgement[0] ?? value);
  const match = matches[0];
  const routeId = match?.routeId;
  useLayoutEffect2(() => {
    if (acknowledgement[0] === matches) settleOwner(acknowledgement, true);
  }, [acknowledgement, matches]);
  const matchComponent = routeId ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Match, { routeId }) : null;
  return router.options.disableGlobalCatchBoundary ? matchComponent : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(CatchBoundary, {
    getResetKey: () => match,
    onCatch: false ? (error) => {
      console.warn(`Warning: The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!`);
      console.warn("Warning:", error);
    } : void 0,
    children: matchComponent
  });
}

// node_modules/@tanstack/react-router/dist/esm/routerStores.js
var getStoreFactory = (opts) => {
  if (isServer ?? opts.isServer) return {
    createMutableStore: createNonReactiveMutableStore,
    createReadonlyStore: createNonReactiveReadonlyStore,
    batch: (fn) => fn()
  };
  return {
    createMutableStore: createAtom,
    createReadonlyStore: createAtom,
    batch
  };
};

// node_modules/@tanstack/react-router/dist/esm/router.js
var createRouter = (options) => {
  return new Router(options);
};
var Router = class extends RouterCore {
  constructor(options) {
    super(options, getStoreFactory);
  }
};

// node_modules/@tanstack/react-router/dist/esm/RouterProvider.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
import "react";
function RouterContextProvider({ router, children, ...rest }) {
  if (hasKeys(rest)) router.update({
    ...router.options,
    ...rest,
    context: {
      ...router.options.context,
      ...rest.context
    }
  });
  const provider = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(routerContext.Provider, {
    value: router,
    children
  });
  if (router.options.Wrap) return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(router.options.Wrap, { children: provider });
  return provider;
}
function RouterProvider({ router, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(RouterContextProvider, {
    router,
    ...rest,
    children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Matches, {})
  });
}

// node_modules/@tanstack/react-router/dist/esm/useRouterState.js
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 });
  const router = opts?.router || contextRouter;
  if (isServer ?? router.isServer) {
    const state = router.stores.__store.get();
    return opts?.select ? opts.select(state) : state;
  }
  return useSelector(router.stores.__store, useStructuralSharing(opts, router));
}

// node_modules/@gears-frontx/routing-tanstack/dist/index.js
import { useEffect as useEffect3, useMemo as useMemo3 } from "react";
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
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
function attachAdaptedHistory(history2) {
  attachByHistory.get(history2)?.();
}
function defaultReportError(error) {
  console.error("[@gears-frontx/routing-tanstack] navigation blocker or subscriber failed:", error);
}
function dispatchToSubscribers(subscribers, args, reportError) {
  for (const subscriber of Array.from(subscribers)) {
    if (!subscribers.has(subscriber)) {
      continue;
    }
    try {
      subscriber(args);
    } catch (error) {
      reportError(error);
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
  const reportError = options.reportError ?? defaultReportError;
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
      dispatchToSubscribers(subscribers, args, reportError);
    }
    unsubscribeFromNavigationHistory = navigationHistory.subscribe((notification) => {
      const params2 = source.readParams();
      if (params2 === void 0) {
        return;
      }
      currentLocation = buildHistoryLocation(projectParamsToVirtualLocation(params2), notification.location.position);
      const args = { location: currentLocation, action: toSubscriberAction(notification.kind) };
      dispatchToSubscribers(subscribers, args, reportError);
    });
  }
  const write = (path, verb, hash) => {
    const { pathname, search } = splitHref(path);
    try {
      source.write(pathname, search, verb, hash);
    } catch (error) {
      reportError(error);
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
          reportError(error);
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
  const history2 = {
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
      dispatchToSubscribers(subscribers, args, reportError);
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
  attachByHistory.set(history2, attachToNavigationHistory);
  return history2;
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
function defaultReadPageHash() {
  return typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
}
function searchStringToRecord(search) {
  return Object.fromEntries(parseSearchString(search).map((param) => [param.name, param.value]));
}
function locationPreservingRedirect(history2, targetPath, options = {}) {
  const readPageHash = options.readPageHash ?? defaultReadPageHash;
  const currentSearch = history2.location.search;
  const currentHash = readPageHash();
  const redirectOptions = {
    to: targetPath,
    search: searchStringToRecord(currentSearch),
    hash: currentHash
  };
  return redirect(redirectOptions);
}
function createProviderRouter(routeTree, history2, ...[options]) {
  const constructorOptions = { ...options, routeTree, history: history2 };
  return createRouter(constructorOptions);
}
function EngineProvider(props) {
  const fromRouter = "router" in props;
  const providedRouter = fromRouter ? props.router : void 0;
  const routeTree = fromRouter ? void 0 : props.routeTree;
  const providedHistory = fromRouter ? void 0 : props.history;
  const routerOptions = fromRouter ? void 0 : props.routerOptions;
  if (fromRouter ? providedRouter === void 0 : routeTree === void 0 || providedHistory === void 0) {
    throw new Error(
      "EngineProvider requires either a {routeTree, history} pair or a {router} \u2014 received neither. This is only reachable when a caller bypasses this function's own TypeScript overloads."
    );
  }
  const history2 = providedRouter !== void 0 ? providedRouter.history : providedHistory;
  const router = useMemo3(() => {
    if (providedRouter !== void 0) {
      return providedRouter;
    }
    return createProviderRouter(routeTree, providedHistory, routerOptions);
  }, [providedRouter, routeTree, providedHistory, routerOptions]);
  useEffect3(() => {
    attachAdaptedHistory(history2);
    return () => history2.destroy();
  }, [history2]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RouterProvider, { router });
}
export {
  EngineProvider,
  Link,
  Outlet,
  adaptProviderHistory,
  createProviderRouter,
  createRootRoute,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  locationPreservingRedirect,
  notFound,
  redirect,
  useNavigate,
  useParams,
  useRouterState,
  useSearch
};
/*! Bundled license information:

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

use-sync-external-store/cjs/use-sync-external-store-shim.production.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
