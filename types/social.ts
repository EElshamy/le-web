// types/social.ts
export interface SocialLoginInput {
  providerId: string;
  provider: "GOOGLE" | "FACEBOOK" | "APPLE";
  providerAuth: string; // Token or Code
  email?: string;
  firstName?: string;
  lastName?: string;
  device?: string;
  deviceName?: string;
  isManuallyEntered?: boolean;
}

export interface SocialResponse {
  success: boolean;
  message: string;
  user?: any;
  action?:
    | "REGISTER"
    | "MERGE"
    | "MERGE_SAME_PROVIDER"
    | "VERIFICATION_MERGE"
    | "REGISTER_VERIFICATION"
    | null;
}
