import React from 'react';
import type { ApiUser } from '../../../api/types';
export type ProfileFormValues = {
    firstName: string;
    lastName: string;
    department: string;
};
interface ProfileDetailsCardProps {
    user: ApiUser;
    isSaving: boolean;
    saveErrorMessage?: string;
    t: (key: string) => string;
    onRefresh: () => void;
    onSubmit: (values: ProfileFormValues) => Promise<void>;
}
export declare const ProfileDetailsCard: React.FC<ProfileDetailsCardProps>;
export {};
