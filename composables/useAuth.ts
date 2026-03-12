import { DeviceEnum } from "#gql/default";
import type { ApiResponse, RegisterInput } from "@/types/auth";
const getDeviceType = (isDesktop: boolean, isAndroid: boolean): DeviceEnum => {
  if (isDesktop) return DeviceEnum.DESKTOP;
  if (isAndroid) return DeviceEnum.ANDROID;
  return DeviceEnum.IOS;
};

export const useCustomAuth = () => {
  const userStore = useUserStore();
  const { t } = useI18n();
  const { previousUrl } = storeToRefs(userStore);
  const localePath = useLocalePath();
  const { isAndroid, isDesktop, userAgent } = useDevice();
  const { isOnline } = useNetwork();

  const loading = ref(false);

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      const res = await GqlEmailAndPasswordLogin({
        input: {
          email,
          password,
          loginDetails: {
            deviceName: userAgent || 'Unknown Device',
            device: getDeviceType(isDesktop, isAndroid),
          },
        },
      });

      const response = res.emailAndPasswordLogin as ApiResponse;

      if (response.success && response.data) {
        userStore.setData(response.data, true);
        await navigateTo(localePath('/'));
        return { success: true, message: response.message || "Welcome back" };
      }

      return {
        success: false,
        message: response.message || t("somethingWentWrong")
      };

    } catch (error: any) {
      const errorMessage = error?.message || (!isOnline.value ? t("noInternetConnection") : t("somethingWentWrong"));
      return { success: false, message: errorMessage };
    } finally {
      loading.value = false;
    }
  };
  const logout = async () => {
    loading.value = true;
    try {
      await GqlLogout();
    } catch (e) {
      console.error("Logout failed on server, continuing local cleanup...", e);
    } finally {
      userStore.clearData();
      loading.value = false;
      return navigateTo(localePath("/"), { replace: true });
    }
  };

  const getMe = async () => {
    return await userStore.fetchMe();
  };

  return { loading, login, logout, getMe };
};
