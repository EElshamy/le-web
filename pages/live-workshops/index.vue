<template lang="pug">
    BasePage(:title="t('liveWorkshops')" :subTitle="t('joinLeiaqasCommunityInOurInteractiveWorkshopsAndDiscoverTheSessionScheduleThatSuitsYou')")
      SectionProgram(id="lives" :hasLink="false" programType="liveWorkshop" :limit="12" :scrollHorizontalOnSmScreen="false" :filters="['categories', 'levels']" :sortable="true")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("leiaqaLiveWorkshops");
const seoDescription = t(
  "joinLeiaqasInteractiveWorkshopsAndGetTheBestExercisesAndTipsForYourFitnessAtHome"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
