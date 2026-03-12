<template lang="pug">
    .app-container(class=" py-[24px] lg:pt-[64px] lg:pb-10")
        h1.heading-3 {{  activeCategory?.localizedName }}
    .app-container
        div(v-if="courses?.length || programs?.length || tracks?.length")
            section(class="py-[24px] lg:py-12" v-if="courses?.length")
                .flex.justify-between.items-center
                    p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('courses') }}

                    NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/courses')" v-if="courses?.length > 3")
                        span(class="hidden lg:block") {{ t('allCourses') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                    template(v-for="course in courses")
                        ProgramCard(:data="course" class="flex-shrink-0 w-[250px] md:w-full")

            section(class="py-12" v-if="programs?.length")
                    .flex.justify-between.items-center
                        p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('programs') }}

                        NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/programs')" v-if="programs?.length > 3")
                            span(class="hidden lg:block") {{ t('allPrograms') }}
                            IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                    .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                        template(v-for="program in programs")
                            ProgramCard(:data="program" class="flex-shrink-0 w-[250px] md:w-full")

            section(class="py-[24px] lg:py-12" v-if="lives?.length")
                .flex.justify-between.items-center
                    p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{t('liveWorkshops') }}

                    NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/live-workshops')" v-if="lives?.length > 3")
                        span(class="hidden lg:block") {{ t('allLives') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                    template(v-for="live in lives")
                        ProgramCard(:data="live" class="flex-shrink-0 w-[250px] md:w-full")

            section(class="py-12" v-if="tracks?.length")
                .flex.justify-between.items-center
                    p(class="label-prominent-1 lg:heading-5 max-w-[496px]") {{ t('tracks') }}

                    NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/paths')" v-if="tracks?.length > 3")
                        span(class="hidden lg:block") {{ t('allTracks') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-3 md:grid-cols-2")
                    template(v-for="track in tracks")
                        DiplomaCard(:data="track"  class="flex-shrink-0 w-[250px] md:w-full")
            section(class="py-12" v-if="subscriptionDiplomas?.length")
                .flex.justify-between.items-center
                    p(class="label-prominent-1 lg:heading-5 max-w-[496px]") {{ t('subscriptions') }}

                    NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/subscriptions')" v-if="subscriptionDiplomas?.length > 3")
                        span(class="hidden lg:block") {{ subscriptionDiplomas?.length < 4 ? '' : t('allSubscriptions') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                    template(v-for="subscription in subscriptionDiplomas")
                        DiplomaCard(:data="subscription"  class="flex-shrink-0 w-[250px] md:w-full"  type="subscriptions")

        .flex.items-center.justify-center(v-else class="py-[140px]")
            AppEmptyData(:title="t('thereIsNoLearningProgramsCurrently')" :subTitle="t('newTrainingCoursesWillBeAddedSoonToHelpYouDevelopYourSkillsInVariousFields')")
                template(#icon)
                    IconEmptyPrograms
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getImageUrl } = usePhoto();

const {
  courses,
  programs,
  lives,
  tracks,
  activeCategory,
  subscriptionDiplomas,
  getLearningProgramsByCategory,
} = await getProgramsByCategories({ immediate: true, grabIdFromRoute: true });
console.log("courses", courses.value);
console.log("subscriptionDiplomas", subscriptionDiplomas.value);

const seoTitle = computed(() =>
  locale.value === "en"
    ? activeCategory.value?.enName
    : activeCategory.value?.arName,
);

const seoPreviewImg = computed(() => activeCategory?.value?.image);

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  ogImage: getImageUrl(seoPreviewImg.value),
});
</script>

<style scoped></style>
