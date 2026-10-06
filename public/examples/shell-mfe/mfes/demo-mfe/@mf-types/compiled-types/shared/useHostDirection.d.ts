/**
 * useHostDirection Hook
 *
 * Keeps the Shadow DOM host's text direction (`dir`) in sync with the active
 * language:
 *
 * 1. An effect keyed by `language` (rather than logic inside a bridge
 *    subscription callback) also covers the initial language, which never
 *    fires a callback.
 * 2. A DOM host mutation has to wait for commit, so this lives in an effect
 *    rather than the render body.
 * 3. Outside a Shadow DOM the hook is a no-op.
 *
 * Usage in screen component:
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const language = useBridgeProperty(bridge, FRONTX_SHARED_PROPERTY_LANGUAGE, 'en');
 * useHostDirection(containerRef, language);
 * ```
 */
import { type RefObject } from 'react';
/**
 * Hook syncing the Shadow DOM host element's `dir` attribute to the language.
 *
 * @param containerRef - Ref to any element rendered inside the MFE's shadow root
 * @param language - Active language code (e.g. 'en', 'ar')
 */
export declare function useHostDirection(containerRef: RefObject<HTMLElement | null>, language: string): void;
