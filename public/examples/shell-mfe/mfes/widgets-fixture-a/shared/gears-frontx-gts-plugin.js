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

// node_modules/@globaltypesystem/gts-ts/dist/types.js
var require_types = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidSegmentError = exports.InvalidGtsIDError = exports.MAX_ID_LENGTH = exports.GTS_URI_PREFIX = exports.GTS_PREFIX = void 0;
    exports.GTS_PREFIX = "gts.";
    exports.GTS_URI_PREFIX = "gts://";
    exports.MAX_ID_LENGTH = 1024;
    var InvalidGtsIDError = class extends Error {
      constructor(gtsId, cause) {
        super(cause ? `Invalid GTS identifier: ${gtsId}: ${cause}` : `Invalid GTS identifier: ${gtsId}`);
        this.gtsId = gtsId;
        this.cause = cause;
        this.name = "InvalidGtsIDError";
      }
    };
    exports.InvalidGtsIDError = InvalidGtsIDError;
    var InvalidSegmentError = class extends Error {
      constructor(num, offset, segment, cause) {
        super(cause ? `Invalid GTS segment #${num} @ offset ${offset}: '${segment}': ${cause}` : `Invalid GTS segment #${num} @ offset ${offset}: '${segment}'`);
        this.num = num;
        this.offset = offset;
        this.segment = segment;
        this.cause = cause;
        this.name = "InvalidSegmentError";
      }
    };
    exports.InvalidSegmentError = InvalidSegmentError;
  }
});

// node_modules/uuid/dist/commonjs-browser/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      if (!getRandomValues) {
        getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) {
          throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        }
      }
      return getRandomValues(rnds8);
    }
  }
});

// node_modules/uuid/dist/commonjs-browser/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    var _default = validate;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    exports.unsafeStringify = unsafeStringify;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    function unsafeStringify(arr, offset = 0) {
      return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
    }
    function stringify(arr, offset = 0) {
      const uuid = unsafeStringify(arr, offset);
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    var _default = stringify;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.unsafeStringify)(b);
    }
    var _default = v1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.URL = exports.DNS = void 0;
    exports.default = v35;
    var _stringify = require_stringify();
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function v35(name, version, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.unsafeStringify)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/commonjs-browser/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function md5(bytes) {
      if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes));
        bytes = new Uint8Array(msg.length);
        for (let i = 0; i < msg.length; ++i) {
          bytes[i] = msg.charCodeAt(i);
        }
      }
      return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
    }
    function md5ToHexEncodedArray(input) {
      const output = [];
      const length32 = input.length * 32;
      const hexTab = "0123456789abcdef";
      for (let i = 0; i < length32; i += 8) {
        const x = input[i >> 5] >>> i % 32 & 255;
        const hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
        output.push(hex);
      }
      return output;
    }
    function getOutputLength(inputLength8) {
      return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
    }
    function wordsToMd5(x, len) {
      x[len >> 5] |= 128 << len % 32;
      x[getOutputLength(len) - 1] = len;
      let a = 1732584193;
      let b = -271733879;
      let c = -1732584194;
      let d = 271733878;
      for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
      }
      return [a, b, c, d];
    }
    function bytesToWords(input) {
      if (input.length === 0) {
        return [];
      }
      const length8 = input.length * 8;
      const output = new Uint32Array(getOutputLength(length8));
      for (let i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input[i / 8] & 255) << i % 32;
      }
      return output;
    }
    function safeAdd(x, y) {
      const lsw = (x & 65535) + (y & 65535);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    function bitRotateLeft(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    function md5cmn(q, a, b, x, s, t) {
      return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = v3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/native.js
var require_native = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/native.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var _default = {
      randomUUID
    };
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _native = _interopRequireDefault(require_native());
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v4(options, buf, offset) {
      if (_native.default.randomUUID && !buf && !options) {
        return _native.default.randomUUID();
      }
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.unsafeStringify)(rnds);
    }
    var _default = v4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function f(s, x, y, z) {
      switch (s) {
        case 0:
          return x & y ^ ~x & z;
        case 1:
          return x ^ y ^ z;
        case 2:
          return x & y ^ x & z ^ y & z;
        case 3:
          return x ^ y ^ z;
      }
    }
    function ROTL(x, n) {
      return x << n | x >>> 32 - n;
    }
    function sha1(bytes) {
      const K = [1518500249, 1859775393, 2400959708, 3395469782];
      const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes));
        bytes = [];
        for (let i = 0; i < msg.length; ++i) {
          bytes.push(msg.charCodeAt(i));
        }
      } else if (!Array.isArray(bytes)) {
        bytes = Array.prototype.slice.call(bytes);
      }
      bytes.push(128);
      const l = bytes.length / 4 + 2;
      const N = Math.ceil(l / 16);
      const M = new Array(N);
      for (let i = 0; i < N; ++i) {
        const arr = new Uint32Array(16);
        for (let j = 0; j < 16; ++j) {
          arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
        }
        M[i] = arr;
      }
      M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
      M[N - 1][14] = Math.floor(M[N - 1][14]);
      M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
      for (let i = 0; i < N; ++i) {
        const W = new Uint32Array(80);
        for (let t = 0; t < 16; ++t) {
          W[t] = M[i][t];
        }
        for (let t = 16; t < 80; ++t) {
          W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for (let t = 0; t < 80; ++t) {
          const s = Math.floor(t / 20);
          const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
          e = d;
          d = c;
          c = ROTL(b, 30) >>> 0;
          b = a;
          a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
      }
      return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.slice(14, 15), 16);
    }
    var _default = version;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/index.js
var require_commonjs_browser = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function get() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function get() {
        return _parse.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function get() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function get() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function get() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function get() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function get() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function get() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function get() {
        return _version.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/gts.js
var require_gts = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/gts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gts = void 0;
    var uuid_1 = require_commonjs_browser();
    var types_1 = require_types();
    var GTS_NAMESPACE = (0, uuid_1.v5)("gts", uuid_1.v5.URL);
    var SEGMENT_TOKEN_REGEX = /^[a-z_][a-z0-9_]*$/;
    var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    var Gts = class {
      static parseGtsID(id) {
        if (id.includes("*")) {
          return this.validateWildcard(id);
        }
        return this.parseGtsIDInternal(id, false);
      }
      static splitPreservingTilde(s) {
        const parts = [];
        let current = "";
        for (let i = 0; i < s.length; i++) {
          if (s[i] === "~") {
            parts.push(current + "~");
            current = "";
          } else {
            current += s[i];
          }
        }
        if (current) {
          parts.push(current);
        }
        return parts.filter((p) => p !== "~");
      }
      static parseSegment(num, offset, segment) {
        const seg = {
          num,
          offset,
          segment: segment.trim(),
          vendor: "",
          package: "",
          namespace: "",
          type: "",
          verMajor: 0,
          verMinor: void 0,
          isType: false,
          isWildcard: false,
          isUuidTail: false
        };
        let workingSegment = seg.segment;
        if (!workingSegment || workingSegment === "~") {
          throw new types_1.InvalidSegmentError(num, offset, segment, "Empty segment");
        }
        const tildeCount = (workingSegment.match(/~/g) || []).length;
        if (tildeCount > 0) {
          if (tildeCount > 1) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Too many '~' characters");
          }
          if (workingSegment.endsWith("~")) {
            seg.isType = true;
            workingSegment = workingSegment.slice(0, -1);
          } else {
            throw new types_1.InvalidSegmentError(num, offset, segment, " '~' must be at the end");
          }
        }
        if (workingSegment.includes("..")) {
          throw new types_1.InvalidSegmentError(num, offset, segment, "Empty token (double dots)");
        }
        const tokens = workingSegment.split(".");
        for (const token of tokens) {
          if (token === "") {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Empty token");
          }
        }
        if (tokens.length > 6) {
          throw new types_1.InvalidSegmentError(num, offset, segment, "Too many tokens");
        }
        if (!workingSegment.endsWith("*")) {
          if (tokens.length < 5) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Too few tokens");
          }
          for (let t = 0; t < 4; t++) {
            if (!SEGMENT_TOKEN_REGEX.test(tokens[t])) {
              throw new types_1.InvalidSegmentError(num, offset, segment, "Invalid segment token: " + tokens[t]);
            }
          }
        }
        if (tokens.length > 0) {
          if (tokens[0] === "*") {
            seg.isWildcard = true;
            return seg;
          }
          seg.vendor = tokens[0];
        }
        if (tokens.length > 1) {
          if (tokens[1] === "*") {
            seg.isWildcard = true;
            return seg;
          }
          seg.package = tokens[1];
        }
        if (tokens.length > 2) {
          if (tokens[2] === "*") {
            seg.isWildcard = true;
            return seg;
          }
          seg.namespace = tokens[2];
        }
        if (tokens.length > 3) {
          if (tokens[3] === "*") {
            seg.isWildcard = true;
            return seg;
          }
          seg.type = tokens[3];
        }
        if (tokens.length > 4) {
          if (tokens[4] === "*") {
            seg.isWildcard = true;
            return seg;
          }
          if (!tokens[4].startsWith("v")) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Major version must start with 'v'");
          }
          const majorStr = tokens[4].substring(1);
          const major = parseInt(majorStr, 10);
          if (isNaN(major)) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Major version must be an integer");
          }
          if (major < 0) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Major version must be >= 0");
          }
          if (major.toString() !== majorStr) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Major version must be an integer");
          }
          seg.verMajor = major;
        }
        if (tokens.length > 5) {
          if (tokens[5] === "*") {
            seg.isWildcard = true;
            return seg;
          }
          const minor = parseInt(tokens[5], 10);
          if (isNaN(minor)) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Minor version must be an integer");
          }
          if (minor < 0) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Minor version must be >= 0");
          }
          if (minor.toString() !== tokens[5]) {
            throw new types_1.InvalidSegmentError(num, offset, segment, "Minor version must be an integer");
          }
          seg.verMinor = minor;
        }
        return seg;
      }
      static isValidGtsID(id) {
        if (!id.startsWith(types_1.GTS_PREFIX)) {
          return false;
        }
        try {
          this.parseGtsID(id);
          return true;
        } catch {
          return false;
        }
      }
      static validateGtsID(id) {
        const isWildcard = id.includes("*");
        try {
          if (isWildcard) {
            this.validateWildcard(id);
          } else {
            this.parseGtsID(id);
          }
          return {
            id,
            ok: true,
            valid: true,
            error: "",
            is_wildcard: isWildcard
          };
        } catch (error) {
          return {
            id,
            ok: false,
            valid: false,
            error: error instanceof Error ? error.message : String(error),
            is_wildcard: isWildcard
          };
        }
      }
      static parseID(id) {
        try {
          const gtsId = this.parseGtsID(id);
          return {
            ok: true,
            segments: gtsId.segments
          };
        } catch (error) {
          return {
            ok: false,
            segments: [],
            error: error instanceof Error ? error.message : String(error)
          };
        }
      }
      static isType(id) {
        return id.endsWith("~");
      }
      static toUUID(id) {
        return (0, uuid_1.v5)(id, GTS_NAMESPACE);
      }
      static idToUUID(id) {
        try {
          this.parseGtsID(id);
          return {
            id,
            uuid: this.toUUID(id)
          };
        } catch (error) {
          return {
            id,
            uuid: "",
            error: error instanceof Error ? error.message : String(error)
          };
        }
      }
      static matchIDPattern(candidate, pattern) {
        try {
          let candidateId;
          try {
            if (candidate.includes("*")) {
              this.validateWildcard(candidate);
            }
            candidateId = this.parseGtsID(candidate);
          } catch (error) {
            return {
              match: false,
              pattern,
              candidate,
              error: error instanceof Error ? error.message : String(error)
            };
          }
          let patternId;
          try {
            patternId = this.validateWildcard(pattern);
          } catch (error) {
            return {
              match: false,
              pattern,
              candidate,
              error: error instanceof Error ? error.message : String(error)
            };
          }
          const match = this.wildcardMatch(candidateId, patternId);
          return {
            match,
            pattern,
            candidate
          };
        } catch (error) {
          return {
            match: false,
            pattern,
            candidate,
            error: error instanceof Error ? error.message : String(error)
          };
        }
      }
      static validateWildcard(pattern) {
        const p = pattern.trim();
        if (!p.startsWith(types_1.GTS_PREFIX)) {
          throw new types_1.InvalidGtsIDError(pattern, `Does not start with '${types_1.GTS_PREFIX}'`);
        }
        const wildcardCount = (p.match(/\*/g) || []).length;
        if (wildcardCount > 1) {
          throw new types_1.InvalidGtsIDError(pattern, "The wildcard '*' token is allowed only once");
        }
        if (wildcardCount === 1) {
          const wildcardIndex = p.indexOf("*");
          if (wildcardIndex !== p.length - 1) {
            throw new types_1.InvalidGtsIDError(pattern, "The wildcard '*' token is allowed only at the end of the pattern");
          }
          if (wildcardIndex > 0 && p[wildcardIndex - 1] !== "." && p[wildcardIndex - 1] !== "~") {
            throw new types_1.InvalidGtsIDError(pattern, "The wildcard '*' must be preceded by '.' or '~' (token boundary)");
          }
          const segments = p.split("~");
          for (let i = 0; i < segments.length - 1; i++) {
            if (segments[i].includes("*")) {
              throw new types_1.InvalidGtsIDError(pattern, "The wildcard '*' token cannot appear in the middle of a chained ID");
            }
          }
        }
        return this.parseGtsIDInternal(p, true);
      }
      // Internal parse method that can be called with wildcard mode
      static parseGtsIDInternal(id, allowWildcard = false) {
        const raw = id.trim();
        if (raw !== raw.toLowerCase()) {
          throw new types_1.InvalidGtsIDError(id, "Must be lower case");
        }
        if (!raw.startsWith(types_1.GTS_PREFIX)) {
          throw new types_1.InvalidGtsIDError(id, `Does not start with '${types_1.GTS_PREFIX}'`);
        }
        if (raw.length > types_1.MAX_ID_LENGTH) {
          throw new types_1.InvalidGtsIDError(id, "Too long");
        }
        if (raw.includes("..")) {
          throw new types_1.InvalidGtsIDError(id, "Double dots not allowed");
        }
        if (raw.endsWith(".") && !raw.endsWith(".*")) {
          throw new types_1.InvalidGtsIDError(id, "Cannot end with a dot");
        }
        if (raw.includes("~~")) {
          throw new types_1.InvalidGtsIDError(id, "Double tildes not allowed");
        }
        if (raw === types_1.GTS_PREFIX || raw === types_1.GTS_PREFIX + "~") {
          throw new types_1.InvalidGtsIDError(id, "ID cannot be just the prefix");
        }
        const gtsId = {
          id: raw,
          segments: []
        };
        const remainder = raw.substring(types_1.GTS_PREFIX.length);
        const parts = this.splitPreservingTilde(remainder);
        let offset = types_1.GTS_PREFIX.length;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (part === "") {
            continue;
          }
          if (i > 0 && i === parts.length - 1 && !part.endsWith("~") && UUID_REGEX.test(part)) {
            const seg = {
              num: i + 1,
              offset,
              segment: part,
              vendor: "",
              package: "",
              namespace: "",
              type: "",
              verMajor: 0,
              verMinor: void 0,
              isType: false,
              isWildcard: false,
              isUuidTail: true
            };
            gtsId.segments.push(seg);
            offset += part.length;
            continue;
          }
          if (part.includes("-")) {
            throw new types_1.InvalidGtsIDError(id, "Must not contain '-'");
          }
          const segment = this.parseSegment(i + 1, offset, part);
          gtsId.segments.push(segment);
          offset += part.length;
        }
        if (gtsId.segments.length === 0) {
          throw new types_1.InvalidGtsIDError(id, "No valid segments found");
        }
        if (!allowWildcard && !raw.includes("*")) {
          const lastSegment = gtsId.segments[gtsId.segments.length - 1];
          if (!lastSegment.isType && !lastSegment.isUuidTail && gtsId.segments.length === 1) {
            throw new types_1.InvalidGtsIDError(id, "Single-segment instance IDs are prohibited. Instance IDs must be chained with a type segment (e.g., gts.vendor.pkg.ns.type.v1~instance.segment.v1)");
          }
        }
        return gtsId;
      }
      static wildcardMatch(candidate, pattern) {
        if (!candidate || !pattern) {
          return false;
        }
        if (!pattern.id.includes("*")) {
          return this.matchSegments(pattern.segments, candidate.segments);
        }
        if ((pattern.id.match(/\*/g) || []).length > 1 || !pattern.id.endsWith("*")) {
          return false;
        }
        return this.matchSegments(pattern.segments, candidate.segments);
      }
      static matchSegments(patternSegs, candidateSegs) {
        if (patternSegs.length > candidateSegs.length) {
          return false;
        }
        for (let i = 0; i < patternSegs.length; i++) {
          const pSeg = patternSegs[i];
          const cSeg = candidateSegs[i];
          if (pSeg.isWildcard) {
            if (pSeg.vendor && pSeg.vendor !== cSeg.vendor) {
              return false;
            }
            if (pSeg.package && pSeg.package !== cSeg.package) {
              return false;
            }
            if (pSeg.namespace && pSeg.namespace !== cSeg.namespace) {
              return false;
            }
            if (pSeg.type && pSeg.type !== cSeg.type) {
              return false;
            }
            if (pSeg.verMajor !== 0 && pSeg.verMajor !== cSeg.verMajor) {
              return false;
            }
            if (pSeg.verMinor !== void 0 && (cSeg.verMinor === void 0 || pSeg.verMinor !== cSeg.verMinor)) {
              return false;
            }
            if (pSeg.isType && pSeg.isType !== cSeg.isType) {
              return false;
            }
            return true;
          }
          if (pSeg.isUuidTail) {
            if (pSeg.segment !== cSeg.segment) {
              return false;
            }
            continue;
          }
          if (pSeg.vendor !== cSeg.vendor) {
            return false;
          }
          if (pSeg.package !== cSeg.package) {
            return false;
          }
          if (pSeg.namespace !== cSeg.namespace) {
            return false;
          }
          if (pSeg.type !== cSeg.type) {
            return false;
          }
          if (pSeg.verMajor !== cSeg.verMajor) {
            return false;
          }
          if (pSeg.verMinor !== void 0) {
            if (cSeg.verMinor === void 0 || pSeg.verMinor !== cSeg.verMinor) {
              return false;
            }
          }
          if (pSeg.isType !== cSeg.isType) {
            return false;
          }
        }
        return true;
      }
    };
    exports.Gts = Gts;
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/extract.js
var require_extract = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/extract.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GtsExtractor = void 0;
    exports.getDefaultConfig = getDefaultConfig;
    var types_1 = require_types();
    var gts_1 = require_gts();
    function getDefaultConfig() {
      return {
        entityIdFields: ["$id", "$$id", "gtsId", "gtsIid", "gtsOid", "gtsI", "gts_id", "gts_oid", "gts_iid", "id"],
        schemaIdFields: [
          "$schema",
          "$$schema",
          "gtsTid",
          "gtsType",
          "gtsT",
          "gts_t",
          "gts_tid",
          "gts_type",
          "type",
          "schema"
        ]
      };
    }
    var GtsExtractor = class {
      static normalizeValue(value, fieldName) {
        let normalized = value.trim();
        if (fieldName === "$id" && normalized.startsWith(types_1.GTS_URI_PREFIX)) {
          normalized = normalized.substring(types_1.GTS_URI_PREFIX.length);
        } else if (normalized.startsWith(types_1.GTS_URI_PREFIX)) {
          normalized = normalized.substring(types_1.GTS_URI_PREFIX.length);
        }
        return normalized;
      }
      static findFirstValidField(content, fields, requireValid = false) {
        if (typeof content !== "object" || content === null) {
          return null;
        }
        for (const field of fields) {
          if (field in content && typeof content[field] === "string") {
            const value = this.normalizeValue(content[field], field);
            if (value) {
              if (requireValid) {
                if (gts_1.Gts.isValidGtsID(value)) {
                  return { field, value };
                }
              } else {
                return { field, value };
              }
            }
          }
        }
        return null;
      }
      static isJsonSchema(content) {
        if (typeof content !== "object" || content === null) {
          return false;
        }
        const schemaField = content["$schema"] || content["$$schema"];
        if (typeof schemaField === "string") {
          if (schemaField.includes("json-schema.org")) {
            return true;
          }
          if (schemaField.startsWith(types_1.GTS_URI_PREFIX) || schemaField.startsWith(types_1.GTS_PREFIX)) {
            return true;
          }
        }
        return false;
      }
      static extractID(content, schemaContent) {
        const config = getDefaultConfig();
        let id = "";
        let schemaId = null;
        let selectedEntityField;
        let selectedSchemaIdField;
        const isSchema = this.isJsonSchema(content);
        if (typeof content === "object" && content !== null) {
          const entityResult = this.findFirstValidField(content, config.entityIdFields);
          if (entityResult) {
            id = entityResult.value;
            selectedEntityField = entityResult.field;
          }
          const isValidGtsId = id && gts_1.Gts.isValidGtsID(id);
          const hasChain = isValidGtsId && (() => {
            const firstTilde = id.indexOf("~");
            if (firstTilde === -1)
              return false;
            const afterTilde = id.substring(firstTilde + 1);
            const checkPart = afterTilde.endsWith("~") ? afterTilde.slice(0, -1) : afterTilde;
            return checkPart.length > 0;
          })();
          if (isSchema) {
            if (hasChain && id.endsWith("~")) {
              const withoutTrailingTilde = id.slice(0, -1);
              const lastTilde = withoutTrailingTilde.lastIndexOf("~");
              if (lastTilde > 0) {
                schemaId = id.substring(0, lastTilde + 1);
                selectedSchemaIdField = selectedEntityField;
              }
            } else if (hasChain && !id.endsWith("~")) {
              const lastTilde = id.lastIndexOf("~");
              if (lastTilde > 0) {
                schemaId = id.substring(0, lastTilde + 1);
                selectedSchemaIdField = selectedEntityField;
              }
            } else {
              const schemaResult = this.findFirstValidField(content, ["$schema", "$$schema"]);
              if (schemaResult) {
                schemaId = schemaResult.value;
                selectedSchemaIdField = schemaResult.field;
              }
            }
          } else {
            const isIdFromDollarId = selectedEntityField === "$id" || selectedEntityField === "$$id";
            if (hasChain && !isIdFromDollarId) {
              const lastTilde = id.lastIndexOf("~");
              if (lastTilde > 0 && !id.endsWith("~")) {
                schemaId = id.substring(0, lastTilde + 1);
                selectedSchemaIdField = selectedEntityField;
              }
            }
            if (schemaId === null && !isIdFromDollarId) {
              const explicitSchemaFields = config.schemaIdFields.filter((f) => f !== "$id" && f !== "$$id");
              const schemaResult = this.findFirstValidField(content, explicitSchemaFields, true);
              if (schemaResult) {
                schemaId = schemaResult.value;
                selectedSchemaIdField = schemaResult.field;
              }
            }
            if (schemaId === null && hasChain && !id.endsWith("~")) {
              const lastTilde = id.lastIndexOf("~");
              if (lastTilde > 0) {
                schemaId = id.substring(0, lastTilde + 1);
                selectedSchemaIdField = selectedEntityField;
              }
            }
          }
        }
        if (schemaId === null && schemaContent && typeof schemaContent === "object") {
          const schemaEntityResult = this.findFirstValidField(schemaContent, config.entityIdFields);
          if (schemaEntityResult) {
            schemaId = schemaEntityResult.value;
          }
        }
        return {
          id,
          schema_id: schemaId,
          selected_entity_field: selectedEntityField,
          selected_schema_id_field: selectedSchemaIdField,
          is_schema: isSchema
        };
      }
    };
    exports.GtsExtractor = GtsExtractor;
  }
});

