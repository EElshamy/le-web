<template lang="pug">
    Form.w-full(:validation-schema="schema" @submit="handelSubmit")
        p.label-prominent-1 {{ t('email') }}
        InputText.mt-7(name="email" type="email" :value="user?.email" :label="t('email')")
        InputText(name="password" class="mt-2" type="password" :label="t('password')")
        .flex.items-center.mt-2.mt-7.gap-4 
            button.btn-primary {{ t('save') }}
            button.btn-outline-primary(type="button" @click="$emit('close')") {{ t('cancel') }}
</template>

<script setup lang="ts">
import * as yup from "yup";

const { t, locale } = useI18n();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const emit = defineEmits(["close", "submit"]);

const schema = yup.object({
  email: yup.string().required().email().label(t("email")),
  password: yup.string().required().label(t("password")),
});

const handelSubmit = function (values: any) {
  emit("submit", values);
};
</script>

<style scoped></style>
