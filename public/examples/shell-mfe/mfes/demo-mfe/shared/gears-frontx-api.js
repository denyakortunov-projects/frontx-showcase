var __defProp = Object.defineProperty;
var __export = (target, all3) => {
  for (var name in all3)
    __defProp(target, name, { get: all3[name], enumerable: true });
};

// node_modules/axios/lib/helpers/bind.js
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// node_modules/axios/lib/utils.js
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var { iterator, toStringTag } = Symbol;
var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
var kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
var isString = typeOfTest("string");
var isFunction = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
var isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== "undefined");
};
var isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject(val) && isFunction(val.pipe);
function getGlobal() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  return {};
}
var G = getGlobal();
var FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
var isFormData = (thing) => {
  let kind;
  return thing && (FormDataCtor && thing instanceof FormDataCtor || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(kindOfTest);
var trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
var _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction(val)) {
        Object.defineProperty(a, key, {
          value: bind(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true
        });
      } else {
        Object.defineProperty(a, key, {
          value: val,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    },
    { allOwnKeys }
  );
  return a;
};
var stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, "constructor", {
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
var toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
var noop = () => {
};
var toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
var toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener(
      "message",
      ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      },
      false
    );
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction(_global.postMessage));
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var isIterable = (thing) => thing != null && isFunction(thing[iterator]);
var utils_default = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};

// node_modules/axios/lib/core/AxiosError.js
var AxiosError = class _AxiosError extends Error {
  static from(error, code, config, request, response, customProps) {
    const axiosError = new _AxiosError(error.message, code || error.code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(message, code, config, request, response) {
    super(message);
    Object.defineProperty(this, "message", {
      value: message,
      enumerable: true,
      writable: true,
      configurable: true
    });
    this.name = "AxiosError";
    this.isAxiosError = true;
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status;
    }
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils_default.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
AxiosError.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError.ECONNABORTED = "ECONNABORTED";
AxiosError.ETIMEDOUT = "ETIMEDOUT";
AxiosError.ERR_NETWORK = "ERR_NETWORK";
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError.ERR_CANCELED = "ERR_CANCELED";
AxiosError.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError.ERR_INVALID_URL = "ERR_INVALID_URL";
var AxiosError_default = AxiosError;

// node_modules/axios/lib/helpers/null.js
var null_default = null;

// node_modules/axios/lib/helpers/toFormData.js
function isVisitable(thing) {
  return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
function removeBrackets(key) {
  return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils_default.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (null_default || FormData)();
  options = utils_default.toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false
    },
    false,
    function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    }
  );
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
  if (!utils_default.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils_default.isDate(value)) {
      return value.toISOString();
    }
    if (utils_default.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils_default.isBlob(value)) {
      throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
    }
    if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    if (value && !path && typeof value === "object") {
      if (utils_default.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils_default.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils_default.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils_default.forEach(value, function each(el, key) {
      const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils_default.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
var toFormData_default = toFormData;

// node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function encode(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData_default(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams;

// node_modules/axios/lib/helpers/buildURL.js
function encode2(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode2;
  const _options = utils_default.isFunction(options) ? {
    serialize: options
  } : options;
  const serializeFn = _options && _options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, _options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}

// node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager = class {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils_default.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
};
var InterceptorManager_default = InterceptorManager;

// node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true
};

// node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

// node_modules/axios/lib/platform/browser/classes/FormData.js
var FormData_default = typeof FormData !== "undefined" ? FormData : null;

// node_modules/axios/lib/platform/browser/classes/Blob.js
var Blob_default = typeof Blob !== "undefined" ? Blob : null;

// node_modules/axios/lib/platform/browser/index.js
var browser_default = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams_default,
    FormData: FormData_default,
    Blob: Blob_default
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};

// node_modules/axios/lib/platform/common/utils.js
var utils_exports = {};
__export(utils_exports, {
  hasBrowserEnv: () => hasBrowserEnv,
  hasStandardBrowserEnv: () => hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
  navigator: () => _navigator,
  origin: () => origin
});
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
var hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";

// node_modules/axios/lib/platform/index.js
var platform_default = {
  ...utils_exports,
  ...browser_default
};

// node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
  return toFormData_default(data, new platform_default.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform_default.isNode && utils_default.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}

// node_modules/axios/lib/helpers/formDataToJSON.js
function parsePropPath(name) {
  return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils_default.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils_default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils_default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils_default.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
    const obj = {};
    utils_default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
var formDataToJSON_default = formDataToJSON;

// node_modules/axios/lib/defaults/index.js
function stringifySafely(rawValue, parser, encoder) {
  if (utils_default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils_default.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
  transitional: transitional_default,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils_default.isObject(data);
      if (isObjectPayload && utils_default.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils_default.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
      }
      if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (utils_default.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils_default.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData_default(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }
  ],
  transformResponse: [
    function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data, this.parseReviver);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform_default.classes.FormData,
    Blob: platform_default.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
var defaults_default = defaults;

// node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};

// node_modules/axios/lib/core/AxiosHeaders.js
var $internals = /* @__PURE__ */ Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils_default.isArray(value) ? value.map(normalizeValue) : String(value).replace(/[\r\n]+$/, "");
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils_default.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils_default.isString(value)) return;
  if (utils_default.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils_default.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils_default.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
var AxiosHeaders = class {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils_default.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders_default(header), valueOrRewrite);
    } else if (utils_default.isObject(header) && utils_default.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils_default.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils_default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils_default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils_default.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils_default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils_default.forEach(this, (value, header) => {
      const key = utils_default.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils_default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils_default.freezeMethods(AxiosHeaders);
var AxiosHeaders_default = AxiosHeaders;

// node_modules/axios/lib/core/transformData.js
function transformData(fns, response) {
  const config = this || defaults_default;
  const context = response || config;
  const headers = AxiosHeaders_default.from(context.headers);
  let data = context.data;
  utils_default.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}

// node_modules/axios/lib/cancel/isCancel.js
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

// node_modules/axios/lib/cancel/CanceledError.js
var CanceledError = class extends AxiosError_default {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
    this.__CANCEL__ = true;
  }
};
var CanceledError_default = CanceledError;

// node_modules/axios/lib/core/settle.js
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(
      new AxiosError_default(
        "Request failed with status code " + response.status,
        [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      )
    );
  }
}

// node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}

// node_modules/axios/lib/helpers/speedometer.js
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
var speedometer_default = speedometer;

// node_modules/axios/lib/helpers/throttle.js
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
var throttle_default = throttle;

// node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer_default(50, 250);
  return throttle_default((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
var progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [
    (loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }),
    throttled[1]
  ];
};
var asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform_default.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform_default.origin),
  platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)
) : () => true;

// node_modules/axios/lib/helpers/cookies.js
var cookies_default = platform_default.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === "undefined") return;
      const cookie = [`${name}=${encodeURIComponent(value)}`];
      if (utils_default.isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (utils_default.isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (utils_default.isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      if (utils_default.isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }
      document.cookie = cookie.join("; ");
    },
    read(name) {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);

// node_modules/axios/lib/helpers/isAbsoluteURL.js
function isAbsoluteURL(url) {
  if (typeof url !== "string") {
    return false;
  }
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

// node_modules/axios/lib/helpers/combineURLs.js
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

// node_modules/axios/lib/core/buildFullPath.js
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

// node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
      return utils_default.merge.call({ caseless }, target, source);
    } else if (utils_default.isPlainObject(source)) {
      return utils_default.merge({}, source);
    } else if (utils_default.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils_default.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
    const merge2 = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

// node_modules/axios/lib/helpers/resolveConfig.js
var resolveConfig_default = (config) => {
  const newConfig = mergeConfig({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders_default.from(headers);
  newConfig.url = buildURL(
    buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls),
    config.params,
    config.paramsSerializer
  );
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa(
        (auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")
      )
    );
  }
  if (utils_default.isFormData(data)) {
    if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils_default.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform_default.hasStandardBrowserEnv) {
    withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};

// node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
var xhr_default = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig_default(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders_default.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(
        function _resolve(value) {
          resolve(value);
          done();
        },
        function _reject(err) {
          reject(err);
          done();
        },
        response
      );
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError_default(msg, AxiosError_default.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitional_default;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(
        new AxiosError_default(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          config,
          request
        )
      );
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils_default.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
      reject(
        new AxiosError_default(
          "Unsupported protocol " + protocol + ":",
          AxiosError_default.ERR_BAD_REQUEST,
          config
        )
      );
      return;
    }
    request.send(requestData || null);
  });
};

// node_modules/axios/lib/helpers/composeSignals.js
var composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(
          err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err)
        );
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError_default(`timeout of ${timeout}ms exceeded`, AxiosError_default.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils_default.asap(unsubscribe);
    return signal;
  }
};
var composeSignals_default = composeSignals;

// node_modules/axios/lib/helpers/trackStream.js
var streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
var readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
var readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
var trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator2.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator2.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
};

// node_modules/axios/lib/adapters/fetch.js
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var { isFunction: isFunction2 } = utils_default;
var globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils_default.global);
var { ReadableStream: ReadableStream2, TextEncoder } = utils_default.global;
var test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
var factory = (env) => {
  env = utils_default.merge.call(
    {
      skipUndefined: true
    },
    globalFetchAPI,
    env
  );
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction2(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction2(Request);
  const isResponseSupported = isFunction2(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction2(ReadableStream2);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const body = new ReadableStream2();
    const hasContentType = new Request(platform_default.origin, {
      body,
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    body.cancel();
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError_default(
          `Response type '${type}' is not supported`,
          AxiosError_default.ERR_NOT_SUPPORT,
          config
        );
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils_default.isBlob(body)) {
      return body.size;
    }
    if (utils_default.isSpecCompliantForm(body)) {
      const _request = new Request(platform_default.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils_default.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils_default.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils_default.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig_default(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals_default(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils_default.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](
        response,
        config
      );
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders_default.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError_default(
            "Network Error",
            AxiosError_default.ERR_NETWORK,
            config,
            request,
            err && err.response
          ),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError_default.from(err, err && err.code, config, request, err && err.response);
    }
  };
};
var seedCache = /* @__PURE__ */ new Map();
var getFetch = (config) => {
  let env = config && config.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [Request, Response, fetch2];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
var adapter = getFetch();

// node_modules/axios/lib/adapters/adapters.js
var knownAdapters = {
  http: null_default,
  xhr: xhr_default,
  fetch: {
    get: getFetch
  }
};
utils_default.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var renderReason = (reason) => `- ${reason}`;
var isResolvedHandle = (adapter2) => utils_default.isFunction(adapter2) || adapter2 === null || adapter2 === false;
function getAdapter(adapters, config) {
  adapters = utils_default.isArray(adapters) ? adapters : [adapters];
  const { length } = adapters;
  let nameOrAdapter;
  let adapter2;
  const rejectedReasons = {};
  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters[i];
    let id;
    adapter2 = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter2 = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
      if (adapter2 === void 0) {
        throw new AxiosError_default(`Unknown adapter '${id}'`);
      }
    }
    if (adapter2 && (utils_default.isFunction(adapter2) || (adapter2 = adapter2.get(config)))) {
      break;
    }
    rejectedReasons[id || "#" + i] = adapter2;
  }
  if (!adapter2) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError_default(
      `There is no suitable adapter to dispatch the request ` + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return adapter2;
}
var adapters_default = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};

// node_modules/axios/lib/core/dispatchRequest.js
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError_default(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders_default.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter2 = adapters_default.getAdapter(config.adapter || defaults_default.adapter, config);
  return adapter2(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    },
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    }
  );
}

// node_modules/axios/lib/env/data.js
var VERSION = "1.14.0";

// node_modules/axios/lib/helpers/validator.js
var validators = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError_default(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError_default.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator ? validator(value, opt, opts) : true;
  };
};
validators.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === void 0 || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError_default(
          "option " + opt + " must be " + result,
          AxiosError_default.ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
    }
  }
}
var validator_default = {
  assertOptions,
  validators
};

