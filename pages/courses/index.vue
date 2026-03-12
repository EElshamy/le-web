<template lang="pug">
    BasePage(:title="t('courses')" :subTitle="t('developYourSkillsInFitnessNutritionAndHealthThroughSpecializedScientificCoursesSupervisedByCertifiedExperts')")
      SectionProgram(id="courses" :hasLink="false" programType="course" :limit="12" :scrollHorizontalOnSmScreen="false" :filters="['categories', 'levels']" :sortable="true")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("liakasScientificCourses");
const seoDescription = t(
  "comprehensiveScientificCoursesInTheFieldsOfPublicWellnessNutritionAndPhysicalFitness",
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
});
</script>

<style scoped></style>
