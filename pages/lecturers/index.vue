<template lang="pug">
    .app-container(class="py-[24px] lg:py-12")
        div.text-center.flex.flex-col.items-center
            h1(class="heading-6 lg:heading-2") {{ t('trustedExperience') }}
                //- span {{ t('trusted') + ' ' }}
                //- span {{ t('experiences') }}
            p(class="w-full lg:w-[468px] mt-6 text-center label-prominent-2 lg:label-prominent-1") {{ t('meetOurEliteTeamOfCertifiedFitnessNutritionAndHealthExperts') }}

            section(class="py-12" v-if="data?.items?.length" )
              .gap-12.mt-7(class="grid grid-cols-2 place-items-center xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2")
                  template(v-for="lecturer in data?.items")
                      ExpertCard(:data="lecturer" class="md:w-full lg:min-w-[260px] lg:max-w-[260px]")
              .flex.items-center.justify-center.w-full.mt-8(v-if="data?.items?.length && data?.pageInfo?.totalPages > 1")
                AppPagination(v-model="activePage" :totalPages="data?.pageInfo?.totalPages")
        LecturerBanner
        //- section(class="pt-[24px] lg:pt-[32px] pb-[24px] lg:py-12 flex items-center justify-center")
          div(class="bg-secondary-500 py-[24px] px-[40px] rounded-[8px] flex justify-center items-center w-full h-[356px] overflow-hidden relative lg:rounded-[24px] lg:py-auto lg:px-auto")
            .flex.flex-col.items-center.justify-center(class="gap-[16px] max-w-[420px] text-center")
              h1(class="heading-4 text-white") {{ t('joinAsAnInstructor') }}
              p(class="body-3 text-white") {{ t('IfYourePassionateAboutFitnessAndDrivenToInspireJoinLeiaqaAsAnInstructorAndHelpCreateRealLastingImpact') }}
              button.btn-primary(class="rounded-[6px] mt-3 px-[16px] py-[11px]" @click="navigateTo(localePath('/join-as-lecturer'))") {{ t('joinUsNow') }}
            NuxtImg(src="/images/dumbbellsLeft.png" loading="lazy" class="max-w-[248px] hidden lg:block absolute top-[38px] left-[1065px]")
            NuxtImg(src="/images/dumbbellsRight.png" loading="lazy" class="max-w-[266px] hidden lg:block absolute top-[147px] left-[76px]")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { activePage } = usePagination();
const seoTitle = t("leiaqasCertifiedExperts");
const seoDescription = t(
  "learnAboutOurCertifiedExpertsInPhysicalFitnessPublicWellnessAndIntegratedNutrition"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});

const limit = ref(12)
const page = ref(1)
const { data, execute, status, pending } = await useAsyncData(
  `lecturers-${page.value}-${limit.value}`,
  () =>
  GqlLecturers({
      paginate: {
        limit: limit.value,
        page: activePage.value,
      },
    }),
    {
    transform: (data) => data?.lecturers?.data,
    watch: [activePage],
  }
);

</script>

<style scoped></style>
