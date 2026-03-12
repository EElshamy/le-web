<template lang="pug">
    BasePage(:title="t('programs')" :subTitle="t('aceCertifiedTrainingProgramsAimToPrepareThoseInterestedInFitnessAndHealthThroughReliableScientificContentAndTheSupervisionOfSpecializedExperts')")
      SectionProgram(id="programs" :hasLink="false" programType="program" :limit="12" :scrollHorizontalOnSmScreen="false" :filters="['categories', 'levels']" :sortable="true")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("leiaqasEducationalPrograms");
const seoDescription = t(
  "aceCertifiedProgramsThatCombineScientificKnowledgeAndPracticalSkillsLedBySpecializedExperts",
);
console.log("seoTitle", seoDescription);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
