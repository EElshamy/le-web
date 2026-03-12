<template lang="pug">
    BasePage(:title="t('tracks')" :subTitle="t('carefullyDesignedLearningPathsThatLeadYouOnAGradualStructuredJourneyFromTheBasicsToSpecializationThroughASetOfInterconnectedCoursesInTheFieldsOfFitnessNutritionAndHealth')") 
      SectionPath(id="paths" :hasLink="false" :limit="12" :filters="['categories', 'levels']" :sortable="true")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("leiaqasIntegratedPaths");
const seoDescription = t(
  "aVarietyOfEducationalCoursesAndTrainingProgramsInCustomizedPackagesWhetherYoureABeginnerOrAProfessionalYoullFindThePerfectPathThatSuitsYourGoals"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
