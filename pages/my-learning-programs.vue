<template lang="pug">
section(class="pt-[64px] h-[196px]")
    .app-container
        h1(class="heading-6 lg:heading-4") {{ t('myLearningJourney') }}
        AppTabs(:tabs="tabOptions" v-model="tab" class="mt-9")

.app-container(class="pt-[64px] pb-[180px]")
    div(v-if="tab === 'in-progress'")
      section(v-if="myInProgress?.length")
          h2.heading-6 {{ t('inProgress') }} ({{ myInProgress?.length }})
          .flex.flex-col.gap-9.mt-9
              template(v-for="program in myInProgress")
                  LearningProgramCard(:data="program")

          .mt-10.flex.justify-center(v-if="inProgressTotalPages > 1")
              AppPagination(v-model="inProgressPage" :totalPages="inProgressTotalPages")

      section.flex.items-center.justify-center.flex-col.gap-5(v-else)
        IconEmptyInProgress
        p.text-center(class="label-prominent-1 lg:heading-5 max-w-[424px]") {{ t('thereAreNoProgramsCurrentlyInProgress') }}
        p.text-center(class="max-w-[400px] body-4 lg:body-3") {{ t('exploreOurEducationalProgramsAndStartJoiningThemToBeginYourJourneyTowardsLearningAndDevelopment') }}
        NuxtLink.btn-primary(:to="localePath('/learning-programs')" class="label-prominent-3 lg:label-prominent-2") {{ t('exploreEducationalContent') }}

    div(v-else)
      section(v-if="myComplete?.length")
        h2.heading-6 {{ t('completed') }} ({{ myComplete?.length }})
        .flex.flex-col.gap-9.mt-9
          template(v-for="program in myComplete")
            template(v-for="item in program?.completedCourses" v-if="!program?.diploma")
              LearningProgramCard(:data="item")

            template(v-else)
              .flex.items-center.justify-between(class="lg:max-w-[700px]")
                p.text-primary.label-prominent-2.underline {{  locale === 'en' ? program?.diploma?.enTitle : program?.diploma?.arTitle  }}
                p.label-prominent-2 {{ program?.diploma?.progress?.completedProgramsCount }} / {{ program?.diploma?.progress?.totalProgramsCount }} {{ t('completed') }}
              template(v-for="nestedProgram in program?.completedCourses")
                LearningProgramCard(:data="nestedProgram")

        .mt-10.flex.justify-center(v-if="completeTotalPages > 1")
            AppPagination(v-model="completePage" :totalPages="completeTotalPages")

      section.flex.items-center.justify-center.flex-col.gap-5(v-else)
        IconEmptyPrograms
        p.text-center(class="label-prominent-1 lg:heading-5 max-w-[424px]") {{ t('youHaventCompletedAnyProgramsYet') }}
        p.text-center(class="max-w-[400px] body-4 lg:body-3") {{ t('completeYourLearningJourneyToTheEndAndGetYourAccreditedCertificatesYourAchievementStartsWithAStep') }}
        NuxtLink.btn-primary(:to="localePath('/learning-programs')" class="label-prominent-3 lg:label-prominent-2") {{ t('exploreEducationalContent') }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

const tab = ref<string>((route.query.tab as string) || "in-progress");

const tabOptions = [
{ label: t("inProgress"), name: "in-progress" },
{ label: t("completed"), name: "completed" },
];
const {
myInProgress,
page: inProgressPage,
totalPages: inProgressTotalPages
} = await useMyInProgress({ immediate: true });

const {
myComplete,
page: completePage,
totalPages: completeTotalPages
} = await useMyComplete({ immediate: true });

watch(tab, (newTab) => {
router.replace({ query: { ...route.query, tab: newTab } });
});
</script>

<style scoped></style>
