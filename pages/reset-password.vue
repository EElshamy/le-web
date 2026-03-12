<template lang="pug">
    .app-container(class="pt-[80px] pb-[200px]")

        Form.flex.flex-col.items-center.justify-center(:validation-schema="schema" @submit="handleSubmit" v-if="!otp") 
            div(class="max-w-[430px] flex flex-col gap-9")
                .flex.flex-col.items-center(class="gap-[12px] text-center")
                    h1(class="lg:heading-6") {{ t('changeYourPassword') }}
                    p(class="lg:body-3 mt-[12px]") {{ t('createNewPasswordAndClickSaveToConfirm') }}
                .flex.flex-col.gap-7(class="max-w-[373px]")
                    InputText(name="newPassword" type="password" :label="t('newPassword')" :placeholder="t('enterPassword')")
                    InputText(name="confirmPassword" type="password" :label="t('confirmNewPassword')" :placeholder="t('confirmPassword')")
                    button.btn-primary.w-full(class="lg:label-prominent-2 rounded-[12px]") {{ t('saveNewPassword') }}
        
</template>

<script setup lang="ts">
import * as yup from "yup";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { email: resetEmail, code, resetPassword } = useResetPassword();

const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/'])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

const schema = yup.object({
  newPassword: yup
    .string()
    .required()
    .matches(passwordRegex, t("strongPasswordValidation"))
    .notOneOf([yup.ref("oldPassword")], t("newPasswordMustBeDifferent"))
    .label(t("newPassword")),

  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], t("passwordsMustMatch"))
    .matches(passwordRegex, t("strongPasswordValidation"))
    .label(t("confirmNewPassword")),
});

const handleSubmit = async function (values: {
  newPassword: string;
  confirmPassword: string;
}) {
  await resetPassword(values?.newPassword);
};
</script>

<style scoped></style>
