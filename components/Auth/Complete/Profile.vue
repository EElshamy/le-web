<template lang="pug">
    AppModal(v-model="model" v-if="model"  customStyle="w-full lg:w-[480px] h-fit" :showActions="false")
        .flex.items-center.justify-center(class="p-[24px]")
            .flex.flex-col.gap-4.text-center.items-center
                div(class="f-w-100-126")
                  TheLogo
                p.label-prominent-2 {{ t('completeProfile') }}
        form.space-y-5(@submit.prevent="onSubmit")
            InputText(name="firstName" type="text" class="text-start" :label="t('firstName')" :placeholder="t('enterYourFirstName')" :value="data?.firstName")
            InputText(name="lastName" type="text" class="text-start" :label="t('lastName')" :placeholder="t('enterYourLastName')" :value="data?.lastName")
            InputText(name="email" type="email" class="text-start" :label="t('email')" :placeholder="t('enterYourEmail')" :value="data?.email" :disabled="data?.email")
            InputPhone(name="phone" class="text-start" :label="t('phoneNumber')")


            div(class="pb-[24px] mt-[24px]")
              button(class="btn-primary col-span-1 w-full" type="submit")
                  IconLoading(v-if="loading" class="animate-spin w-4 h-4")
                  span {{ t('save') }}

</template>

<script setup lang="ts">
import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";
const { t, locale } = useI18n();

const model = defineModel();
const props = defineProps<{
  data: any;
  loading: boolean;
}>();
const emit = defineEmits(["submit"]);

if (!yup.string().phone) {
  yup.addMethod(yup.string, "phone", function () {
    return this.test("phone", t("invalidPhoneNumber"), function (value) {
      if (!value) return true;
      return isValidPhoneNumber(value);
    });
  });
}

const schema = yup.object({
  firstName: yup.string().required().label(t("firstName")),
  lastName: yup.string().required().label(t("lastName")),
  email: yup.string().required().label(t("email")),
  phone: yup.string().phone().label(t("phoneNumber")),
});

const { values, errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values: any) => {
  emit("submit", values);
});
</script>

<style scoped></style>
