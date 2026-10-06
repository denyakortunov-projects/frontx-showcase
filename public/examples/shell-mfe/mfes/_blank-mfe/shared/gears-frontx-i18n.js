// ../../../packages/i18n/dist/index.js
var TextDirection = /* @__PURE__ */ ((TextDirection2) => {
  TextDirection2["LeftToRight"] = "ltr";
  TextDirection2["RightToLeft"] = "rtl";
  return TextDirection2;
})(TextDirection || {});
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["English"] = "en";
  Language2["Spanish"] = "es";
  Language2["French"] = "fr";
  Language2["German"] = "de";
  Language2["Italian"] = "it";
  Language2["Portuguese"] = "pt";
  Language2["Dutch"] = "nl";
  Language2["Russian"] = "ru";
  Language2["Polish"] = "pl";
  Language2["Ukrainian"] = "uk";
  Language2["Czech"] = "cs";
  Language2["Arabic"] = "ar";
  Language2["Hebrew"] = "he";
  Language2["Persian"] = "fa";
  Language2["Urdu"] = "ur";
  Language2["Turkish"] = "tr";
  Language2["ChineseSimplified"] = "zh";
  Language2["ChineseTraditional"] = "zh-TW";
  Language2["Japanese"] = "ja";
  Language2["Korean"] = "ko";
  Language2["Vietnamese"] = "vi";
  Language2["Thai"] = "th";
  Language2["Indonesian"] = "id";
  Language2["Hindi"] = "hi";
  Language2["Bengali"] = "bn";
  Language2["Swedish"] = "sv";
  Language2["Danish"] = "da";
  Language2["Norwegian"] = "no";
  Language2["Finnish"] = "fi";
  Language2["Greek"] = "el";
  Language2["Romanian"] = "ro";
  Language2["Hungarian"] = "hu";
  Language2["Malay"] = "ms";
  Language2["Tagalog"] = "tl";
  Language2["Tamil"] = "ta";
  Language2["Swahili"] = "sw";
  return Language2;
})(Language || {});
var LanguageDisplayMode = /* @__PURE__ */ ((LanguageDisplayMode2) => {
  LanguageDisplayMode2["Native"] = "native";
  LanguageDisplayMode2["English"] = "english";
  return LanguageDisplayMode2;
})(LanguageDisplayMode || {});
var I18N_NAMESPACE_SEPARATOR = ":";
var I18N_PATH_SEPARATOR = ".";
var I18N_DEFAULT_NAMESPACE = "app";
var HTML_LANG_ATTRIBUTE = "lang";
var HTML_DIR_ATTRIBUTE = "dir";
var SUPPORTED_LANGUAGES = [
  // Western European
  {
    code: "en",
    name: "English",
    englishName: "English",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "es",
    name: "Espa\xF1ol",
    englishName: "Spanish",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "fr",
    name: "Fran\xE7ais",
    englishName: "French",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "de",
    name: "Deutsch",
    englishName: "German",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "it",
    name: "Italiano",
    englishName: "Italian",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "pt",
    name: "Portugu\xEAs",
    englishName: "Portuguese",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "nl",
    name: "Nederlands",
    englishName: "Dutch",
    direction: "ltr"
    /* LeftToRight */
  },
  // @cpt-end:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-western
  // Eastern European
  // @cpt-begin:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-eastern
  {
    code: "ru",
    name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
    englishName: "Russian",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "pl",
    name: "Polski",
    englishName: "Polish",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "uk",
    name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
    englishName: "Ukrainian",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "cs",
    name: "\u010Ce\u0161tina",
    englishName: "Czech",
    direction: "ltr"
    /* LeftToRight */
  },
  // @cpt-end:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-eastern
  // Middle East & North Africa (RTL)
  // @cpt-begin:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-mena
  {
    code: "ar",
    name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    englishName: "Arabic",
    direction: "rtl"
    /* RightToLeft */
  },
  {
    code: "he",
    name: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    englishName: "Hebrew",
    direction: "rtl"
    /* RightToLeft */
  },
  {
    code: "fa",
    name: "\u0641\u0627\u0631\u0633\u06CC",
    englishName: "Persian",
    direction: "rtl"
    /* RightToLeft */
  },
  {
    code: "ur",
    name: "\u0627\u0631\u062F\u0648",
    englishName: "Urdu",
    direction: "rtl"
    /* RightToLeft */
  },
  {
    code: "tr",
    name: "T\xFCrk\xE7e",
    englishName: "Turkish",
    direction: "ltr"
    /* LeftToRight */
  },
  // @cpt-end:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-mena
  // Asian
  // @cpt-begin:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-asian
  {
    code: "zh",
    name: "\u7B80\u4F53\u4E2D\u6587",
    englishName: "Chinese (Simplified)",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "zh-TW",
    name: "\u7E41\u9AD4\u4E2D\u6587",
    englishName: "Chinese (Traditional)",
    direction: "ltr",
    region: "TW"
  },
  {
    code: "ja",
    name: "\u65E5\u672C\u8A9E",
    englishName: "Japanese",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "ko",
    name: "\uD55C\uAD6D\uC5B4",
    englishName: "Korean",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "vi",
    name: "Ti\u1EBFng Vi\u1EC7t",
    englishName: "Vietnamese",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "th",
    name: "\u0E44\u0E17\u0E22",
    englishName: "Thai",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "id",
    name: "Bahasa Indonesia",
    englishName: "Indonesian",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "hi",
    name: "\u0939\u093F\u0928\u094D\u0926\u0940",
    englishName: "Hindi",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "bn",
    name: "\u09AC\u09BE\u0982\u09B2\u09BE",
    englishName: "Bengali",
    direction: "ltr"
    /* LeftToRight */
  },
  // @cpt-end:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-asian
  // Nordic
  // @cpt-begin:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-nordic
  {
    code: "sv",
    name: "Svenska",
    englishName: "Swedish",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "da",
    name: "Dansk",
    englishName: "Danish",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "no",
    name: "Norsk",
    englishName: "Norwegian",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "fi",
    name: "Suomi",
    englishName: "Finnish",
    direction: "ltr"
    /* LeftToRight */
  },
  // @cpt-end:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-nordic
  // Other
  // @cpt-begin:cpt-frontx-dod-i18n-infrastructure-language-support:p1:inst-array-remaining
  {
    code: "el",
    name: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
    englishName: "Greek",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "ro",
    name: "Rom\xE2n\u0103",
    englishName: "Romanian",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "hu",
    name: "Magyar",
    englishName: "Hungarian",
    direction: "ltr"
    /* LeftToRight */
  },
  // Additional major languages
  {
    code: "ms",
    name: "Bahasa Melayu",
    englishName: "Malay",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "tl",
    name: "Tagalog",
    englishName: "Tagalog",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "ta",
    name: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
    englishName: "Tamil",
    direction: "ltr"
    /* LeftToRight */
  },
  {
    code: "sw",
    name: "Kiswahili",
    englishName: "Swahili",
    direction: "ltr"
    /* LeftToRight */
  }
];
function getLanguageMetadata(code) {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
}
function getRTLLanguages() {
  return SUPPORTED_LANGUAGES.filter(
    (lang) => lang.direction === "rtl"
    /* RightToLeft */
  ).map((lang) => lang.code);
}
function isValidLanguage(code) {
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
}
var I18nRegistryImpl = class _I18nRegistryImpl {
  /** Configuration */
  config;
  /** Current language */
  currentLanguage = null;
  /** Translation dictionaries: namespace -> language -> dictionary */
  dictionaries = /* @__PURE__ */ new Map();
  /** Translation loaders: namespace -> loader function */
  loaders = /* @__PURE__ */ new Map();
  /** Subscribers for translation changes */
  subscribers = /* @__PURE__ */ new Set();
  /** Version counter for React re-rendering */
  version = 0;
  // @cpt-begin:cpt-frontx-algo-i18n-infrastructure-language-file-map:p1:inst-1
  /** Language file mapping */
  static LANGUAGE_FILE_MAP = {
    [
      "en"
      /* English */
    ]: "en.json",
    [
      "es"
      /* Spanish */
    ]: "es.json",
    [
      "fr"
      /* French */
    ]: "fr.json",
    [
      "de"
      /* German */
    ]: "de.json",
    [
      "it"
      /* Italian */
    ]: "it.json",
    [
      "pt"
      /* Portuguese */
    ]: "pt.json",
    [
      "nl"
      /* Dutch */
    ]: "nl.json",
    [
      "ru"
      /* Russian */
    ]: "ru.json",
    [
      "pl"
      /* Polish */
    ]: "pl.json",
    [
      "uk"
      /* Ukrainian */
    ]: "uk.json",
    [
      "cs"
      /* Czech */
    ]: "cs.json",
    [
      "ar"
      /* Arabic */
    ]: "ar.json",
    [
      "he"
      /* Hebrew */
    ]: "he.json",
    [
      "fa"
      /* Persian */
    ]: "fa.json",
    [
      "ur"
      /* Urdu */
    ]: "ur.json",
    [
      "tr"
      /* Turkish */
    ]: "tr.json",
    [
      "zh"
      /* ChineseSimplified */
    ]: "zh.json",
    [
      "zh-TW"
      /* ChineseTraditional */
    ]: "zh-TW.json",
    [
      "ja"
      /* Japanese */
    ]: "ja.json",
    [
      "ko"
      /* Korean */
    ]: "ko.json",
    [
      "vi"
      /* Vietnamese */
    ]: "vi.json",
    [
      "th"
      /* Thai */
    ]: "th.json",
    [
      "id"
      /* Indonesian */
    ]: "id.json",
    [
      "hi"
      /* Hindi */
    ]: "hi.json",
    [
      "bn"
      /* Bengali */
    ]: "bn.json",
    [
      "sv"
      /* Swedish */
    ]: "sv.json",
    [
      "da"
      /* Danish */
    ]: "da.json",
    [
      "no"
      /* Norwegian */
    ]: "no.json",
    [
      "fi"
      /* Finnish */
    ]: "fi.json",
    [
      "el"
      /* Greek */
    ]: "el.json",
    [
      "ro"
      /* Romanian */
    ]: "ro.json",
    [
      "hu"
      /* Hungarian */
    ]: "hu.json",
    [
      "ms"
      /* Malay */
    ]: "ms.json",
    [
      "tl"
      /* Tagalog */
    ]: "tl.json",
    [
      "ta"
      /* Tamil */
    ]: "ta.json",
    [
      "sw"
      /* Swahili */
    ]: "sw.json"
  };
  // @cpt-end:cpt-frontx-algo-i18n-infrastructure-language-file-map:p1:inst-1
  constructor(config) {
    this.config = config;
  }
  // ============================================================================
  // Registration
  // ============================================================================
  // @cpt-begin:cpt-frontx-state-i18n-infrastructure-namespace-cache:p1:inst-1
  /**
   * Register translations for a namespace.
   */
  register(namespace, language, translations) {
    if (!this.dictionaries.has(namespace)) {
      this.dictionaries.set(namespace, /* @__PURE__ */ new Map());
    }
    this.dictionaries.get(namespace).set(language, translations);
    this.notifySubscribers();
  }
  // @cpt-end:cpt-frontx-state-i18n-infrastructure-namespace-cache:p1:inst-1
  /**
   * Subscribe to translation changes.
   * Returns an unsubscribe function.
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }
  /**
   * Notify all subscribers of a change.
   */
  notifySubscribers() {
    this.version++;
    this.subscribers.forEach((callback) => {
      callback();
    });
  }
  /**
   * Get the current version number.
   * Used by React to detect changes.
   */
  getVersion() {
    return this.version;
  }
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-screenset-registration:p1:inst-1
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-screen-lazy-load:p1:inst-1
  /**
   * Register a translation loader for a namespace.
   */
  registerLoader(namespace, loader) {
    this.loaders.set(namespace, loader);
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-screenset-registration:p1:inst-1
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-screen-lazy-load:p1:inst-1
  /**
   * Check if namespace is registered.
   */
  hasNamespace(namespace) {
    return this.dictionaries.has(namespace) || this.loaders.has(namespace);
  }
  /**
   * Get all registered namespaces.
   */
  getNamespaces() {
    const namespaces = /* @__PURE__ */ new Set();
    this.dictionaries.forEach((_, key) => namespaces.add(key));
    this.loaders.forEach((_, key) => namespaces.add(key));
    return Array.from(namespaces);
  }
  // ============================================================================
  // Translation
  // ============================================================================
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-1
  /**
   * Translate a key.
   * Format: 'namespace:key.subkey' or just 'key' for default namespace
   */
  t(key, params) {
    const { namespace, path } = this.parseKey(key);
    const translation = this.getTranslation(namespace, path);
    if (translation === void 0) {
      return key;
    }
    return this.interpolate(translation, params);
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-1
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-2
  /**
   * Parse a translation key into namespace and path.
   */
  parseKey(key) {
    const separatorIndex = key.indexOf(I18N_NAMESPACE_SEPARATOR);
    if (separatorIndex === -1) {
      return {
        namespace: I18N_DEFAULT_NAMESPACE,
        path: key
      };
    }
    return {
      namespace: key.slice(0, separatorIndex),
      path: key.slice(separatorIndex + 1)
    };
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-2
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-3
  /**
   * Get a translation from the dictionary.
   */
  getTranslation(namespace, path) {
    const language = this.currentLanguage ?? this.config.defaultLanguage;
    const fallback = this.config.fallbackLanguage;
    let translation = this.findTranslation(namespace, language, path);
    if (translation !== void 0) {
      return translation;
    }
    if (language !== fallback) {
      translation = this.findTranslation(namespace, fallback, path);
      if (translation !== void 0) {
        return translation;
      }
    }
    return void 0;
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-3
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-4
  // @cpt-begin:cpt-frontx-algo-i18n-infrastructure-path-traversal:p1:inst-1
  /**
   * Find a translation in the dictionary.
   */
  findTranslation(namespace, language, path) {
    const namespaceDicts = this.dictionaries.get(namespace);
    if (!namespaceDicts) {
      return void 0;
    }
    const dict = namespaceDicts.get(language);
    if (!dict) {
      return void 0;
    }
    const parts = path.split(I18N_PATH_SEPARATOR);
    let current = dict;
    for (const part of parts) {
      if (typeof current !== "object" || current === null) {
        return void 0;
      }
      current = current[part];
      if (current === void 0) {
        return void 0;
      }
    }
    return typeof current === "string" ? current : void 0;
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-4
  // @cpt-end:cpt-frontx-algo-i18n-infrastructure-path-traversal:p1:inst-1
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-5
  /**
   * Interpolate parameters into a translation string.
   */
  interpolate(text, params) {
    if (!params) {
      return text;
    }
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      const value = params[key];
      return value !== void 0 ? String(value) : match;
    });
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-key-resolution:p1:inst-5
  // ============================================================================
  // Language Management
  // ============================================================================
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-language-activation:p1:inst-1
  // @cpt-begin:cpt-frontx-state-i18n-infrastructure-registry:p1:inst-1
  /**
   * Set current language and load translations.
   */
  async setLanguage(language) {
    this.currentLanguage = language;
    this.updateHtmlAttributes(language);
    await this.loadLanguage(language);
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-language-activation:p1:inst-1
  // @cpt-end:cpt-frontx-state-i18n-infrastructure-registry:p1:inst-1
  /**
   * Get current language.
   */
  getLanguage() {
    return this.currentLanguage;
  }
  // @cpt-begin:cpt-frontx-algo-i18n-infrastructure-html-attrs:p1:inst-1
  /**
   * Update HTML lang and dir attributes.
   */
  updateHtmlAttributes(language) {
    if (typeof document === "undefined") {
      return;
    }
    const htmlElement = document.documentElement;
    htmlElement.setAttribute(HTML_LANG_ATTRIBUTE, language);
    htmlElement.setAttribute(
      HTML_DIR_ATTRIBUTE,
      this.isRTL(language) ? "rtl" : "ltr"
      /* LeftToRight */
    );
  }
  // @cpt-end:cpt-frontx-algo-i18n-infrastructure-html-attrs:p1:inst-1
  // ============================================================================
  // Language Metadata
  // ============================================================================
  /**
   * Get language metadata.
   */
  getLanguageMetadata(code) {
    const targetCode = code ?? this.currentLanguage;
    if (!targetCode) {
      return void 0;
    }
    return SUPPORTED_LANGUAGES.find((lang) => lang.code === targetCode);
  }
  /**
   * Get all supported languages.
   */
  getSupportedLanguages() {
    return [...SUPPORTED_LANGUAGES];
  }
  /**
   * Check if a language is RTL.
   */
  isRTL(code) {
    const targetCode = code ?? this.currentLanguage;
    if (!targetCode) {
      return false;
    }
    const metadata = this.getLanguageMetadata(targetCode);
    return metadata?.direction === "rtl";
  }
  // ============================================================================
  // Translation Loading
  // ============================================================================
  // @cpt-begin:cpt-frontx-algo-i18n-infrastructure-lazy-exclusion:p1:inst-1
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-language-activation:p1:inst-2
  /**
   * Load translations for a language.
   * Excludes screen.* and screenset.* namespaces which are lazy-loaded:
   * - screen.* namespaces: loaded when screen mounts
   * - screenset.* namespaces: loaded when screenset is activated
   */
  async loadLanguage(language) {
    const loadPromises = [];
    this.loaders.forEach((_loader, namespace) => {
      if (namespace.startsWith("screen.") || namespace.startsWith("screenset.")) {
        return;
      }
      loadPromises.push(this.loadNamespace(namespace, language));
    });
    await Promise.all(loadPromises);
  }
  // @cpt-end:cpt-frontx-algo-i18n-infrastructure-lazy-exclusion:p1:inst-1
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-language-activation:p1:inst-2
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-screen-lazy-load:p1:inst-2
  /**
   * Load translations for a specific namespace.
   */
  async loadNamespace(namespace, language) {
    const loader = this.loaders.get(namespace);
    if (!loader) {
      return;
    }
    try {
      const translations = await loader(language);
      this.register(namespace, language, translations);
    } catch (error) {
      console.warn(`Failed to load translations for ${namespace}/${language}:`, error);
    }
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-screen-lazy-load:p1:inst-2
  // @cpt-begin:cpt-frontx-flow-i18n-infrastructure-screenset-registration:p1:inst-2
  /**
   * Load translations for a specific screenset.
   */
  async loadScreensetTranslations(screensetId, language) {
    const targetLanguage = language ?? this.currentLanguage ?? this.config.defaultLanguage;
    const namespace = `screenset.${screensetId}`;
    await this.loadNamespace(namespace, targetLanguage);
  }
  // @cpt-end:cpt-frontx-flow-i18n-infrastructure-screenset-registration:p1:inst-2
  /**
   * Preload translations for multiple languages.
   */
  async preloadLanguages(languages) {
    const loadPromises = languages.map((language) => this.loadLanguage(language));
    await Promise.all(loadPromises);
  }
  // ============================================================================
  // Static Helpers
  // ============================================================================
  /**
   * Create a translation loader from a translation map.
   *
   * @example
   * ```typescript
   * const loader = I18nRegistry.createLoader({
   *   [Language.English]: () => import('./i18n/en.json'),
   *   [Language.Spanish]: () => import('./i18n/es.json'),
   * });
   * ```
   */
  // @cpt-begin:cpt-frontx-algo-i18n-infrastructure-create-loader:p1:inst-1
  // @cpt-begin:cpt-frontx-dod-i18n-infrastructure-lazy-chunks:p1:inst-1
  static createLoader(translationMap) {
    return async (language) => {
      const importFn = translationMap[language];
      if (!importFn) {
        throw new Error(`No translation found for language: ${language}`);
      }
      const module = await importFn();
      return module.default;
    };
  }
  // @cpt-end:cpt-frontx-algo-i18n-infrastructure-create-loader:p1:inst-1
  // @cpt-end:cpt-frontx-dod-i18n-infrastructure-lazy-chunks:p1:inst-1
  /**
   * Create a translation loader from a directory.
   * Maps Language enum values to file names automatically.
   *
   * @param basePath - Base path for translation files
   * @param importFn - Dynamic import function
   */
  static createLoaderFromDirectory(importFn) {
    return async (language) => {
      const filename = _I18nRegistryImpl.LANGUAGE_FILE_MAP[language];
      const module = await importFn(filename);
      return module.default;
    };
  }
};
var i18nRegistry = new I18nRegistryImpl({
  defaultLanguage: "en",
  fallbackLanguage: "en"
  /* English */
});
function createI18nRegistry(config) {
  return new I18nRegistryImpl(config);
}
function getLocale() {
  return i18nRegistry.getLanguage() ?? "en";
}
function toNumber(value) {
  if (value === null || value === void 0) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}
function toDate(value) {
  if (value === null || value === void 0) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}
function formatDate(date, format) {
  const d = toDate(date);
  if (!d) return "";
  const locale = getLocale();
  return new Intl.DateTimeFormat(locale, { dateStyle: format }).format(d);
}
function formatTime(date, format) {
  const d = toDate(date);
  if (!d) return "";
  const locale = getLocale();
  return new Intl.DateTimeFormat(locale, { timeStyle: format }).format(d);
}
function formatDateTime(date, dateFormat, timeFormat) {
  const d = toDate(date);
  if (!d) return "";
  const locale = getLocale();
  return new Intl.DateTimeFormat(locale, {
    dateStyle: dateFormat,
    timeStyle: timeFormat
  }).format(d);
}
var MS_PER_SECOND = 1e3;
var MS_PER_MINUTE = 60 * MS_PER_SECOND;
var MS_PER_HOUR = 60 * MS_PER_MINUTE;
var MS_PER_DAY = 24 * MS_PER_HOUR;
function getRelativeUnit(date, base) {
  const diffMs = date.getTime() - base.getTime();
  const absMs = Math.abs(diffMs);
  const sign = diffMs < 0 ? -1 : 1;
  if (absMs < 60 * MS_PER_SECOND) {
    const value = Math.round(diffMs / MS_PER_SECOND);
    return { value: value === 0 ? 0 : value, unit: "second" };
  }
  if (absMs < 60 * MS_PER_MINUTE) {
    return { value: sign * Math.round(absMs / MS_PER_MINUTE), unit: "minute" };
  }
  if (absMs < MS_PER_DAY) {
    return { value: sign * Math.round(absMs / MS_PER_HOUR), unit: "hour" };
  }
  const baseY = base.getUTCFullYear();
  const baseM = base.getUTCMonth();
  const baseD = base.getUTCDate();
  const dateY = date.getUTCFullYear();
  const dateM = date.getUTCMonth();
  const dateD = date.getUTCDate();
  const totalMonths = (dateY - baseY) * 12 + (dateM - baseM);
  const baseUTC = Date.UTC(baseY, baseM, baseD);
  const dateUTC = Date.UTC(dateY, dateM, dateD);
  const diffDays = Math.round((dateUTC - baseUTC) / MS_PER_DAY);
  if (Math.abs(totalMonths) >= 12) {
    const value = Math.round(totalMonths / 12);
    return { value, unit: "year" };
  }
  if (Math.abs(totalMonths) >= 1) {
    return { value: totalMonths, unit: "month" };
  }
  return { value: diffDays === 0 ? sign * 1 : diffDays, unit: "day" };
}
function formatRelative(date, base) {
  const d = toDate(date);
  if (!d) return "";
  const baseDate = base !== void 0 ? toDate(base) : /* @__PURE__ */ new Date();
  if (!baseDate) return "";
  const locale = getLocale();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const { value, unit } = getRelativeUnit(d, baseDate);
  return rtf.format(value, unit);
}
function formatNumber(value, options) {
  const n = toNumber(value);
  if (n === null) return "";
  const locale = getLocale();
  return new Intl.NumberFormat(locale, options).format(n);
}
function formatPercent(value, decimals) {
  const n = toNumber(value);
  if (n === null) return "";
  const locale = getLocale();
  const opts = {
    style: "percent",
    ...decimals !== void 0 && { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
  };
  return new Intl.NumberFormat(locale, opts).format(n);
}
function formatCompact(value) {
  const n = toNumber(value);
  if (n === null) return "";
  const locale = getLocale();
  return new Intl.NumberFormat(locale, { notation: "compact" }).format(n);
}
function formatCurrency(value, currencyCode) {
  const n = toNumber(value);
  if (n === null) return "";
  if (!currencyCode || typeof currencyCode !== "string") return "";
  const locale = getLocale();
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode
    }).format(n);
  } catch {
    return "";
  }
}
function compareStrings(a, b, options) {
  const locale = getLocale();
  return new Intl.Collator(locale, options).compare(a, b);
}
function createCollator(options) {
  const locale = getLocale();
  return new Intl.Collator(locale, options);
}
export {
  HTML_DIR_ATTRIBUTE,
  HTML_LANG_ATTRIBUTE,
  I18N_DEFAULT_NAMESPACE,
  I18N_NAMESPACE_SEPARATOR,
  I18N_PATH_SEPARATOR,
  I18nRegistryImpl,
  Language,
  LanguageDisplayMode,
  SUPPORTED_LANGUAGES,
  TextDirection,
  compareStrings,
  createCollator,
  createI18nRegistry,
  formatCompact,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatRelative,
  formatTime,
  getLanguageMetadata,
  getRTLLanguages,
  i18nRegistry,
  isValidLanguage
};