// node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});

// node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});

// node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof _If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  }
});

// node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema === "boolean")
        return;
      const rules = self.RULES.keywords;
      for (const key in schema) {
        if (!rules[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type || (exports.Type = Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  }
});

// node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // data passed to validation function
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      // validation/data context - should not be used directly, it is destructured to the names below
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      // root data - same as the data passed to the first/top validation function
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // used to support recursiveRef and dynamicRef
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      // null or array of validation errors
      errors: new codegen_1.Name("errors"),
      // counter of validation errors
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});

// node_modules/ajv/dist/compile/errors.js
var require_errors = __commonJS({
  "node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  }
});

// node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema, validateName } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});

// node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});

// node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self }, type) {
      const group = self.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});

// node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType || (exports.DataType = DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types.push("null");
      }
      return types;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number)
        delete types.integer;
      for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});

// node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});

// node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
        cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports.validateUnion = validateUnion;
  }
});

// node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors();
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a2;
        gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});

// node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  "node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    var traverse = module.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema);
      if (!limit)
        return false;
      return countKeys(schema) <= limit;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema[key] == "object") {
          (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    function getFullPath(resolver, id = "", normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      const p = resolver.parse(id);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean")
        return {};
      const { schemaId, uriResolver } = this.opts;
      const schId = normalizeId(schema[schemaId] || baseId);
      const baseIds = { "": schId };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let innerBaseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
          innerBaseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = innerBaseId;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});

// node_modules/ajv/dist/compile/validate/index.js
var require_validate2 = __commonJS({
  "node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const { schema, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      const schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({ schema, self }) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (self.RULES.all[key])
          return true;
      return false;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const { schema, gen, opts } = it;
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
      const types = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const { schema, errSchemaPath, opts, self } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const { schema, opts } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError, opts } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const { gen, schema, data, allErrors, opts, self } = it;
      const { RULES } = self;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES.rules)
          groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
          return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    function iterateKeywords(it, group) {
      const { gen, schema, opts: { useDefaults } } = it;
      if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
      if (!types.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types);
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const { type } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
          ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
          ts.push("integer");
      }
      it.dataTypes = ts;
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign) {
        if (assign)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});

// node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  "node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports.default = ValidationError;
  }
});

// node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  "node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});

// node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate2();
    var SchemaEnv = class {
      constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
          schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        // TODO can its length be used as dataLevel if nil is removed?
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        const { schemaId } = this.opts;
        if (schema)
          _sch = new SchemaEnv({ schema, schemaId, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
          return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema = partSchema;
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      const { schemaId } = this.opts;
      env = env || new SchemaEnv({ schema, schemaId, root, baseId });
      if (env.schema !== env.root.schema)
        return env;
      return void 0;
    }
  }
});

// node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});

// node_modules/fast-uri/lib/utils.js
var require_utils = __commonJS({
  "node_modules/fast-uri/lib/utils.js"(exports, module) {
    "use strict";
    var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
    var isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
    var isPort = RegExp.prototype.test.bind(/^\d*$/u);
    var isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu);
    var isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu);
    var isPathCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u);
    var isQueryFragmentCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u);
    var isUserinfoCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u);
    var BYTE_HEX = new Array(256);
    {
      const HEX_DIGITS = "0123456789ABCDEF";
      for (let i = 0; i < 256; i++) {
        BYTE_HEX[i] = "%" + HEX_DIGITS[i >> 4] + HEX_DIGITS[i & 15];
      }
    }
    function percentEncodeNonAscii(cp) {
      if (cp < 2048) {
        return BYTE_HEX[192 | cp >> 6] + BYTE_HEX[128 | cp & 63];
      }
      if (cp < 65536) {
        return BYTE_HEX[224 | cp >> 12] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
      }
      return BYTE_HEX[240 | cp >> 18] + BYTE_HEX[128 | cp >> 12 & 63] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
    }
    function stringArrayToHexStripped(input) {
      let acc = "";
      let code = 0;
      let i = 0;
      for (i = 0; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (code === 48) {
          continue;
        }
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
        break;
      }
      for (i += 1; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
      }
      return acc;
    }
    var isHextet = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/);
    var isIPvFuture = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/);
    var isZoneCharacter = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/);
    var nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
    function isZoneIdentifier(zone) {
      if (zone.length === 0) return false;
      for (let i = 0; i < zone.length; i++) {
        if (isZoneCharacter(zone[i])) continue;
        if (zone[i] === "%" && i + 2 < zone.length && isHexPair(zone.slice(i + 1, i + 3))) {
          i += 2;
          continue;
        }
        return false;
      }
      return true;
    }
    function compressIPv6ZeroRun(hextets) {
      let bestStart = -1;
      let bestLength = 0;
      let runStart = -1;
      let runLength = 0;
      for (let i = 0; i < hextets.length; i++) {
        if (hextets[i] === "0") {
          if (runStart === -1) runStart = i;
          runLength++;
          if (runLength > bestLength) {
            bestLength = runLength;
            bestStart = runStart;
          }
        } else {
          runStart = -1;
          runLength = 0;
        }
      }
      if (bestLength < 2) return hextets.join(":");
      const head = hextets.slice(0, bestStart).join(":");
      const tail = hextets.slice(bestStart + bestLength).join(":");
      return head + "::" + tail;
    }
    function normalizeIPv6Address(input) {
      const compression = input.indexOf("::");
      if (compression !== -1 && input.indexOf("::", compression + 1) !== -1) return void 0;
      const left = compression === -1 ? input.split(":") : input.slice(0, compression).split(":");
      const right = compression === -1 ? [] : input.slice(compression + 2).split(":");
      if (compression !== -1) {
        if (left.length === 1 && left[0] === "") left.length = 0;
        if (right.length === 1 && right[0] === "") right.length = 0;
      }
      const parts = left.concat(right);
      let hextetCount = 0;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === "") return void 0;
        if (part.indexOf(".") !== -1) {
          if (i !== parts.length - 1 || compression !== -1 && right.length === 0 || !isIPv4(part)) return void 0;
          hextetCount += 2;
          continue;
        }
        if (!isHextet(part)) return void 0;
        parts[i] = parseInt(part, 16).toString(16);
        hextetCount++;
      }
      if (compression === -1) {
        if (hextetCount !== 8) return void 0;
        return compressIPv6ZeroRun(parts);
      }
      if (hextetCount >= 8) return void 0;
      const expanded = parts.slice(0, left.length);
      for (let i = hextetCount; i < 8; i++) expanded.push("0");
      for (let i = left.length; i < parts.length; i++) expanded.push(parts[i]);
      return compressIPv6ZeroRun(expanded);
    }
    function normalizeIPv6(host) {
      const bracketed = host[0] === "[" && host[host.length - 1] === "]";
      const hasBracket = host[0] === "[" || host[host.length - 1] === "]";
      if (hasBracket && !bracketed) return { host, isIPV6: false, error: true };
      let input = bracketed ? host.slice(1, -1) : host;
      if (bracketed && isIPvFuture(input)) {
        input = input.toLowerCase();
        return { host: `[${input}]`, escapedHost: input, isIPV6: false, isIPVFuture: true };
      }
      if (findToken(input, ":") < 2) {
        return { host, isIPV6: false, error: bracketed };
      }
      let zoneIdentifier = "";
      const zoneSeparator = input.indexOf("%");
      if (zoneSeparator !== -1) {
        const separatorLength = input.slice(zoneSeparator, zoneSeparator + 3).toLowerCase() === "%25" ? 3 : 1;
        zoneIdentifier = input.slice(zoneSeparator + separatorLength);
        if (!isZoneIdentifier(zoneIdentifier)) return { host, isIPV6: false, error: true };
        input = input.slice(0, zoneSeparator);
      }
      const address = normalizeIPv6Address(input);
      if (address === void 0) return { host, isIPV6: false, error: true };
      return {
        host: address + (zoneIdentifier ? "%" + zoneIdentifier : ""),
        escapedHost: address + (zoneIdentifier ? "%25" + zoneIdentifier : ""),
        isIPV6: true
      };
    }
    function findToken(str, token) {
      let ind = 0;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === token) ind++;
      }
      return ind;
    }
    function removeDotSegments(path) {
      let input = path;
      const output = [];
      let nextSlash = -1;
      let len = 0;
      while (len = input.length) {
        if (len === 1) {
          if (input === ".") {
            break;
          } else if (input === "/") {
            output.push("/");
            break;
          } else {
            output.push(input);
            break;
          }
        } else if (len === 2) {
          if (input[0] === ".") {
            if (input[1] === ".") {
              break;
            } else if (input[1] === "/") {
              input = input.slice(2);
              continue;
            }
          } else if (input[0] === "/") {
            if (input[1] === "." || input[1] === "/") {
              output.push("/");
              break;
            }
          }
        } else if (len === 3) {
          if (input === "/..") {
            if (output.length !== 0) {
              output.pop();
            }
            output.push("/");
            break;
          }
        }
        if (input[0] === ".") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(3);
              continue;
            }
          } else if (input[1] === "/") {
            input = input.slice(2);
            continue;
          }
        } else if (input[0] === "/") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(2);
              continue;
            } else if (input[2] === ".") {
              if (input[3] === "/") {
                input = input.slice(3);
                if (output.length !== 0) {
                  output.pop();
                }
                continue;
              }
            }
          }
        }
        if ((nextSlash = input.indexOf("/", 1)) === -1) {
          output.push(input);
          break;
        } else {
          output.push(input.slice(0, nextSlash));
          input = input.slice(nextSlash);
        }
      }
      return output.join("");
    }
    var HOST_DELIMS = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" };
    var HOST_DELIM_RE = /[@/?#:]/g;
    var HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
    function reescapeHostDelimiters(host, isIP) {
      const re = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
      re.lastIndex = 0;
      return host.replace(re, (ch) => HOST_DELIMS[ch]);
    }
    function normalizePercentEncoding(input, decodeUnreserved = false) {
      if (input.indexOf("%") === -1) {
        return input;
      }
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decodeUnreserved && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        output += input[i];
      }
      return output;
    }
    function normalizePathEncoding(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decoded !== "." && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isPathCharacter(ch)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function serializePathEncoding(input, pathNoScheme = false) {
      let output = "";
      let firstSegment = pathNoScheme && input[0] !== "/";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        if (ch === "/") {
          firstSegment = false;
        }
        if (isPathCharacter(ch) && (ch !== ":" || !firstSegment)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function encodeComponent(input, isAllowed) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        if (isAllowed(ch)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function encodeUserinfo(input) {
      return encodeComponent(input, isUserinfoCharacter);
    }
    function encodeQuery(input) {
      return encodeComponent(input, isQueryFragmentCharacter);
    }
    function encodeFragment(input) {
      return encodeComponent(input, isQueryFragmentCharacter);
    }
    function isEscapeSafe(cp) {
      return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 42 || cp === 43 || cp === 45 || cp === 46 || cp === 47 || cp === 64 || cp === 95;
    }
    function normalizeQueryFragmentEncoding(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isQueryFragmentCharacter(ch)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function escapePreservingEscapes(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        output += escape(input[i]);
      }
      return output;
    }
    function recomposeAuthority(component) {
      const uriTokens = [];
      if (component.userinfo !== void 0) {
        uriTokens.push(encodeUserinfo(component.userinfo));
        uriTokens.push("@");
      }
      if (component.host !== void 0) {
        let host = component.host;
        if (!isIPv4(host)) {
          let ipV6res = normalizeIPv6(host);
          if (ipV6res.isIPV6 !== true && ipV6res.isIPVFuture !== true) {
            host = normalizePercentEncoding(host, true);
            ipV6res = normalizeIPv6(host);
          }
          if (ipV6res.isIPV6 === true || ipV6res.isIPVFuture === true) {
            host = `[${ipV6res.escapedHost}]`;
          } else {
            host = reescapeHostDelimiters(host, false);
          }
        }
        uriTokens.push(host);
      }
      if (typeof component.port === "number" || typeof component.port === "string") {
        const port = String(component.port);
        if (!isPort(port)) {
          throw new TypeError("URI port is malformed.");
        }
        uriTokens.push(":");
        uriTokens.push(port);
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    module.exports = {
      nonSimpleDomain,
      recomposeAuthority,
      reescapeHostDelimiters,
      normalizePercentEncoding,
      normalizePathEncoding,
      serializePathEncoding,
      normalizeQueryFragmentEncoding,
      encodeUserinfo,
      encodeQuery,
      encodeFragment,
      escapePreservingEscapes,
      removeDotSegments,
      isIPv4,
      isUUID,
      normalizeIPv6,
      stringArrayToHexStripped
    };
  }
});

// node_modules/fast-uri/lib/schemes.js
var require_schemes = __commonJS({
  "node_modules/fast-uri/lib/schemes.js"(exports, module) {
    "use strict";
    var { isUUID } = require_utils();
    var URN_REG = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu;
    var supportedSchemeNames = (
      /** @type {const} */
      [
        "http",
        "https",
        "ws",
        "wss",
        "urn",
        "urn:uuid"
      ]
    );
    function isValidSchemeName(name) {
      return supportedSchemeNames.indexOf(
        /** @type {*} */
        name
      ) !== -1;
    }
    function wsIsSecure(wsComponent) {
      if (wsComponent.secure === true) {
        return true;
      } else if (wsComponent.secure === false) {
        return false;
      } else if (wsComponent.scheme) {
        return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
      } else {
        return false;
      }
    }
    function httpParse(component) {
      if (!component.host) {
        component.error = component.error || "HTTP URIs must have a host.";
      }
      return component;
    }
    function httpSerialize(component) {
      const secure = String(component.scheme).toLowerCase() === "https";
      if (component.port === (secure ? 443 : 80) || component.port === "") {
        component.port = void 0;
      }
      if (!component.path) {
        component.path = "/";
      }
      return component;
    }
    function wsParse(wsComponent) {
      wsComponent.secure = wsIsSecure(wsComponent);
      wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
      wsComponent.path = void 0;
      wsComponent.query = void 0;
      return wsComponent;
    }
    function wsSerialize(wsComponent) {
      if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
        wsComponent.port = void 0;
      }
      if (typeof wsComponent.secure === "boolean") {
        wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
        wsComponent.secure = void 0;
      }
      if (wsComponent.resourceName) {
        const queryIndex = wsComponent.resourceName.indexOf("?");
        const path = queryIndex === -1 ? wsComponent.resourceName : wsComponent.resourceName.slice(0, queryIndex);
        wsComponent.path = path && path !== "/" ? path : void 0;
        wsComponent.query = queryIndex === -1 ? void 0 : wsComponent.resourceName.slice(queryIndex + 1);
        wsComponent.resourceName = void 0;
      }
      wsComponent.fragment = void 0;
      return wsComponent;
    }
    function urnParse(urnComponent, options) {
      if (!urnComponent.path) {
        urnComponent.error = "URN can not be parsed";
        return urnComponent;
      }
      const matches = urnComponent.path.match(URN_REG);
      if (matches && matches[0] === urnComponent.path) {
        const scheme = options.scheme || urnComponent.scheme || "urn";
        urnComponent.nid = matches[1].toLowerCase();
        urnComponent.nss = matches[2];
        const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        urnComponent.path = void 0;
        if (schemeHandler) {
          urnComponent = schemeHandler.parse(urnComponent, options);
        }
      } else {
        urnComponent.error = urnComponent.error || "URN can not be parsed.";
      }
      return urnComponent;
    }
    function urnSerialize(urnComponent, options) {
      if (urnComponent.nid === void 0) {
        throw new Error("URN without nid cannot be serialized");
      }
      const scheme = options.scheme || urnComponent.scheme || "urn";
      const nid = urnComponent.nid.toLowerCase();
      const urnScheme = `${scheme}:${options.nid || nid}`;
      const schemeHandler = getSchemeHandler(urnScheme);
      if (schemeHandler) {
        urnComponent = schemeHandler.serialize(urnComponent, options);
      }
      const uriComponent = urnComponent;
      const nss = urnComponent.nss;
      uriComponent.path = `${nid || options.nid}:${nss}`;
      options.skipEscape = true;
      return uriComponent;
    }
    function urnuuidParse(urnComponent, options) {
      const uuidComponent = urnComponent;
      uuidComponent.uuid = uuidComponent.nss;
      uuidComponent.nss = void 0;
      if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
        uuidComponent.error = uuidComponent.error || "UUID is not valid.";
      }
      return uuidComponent;
    }
    function urnuuidSerialize(uuidComponent) {
      const urnComponent = uuidComponent;
      urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
      return urnComponent;
    }
    var http = (
      /** @type {SchemeHandler} */
      {
        scheme: "http",
        domainHost: true,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var https = (
      /** @type {SchemeHandler} */
      {
        scheme: "https",
        domainHost: http.domainHost,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var ws = (
      /** @type {SchemeHandler} */
      {
        scheme: "ws",
        domainHost: true,
        parse: wsParse,
        serialize: wsSerialize
      }
    );
    var wss = (
      /** @type {SchemeHandler} */
      {
        scheme: "wss",
        domainHost: ws.domainHost,
        parse: ws.parse,
        serialize: ws.serialize
      }
    );
    var urn = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn",
        parse: urnParse,
        serialize: urnSerialize,
        skipNormalize: true
      }
    );
    var urnuuid = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn:uuid",
        parse: urnuuidParse,
        serialize: urnuuidSerialize,
        skipNormalize: true
      }
    );
    var SCHEMES = (
      /** @type {Record<SchemeName, SchemeHandler>} */
      {
        http,
        https,
        ws,
        wss,
        urn,
        "urn:uuid": urnuuid
      }
    );
    Object.setPrototypeOf(SCHEMES, null);
    function getSchemeHandler(scheme) {
      return scheme && (SCHEMES[
        /** @type {SchemeName} */
        scheme
      ] || SCHEMES[
        /** @type {SchemeName} */
        scheme.toLowerCase()
      ]) || void 0;
    }
    module.exports = {
      wsIsSecure,
      SCHEMES,
      isValidSchemeName,
      getSchemeHandler
    };
  }
});

// node_modules/fast-uri/index.js
var require_fast_uri = __commonJS({
  "node_modules/fast-uri/index.js"(exports, module) {
    "use strict";
    var { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, serializePathEncoding, normalizeQueryFragmentEncoding, encodeQuery, encodeFragment, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils();
    var { SCHEMES, getSchemeHandler } = require_schemes();
    var VALID_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/u;
    var MALFORMED_SCHEME_ERROR = "URI scheme is malformed.";
    function decodeValidScheme(scheme) {
      const decodedScheme = unescape(String(scheme));
      if (!VALID_SCHEME.test(decodedScheme)) {
        throw new TypeError(MALFORMED_SCHEME_ERROR);
      }
      return decodedScheme;
    }
    function normalize(uri, options) {
      if (typeof uri === "string") {
        uri = /** @type {T} */
        normalizeString(uri, options);
      } else if (typeof uri === "object") {
        uri = /** @type {T} */
        parse(serialize(uri, options), options);
      }
      return uri;
    }
    function resolve(baseURI, relativeURI, options) {
      const schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" };
      const {
        parsed: baseParsed,
        malformedAuthorityOrPort: baseMalformed,
        malformedPercentEncoding: baseMalformedPercentEncoding,
        malformedSchemeSpecific: baseMalformedSchemeSpecific,
        malformedHost: baseMalformedHost,
        malformedScheme: baseMalformedScheme
      } = parseWithStatus(baseURI, schemelessOptions);
      const {
        parsed: relativeParsed,
        malformedAuthorityOrPort: relativeMalformed,
        malformedPercentEncoding: relativeMalformedPercentEncoding,
        malformedSchemeSpecific: relativeMalformedSchemeSpecific,
        malformedHost: relativeMalformedHost,
        malformedScheme: relativeMalformedScheme
      } = parseWithStatus(relativeURI, schemelessOptions);
      if (baseMalformed || relativeMalformed || baseMalformedPercentEncoding || relativeMalformedPercentEncoding || baseMalformedSchemeSpecific || relativeMalformedSchemeSpecific || baseMalformedHost || relativeMalformedHost || baseMalformedScheme || relativeMalformedScheme) {
        throw new Error(baseParsed.error || relativeParsed.error || "URI is malformed.");
      }
      const resolved = resolveComponent(baseParsed, relativeParsed, schemelessOptions, true);
      const resolvedSchemeHandler = getSchemeHandler(options && options.scheme || resolved.scheme);
      const resolvedHost = resolved.host;
      const resolvedHostIsIP = resolvedHost !== void 0 && resolvedHost !== "" && (isIPv4(resolvedHost) || normalizeIPv6(resolvedHost).isIPV6);
      canonicalizeHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP);
      const encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !/\P{ASCII}/u.test(resolvedHost);
      if (resolved.error && !encodedASCIIHost) {
        throw new Error(resolved.error);
      }
      schemelessOptions.skipEscape = true;
      return serialize(resolved, schemelessOptions);
    }
    function resolveComponent(base, relative, options, skipNormalization) {
      const target = {};
      if (!skipNormalization) {
        base = parse(serialize(base, options), options);
        relative = parse(serialize(relative, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
      } else {
        if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (!relative.path) {
            target.path = base.path;
            if (relative.query !== void 0) {
              target.query = relative.query;
            } else {
              target.query = base.query;
            }
          } else {
            if (relative.path[0] === "/") {
              target.path = removeDotSegments(relative.path);
            } else {
              if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
                target.path = "/" + relative.path;
              } else if (!base.path) {
                target.path = relative.path;
              } else {
                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
              }
              target.path = removeDotSegments(target.path);
            }
            target.query = relative.query;
          }
          target.userinfo = base.userinfo;
          target.host = base.host;
          target.port = base.port;
        }
        target.scheme = base.scheme;
      }
      target.fragment = relative.fragment;
      return target;
    }
    function equal(uriA, uriB, options) {
      const normalizedA = normalizeComparableURI(uriA, options);
      const normalizedB = normalizeComparableURI(uriB, options);
      return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA === normalizedB;
    }
    function serialize(cmpts, opts) {
      const component = {
        host: cmpts.host,
        scheme: cmpts.scheme,
        userinfo: cmpts.userinfo,
        port: cmpts.port,
        path: cmpts.path,
        query: cmpts.query,
        nid: cmpts.nid,
        nss: cmpts.nss,
        uuid: cmpts.uuid,
        fragment: cmpts.fragment,
        reference: cmpts.reference,
        resourceName: cmpts.resourceName,
        secure: cmpts.secure,
        error: ""
      };
      const options = Object.assign({}, opts);
      const uriTokens = [];
      if (component.scheme) {
        component.scheme = decodeValidScheme(component.scheme);
      }
      const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
      if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
      const hasAuthority = component.userinfo !== void 0 || component.host !== void 0 || component.port !== void 0;
      const pathNoScheme = !options.skipEscape && component.scheme === void 0 && !hasAuthority;
      if (component.path !== void 0) {
        if (!options.skipEscape) {
          component.path = serializePathEncoding(component.path, pathNoScheme);
        } else {
          component.path = normalizePercentEncoding(component.path);
        }
      }
      if (options.reference !== "suffix" && component.scheme) {
        component.scheme = decodeValidScheme(component.scheme);
        uriTokens.push(component.scheme, ":");
      }
      const authority = recomposeAuthority(component);
      if (authority !== void 0) {
        if (options.reference !== "suffix") {
          uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (component.path && component.path[0] !== "/") {
          uriTokens.push("/");
        }
      }
      if (component.path !== void 0) {
        let s = component.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
          s = removeDotSegments(s);
        }
        if (pathNoScheme) {
          s = serializePathEncoding(s, true);
        }
        if (authority === void 0 && s[0] === "/" && s[1] === "/") {
          s = "/%2F" + s.slice(2);
        }
        uriTokens.push(s);
      }
      if (component.query !== void 0) {
        uriTokens.push("?", encodeQuery(component.query));
      }
      if (component.fragment !== void 0) {
        uriTokens.push("#", encodeFragment(component.fragment));
      }
      return uriTokens.join("");
    }
    var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
    var AUTHORITY_PREFIX = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/;
    var AUTHORITY_INTRODUCER_REGION = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
    function getParseError(parsed, matches) {
      if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") {
        return 'URI path must start with "/" when authority is present.';
      }
      if (typeof parsed.port === "number" && (parsed.port < 0 || parsed.port > 65535)) {
        return "URI port is malformed.";
      }
      return void 0;
    }
    function hasMalformedPercentEncoding(component) {
      if (component === void 0) return false;
      let percent = component.indexOf("%");
      while (percent !== -1) {
        if (percent + 2 >= component.length || !/^[\da-f]{2}$/iu.test(component.slice(percent + 1, percent + 3))) {
          return true;
        }
        percent = component.indexOf("%", percent + 3);
      }
      return false;
    }
    function isIPLiteral(host) {
      return host[0] === "[" && host[host.length - 1] === "]";
    }
    function hasMalformedComponentPercentEncoding(matches) {
      const host = matches[4];
      return hasMalformedPercentEncoding(matches[3]) || host !== void 0 && !isIPLiteral(host) && hasMalformedPercentEncoding(host) || hasMalformedPercentEncoding(matches[6]) || hasMalformedPercentEncoding(matches[7]) || hasMalformedPercentEncoding(matches[8]);
    }
    function canonicalizeHost(parsed, options, schemeHandler, isIP) {
      if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport) && parsed.host && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
        try {
          parsed.host = new URL("http://" + parsed.host).hostname;
        } catch (e) {
          parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
          return true;
        }
      }
      return false;
    }
    function parseWithStatus(uri, opts) {
      const options = Object.assign({}, opts);
      const parsed = {
        scheme: void 0,
        userinfo: void 0,
        host: "",
        port: void 0,
        path: "",
        query: void 0,
        fragment: void 0
      };
      let malformedAuthorityOrPort = false;
      let malformedPercentEncoding = false;
      let malformedSchemeSpecific = false;
      let malformedHost = false;
      let malformedIPLiteral = false;
      let malformedScheme = false;
      let isIP = false;
      if (options.reference === "suffix") {
        if (options.scheme) {
          uri = options.scheme + ":" + uri;
        } else {
          uri = "//" + uri;
        }
      }
      const authorityMatch = uri.match(AUTHORITY_PREFIX);
      if (authorityMatch !== null && authorityMatch[1].indexOf("\\") !== -1) {
        parsed.error = "URI authority must not contain a literal backslash.";
        malformedAuthorityOrPort = true;
      }
      const introducerMatch = uri.match(AUTHORITY_INTRODUCER_REGION);
      if (introducerMatch !== null) {
        const region = introducerMatch[1];
        const normalizedRegion = region.replace(/[\t\n\r]/g, "");
        if (normalizedRegion.length >= 2) {
          if (normalizedRegion.slice(0, 2) !== "//") {
            parsed.error = parsed.error || "URI authority must not contain a literal backslash.";
            malformedAuthorityOrPort = true;
          } else if (region.length !== normalizedRegion.length) {
            parsed.error = parsed.error || "URI authority introducer must not contain whitespace.";
            malformedAuthorityOrPort = true;
          }
        }
      }
      const matches = uri.match(URI_PARSE);
      if (matches) {
        parsed.scheme = matches[1];
        parsed.userinfo = matches[3];
        parsed.host = matches[4];
        parsed.port = parseInt(matches[5], 10);
        parsed.path = matches[6] || "";
        parsed.query = matches[7];
        parsed.fragment = matches[8];
        if (parsed.scheme !== void 0) {
          const decodedScheme = unescape(parsed.scheme);
          if (VALID_SCHEME.test(decodedScheme)) {
            parsed.scheme = decodedScheme.toLowerCase();
          } else {
            parsed.error = parsed.error || MALFORMED_SCHEME_ERROR;
            malformedScheme = true;
          }
        }
        malformedPercentEncoding = hasMalformedComponentPercentEncoding(matches);
        if (malformedPercentEncoding) {
          parsed.error = parsed.error || "URI contains malformed percent-encoding.";
        }
        if (isNaN(parsed.port)) {
          parsed.port = matches[5];
        }
        const parseError = getParseError(parsed, matches);
        if (parseError !== void 0) {
          parsed.error = parsed.error || parseError;
          malformedAuthorityOrPort = true;
        }
        if (parsed.host) {
          const ipv4result = isIPv4(parsed.host);
          if (ipv4result === false) {
            const bracketedIPLiteral = isIPLiteral(parsed.host);
            const hasIPLiteralBracket = parsed.host.indexOf("[") !== -1 || parsed.host.indexOf("]") !== -1;
            const ipv6result = normalizeIPv6(parsed.host);
            isIP = ipv6result.isIPV6 || ipv6result.isIPVFuture === true;
            malformedIPLiteral = hasIPLiteralBracket && (!bracketedIPLiteral || ipv6result.error === true);
            parsed.host = isIP ? ipv6result.host : ipv6result.host.toLowerCase();
            if (malformedIPLiteral) {
              parsed.error = parsed.error || "URI host is malformed.";
              malformedAuthorityOrPort = true;
            }
          } else {
            isIP = true;
          }
        }
        if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
          parsed.reference = "same-document";
        } else if (parsed.scheme === void 0) {
          parsed.reference = "relative";
        } else if (parsed.fragment === void 0) {
          parsed.reference = "absolute";
        } else {
          parsed.reference = "uri";
        }
        if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
          parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
        }
        const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
        if (!malformedIPLiteral) {
          malformedHost = canonicalizeHost(parsed, options, schemeHandler, isIP);
        }
        if (uri.indexOf("%") !== -1 && parsed.host !== void 0 && !malformedIPLiteral) {
          let host = isIP ? parsed.host : normalizePercentEncoding(parsed.host, true);
          if (!isIP) {
            host = normalizePercentEncoding(host.toLowerCase());
          }
          parsed.host = reescapeHostDelimiters(host, isIP);
        }
        if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
          if (parsed.path) {
            parsed.path = normalizePathEncoding(parsed.path);
          }
          if (parsed.query) {
            parsed.query = normalizeQueryFragmentEncoding(parsed.query);
          }
          if (parsed.fragment) {
            parsed.fragment = normalizeQueryFragmentEncoding(parsed.fragment);
          }
        }
        if (schemeHandler && schemeHandler.parse) {
          schemeHandler.parse(parsed, options);
          if (schemeHandler === SCHEMES.urn && parsed.nid === void 0) {
            malformedSchemeSpecific = true;
          }
        }
      } else {
        parsed.error = parsed.error || "URI can not be parsed.";
      }
      return { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme };
    }
    function parse(uri, opts) {
      return parseWithStatus(uri, opts).parsed;
    }
    function normalizeString(uri, opts) {
      return normalizeStringWithStatus(uri, opts).normalized;
    }
    function normalizeStringWithStatus(uri, opts) {
      const { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = parseWithStatus(uri, opts);
      return {
        normalized: malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? uri : serialize(parsed, opts),
        malformedAuthorityOrPort,
        malformedPercentEncoding,
        malformedSchemeSpecific,
        malformedHost,
        malformedScheme
      };
    }
    function normalizeComparableURI(uri, opts) {
      if (typeof uri !== "string" && typeof uri !== "object") {
        return void 0;
      }
      let value;
      try {
        value = typeof uri === "string" ? uri : serialize(uri, opts);
      } catch {
        return void 0;
      }
      const { normalized, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = normalizeStringWithStatus(value, opts);
      return malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? void 0 : normalized;
    }
    var fastUri = {
      SCHEMES,
      normalize,
      resolve,
      resolveComponent,
      equal,
      serialize,
      parse
    };
    module.exports = fastUri;
    module.exports.default = fastUri;
    module.exports.fastUri = fastUri;
  }
});

