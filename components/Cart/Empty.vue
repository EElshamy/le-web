<template lang="pug">
    .flex.items-center.gap-7(class="flex-col lg:flex-row")
        IconShopping 
        .flex.flex-col.gap-3(class="text-center lg:text-start")
            p.heading-6 {{ t('shoppingCartIsEmpty') }}
            p(class="body-4 lg:body-3") {{ t('startYourEducationalJourneyAndChooseTheCoursesProgramsAndTracksThatSuitYou') }}
            NuxtLink.btn-primary(class="lg:hidden label-prominent-3" :to="localePath('/learning-programs')") {{ t('exploreLearningPrograms') }}
    
    //- Courses
    BaseSection(v-if="courses?.length" class="!pb-0 hidden lg:block" :title="t('coursesSuggestedForYou')" link="/courses" :linkTitle="t('allCourses')" :gridCols="4" :scrollHorizontalOnSmScreen="true")
        template(v-for="course in courses" v-if="!loading")
            ProgramCard(:data="course" class="flex-shrink-0 w-[250px] md:w-full")
        template(v-for="i in 12" :key="i" v-else) 
            SkeletonTest
    
    //- Programs
    BaseSection(v-if="programs?.length" class="!pb-0 hidden lg:block" :title="t('latestPrograms')" link="/programs" :linkTitle="t('allPrograms')" :gridCols="3" :scrollHorizontalOnSmScreen="true")
        template(v-for="workshop in programs?.slice(0, 3)" v-if="!loading")
            ProgramCard(:data="workshop" class="flex-shrink-0 w-[250px] md:w-full")
        template(v-for="i in 3" :key="i" v-else)
            SkeletonTest

    //- Paths
    BaseSection(v-if="tracks?.length" class="!pb-0 hidden lg:block" :title="t('integratedEducationalPaths')" link="/paths" :linkTitle="t('allTracks')" :gridCols="2" :scrollHorizontalOnSmScreen="true")
        template(v-for="track in tracks?.slice(0, 2)" v-if="!loading")
            DiplomaCard(:data="track" class="flex-shrink-0 w-[250px] md:w-full")
        template(v-for="i in 2" :key="i" v-else) 
            SkeletonTest
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { programs: courses } = await usePopularCourses({ immediate: true });
const { getPrograms, programs: workshops } = await usePrograms({
  immediate: false,
});
await getPrograms(4, false, { filter: { type: "WORKSHOP" } });
const { tracks } = await useTracks({ immediate: true });
</script>

<style scoped></style>
