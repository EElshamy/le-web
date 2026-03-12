<template lang="pug">
    BasePage(:title="t('learningPrograms')" :subTitle="t('carefullyDesignedLearningPathsThatLeadYouOnAGradualStructuredJourneyFromTheBasicsToSpecializationThroughASetOfInterconnectedCoursesInTheFieldsOfFitnessNutritionAndHealth')")
        
        AppTabs.h-20(v-model="activeTab" :tabs class="f-mt-25-50 !f-gap-20-40" @change="handleChange")

        SectionProgram(v-if="!isPath" :programType="type" :id :limit :hasLink="false")
        SectionPath(v-else :id :limit="6" :hasLink="false")

</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const activeTab = ref((route.query.tab as string) || "courses");

const tabs = [
  { label: t("courses"), name: "courses" },
  { label: t("programs"), name: "programs" },
  { label: t("paths"), name: "paths" },
  { label: t("liveWorkshops"), name: "live-workshops" },
];

const isPath = computed(() => {
  if (activeTab.value === "paths") return true;
});

const type = computed(() => {
  switch (activeTab.value) {
    case "courses":
      return "course";
    case "programs":
      return "program";
    case "live-workshops":
      return "liveWorkshop";
  }
});

const id = computed(() => `${route.path}-${type.value || "paths"}`);

const limit = computed(() => {
  if (activeTab.value === "programs") return 6;
  return 12;
});
</script>

<style scoped></style>
