import {
  UserVerificationCodeUseCaseEnum,
  VerificationCodeUseCasesEnum,
} from "#gql/default";
import type { ApiResponse } from "@/types/auth";

export const useOtp = () => {
  const { t } = useI18n();
  const { isOnline } = useNetwork();
  const sendVerificationCode = async (
    useCase: UserVerificationCodeUseCaseEnum,
    email: string
  ) => {
    try {
      const res = await GqlSendEmailVerificationCode({
        input: {
          email,
          useCase,
        },
      });

      const response = res?.sendEmailVerificationCode as ApiResponse;
      return { success: response.success, message: response.message };
    } catch (error: any) {
      const msg = error?.message || (!isOnline.value ? t("noInternetConnection") : t("somethingWentWrong"));
      return { success: false, message: msg };
    }
  };

  const confirmVerificationCode = async (
    code: string,
    useCase: VerificationCodeUseCasesEnum,
    email: string
  ) => {
    try {
      const res = await GqlVerifyUserVerificationCodeByEmail({
        input: {
          email,
          verificationCode: code,
          useCase,
        },
      });

      const response = res?.verifyUserVerificationCodeByEmail as ApiResponse;
      return {
        success: response.success,
        message: response.message,
        data: response.data
      };
    } catch (error: any) {
      const msg = error?.message || (!isOnline.value ? t("noInternetConnection") : t("somethingWentWrong"));
      return { success: false, message: msg };
    }
  };
  const confirmResetPasswordVerificationCode = async (
    code: string,
    email: string
  ) => {
    try {
      const res = await GqlVerifyPasswordResetVerificationCode({
        input: { verificationCode: code, email },
      });

      const response = res?.verifyPasswordResetVerificationCode as ApiResponse;
      return { success: response.success, message: response.message };
    } catch (error: any) {
      const msg = error?.message || (!isOnline.value ? t("noInternetConnection") : t("somethingWentWrong"));
      return { success: false, message: msg };
    }
  };

  return {
    sendVerificationCode,
    confirmVerificationCode,
    confirmResetPasswordVerificationCode,
  };
};
