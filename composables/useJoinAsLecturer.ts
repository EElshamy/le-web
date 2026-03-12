import type { RegisterAsLecturerInput } from "#gql";
import { DeviceEnum } from "#gql/default";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useJoinAsLecturer = function () {
  const { t, locale } = useI18n();
  const { isIos, isAndroid, isDesktop, userAgent } = useDevice();

  const joinAsLecturer = async function (input: RegisterAsLecturerInput) {
    try {
      const { data } = await useAsyncData(
        `registerAsLecturer-${Math.random() * 100}`,
        () =>
          GqlRegisterAsLecturer({
            input: {
              ...input,
              cvUrl: input?.cvUrl[0],
              instagramUrl: input?.instagramUrl || null,
              linkedInUrl: input?.linkedInUrl || null,
              facebookUrl: input?.facebookUrl || null,
              loginDetails: {
                deviceName: userAgent,
                device: isDesktop
                  ? DeviceEnum.DESKTOP
                  : isAndroid
                  ? DeviceEnum.ANDROID
                  : DeviceEnum.IOS,
              },
            },
          })
      );
      const { message, success } = data?.value?.registerAsLecturer as response;
      return { message, success };
    } catch {
      return {
        message: !navigator.onLine
          ? t("noInternetConnection")
          : t("somethingWentWrong"),
        success: false,
      };
    }
  };

  return { joinAsLecturer };
};
