import { DeviceEnum } from "#gql/default";
import type { ApiResponse, RegisterInput } from "@/types/auth";
const getDeviceType = (isDesktop: boolean, isAndroid: boolean): DeviceEnum => {
  if (isDesktop) return DeviceEnum.DESKTOP;
  if (isAndroid) return DeviceEnum.ANDROID;
  return DeviceEnum.IOS;
};

export const useRegister = () => {
  const { t } = useI18n();
  const { isAndroid, isDesktop, userAgent } = useDevice();
  const { isOnline } = useNetwork();

  const loading = ref(false);
  const registeredEmail = useState<string>('registered_email', () => "");

  const register = async (values: RegisterInput) => {
    loading.value = true;
    try {
      const res = await GqlRegisterAsUser({
        input: {
          ...values,
          loginDetails: {
            deviceName: userAgent || 'Unknown Device',
            device: getDeviceType(isDesktop, isAndroid),
          },
        },
      });

      const response = res?.registerAsUser as ApiResponse;

      if (response.success) {
        registeredEmail.value = values.email;
      }

      return {
        success: response.success,
        message: response.message
      };

    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.gqlErrors?.[0]?.message ||
                           (!isOnline.value ? t("noInternetConnection") : t("somethingWentWrong"));

      return { success: false, message: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  return { register, email: registeredEmail, loading };
};
