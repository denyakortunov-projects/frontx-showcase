import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
/**
 * Props for the HomeScreen component.
 */
interface HomeScreenProps {
    bridge: ChildMfeBridge;
}
/**
 * Home Screen for the Blank MFE template.
 *
 * This is a template component that demonstrates:
 * - Shadow DOM isolation
 * - Bridge communication with the host
 * - Theme property subscription
 * - Language property subscription
 * - MFE-local i18n with dynamic translation loading
 * - Components from @gears-frontx/ui-kit, styled from its design tokens
 *
 * To use this template:
 * 1. Copy the entire _blank-mfe directory to a new name
 * 2. Update all placeholder IDs in mfe.json
 * 3. Update package.json name and port
 * 4. Update vite.config.ts name
 * 5. Customize this component for your use case
 * 6. Add/modify translation files as needed
 */
export declare const HomeScreen: React.FC<HomeScreenProps>;
export {};
