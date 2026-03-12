<template lang="pug">
.app-container
  div.flex.flex-col.items-center.justify-center.gap-9(class="pt-[24px] pb-[56px] lg:pt-[88px] lg:pb-[100px]")
    div.flex.flex-col.items-center.justify-center.text-center(class="gap-[12px]")
      h1(class="text-[24px]") {{ t('welcomeBack') }}
      p(class="font-300 text-[16px]") {{ t('loginToYourAccountNowAndStartLearning') }}
    form(@submit.prevent="onSubmit" class="w-full md:w-[450px]")
      .flex.flex-col.gap-7.w-full.mb-7
        AuthSocials(@loading="(val) => disableAction = val")
        AppDivider(:label="t('or')")
      .flex.flex-col.gap-4
        InputText( name="email" type="email" v-model="email" v-bind="emailAttrs" :error="errors.email" :label="t('email')" :placeholder="t('enterYourEmail')")
        InputText( name="password" type="password" v-model="password" v-bind="passwordAttrs" :error="errors.password" :label="t('password')" class="mt-[16px]" :placeholder="t('enterYourPassword')")
      button.btn-primary.w-full(
        class="rounded-3 mt-[24px] text-[16px] font-400 py-3 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        type="submit"
        :disabled="loading || disableAction"
      )
        .flex.items-center.justify-center.gap-2
          IconLoading(v-if="loading" class="animate-spin")
          span {{ loading ? t('loggingIn') : t('login') }}

    .flex.flex-col.gap-6(class="text-center")
      NuxtLink(:to="localePath('/forgot-password')" class="text-[14px] font-400 text-primary underline") {{ t('forgotPassword') }}
      div(class="text-[14px] font-300 flex gap-2 justify-center")
        p {{ t('dontHaveAccount') + ' ' }}
        NuxtLink(:to="localePath('/signup')" class="font-400 text-primary underline") {{ t('createAccount') }}
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { DeviceEnum } from "../.nuxt/gql/default";
const { t } = useI18n();
const localePath = useLocalePath();
const { isAndroid, isDesktop, userAgent } = useDevice();
const { isOnline } = useNetwork();
const userStore = useUserStore();
const loading = ref<boolean>(false);
const disableAction = ref<boolean>(false);
const simplePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const schema = yup.object({
  email: yup.string().trim().email(t("invalidEmail")).required().label(t("email")),
  password: yup
    .string()
    .required()
    .min(8, t("passwordMinLength"))
    .max(25, t("passwordMaxLength"))
    .matches(/^\S*$/, t('passwordCannotContainSpaces'))
    .matches(/^[\p{P}\w$^]+$/u, t('passwordCannotContainSpecialCharacters'))
    .matches(/[A-Za-z]/, t('passwordMustContainAtLeastOneLetter'))
    .matches(/\d/, t('passwordMustContainAtLeastOneNumber'))
    .label(t("password")),
});

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const getDeviceType = (): DeviceEnum => {
  if (isDesktop) return DeviceEnum.DESKTOP;
  if (isAndroid) return DeviceEnum.ANDROID;
  return DeviceEnum.IOS;
};
const onSubmit = handleSubmit(async (values) => {
  if (!isOnline.value) {
    useAlert({ type: "error", message: t('noInternetConnection') });
    return;
  }

  loading.value = true;

  try {
    const response = await GqlEmailAndPasswordLogin({
      input: {
        email: values.email,
        password: values.password,
        loginDetails: {
          deviceName: userAgent || 'Unknown Device',
          device: getDeviceType(),
        },
      }
    });
    const loginData = response?.emailAndPasswordLogin;

    if (loginData?.success) {
      useAlert({ type: "success", message: loginData.message || t('loginSuccess') });
      userStore.setData(loginData.data, true);
      resetForm();
      await navigateTo(localePath('/'), { replace: true });
    } else {
      useAlert({
        type: "error",
        message: loginData?.message || t('invalidCredentials')
      });
    }

  } catch (error: any) {
    console.error('Login Error:', error);
    const errorMsg = error?.gqlErrors?.[0]?.message || error?.message || t('somethingWentWrong');
    useAlert({ type: "error", message: errorMsg });

  } finally {
    loading.value = false;
  }
});

onMounted(() => {
  if (userStore.isLoggedIn) {
      navigateTo(localePath('/'));
  }
});

useHead({
  title: t("login"),
});
</script>
