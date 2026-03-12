<template lang="pug">
section.flex.justify-center.items-center.app-container(class="py-[24px] md:py-[48px] lg:px-auto  bg-white")
  NuxtLink(:to="isArabic ? '/subscriptions' : '/en/subscriptions'" class="w-full h-full rounded-3 md:rounded-4 overflow-hidden"  loading="lazy" width="1500" height="500")
    NuxtImg(v-if="isArabic" src="/images/Vector2.jpg" format="webp" alt="ramadan offer" class="w-full h-auto object-cover aspect-[3/1] max-md:hidden" loading="lazy" width="1500" height="500" placeholder)
    NuxtImg(v-else src="/images/Vector.jpg" format="webp" alt="ramadan offer" class="w-full h-auto object-cover aspect-[3/1] max-md:hidden" loading="lazy" width="1500" height="500" placeholder)
    NuxtImg(v-if="isArabic" src="/images/ramadan-small.jpg" format="webp" alt="ramadan offer" class="w-full h-auto object-cover aspect-[3/1.3] md:hidden" loading="lazy" width="370" height="170" placeholder)
    NuxtImg(v-else src="/images/ramadan-small-en.jpg" format="webp" alt="ramadan offer" class="w-full h-auto object-cover aspect-[3/1.3] md:hidden" loading="lazy" width="370" height="170" placeholder)
  //- .flex.flex-col.gap-5.text-center.justify-center.items-center(class="px-[16px] lg: p-0")
  //-   h1(class="f-text-24-56 max-w-12em")
  //-     span {{ t('homeIntro') + ' '}}
  //-     span.text-secondary {{ t('homeIntroSubText') }}
  //-   p(class="f-text-14-20 max-w-30em fw-300 ") {{ t('BeginYourEducationalJourneyWithATeamOfExpertsAndProgramsTailoredToYourFitnessNutritionAndOverallHealthGoals') }}
  //-   .grid(class="w-full md:w-auto grid-cols-1 lg:grid-cols-2 items-center f-gap-6-12")
  //-     NuxtLink.btn-outline-primary.w-fit.mx-auto(:to="localePath('/learning-programs')"  class="!w-full md:w-auto  whitespace-nowrap f-text-14-20" prefetch-on="interaction") {{ t('explorePrograms') }}
  //-     NuxtLink.btn-primary.w-fit.mx-auto(:to="localePath('/subscriptions')"  class="!w-full md:w-auto  whitespace-nowrap f-text-14-20" prefetch-on="interaction") {{ t('exploreSubscriptions') }}
      
  //-     stay the same
  //-     NuxtLink.btn-primary.w-fit.mx-auto(:to="localePath('/subscriptions')" :class="{ 'col-span-2 !w-full md:!w-[400px]': isLoggedIn }" class="!w-full md:w-auto  whitespace-nowrap f-text-14-20" prefetch-on="interaction") {{ t('exploreSubscriptions') }}
.app-container
  //- pre {{course}}
  BaseSection(:title="t('latestCourses')" link="/courses" :linkTitle="t('allCourses')" :gridCols="4" :scrollHorizontalOnSmScreen="true" v-if="courses?.length")
    template(v-for="course, idx in courses" v-if="!loading")
      ProgramCard(:data="course" :preloadImg="idx === 0" :imgFetchPriority="idx === 0 ? 'high' : ''" class="flex-shrink-0 w-[250px] md:w-full" :imgLoading="idx > 4 ? 'lazy' : 'eager'")
    template(v-for="i in 12" :key="i" v-else)
      SkeletonTest
  BaseSection(:title="t('latestPrograms')" link="/programs" :linkTitle="t('allPrograms')" :gridCols="3" :scrollHorizontalOnSmScreen="true" v-if="programs?.length")
    template(v-for="workshop in programs?.slice(0, 3)" v-if="!loading")
      ProgramCard(:data="workshop" class="flex-shrink-0 w-[250px] md:w-full")
    template(v-for="i in 3" :key="i" v-else)
      SkeletonTest
  BaseSection(:title="t('latestTracks')" link="/paths" :linkTitle="t('allTracks')" :gridCols="2" :scrollHorizontalOnSmScreen="true" v-if="tracks?.length")
    template(v-for="track in tracks?.slice(0, 2)" v-if="!loading")
      DiplomaCard(:data="track" class="flex-shrink-0 w-[250px] md:w-full")
    template(v-for="i in 2" :key="i" v-else)
      SkeletonTest
  BaseSection(:title="t('latestSubscriptions')" link="/subscriptions" :linkTitle="t('allSubscriptions')" :gridCols="2" :scrollHorizontalOnSmScreen="true" v-if="subscriptionDiplomas?.length")
    template(v-for="subscreption in subscriptionDiplomas?.slice(0, 2)" v-if="!loading")
      DiplomaCard(:data="subscreption" class="flex-shrink-0 w-[250px] md:w-full" type="subscriptions")
    template(v-for="i in 2" :key="i" v-else)
      SkeletonTest
  section(class="f-pt-16-32 f-pb-12-24 lg:f-py-40-80" v-if="lecturers?.length")
      NuxtLink.flex.justify-between.items-center(:to="localePath('/lecturers')")
        h2(class="label-prominent-1 lg:heading-5 max-w-[387px]")
          span {{ t('experts') }}
        .flex.items-center(class="gap-[10px] hover:text-primary")
          span(class="hidden lg:block") {{ t('allExperts') }}
          IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")
      .gap-x-5.mt-7(class="flex overflow-x-scroll gap-y-[40px] scrollbar-hide md:overflow-visible md:grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2")
        template(v-for="lecturer in lecturers?.slice(0, 6)")
          ExpertCard(:data="lecturer" class="flex-shrink-0 md:w-full")

  LecturerBanner
  BaseSection(:title="t('latestArticles')" link="/blogs" :linkTitle="t('allBlogs')" :gridCols="5" :scrollHorizontalOnSmScreen="true" v-if="blogs?.length")
    template(v-for="blog in blogs?.slice(0, 10)" v-if="!loading")
      ProgramCard(:data="blog" :isBlog="true" class="flex-shrink-0 w-[250px] md:w-full")
    template(v-for="i in 10" :key="i" v-else)
      SkeletonTest
  SectionReviews

  
