<template lang="pug">
    Form.w-full(:validation-schema="schema" @submit="handelSubmit")
        p.label-prominent-1 {{ t('phoneNumber') }}
        InputPhone.mt-7(name="phone" :value="user?.phone" @validphone="val=> validPhone = val" :label="t('phoneNumber')")
        .flex.items-center.mt-2.mt-7.gap-4 
            button.btn-primary {{ t('save') }}
            button.btn-outline-primary(type="button" @click="$emit('close')") {{ t('cancel') }}
</template>

<script setup lang="ts">
import * as yup from "yup";

const { t, locale } = useI18n();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const validPhone = ref();
const emit = defineEmits(["close", "submit"]);

const schema = yup.object({
  phone: yup
    .string()
    .required()
    .test("Phone number", t("invalidPhone"), function (value: any) {
      return validPhone.value ? true : false;
    })
    .label(t("phoneNumber")),
});

const handelSubmit = function (values: any) {
  emit("submit", values);
};
</script>

<style scoped></style>
