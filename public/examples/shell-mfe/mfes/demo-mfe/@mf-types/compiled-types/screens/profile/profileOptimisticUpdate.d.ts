import type { UpdateProfileVariables } from '../../api/AccountsApiService';
import type { GetCurrentUserResponse } from '../../api/types';
export declare function applyOptimisticProfileUpdate(current: GetCurrentUserResponse | undefined, variables: UpdateProfileVariables, updatedAt?: string): GetCurrentUserResponse | undefined;