// node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  "node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uri = require_fast_uri();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri;
  }
});

// node_modules/ajv/dist/core.js
var require_core = __commonJS({
  "node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate2();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    var Ajv = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = /* @__PURE__ */ Object.create(null);
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema(ref));
          } finally {
            delete this._loading[ref];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id = schema[schemaId];
          if (id !== void 0 && typeof id != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef[this.opts.schemaId];
            if (id) {
              id = (0, resolve_1.normalizeId)(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    Ajv.ValidationError = validation_error_1.default;
    Ajv.MissingRefError = ref_error_1.default;
    exports.default = Ajv;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  }
});

// node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root)
            return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", { ref: root });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports.callRef = callRef;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports.default = core;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        if ($data) {
          const { regExp } = it.opts.code;
          const regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp);
          const valid = gen.let("valid");
          gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, false));
          cxt.fail$data((0, codegen_1._)`!${valid}`);
        } else {
          const regExp = (0, code_1.usePattern)(cxt, schema);
          cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
          return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});

// node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1)
              gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || schema && typeof schema == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const { gen, schema, data, keyword, it } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
          if (!it.allErrors)
            gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
          return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const { gen, parentSchema, data, keyword, it } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        if (prefixItems)
          (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
          cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0)
            cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0)
            gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
          return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_1 = require_validate2();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
      else
        applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    exports.default = getApplicator;
  }
});

// node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false)
              return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
            const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports.default = format;
  }
});

// node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  "node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports.default = draft7Vocabularies;
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError || (exports.DiscrError = DiscrError = {}));
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var types_1 = require_types2();
    var compile_1 = require_compile();
    var ref_error_1 = require_ref_error();
    var util_1 = require_util();
    var error = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
          throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        function getMapping() {
          var _a;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              const ref = sch.$ref;
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
              if (sch instanceof compile_1.SchemaEnv)
                sch = sch.schema;
              if (sch === void 0)
                throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
            }
            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports.Ajv = Ajv;
    module.exports = exports = Ajv;
    module.exports.Ajv = Ajv;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv;
    var validate_1 = require_validate2();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/x-gts-ref.js
