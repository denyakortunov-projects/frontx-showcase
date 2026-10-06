import React from 'react';
import type { ChildMfeBridge } from '@gears-frontx/react';
/**
 * Props for the ProfileScreen component.
 */
interface ProfileScreenProps {
    bridge: ChildMfeBridge;
}
/**
 * Profile Screen for the MFE remote.
 *
 * Displays user profile information backed by TanStack Query:
 * - Loading state (skeleton placeholders)
 * - Error state (error message + Retry button)
 * - Data state (full user profile display + editable profile form)
 *
 * The edit flow demonstrates the full optimistic-update pattern:
 *   onMutate  -> snapshot + optimistic set via queryCache
 *   onError   -> rollback via queryCache.set with snapshot
 *   onSettled -> invalidate to refetch authoritative state
 */
export declare const ProfileScreen: React.FC<ProfileScreenProps>;
export {};
