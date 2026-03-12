<template lang="pug">
    BasePage(:title="t('blog')" :subTitle="t('keepUpWithTheLatestInTheWorldOfSportsAndNutrition')") 
      SectionBlog(id="blog" :hasLink="false" :limit="30" :hasFilter="true" :filters="['blogCategories']" :sortable="true")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const seoTitle = t("leiaqaBlog");
const seoDescription = t(
  "learnAboutHealthyHabitsAndTheBestSportsPracticesThroughTipsFromLeiaqasCertifiedExperts"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
