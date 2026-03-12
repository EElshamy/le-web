import { DeviceEnum, type SocialRegisterInput } from "#gql/default";
import type { SocialLoginInput, SocialResponse } from "@/types/social";

export const useSocialAuth = () => {
  const { t } = useI18n();
  const { isOnline } = useNetwork();
  const { isAndroid, isDesktop, userAgent } = useDevice();
  const getDeviceInfo = () => ({
    deviceName: userAgent || "Unknown",
    device: isDesktop
      ? DeviceEnum.DESKTOP
      : isAndroid
        ? DeviceEnum.ANDROID
        : DeviceEnum.IOS,
  });

  const checkSocialStatus = async (
    values: SocialLoginInput,
  ): Promise<SocialResponse> => {
    try {
      const { firstName, lastName, ...rest } = values;

      const res = await GqlCheckSocialProviderStatus({
        input: {
          ...rest,
          providerAuth: { authToken: values.providerAuth },
        },
      });

      const data = res?.checkSocialProviderStatus;

      return {
        success: data?.success,
        message: data?.message,
        action: data?.data?.actionRequired,
        user: data?.data?.user,
      };
    } catch (e) {
      return handleError(e);
    }
  };

  const socialLogin = async (
    values: SocialLoginInput,
  ): Promise<SocialResponse> => {
    try {
      if (!values || !values.providerId) {
        console.error("Invalid values passed to socialLogin", values);
        return {
          success: false,
          message: "Invalid social login data",
          user: null,
        };
      }

      const res = await GqlSocialLogin({
        input: {
          providerId: values.providerId,
          provider: values.provider,
          loginDetails: getDeviceInfo(),
        },
      });

      const data = res?.socialLogin;
      const user = data?.data;
      if (data?.success && user) {
        return { success: true, message: data.message, user };
      }
      if (values.email) {
        const status = await checkSocialStatus({
          ...values,
          isManuallyEntered: false,
        });
        return status;
      }

      return { success: false, message: "Email not found", user: null };
    } catch (e) {
      return handleError(e);
    }
  };

  const merge = async (
    values: SocialLoginInput,
    token: string,
  ): Promise<SocialResponse> => {
    try {
      const { firstName, lastName, ...rest } = values;
      const requestHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      useGqlHeaders(requestHeaders);

      console.log("Merging with values:", values, "and token:", token);

      const res = await GqlSocialMerge({
        input: {
          ...rest,
          providerAuth: { authToken: values.providerAuth },
          loginDetails: getDeviceInfo(),
        },
      });

      const data = res?.socialMerge;
      return {
        success: data?.success,
        message: data?.message,
        user: data?.data,
      };
    } catch (e) {
      return handleError(e);
    }
  };

  const socialRegister = async (
    values: SocialLoginInput,
  ): Promise<SocialResponse> => {
    try {
      const res = await GqlSocialRegister({
        input: {
          ...values,
          providerAuth: { authToken: values.providerAuth },
          loginDetails: getDeviceInfo(),
          phone: values.phone,
        },
      });
      const data = res?.socialRegister;
      return {
        success: data?.success,
        message: data?.message,
        user: data?.data,
      };
    } catch (e) {
      return handleError(e);
    }
  };

  const handleError = (e: any): SocialResponse => {
    console.error("Social Auth Error:", e);
    const msg = !isOnline.value
      ? t("noInternetConnection")
      : t("somethingWentWrong");
    useAlert({ type: "error", message: msg });
    return { success: false, message: msg, user: null };
  };

  return { checkSocialStatus, socialLogin, merge, socialRegister };
};