</template>

<script setup lang="ts">
import { SearchSpaceEnum } from "#gql/default";
const isArabic = computed(() => locale.value === "ar");
const { t, locale } = useI18n();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const userStore = useUserStore();
const { isLoggedIn, user } = storeToRefs(userStore);
const { getImageUrl } = usePhoto();
const categoriesSection = ref<HTMLElement | null>(null);
const imgs = ref<boolean[]>([]);
const loaded = computed(() => imgs.value.length >= 4);
const { slugify } = useSeo();
const baseUrl = "https://www.leiaqa.com";
const { courses, programs, tracks, lives, loading, subscriptionDiplomas } =
  useExplorePrograms();
const { activeCategory } = await getProgramsByCategories({ immediate: false });
const { categories } = await useCategories({ immediate: true });
const { lecturers, getLecturers } = await useLecturers({ immediate: false });
await getLecturers(4, false, { paginate: { page: 1, limit: 6 } });
const { blogs } = await useBlogs({ immediate: true });
const { stripHtml } = useFormatter();
const handleImageLoad = function () {
  imgs.value.push(true);
};

const handleCategoryNavigation = async function (category: any) {
  activeCategory.value = category;
  navigateTo(localePath(`/category/${slugify(category?.slug)}`));
};

const seoTitle = t(
  "leiaqaFirstArabicPlatformForLearningAboutWellnessNutritionAndFitness",
);

const seoDescription = t(
  "scientificCoursesAndTrainingProgramsCertifiedByAceOnTheFirstArabicPlatformSpecializedInTeachingFieldsOfNutritionWellnessAndPhysicalFitness",
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});

const publishedTime = "2023-01-01T08:00:00.000Z";
const modifiedTime = new Date().toISOString();
// useSchemaOrg([
//   {
//     "@type": "WebPage",
//     '@id': isArabic.value
//       ? 'https://leiaqa.com/#webpage'
//       : 'https://leiaqa.com/en#webpage',
//     url: isArabic.value
//       ? 'https://leiaqa.com/'
//       : 'https://leiaqa.com/en',
//     name: seoTitle,
//       description: seoDescription,
//     inLanguage: isArabic.value ? 'ar' : 'en',
//     isPartOf: { '@id': 'https://leiaqa.com/#website' },
//     about: { '@id': 'https://leiaqa.com/#organization' },
//     datePublished: publishedTime,
//     dateModified: modifiedTime,
//     primaryImageOfPage: {
//       '@type': 'ImageObject',
//       '@id': isArabic.value
//         ? 'https://leiaqa.com/#homepage-image'
//         : 'https://leiaqa.com/en#homepage-image',
//       url: 'https://leiaqa.com/share.jpg',
//       width: 1200,
//       height: 630,
//       caption: isArabic.value ? 'لياقة – الصفحة الرئيسية' : 'Leiaqa - Home page',
//     },
// hasPart: [
// {
//     '@type': 'ItemList',
//     name: t('latestCourses'),
//     itemListElement: courses.value?.slice(0, 5).map((course, index) => ({
//       '@type': 'ListItem',
//       position: index + 1,
//       item: {
//         '@type': 'Course',
//         name: isArabic.value ? course?.enTitle : course?.arTitle,
//         description:
//           isArabic.value
//             ? course?.courseDetail?.enSummary
//             : course?.courseDetail?.arSummary,
//         url: `${baseUrl}${localePath('/courses/' + course.slug)}`,
//         image: useRuntimeConfig().public.BASE_URL + course.thumbnail,
//         provider: {
//           '@type': 'Organization',
//           name: 'Leiaqa'
//         }
//       }
//     })) || []
//   },
//   {
//     '@type': 'ItemList',
//     name: t('experts'),
//     itemListElement: lecturers.value?.slice(0, 6).map((lecturer, index) => ({
//       '@type': 'ListItem',
//       position: index + 1,
//       item: {
//         '@type': 'Person',
//         name: isArabic.value ? lecturer?.user?.enFullName : lecturer?.user?.arFullName,
//         image: useRuntimeConfig().public.BASE_URL + lecturer?.user?.profilePicture,
//         jobTitle: isArabic.value ? lecturer?.jobTitle?.enName : lecturer?.jobTitle?.arName || 'Instructor',
//         url: `${baseUrl}${localePath('/lecturers/' + lecturer.slug)}`,
//         worksFor: {
//           '@type': 'Organization',
//           name: 'Leiaqa'
//         }
//       }
//     })) || []
//   },
// ]
// },
// {
//   '@type': 'Blog',
//   '@id': 'https://leiaqa.com/#blog',
//   name: 'Leiaqa Blog',
//   alternateName: 'مدونة التطمئن',
//   url: 'https://leiaqa.com/blog',
//   isPartOf: { '@id': 'https://leiaqa.com/#website' },
//   publisher: { '@id': 'https://leiaqa.com/#organization' }
// }
// ])
</script>

<style scoped>
@keyframes shimmer {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.shimmer-animation {
  animation: shimmer 1.3s infinite;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
