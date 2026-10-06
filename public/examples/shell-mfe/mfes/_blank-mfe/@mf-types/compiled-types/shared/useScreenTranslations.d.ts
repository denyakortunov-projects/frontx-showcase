/**
 * useScreenTranslations Hook
 *
 * MFE-local i18n loading hook. Accepts a language map produced by
 * `import.meta.glob('./i18n/*.json')` (Vite-compatible glob).
 *
 * The hook:
 * 1. Gets current language from bridge.getProperty(FRONTX_SHARED_PROPERTY_LANGUAGE)
 * 2. Builds module key from language (e.g., './i18n/en.json')
 * 3. Dynamically imports the module
 * 4. Returns t(key) function that looks up key in loaded translations
 * 5. Subscribes to language property changes to reload translations
 *
 * Usage in screen component:
 * ```tsx
 * const languageModules = import.meta.glob('./i18n/*.json');
 * const { t, loading } = useScreenTranslations(languageModules, bridge);
 * ```
 */
import type { ChildMfeBridge } from '@gears-frontx/react';
interface TranslationJsonModule {
    default: Record<string, string>;
}
type LanguageModuleImporter = () => Promise<TranslationJsonModule>;
type LanguageModuleMap = Record<string, LanguageModuleImporter>;
interface UseScreenTranslationsReturn {
    t: (key: string) => string;
    loading: boolean;
}
/**
 * Hook for loading MFE-local translations based on the current language from the bridge.
 *
 * @param languageModules - Language module map from `import.meta.glob('./i18n/*.json')`
 * @param bridge - ChildMfeBridge instance
 * @returns Object with `t(key)` function and `loading` state
 */
export declare function useScreenTranslations(languageModules: LanguageModuleMap, bridge: ChildMfeBridge): UseScreenTranslationsReturn;
export {};
