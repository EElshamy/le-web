<template lang="pug">
    .app-container
        section(class="py-[24px] lg:py-12 flex justify-center items-center")
            div(class="bg-secondary-500 flex justify-center items-center w-full h-[132px] lg:h-[356px] rounded-[24px] overflow-hidden relative")
              //- left-[850px]
              //- left-[40px]
              NuxtImg(src="/images/dumbbellsLeft.png" alt="dumble" format="webp" class="max-w-[248px] 2xl:block hidden absolute top-[55px] left-[1000px]")
              NuxtImg(src="/images/dumbbellsRight.png" alt="dumble" format="webp" class="max-w-[266px] hidden 2xl:block absolute top-[150px] left-[200px]")

            ExpertCard(class="absolute" :data="lecturer" :viewProgramsCount="true" avatarClass="border-[6px] rounded-full border-white !w-[88px] lg:!w-[170px]" class="top-[180px] lg:top-[370px]")

        section(class="py-10 mt-[150px]")
              .flex.flex-col.gap-6
                  p(class="label-prominent-1 lg:heading-5") {{ t('aboutMe') }}
                  div(class="w-full lg:max-w-[800px]")
                    div(v-html="locale === 'en' ? lecturer?.enBio : lecturer?.arBio" class="content-area lecturerPage break-words whitespace-pre-wrap max-w-none [&_code]:whitespace-pre-wrap [&_code]:break-words" )

        div(v-if="!courses?.length && !programs?.length && !tracks?.length && !blogs?.length && !subscriptions?.length")
          .flex.items-center.justify-center(class="py-[200px]")
            AppEmptyData(:title="t('hello')" :subTitle="t('wereWorkingOnUniqueTrainingContentItWillBeAvailableShortly')")
              template(#icon)
                IconEmptyPrograms
        div(v-else class="pb-[120px]")

          section(id="courses-section"  class="py-12" v-if="courses?.length")
              .flex.justify-between.items-center
                  p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('courses') }}

              .mt-7(class="flex overflow-x-scroll gap-x-[40px] gap-y-[48px] md:grid md:overflow-visible lg:grid-cols-4 md:grid-cols-2")
                  template(v-for="course in courses")
                      ProgramCard(:data="course" class="flex-shrink-0 w-[250px] md:w-full")

          section(id="programs-section" class="py-12" v-if="programs?.length")
              .flex.justify-between.items-center
                  p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('programs') }}

              .mt-7(class="flex overflow-x-scroll gap-x-[40px] gap-y-[48px] md:grid md:overflow-visible lg:grid-cols-3 md:grid-cols-2")
                  template(v-for="program in programs")
                      ProgramCard(:data="program" class="flex-shrink-0 w-[250px] md:w-full")

          section(id="live-workshops-section" class="pt-[32px] pb-[24px] lg:py-12" v-if="lives?.length")
            .flex.justify-between.items-center
                p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('liveWorkshops') }}
            .mt-7(class="flex overflow-x-scroll scrollbar-hide gap-x-[40px] gap-y-[48px] md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                template(v-for="live in lives")
                    ProgramCard(:data="live" class="flex-shrink-0 w-[250px] md:w-full")

          section(id="tracks-section"  class="py-12" v-if="paths?.length")
              .flex.justify-between.items-center
                  p(class="label-prominent-1 lg:heading-5 max-w-[496px]") {{ t('tracks') }}

              .mt-7(class="flex overflow-x-scroll gap-x-[40px] gap-y-[48px] md:grid gap-x-[40px] lg:grid-cols-2 md:grid-cols-2")
                  template(v-for="path in paths")
                      DiplomaCard(:data="path"  class="flex-shrink-0 w-[250px] md:w-full")
          section(id="subscriptions-section"  class="py-12" v-if="subscriptions?.length")
              .flex.justify-between.items-center
                  p(class="label-prominent-1 lg:heading-5 max-w-[496px]") {{ t('subscriptions') }}

              .mt-7(class="flex overflow-x-scroll gap-x-[40px] gap-y-[48px] md:grid gap-x-[40px] lg:grid-cols-2 md:grid-cols-2")
                  template(v-for="subscription in subscriptions")
                      DiplomaCard(:data="subscription"  class="flex-shrink-0 w-[250px] md:w-full"  type="subscriptions")

          section(class="pt-12 pb-[120px]" v-if="blogs?.length")
            .flex.justify-between.items-center
                p(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ t('articles') }}

            .mt-7(class="flex overflow-x-scroll gap-x-[40px] gap-y-[48px] scrollbar-hide md:overflow-visible md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2")
                template(v-for="blog in blogs")
                    ProgramCard(:data="blog" :isBlog="true" class="flex-shrink-0 w-[250px] md:w-full")

</template>

<script setup lang="ts">
import { SearchSpaceEnum } from "#gql/default";

const { t, locale } = useI18n();
const { getImageUrl } = usePhoto();
const { stripHtml } = useFormatter();
const route = useRoute();
const id = route.params.id as string;
const config = useRuntimeConfig();

const {
  getLecturer,
  lecturer,
  courses,
  programs,
  paths,
  lives,
  subscriptions,
} = await useLecturer({
  immediate: true,
  grabIdFromRoute: true,
});
const { blogs, getBlogs } = await useBlogs({ immediate: false });
await getBlogs(4, false, { filter: { lecturerId: lecturer?.value?.id } });

const seoTitle = computed(() =>
  locale.value === "en"
    ? lecturer?.value?.user?.enFullName
    : lecturer?.value?.user?.arFullName,
);
const seoDescription = computed(() => stripHtml(lecturer?.value?.bio));

useSeoMeta({
  title: seoTitle.value,
  description: seoDescription.value,
  ogTitle: seoTitle.value,
  ogDescription: seoDescription.value,
  ogImage: getImageUrl(lecturer?.value?.user?.profilePicture),
});

useSchemaOrg([
  definePerson({
    name:
      locale.value === "en"
        ? lecturer?.value?.user?.enFullName
        : lecturer?.value?.user?.arFullName,
    description: seoDescription,
    sameAs: [
      lecturer?.value?.instagramUrl,
      lecturer?.value?.linkedInUrl,
      lecturer?.value?.facebookUrl,
    ],
    image: getImageUrl(lecturer?.value?.user?.profilePicture),
    url:
      config.public.APP_BASE_URL + `lecturers/${lecturer?.value?.user?.slug}`,
  }),
]);
</script>

<style lang="scss">
.lecturerPage {
  p {
    text-align: start !important;
  }
}
</style>