// node_modules/axios/lib/core/Axios.js
var validators2 = validator_default.validators;
var Axios = class {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager_default(),
      response: new InterceptorManager_default()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator_default.assertOptions(
        transitional2,
        {
          silentJSONParsing: validators2.transitional(validators2.boolean),
          forcedJSONParsing: validators2.transitional(validators2.boolean),
          clarifyTimeoutError: validators2.transitional(validators2.boolean),
          legacyInterceptorReqResOrdering: validators2.transitional(validators2.boolean)
        },
        false
      );
    }
    if (paramsSerializer != null) {
      if (utils_default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator_default.assertOptions(
          paramsSerializer,
          {
            encode: validators2.function,
            serialize: validators2.function
          },
          true
        );
      }
    }
    if (config.allowAbsoluteUrls !== void 0) {
    } else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator_default.assertOptions(
      config,
      {
        baseUrl: validators2.spelling("baseURL"),
        withXsrfToken: validators2.spelling("withXSRFToken")
      },
      true
    );
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
    headers && utils_default.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      const transitional3 = config.transitional || transitional_default;
      const legacyInterceptorReqResOrdering = transitional3 && transitional3.legacyInterceptorReqResOrdering;
      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(
      mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      })
    );
  };
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        })
      );
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios;

