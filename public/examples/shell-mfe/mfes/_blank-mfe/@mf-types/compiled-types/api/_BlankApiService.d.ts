/**
 * _Blank Domain - API Service
 * Replace '_Blank' with your screenset name.
 */
import { BaseApiService } from '@gears-frontx/react';
import type { GetBlankStatusResponse } from './types';
/**
 * _Blank API Service
 * Add your domain-specific endpoint methods here.
 */
export declare class _BlankApiService extends BaseApiService {
    constructor();
    readonly getStatus: import("@gears-frontx/api").EndpointDescriptor<GetBlankStatusResponse>;
}