var require_x_gts_ref = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/x-gts-ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XGtsRefValidator = void 0;
    var gts_1 = require_gts();
    var XGtsRefValidator = class {
      constructor(store) {
        this.store = store;
      }
      /**
       * Validate an instance against x-gts-ref constraints in schema
       */
      validateInstance(instance, schema, instancePath = "") {
        const errors = [];
        this.visitInstance(instance, schema, instancePath, schema, errors);
        return errors;
      }
      /**
       * Validate x-gts-ref fields in a schema definition
       */
      validateSchema(schema, schemaPath = "", rootSchema = null) {
        if (!rootSchema) {
          rootSchema = schema;
        }
        const errors = [];
        this.visitSchema(schema, schemaPath, rootSchema, errors);
        return errors;
      }
      visitInstance(instance, schema, path, rootSchema, errors) {
        if (!schema)
          return;
        if (schema["x-gts-ref"] !== void 0) {
          if (typeof instance === "string") {
            const err = this.validateRefValue(instance, schema["x-gts-ref"], path, rootSchema);
            if (err) {
              errors.push(err);
            }
          }
        }
        if (schema.type === "object" && schema.properties) {
          if (instance && typeof instance === "object") {
            for (const propName in schema.properties) {
              if (propName in instance) {
                const propPath = path ? `${path}.${propName}` : propName;
                this.visitInstance(instance[propName], schema.properties[propName], propPath, rootSchema, errors);
              }
            }
          }
        }
        if (schema.type === "array" && schema.items) {
          if (Array.isArray(instance)) {
            instance.forEach((item, idx) => {
              const itemPath = `${path}[${idx}]`;
              this.visitInstance(item, schema.items, itemPath, rootSchema, errors);
            });
          }
        }
        if (Array.isArray(schema.allOf)) {
          for (const subSchema of schema.allOf) {
            this.visitInstance(instance, subSchema, path, rootSchema, errors);
          }
        }
        if (Array.isArray(schema.anyOf)) {
          const refBranches = schema.anyOf.filter((s) => this.containsXGtsRef(s));
          if (refBranches.length > 0 && refBranches.length === schema.anyOf.length) {
            const branchResults = refBranches.map((subSchema) => {
              const branchErrors = [];
              this.visitInstance(instance, subSchema, path, rootSchema, branchErrors);
              return branchErrors;
            });
            const anyPassed = branchResults.some((errs) => errs.length === 0);
            if (!anyPassed) {
              for (const branchErrors of branchResults) {
                errors.push(...branchErrors);
              }
            }
          }
        }
        if (Array.isArray(schema.oneOf)) {
          const refBranches = schema.oneOf.filter((s) => this.containsXGtsRef(s));
          if (refBranches.length > 0 && refBranches.length === schema.oneOf.length) {
            const branchResults = refBranches.map((subSchema) => {
              const branchErrors = [];
              this.visitInstance(instance, subSchema, path, rootSchema, branchErrors);
              return branchErrors;
            });
            const passingCount = branchResults.filter((errs) => errs.length === 0).length;
            if (passingCount === 0) {
              for (const branchErrors of branchResults) {
                errors.push(...branchErrors);
              }
            } else if (passingCount > 1) {
              errors.push({
                fieldPath: path || "/",
                value: instance,
                refPattern: "",
                reason: `Value matches ${passingCount} oneOf branches but must match exactly one`
              });
            }
          }
        }
      }
      visitSchema(schema, path, rootSchema, errors) {
        if (!schema || typeof schema !== "object")
          return;
        if (schema["x-gts-ref"] !== void 0) {
          const refPath = path ? `${path}/x-gts-ref` : "x-gts-ref";
          const err = this.validateRefPattern(schema["x-gts-ref"], refPath, rootSchema);
          if (err) {
            errors.push(err);
          }
        }
        for (const key in schema) {
          if (key === "x-gts-ref")
            continue;
          const nestedPath = path ? `${path}/${key}` : key;
          const value = schema[key];
          if (value && typeof value === "object") {
            if (Array.isArray(value)) {
              value.forEach((item, idx) => {
                if (item && typeof item === "object") {
                  this.visitSchema(item, `${nestedPath}[${idx}]`, rootSchema, errors);
                }
              });
            } else {
              this.visitSchema(value, nestedPath, rootSchema, errors);
            }
          }
        }
      }
      validateRefValue(value, refPattern, fieldPath, schema) {
        if (typeof refPattern !== "string") {
          return {
            fieldPath,
            value,
            refPattern: String(refPattern),
            reason: `Value must be a string, got ${typeof refPattern}`
          };
        }
        let resolvedPattern = refPattern;
        if (refPattern.startsWith("/")) {
          const resolved = this.resolvePointer(schema, refPattern);
          if (!resolved) {
            return {
              fieldPath,
              value,
              refPattern,
              reason: `Cannot resolve reference path '${refPattern}'`
            };
          }
          if (resolved.startsWith("/")) {
            const furtherResolved = this.resolvePointer(schema, resolved);
            if (!furtherResolved) {
              return {
                fieldPath,
                value,
                refPattern,
                reason: `Cannot resolve nested reference '${refPattern}' -> '${resolved}'`
              };
            }
            resolvedPattern = furtherResolved;
          } else {
            resolvedPattern = resolved;
          }
          if (!resolvedPattern.startsWith("gts.")) {
            return {
              fieldPath,
              value,
              refPattern,
              reason: `Resolved reference '${refPattern}' -> '${resolvedPattern}' is not a GTS pattern`
            };
          }
        }
        return this.validateGtsPattern(value, resolvedPattern, fieldPath);
      }
      validateRefPattern(refPattern, fieldPath, rootSchema) {
        if (typeof refPattern !== "string") {
          return {
            fieldPath,
            value: refPattern,
            refPattern: "",
            reason: `x-gts-ref value must be a string, got ${typeof refPattern}`
          };
        }
        if (refPattern.startsWith("gts.")) {
          return this.validateGtsIDOrPattern(refPattern, fieldPath);
        }
        if (refPattern.startsWith("/")) {
          const resolved = this.resolvePointer(rootSchema, refPattern);
          if (!resolved) {
            return {
              fieldPath,
              value: refPattern,
              refPattern,
              reason: `Cannot resolve reference path '${refPattern}'`
            };
          }
          if (!gts_1.Gts.isValidGtsID(resolved)) {
            return {
              fieldPath,
              value: refPattern,
              refPattern,
              reason: `Resolved reference '${refPattern}' -> '${resolved}' is not a valid GTS identifier`
            };
          }
          return null;
        }
        return {
          fieldPath,
          value: refPattern,
          refPattern,
          reason: `Invalid x-gts-ref value: '${refPattern}' must start with 'gts.' or '/'`
        };
      }
      validateGtsIDOrPattern(pattern, fieldPath) {
        if (pattern === "gts.*") {
          return null;
        }
        if (pattern.includes("*")) {
          const prefix = pattern.replace("*", "");
          if (!prefix.startsWith("gts.")) {
            return {
              fieldPath,
              value: pattern,
              refPattern: pattern,
              reason: `Invalid GTS wildcard pattern: ${pattern}`
            };
          }
          return null;
        }
        if (!gts_1.Gts.isValidGtsID(pattern)) {
          return {
            fieldPath,
            value: pattern,
            refPattern: pattern,
            reason: `Invalid GTS identifier: ${pattern}`
          };
        }
        return null;
      }
      validateGtsPattern(value, pattern, fieldPath) {
        if (!gts_1.Gts.isValidGtsID(value)) {
          return {
            fieldPath,
            value,
            refPattern: pattern,
            reason: `Value '${value}' is not a valid GTS identifier`
          };
        }
        if (pattern === "gts.*") {
        } else if (pattern.endsWith("*")) {
          const prefix = pattern.slice(0, -1);
          if (!value.startsWith(prefix)) {
            return {
              fieldPath,
              value,
              refPattern: pattern,
              reason: `Value '${value}' does not match pattern '${pattern}'`
            };
          }
        } else if (!value.startsWith(pattern)) {
          return {
            fieldPath,
            value,
            refPattern: pattern,
            reason: `Value '${value}' does not match pattern '${pattern}'`
          };
        }
        if (this.store) {
          const entity = this.store.get(value);
          if (!entity) {
            return {
              fieldPath,
              value,
              refPattern: pattern,
              reason: `Referenced entity '${value}' not found in registry`
            };
          }
        }
        return null;
      }
      containsXGtsRef(schema) {
        if (!schema || typeof schema !== "object")
          return false;
        if (schema["x-gts-ref"] !== void 0)
          return true;
        for (const value of Object.values(schema)) {
          if (Array.isArray(value)) {
            if (value.some((item) => this.containsXGtsRef(item)))
              return true;
          } else if (value && typeof value === "object") {
            if (this.containsXGtsRef(value))
              return true;
          }
        }
        return false;
      }
      /**
       * Strip the "gts://" prefix from a value if present
       */
      stripGtsURIPrefix(value) {
        return value.replace(/^gts:\/\//, "");
      }
      /**
       * Resolve a JSON Pointer in the schema
       * Note: For /$id references, the gts:// prefix is stripped from the value
       */
      resolvePointer(schema, pointer) {
        const path = pointer.startsWith("/") ? pointer.slice(1) : pointer;
        if (!path)
          return "";
        const parts = path.split("/");
        let current = schema;
        for (const part of parts) {
          if (!current || typeof current !== "object") {
            return "";
          }
          current = current[part];
          if (current === void 0) {
            return "";
          }
        }
        if (typeof current === "string") {
          return this.stripGtsURIPrefix(current);
        }
        if (current && typeof current === "object" && current["x-gts-ref"]) {
          const xGtsRef = current["x-gts-ref"];
          if (typeof xGtsRef === "string") {
            if (xGtsRef.startsWith("/")) {
              return this.resolvePointer(schema, xGtsRef);
            }
            return xGtsRef;
          }
        }
        return "";
      }
    };
    exports.XGtsRefValidator = XGtsRefValidator;
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/store.js
var require_store = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/store.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GtsStore = void 0;
    exports.createJsonEntity = createJsonEntity2;
    var ajv_1 = __importDefault(require_ajv());
    var types_1 = require_types();
    var gts_1 = require_gts();
    var extract_1 = require_extract();
    var x_gts_ref_1 = require_x_gts_ref();
    var GtsStore2 = class {
      constructor(config) {
        this.byId = /* @__PURE__ */ new Map();
        this.config = {
          validateRefs: config?.validateRefs ?? false,
          strictMode: config?.strictMode ?? false
        };
        this.ajv = new ajv_1.default({
          strict: false,
          validateSchema: false,
          addUsedSchema: false,
          loadSchema: this.loadSchema.bind(this),
          validateFormats: false
          // Disable format validation to match Go implementation
        });
      }
      async loadSchema(uri) {
        const normalizedUri = uri.startsWith(types_1.GTS_URI_PREFIX) ? uri.substring(types_1.GTS_URI_PREFIX.length) : uri;
        if (gts_1.Gts.isValidGtsID(normalizedUri)) {
          const entity = this.get(normalizedUri);
          if (entity && entity.isSchema) {
            return entity.content;
          }
        }
        throw new Error(`Unresolvable GTS reference: ${uri}`);
      }
      register(entity) {
        if (this.config.validateRefs) {
          for (const ref of entity.references) {
            if (!this.byId.has(ref)) {
              throw new Error(`Unresolved reference: ${ref}`);
            }
          }
        }
        this.byId.set(entity.id, entity);
        if (entity.isSchema && entity.content) {
          try {
            const normalizedSchema = this.normalizeSchema(entity.content);
            if (!normalizedSchema.$id) {
              normalizedSchema.$id = entity.id;
            }
            this.ajv.addSchema(normalizedSchema, entity.id);
          } catch (err) {
          }
        }
      }
      get(id) {
        return this.byId.get(id);
      }
      getAll() {
        return Array.from(this.byId.values());
      }
      query(pattern, limit) {
        const results = [];
        const maxResults = limit ?? Number.MAX_SAFE_INTEGER;
        for (const [id] of this.byId) {
          if (results.length >= maxResults)
            break;
          const matchResult = gts_1.Gts.matchIDPattern(id, pattern);
          if (matchResult.match) {
            results.push(id);
          }
        }
        return results;
      }
      validateInstance(gtsId) {
        try {
          let objId = gtsId;
          if (gts_1.Gts.isValidGtsID(gtsId)) {
            const gid = gts_1.Gts.parseGtsID(gtsId);
            objId = gid.id;
          }
          const obj = this.get(objId);
          if (!obj) {
            return {
              id: gtsId,
              ok: false,
              valid: false,
              error: `Entity not found: ${gtsId}`
            };
          }
          if (!obj.schemaId) {
            return {
              id: gtsId,
              ok: false,
              valid: false,
              error: `No schema found for instance: ${gtsId}`
            };
          }
          const schemaEntity = this.get(obj.schemaId);
          if (!schemaEntity) {
            return {
              id: gtsId,
              ok: false,
              valid: false,
              error: `Schema not found: ${obj.schemaId}`
            };
          }
          if (!schemaEntity.isSchema) {
            return {
              id: gtsId,
              ok: false,
              valid: false,
              error: `Entity '${obj.schemaId}' is not a schema`
            };
          }
          const validate = this.ajv.compile(this.normalizeSchema(schemaEntity.content));
          const isValid = validate(obj.content);
          if (!isValid) {
            const errors = validate.errors?.map((e) => {
              if (e.keyword === "required") {
                return `${e.instancePath || "/"} must have required property '${e.params?.missingProperty}'`;
              }
              return `${e.instancePath} ${e.message}`;
            }).join("; ") || "Validation failed";
            return {
              id: gtsId,
              ok: false,
              valid: false,
              error: errors
            };
          }
          const xGtsRefValidator = new x_gts_ref_1.XGtsRefValidator(this);
          const xGtsRefErrors = xGtsRefValidator.validateInstance(obj.content, schemaEntity.content);
          if (xGtsRefErrors.length > 0) {
            const errorMsgs = xGtsRefErrors.map((err) => err.reason).join("; ");
            return {
              id: gtsId,
              ok: false,
              valid: false,
              error: `x-gts-ref validation failed: ${errorMsgs}`
            };
          }
          return {
            id: gtsId,
            ok: true,
            valid: true,
            error: ""
          };
        } catch (error) {
          return {
            id: gtsId,
            ok: false,
            valid: false,
            error: error instanceof Error ? error.message : String(error)
          };
        }
      }
      normalizeSchema(schema) {
        return this.normalizeSchemaRecursive(schema);
      }
      normalizeSchemaRecursive(obj) {
        if (obj === null || typeof obj !== "object") {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map((item) => this.normalizeSchemaRecursive(item));
        }
        const normalized = {};
        for (const [key, value] of Object.entries(obj)) {
          if (key === "x-gts-ref")
            continue;
          let newKey = key;
          let newValue = value;
          switch (key) {
            case "$$id":
              newKey = "$id";
              break;
            case "$$schema":
              newKey = "$schema";
              break;
            case "$$ref":
              newKey = "$ref";
              break;
            case "$$defs":
              newKey = "$defs";
              break;
          }
          if (value && typeof value === "object") {
            newValue = this.normalizeSchemaRecursive(value);
          }
          normalized[newKey] = newValue;
        }
        for (const combinator of ["oneOf", "anyOf", "allOf"]) {
          if (Array.isArray(normalized[combinator])) {
            normalized[combinator] = normalized[combinator].filter((_sub, idx) => {
              const original = obj[combinator]?.[idx];
              const isXGtsRefOnly = original && typeof original === "object" && !Array.isArray(original) && Object.keys(original).length === 1 && original["x-gts-ref"] !== void 0;
              return !isXGtsRefOnly;
            });
            if (normalized[combinator].length === 0) {
              delete normalized[combinator];
            }
          }
        }
        if (normalized["$id"] && typeof normalized["$id"] === "string") {
          if (normalized["$id"].startsWith(types_1.GTS_URI_PREFIX)) {
            normalized["$id"] = normalized["$id"].substring(types_1.GTS_URI_PREFIX.length);
          }
        }
        if (normalized["$ref"] && typeof normalized["$ref"] === "string") {
          if (normalized["$ref"].startsWith(types_1.GTS_URI_PREFIX)) {
            normalized["$ref"] = normalized["$ref"].substring(types_1.GTS_URI_PREFIX.length);
          }
        }
        return normalized;
      }
      resolveRelationships(gtsId) {
        const seen = /* @__PURE__ */ new Set();
        return this.buildSchemaGraphNode(gtsId, seen);
      }
      buildSchemaGraphNode(gtsId, seen) {
        const node = {
          id: gtsId
        };
        if (seen.has(gtsId)) {
          return node;
        }
        seen.add(gtsId);
        const entity = this.get(gtsId);
        if (!entity) {
          node.errors = ["Entity not found"];
          return node;
        }
        const refs = this.extractGtsReferences(entity.content);
        const nodeRefs = {};
        for (const ref of refs) {
          if (ref.id === gtsId) {
            continue;
          }
          if (this.isJsonSchemaUrl(ref.id)) {
            continue;
          }
          nodeRefs[ref.sourcePath] = this.buildSchemaGraphNode(ref.id, seen);
        }
        if (Object.keys(nodeRefs).length > 0) {
          node.refs = nodeRefs;
        }
        if (entity.schemaId) {
          if (!this.isJsonSchemaUrl(entity.schemaId)) {
            node.schema_id = this.buildSchemaGraphNode(entity.schemaId, seen);
          }
        } else if (!entity.isSchema) {
          node.errors = node.errors || [];
          node.errors.push("Schema not recognized");
        }
        return node;
      }
      extractGtsReferences(content) {
        const refs = [];
        const seen = /* @__PURE__ */ new Set();
        const walkAndCollectRefs = (node, path) => {
          if (node === null || node === void 0) {
            return;
          }
          if (typeof node === "string") {
            if (gts_1.Gts.isValidGtsID(node)) {
              const sourcePath = path || "root";
              const key = `${node}|${sourcePath}`;
              if (!seen.has(key)) {
                refs.push({ id: node, sourcePath });
                seen.add(key);
              }
            }
            return;
          }
          if (typeof node === "object" && !Array.isArray(node)) {
            for (const [k, v] of Object.entries(node)) {
              const nextPath = path ? `${path}.${k}` : k;
              walkAndCollectRefs(v, nextPath);
            }
            return;
          }
          if (Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
              const nextPath = path ? `${path}[${i}]` : `[${i}]`;
              walkAndCollectRefs(node[i], nextPath);
            }
          }
        };
        walkAndCollectRefs(content, "");
        return refs;
      }
      isJsonSchemaUrl(s) {
        return (s.startsWith("http://") || s.startsWith("https://")) && s.includes("json-schema.org");
      }
      checkCompatibility(oldSchemaId, newSchemaId, _mode) {
        const oldEntity = this.get(oldSchemaId);
        const newEntity = this.get(newSchemaId);
        if (!oldEntity || !newEntity) {
          return {
            from: oldSchemaId,
            to: newSchemaId,
            old: oldSchemaId,
            new: newSchemaId,
            direction: "unknown",
            added_properties: [],
            removed_properties: [],
            changed_properties: [],
            is_fully_compatible: false,
            is_backward_compatible: false,
            is_forward_compatible: false,
            incompatibility_reasons: [],
            backward_errors: ["Schema not found"],
            forward_errors: ["Schema not found"]
          };
        }
        const oldSchema = oldEntity.content;
        const newSchema = newEntity.content;
        if (!oldSchema || !newSchema) {
          return {
            from: oldSchemaId,
            to: newSchemaId,
            old: oldSchemaId,
            new: newSchemaId,
            direction: "unknown",
            added_properties: [],
            removed_properties: [],
            changed_properties: [],
            is_fully_compatible: false,
            is_backward_compatible: false,
            is_forward_compatible: false,
            incompatibility_reasons: [],
            backward_errors: ["Invalid schema content"],
            forward_errors: ["Invalid schema content"]
          };
        }
        const { isBackward, backwardErrors } = this.checkBackwardCompatibility(oldSchema, newSchema);
        const { isForward, forwardErrors } = this.checkForwardCompatibility(oldSchema, newSchema);
        const direction = this.inferDirection(oldSchemaId, newSchemaId);
        return {
          from: oldSchemaId,
          to: newSchemaId,
          old: oldSchemaId,
          new: newSchemaId,
          direction,
          added_properties: [],
          removed_properties: [],
          changed_properties: [],
          is_fully_compatible: isBackward && isForward,
          is_backward_compatible: isBackward,
          is_forward_compatible: isForward,
          incompatibility_reasons: [],
          backward_errors: backwardErrors,
          forward_errors: forwardErrors
        };
      }
      inferDirection(fromId, toId) {
        try {
          const fromGtsId = gts_1.Gts.parseGtsID(fromId);
          const toGtsId = gts_1.Gts.parseGtsID(toId);
          if (!fromGtsId.segments.length || !toGtsId.segments.length) {
            return "unknown";
          }
          const fromSeg = fromGtsId.segments[fromGtsId.segments.length - 1];
          const toSeg = toGtsId.segments[toGtsId.segments.length - 1];
          if (fromSeg.verMinor !== void 0 && toSeg.verMinor !== void 0) {
            if (toSeg.verMinor > fromSeg.verMinor) {
              return "up";
            }
            if (toSeg.verMinor < fromSeg.verMinor) {
              return "down";
            }
            return "none";
          }
          return "unknown";
        } catch {
          return "unknown";
        }
      }
      checkBackwardCompatibility(oldSchema, newSchema) {
        return this.checkSchemaCompatibility(oldSchema, newSchema, true);
      }
      checkForwardCompatibility(oldSchema, newSchema) {
        return this.checkSchemaCompatibility(oldSchema, newSchema, false);
      }
      checkSchemaCompatibility(oldSchema, newSchema, checkBackward) {
        const errors = [];
        const oldFlat = this.flattenSchema(oldSchema);
        const newFlat = this.flattenSchema(newSchema);
        const oldProps = oldFlat.properties || {};
        const newProps = newFlat.properties || {};
        const oldRequired = new Set(oldFlat.required || []);
        const newRequired = new Set(newFlat.required || []);
        if (checkBackward) {
          const newlyRequired = Array.from(newRequired).filter((p) => !oldRequired.has(p));
          if (newlyRequired.length > 0) {
            errors.push(`Added required properties: ${newlyRequired.join(", ")}`);
          }
        } else {
          const removedRequired = Array.from(oldRequired).filter((p) => !newRequired.has(p));
          if (removedRequired.length > 0) {
            errors.push(`Removed required properties: ${removedRequired.join(", ")}`);
          }
        }
        const commonProps = Object.keys(oldProps).filter((k) => k in newProps);
        for (const prop of commonProps) {
          const oldPropSchema = oldProps[prop] || {};
          const newPropSchema = newProps[prop] || {};
          const oldType = oldPropSchema.type;
          const newType = newPropSchema.type;
          if (oldType && newType && oldType !== newType) {
            errors.push(`Property '${prop}' type changed from ${oldType} to ${newType}`);
          }
          const oldEnum = oldPropSchema.enum || [];
          const newEnum = newPropSchema.enum || [];
          if (oldEnum.length > 0 && newEnum.length > 0) {
            const oldEnumSet = new Set(oldEnum);
            const newEnumSet = new Set(newEnum);
            if (checkBackward) {
              const addedEnumValues = newEnum.filter((v) => !oldEnumSet.has(v));
              if (addedEnumValues.length > 0) {
                errors.push(`Property '${prop}' added enum values: ${addedEnumValues.join(", ")}`);
              }
            } else {
              const removedEnumValues = oldEnum.filter((v) => !newEnumSet.has(v));
              if (removedEnumValues.length > 0) {
                errors.push(`Property '${prop}' removed enum values: ${removedEnumValues.join(", ")}`);
              }
            }
          }
          errors.push(...this.checkConstraintCompatibility(prop, oldPropSchema, newPropSchema, checkBackward));
          if (oldType === "object" && newType === "object") {
            const nestedResult = this.checkSchemaCompatibility(oldPropSchema, newPropSchema, checkBackward);
            const nestedErrors = checkBackward ? nestedResult.backwardErrors : nestedResult.forwardErrors;
            if (nestedErrors) {
              errors.push(...nestedErrors.map((e) => `Property '${prop}': ${e}`));
            }
          }
          if (oldType === "array" && newType === "array" && oldPropSchema.items && newPropSchema.items) {
            const itemsResult = this.checkSchemaCompatibility(oldPropSchema.items, newPropSchema.items, checkBackward);
            const itemsErrors = checkBackward ? itemsResult.backwardErrors : itemsResult.forwardErrors;
            if (itemsErrors) {
              errors.push(...itemsErrors.map((e) => `Property '${prop}' array items: ${e}`));
            }
          }
        }
        if (checkBackward) {
          return { isBackward: errors.length === 0, backwardErrors: errors };
        } else {
          return { isForward: errors.length === 0, forwardErrors: errors };
        }
      }
      checkConstraintCompatibility(prop, oldPropSchema, newPropSchema, checkTightening) {
        const errors = [];
        const propType = oldPropSchema.type;
        if (propType === "number" || propType === "integer") {
          errors.push(...this.checkMinMaxConstraint(prop, oldPropSchema, newPropSchema, "minimum", "maximum", checkTightening));
        }
        if (propType === "string") {
          errors.push(...this.checkMinMaxConstraint(prop, oldPropSchema, newPropSchema, "minLength", "maxLength", checkTightening));
        }
        if (propType === "array") {
          errors.push(...this.checkMinMaxConstraint(prop, oldPropSchema, newPropSchema, "minItems", "maxItems", checkTightening));
        }
        return errors;
      }
      checkMinMaxConstraint(prop, oldSchema, newSchema, minKey, maxKey, checkTightening) {
        const errors = [];
        const oldMin = oldSchema[minKey];
        const newMin = newSchema[minKey];
        const oldMax = oldSchema[maxKey];
        const newMax = newSchema[maxKey];
        if (checkTightening) {
          if (oldMin !== void 0 && newMin !== void 0 && newMin > oldMin) {
            errors.push(`Property '${prop}' ${minKey} increased from ${oldMin} to ${newMin}`);
          } else if (oldMin === void 0 && newMin !== void 0) {
            errors.push(`Property '${prop}' added ${minKey} constraint: ${newMin}`);
          }
        } else {
          if (oldMin !== void 0 && newMin !== void 0 && newMin < oldMin) {
            errors.push(`Property '${prop}' ${minKey} decreased from ${oldMin} to ${newMin}`);
          } else if (oldMin !== void 0 && newMin === void 0) {
            errors.push(`Property '${prop}' removed ${minKey} constraint`);
          }
        }
        if (checkTightening) {
          if (oldMax !== void 0 && newMax !== void 0 && newMax < oldMax) {
            errors.push(`Property '${prop}' ${maxKey} decreased from ${oldMax} to ${newMax}`);
          } else if (oldMax === void 0 && newMax !== void 0) {
            errors.push(`Property '${prop}' added ${maxKey} constraint: ${newMax}`);
          }
        } else {
          if (oldMax !== void 0 && newMax !== void 0 && newMax > oldMax) {
            errors.push(`Property '${prop}' ${maxKey} increased from ${oldMax} to ${newMax}`);
          } else if (oldMax !== void 0 && newMax === void 0) {
            errors.push(`Property '${prop}' removed ${maxKey} constraint`);
          }
        }
        return errors;
      }
      flattenSchema(schema) {
        const result = {
          properties: {},
          required: []
        };
        if (schema.allOf && Array.isArray(schema.allOf)) {
          for (const subSchema of schema.allOf) {
            const flattened = this.flattenSchema(subSchema);
            Object.assign(result.properties, flattened.properties || {});
            if (flattened.required && Array.isArray(flattened.required)) {
              result.required.push(...flattened.required);
            }
            if (flattened.additionalProperties !== void 0) {
              result.additionalProperties = flattened.additionalProperties;
            }
          }
        }
        if (schema.properties) {
          Object.assign(result.properties, schema.properties);
        }
        if (schema.required && Array.isArray(schema.required)) {
          result.required.push(...schema.required);
        }
        if (schema.additionalProperties !== void 0) {
          result.additionalProperties = schema.additionalProperties;
        }
        return result;
      }
      castInstance(instanceId, toSchemaId) {
        try {
          const instanceEntity = this.get(instanceId);
          if (!instanceEntity) {
            return {
              instance_id: instanceId,
              to_schema_id: toSchemaId,
              ok: false,
              error: `Entity not found: ${instanceId}`
            };
          }
          const toSchema = this.get(toSchemaId);
          if (!toSchema) {
            return {
              instance_id: instanceId,
              to_schema_id: toSchemaId,
              ok: false,
              error: `Schema not found: ${toSchemaId}`
            };
          }
          let fromSchemaId;
          let fromSchema;
          if (instanceEntity.isSchema) {
            return {
              instance_id: instanceId,
              to_schema_id: toSchemaId,
              ok: false,
              error: "Source must be an instance, not a schema"
            };
          } else {
            fromSchemaId = instanceEntity.schemaId;
            if (!fromSchemaId) {
              return {
                instance_id: instanceId,
                to_schema_id: toSchemaId,
                ok: false,
                error: `Schema not found for instance: ${instanceId}`
              };
            }
            if (fromSchemaId.startsWith("http://") || fromSchemaId.startsWith("https://")) {
              return {
                instance_id: instanceId,
                to_schema_id: toSchemaId,
                ok: false,
                error: `Cannot cast instance with schema ${fromSchemaId}`
              };
            }
            fromSchema = this.get(fromSchemaId);
            if (!fromSchema) {
              return {
                instance_id: instanceId,
                to_schema_id: toSchemaId,
                ok: false,
                error: `Schema not found: ${fromSchemaId}`
              };
            }
          }
          const instanceContent = instanceEntity.content;
          const fromSchemaContent = fromSchema.content;
          const toSchemaContent = toSchema.content;
          return this.performCast(instanceId, toSchemaId, instanceContent, fromSchemaContent, toSchemaContent);
        } catch (error) {
          return {
            instance_id: instanceId,
            to_schema_id: toSchemaId,
            ok: false,
            error: error instanceof Error ? error.message : String(error)
          };
        }
      }
      performCast(fromInstanceId, toSchemaId, fromInstanceContent, fromSchemaContent, toSchemaContent) {
        const targetSchema = this.flattenSchema(toSchemaContent);
        const direction = this.inferDirection(fromInstanceId, toSchemaId);
        let oldSchema;
        let newSchema;
        switch (direction) {
          case "up":
            oldSchema = fromSchemaContent;
            newSchema = toSchemaContent;
            break;
          case "down":
            oldSchema = toSchemaContent;
            newSchema = fromSchemaContent;
            break;
          default:
            oldSchema = fromSchemaContent;
            newSchema = toSchemaContent;
            break;
        }
        const { isBackward, backwardErrors } = this.checkBackwardCompatibility(oldSchema, newSchema);
        const { isForward, forwardErrors } = this.checkForwardCompatibility(oldSchema, newSchema);
        const { casted, added, removed, incompatibilityReasons } = this.castInstanceToSchema(this.deepCopy(fromInstanceContent), targetSchema, "");
        let isFullyCompatible = false;
        if (casted) {
          try {
            const modifiedSchema = this.removeGtsConstConstraints(toSchemaContent);
            const validate = this.ajv.compile(this.normalizeSchema(modifiedSchema));
            const isValid = validate(casted);
            if (!isValid) {
              const errors = validate.errors?.map((e) => `${e.instancePath} ${e.message}`).join("; ") || "Validation failed";
              incompatibilityReasons.push(errors);
            } else {
              isFullyCompatible = true;
            }
          } catch (err) {
            incompatibilityReasons.push(err instanceof Error ? err.message : String(err));
          }
        }
        return {
          from: fromInstanceId,
          to: toSchemaId,
          old: fromInstanceId,
          new: toSchemaId,
          direction,
          added_properties: this.deduplicate(added),
          removed_properties: this.deduplicate(removed),
          changed_properties: [],
          is_fully_compatible: isFullyCompatible,
          is_backward_compatible: isBackward,
          is_forward_compatible: isForward,
          incompatibility_reasons: incompatibilityReasons,
          backward_errors: backwardErrors,
          forward_errors: forwardErrors,
          casted_entity: casted,
          instance_id: fromInstanceId,
          to_schema_id: toSchemaId,
          ok: isFullyCompatible,
          error: isFullyCompatible ? "" : incompatibilityReasons.join("; ")
        };
      }
      castInstanceToSchema(instance, schema, basePath) {
        const added = [];
        const removed = [];
        const incompatibilityReasons = [];
        if (!instance || typeof instance !== "object" || Array.isArray(instance)) {
          incompatibilityReasons.push("Instance must be an object for casting");
          return { casted: null, added, removed, incompatibilityReasons };
        }
        const targetProps = schema.properties || {};
        const required = new Set(schema.required || []);
        const additional = schema.additionalProperties !== false;
        const result = this.deepCopy(instance);
        for (const reqProp of Array.from(required)) {
          if (!(reqProp in result)) {
            const propSchema = targetProps[reqProp];
            if (propSchema && propSchema.default !== void 0) {
              result[reqProp] = this.deepCopy(propSchema.default);
              const path = this.buildPath(basePath, reqProp);
              added.push(path);
            } else {
              const path = this.buildPath(basePath, reqProp);
              incompatibilityReasons.push(`Missing required property '${path}' and no default is defined`);
            }
          }
        }
        for (const [prop, propSchema] of Object.entries(targetProps)) {
          if (required.has(prop)) {
            continue;
          }
          if (!(prop in result)) {
            const ps = propSchema;
            if (ps.default !== void 0) {
              result[prop] = this.deepCopy(ps.default);
              const path = this.buildPath(basePath, prop);
              added.push(path);
            }
          }
        }
        for (const [prop, propSchema] of Object.entries(targetProps)) {
          const ps = propSchema;
          if (ps.const !== void 0) {
            const constVal = ps.const;
            const existingVal = result[prop];
            if (typeof constVal === "string" && typeof existingVal === "string") {
              if (gts_1.Gts.isValidGtsID(constVal) && gts_1.Gts.isValidGtsID(existingVal)) {
                if (existingVal !== constVal) {
                  result[prop] = constVal;
                }
              }
            }
          }
        }
        if (!additional) {
          for (const prop of Object.keys(result)) {
            if (!(prop in targetProps)) {
              delete result[prop];
              const path = this.buildPath(basePath, prop);
              removed.push(path);
            }
          }
        }
        for (const [prop, propSchema] of Object.entries(targetProps)) {
          const val = result[prop];
          if (val === void 0) {
            continue;
          }
          const ps = propSchema;
          const propType = ps.type;
          if (propType === "object") {
            if (val && typeof val === "object" && !Array.isArray(val)) {
              const nestedSchema = this.effectiveObjectSchema(ps);
              const nestedResult = this.castInstanceToSchema(val, nestedSchema, this.buildPath(basePath, prop));
              result[prop] = nestedResult.casted;
              added.push(...nestedResult.added);
              removed.push(...nestedResult.removed);
              incompatibilityReasons.push(...nestedResult.incompatibilityReasons);
            }
          }
          if (propType === "array") {
            if (Array.isArray(val)) {
              const itemsSchema = ps.items;
              if (itemsSchema && itemsSchema.type === "object") {
                const nestedSchema = this.effectiveObjectSchema(itemsSchema);
                const newList = [];
                for (let idx = 0; idx < val.length; idx++) {
                  const item = val[idx];
                  if (item && typeof item === "object" && !Array.isArray(item)) {
                    const nestedResult = this.castInstanceToSchema(item, nestedSchema, this.buildPath(basePath, `${prop}[${idx}]`));
                    newList.push(nestedResult.casted);
                    added.push(...nestedResult.added);
                    removed.push(...nestedResult.removed);
                    incompatibilityReasons.push(...nestedResult.incompatibilityReasons);
                  } else {
                    newList.push(item);
                  }
                }
                result[prop] = newList;
              }
            }
          }
        }
        return { casted: result, added, removed, incompatibilityReasons };
      }
      effectiveObjectSchema(schema) {
        if (!schema) {
          return {};
        }
        if (schema.properties || schema.required) {
          return schema;
        }
        if (schema.allOf && Array.isArray(schema.allOf)) {
          for (const part of schema.allOf) {
            if (part.properties || part.required) {
              return part;
            }
          }
        }
        return schema;
      }
      removeGtsConstConstraints(schema) {
        if (schema === null || schema === void 0) {
          return schema;
        }
        if (typeof schema === "object" && !Array.isArray(schema)) {
          const result = {};
          for (const [key, value] of Object.entries(schema)) {
            if (key === "const") {
              if (typeof value === "string" && gts_1.Gts.isValidGtsID(value)) {
                result.type = "string";
                continue;
              }
            }
            result[key] = this.removeGtsConstConstraints(value);
          }
          return result;
        }
        if (Array.isArray(schema)) {
          return schema.map((item) => this.removeGtsConstConstraints(item));
        }
        return schema;
      }
      buildPath(base, prop) {
        if (!base) {
          return prop;
        }
        if (prop.startsWith("[")) {
          return base + prop;
        }
        return base + "." + prop;
      }
      deepCopy(obj) {
        if (obj === null || obj === void 0) {
          return obj;
        }
        if (typeof obj !== "object") {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map((item) => this.deepCopy(item));
        }
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = this.deepCopy(value);
        }
        return result;
      }
      deduplicate(arr) {
        const unique = Array.from(new Set(arr));
        return unique.sort();
      }
      validateSchemaAgainstParent(schemaId) {
        const entity = this.get(schemaId);
        if (!entity) {
          return { id: schemaId, ok: false, error: `Entity not found: ${schemaId}` };
        }
        if (!entity.isSchema) {
          return { id: schemaId, ok: false, error: `Entity is not a schema: ${schemaId}` };
        }
        const content = entity.content;
        const parentRef = this.findParentRef(content);
        if (!parentRef) {
          return this.validateSchemaTraits(schemaId);
        }
        const parentId = parentRef.startsWith(types_1.GTS_URI_PREFIX) ? parentRef.substring(types_1.GTS_URI_PREFIX.length) : parentRef;
        const parentEntity = this.get(parentId);
        if (!parentEntity) {
          return { id: schemaId, ok: false, error: `Parent schema not found: ${parentId}` };
        }
        if (!parentEntity.isSchema || !parentEntity.content) {
          return { id: schemaId, ok: false, error: `Parent entity is not a schema: ${parentId}` };
        }
        const cycleError = this.detectRefCycle(schemaId, content, /* @__PURE__ */ new Set([schemaId]));
        if (cycleError) {
          return { id: schemaId, ok: false, error: cycleError };
        }
        const resolvedParent = this.resolveSchemaFully(parentEntity.content);
        const overlay = this.extractOverlay(content);
        const errors = this.compareOverlayToBase(overlay, resolvedParent, "");
        if (errors.length > 0) {
          return { id: schemaId, ok: false, error: errors.join("; ") };
        }
        const traitsResult = this.validateSchemaTraits(schemaId);
        if (!traitsResult.ok) {
          return traitsResult;
        }
        return { id: schemaId, ok: true, error: "" };
      }
      // OP#13: Validate schema traits across the inheritance chain
      validateSchemaTraits(schemaId) {
        const chain = this.buildSchemaChain(schemaId);
        const traitSchemas = [];
        const mergedTraits = {};
        const lockedTraits = /* @__PURE__ */ new Set();
        const knownDefaults = /* @__PURE__ */ new Map();
        for (const chainSchemaId of chain) {
          const entity = this.get(chainSchemaId);
          if (!entity || !entity.content)
            continue;
          const prevSchemaCount = traitSchemas.length;
          this.collectTraitSchemas(entity.content, traitSchemas);
          const levelSchemaProps = /* @__PURE__ */ new Set();
          for (const ts of traitSchemas.slice(prevSchemaCount)) {
            if (typeof ts === "object" && ts !== null && typeof ts.properties === "object" && ts.properties !== null) {
              for (const [propName, propSchema] of Object.entries(ts.properties)) {
                levelSchemaProps.add(propName);
                if (typeof propSchema === "object" && propSchema !== null && "default" in propSchema) {
                  const newDefault = propSchema.default;
                  if (knownDefaults.has(propName)) {
                    const oldDefault = knownDefaults.get(propName);
                    if (JSON.stringify(oldDefault) !== JSON.stringify(newDefault)) {
                      return {
                        id: schemaId,
                        ok: false,
                        error: `trait schema default for '${propName}' in '${chainSchemaId}' overrides default set by ancestor`
                      };
                    }
                  } else {
                    knownDefaults.set(propName, newDefault);
                  }
                }
              }
            }
          }
          const levelTraits = {};
          this.collectTraitValues(entity.content, levelTraits);
          for (const [k, v] of Object.entries(levelTraits)) {
            if (k in mergedTraits && JSON.stringify(mergedTraits[k]) !== JSON.stringify(v) && lockedTraits.has(k)) {
              return {
                id: schemaId,
                ok: false,
                error: `trait '${k}' in '${chainSchemaId}' overrides value set by ancestor`
              };
            }
          }
          for (const k of Object.keys(levelTraits)) {
            if (levelSchemaProps.has(k)) {
              lockedTraits.delete(k);
            } else {
              lockedTraits.add(k);
            }
          }
          Object.assign(mergedTraits, levelTraits);
        }
        if (traitSchemas.length === 0) {
          if (Object.keys(mergedTraits).length > 0) {
            return {
              id: schemaId,
              ok: false,
              error: "x-gts-traits values provided but no x-gts-traits-schema is defined in the inheritance chain"
            };
          }
          return { id: schemaId, ok: true, error: "" };
        }
        for (let i = 0; i < traitSchemas.length; i++) {
          const ts = traitSchemas[i];
          if (typeof ts === "object" && ts !== null && ts.type && ts.type !== "object") {
            return {
              id: schemaId,
              ok: false,
              error: `x-gts-traits-schema must have type "object", got "${ts.type}"`
            };
          }
          if (typeof ts === "object" && ts !== null && ts["x-gts-traits"]) {
            return {
              id: schemaId,
              ok: false,
              error: "x-gts-traits-schema must not contain x-gts-traits"
            };
          }
        }
        const resolvedTraitSchemas = [];
        for (const ts of traitSchemas) {
          try {
            const resolved = this.resolveTraitSchemaRefs(ts, /* @__PURE__ */ new Set());
            resolvedTraitSchemas.push(resolved);
          } catch (e) {
            return {
              id: schemaId,
              ok: false,
              error: e instanceof Error ? e.message : String(e)
            };
          }
        }
        let effectiveSchema;
        if (resolvedTraitSchemas.length === 1) {
          effectiveSchema = resolvedTraitSchemas[0];
        } else {
          effectiveSchema = {
            type: "object",
            allOf: resolvedTraitSchemas
          };
        }
        const effectiveTraits = this.applyTraitDefaults(effectiveSchema, mergedTraits);
        try {
          const normalizedSchema = this.normalizeSchema(effectiveSchema);
          const validate = this.ajv.compile(normalizedSchema);
          const isValid = validate(effectiveTraits);
          if (!isValid) {
            const errors = validate.errors?.map((e) => `${e.instancePath} ${e.message}`).join("; ") || "Trait validation failed";
            return { id: schemaId, ok: false, error: `trait validation: ${errors}` };
          }
        } catch (e) {
          return {
            id: schemaId,
            ok: false,
            error: `failed to compile trait schema: ${e instanceof Error ? e.message : String(e)}`
          };
        }
        const allProps = this.collectAllTraitProperties(effectiveSchema);
        for (const [propName, propSchema] of Object.entries(allProps)) {
          const hasValue = propName in effectiveTraits;
          const hasDefault = typeof propSchema === "object" && propSchema !== null && "default" in propSchema;
          if (!hasValue && !hasDefault) {
            return {
              id: schemaId,
              ok: false,
              error: `trait property '${propName}' is not resolved: no value provided and no default defined`
            };
          }
        }
        return { id: schemaId, ok: true, error: "" };
      }
      // OP#13: Entity-level traits validation
      validateEntityTraits(entityId) {
        const entity = this.get(entityId);
        if (!entity) {
          return { id: entityId, ok: false, error: `Entity not found: ${entityId}` };
        }
        if (!entity.isSchema) {
          return { id: entityId, ok: true, error: "" };
        }
        const chain = this.buildSchemaChain(entityId);
        const traitSchemas = [];
        let hasTraitValues = false;
        for (const chainSchemaId of chain) {
          const chainEntity = this.get(chainSchemaId);
          if (!chainEntity || !chainEntity.content)
            continue;
          this.collectTraitSchemas(chainEntity.content, traitSchemas);
          const levelTraits = {};
          this.collectTraitValues(chainEntity.content, levelTraits);
          if (Object.keys(levelTraits).length > 0) {
            hasTraitValues = true;
          }
        }
        if (traitSchemas.length === 0) {
          return { id: entityId, ok: true, error: "" };
        }
        if (!hasTraitValues) {
          return {
            id: entityId,
            ok: false,
            error: "Entity defines x-gts-traits-schema but no x-gts-traits values are provided"
          };
        }
        for (const ts of traitSchemas) {
          if (typeof ts === "object" && ts !== null) {
            if (ts.additionalProperties !== false) {
              return {
                id: entityId,
                ok: false,
                error: "Trait schema must set additionalProperties: false for entity validation"
              };
            }
          }
        }
        return { id: entityId, ok: true, error: "" };
      }
      // Build the schema chain from base to leaf for a given schema ID
      buildSchemaChain(schemaId) {
        try {
          const gtsId = gts_1.Gts.parseGtsID(schemaId);
          const segments = gtsId.segments;
          const chain = [];
          for (let i = 0; i < segments.length; i++) {
            const id = "gts." + segments.slice(0, i + 1).map((s) => s.segment).join("");
            chain.push(id);
          }
          return chain;
        } catch {
          return [schemaId];
        }
      }
      // Collect x-gts-traits-schema from a schema content (recursing into allOf)
      collectTraitSchemas(content, out, depth = 0) {
        if (depth > 64 || typeof content !== "object" || content === null)
          return;
        if (content["x-gts-traits-schema"] !== void 0) {
          out.push(content["x-gts-traits-schema"]);
        }
        if (Array.isArray(content.allOf)) {
          for (const item of content.allOf) {
            this.collectTraitSchemas(item, out, depth + 1);
          }
        }
      }
      // Collect x-gts-traits from a schema content (recursing into allOf)
      collectTraitValues(content, merged, depth = 0) {
        if (depth > 64 || typeof content !== "object" || content === null)
          return;
        if (typeof content["x-gts-traits"] === "object" && content["x-gts-traits"] !== null) {
          Object.assign(merged, content["x-gts-traits"]);
        }
        if (Array.isArray(content.allOf)) {
          for (const item of content.allOf) {
            this.collectTraitValues(item, merged, depth + 1);
          }
        }
      }
      // Resolve $ref inside a trait schema, detecting cycles
      resolveTraitSchemaRefs(schema, visited, depth = 0) {
        if (depth > 64)
          return schema;
        if (typeof schema !== "object" || schema === null)
          return schema;
        const result = {};
        for (const [key, value] of Object.entries(schema)) {
          if (key === "$$ref" || key === "$ref") {
            const refUri = value;
            const refId = refUri.startsWith(types_1.GTS_URI_PREFIX) ? refUri.substring(types_1.GTS_URI_PREFIX.length) : refUri;
            if (visited.has(refId)) {
              throw new Error(`Cyclic reference detected in trait schema: ${refId}`);
            }
            visited.add(refId);
            const refEntity = this.get(refId);
            if (!refEntity || !refEntity.content) {
              throw new Error(`Unresolvable trait schema reference: ${refUri}`);
            }
            const resolved = this.resolveTraitSchemaRefs(refEntity.content, visited, depth + 1);
            for (const [rk, rv] of Object.entries(resolved)) {
              if (rk !== "$id" && rk !== "$$id" && rk !== "$schema" && rk !== "$$schema") {
                result[rk] = rv;
              }
            }
            continue;
          }
          if (key === "allOf" && Array.isArray(value)) {
            result.allOf = value.map((item) => this.resolveTraitSchemaRefs(item, visited, depth + 1));
          } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            result[key] = this.resolveTraitSchemaRefs(value, new Set(visited), depth + 1);
          } else {
            result[key] = value;
          }
        }
        return result;
      }
      // Apply defaults from trait schema to trait values
      applyTraitDefaults(schema, traits) {
        const result = { ...traits };
        const props = this.collectAllTraitProperties(schema);
        for (const [propName, propSchema] of Object.entries(props)) {
          if (!(propName in result) && typeof propSchema === "object" && propSchema !== null && "default" in propSchema) {
            result[propName] = propSchema.default;
          }
        }
        return result;
      }
      // Collect all properties from a trait schema (handling allOf composition)
      collectAllTraitProperties(schema, depth = 0) {
        const props = {};
        if (depth > 64 || typeof schema !== "object" || schema === null)
          return props;
        if (typeof schema.properties === "object" && schema.properties !== null) {
          Object.assign(props, schema.properties);
        }
        if (Array.isArray(schema.allOf)) {
          for (const item of schema.allOf) {
            Object.assign(props, this.collectAllTraitProperties(item, depth + 1));
          }
        }
        return props;
      }
      // Detect cyclic $$ref/$ref references reachable from a schema's content
      detectRefCycle(originId, content, visited, depth = 0) {
        if (depth > 64 || !content || typeof content !== "object")
          return null;
        const ref = content["$$ref"] || content["$ref"];
        if (typeof ref === "string") {
          const refId = ref.startsWith(types_1.GTS_URI_PREFIX) ? ref.substring(types_1.GTS_URI_PREFIX.length) : ref;
          if (visited.has(refId)) {
            return `Cyclic reference detected: ${refId}`;
          }
          const refEntity = this.get(refId);
          if (refEntity && refEntity.content) {
            visited.add(refId);
            const inner = this.detectRefCycle(originId, refEntity.content, visited, depth + 1);
            if (inner)
              return inner;
          }
        }
        if (Array.isArray(content.allOf)) {
          for (const sub of content.allOf) {
            const inner = this.detectRefCycle(originId, sub, visited, depth + 1);
            if (inner)
              return inner;
          }
        }
        return null;
      }
      findParentRef(schema) {
        if (!schema || !schema.allOf || !Array.isArray(schema.allOf)) {
          return null;
        }
        for (const sub of schema.allOf) {
          if (sub && typeof sub === "object") {
            const ref = sub["$$ref"] || sub["$ref"];
            if (typeof ref === "string") {
              return ref;
            }
          }
        }
        return null;
      }
      resolveSchemaFully(schema, visited = /* @__PURE__ */ new Set()) {
        const result = {
          properties: {},
          required: [],
          additionalProperties: void 0,
          type: schema.type
        };
        if (schema.allOf && Array.isArray(schema.allOf)) {
          for (const sub of schema.allOf) {
            const ref = sub["$$ref"] || sub["$ref"];
            if (typeof ref === "string") {
              const refId = ref.startsWith(types_1.GTS_URI_PREFIX) ? ref.substring(types_1.GTS_URI_PREFIX.length) : ref;
              if (visited.has(refId)) {
                continue;
              }
              visited.add(refId);
              const refEntity = this.get(refId);
              if (refEntity && refEntity.content) {
                const resolved = this.resolveSchemaFully(refEntity.content, visited);
                Object.assign(result.properties, resolved.properties);
                if (resolved.required) {
                  result.required.push(...resolved.required);
                }
                if (resolved.additionalProperties !== void 0) {
                  result.additionalProperties = resolved.additionalProperties;
                }
                if (resolved.type && !result.type) {
                  result.type = resolved.type;
                }
              }
            } else {
              const resolved = this.resolveSchemaFully(sub, visited);
              for (const [propName, propSchema] of Object.entries(resolved.properties || {})) {
                if (result.properties[propName]) {
                  result.properties[propName] = this.mergePropertySchemas(result.properties[propName], propSchema);
                } else {
                  result.properties[propName] = propSchema;
                }
              }
              if (resolved.required) {
                result.required.push(...resolved.required);
              }
              if (resolved.additionalProperties !== void 0) {
                result.additionalProperties = resolved.additionalProperties;
              }
            }
          }
        }
        if (schema.properties) {
          for (const [propName, propSchema] of Object.entries(schema.properties)) {
            if (result.properties[propName]) {
              result.properties[propName] = this.mergePropertySchemas(result.properties[propName], propSchema);
            } else {
              result.properties[propName] = propSchema;
            }
          }
        }
        if (schema.required && Array.isArray(schema.required)) {
          result.required.push(...schema.required);
        }
        if (schema.additionalProperties !== void 0) {
          result.additionalProperties = schema.additionalProperties;
        }
        result.required = Array.from(new Set(result.required));
        return result;
      }
      mergePropertySchemas(base, overlay) {
        if (base === false || overlay === false) {
          return false;
        }
        if (typeof base !== "object" || typeof overlay !== "object") {
          return overlay;
        }
        const merged = { ...base };
        for (const [key, val] of Object.entries(overlay)) {
          if (key === "properties" && merged.properties) {
            merged.properties = { ...merged.properties, ...val };
          } else if (key === "required" && merged.required) {
            const mergedReq = /* @__PURE__ */ new Set([...merged.required, ...val]);
            merged.required = Array.from(mergedReq);
          } else {
            merged[key] = val;
          }
        }
        return merged;
      }
      extractOverlay(schema) {
        const overlay = {
          properties: {},
          required: [],
          additionalProperties: void 0
        };
        if (schema.allOf && Array.isArray(schema.allOf)) {
          for (const sub of schema.allOf) {
            const ref = sub["$$ref"] || sub["$ref"];
            if (typeof ref === "string") {
              continue;
            }
            if (sub.properties) {
              for (const [propName, propSchema] of Object.entries(sub.properties)) {
                overlay.properties[propName] = overlay.properties[propName] ? this.mergePropertySchemas(overlay.properties[propName], propSchema) : propSchema;
              }
            }
            if (sub.required && Array.isArray(sub.required)) {
              overlay.required.push(...sub.required);
            }
            if (sub.additionalProperties !== void 0) {
              overlay.additionalProperties = sub.additionalProperties;
            }
          }
        }
        if (schema.properties) {
          for (const [propName, propSchema] of Object.entries(schema.properties)) {
            overlay.properties[propName] = overlay.properties[propName] ? this.mergePropertySchemas(overlay.properties[propName], propSchema) : propSchema;
          }
        }
        if (schema.required && Array.isArray(schema.required)) {
          overlay.required.push(...schema.required);
        }
        if (schema.additionalProperties !== void 0 && overlay.additionalProperties === void 0) {
          overlay.additionalProperties = schema.additionalProperties;
        }
        return overlay;
      }
      compareOverlayToBase(overlay, baseResolved, path) {
        const errors = [];
        const overlayProps = overlay.properties || {};
        const baseProps = baseResolved.properties || {};
        for (const [propName, propSchema] of Object.entries(overlayProps)) {
          const propPath = path ? `${path}.${propName}` : propName;
          if (propSchema === false) {
            if (baseProps[propName] !== void 0) {
              errors.push(`Property '${propPath}' is set to false but exists in base`);
            }
            continue;
          }
          const baseProp = baseProps[propName];
          if (baseProp === void 0 || baseProp === null) {
            if (baseResolved.additionalProperties === false) {
              errors.push(`Property '${propPath}' not in base and base has additionalProperties: false`);
            }
            continue;
          }
          if (baseProp === false) {
            errors.push(`Property '${propPath}' is forbidden in base`);
            continue;
          }
          if (typeof propSchema === "object" && propSchema !== null) {
            errors.push(...this.comparePropertyConstraints(propSchema, baseProp, propPath));
          }
        }
        if (baseResolved.additionalProperties === false) {
          if (overlay.additionalProperties === true) {
            errors.push("Cannot loosen additionalProperties from false to true");
          } else if (overlay.additionalProperties === void 0) {
            errors.push("Base has additionalProperties: false but derived does not restate it");
          }
        }
        return errors;
      }
      comparePropertyConstraints(derived, base, propPath) {
        const errors = [];
        if (typeof base !== "object" || base === null) {
          return errors;
        }
        const baseType = base.type;
        const derivedType = derived.type;
        if (baseType !== void 0 && derivedType !== void 0) {
          if (Array.isArray(derivedType)) {
            if (!Array.isArray(baseType)) {
              errors.push(`Property '${propPath}' widens type from '${baseType}' to array`);
              return errors;
            }
          }
          if (Array.isArray(baseType)) {
            if (!Array.isArray(derivedType)) {
              if (!baseType.includes(derivedType)) {
                errors.push(`Property '${propPath}' type '${derivedType}' not in base types [${baseType}]`);
                return errors;
              }
            }
          } else if (!Array.isArray(derivedType)) {
            if (baseType !== derivedType) {
              errors.push(`Property '${propPath}' type changed from '${baseType}' to '${derivedType}'`);
              return errors;
            }
          }
        }
        const CONSTRAINT_KEYWORDS = [
          "maxLength",
          "minLength",
          "maximum",
          "minimum",
          "maxItems",
          "minItems",
          "enum",
          "const",
          "pattern",
          "items"
        ];
        const baseConstraintKeys = new Set(CONSTRAINT_KEYWORDS.filter((kw) => base[kw] !== void 0));
        const derivedConstraintKeys = new Set(CONSTRAINT_KEYWORDS.filter((kw) => derived[kw] !== void 0));
        const hasNewConstraints = [...derivedConstraintKeys].some((kw) => !baseConstraintKeys.has(kw));
        for (const kw of ["maxLength", "maximum", "maxItems"]) {
          if (base[kw] !== void 0) {
            if (derived[kw] === void 0) {
              if (!hasNewConstraints) {
                errors.push(`Property '${propPath}' drops constraint '${kw}'`);
              }
            } else if (derived[kw] > base[kw]) {
              errors.push(`Property '${propPath}' loosens '${kw}' from ${base[kw]} to ${derived[kw]}`);
            }
          }
        }
        for (const kw of ["minLength", "minimum", "minItems"]) {
          if (base[kw] !== void 0) {
            if (derived[kw] === void 0) {
              if (!hasNewConstraints) {
                errors.push(`Property '${propPath}' drops constraint '${kw}'`);
              }
            } else if (derived[kw] < base[kw]) {
              errors.push(`Property '${propPath}' loosens '${kw}' from ${base[kw]} to ${derived[kw]}`);
            }
          }
        }
        if (base.enum !== void 0) {
          if (derived.enum === void 0) {
            if (!hasNewConstraints) {
              errors.push(`Property '${propPath}' drops constraint 'enum'`);
            }
          } else {
            const baseSet = new Set(base.enum.map((v) => JSON.stringify(v)));
            for (const val of derived.enum) {
              if (!baseSet.has(JSON.stringify(val))) {
                errors.push(`Property '${propPath}' enum value '${val}' not in base enum`);
              }
            }
          }
        }
        if (base.const !== void 0) {
          if (derived.const === void 0) {
            if (!hasNewConstraints) {
              errors.push(`Property '${propPath}' drops constraint 'const'`);
            }
          } else if (JSON.stringify(base.const) !== JSON.stringify(derived.const)) {
            errors.push(`Property '${propPath}' const conflict: ${JSON.stringify(derived.const)} vs base ${JSON.stringify(base.const)}`);
          }
        }
        if (derived.const !== void 0 && typeof derived.const === "number") {
          if (base.minimum !== void 0 && derived.const < base.minimum) {
            errors.push(`Property '${propPath}' const ${derived.const} violates base minimum ${base.minimum}`);
          }
          if (base.maximum !== void 0 && derived.const > base.maximum) {
            errors.push(`Property '${propPath}' const ${derived.const} violates base maximum ${base.maximum}`);
          }
        }
        if (base.pattern !== void 0) {
          if (derived.pattern === void 0) {
            if (!hasNewConstraints) {
              errors.push(`Property '${propPath}' drops constraint 'pattern'`);
            }
          } else if (base.pattern !== derived.pattern) {
            errors.push(`Property '${propPath}' pattern changed from '${base.pattern}' to '${derived.pattern}'`);
          }
        }
        if (base.items !== void 0) {
          if (derived.items === void 0) {
            if (!hasNewConstraints) {
              errors.push(`Property '${propPath}' drops constraint 'items'`);
            }
          } else if (typeof base.items === "object" && typeof derived.items === "object") {
            errors.push(...this.comparePropertyConstraints(derived.items, base.items, `${propPath}.items`));
          }
        }
        if (base.type === "object" && derived.type === "object") {
          if (base.properties || derived.properties) {
            const nestedOverlay = {
              properties: derived.properties || {},
              required: derived.required || [],
              additionalProperties: derived.additionalProperties
            };
            const nestedBase = {
              properties: base.properties || {},
              required: base.required || [],
              additionalProperties: base.additionalProperties
            };
            errors.push(...this.compareOverlayToBase(nestedOverlay, nestedBase, propPath));
          }
        }
        return errors;
      }
      getAttribute(gtsId, path) {
        const entity = this.get(gtsId);
        if (!entity) {
          return {
            gts_id: gtsId,
            path,
            resolved: false,
            error: `Entity not found: ${gtsId}`
          };
        }
        const value = this.getNestedValue(entity.content, path);
        return {
          gts_id: gtsId,
          path,
          resolved: value !== void 0,
          value
        };
      }
      getNestedValue(obj, path) {
        const parts = [];
        let current = "";
        let inBracket = false;
        for (let i = 0; i < path.length; i++) {
          const char = path[i];
          if (char === "[") {
            if (current) {
              parts.push(current);
              current = "";
            }
            inBracket = true;
          } else if (char === "]") {
            if (current) {
              parts.push(`[${current}]`);
              current = "";
            }
            inBracket = false;
          } else if (char === "." && !inBracket) {
            if (current) {
              parts.push(current);
              current = "";
            }
          } else {
            current += char;
          }
        }
        if (current) {
          parts.push(current);
        }
        let result = obj;
        for (const part of parts) {
          if (result === null || result === void 0) {
            return void 0;
          }
          if (part.startsWith("[") && part.endsWith("]")) {
            const index = parseInt(part.slice(1, -1), 10);
            if (Array.isArray(result) && !isNaN(index)) {
              result = result[index];
            } else {
              return void 0;
            }
          } else {
            if (typeof result === "object" && part in result) {
              result = result[part];
            } else {
              return void 0;
            }
          }
        }
        return result;
      }
    };
    exports.GtsStore = GtsStore2;
    function createJsonEntity2(content, _config) {
      const extractResult = extract_1.GtsExtractor.extractID(content);
      const references = /* @__PURE__ */ new Set();
      findReferences(content, references);
      return {
        id: extractResult.id,
        schemaId: extractResult.schema_id,
        content,
        isSchema: extractResult.is_schema,
        references
      };
    }
    function findReferences(obj, refs, visited = /* @__PURE__ */ new Set()) {
      if (!obj || typeof obj !== "object" || visited.has(obj)) {
        return;
      }
      visited.add(obj);
      if ("$ref" in obj && typeof obj["$ref"] === "string") {
        const ref = obj["$ref"];
        const normalized = ref.startsWith(types_1.GTS_URI_PREFIX) ? ref.substring(types_1.GTS_URI_PREFIX.length) : ref;
        if (gts_1.Gts.isValidGtsID(normalized)) {
          refs.add(normalized);
        }
      }
      if ("x-gts-ref" in obj && typeof obj["x-gts-ref"] === "string") {
        const ref = obj["x-gts-ref"];
        if (gts_1.Gts.isValidGtsID(ref)) {
          refs.add(ref);
        }
      }
      for (const value of Object.values(obj)) {
        findReferences(value, refs, visited);
      }
    }
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/relationships.js
var require_relationships = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/relationships.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GtsRelationships = void 0;
    var gts_1 = require_gts();
    var GtsRelationships = class {
      static resolveRelationships(store, gtsId) {
        try {
          const entity = store.get(gtsId);
          if (!entity) {
            return {
              id: gtsId,
              relationships: [],
              brokenReferences: [],
              error: `Entity not found: ${gtsId}`
            };
          }
          const relationships = /* @__PURE__ */ new Set();
          const brokenReferences = /* @__PURE__ */ new Set();
          const visited = /* @__PURE__ */ new Set();
          this.findRelationships(store, entity.content, relationships, brokenReferences, visited);
          if (entity.schemaId) {
            relationships.add(entity.schemaId);
            const schemaEntity = store.get(entity.schemaId);
            if (!schemaEntity) {
              brokenReferences.add(entity.schemaId);
            }
          }
          return {
            id: gtsId,
            relationships: Array.from(relationships).sort(),
            brokenReferences: Array.from(brokenReferences).sort()
          };
        } catch (error) {
          return {
            id: gtsId,
            relationships: [],
            brokenReferences: [],
            error: error instanceof Error ? error.message : String(error)
          };
        }
      }
      static findRelationships(store, obj, relationships, brokenReferences, visited) {
        if (!obj || typeof obj !== "object" || visited.has(obj)) {
          return;
        }
        visited.add(obj);
        if ("$ref" in obj && typeof obj["$ref"] === "string") {
          const ref = obj["$ref"];
          const normalized = ref.startsWith("gts://") ? ref.substring(6) : ref;
          if (gts_1.Gts.isValidGtsID(normalized)) {
            relationships.add(normalized);
            if (!store.get(normalized)) {
              brokenReferences.add(normalized);
            }
          }
        }
        if ("x-gts-ref" in obj && typeof obj["x-gts-ref"] === "string") {
          const ref = obj["x-gts-ref"];
          if (gts_1.Gts.isValidGtsID(ref)) {
            relationships.add(ref);
            if (!store.get(ref)) {
              brokenReferences.add(ref);
            }
          }
        }
        if (Array.isArray(obj)) {
          for (const item of obj) {
            this.findRelationships(store, item, relationships, brokenReferences, visited);
          }
        } else {
          for (const value of Object.values(obj)) {
            this.findRelationships(store, value, relationships, brokenReferences, visited);
          }
        }
      }
    };
    exports.GtsRelationships = GtsRelationships;
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/compatibility.js
var require_compatibility = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/compatibility.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GtsCompatibility = void 0;
    var gts_1 = require_gts();
    var GtsCompatibility = class {
      static checkCompatibility(store, oldId, newId, _mode = "full") {
        const backwardErrors = [];
        const forwardErrors = [];
        try {
          const oldGtsId = gts_1.Gts.parseGtsID(oldId);
          const newGtsId = gts_1.Gts.parseGtsID(newId);
          const oldEntity = store.get(oldGtsId.id);
          const newEntity = store.get(newGtsId.id);
          if (!oldEntity) {
            backwardErrors.push(`Old schema not found: ${oldId}`);
            return this.buildResult(oldId, newId, false, false, false, backwardErrors, forwardErrors);
          }
          if (!newEntity) {
            backwardErrors.push(`New schema not found: ${newId}`);
            return this.buildResult(oldId, newId, false, false, false, backwardErrors, forwardErrors);
          }
          if (!oldEntity.isSchema) {
            backwardErrors.push(`Old entity is not a schema: ${oldId}`);
            return this.buildResult(oldId, newId, false, false, false, backwardErrors, forwardErrors);
          }
          if (!newEntity.isSchema) {
            backwardErrors.push(`New entity is not a schema: ${newId}`);
            return this.buildResult(oldId, newId, false, false, false, backwardErrors, forwardErrors);
          }
          const oldSchema = oldEntity.content;
          const newSchema = newEntity.content;
          const isBackward = this.checkBackwardCompatibility(oldSchema, newSchema, backwardErrors);
          const isForward = this.checkForwardCompatibility(oldSchema, newSchema, forwardErrors);
          const isFullyCompatible = isBackward && isForward;
          return this.buildResult(oldId, newId, isFullyCompatible, isBackward, isForward, backwardErrors, forwardErrors);
        } catch (error) {
          backwardErrors.push(error instanceof Error ? error.message : String(error));
          return this.buildResult(oldId, newId, false, false, false, backwardErrors, forwardErrors);
        }
      }
      static buildResult(oldId, newId, isFullyCompatible, isBackward, isForward, backwardErrors, forwardErrors) {
        return {
          from: oldId,
          to: newId,
          old: oldId,
          new: newId,
          direction: this.inferDirection(oldId, newId),
          added_properties: [],
          removed_properties: [],
          changed_properties: [],
          is_fully_compatible: isFullyCompatible,
          is_backward_compatible: isBackward,
          is_forward_compatible: isForward,
          incompatibility_reasons: [...backwardErrors, ...forwardErrors],
          backward_errors: backwardErrors,
          forward_errors: forwardErrors
        };
      }
      static inferDirection(fromId, toId) {
        try {
          const fromGtsId = gts_1.Gts.parseGtsID(fromId);
          const toGtsId = gts_1.Gts.parseGtsID(toId);
          if (!fromGtsId.segments.length || !toGtsId.segments.length) {
            return "unknown";
          }
          const fromSeg = fromGtsId.segments[fromGtsId.segments.length - 1];
          const toSeg = toGtsId.segments[toGtsId.segments.length - 1];
          if (fromSeg.verMajor < toSeg.verMajor)
            return "upgrade";
          if (fromSeg.verMajor > toSeg.verMajor)
            return "downgrade";
          if ((fromSeg.verMinor || 0) < (toSeg.verMinor || 0))
            return "upgrade";
          if ((fromSeg.verMinor || 0) > (toSeg.verMinor || 0))
            return "downgrade";
          return "same";
        } catch {
          return "unknown";
        }
      }
      static checkBackwardCompatibility(oldSchema, newSchema, errors) {
        const oldProps = oldSchema.properties || {};
        const newProps = newSchema.properties || {};
        const oldRequired = new Set(oldSchema.required || []);
        let compatible = true;
        for (const propName of Object.keys(oldProps)) {
          if (!(propName in newProps)) {
            if (oldRequired.has(propName)) {
              errors.push(`Required property '${propName}' removed in new schema`);
              compatible = false;
            }
          } else {
            if (!this.checkPropertyCompatibility(propName, oldProps[propName], newProps[propName], errors, "backward")) {
              compatible = false;
            }
          }
        }
        return compatible;
      }
      static checkForwardCompatibility(oldSchema, newSchema, errors) {
        const oldProps = oldSchema.properties || {};
        const newProps = newSchema.properties || {};
        const newRequired = new Set(newSchema.required || []);
        let compatible = true;
        for (const propName of Object.keys(newProps)) {
          if (!(propName in oldProps)) {
            if (newRequired.has(propName)) {
              errors.push(`New required property '${propName}' added`);
              compatible = false;
            }
          } else {
            if (!this.checkPropertyCompatibility(propName, oldProps[propName], newProps[propName], errors, "forward")) {
              compatible = false;
            }
          }
        }
        return compatible;
      }
      static checkPropertyCompatibility(propName, oldProp, newProp, errors, direction) {
        const oldType = this.normalizeType(oldProp.type);
        const newType = this.normalizeType(newProp.type);
        if (oldType !== newType) {
          if (!this.areTypesCompatible(oldType, newType, direction)) {
            errors.push(`Property '${propName}' type incompatibly changed from ${oldType} to ${newType}`);
            return false;
          }
        }
        if (oldProp.enum && newProp.enum) {
          const oldEnum = new Set(oldProp.enum);
          const newEnum = new Set(newProp.enum);
          if (direction === "backward") {
            for (const value of oldEnum) {
              if (!newEnum.has(value)) {
                errors.push(`Enum value '${value}' removed from property '${propName}'`);
                return false;
              }
            }
          }
        }
        return true;
      }
      static normalizeType(type) {
        if (Array.isArray(type)) {
          return type.join("|");
        }
        return type || "any";
      }
      static areTypesCompatible(oldType, newType, direction) {
        if (oldType === newType)
          return true;
        if (direction === "backward") {
          if (newType === "any")
            return true;
          if (oldType === "integer" && newType === "number")
            return true;
        } else {
          if (oldType === "any")
            return true;
          if (newType === "integer" && oldType === "number")
            return true;
        }
        const oldTypes = new Set(oldType.split("|"));
        const newTypes = new Set(newType.split("|"));
        if (direction === "backward") {
          for (const t of oldTypes) {
            if (!newTypes.has(t))
              return false;
          }
        } else {
          for (const t of newTypes) {
            if (!oldTypes.has(t))
              return false;
          }
        }
        return true;
      }
    };
    exports.GtsCompatibility = GtsCompatibility;
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/cast.js
var require_cast = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/cast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GtsCast = void 0;
    var gts_1 = require_gts();
    var compatibility_1 = require_compatibility();
    var GtsCast = class {
      static castInstance(store, fromId, toSchemaId) {
        try {
          const fromGtsId = gts_1.Gts.parseGtsID(fromId);
          const fromEntity = store.get(fromGtsId.id);
          if (!fromEntity) {
            return {
              ok: false,
              fromId,
              toId: toSchemaId,
              error: `Instance not found: ${fromId}`
            };
          }
          if (!fromEntity.schemaId) {
            return {
              ok: false,
              fromId,
              toId: toSchemaId,
              error: `No schema found for instance: ${fromId}`
            };
          }
          const toGtsId = gts_1.Gts.parseGtsID(toSchemaId);
          const toSchema = store.get(toGtsId.id);
          if (!toSchema) {
            return {
              ok: false,
              fromId,
              toId: toSchemaId,
              error: `Target schema not found: ${toSchemaId}`
            };
          }
          if (!toSchema.isSchema) {
            return {
              ok: false,
              fromId,
              toId: toSchemaId,
              error: `Target is not a schema: ${toSchemaId}`
            };
          }
          const fromSchemaEntity = store.get(fromEntity.schemaId);
          if (!fromSchemaEntity) {
            return {
              ok: false,
              fromId,
              toId: toSchemaId,
              error: `Source schema not found: ${fromEntity.schemaId}`
            };
          }
          const compatCheck = compatibility_1.GtsCompatibility.checkCompatibility(store, fromEntity.schemaId, toSchemaId, "full");
          if (!compatCheck.is_fully_compatible) {
            return {
              ok: false,
              fromId,
              toId: toSchemaId,
              error: `Schemas are not compatible: ${compatCheck.incompatibility_reasons.join("; ")}`
            };
          }
          const castedInstance = this.performCast(fromEntity.content, fromSchemaEntity.content, toSchema.content, toSchemaId);
          return {
            ok: true,
            fromId,
            toId: toSchemaId,
            result: castedInstance
          };
        } catch (error) {
          return {
            ok: false,
            fromId,
            toId: toSchemaId,
            error: error instanceof Error ? error.message : String(error)
          };
        }
      }
      static performCast(instance, fromSchema, toSchema, toSchemaId) {
        const result = { ...instance };
        const fromSegments = gts_1.Gts.parseID(fromSchema["$$id"] || fromSchema["$id"]).segments;
        const toSegments = gts_1.Gts.parseID(toSchemaId).segments;
        if (fromSegments.length > 0 && toSegments.length > 0) {
          const fromVersion = `v${fromSegments[0].verMajor}.${fromSegments[0].verMinor ?? 0}`;
          const toVersion = `v${toSegments[0].verMajor}.${toSegments[0].verMinor ?? 0}`;
          if ("gtsId" in result) {
            result.gtsId = result.gtsId.replace(fromVersion, toVersion);
          }
        }
        if ("$schema" in result || "$$schema" in result) {
          result["$schema"] = toSchemaId;
          if ("$$schema" in result) {
            result["$$schema"] = toSchemaId;
          }
        }
        const toProps = toSchema.properties || {};
        const toRequired = new Set(toSchema.required || []);
        const filtered = {};
        for (const [key, value] of Object.entries(result)) {
          if (key in toProps || key === "gtsId" || key === "$schema" || key === "$$schema") {
            filtered[key] = value;
          }
        }
        for (const prop of toRequired) {
          if (!(prop in filtered)) {
            const propSchema = toProps[prop];
            if (propSchema) {
              filtered[prop] = this.getDefaultValue(propSchema);
            }
          }
        }
        for (const [propName, propSchema] of Object.entries(toProps)) {
          if (!(propName in filtered) && propSchema && typeof propSchema === "object" && "default" in propSchema) {
            filtered[propName] = propSchema.default;
          }
        }
        return filtered;
      }
      static getDefaultValue(schema) {
        if ("default" in schema) {
          return schema.default;
        }
        const type = schema.type;
        if (Array.isArray(type)) {
          if (type.includes("null")) {
            return null;
          }
          return this.getDefaultForType(type[0]);
        }
        return this.getDefaultForType(type);
      }
      static getDefaultForType(type) {
        switch (type) {
          case "string":
            return "";
          case "number":
          case "integer":
            return 0;
          case "boolean":
            return false;
          case "array":
            return [];
          case "object":
            return {};
          default:
            return null;
        }
      }
    };
    exports.GtsCast = GtsCast;
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/query.js
var require_query = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/query.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GtsQuery = void 0;
    var gts_1 = require_gts();
    var GtsQuery = class {
      static query(store, expression, limit = 100) {
        try {
          const { basePattern, filters, error } = this.parseQueryExpression(expression);
          if (error) {
            return {
              query: expression,
              count: 0,
              items: [],
              error,
              limit
            };
          }
          const results = [];
          for (const [id, entity] of store["byId"]) {
            if (results.length >= limit)
              break;
            if (!this.matchesIDPattern(id, basePattern)) {
              continue;
            }
            if (!this.matchesFilters(entity.content, filters)) {
              continue;
            }
            results.push(entity.content);
          }
          return {
            query: expression,
            count: results.length,
            items: results,
            limit
          };
        } catch (error) {
          return {
            query: expression,
            count: 0,
            items: [],
            error: error instanceof Error ? error.message : String(error),
            limit
          };
        }
      }
      static parseQueryExpression(expr) {
        const parts = expr.split("[");
        const basePattern = parts[0].trim();
        const filters = /* @__PURE__ */ new Map();
        if (parts.length > 1) {
          let filterStr = parts[1].trim();
          if (!filterStr.endsWith("]")) {
            return {
              basePattern,
              filters,
              error: "Invalid query: missing closing bracket ']'"
            };
          }
          filterStr = filterStr.slice(0, -1);
          if (basePattern.endsWith("~") || basePattern.endsWith("~*")) {
            return {
              basePattern,
              filters,
              error: "Invalid query: filters cannot be used with type patterns (ending with ~ or ~*)"
            };
          }
          const filterParts = filterStr.split(",");
          for (const part of filterParts) {
            const trimmed = part.trim();
            if (trimmed.includes("=")) {
              const [key, ...valueParts] = trimmed.split("=");
              const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
              filters.set(key.trim(), value);
            }
          }
        }
        const isWildcard = basePattern.includes("*");
        const validationError = this.validateQueryPattern(basePattern, isWildcard);
        if (validationError) {
          return {
            basePattern,
            filters,
            error: validationError
          };
        }
        return { basePattern, filters };
      }
      static validateQueryPattern(basePattern, isWildcard) {
        if (isWildcard) {
          if (!basePattern.endsWith(".*") && !basePattern.endsWith("~*")) {
            return "Invalid query: wildcard patterns must end with .* or ~*";
          }
          try {
            if (!basePattern.startsWith("gts.")) {
              return "Invalid query: pattern must start with 'gts.'";
            }
          } catch (err) {
            return `Invalid query: ${err}`;
          }
        } else {
          try {
            const result = gts_1.Gts.parseID(basePattern);
            if (!result.ok) {
              return `Invalid query: ${result.error}`;
            }
            const segments = result.segments || [];
            if (segments.length === 0) {
              return "Invalid query: GTS ID has no valid segments";
            }
            const lastSeg = segments[segments.length - 1];
            if (!lastSeg.isType && !lastSeg.verMajor) {
              return "Invalid query: incomplete GTS ID pattern";
            }
          } catch (err) {
            return `Invalid query: ${err}`;
          }
        }
        return void 0;
      }
      static matchesIDPattern(entityID, basePattern) {
        const matchResult = gts_1.Gts.matchIDPattern(entityID, basePattern);
        return matchResult.match;
      }
      static matchesFilters(entityContent, filters) {
        if (filters.size === 0) {
          return true;
        }
        if (!entityContent || typeof entityContent !== "object") {
          return false;
        }
        for (const [key, value] of filters) {
          const entityValue = String(entityContent[key] ?? "");
          if (value === "*") {
            if (!entityValue || entityValue === "null" || entityValue === "undefined") {
              return false;
            }
          } else if (entityValue !== value) {
            return false;
          }
        }
        return true;
      }
    };
    exports.GtsQuery = GtsQuery;
  }
});

