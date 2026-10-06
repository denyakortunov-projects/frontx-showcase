
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/lifecycle';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/lifecycle' ? typeof import('REMOTE_ALIAS_IDENTIFIER/lifecycle') :any;