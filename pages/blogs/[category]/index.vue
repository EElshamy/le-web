<template lang="pug">
    .app-container(class=" py-[24px] lg:pt-[64px] lg:pb-10")
        h1.heading-3 {{  locale === 'en' ? blogs?.[0]?.category?.enName : blogs?.[0]?.category?.arName  }}
    .app-container 
        div
            section(class="py-[24px] lg:py-12" v-if="blogs?.length") 
                //- .flex.justify-between.items-center
                    //- p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('courses') }}

                    //- NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/courses')")
                        span(class="hidden lg:block") {{ t('allCourses') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-5 md:grid-cols-2")
                    template(v-for="blog in blogs")
                        ProgramCard(:data="blog" :isBlog="true" class="flex-shrink-0 w-[250px] md:w-full")
            
            //- section(class="py-12" v-if="programs?.length") 
                    .flex.justify-between.items-center 
                        p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('programs') }}

                        NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/programs')")
                            span(class="hidden lg:block") {{ t('allPrograms') }}
                            IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                    .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                        template(v-for="program in programs")
                            ProgramCard(:data="program" class="flex-shrink-0 w-[250px] md:w-full")
            
            //- section(class="py-[24px] lg:py-12" v-if="lives?.length") 
                .flex.justify-between.items-center
                    p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('liveWorkshops') }}

                    NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/live-workshops')")
                        span(class="hidden lg:block") {{ t('allLives') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                    template(v-for="live in lives")
                        ProgramCard(:data="live" class="flex-shrink-0 w-[250px] md:w-full")
            
            //- section(class="py-12" v-if="tracks?.length") 
                .flex.justify-between.items-center 
                    p(class="label-prominent-1 lg:heading-5 max-w-[496px]") {{ t('tracks') }}

                    NuxtLink.flex.items-center(class="gap-[10px] hover:text-primary" :to="localePath('/paths')")
                        span(class="hidden lg:block") {{ t('allTracks') }}
                        IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")

                .gap-5.mt-7(class="flex overflow-x-scroll md:overflow-visible md:grid lg:grid-cols-3 md:grid-cols-2")
                    template(v-for="track in tracks")
                        DiplomaCard(:data="track"  class="flex-shrink-0 w-[250px] md:w-full")

        //- .flex.items-center.justify-center(v-else class="py-[140px]")
            AppEmptyData(:title="t('thereIsNoLearningProgramsCurrently')" :subTitle="t('newTrainingCoursesWillBeAddedSoonToHelpYouDevelopYourSkillsInVariousFields')")
                template(#icon)
                    IconEmptyPrograms
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getImageUrl } = usePhoto();
const route = useRoute();
const categorySlug = route.params.category as string;

const { getBlogs, blogs } = await useBlogs({ immediate: false });
await getBlogs(-1, true, { filter: { categorySlug } });
</script>

<style scoped></style>
