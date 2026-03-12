<template lang="pug">
    Policy(policyTitle="PAYMENT_POLICY" :title="t('paymentPolicy')")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("paymentPolicyLeiaqa");
const seoDescription = t(
  "learnAboutPaymentMethodsForPurchasingCoursesAndTrainingProgramsEnsuringAllYourTransactionsAreProtectedOnOurPlatform"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
