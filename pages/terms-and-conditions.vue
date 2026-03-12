<template lang="pug">
    Policy(policyTitle="TERMS_AND_CONDITIONS" :title="t('termsAndConditions')")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("termsAndConditionsLeiaqa");
const seoDescription = t(
  "learnAboutYourRightsAndResponsibilitiesContentUsagePoliciesAndPlatformConductRulesToEnsureASafeUserExperience"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
