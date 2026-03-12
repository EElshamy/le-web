<template lang="pug">
    Form.w-full(:validation-schema="schema" @submit="handleSubmit")
        p.label-prominent-1 {{ t('name') }}
        .flex.flex-col.gap-2.mt-7
            .grid.grid-cols-2.gap-2
                InputText(name="arFirstName" :value="user?.arFirstName" :label="t('firstNameInArabic')")
                InputText(name="arLastName" :value="user?.arLastName" :label="t('lastNameInArabic')")
            .grid.grid-cols-2.gap-2.mt-6
                InputText(name="firstName" :value="user?.firstName" :label="t('firstNameInEnglish')")
                InputText(name="lastName" :value="user?.lastName" :label="t('lastNameInEnglish')")
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

// ASK MAHER: Shall we put all regex in utils file and import them ?
// -> shall we add those rules in a utils file so then we have one file which is applicable for any project and make it easier to
// add test cases and testing functions
const englishRegex = /^[A-Za-z ]+$/;
const arabicRegex =
  /^[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FF ]+$/;

// Test regex
const testRegex = function (
  regex: RegExp,
  testCases: { value: string; status: boolean }[]
) {
  console.log(`---- Testing started for ${regex} ----`);
  testCases.forEach((testCase, idx) => {
    console.log(`#${idx} - ${testCase?.value}`, regex.test(testCase?.value));
  });
  console.log(`---- Test ended ----`);
};

// Test english regex
testRegex(englishRegex, [
  { value: "Adham", status: true },
  { value: "Adham Saleh", status: true },
  { value: "Adham123", status: false },
  { value: "Adhاشا", status: false },
  { value: "أدهم", status: false },
]);

const schema = yup.object({
  firstName: yup
    .string()
    .required()
    .matches(englishRegex, t("firstNameMustBeInEnglish"))
    .min(2)
    .max(25)
    .label(t("firstNameInEnglish")),
  lastName: yup
    .string()
    .required()
    .matches(englishRegex, t("firstNameMustBeInEnglish"))
    .min(2)
    .max(25)
    .label(t("lastNameInEnglish")),
  arFirstName: yup
    .string()
    .required()
    .matches(arabicRegex, t("firstNameMustBeInArabic"))
    .min(2)
    .max(25)
    .label(t("firstNameInArabic")),
  arLastName: yup
    .string()
    .required()
    .matches(arabicRegex, t("firstNameMustBeInArabic"))
    .min(2)
    .max(25)
    .label(t("lastNameInArabic")),
});

const handleSubmit = function (values: any) {
  emit("submit", values);
};
</script>

<style scoped></style>