// node_modules/axios/lib/cancel/CancelToken.js
var CancelToken = class _CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError_default(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new _CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
var CancelToken_default = CancelToken;

// node_modules/axios/lib/helpers/spread.js
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

// node_modules/axios/lib/helpers/isAxiosError.js
function isAxiosError(payload) {
  return utils_default.isObject(payload) && payload.isAxiosError === true;
}

// node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
var HttpStatusCode_default = HttpStatusCode;

// node_modules/axios/lib/axios.js
function createInstance(defaultConfig) {
  const context = new Axios_default(defaultConfig);
  const instance = bind(Axios_default.prototype.request, context);
  utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
  utils_default.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults_default);
axios.Axios = Axios_default;
axios.CanceledError = CanceledError_default;
axios.CancelToken = CancelToken_default;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData_default;
axios.AxiosError = AxiosError_default;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders_default;
axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode_default;
axios.default = axios;
var axios_default = axios;

// node_modules/axios/index.js
var {
  Axios: Axios2,
  AxiosError: AxiosError2,
  CanceledError: CanceledError2,
  isCancel: isCancel2,
  CancelToken: CancelToken2,
  VERSION: VERSION2,
  all: all2,
  Cancel,
  isAxiosError: isAxiosError2,
  spread: spread2,
  toFormData: toFormData2,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode: HttpStatusCode2,
  formToJSON,
  getAdapter: getAdapter2,
  mergeConfig: mergeConfig2
} = axios_default;

// node_modules/@gears-frontx/api/dist/index.js
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    "use strict";
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    "use strict";
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    "use strict";
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    "use strict";
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    "use strict";
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    "use strict";
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    "use strict";
    function isObject2(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject2;
  }
});
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObject2 = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction3(value) {
      if (!isObject2(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction3;
  }
});
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    "use strict";
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    "use strict";
    var coreJsData = require_coreJsData();
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    "use strict";
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    "use strict";
    var isFunction3 = require_isFunction();
    var isMasked = require_isMasked();
    var isObject2 = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction3(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    "use strict";
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    "use strict";
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    module.exports = defineProperty;
  }
});
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    "use strict";
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    "use strict";
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});
var require_assignValue = __commonJS({
  "node_modules/lodash/_assignValue.js"(exports, module) {
    "use strict";
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty2.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});
var require_copyObject = __commonJS({
  "node_modules/lodash/_copyObject.js"(exports, module) {
    "use strict";
    var assignValue = require_assignValue();
    var baseAssignValue = require_baseAssignValue();
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    module.exports = copyObject;
  }
});
var require_identity = __commonJS({
  "node_modules/lodash/identity.js"(exports, module) {
    "use strict";
    function identity(value) {
      return value;
    }
    module.exports = identity;
  }
});
var require_apply = __commonJS({
  "node_modules/lodash/_apply.js"(exports, module) {
    "use strict";
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    module.exports = apply;
  }
});
var require_overRest = __commonJS({
  "node_modules/lodash/_overRest.js"(exports, module) {
    "use strict";
    var apply = require_apply();
    var nativeMax = Math.max;
    function overRest(func, start, transform) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }
    module.exports = overRest;
  }
});
var require_constant = __commonJS({
  "node_modules/lodash/constant.js"(exports, module) {
    "use strict";
    function constant(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant;
  }
});
var require_baseSetToString = __commonJS({
  "node_modules/lodash/_baseSetToString.js"(exports, module) {
    "use strict";
    var constant = require_constant();
    var defineProperty = require_defineProperty();
    var identity = require_identity();
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    module.exports = baseSetToString;
  }
});
var require_shortOut = __commonJS({
  "node_modules/lodash/_shortOut.js"(exports, module) {
    "use strict";
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var nativeNow = Date.now;
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    module.exports = shortOut;
  }
});
var require_setToString = __commonJS({
  "node_modules/lodash/_setToString.js"(exports, module) {
    "use strict";
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});
var require_baseRest = __commonJS({
  "node_modules/lodash/_baseRest.js"(exports, module) {
    "use strict";
    var identity = require_identity();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + "");
    }
    module.exports = baseRest;
  }
});
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    "use strict";
    var isFunction3 = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction3(value);
    }
    module.exports = isArrayLike;
  }
});
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});
var require_isIterateeCall = __commonJS({
  "node_modules/lodash/_isIterateeCall.js"(exports, module) {
    "use strict";
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject2 = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject2(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});
var require_createAssigner = __commonJS({
  "node_modules/lodash/_createAssigner.js"(exports, module) {
    "use strict";
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
  }
});
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    "use strict";
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    "use strict";
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    "use strict";
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    "use strict";
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    "use strict";
    var isArray2 = Array.isArray;
    module.exports = isArray2;
  }
});
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    "use strict";
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    "use strict";
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer || stubFalse;
    module.exports = isBuffer2;
  }
});
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    "use strict";
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    "use strict";
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  }
});
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    "use strict";
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray2;
  }
});
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    "use strict";
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray2 = require_isArray();
    var isBuffer2 = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray2 = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    "use strict";
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    "use strict";
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    "use strict";
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    "use strict";
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});
var require_assign = __commonJS({
  "node_modules/lodash/assign.js"(exports, module) {
    "use strict";
    var assignValue = require_assignValue();
    var copyObject = require_copyObject();
    var createAssigner = require_createAssigner();
    var isArrayLike = require_isArrayLike();
    var isPrototype = require_isPrototype();
    var keys = require_keys();
    var objectProto = Object.prototype;
    var hasOwnProperty2 = objectProto.hasOwnProperty;
    var assign2 = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty2.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });
    module.exports = assign2;
  }
});
var MOCK_PLUGIN = /* @__PURE__ */ Symbol.for("frontx:plugin:mock");
function isMockPlugin(plugin) {
  if (!plugin || typeof plugin !== "object") return false;
  const constructor = plugin.constructor;
  if (constructor === null || typeof constructor !== "object" && typeof constructor !== "function") {
    return false;
  }
  return MOCK_PLUGIN in constructor;
}
var ApiProtocol = class {
};
var ApiPluginBase = class {
};
var ApiPlugin = class extends ApiPluginBase {
  constructor(config) {
    super();
    this.config = config;
  }
  config;
};
function isShortCircuit(result) {
  return result !== void 0 && "shortCircuit" in result;
}
function isRestShortCircuit(result) {
  return result !== void 0 && "shortCircuit" in result && typeof result.shortCircuit === "object" && "status" in result.shortCircuit;
}
function isSseShortCircuit(result) {
  return result !== void 0 && "shortCircuit" in result && typeof result.shortCircuit === "object" && "close" in result.shortCircuit;
}
var RestPlugin = class {
  /** Default destroy implementation - override if cleanup needed */
  destroy() {
  }
};
var RestPluginWithConfig = class {
  constructor(config) {
    this.config = config;
  }
  config;
  /** Default destroy implementation - override if cleanup needed */
  destroy() {
  }
};
var SsePlugin = class {
  /** Default destroy implementation - override if cleanup needed */
  destroy() {
  }
};
var SsePluginWithConfig = class {
  constructor(config) {
    this.config = config;
  }
  config;
  /** Default destroy implementation - override if cleanup needed */
  destroy() {
  }
};
var BaseApiService = class {
  /** Base configuration for all requests */
  config;
  /** Registered protocols by constructor name */
  protocols = /* @__PURE__ */ new Map();
  /** Service-specific plugins (new class-based system) */
  servicePlugins = [];
  /** Excluded global plugin classes */
  excludedPluginClasses = /* @__PURE__ */ new Set();
  /** Registered plugins for framework management (generic storage - not mock-specific) */
  registeredPluginsMap = /* @__PURE__ */ new Map();
  constructor(config, ...protocols) {
    this.config = Object.freeze({ ...config });
    protocols.forEach((protocol) => {
      protocol.initialize(
        this.config,
        () => this.getExcludedPluginClasses()
      );
      this.protocols.set(protocol.constructor.name, protocol);
    });
  }
  // ============================================================================
  // Namespaced Plugin API (Service-Level)
  // ============================================================================
  /**
   * Namespaced plugin API for service-level plugin management.
   * Provides methods to add service-specific plugins, exclude global plugins,
   * and query plugin state.
   */
  plugins = {
    /**
     * Add one or more service-specific plugins.
     * Plugins are executed in FIFO order (first added executes first).
     * Duplicates of the same class ARE allowed (for different configurations).
     *
     * @param plugins - Plugin instances to add
     *
     * @example
     * ```typescript
     * class MyService extends BaseApiService {
     *   constructor() {
     *     super({ baseURL: '/api' }, new RestProtocol());
     *     this.plugins.add(
     *       new RateLimitPlugin({ limit: 100 }),
     *       new RetryPlugin({ maxRetries: 3 })
     *     );
     *   }
     * }
     * ```
     */
    add: (...plugins) => {
      this.servicePlugins.push(...plugins);
    },
    /**
     * Exclude global plugin classes from this service.
     * Excluded plugins will not be applied to requests through this service.
     *
     * @param pluginClasses - Plugin classes to exclude
     *
     * @example
     * ```typescript
     * class HealthCheckService extends BaseApiService {
     *   constructor() {
     *     super({ baseURL: '/health' }, new RestProtocol());
     *     // Don't apply authentication to health checks
     *     this.plugins.exclude(AuthPlugin);
     *   }
     * }
     * ```
     */
    exclude: (...pluginClasses) => {
      pluginClasses.forEach((cls) => this.excludedPluginClasses.add(cls));
    },
    /**
     * Get all excluded plugin classes.
     *
     * @returns Readonly array of excluded plugin classes
     *
     * @example
     * ```typescript
     * const excluded = service.plugins.getExcluded();
     * console.log(`${excluded.length} plugin classes excluded`);
     * ```
     */
    getExcluded: () => {
      return Array.from(this.excludedPluginClasses);
    },
    /**
     * Get all service-specific plugins.
     * Does NOT include global plugins.
     *
     * @returns Readonly array of service plugins in FIFO order
     *
     * @example
     * ```typescript
     * const plugins = service.plugins.getAll();
     * console.log(`${plugins.length} service plugins registered`);
     * ```
     */
    getAll: () => {
      return [...this.servicePlugins];
    },
    /**
     * Get a plugin instance by class reference.
     * Searches service-specific plugins first, then global plugins.
     * Returns undefined if plugin is not found.
     *
     * @template T - Plugin type
     * @param pluginClass - Plugin class to retrieve
     * @returns Plugin instance or undefined
     *
     * @example
     * ```typescript
     * const rateLimit = service.plugins.getPlugin(RateLimitPlugin);
     * if (rateLimit) {
     *   console.log('Rate limit plugin found');
     * }
     *
     * // Can also find global plugins
     * const auth = service.plugins.getPlugin(AuthPlugin);
     * ```
     */
    getPlugin: (pluginClass) => {
      const servicePlugin = this.servicePlugins.find(
        (p) => p instanceof pluginClass
      );
      return servicePlugin;
    }
  };
  // ============================================================================
  // Plugin Merging
  // ============================================================================
  /**
   * Get merged plugins in FIFO order.
   * Returns only service plugins (global protocol plugins are managed by protocols directly).
   *
   * @returns Readonly array of service plugins in execution order
   *
   * @internal
   */
  getMergedPluginsInOrder() {
    return [...this.servicePlugins];
  }
  /**
   * Get excluded plugin classes.
   * Used by protocols to filter global plugins.
   *
   * @returns Readonly set of excluded plugin classes
   *
   * @internal
   */
  getExcludedPluginClasses() {
    return this.excludedPluginClasses;
  }
  /**
   * Get merged plugins in reverse order.
   * Used for response phase processing (onion model).
   *
   * @returns Readonly array of merged plugins in reverse execution order
   *
   * @internal
   */
  getMergedPluginsReversed() {
    return [...this.getMergedPluginsInOrder()].reverse();
  }
  // ============================================================================
  // Framework Plugin Management (GENERIC - not mock-specific)
  // ============================================================================
  /**
   * Register a plugin for a protocol (GENERIC - not mock-specific).
   * Plugin is stored but NOT added to protocol.
   * Framework controls activation based on plugin type and state.
   *
   * @param protocol - Protocol instance owned by this service
   * @param plugin - Any plugin instance (mock or non-mock)
   *
   * @example
   * ```typescript
   * class ChatApiService extends BaseApiService {
   *   constructor() {
   *     const restProtocol = new RestProtocol();
   *     super({ baseURL: '/api/chat' }, restProtocol);
   *
   *     // Register mock plugin (framework controls when it's active)
   *     this.registerPlugin(
   *       restProtocol,
   *       new RestMockPlugin({ mockMap: chatMockMap })
   *     );
   *   }
   * }
   * ```
   */
  registerPlugin(protocol, plugin) {
    const registered = this.protocols.get(protocol.constructor.name);
    if (registered !== protocol) {
      throw new Error(
        `Protocol "${protocol.constructor.name}" not registered on this service`
      );
    }
    if (!this.registeredPluginsMap.has(protocol)) {
      this.registeredPluginsMap.set(protocol, /* @__PURE__ */ new Set());
    }
    this.registeredPluginsMap.get(protocol).add(plugin);
  }
  /**
   * Get all registered plugins (GENERIC - returns all plugins).
   * Framework uses isMockPlugin() type guard to filter for mock plugins.
   *
   * @returns ReadonlyMap of protocol -> plugins
   *
   * @example
   * ```typescript
   * // Framework code
   * for (const service of apiRegistry.getAll()) {
   *   const registeredPlugins = service.getPlugins();
   *   for (const [protocol, plugins] of registeredPlugins) {
   *     for (const plugin of plugins) {
   *       if (isMockPlugin(plugin)) {
   *         // Handle mock plugin activation/deactivation
   *       }
   *     }
   *   }
   * }
   * ```
   */
  getPlugins() {
    return this.registeredPluginsMap;
  }
  // ============================================================================
  // Protocol Access
  // ============================================================================
  /**
   * Get a registered protocol by class.
   * Type-safe: Returns correctly typed protocol.
   *
   * @param type - Protocol class constructor
   * @returns The protocol instance
   * @throws Error if protocol not registered
   */
  // @cpt-flow:cpt-frontx-flow-api-protocol-surface-service-call:p1
  // @cpt-begin:cpt-frontx-flow-api-protocol-surface-service-call:p1:inst-obtain-protocol
  protocol(type) {
    const protocol = this.protocols.get(type.name);
    if (!protocol) {
      throw new Error(
        `Protocol "${type.name}" is not registered on this service.`
      );
    }
    return protocol;
  }
  // @cpt-end:cpt-frontx-flow-api-protocol-surface-service-call:p1:inst-obtain-protocol
  // ============================================================================
  // Cleanup
  // ============================================================================
  /**
   * Cleanup service resources.
   * Called when service is destroyed.
   */
  cleanup() {
    this.protocols.forEach((protocol) => protocol.cleanup());
    this.protocols.clear();
  }
};
var ProtocolPluginRegistry = class {
  protocolPlugins = /* @__PURE__ */ new Map();
  add(protocolClass, plugin) {
    if (!this.protocolPlugins.has(protocolClass)) {
      this.protocolPlugins.set(protocolClass, /* @__PURE__ */ new Set());
    }
    this.protocolPlugins.get(protocolClass).add(plugin);
  }
  remove(protocolClass, pluginClass) {
    const plugins = this.protocolPlugins.get(protocolClass);
    if (!plugins) {
      return;
    }
    for (const plugin of plugins) {
      if (plugin instanceof pluginClass) {
        if (typeof plugin.destroy === "function") {
          plugin.destroy();
        }
        plugins.delete(plugin);
        break;
      }
    }
  }
  has(protocolClass, pluginClass) {
    const plugins = this.protocolPlugins.get(protocolClass);
    if (!plugins) {
      return false;
    }
    for (const plugin of plugins) {
      if (plugin instanceof pluginClass) {
        return true;
      }
    }
    return false;
  }
  // @cpt-algo:cpt-frontx-algo-api-protocol-surface-protocol-dispatch:p1
  getAll(protocolClass) {
    const plugins = this.protocolPlugins.get(protocolClass);
    if (!plugins) {
      return [];
    }
    return Array.from(plugins).filter((_plugin) => {
      return true;
    });
  }
  clear(protocolClass) {
    const plugins = this.protocolPlugins.get(protocolClass);
    if (!plugins) {
      return;
    }
    for (const plugin of plugins) {
      if (typeof plugin.destroy === "function") {
        plugin.destroy();
      }
    }
    plugins.clear();
  }
  reset() {
    this.protocolPlugins.forEach((plugins) => {
      plugins.forEach((plugin) => {
        if (typeof plugin.destroy === "function") {
          plugin.destroy();
        }
      });
      plugins.clear();
    });
    this.protocolPlugins.clear();
  }
};
var protocolPluginRegistry = new ProtocolPluginRegistry();
var DEFAULT_SHARED_FETCH_STALE_TIME = 3e4;
var SHARED_FETCH_CACHE_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:fetch-cache");
var SHARED_FETCH_CACHE_RETAINERS_SYMBOL = /* @__PURE__ */ Symbol.for("frontx:fetch-cache-retainers");
function resolveSharedFetchCacheRetainers(host) {
  const retainers = host[SHARED_FETCH_CACHE_RETAINERS_SYMBOL];
  if (typeof retainers !== "number" || !Number.isFinite(retainers) || retainers < 0) {
    return 0;
  }
  return retainers;
}
function createAbortError(reason) {
  if (reason instanceof Error && reason.name === "AbortError") {
    return reason;
  }
  if (reason instanceof Error) {
    const error2 = new Error(reason.message);
    Object.defineProperty(error2, "cause", {
      value: reason,
      configurable: true,
      enumerable: false,
      writable: true
    });
    error2.name = "AbortError";
    return error2;
  }
  if (typeof DOMException !== "undefined") {
    return new DOMException("The operation was aborted.", "AbortError");
  }
  const error = new Error("The operation was aborted.");
  error.name = "AbortError";
  return error;
}
function compareObjectKeysAlphabetically(a, b) {
  return String.prototype.localeCompare.call(a, b);
}
function stableSerialize(value) {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(",")}]`;
  }
  if (typeof value === "object") {
    const record = value;
    const keys = Object.keys(record).sort(compareObjectKeysAlphabetically);
    const entries = keys.map((key) => {
      const serializedKey = JSON.stringify(key);
      const serializedValue = stableSerialize(record[key]);
      return serializedKey + ":" + serializedValue;
    });
    return "{" + entries.join(",") + "}";
  }
  if (value === void 0) {
    return "undefined";
  }
  return JSON.stringify(value);
}
function resolveCacheKey(key) {
  return stableSerialize(key);
}
function resolveSharedFetchStaleTime(staleTime) {
  return staleTime ?? DEFAULT_SHARED_FETCH_STALE_TIME;
}
function mergeSharedFetchStaleTime(current, next) {
  if (current === Number.POSITIVE_INFINITY || next === Number.POSITIVE_INFINITY) {
    return Number.POSITIVE_INFINITY;
  }
  if (Number.isNaN(current)) {
    return next;
  }
  if (Number.isNaN(next)) {
    return current;
  }
  return Math.max(current, next);
}
function isEntryFresh(entry, staleTime, now) {
  if (staleTime <= 0 || entry.resolvedAt === void 0) {
    return false;
  }
  if (staleTime === Number.POSITIVE_INFINITY) {
    return true;
  }
  return entry.resolvedAt + staleTime > now;
}
function matchesSerializedPrefix(cacheKey, filters) {
  if (filters.key === void 0) {
    return false;
  }
  const serializedKey = resolveCacheKey(filters.key);
  if (filters.exact !== false) {
    return cacheKey === serializedKey;
  }
  if (filters.key.length === 0) {
    return false;
  }
  return cacheKey === serializedKey || cacheKey.startsWith(`${serializedKey.slice(0, -1)},`);
}
var SharedFetchCacheImpl = class {
  entries = /* @__PURE__ */ new Map();
  primaryKeysByAlias = /* @__PURE__ */ new Map();
  aliasesByPrimaryKey = /* @__PURE__ */ new Map();
  versions = /* @__PURE__ */ new Map();
  lookup(key, options) {
    const cacheKey = resolveCacheKey(key);
    const version = this.versions.get(cacheKey) ?? 0;
    const entry = this.entries.get(cacheKey);
    if (!entry || entry.version !== version || entry.pending) {
      return { hit: false };
    }
    if (!isEntryFresh(entry, resolveSharedFetchStaleTime(options?.staleTime), Date.now())) {
      return { hit: false };
    }
    return {
      hit: true,
      data: entry.data
    };
  }
  isPending(key) {
    const cacheKey = resolveCacheKey(key);
    const version = this.versions.get(cacheKey) ?? 0;
    const entry = this.entries.get(cacheKey);
    return entry?.version === version && entry.pending === true;
  }
  getOrFetch(key, fetcher, options) {
    if (options?.signal?.aborted) {
      return Promise.reject(createAbortError(options.signal.reason));
    }
    const cacheKey = resolveCacheKey(key);
    const version = this.versions.get(cacheKey) ?? 0;
    const now = Date.now();
    const existingEntry = this.entries.get(cacheKey);
    const requestedStaleTime = resolveSharedFetchStaleTime(options?.staleTime);
    this.registerAliases(cacheKey, options?.aliases);
    if (existingEntry && existingEntry.version === version && !existingEntry.pending && isEntryFresh(existingEntry, requestedStaleTime, now)) {
      return Promise.resolve(existingEntry.data);
    }
    if (existingEntry && existingEntry.version === version && existingEntry.pending) {
      existingEntry.maxStaleTime = mergeSharedFetchStaleTime(
        existingEntry.maxStaleTime,
        requestedStaleTime
      );
      return this.attachConsumer(existingEntry, options?.signal);
    }
    const controller = new AbortController();
    const entry = {
      activeConsumers: 0,
      controller,
      pending: true,
      maxStaleTime: requestedStaleTime,
      promise: Promise.resolve().then(() => fetcher({ signal: controller.signal })).then((data) => {
        entry.pending = false;
        if (this.entries.get(cacheKey) === entry && (this.versions.get(cacheKey) ?? 0) === version) {
          const staleTime = entry.maxStaleTime;
          if (staleTime > 0) {
            entry.data = data;
            entry.resolvedAt = Date.now();
          } else {
            this.entries.delete(cacheKey);
            this.removeAliases(cacheKey);
          }
        }
        this.cleanupVersion(cacheKey, version);
        return data;
      }).catch((error) => {
        entry.pending = false;
        if (this.entries.get(cacheKey) === entry) {
          this.entries.delete(cacheKey);
          this.removeAliases(cacheKey);
        }
        this.cleanupVersion(cacheKey, version);
        throw error;
      }),
      version
    };
    this.entries.set(cacheKey, entry);
    return this.attachConsumer(entry, options?.signal);
  }
  invalidate(key) {
    this.invalidateMany({ key });
  }
  invalidateMany(filters = {}) {
    if (filters.key === void 0) {
      return;
    }
    const matchingKeys = /* @__PURE__ */ new Set();
    this.entries.forEach((_entry, cacheKey) => {
      if (matchesSerializedPrefix(cacheKey, filters)) {
        matchingKeys.add(cacheKey);
      }
    });
    this.versions.forEach((_version, cacheKey) => {
      if (matchesSerializedPrefix(cacheKey, filters)) {
        matchingKeys.add(cacheKey);
      }
    });
    this.primaryKeysByAlias.forEach((primaryKeys, aliasKey) => {
      if (!matchesSerializedPrefix(aliasKey, filters)) {
        return;
      }
      primaryKeys.forEach((cacheKey) => {
        matchingKeys.add(cacheKey);
      });
    });
    matchingKeys.forEach((cacheKey) => {
      this.invalidateCacheKey(cacheKey);
    });
  }
  clear() {
    this.entries.forEach((entry) => {
      if (entry.pending) {
        entry.controller.abort(createAbortError());
      }
    });
    this.entries.clear();
    this.aliasesByPrimaryKey.clear();
    this.primaryKeysByAlias.clear();
    this.versions.clear();
  }
  /** @internal Test-only accessor used by `inspectSharedFetchCacheBookkeepingForTest`. */
  peekBookkeepingForTest() {
    return {
      entries: this.entries.size,
      aliasesByPrimaryKey: this.aliasesByPrimaryKey.size,
      primaryKeysByAlias: this.primaryKeysByAlias.size,
      versions: this.versions.size
    };
  }
  registerAliases(primaryCacheKey, aliases) {
    if (!aliases || aliases.length === 0) {
      return;
    }
    const primaryAliases = this.aliasesByPrimaryKey.get(primaryCacheKey) ?? /* @__PURE__ */ new Set();
    aliases.forEach((alias) => {
      const aliasKey = resolveCacheKey(alias);
      primaryAliases.add(aliasKey);
      const aliasedPrimaryKeys = this.primaryKeysByAlias.get(aliasKey) ?? /* @__PURE__ */ new Set();
      aliasedPrimaryKeys.add(primaryCacheKey);
      this.primaryKeysByAlias.set(aliasKey, aliasedPrimaryKeys);
    });
    this.aliasesByPrimaryKey.set(primaryCacheKey, primaryAliases);
  }
  attachConsumer(entry, signal) {
    if (signal?.aborted) {
      return Promise.reject(createAbortError(signal.reason));
    }
    entry.activeConsumers += 1;
    return new Promise((resolve, reject) => {
      let released = false;
      const release = () => {
        if (released) {
          return;
        }
        released = true;
        signal?.removeEventListener("abort", onAbort);
        entry.activeConsumers -= 1;
        if (entry.pending && entry.activeConsumers === 0) {
          entry.controller.abort(createAbortError(signal?.reason));
        }
      };
      const onAbort = () => {
        release();
        reject(createAbortError(signal?.reason));
      };
      signal?.addEventListener("abort", onAbort, { once: true });
      entry.promise.then(
        (data) => {
          if (released) {
            return;
          }
          release();
          resolve(data);
        },
        (error) => {
          if (released) {
            return;
          }
          release();
          reject(error);
        }
      );
    });
  }
  invalidateCacheKey(cacheKey) {
    const entry = this.entries.get(cacheKey);
    if (entry?.pending) {
      entry.controller.abort(createAbortError());
      this.versions.set(cacheKey, entry.version + 1);
    } else {
      this.versions.delete(cacheKey);
    }
    this.entries.delete(cacheKey);
    this.removeAliases(cacheKey);
  }
  cleanupVersion(cacheKey, version) {
    if (this.entries.has(cacheKey)) {
      return;
    }
    if (this.versions.get(cacheKey) === version + 1) {
      this.versions.delete(cacheKey);
    }
  }
  removeAliases(primaryCacheKey) {
    const aliases = this.aliasesByPrimaryKey.get(primaryCacheKey);
    if (!aliases) {
      return;
    }
    aliases.forEach((aliasKey) => {
      const primaryKeys = this.primaryKeysByAlias.get(aliasKey);
      if (!primaryKeys) {
        return;
      }
      primaryKeys.delete(primaryCacheKey);
      if (primaryKeys.size === 0) {
        this.primaryKeysByAlias.delete(aliasKey);
      }
    });
    this.aliasesByPrimaryKey.delete(primaryCacheKey);
  }
};
function createSharedFetchCache() {
  return new SharedFetchCacheImpl();
}
function getSharedFetchCache() {
  const host = globalThis;
  host[SHARED_FETCH_CACHE_SYMBOL] ??= createSharedFetchCache();
  return host[SHARED_FETCH_CACHE_SYMBOL];
}
function peekSharedFetchCache() {
  return globalThis[SHARED_FETCH_CACHE_SYMBOL];
}
function retainSharedFetchCache() {
  const host = globalThis;
  const cache = getSharedFetchCache();
  host[SHARED_FETCH_CACHE_RETAINERS_SYMBOL] = resolveSharedFetchCacheRetainers(host) + 1;
  return cache;
}
function resetSharedFetchCache() {
  const host = globalThis;
  host[SHARED_FETCH_CACHE_SYMBOL]?.clear();
  delete host[SHARED_FETCH_CACHE_SYMBOL];
  delete host[SHARED_FETCH_CACHE_RETAINERS_SYMBOL];
}
function releaseSharedFetchCache() {
  const host = globalThis;
  const retainers = resolveSharedFetchCacheRetainers(host);
  if (retainers === 0) {
    return;
  }
  if (retainers === 1) {
    resetSharedFetchCache();
    return;
  }
  host[SHARED_FETCH_CACHE_RETAINERS_SYMBOL] = retainers - 1;
}
var DEFAULT_REST_CONFIG = {
  withCredentials: false,
  contentType: "application/json"
};
var nextSharedRequestScopeId = 0;
function allocateRestProtocolSharedRequestScopeId() {
  nextSharedRequestScopeId += 1;
  return `rest-protocol:${nextSharedRequestScopeId}`;
}
var RestProtocol = class _RestProtocol extends ApiProtocol {
  /** Axios instance */
  client = null;
  /** Base service config */
  config = null;
  /** REST-specific config */
  restConfig;
  /** Stable per-instance scope so request preparation dedupes only within one protocol. */
  sharedRequestScopeId = allocateRestProtocolSharedRequestScopeId();
  /** Callback to get excluded plugin classes from service */
  getExcludedClasses = () => /* @__PURE__ */ new Set();
  /** Instance-specific plugins */
  _instancePlugins = /* @__PURE__ */ new Set();
  /**
   * Instance plugin management namespace
   * Plugins registered here apply only to this RestProtocol instance
   */
  plugins = {
    /**
     * Add an instance REST plugin
     * @param plugin - Plugin instance implementing RestPluginHooks
     */
    add: (plugin) => {
      this._instancePlugins.add(plugin);
    },
    /**
     * Remove an instance REST plugin
     * Calls destroy() if available
     * @param plugin - Plugin instance to remove
     */
    remove: (plugin) => {
      if (this._instancePlugins.has(plugin)) {
        this._instancePlugins.delete(plugin);
        plugin.destroy();
      }
    },
    /**
     * Get all instance plugins
     */
    getAll: () => {
      return Array.from(this._instancePlugins);
    }
  };
  constructor(restConfig = {}) {
    super();
    this.restConfig = { ...DEFAULT_REST_CONFIG, ...restConfig };
  }
  // ============================================================================
  // Initialization
  // ============================================================================
  /**
   * Initialize the protocol with service configuration.
   */
  initialize(config, getExcludedClasses) {
    this.config = config;
    if (getExcludedClasses) {
      this.getExcludedClasses = getExcludedClasses;
    }
    this.client = axios_default.create({
      baseURL: config.baseURL,
      headers: {
        "Content-Type": this.restConfig.contentType,
        ...config.headers
      },
      timeout: this.restConfig.timeout ?? config.timeout,
      withCredentials: this.restConfig.withCredentials
    });
  }
  /**
   * Cleanup protocol resources.
   */
  cleanup() {
    this._instancePlugins.forEach((plugin) => {
      plugin.destroy();
    });
    this._instancePlugins.clear();
    this.client = null;
    this.config = null;
  }
  /**
   * Test-only hook that replaces the underlying axios `request` dispatcher.
   *
   * Exists so tests can stub the network layer without reaching into the
   * private axios instance via structural casts. Throws if the protocol has
   * not been initialized, since no underlying client exists yet.
   *
   * @internal Test seam — do not rely on this in production code.
   */
  setRequestDispatcherForTest(dispatch) {
    if (!this.client) {
      throw new Error(
        "RestProtocol.setRequestDispatcherForTest: protocol has not been initialized."
      );
    }
    this.client.request = dispatch;
  }
  /**
   * Get global plugins from apiRegistry, filtering out excluded classes.
   * @internal
   */
  getGlobalPlugins() {
    const allGlobalPlugins = protocolPluginRegistry.getAll(_RestProtocol);
    const excludedClasses = this.getExcludedClasses();
    if (excludedClasses.size === 0) {
      return allGlobalPlugins;
    }
    return allGlobalPlugins.filter((plugin) => {
      for (const excludedClass of excludedClasses) {
        if (plugin instanceof excludedClass) {
          return false;
        }
      }
      return true;
    });
  }
  /**
   * Get all plugins in execution order (global first, then instance).
   * Used by plugin chain execution to get ordered list of plugins.
   * @internal
   */
  getPluginsInOrder() {
    return [
      ...this.getGlobalPlugins(),
      ...Array.from(this._instancePlugins)
    ];
  }
  // ============================================================================
  // HTTP Methods
  // ============================================================================
  /**
   * Perform GET request.
   * @template TResponse - Response type
   */
  async get(url, options) {
    return this.request("GET", url, void 0, options);
  }
  /**
   * Perform GET request with shared-fetch reuse when a global cache is retained.
   * The shared key is derived from the plugin-processed request identity so
   * auth/tenant headers and similar request mutations stay isolated per root.
   *
   * @internal Used by RestEndpointProtocol query descriptors.
   */
  async getWithSharedCache(url, options) {
    const cache = peekSharedFetchCache();
    if (!cache) {
      return this.get(url, options);
    }
    const preparationKey = this.resolveSharedGetPreparationKey(
      url,
      options?.params,
      options?.withCredentials
    );
    const preparedRequest = await cache.getOrFetch(
      preparationKey,
      ({ signal }) => this.prepareRequest("GET", url, void 0, signal, void 0, options?.withCredentials),
      {
        signal: options?.signal,
        aliases: options?.descriptorKey ? [options.descriptorKey] : void 0,
        staleTime: 0
      }
    );
    const sharedKey = this.resolveSharedGetCacheKey(
      preparedRequest.processedRequestContext,
      options?.params
    );
    const sharedEnvelope = await cache.getOrFetch(
      sharedKey,
      ({ signal }) => this.fetchSharedGetResponse(
        preparedRequest,
        "GET",
        url,
        options?.params,
        signal,
        0
      ),
      {
        signal: options?.signal,
        aliases: options?.descriptorKey ? [options.descriptorKey] : void 0,
        staleTime: options?.staleTime
      }
    );
    const finalResponse = await this.executePluginOnResponse(
      sharedEnvelope.responseContext,
      preparedRequest.originalRequestContext
    );
    return finalResponse.data;
  }
  /**
   * Perform POST request.
   * @template TResponse - Response type
   * @template TRequest - Request body type (optional, for type-safe requests)
   */
  async post(url, data, options) {
    return this.request("POST", url, data, options);
  }
  /**
   * Perform PUT request.
   * @template TResponse - Response type
   * @template TRequest - Request body type (optional, for type-safe requests)
   */
  async put(url, data, options) {
    return this.request("PUT", url, data, options);
  }
  /**
   * Perform PATCH request.
   * @template TResponse - Response type
   * @template TRequest - Request body type (optional, for type-safe requests)
   */
  async patch(url, data, options) {
    return this.request("PATCH", url, data, options);
  }
  /**
   * Perform DELETE request.
   * Omit `data` when the endpoint has no body; pass `undefined` explicitly when combining with `options`
   * (e.g. `delete(url, undefined, { signal })`), same pattern as POST/PUT/PATCH.
   * @template TResponse - Response type
   * @template TRequest - Request body type (optional)
   */
  async delete(url, data, options) {
    return this.request("DELETE", url, data, options);
  }
  // ============================================================================
  // Request Execution
  // ============================================================================
  /**
   * Execute an HTTP request with plugin chain.
   * Public entry point - delegates to requestInternal with retryCount: 0.
   */
  async request(method, url, data, options) {
    return this.requestInternal(
      method,
      url,
      data,
      options?.params,
      options?.signal,
      options?.withCredentials,
      0
    );
  }
  /**
   * Internal request execution with retry support.
   * Can be called for initial request or retry.
   */
  async requestInternal(method, url, data, params, signal, withCredentials, retryCount = 0, retryHeaders) {
    if (!this.client) {
      throw new Error("RestProtocol not initialized. Call initialize() first.");
    }
    const maxDepth = this.restConfig.maxRetryDepth ?? 10;
    if (retryCount >= maxDepth) {
      throw new Error(`Max retry depth (${maxDepth}) exceeded`);
    }
    const requestContext = this.buildRequestContext(
      method,
      url,
      data,
      signal,
      retryHeaders,
      withCredentials
    );
    let preparedRequest;
    try {
      preparedRequest = await this.prepareRequestContext(requestContext);
    } catch (error) {
      if (axios_default.isCancel(error)) {
        throw error;
      }
      const err = error instanceof Error ? error : new Error(String(error));
      const responseContext = this.extractResponseContext(error);
      const finalResult = await this.executePluginOnError(
        err,
        requestContext,
        url,
        params,
        retryCount,
        responseContext
      );
      if (this.isApiResponseContext(finalResult)) {
        return this.unwrapResponseData(finalResult, requestContext);
      }
      throw finalResult;
    }
    return this.executePreparedRequest(
      preparedRequest,
      method,
      url,
      params,
      signal,
      retryCount
    );
  }
  async executePreparedRequest(preparedRequest, method, url, params, signal, retryCount = 0) {
    const requestContext = {
      ...preparedRequest.originalRequestContext,
      signal
    };
    const processedContext = {
      ...preparedRequest.processedRequestContext,
      signal
    };
    try {
      if (preparedRequest.shortCircuitResponse) {
        const shortCircuitResponse = preparedRequest.shortCircuitResponse;
        const processedShortCircuit = await this.executePluginOnResponse(
          shortCircuitResponse,
          requestContext
        );
        return processedShortCircuit.data;
      }
      const axiosConfig = {
        method,
        url,
        // Use original relative URL, not processedContext.url which includes baseURL
        headers: processedContext.headers,
        data: processedContext.body,
        params,
        withCredentials: processedContext.withCredentials,
        signal
      };
      const response = await this.client.request(axiosConfig);
      const responseContext = {
        status: response.status,
        headers: response.headers,
        data: response.data
      };
      const finalResponse = await this.executePluginOnResponse(
        responseContext,
        requestContext
      );
      return finalResponse.data;
    } catch (error) {
      if (axios_default.isCancel(error)) {
        throw error;
      }
      const err = error instanceof Error ? error : new Error(String(error));
      const responseContext = this.extractResponseContext(error);
      const finalResult = await this.executePluginOnError(
        err,
        requestContext,
        url,
        params,
        retryCount,
        responseContext
      );
      if (this.isApiResponseContext(finalResult)) {
        return this.unwrapResponseData(finalResult, requestContext);
      }
      throw finalResult;
    }
  }
  async fetchSharedGetResponse(preparedRequest, method, url, params, signal, retryCount = 0) {
    const requestContext = {
      ...preparedRequest.originalRequestContext,
      signal
    };
    const processedContext = {
      ...preparedRequest.processedRequestContext,
      signal
    };
    try {
      if (preparedRequest.shortCircuitResponse) {
        return {
          responseContext: preparedRequest.shortCircuitResponse
        };
      }
      const axiosConfig = {
        method,
        url,
        headers: processedContext.headers,
        data: processedContext.body,
        params,
        withCredentials: processedContext.withCredentials,
        signal
      };
      const response = await this.client.request(axiosConfig);
      return {
        responseContext: {
          status: response.status,
          headers: response.headers,
          data: response.data
        }
      };
    } catch (error) {
      if (axios_default.isCancel(error)) {
        throw error;
      }
      const err = error instanceof Error ? error : new Error(String(error));
      const responseContext = this.extractResponseContext(error);
      const finalResult = await this.executePluginOnError(
        err,
        requestContext,
        url,
        params,
        retryCount,
        responseContext
      );
      if (finalResult && typeof finalResult === "object" && "status" in finalResult && "data" in finalResult) {
        return {
          responseContext: finalResult
        };
      }
      throw finalResult;
    }
  }
  // ============================================================================
  // Plugin Chain Execution
  // ============================================================================
  /**
   * Execute onRequest plugin chain.
   * Plugins execute in FIFO order (global first, then instance).
   * Any plugin can short-circuit by returning { shortCircuit: response }.
   */
  async executePluginOnRequest(context) {
    let currentContext = { ...context };
    for (const plugin of this.getPluginsInOrder()) {
      if ("_protocol" in plugin) {
        plugin._protocol = this;
      }
      if (plugin.onRequest) {
        const result = await plugin.onRequest(currentContext);
        if (isRestShortCircuit(result)) {
          return {
            // @cpt-begin:cpt-frontx-algo-api-protocol-surface-protocol-dispatch:p1:inst-exit-sc
            originalRequestContext: context,
            processedRequestContext: currentContext,
            shortCircuitResponse: result.shortCircuit
            // @cpt-end:cpt-frontx-algo-api-protocol-surface-protocol-dispatch:p1:inst-exit-sc
            // @cpt-begin:cpt-frontx-flow-api-protocol-surface-service-call:p1:inst-exit-sc
            // Exit loop; shortcircuit response recorded
            // @cpt-end:cpt-frontx-flow-api-protocol-surface-service-call:p1:inst-exit-sc
          };
        }
        currentContext = result;
      }
    }
    return {
      originalRequestContext: context,
      processedRequestContext: currentContext
    };
  }
  /**
   * Execute onResponse plugin chain.
   * Plugins execute in reverse order (LIFO - onion model).
   */
  async executePluginOnResponse(context, _requestContext) {
    let currentContext = { ...context };
    const plugins = [...this.getPluginsInOrder()].reverse();
    for (const plugin of plugins) {
      if (plugin.onResponse) {
        currentContext = await plugin.onResponse(currentContext);
      }
    }
    return currentContext;
  }
  isApiResponseContext(value) {
    return Boolean(value) && typeof value === "object" && "status" in value && "data" in value;
  }
  async unwrapResponseData(responseContext, requestContext) {
    const finalResponse = await this.executePluginOnResponse(responseContext, requestContext);
    return finalResponse.data;
  }
  /**
   * Execute onError plugin chain with retry support.
   * Plugins execute in reverse order (LIFO).
   * Plugins can transform error, recover with ApiResponseContext, or retry the request.
   */
  async executePluginOnError(error, context, originalUrl, params, retryCount, responseContext) {
    const retry = async (modifiedRequest) => {
      const retryContext = {
        ...context,
        ...modifiedRequest,
        headers: { ...context.headers, ...modifiedRequest?.headers }
      };
      const result = await this.requestInternal(
        retryContext.method,
        originalUrl,
        retryContext.body,
        params,
        retryContext.signal,
        retryContext.withCredentials,
        retryCount + 1,
        retryContext.headers
      );
      return {
        status: 200,
        headers: {},
        data: result
      };
    };
    const errorContext = {
      error,
      request: context,
      response: responseContext,
      retryCount,
      retry
    };
    let currentResult = error;
    const plugins = [...this.getPluginsInOrder()].reverse();
    for (const plugin of plugins) {
      if (plugin.onError) {
        const result = await plugin.onError(errorContext);
        if (result && typeof result === "object" && "status" in result && "data" in result) {
          return result;
        }
        if (result instanceof Error) {
          currentResult = result;
        }
      }
    }
    return currentResult;
  }
  async prepareRequest(method, url, data, signal, retryHeaders, withCredentials) {
    const requestContext = this.buildRequestContext(
      method,
      url,
      data,
      signal,
      retryHeaders,
      withCredentials
    );
    return this.prepareRequestContext(requestContext);
  }
  async prepareRequestContext(requestContext) {
    return this.executePluginOnRequest(requestContext);
  }
  buildRequestContext(method, url, data, signal, retryHeaders, withCredentials) {
    const fullUrl = this.config?.baseURL ? `${this.config.baseURL}${url}`.replace(/\/+/g, "/").replace(":/", "://") : url;
    return {
      method,
      url: fullUrl,
      headers: retryHeaders ? { ...this.config?.headers, ...retryHeaders } : { ...this.config?.headers },
      body: data,
      withCredentials: withCredentials ?? this.restConfig.withCredentials,
      signal
    };
  }
  resolveSharedGetCacheKey(context, params) {
    return [
      context.method,
      context.url,
      { ...context.headers },
      params ? { ...params } : void 0,
      context.body,
      Boolean(context.withCredentials ?? this.restConfig.withCredentials)
    ];
  }
  resolveSharedGetPreparationKey(url, params, withCredentials) {
    const requestContext = this.buildRequestContext("GET", url, void 0, void 0, void 0, withCredentials);
    return [
      this.sharedRequestScopeId,
      requestContext.method,
      requestContext.url,
      { ...requestContext.headers },
      params ? { ...params } : void 0,
      requestContext.body
    ];
  }
  extractResponseContext(error) {
    if (!axios_default.isAxiosError(error) || !error.response) {
      return void 0;
    }
    return {
      status: error.response.status,
      headers: error.response.headers,
      data: error.response.data
    };
  }
};
var import_assign = __toESM(require_assign(), 1);
var SseProtocol = class _SseProtocol extends ApiProtocol {
  baseConfig;
  connections = /* @__PURE__ */ new Map();
  config;
  /** Callback to get excluded plugin classes from service */
  _getExcludedClasses = () => /* @__PURE__ */ new Set();
  /** Instance-specific plugins */
  _instancePlugins = /* @__PURE__ */ new Set();
  /**
   * Instance plugin management namespace
   * Plugins registered here apply only to this SseProtocol instance
   */
  plugins = {
    /**
     * Add an instance SSE plugin
     * @param plugin - Plugin instance implementing SsePluginHooks
     */
    add: (plugin) => {
      this._instancePlugins.add(plugin);
    },
    /**
     * Remove an instance SSE plugin
     * Calls destroy() if available
     * @param plugin - Plugin instance to remove
     */
    remove: (plugin) => {
      if (this._instancePlugins.has(plugin)) {
        this._instancePlugins.delete(plugin);
        plugin.destroy();
      }
    },
    /**
     * Get all instance plugins
     */
    getAll: () => {
      return Array.from(this._instancePlugins);
    }
  };
  constructor(config = {}) {
    super();
    this.config = (0, import_assign.default)({}, config);
  }
  /**
   * Initialize protocol with base config and plugin accessor
   */
  initialize(baseConfig, getExcludedClasses) {
    this.baseConfig = baseConfig;
    if (getExcludedClasses) {
      this._getExcludedClasses = getExcludedClasses;
    }
  }
  /**
   * Cleanup protocol resources
   */
  cleanup() {
    this.connections.forEach((conn) => {
      conn.close();
    });
    this.connections.clear();
    this._instancePlugins.forEach((plugin) => {
      plugin.destroy();
    });
    this._instancePlugins.clear();
  }
  /**
   * Get global plugins from apiRegistry, filtering out excluded classes.
   * @private
   */
  getGlobalPlugins() {
    const allGlobalPlugins = protocolPluginRegistry.getAll(_SseProtocol);
    const excludedClasses = this._getExcludedClasses();
    if (excludedClasses.size === 0) {
      return allGlobalPlugins;
    }
    return allGlobalPlugins.filter((plugin) => {
      for (const excludedClass of excludedClasses) {
        if (plugin instanceof excludedClass) {
          return false;
        }
      }
      return true;
    });
  }
  /**
   * Get all plugins in execution order (global first, then instance).
   * Required by ApiProtocol interface for ProtocolPluginType inference.
   */
  getPluginsInOrder() {
    return [
      ...this.getGlobalPlugins(),
      ...Array.from(this._instancePlugins)
    ];
  }
  /**
   * Execute SSE plugin chain for connection lifecycle
   * Iterates through all SSE-specific plugins and calls onConnect hooks
   *
   * @param context - SSE connection context
   * @returns Modified context or short-circuit response
   */
  async executePluginChainAsync(context) {
    let currentContext = context;
    for (const plugin of this.getPluginsInOrder()) {
      if (plugin.onConnect) {
        const result = await plugin.onConnect(currentContext);
        if (isSseShortCircuit(result)) {
          return result;
        }
        currentContext = result;
      }
    }
    return currentContext;
  }
  /**
   * Connect to SSE stream
   * Pure implementation - uses plugin-provided EventSource or creates real one
   *
   * @param url - SSE endpoint URL (relative to baseURL)
   * @param onMessage - Callback for each SSE message
   * @param onComplete - Optional callback when stream completes
   * @returns Connection ID for disconnecting
   */
  // @cpt-begin:cpt-frontx-flow-api-protocol-surface-service-call:p1:inst-branch-sse
  async connect(url, onMessage, onComplete) {
    const connectionId = this.generateId();
    const fullUrl = this.baseConfig?.baseURL ? `${this.baseConfig.baseURL}${url}`.replace(/\/+/g, "/").replace(":/", "://") : url;
    const context = {
      url: fullUrl,
      headers: {}
    };
    const result = await this.executePluginChainAsync(context);
    let eventSource;
    if (isSseShortCircuit(result)) {
      eventSource = result.shortCircuit;
    } else {
      const withCredentials = this.config.withCredentials ?? true;
      eventSource = new EventSource(fullUrl, { withCredentials });
    }
    this.attachHandlers(connectionId, eventSource, onMessage, onComplete);
    return connectionId;
  }
  /**
   * Attach event handlers to EventSource (mock or real)
   * Same implementation for both paths - ensures consistency
   *
   * @param connectionId - Generated connection ID
   * @param eventSource - EventSource to attach handlers to (mock or real)
   * @param onMessage - Callback for each SSE message
   * @param onComplete - Optional callback when stream completes
   */
  attachHandlers(connectionId, eventSource, onMessage, onComplete) {
    this.connections.set(connectionId, eventSource);
    eventSource.onmessage = onMessage;
    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      this.disconnect(connectionId);
    };
    eventSource.addEventListener("done", () => {
      if (onComplete) onComplete();
      this.disconnect(connectionId);
    });
  }
  /**
   * Disconnect SSE stream
   *
   * @param connectionId - Connection ID returned from connect()
   */
  disconnect(connectionId) {
    const connection = this.connections.get(connectionId);
    if (connection) {
      connection.close();
      this.connections.delete(connectionId);
    }
  }
  /**
   * Generate unique connection ID
   */
  generateId() {
    return `sse-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
};
var RestEndpointProtocol = class extends ApiProtocol {
  constructor(rest) {
    super();
    this.rest = rest;
  }
  rest;
  config = null;
  initialize(config, _getExcludedClasses) {
    this.config = config;
  }
  getPluginsInOrder() {
    return [];
  }
  cleanup() {
    this.config = null;
  }
  query(path, options) {
    const config = this.getConfig();
    const key = [config.baseURL, "GET", path];
    return {
      key,
      fetch: ({ signal, staleTime } = {}) => {
        return this.rest.getWithSharedCache(path, {
          descriptorKey: key,
          signal,
          staleTime: staleTime ?? options?.staleTime
        });
      },
      ...options?.staleTime !== void 0 && { staleTime: options.staleTime },
      ...options?.gcTime !== void 0 && { gcTime: options.gcTime }
    };
  }
  queryWith(pathFn, options) {
    const config = this.getConfig();
    return (params) => {
      const resolvedPath = pathFn(params);
      const key = [config.baseURL, "GET", resolvedPath, { ...params }];
      return {
        key,
        fetch: ({ signal, staleTime } = {}) => {
          return this.rest.getWithSharedCache(resolvedPath, {
            descriptorKey: key,
            signal,
            staleTime: staleTime ?? options?.staleTime
          });
        },
        ...options?.staleTime !== void 0 && { staleTime: options.staleTime },
        ...options?.gcTime !== void 0 && { gcTime: options.gcTime }
      };
    };
  }
  mutation(method, path) {
    const config = this.getConfig();
    const key = [config.baseURL, method, path];
    return {
      key,
      fetch: (variables, options) => {
        switch (method) {
          case "DELETE":
            return this.rest.delete(path, variables, {
              signal: options?.signal
            });
          case "POST":
            return this.rest.post(path, variables, {
              signal: options?.signal
            });
          case "PUT":
            return this.rest.put(path, variables, {
              signal: options?.signal
            });
          case "PATCH":
            return this.rest.patch(path, variables, {
              signal: options?.signal
            });
        }
      }
    };
  }
  getConfig() {
    if (!this.config) {
      throw new Error("RestEndpointProtocol not initialized. Call initialize() first.");
    }
    return this.config;
  }
};
var SseStreamProtocol = class extends ApiProtocol {
  constructor(sse) {
    super();
    this.sse = sse;
  }
  sse;
  config = null;
  initialize(config, _getExcludedClasses) {
    this.config = config;
  }
  getPluginsInOrder() {
    return [];
  }
  cleanup() {
    this.config = null;
  }
  stream(path, options) {
    const config = this.getConfig();
    const key = [config.baseURL, "SSE", path];
    const parse = options?.parse ?? ((event) => JSON.parse(event.data));
    return {
      key,
      connect: (onEvent, onComplete) => this.sse.connect(
        path,
        (event) => onEvent(parse(event)),
        onComplete
      ),
      disconnect: (connectionId) => {
        this.sse.disconnect(connectionId);
      }
    };
  }
  getConfig() {
    if (!this.config) {
      throw new Error("SseStreamProtocol not initialized. Call initialize() first.");
    }
    return this.config;
  }
};
var DEFAULT_CONFIG = {
  // Empty - mock config removed (OCP/DIP - now in MockPluginConfig)
};
var ApiRegistryImpl = class {
  /** Service instances by class constructor */
  services = /* @__PURE__ */ new Map();
  /** Configuration */
  config = { ...DEFAULT_CONFIG };
  // ============================================================================
  // Registration
  // ============================================================================
  /**
   * Register an API service by class reference.
   * Service is instantiated immediately.
   */
  register(serviceClass) {
    const service = new serviceClass();
    this.services.set(serviceClass, service);
  }
  // ============================================================================
  // Initialization
  // ============================================================================
  /**
   * Initialize the registry with configuration.
   * Services are already instantiated during register().
   */
  initialize(config) {
    if (config) {
      this.config = { ...DEFAULT_CONFIG, ...config };
    }
  }
  // ============================================================================
  // Service Access
  // ============================================================================
  /**
   * Get service by class reference.
   * Returns typed service instance.
   * Throws if service is not registered.
   */
  getService(serviceClass) {
    const service = this.services.get(serviceClass);
    if (!service) {
      throw new Error(
        `Service not found. Did you forget to call apiRegistry.register(${serviceClass.name})?`
      );
    }
    return service;
  }
  /**
   * Check if service is registered.
   */
  has(serviceClass) {
    return this.services.has(serviceClass);
  }
  /**
   * Get all registered service instances.
   * Used by framework effects to iterate services for plugin management.
   *
   * @returns Readonly array of all registered BaseApiService instances
   *
   * @example
   * ```typescript
   * // Framework code
   * for (const service of apiRegistry.getAll()) {
   *   const plugins = service.getPlugins();
   *   // Process plugins...
   * }
   * ```
   */
  getAll() {
    return Array.from(this.services.values());
  }
  // ============================================================================
  // Configuration
  // ============================================================================
  /**
   * Get current configuration.
   */
  getConfig() {
    return { ...this.config };
  }
  // ============================================================================
  // Protocol Plugin Management
  // ============================================================================
  /**
   * Plugin management namespace for protocol-specific plugins.
   * Provides OCP-compliant API using protocol class as parameter.
   *
   * @example
   * ```typescript
   * // Add plugin for RestProtocol
   * apiRegistry.plugins.add(RestProtocol, new AuthPlugin({ getToken }));
   *
   * // Add plugin for SseProtocol
   * apiRegistry.plugins.add(SseProtocol, new SseAuthPlugin({ getToken }));
   *
   * // Remove plugin by class
   * apiRegistry.plugins.remove(RestProtocol, AuthPlugin);
   *
   * // Check if plugin exists
   * apiRegistry.plugins.has(RestProtocol, AuthPlugin);
   *
   * // Get all plugins for protocol
   * const restPlugins = apiRegistry.plugins.getAll(RestProtocol);
   *
   * // Clear all plugins for protocol
   * apiRegistry.plugins.clear(RestProtocol);
   * ```
   */
  plugins = {
    /**
     * Add a plugin for a specific protocol.
     * Creates plugin set for protocol if it doesn't exist.
     *
     * @template T - Protocol type
     * @param protocolClass - Protocol constructor (e.g., RestProtocol, SseProtocol)
     * @param plugin - Plugin instance implementing protocol's hooks
     */
    add: protocolPluginRegistry.add.bind(protocolPluginRegistry),
    /**
     * Remove a plugin from a protocol by plugin class.
     * Calls destroy() on the plugin if available.
     *
     * @template T - Protocol type
     * @param protocolClass - Protocol constructor
     * @param pluginClass - Plugin class constructor
     */
    remove: protocolPluginRegistry.remove.bind(protocolPluginRegistry),
    /**
     * Check if a plugin of given class is registered for a protocol.
     *
     * @template T - Protocol type
     * @param protocolClass - Protocol constructor
     * @param pluginClass - Plugin class constructor
     * @returns True if plugin of this class is registered
     */
    has: protocolPluginRegistry.has.bind(protocolPluginRegistry),
    /**
     * Get all plugins for a protocol.
     * Returns readonly array to prevent external modification.
     *
     * @template T - Protocol type
     * @param protocolClass - Protocol constructor
     * @returns Readonly array of plugins for this protocol
     */
    getAll: protocolPluginRegistry.getAll.bind(protocolPluginRegistry),
    /**
     * Clear all plugins for a protocol.
     * Calls destroy() on each plugin if available.
     *
     * @template T - Protocol type
     * @param protocolClass - Protocol constructor
     */
    clear: protocolPluginRegistry.clear.bind(protocolPluginRegistry)
  };
  // ============================================================================
  // Reset (for testing)
  // ============================================================================
  /**
   * Reset the registry to initial state.
   * Primarily used for testing.
   *
   * @internal
   */
  reset() {
    this.services.forEach((service) => {
      if (service instanceof BaseApiService) {
        service.cleanup();
      }
    });
    this.services.clear();
    protocolPluginRegistry.reset();
    this.config = { ...DEFAULT_CONFIG };
  }
};
var apiRegistry = new ApiRegistryImpl();
export {
  ApiPlugin,
  ApiPluginBase,
  ApiProtocol,
  BaseApiService,
  MOCK_PLUGIN,
  RestEndpointProtocol,
  RestPlugin,
  RestPluginWithConfig,
  RestProtocol,
  SHARED_FETCH_CACHE_RETAINERS_SYMBOL,
  SHARED_FETCH_CACHE_SYMBOL,
  SsePlugin,
  SsePluginWithConfig,
  SseProtocol,
  SseStreamProtocol,
  apiRegistry,
  createSharedFetchCache,
  getSharedFetchCache,
  isMockPlugin,
  isRestShortCircuit,
  isShortCircuit,
  isSseShortCircuit,
  peekSharedFetchCache,
  releaseSharedFetchCache,
  resetSharedFetchCache,
  retainSharedFetchCache
};
