interface Profile {
    mode: string;
    version: string;
}

interface SystemStatus {
    host?: User;
    profile: Profile;
    dbSize: number;
    allowSignUp: boolean;
    ignoreUpgrade: boolean;
    disablePublicMemos: boolean;
    additionalStyle: string;
    additionalScript: string;
    storageServiceId: number;
    localStoragePath: string;
}