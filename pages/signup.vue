<template lang="pug">
.app-container
  div.flex.flex-col.items-center.justify-center.gap-9( class="pt-[24px] pb-[56px] lg:pt-[88px] lg:pb-[150px] min-h-[80vh]" v-show="!success")
      div.flex.flex-col.items-center.justify-center.text-center.gap-3
        h1(class="text-[24px]") {{ t('createAccount') }}
        p(class="font-300 text-[16px]") {{ t('createYourAccountAndStartLearningNow') }}
      form(@submit.prevent="onSubmit" class="w-full md:w-[450px]")
        .flex.flex-col.gap-7.mb-7
          AuthSocials(@loading="(val) => disableAction = val")
          AppDivider(:label="t('or')")
        .grid(class="grid-cols-1 lg:grid-cols-2 gap-4")
          InputText(
            name="firstName"
            type="text"
            v-model="firstName"
            v-bind="firstNameAttrs"
            :error="errors.firstName"
            :label="t('firstName')"
            :placeholder="t('enterYourFirstName')"
          )
          InputText(
            name="lastName"
            type="text"
            v-model="lastName"
            v-bind="lastNameAttrs"
            :error="errors.lastName"
            :label="t('lastName')"
            :placeholder="t('enterYourLastName')"
          )


        InputText(
          name="email"
          type="email"
          v-model="email"
          v-bind="emailAttrs"
          :error="errors.email"
          class="mt-4"
          :label="t('email')"
          :placeholder="t('enterYourEmail')"
        )

        InputPhone(
          name="phone"
          v-model="phone"
          v-bind="phoneAttrs"
          :error="errors.phone"
          :label="t('phoneNumber')"
          class="mt-4"
          :placeholder="t('phoneNumberPlaceholder')"
        )

        InputText(
          name="password"
          type="password"
          v-model="password"
          v-bind="passwordAttrs"
          :error="errors.password"
          :label="t('password')"
          class="mt-4"
          :placeholder="t('enterYourPassword')"
        )
        button.btn-primary.w-full(class="rounded-lg mt-6 py-3 text-base font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-all"  :disabled="loading || disableAction")
          .flex.items-center.gap-2.justify-center
            IconLoading(v-if="loading" class="animate-spin")
            span {{ loading ? t('processing') : t('startNow') }}

        .flex.flex-col.gap-6(class="w-full text-center mt-9")
          div(class="text-[14px] font-light leading-relaxed")
            span {{ t('byRegisteringYouAgreeTo') + ' ' }}
            NuxtLink(:to="localePath('/privacy-policy')" class="font-400 text-primary underline") {{ t('privacyPolicy') }}
            span {{ ' ' + t('and') + ' ' }}
            NuxtLink(:to="localePath('/terms-and-conditions')" class="font-400 text-primary underline") {{ t('termsAndConditions') }}

          div(class="text-[14px] font-light flex gap-2 justify-center items-center")
            p {{ t('alreadyHaveAFitnessAccount') }}
            NuxtLink(:to="localePath('/login')" class="font-400 text-primary underline") {{ t('login') }}

  div.flex.flex-col.items-center.justify-center(class="min-h-[60vh] pt-[40px] pb-[100px]" v-show="success")
      div(class="w-full md:w-[430px]")
        AuthOtp(
          :email="registeredEmail"
          :useCase="VerificationCodeUseCasesEnum.EMAIL_VERIFICATION"
          :navigator="previousUrl"
          @success="handleOtpSuccess"
          @handleBack="handleBack"
          :sign="true"
        )
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { isValidPhoneNumber } from 'libphonenumber-js';
import { DeviceEnum, VerificationCodeUseCasesEnum } from "#gql/default";
const { t } = useI18n();
const localePath = useLocalePath();
const { isAndroid, isDesktop, userAgent } = useDevice();
const { isOnline } = useNetwork();
const userStore = useUserStore();
const { previousUrl } = storeToRefs(userStore);
const loading = ref<boolean>(false);
const success = ref<boolean>(false);
const disableAction = ref<boolean>(false);
const registeredEmail = ref<string>("");
const simplePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const dataForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
})
const registeredName = ref<string>("");
if (!yup.string().phone) {
  yup.addMethod(yup.string, 'phone', function () {
    return this.test('phone', t('invalidPhoneNumber'), function (value) {
      if (!value) return true;
      return isValidPhoneNumber(value);
    });
  });
}


const schema = yup.object({
  firstName: yup
  .string()
  .trim()
  .required()
  .min(2, t("validation.min", { min: 2 }))
  .max(25, t("validation.max", { max: 25 }))
  .matches(
    /^[\p{L}\s'-]+$/u,
    t("validation.nameFormat")
  )
  .label(t("firstName")),

lastName: yup
  .string()
  .trim()
  .required()
  .min(2, t("validation.min", { min: 2 }))
  .max(25, t("validation.max", { max: 25 }))
  .matches(
    /^[\p{L}\s'-]+$/u,
    t("validation.nameFormat")
  )
  .label(t("lastName")),
  email: yup.string().trim().email(t("invalidEmail")).required().label(t("email")),
  phone: yup.string().phone().required().label(t("phoneNumber")),
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

const { handleSubmit, errors, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: dataForm
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [phone, phoneAttrs] = defineField('phone');

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
  disableAction.value = true;

  try {
    const response = await GqlRegisterAsUser({
      input: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        loginDetails: {
          deviceName: userAgent || 'Unknown Device',
          device: getDeviceType(),
        },
      }
    });

    const signupData = response?.registerAsUser;

    if (signupData?.success) {
      useAlert({ type: "success", message: t('anOtpHasBeenSentToYourEmail') });
      registeredEmail.value = values.email;
      registeredName.value = values.firstName + ' ' + values.lastName;
      dataForm.email = values.email;
      dataForm.password = values.password;
      dataForm.phone = values.phone;
      dataForm.firstName = values.firstName;
      dataForm.lastName = values.lastName;
      success.value = true;
    } else {
      useAlert({
        type: "error",
        message: signupData?.message || t('registrationFailed')
      });
    }
  } catch (error: any) {
    console.error('Registration Error:', error);
    const errorMsg = error?.gqlErrors?.[0]?.message || error?.message || t('somethingWentWrong');
    useAlert({ type: "error", message: errorMsg });
  } finally {
    loading.value = false;
    disableAction.value = false;
  }
});

const handleOtpSuccess = async function (user: any) {
  const welcomeMsg = registeredName.value
    ? `${t('welcome')}, ${registeredName.value}!`
    : t('welcome');
  useAlert({ type: "success", message: welcomeMsg });
  userStore.setData(user, true);

  const target = previousUrl.value && !previousUrl.value.includes('/login') ? previousUrl.value : '/';

  await navigateTo(localePath(target), { replace: true });
};

onMounted(() => {
  if (userStore.isLoggedIn) {
      navigateTo(localePath('/'));
  }
});

useSeoMeta({
  title: t("signup"),
});

function handleBack(){
  firstName.value = dataForm.firstName || '';
  lastName.value = dataForm.lastName || '';
  email.value = dataForm.email || '';
  phone.value = dataForm.phone || '';
  password.value = dataForm.password || '';
  setValues(dataForm);
  success.value = false;
}
</script>

<style scoped>
</style>
