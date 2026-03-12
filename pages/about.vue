<template lang="pug">
    //- div(class="bg-contain bg-no-repeat bg-center w-full h-[600px]" :class="[`bg-[url('/images/about/main-${locale}.png')]`]")

    section(class="bg-primary") 
        .app-container 
            .grid.items-center(class="py-[48px] lg:py-0 grid-cols-1 lg:grid-cols-4")
                .col-span-2
                    .flex.flex-col.gap-7(class="w-full lg:max-w-[558px] py-[24px] lg:py-0 text-white")
                        p(class="label-prominent-2 lg:label-prominent-1") {{ t('aboutLeiaqa') }}
                        p(class="heading-6 lg:heading-4") {{ t('theFirstArabicPlatformSpecializedInTeachingNutritionPublicWellnessAndPhysicalFitness') }}
                        p(class="body-3 lg:body-2") {{ t('weOfferReliableScientificCoursesInArabicSupervisedByAnEliteGroupOfAcademicExpertsAndCertifiedTrainersWhoCombineKnowledgeWithPracticalExperience') }}
                .col-span-2(class="hidden lg:block")
                    div
                        NuxtImg(:src="`/images/about/${locale}.png`" alt="athlete" format="webp" width="631" height="567" preload)

    .app-container(class="pt-12 pb-11")
        h1(class="heading-6 lg:heading-4") {{ t('whyLeiaqa') }}
        .gap-7(class="mt-8 grid grid-cols-2 lg:grid-cols-4")
            div(class="flex flex-col p-[24px] gap-8 bg-[#FFF6F0] rounded-[16px] hover:scale-101 transition duration-300 ease-in-out") 
                IconAboutCheck
                p(class="label-prominent-3 lg:heading-6 max-w-[240px]") {{ t('variedEducationalContent') }}
            div(class="flex flex-col p-[24px] gap-8 bg-[#FFF6F0] rounded-[16px] hover:scale-101 transition duration-300 ease-in-out") 
                IconAboutCheck
                p(class="label-prominent-3 lg:heading-6 max-w-[240px]") {{ t('extensiveTopicCoverage') }}
            div(class="flex flex-col p-[24px] gap-8 bg-[#FFF6F0] rounded-[16px] hover:scale-101 transition duration-300 ease-in-out") 
                IconAboutCheck
                p(class="label-prominent-3 lg:heading-6 max-w-[240px]") {{ t('premiumArabicContent') }}
            div(class="flex flex-col p-[24px] gap-8 bg-[#FFF6F0] rounded-[16px] hover:scale-101 transition duration-300 ease-in-out") 
                IconAboutCheck
                p(class="label-prominent-3 lg:heading-6 max-w-[240px]") {{ t('reliableAndCertifiedContent') }}
    
    .app-container(class="py-11") 
        .grid(class="lg:grid-cols-2 gap-5 lg:gap-0")
            .flex.flex-col(class="gap-[24px]") 
                p(class="heading-6 lg:heading-4") {{ t('ourVision') }}
                p(class="body-3 lg:body-2 max-w-[541px]") {{ t('vision') }}
            .flex.flex-col(class="gap-[24px]") 
                p(class="heading-6 lg:heading-4") {{ t('ourMission') }}
                p(class="body-3 lg:body-2 max-w-[541px]") {{ t('mission') }}

    .app-container
        section(class="py-12" v-if="lecturers?.length") 
                .flex.justify-between.items-center 
                    p(class="label-prominent-1 lg:heading-5 max-w-[387px]") 
                        span {{ t('learnAboutExperiences') + ' ' }}
                        span.text-secondary {{ t('inspireYourJourney') }}
                    
                    NuxtLink.btn-link.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/lecturers')")
                        span(class="hidden lg:block") {{ t('allExperts') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")
                .gap-5.mt-7(class="flex overflow-x-scroll md:grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2")
                    template(v-for="lecturer in lecturers?.slice(0, 6)")
                        ExpertCard(:data="lecturer" class="flex-shrink-0 md:w-full")
        LecturerBanner
        //- .app-container.flex.items-center.justify-center
            section(class="py-12 flex w-[1150px] justify-center items-center") 
                div(class="bg-secondary-500 flex justify-center items-center w-full h-[300px] rounded-[24px] overflow-hidden relative")
                    .flex.flex-col.items-center.justify-center(class="gap-[16px] max-w-[420px] text-center")
                        h1(class="text-[40px] font-400 text-white") {{ t('joinAsAnInstructor') }}
                        p(class="text0[16px] font-300 text-white") {{ t('IfYourePassionateAboutFitnessAndDrivenToInspireJoinLeiaqaAsAnInstructorAndHelpCreateRealLastingImpact') }}
                        button.btn-primary(class="rounded-[6px] mt-3 px-[16px] py-[11px]" @click="navigateTo(localePath('/join-as-lecturer'))") {{ t('joinUsNow') }}
                    NuxtImg(src="/images/dumbbellsLeft.png" class="max-w-[248px] hidden lg:block absolute top-[38px] left-[800px]")
                    NuxtImg(src="/images/dumbbellsRight.png" class="max-w-[266px] hidden lg:block absolute top-[147px] left-[76px]")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { lecturers, getLecturers } = await useLecturers({ immediate: true });
await getLecturers(4, false, { paginate: { page: 1, limit: 6 } });

const seoTitle = t("aboutLeiaqa");
const seoDescription = t(
  "learnAboutLeiaqasVisionAndMissionToSpreadAHealthyLifestyleInTheArabWorld"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