// node_modules/@globaltypesystem/gts-ts/dist/index.js
var require_dist = __commonJS({
  "node_modules/@globaltypesystem/gts-ts/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GTS = exports.extractID = exports.idToUUID = exports.matchIDPattern = exports.parseGtsID = exports.validateGtsID = exports.isValidGtsID = exports.GtsQuery = exports.GtsCast = exports.GtsCompatibility = exports.GtsRelationships = exports.createJsonEntity = exports.GtsStore = exports.GtsExtractor = exports.Gts = void 0;
    __exportStar(require_types(), exports);
    var gts_1 = require_gts();
    Object.defineProperty(exports, "Gts", { enumerable: true, get: function() {
      return gts_1.Gts;
    } });
    var extract_1 = require_extract();
    Object.defineProperty(exports, "GtsExtractor", { enumerable: true, get: function() {
      return extract_1.GtsExtractor;
    } });
    var store_1 = require_store();
    Object.defineProperty(exports, "GtsStore", { enumerable: true, get: function() {
      return store_1.GtsStore;
    } });
    Object.defineProperty(exports, "createJsonEntity", { enumerable: true, get: function() {
      return store_1.createJsonEntity;
    } });
    var relationships_1 = require_relationships();
    Object.defineProperty(exports, "GtsRelationships", { enumerable: true, get: function() {
      return relationships_1.GtsRelationships;
    } });
    var compatibility_1 = require_compatibility();
    Object.defineProperty(exports, "GtsCompatibility", { enumerable: true, get: function() {
      return compatibility_1.GtsCompatibility;
    } });
    var cast_1 = require_cast();
    Object.defineProperty(exports, "GtsCast", { enumerable: true, get: function() {
      return cast_1.GtsCast;
    } });
    var query_1 = require_query();
    Object.defineProperty(exports, "GtsQuery", { enumerable: true, get: function() {
      return query_1.GtsQuery;
    } });
    var gts_2 = require_gts();
    var extract_2 = require_extract();
    var store_2 = require_store();
    var relationships_2 = require_relationships();
    var compatibility_2 = require_compatibility();
    var cast_2 = require_cast();
    var query_2 = require_query();
    var isValidGtsID = (id) => gts_2.Gts.isValidGtsID(id);
    exports.isValidGtsID = isValidGtsID;
    var validateGtsID = (id) => gts_2.Gts.validateGtsID(id);
    exports.validateGtsID = validateGtsID;
    var parseGtsID = (id) => gts_2.Gts.parseID(id);
    exports.parseGtsID = parseGtsID;
    var matchIDPattern = (candidate, pattern) => gts_2.Gts.matchIDPattern(candidate, pattern);
    exports.matchIDPattern = matchIDPattern;
    var idToUUID = (id) => gts_2.Gts.idToUUID(id);
    exports.idToUUID = idToUUID;
    var extractID = (content, schemaContent) => extract_2.GtsExtractor.extractID(content, schemaContent);
    exports.extractID = extractID;
    var GTS = class {
      constructor(config) {
        this.store = new store_2.GtsStore(config);
      }
      register(content) {
        const entity = (0, store_2.createJsonEntity)(content);
        this.store.register(entity);
      }
      get(id) {
        const entity = this.store.get(id);
        return entity?.content;
      }
      validateInstance(id) {
        return this.store.validateInstance(id);
      }
      getAttribute(path) {
        const atIndex = path.indexOf("@");
        if (atIndex === -1) {
          return {
            path,
            resolved: false,
            error: "Invalid attribute path: missing @"
          };
        }
        const gtsId = path.substring(0, atIndex);
        const attrPath = path.substring(atIndex + 1);
        return this.store.getAttribute(gtsId, attrPath);
      }
      query(expression, limit) {
        return query_2.GtsQuery.query(this.store, expression, limit);
      }
      resolveRelationships(id) {
        return relationships_2.GtsRelationships.resolveRelationships(this.store, id);
      }
      checkCompatibility(oldId, newId, mode = "full") {
        return compatibility_2.GtsCompatibility.checkCompatibility(this.store, oldId, newId, mode);
      }
      castInstance(fromId, toSchemaId) {
        return cast_2.GtsCast.castInstance(this.store, fromId, toSchemaId);
      }
      validateEntity(id) {
        const entity = this.store.get(id);
        if (!entity) {
          return { id, ok: false, error: `Entity not found: ${id}`, entity_type: "unknown" };
        }
        if (entity.isSchema) {
          const result = this.store.validateSchemaAgainstParent(id);
          if (!result.ok) {
            return { ...result, entity_type: "schema" };
          }
          const traitsResult = this.store.validateEntityTraits(id);
          if (!traitsResult.ok) {
            return { ...traitsResult, entity_type: "schema" };
          }
          return { ...result, entity_type: "schema" };
        } else {
          const result = this.store.validateInstance(id);
          return { ...result, entity_type: "instance" };
        }
      }
    };
    exports.GTS = GTS;
    exports.default = GTS;
  }
});

