import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
/**
 * Props for the HelloWorldScreen component.
 */
interface HelloWorldScreenProps {
    bridge: ChildMfeBridge;
}
/**
 * Hello World Screen for the MFE remote.
 *
 * Demonstrates MFE capabilities including:
 * - Shadow DOM isolation
 * - Bridge communication
 * - Theme property subscription
 * - Language property subscription
 * - MFE-local i18n with dynamic translation loading
 * - Cross-screen navigation via actions chains
 *
 * Uses @gears-frontx/ui-kit components, styled from its design tokens.
 * Runs inside Shadow DOM with isolated styles.
 */
export declare const HelloWorldScreen: React.FC<HelloWorldScreenProps>;
export {};
