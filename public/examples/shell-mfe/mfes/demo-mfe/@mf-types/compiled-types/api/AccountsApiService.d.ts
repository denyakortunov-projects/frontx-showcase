/**
 * Accounts Domain - API Service
 * Service for accounts domain (users, tenants, authentication, permissions)
 *
 * MFE-local service. The MFE bundles its own copy of @gears-frontx/react and registers
 * services into its own isolated apiRegistry instance.
 */
import { BaseApiService } from '@gears-frontx/react';
import type { GetCurrentUserResponse } from './types';
export type UpdateProfileVariables = {
    firstName: string;
    lastName: string;
    department?: string;
};
/**
 * Accounts API Service for the demo MFE.
 * Manages accounts domain endpoints:
 * - User management (current user, profile, preferences)
 */
export declare class AccountsApiService extends BaseApiService {
    constructor();
    readonly getCurrentUser: import("@gears-frontx/api").EndpointDescriptor<GetCurrentUserResponse>;
    readonly updateProfile: import("@gears-frontx/api").MutationDescriptor<GetCurrentUserResponse, UpdateProfileVariables>;
}