// node_modules/@gears-frontx/gts-plugin/dist/index.js
var import_gts_ts = __toESM(require_dist(), 1);
var FRONTX_ACTION_LOAD_EXT = "gts.frontx.mfes.comm.action.v1~frontx.mfes.ext.load_ext.v1~";
var FRONTX_ACTION_MOUNT_EXT = "gts.frontx.mfes.comm.action.v1~frontx.mfes.ext.mount_ext.v1~";
var FRONTX_ACTION_UNMOUNT_EXT = "gts.frontx.mfes.comm.action.v1~frontx.mfes.ext.unmount_ext.v1~";
var FRONTX_LIFECYCLE_STAGE_INIT = "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.init.v1";
var FRONTX_LIFECYCLE_STAGE_ACTIVATED = "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.activated.v1";
var FRONTX_LIFECYCLE_STAGE_DEACTIVATED = "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.deactivated.v1";
var FRONTX_LIFECYCLE_STAGE_DESTROYED = "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.destroyed.v1";
var entry_v1_default = {
  $id: "gts://gts.frontx.mfes.mfe.entry.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    id: {
      "x-gts-ref": "/$id"
    },
    requiredProperties: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.comm.shared_property.v1~*" },
      $comment: "SharedProperty type IDs REQUIRED by the MFE"
    },
    optionalProperties: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.comm.shared_property.v1~*" }
    },
    actions: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.comm.action.v1~*" },
      $comment: "Actions MFE can send to its domain"
    },
    domainActions: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.comm.action.v1~*" },
      $comment: "Actions MFE can receive"
    }
  },
  required: ["id", "requiredProperties", "actions", "domainActions"]
};
var domain_v1_default = {
  $id: "gts://gts.frontx.mfes.ext.domain.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    id: {
      "x-gts-ref": "/$id",
      $comment: "The GTS type ID for this instance"
    },
    sharedProperties: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.comm.shared_property.v1~*" }
    },
    actions: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.comm.action.v1~*" },
      $comment: "Action type IDs that can target extensions in this domain"
    },
    extensionsActions: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.comm.action.v1~*" },
      $comment: "Action type IDs extensions can send when targeting this domain"
    },
    extensionsTypeId: {
      type: "string",
      "x-gts-ref": "gts.frontx.mfes.ext.extension.v1~*",
      $comment: "Optional reference to a derived Extension type ID. If specified, extensions must use types that derive from this type."
    },
    defaultActionTimeout: {
      type: "number",
      minimum: 1,
      $comment: "Default timeout in milliseconds for actions targeting this domain. REQUIRED."
    },
    lifecycleStages: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.lifecycle.stage.v1~*" },
      $comment: "Lifecycle stage type IDs supported for the domain itself. Hooks referencing unsupported stages are rejected during validation."
    },
    extensionsLifecycleStages: {
      type: "array",
      items: { "x-gts-ref": "gts.frontx.mfes.lifecycle.stage.v1~*" },
      $comment: "Lifecycle stage type IDs supported for extensions in this domain. Extension hooks referencing unsupported stages are rejected during validation."
    },
    lifecycle: {
      type: "array",
      items: { type: "object", $ref: "gts://gts.frontx.mfes.lifecycle.hook.v1~" },
      $comment: "Optional lifecycle hooks - explicitly declared actions for each stage"
    },
    route: {
      type: "string",
      $comment: "Optional route name for this domain, registered once here instead of a host-side id-to-name table. Validated against the routing grammar's name alphabet at registration time by the mfes runtime, not by this schema."
    }
  },
  required: ["id", "sharedProperties", "actions", "extensionsActions", "defaultActionTimeout", "lifecycleStages", "extensionsLifecycleStages"]
};
var extension_v1_default = {
  $id: "gts://gts.frontx.mfes.ext.extension.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    id: {
      "x-gts-ref": "/$id",
      $comment: "The GTS type ID for this instance"
    },
    domain: {
      "x-gts-ref": "gts.frontx.mfes.ext.domain.v1~*",
      $comment: "ExtensionDomain type ID to mount into"
    },
    entry: {
      "x-gts-ref": "gts.frontx.mfes.mfe.entry.v1~*",
      $comment: "MfeEntry type ID to mount"
    },
    lifecycle: {
      type: "array",
      items: { type: "object", $ref: "gts://gts.frontx.mfes.lifecycle.hook.v1~" },
      $comment: "Optional lifecycle hooks - explicitly declared actions for each stage"
    },
    route: {
      type: "string",
      $comment: "Optional declared route of the extension, carried as declared."
    }
  },
  required: ["id", "domain", "entry"],
  $comment: "Domain-specific fields are defined in derived Extension schemas. Domains may specify extensionsTypeId to require extensions use a derived type. `route` on the base is a deliberate exception to that convention: routability applies to an extension in any domain, not to one domain's derived shape."
};
var action_v1_default = {
  $id: "gts://gts.frontx.mfes.comm.action.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    type: {
      "x-gts-ref": "/$id",
      $comment: "Self-reference to this action's type ID"
    },
    target: {
      oneOf: [
        { "x-gts-ref": "gts.frontx.mfes.ext.domain.v1~*" },
        { "x-gts-ref": "gts.frontx.mfes.ext.extension.v1~*" }
      ],
      $comment: "Type ID of the target ExtensionDomain or Extension"
    },
    payload: {
      type: "object",
      $comment: "Optional action payload"
    },
    timeout: {
      type: "number",
      minimum: 1,
      $comment: "Optional timeout override in milliseconds"
    }
  },
  required: ["type", "target"]
};
var actions_chain_v1_default = {
  $id: "gts://gts.frontx.mfes.comm.actions_chain.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    action: {
      type: "object",
      $ref: "gts://gts.frontx.mfes.comm.action.v1~"
    },
    next: {
      type: "object",
      $ref: "gts://gts.frontx.mfes.comm.actions_chain.v1~"
    },
    fallback: {
      type: "object",
      $ref: "gts://gts.frontx.mfes.comm.actions_chain.v1~"
    }
  },
  required: ["action"]
};
var shared_property_v1_default = {
  $id: "gts://gts.frontx.mfes.comm.shared_property.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    id: {
      "x-gts-ref": "/$id"
    },
    value: {}
  },
  required: ["id"]
};
var stage_v1_default = {
  $id: "gts://gts.frontx.mfes.lifecycle.stage.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    id: {
      "x-gts-ref": "/$id"
    },
    description: {
      type: "string"
    }
  },
  required: ["id"]
};
var hook_v1_default = {
  $id: "gts://gts.frontx.mfes.lifecycle.hook.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    stage: {
      "x-gts-ref": "gts.frontx.mfes.lifecycle.stage.v1~*",
      $comment: "The lifecycle stage that triggers this hook"
    },
    actions_chain: {
      type: "object",
      $ref: "gts://gts.frontx.mfes.comm.actions_chain.v1~",
      $comment: "The actions chain to execute when the stage triggers"
    }
  },
  required: ["stage", "actions_chain"]
};
var mf_manifest_v1_default = {
  $id: "gts://gts.frontx.mfes.mfe.mf_manifest.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    id: {
      "x-gts-ref": "/$id"
    },
    name: {
      type: "string",
      minLength: 1,
      description: "Human-readable MFE name, matches metaData.name."
    },
    metaData: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 1 },
        type: { type: "string", minLength: 1 },
        buildInfo: {
          type: "object",
          properties: {
            buildVersion: { type: "string" },
            buildName: { type: "string" }
          },
          required: ["buildVersion", "buildName"]
        },
        remoteEntry: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 1 },
            path: { type: "string" },
            type: { type: "string", enum: ["module", "global"] }
          },
          required: ["name", "path", "type"]
        },
        globalName: { type: "string" },
        publicPath: { type: "string" }
      },
      required: ["name", "type", "buildInfo", "remoteEntry", "publicPath"]
    },
    shared: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            minLength: 1,
            description: "npm package name (e.g. 'react', '@gears-frontx/mfes')."
          },
          version: {
            type: "string",
            minLength: 1,
            description: "Concrete version resolved from node_modules (e.g. '19.2.4'). Identifies the package input only \u2014 it does not imply identical source text across MFEs, since each MFE builds its own chunk. Cross-MFE reuse of that chunk's text is governed by 'contentHash', not by 'version' alone."
          },
          chunkPath: {
            type: "string",
            minLength: 1,
            description: "URL or host-relative path to the standalone ESM file for this dependency (e.g. '/shared/react.js')."
          },
          unwrapKey: {
            description: "Named export key to unwrap the module from the chunk. Null when the chunk exports the module directly.",
            oneOf: [
              { type: "string", minLength: 1 },
              { type: "null" }
            ]
          },
          contentHash: {
            type: "string",
            pattern: "^[0-9a-f]{64}$",
            description: "Optional sha256 hex digest (64 lowercase hex characters) of this entry's emitted chunk, published by the producing build. Identifies the producing build so the handler's cross-MFE shared-dep source-text cache can key reuse on it rather than on name+version alone. Absent when the producer has not adopted content hashing."
          }
        },
        required: ["name", "version", "chunkPath", "unwrapKey"]
      }
    }
  },
  required: ["id", "name", "metaData", "shared"]
};
var entry_mf_v1_default = {
  $id: "gts://gts.frontx.mfes.mfe.entry.v1~frontx.mfes.mfe.entry_mf.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  allOf: [
    { $ref: "gts://gts.frontx.mfes.mfe.entry.v1~" }
  ],
  properties: {
    manifest: {
      "x-gts-ref": "gts.frontx.mfes.mfe.mf_manifest.v1~*",
      $comment: "Reference to MfManifest type ID or inline manifest object containing package-level Module Federation config"
    },
    exposedModule: {
      type: "string",
      minLength: 1,
      $comment: "Module Federation exposed module name (e.g., './lifecycle')"
    },
    exposeAssets: {
      type: "object",
      $comment: "Per-module chunk assets for this specific exposed module, split per exposed module by the host manifest pipeline at registration time",
      properties: {
        js: {
          type: "object",
          properties: {
            sync: { type: "array", items: { type: "string" } },
            async: { type: "array", items: { type: "string" } }
          },
          required: ["sync", "async"]
        },
        css: {
          type: "object",
          properties: {
            sync: { type: "array", items: { type: "string" } },
            async: { type: "array", items: { type: "string" } }
          },
          required: ["sync", "async"]
        }
      },
      required: ["js", "css"]
    }
  },
  required: ["manifest", "exposedModule", "exposeAssets"]
};
var load_ext_v1_default = {
  $id: "gts://gts.frontx.mfes.comm.action.v1~frontx.mfes.ext.load_ext.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $comment: "Schema for load_ext extension actions. Self-contained and closed: re-declares every property action.v1 would otherwise provide and rejects any undeclared field, on itself and on its own payload (cpt-frontx-dod-gts-type-provider-infra-schema-ownership). load_ext carries no history intent \u2014 that applies only to mount_ext and unmount_ext.",
  type: "object",
  additionalProperties: false,
  properties: {
    type: {
      "x-gts-ref": "/$id",
      $comment: "Self-reference to this action's schema type ID"
    },
    target: {
      "x-gts-ref": "gts.frontx.mfes.ext.domain.v1~*",
      $comment: "Lifecycle actions target domains only \u2014 the extension is identified via payload.subject"
    },
    payload: {
      type: "object",
      additionalProperties: false,
      properties: {
        subject: {
          "x-gts-ref": "gts.frontx.mfes.ext.extension.v1~*",
          $comment: "Extension ID that this action targets"
        }
      },
      required: ["subject"],
      $comment: "Action payload with required extension reference"
    },
    timeout: {
      type: "number",
      minimum: 1,
      $comment: "Optional timeout override in milliseconds"
    }
  },
  required: ["type", "target", "payload"]
};
var mount_ext_v1_default = {
  $id: "gts://gts.frontx.mfes.comm.action.v1~frontx.mfes.ext.mount_ext.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $comment: "Schema for mount_ext extension actions. Self-contained and closed: re-declares every property action.v1 would otherwise provide and rejects any undeclared field, on itself and on its own payload (cpt-frontx-dod-gts-type-provider-infra-schema-ownership).",
  type: "object",
  additionalProperties: false,
  properties: {
    type: {
      "x-gts-ref": "/$id",
      $comment: "Self-reference to this action's schema type ID"
    },
    target: {
      "x-gts-ref": "gts.frontx.mfes.ext.domain.v1~*",
      $comment: "Lifecycle actions target domains only \u2014 the extension is identified via payload.subject"
    },
    payload: {
      type: "object",
      additionalProperties: false,
      properties: {
        subject: {
          "x-gts-ref": "gts.frontx.mfes.ext.extension.v1~*",
          $comment: "Extension ID that this action targets"
        },
        history: {
          type: "string",
          enum: ["none", "replace", "push"],
          $comment: "Optional history intent passed to the router uninterpreted; absent means push"
        }
      },
      required: ["subject"],
      $comment: "Action payload with required extension reference and optional history intent"
    },
    timeout: {
      type: "number",
      minimum: 1,
      $comment: "Optional timeout override in milliseconds"
    }
  },
  required: ["type", "target", "payload"]
};
var unmount_ext_v1_default = {
  $id: "gts://gts.frontx.mfes.comm.action.v1~frontx.mfes.ext.unmount_ext.v1~",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $comment: "Schema for unmount_ext extension actions. Self-contained and closed: re-declares every property action.v1 would otherwise provide and rejects any undeclared field, on itself and on its own payload (cpt-frontx-dod-gts-type-provider-infra-schema-ownership).",
  type: "object",
  additionalProperties: false,
  properties: {
    type: {
      "x-gts-ref": "/$id",
      $comment: "Self-reference to this action's schema type ID"
    },
    target: {
      "x-gts-ref": "gts.frontx.mfes.ext.domain.v1~*",
      $comment: "Lifecycle actions target domains only \u2014 the extension is identified via payload.subject"
    },
    payload: {
      type: "object",
      additionalProperties: false,
      properties: {
        subject: {
          "x-gts-ref": "gts.frontx.mfes.ext.extension.v1~*",
          $comment: "Extension ID that this action targets"
        },
        history: {
          type: "string",
          enum: ["none", "replace", "push"],
          $comment: "Optional history intent passed to the router uninterpreted; absent means push"
        }
      },
      required: ["subject"],
      $comment: "Action payload with required extension reference and optional history intent"
    },
    timeout: {
      type: "number",
      minimum: 1,
      $comment: "Optional timeout override in milliseconds"
    }
  },
  required: ["type", "target", "payload"]
};
var init_v1_default = {
  id: "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.init.v1",
  description: "After registration"
};
var activated_v1_default = {
  id: "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.activated.v1",
  description: "After mount"
};
var deactivated_v1_default = {
  id: "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.deactivated.v1",
  description: "After unmount"
};
var destroyed_v1_default = {
  id: "gts.frontx.mfes.lifecycle.stage.v1~frontx.mfes.lifecycle.destroyed.v1",
  description: "Before unregistration"
};
function loadSchemas() {
  return [
    // Core types (8)
    entry_v1_default,
    domain_v1_default,
    extension_v1_default,
    action_v1_default,
    actions_chain_v1_default,
    shared_property_v1_default,
    stage_v1_default,
    hook_v1_default,
    // MF-specific types (2)
    mf_manifest_v1_default,
    entry_mf_v1_default,
    // Extension action schemas (3) — self-contained, closed leaves; require payload.subject
    load_ext_v1_default,
    mount_ext_v1_default,
    unmount_ext_v1_default
  ];
}
function loadLifecycleStages() {
  return [
    init_v1_default,
    activated_v1_default,
    deactivated_v1_default,
    destroyed_v1_default
  ];
}
var GtsPlugin = class {
  name = "gts";
  version = "1.0.0";
  gtsStore;
  /** Mirrors `gtsStore` so a candidate can be validated without touching it. */
  scratchStore;
  constructor() {
    this.gtsStore = new import_gts_ts.GtsStore();
    this.scratchStore = new import_gts_ts.GtsStore();
    const schemas = loadSchemas();
    for (const schema of schemas) {
      const entity = (0, import_gts_ts.createJsonEntity)(schema);
      this.gtsStore.register(entity);
      this.scratchStore.register(entity);
    }
    const lifecycleStages = loadLifecycleStages();
    for (const instance of lifecycleStages) {
      const entity = (0, import_gts_ts.createJsonEntity)(instance);
      this.gtsStore.register(entity);
      this.scratchStore.register(entity);
    }
    for (const instance of lifecycleStages) {
      const result = this.gtsStore.validateInstance(instance.id);
      if (!result.ok || !result.valid) {
        throw new Error(
          `GTS validation failed for lifecycle stage '${instance.id}': ${result.error ?? "invalid"}`
        );
      }
    }
  }
  // === Schema Registry ===
  // First-class schemas are already registered during construction.
  // registerSchema is for vendor/dynamic schemas only.
  // @cpt-algo:cpt-frontx-algo-gts-type-provider-runtime-registration:p1
  registerSchema(schema) {
    const entity = (0, import_gts_ts.createJsonEntity)(schema);
    this.gtsStore.register(entity);
    this.scratchStore.register(entity);
  }
  getSchema(typeId) {
    const entity = this.gtsStore.get(typeId);
    if (!entity) return void 0;
    if (!entity.content || typeof entity.content !== "object") {
      return void 0;
    }
    return entity.content;
  }
  // === Instance Registry (GTS-native approach) ===
  /**
   * Register a GTS instance and validate it against its schema.
   *
   * Schema-vs-instance determination is gts-ts's responsibility (per
   * gts-spec, the authoritative marker is the trailing `~` on the ID, not
   * a `$id` field heuristic). This method delegates to `gts-ts` unchanged:
   * whatever `gts-ts` accepts is accepted, whatever it rejects is rejected.
   *
   * Named instance pattern: the schema is resolved from the chained instance
   * ID automatically (`gts.frontx.mfes.ext.extension.v1~acme.widget.v1` →
   * schema `gts.frontx.mfes.ext.extension.v1~`). For anonymous instances
   * (e.g., action payloads with no `id`), gts-ts uses the `type` field to
   * resolve the schema.
   *
   * Validate-before-persist: `GtsStore` exposes no validate-only call —
   * `validateInstance` requires the instance to already be resolvable in the
   * store it is called on, both to look up its schema and to resolve any
   * `x-gts-ref` cross-reference against sibling instances — and no call to
   * remove an entity once registered. So this validates the candidate against
   * a scratch store that mirrors the real store (every successful write goes
   * to both), which resolves identically to the real store for both the
   * schema lookup and any `x-gts-ref` check, without ever persisting failure
   * into the store the rest of this plugin reads from. Only a candidate that
   * validates clean is registered into the real, shared store. A failed call
   * leaves that store exactly as it was before the call, and the scratch
   * store, which then holds the rejected candidate, is rebuilt from the real
   * store.
   *
   * @param entity - The GTS instance to register and validate
   * @throws Error if schema validation fails
   */
  register(entity) {
    const jsonEntity = (0, import_gts_ts.createJsonEntity)(entity);
    this.scratchStore.register(jsonEntity);
    const result = this.scratchStore.validateInstance(jsonEntity.id);
    if (!result.ok || !result.valid) {
      this.scratchStore = new import_gts_ts.GtsStore();
      for (const existing of this.gtsStore.getAll()) {
        this.scratchStore.register(existing);
      }
      const reason = result.ok ? "schema validation returned invalid" : result.error ?? "unknown validation error";
      const schema = jsonEntity.schemaId ? this.getSchema(jsonEntity.schemaId) : void 0;
      throw new Error(
        `GTS validation failed for instance '${jsonEntity.id || "(anonymous)"}'
Reason: ${reason}
Instance: ${JSON.stringify(entity, null, 2)}
Schema: ${schema ? JSON.stringify(schema, null, 2) : "(schema not resolved)"}`
      );
    }
    this.gtsStore.register(jsonEntity);
  }
  // @cpt-algo:cpt-frontx-algo-gts-type-provider-schema-validation:p1
  validateInstance(instanceId) {
    const result = this.gtsStore.validateInstance(instanceId);
    if (!result.ok) {
      const unknownTypeResult = {
        valid: false,
        errors: [{ path: "", message: result.error ?? "validation failed", keyword: "gts-validation" }]
      };
      return unknownTypeResult;
    }
    if (result.ok && result.valid) {
      return { valid: true, errors: [] };
    }
    const failureResult = {
      valid: false,
      errors: [
        {
          path: "",
          message: result.error ?? "validation failed",
          keyword: "gts-validation"
        }
      ]
    };
    return failureResult;
  }
  // === Type Hierarchy ===
  // @cpt-algo:cpt-frontx-algo-gts-type-provider-typof-resolution:p1
  isTypeOf(typeId, baseTypeId) {
    if (typeId === baseTypeId || typeId.startsWith(baseTypeId)) {
      return true;
    }
    return false;
  }
  /**
   * Resolve this plugin's GTS action-type ID for the framework's well-known
   * `load_ext` lifecycle action. Keeps the GTS-notation literal owned here,
   * never in the generic runtime.
   *
   * @returns The GTS action-type ID for `load_ext`
   */
  // @cpt-begin:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-04
  resolveLoadExtActionId() {
    return FRONTX_ACTION_LOAD_EXT;
  }
  // @cpt-end:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-04
  /**
   * Resolve this plugin's GTS action-type ID for the framework's well-known
   * `mount_ext` lifecycle action.
   *
   * @returns The GTS action-type ID for `mount_ext`
   */
  // @cpt-begin:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-05
  resolveMountExtActionId() {
    return FRONTX_ACTION_MOUNT_EXT;
  }
  // @cpt-end:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-05
  /**
   * Resolve this plugin's GTS action-type ID for the framework's well-known
   * `unmount_ext` lifecycle action.
   *
   * @returns The GTS action-type ID for `unmount_ext`
   */
  // @cpt-begin:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-06
  resolveUnmountExtActionId() {
    return FRONTX_ACTION_UNMOUNT_EXT;
  }
  // @cpt-end:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-06
  /**
   * Resolve this plugin's GTS type ID for the framework's well-known `init`
   * lifecycle stage. Keeps the GTS-notation literal owned here, never in the
   * generic runtime.
   *
   * @returns The GTS type ID for the `init` lifecycle stage
   */
  // @cpt-begin:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-07
  resolveLifecycleStageInitId() {
    return FRONTX_LIFECYCLE_STAGE_INIT;
  }
  // @cpt-end:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-07
  /**
   * Resolve this plugin's GTS type ID for the framework's well-known
   * `activated` lifecycle stage.
   *
   * @returns The GTS type ID for the `activated` lifecycle stage
   */
  // @cpt-begin:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-08
  resolveLifecycleStageActivatedId() {
    return FRONTX_LIFECYCLE_STAGE_ACTIVATED;
  }
  // @cpt-end:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-08
  /**
   * Resolve this plugin's GTS type ID for the framework's well-known
   * `deactivated` lifecycle stage.
   *
   * @returns The GTS type ID for the `deactivated` lifecycle stage
   */
  // @cpt-begin:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-09
  resolveLifecycleStageDeactivatedId() {
    return FRONTX_LIFECYCLE_STAGE_DEACTIVATED;
  }
  // @cpt-end:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-09
  /**
   * Resolve this plugin's GTS type ID for the framework's well-known
   * `destroyed` lifecycle stage.
   *
   * @returns The GTS type ID for the `destroyed` lifecycle stage
   */
  // @cpt-begin:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-10
  resolveLifecycleStageDestroyedId() {
    return FRONTX_LIFECYCLE_STAGE_DESTROYED;
  }
  // @cpt-end:cpt-frontx-algo-gts-type-provider-typof-resolution:p1:inst-tr-10
};
var gtsPlugin = new GtsPlugin();
export {
  FRONTX_ACTION_LOAD_EXT,
  FRONTX_ACTION_MOUNT_EXT,
  FRONTX_ACTION_UNMOUNT_EXT,
  GtsPlugin,
  gtsPlugin,
  loadLifecycleStages,
  loadSchemas
};
