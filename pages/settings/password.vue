<template lang="pug">
    .flex.flex-col.gap-7(class="max-w-[652px]")
        h1(class="f-text-24-32") {{ t('changePassword') }}
        form(:validation-schema="schema" @submit.prevent="onSubmit" class='space-y-6')
            InputText(type="password" name="oldPassword" :label="t('currentPassword')" v-if="user?.hasPassword")
            InputText(type="password" name="newPassword" :label="t('newPassword')")
            InputText(type="password" name="confirmPassword" :label="t('confirmNewPassword')")
            .flex.items-center.mt-2.mt-7.gap-4
                button.btn-primary( :disabled="loading") {{ t('save') }}
                button.btn-outline-primary(type="button" @click="$emit('close')") {{ t('cancel') }}
</template>

<script setup lang="ts">
import * as yup from "yup";
const localePath = useLocalePath();
const { t, locale } = useI18n();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { changePassword } = useSettings();
const loading = ref(false);
const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/'])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

const schema = yup.object({
  oldPassword: yup
    .string()
    .nullable()
    .notRequired()
    .when([], {
      is: () => user?.value?.hasPassword,
      then: () =>
        yup
          .string()
          .required()
          .matches(passwordRegex, t("strongPasswordValidation"))
          .label(t("currentPassword")),
    }),

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

const { resetForm, handleSubmit } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async function (values: any) {
  loading.value = true;
  const { message, success } = await changePassword({
    ...values,
    oldPassword: values?.oldPassword || undefined,
    confirmPassword: undefined,
  });
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    resetForm();
    navigateTo(localePath("/"));
  }
});
loading.value = false;
</script>

<style scoped></style>
