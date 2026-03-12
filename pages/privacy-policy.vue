<template lang="pug">
    Policy(policyTitle="PRIVACY_POLICY" :title="t('privacyPolicy')")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("privacyPolicyLeiaqa");
const seoDescription = t(
  "learnAboutOurPrivacyPolicyAndHowWeCollectUseAndProtectYourPersonalDataForASecureExperienceOnOurPlatform"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
});
</script>

<style scoped></style>
