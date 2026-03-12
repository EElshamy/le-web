<template lang="pug">
.app-container(class="pt-[80px] pb-[200px]")
  Form.flex.flex-col.items-center.justify-center(
    v-if="currentStep === 1"
    :validation-schema="emailSchema"
    @submit="handleEmailSubmit"
  )
    div(class="max-w-[450px] flex flex-col gap-9")
      .flex.flex-col.items-center(class="gap-[12px] text-center")
        h1(class="lg:heading-6") {{ t('forgetPassword') }}
        p(class="lg:body-3 mt-[12px]") {{ t('dontWorryEnterYourLeiaqaEmailAndWellSendYouAPasswordResetCode') }}

      .flex.flex-col.gap-7
        InputText(name="email" :customError="errorMessage" :label="t('email')" :placeholder="t('enterEmail')")
        button.btn-primary.w-full(class="lg:label-prominent-2 rounded-[12px]" :disabled="loading")
          IconLoading(v-if="loading" class="mr-2")
          span {{ t('sendCode') }}
        NuxtLink.text-primary.underline.text-center(:to="localePath('/login')" class="lg:label-prominent-3") {{ t('backToLogin') }}

  AuthOtp(
    v-else-if="currentStep === 2"
    :email="email"
    :expiryTimestamp="otpExpiryTime"
    :useCase="UserVerificationCodeUseCaseEnum.PASSWORD_RESET"
    @success="handleOtpSuccess"
    @update-expiry="handleUpdateExpiry"
  )

  Form.flex.flex-col.items-center.justify-center(
    v-else-if="currentStep === 3"
    :validation-schema="passwordSchema"
    @submit="handlePasswordSubmit"
  )

    div(class="max-w-[450px] w-full flex flex-col gap-9")
      div(class="max-w-[450px] flex flex-col gap-9")
        .flex.flex-col.items-center(class="gap-[12px] text-center")
          h1(class="lg:heading-6") {{ t('changeYourPassword') }}
          p(class="lg:body-3 mt-[12px]") {{ t('createNewPasswordAndClickSaveToConfirm') }}
        .flex.flex-col.gap-7(class="max-w-[373px]")
          InputText(name="newPassword" type="password" :label="t('newPassword')" :placeholder="t('enterPassword')")
          InputText(name="confirmPassword" type="password" :label="t('confirmNewPassword')" :placeholder="t('confirmPassword')")
          button.btn-primary.w-full(class="lg:label-prominent-2 rounded-[12px]" :disabled="resetLoading")
            IconLoading(v-if="resetLoading" class="mr-2")
            span {{ t('confirm') }}
</template>

<script setup lang="ts">
import * as yup from "yup";
import { UserVerificationCodeUseCaseEnum } from "#gql/default";
import { onBeforeRouteLeave } from "vue-router"; // Import مهم

const { t } = useI18n();
const localePath = useLocalePath();
const currentStep = ref(1);
const email = ref("");
const verifiedCode = ref("");
const errorMessage = ref("");
const loading = ref(false);
const otpExpiryTime = ref<number | null>(null); // متغير لحفظ وقت انتهاء العداد

const { sendVerificationCode } = useOtp();
const { resetPassword, loading: resetLoading } = useResetPassword();
const STORAGE_KEY = "forget-pass-session";

onMounted(() => {
  if (process.client) {
    const savedData = sessionStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        currentStep.value = parsed.step || 1;
        email.value = parsed.email || "";
        verifiedCode.value = parsed.code || "";
        // استرجاع وقت العداد
        if (parsed.expiryTime) {
          otpExpiryTime.value = parsed.expiryTime;
        }
      } catch (e) {
        console.error("Error parsing saved state", e);
      }
    }
  }
});

onBeforeRouteLeave((to, from, next) => {
  if (process.client) {
    sessionStorage.removeItem(STORAGE_KEY);
  }
  next();
});

watch(
  [currentStep, email, verifiedCode, otpExpiryTime],
  ([newStep, newEmail, newCode, newExpiry]) => {
    if (process.client) {
      if (newEmail) {
        const dataToSave = {
          step: newStep,
          email: newEmail,
          code: newCode,
          expiryTime: newExpiry,
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      }
    }
  }
);

const handleUpdateExpiry = (newTime: number) => {
  otpExpiryTime.value = newTime;
};

const emailSchema = yup.object({
  email: yup.string().email().required().label(t("email")),
});

const simplePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/'])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
const passwordSchema = yup.object({
  newPassword: yup
    .string()
    .required()
    .min(8, t("passwordMinLength"))
    .max(25, t("passwordMaxLength"))
    .matches(/^\S*$/, t('passwordCannotContainSpaces'))
    .matches(/^[\p{P}\w$^]+$/u, t('passwordCannotContainSpecialCharacters'))
    .matches(/[A-Za-z]/, t('passwordMustContainAtLeastOneLetter'))
    .matches(/\d/, t('passwordMustContainAtLeastOneNumber'))
    .notOneOf([yup.ref("oldPassword")], t("newPasswordMustBeDifferent"))
    .label(t("newPassword")),

  confirmPassword: yup
  .string()
    .required()
    .min(8, t("passwordMinLength"))
    .max(25, t("passwordMaxLength"))
    .matches(/^\S*$/, t('passwordCannotContainSpaces'))
    .matches(/^[\p{P}\w$^]+$/u, t('passwordCannotContainSpecialCharacters'))
    .matches(/[A-Za-z]/, t('passwordMustContainAtLeastOneLetter'))
    .matches(/\d/, t('passwordMustContainAtLeastOneNumber'))
    .oneOf([yup.ref("newPassword")], t("passwordsMustMatch"))
    .label(t("confirmNewPassword")),
});

const handleEmailSubmit = async (values: { email: string }) => {
  loading.value = true;
  errorMessage.value = "";
  try {
    email.value = values.email;
    const { message, success } = await sendVerificationCode(
      UserVerificationCodeUseCaseEnum.PASSWORD_RESET,
      email.value
    );
    if (success) {
      otpExpiryTime.value = Date.now() + 60 * 1000;
      currentStep.value = 2;
    } else {
      errorMessage.value = message;
    }
  } catch (e) {
    errorMessage.value = t('somethingWentWrong');
  } finally {
    loading.value = false;
  }
};

const handleOtpSuccess = (code: string) => {
  verifiedCode.value = code;
  currentStep.value = 3;
};

const handlePasswordSubmit = async (values: any) => {
  try {
    await resetPassword(email.value, verifiedCode.value, values.newPassword);
    if(process.client) {
        sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error(error);
  }
};

useSeoMeta({
  title: t("forgetPassword"),
});
</script>
