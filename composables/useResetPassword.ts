import type { ApiResponse } from "@/types/auth";
interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

export const useResetPassword = () => {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const loading = ref(false);

  const resetPassword = async (email: string, code: string, password: string) => {
    loading.value = true;
    try {
      const res = await GqlResetPasswordByEmail({
        input: {
          email: email,
          verificationCode: code,
          newPassword: password,
        },
      });

      const response = res?.resetPasswordByEmail as ApiResponse;

      if (response.success) {
        useAlert({ type: "success", message: response.message });
        return navigateTo(localePath("/login"));
      }
      else{
        useAlert({ type: "error", message: response.message });
      }

      return {
        success: false,
        message: response.message
      };

    } catch (error: any) {
      useAlert({ type: "error", message: t("somethingWentWrong") });
      return { success: false };
    } finally {
      loading.value = false;
    }
  };

  return { loading, resetPassword };
};
