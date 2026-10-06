import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
/**
 * Props for the CurrentThemeScreen component.
 */
interface CurrentThemeScreenProps {
    bridge: ChildMfeBridge;
}
/**
 * Current Theme Screen for the MFE remote.
 *
 * Displays the current theme value and demonstrates CSS variable consumption.
 * Shows colored swatches for background, foreground, primary, secondary, muted, accent,
 * destructive using the CSS custom properties.
 *
 * Receives a ChildMfeBridge for communication with the host application.
 * Demonstrates bridge usage by displaying extDomainId, extensionId, theme, and language.
 *
 * Runs inside Shadow DOM with isolated styles.
 *
 * Subscribes to theme and language domain properties to demonstrate
 * host-MFE communication via bridge.
 */
export declare const CurrentThemeScreen: React.FC<CurrentThemeScreenProps>;
export {};
