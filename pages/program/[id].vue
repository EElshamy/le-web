<template lang="pug">
    section(class="bg-[#F8F5F3] pt-[24px] lg:pt-[64px] pb-[80px]")
        .app-container.relative
            .breadcrumb.flex.lime-clamp-1.gap-2.items-center(class="text-[14px] font-300")
                NuxtLink(to="/"): IconHome
                IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180")
                NuxtLink(:to="localePath(breadCrumbNavigation)") {{ program?.type === 'COURSE' ? program?.isLiveCourse ? t('liveWorkshops') : t('courses') : t('programs') }}
                IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180")
                p(class="text-[14px] font-400 text-black whitespace-nowrap truncate") {{ locale === 'en' ? program?.enTitle : program?.arTitle }}

            .main-program-content(class="mt-[24px] lg:mt-[64px] flex justify-between flex-col lg:flex-row ")
                .flex.flex-col.gap-7(class="w-full lg:max-w-50%")
                    h1(class="text-[40px]") {{ (locale === 'en' ? program?.enTitle : program?.arTitle) }}
                    p(class="text-[20px] font-300")  {{ locale === 'en' ? program?.courseDetail?.enSummary :  program?.courseDetail?.arSummary }}
                    .flex.items-center(class="gap-[16px] flex-wrap")
                        LecturerAvatars(:lecturers="program?.users" @scrollToLecturers="handleScrollIntoLecturersSection")
                        //- NuxtLink(:to="localePath(`/lecturers/${program?.users?.[0]?.lecturer?.id}`)"): AppAvatar(:src="getImageUrl(program?.users?.[0]?.profilePicture)" class="size-[32px]" :label="locale === 'en' ? program?.users?.[0]?.enFullName : program?.users?.[0]?.arFullName")

                        NuxtLink.flex.items-center(:to="localePath(`/category/${program?.category?.slug}`)" class="gap-[8px]")
                            IconCategory
                            span {{ locale === 'en' ? program?.category?.enName : program?.category?.arName }}

                        //- .flex.items-center(class="gap-[8px]")
                            IconStar(:class="{ 'text-[#FF5552]': program?.averageRating, 'text-transparent stroke-gray-300': !program?.averageRating  }")
                            span {{ program?.averageRating?.toFixed(1) }}
                            span(class="text-[14px] font-300 text-[#A29D97]") ({{ program?.totalNumberOfRatings }})

            //- top-[5.3rem] absolute , fixed top-[14.2rem]
            div(class="lg:absolute  lg:w-[50px] lg:top-[5.3rem]" :style="windowWidth !== Infinity && windowWidth > 1024 ? { height: containerHeight + 200 + 'px' } : {}" ref="el")
              ProgramDetailsCard.block(v-model="addedToCart" :loading="addToCartLoading" :data="program" ref="cardRef" @addToCart="handleAddToCart" @buyNow="handleBuyNowPopup" class="mt-5 shadow-sm lg:mt-0 lg:sticky top-[24px] rtl:2xl:mr-[68.2em] rtl:xl:mr-[52.2rem] rtl:lg:mr-[36.2rem] ltr:2xl:ml-[68.2em] ltr:xl:ml-[52.2rem] ltr:lg:ml-[36.2rem]")
            //- ProgramDetailsCard.block(:data="program" @addToCart="handleAddToCart" @buyNow="handleBuyNow" class="mt-5 shadow-sm lg:mt-0 lg:absolute top-[5.3rem] rtl:2xl:mr-[68.2em] rtl:xl:mr-[52.2rem] rtl:lg:mr-[36.2rem] ltr:2xl:ml-[68.2em] ltr:xl:ml-[52.2rem] ltr:lg:ml-[36.2rem]")



    section(class="bg-white pt-[64px] pb-[80px]")
        .app-container
            //- ProgramDetailsCard.block(:data="program" @addToCart="handleAddToCart" @buyNow="handleBuyNow" class="mt-5 shadow-sm lg:mt-0 lg:sticky h-fit w-full lg:w-[40%] top-[0rem] rtl:2xl:mr-[68.2em] rtl:xl:mr-[52.2rem] rtl:lg:mr-[36.2rem] ltr:2xl:ml-[68.2em] ltr:xl:ml-[52.2rem] ltr:lg:ml-[36.2rem]")
            div(class="w-full lg:max-w-[50%]" ref="containerRef")
                div(v-if="program?.courseDetail?.enAbout || program?.courseDetail?.arAbout")
                    p(class="text-[24px] font-400") {{ program?.type === 'COURSE' ? program?.isLiveCourse ? t('aboutWorkshop') : t('aboutCourse') : t('aboutProgram') }}
                    div(class="content-area text-[16px] mt-5 font-light break-words whitespace-pre-wrap max-w-none [&_code]:whitespace-pre-wrap [&_code]:break-words lecturerPage" v-html="locale === 'en' ? program?.courseDetail?.enAbout : program?.courseDetail?.arAbout")

                div(class="mt-[64px]" v-if="sectionsAndLessons?.length")
                    p(class="text-[24px] font-400") {{ program?.type === 'COURSE' ? program?.isLiveCourse ? t('workshopContent') : t('courseContent') : t('programContent') }}
                    .flex.items-center(class="text-[16px] gap-3 font-light mt-3 flex-wrap")
                        span(v-if="program?.courseDetail?.lessonsCount") {{ program?.courseDetail?.lessonsCount }} {{ t('lesson') }}
                        div(class='size-2px rounded-full bg-[#5D5A57]' v-if="program?.courseDetail?.videosCount")
                        span(v-if="program?.courseDetail?.videosCount") {{ program?.courseDetail?.videosCount }} {{ t('video') }}
                        div(class='size-2px rounded-full bg-[#5D5A57]' v-if="program?.courseDetail?.articlesCount")
                        span(v-if="program?.courseDetail?.articlesCount") {{ program?.courseDetail?.articlesCount }} {{ t('article') }}
                        div(class='size-2px rounded-full bg-[#5D5A57]' v-if="program?.courseDetail?.quizzesCount")
                        span(v-if="program?.courseDetail?.quizzesCount") {{ program?.courseDetail?.quizzesCount }} {{ t('quiz') }}
                        div(class='size-2px rounded-full bg-[#5D5A57]' v-if="program?.courseDetail?.liveSessionsCount")
                        span(v-if="program?.courseDetail?.liveSessionsCount") {{ program?.courseDetail?.liveSessionsCount }} {{ t('liveSessions') }}
                    AppAccordion(:options="sectionsAndLessons" class="mt-8" @preview="handlePreview")
                    button(class="border border-primary text-primary hover:bg-primary-50 w-full mt-5 border cursor-pointer text-center flex items-center justify-center rounded-[8px] p-[16px]" @click="getSectionsAndLessons(sectionsAndLessonsPageInfo?.page + 1)" v-if="sectionsAndLessonsPageInfo?.hasNext")
                      p(v-if="!loading") {{ t('viewMore') }}
                      IconLoadingDots(v-else class="size-[25px]")

                div(class="mt-[64px]")
                    AppAceCertificates(v-if="program?.ACE_Certificate" :type="program?.type === 'COURSE' ? program?.isLiveCourse ? 'live' : 'course' : 'workshop'" class="cursor-pointer" @click="navigateTo(localePath('/my-certificates'))")
                    AppCertificate(:type="program?.type === 'COURSE' ? program?.isLiveCourse ? 'live' : 'course' : 'workshop'" class="cursor-pointer" @click="navigateTo(localePath('/my-certificates'))" v-else)

                div(class="mt-[64px]" v-if="program?.users?.length" ref="lecturersSection")
                    p(class="text-[24px]") {{ t('lecturers') }}
                    div(class="mt-7")
                        template(v-for="lecturer in program?.users")
                            ExpertInfoCard.mt-7(:data="lecturer")

                div(class="mt-[64px]" v-if="program?.reviews?.length")
                    p(class="text-[24px]") {{ t('studentsReview') }}
                    .grid(class="grid-cols-1 lg:grid-cols-2 mt-7 gap-8")
                        template(v-for="review in program?.reviews")
                            ReviewCard(:data="review")

    section(class="py-12 bg-[#F8F5F3]" v-if="false")
        .app-container
            .flex.justify-between.items-center
                p(class="font-400 text-[32px]") {{ t('moreProgramsMightInterestYou') }}
                button.btn-link.flex.items-center(class="gap-[10px] hover:text-primary")
                    span {{ t('allPrograms') }}
                    IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")
            .grid.gap-5.mt-7(class="lg:grid-cols-4 md:grid-cols-2")
                template(v-for="course in tempCourses")
                    ProgramCard(:data="course")

    section(class="py-12" v-if="recommendedCourses?.length")
      .app-container
        BaseSection(:title="program?.type === 'COURSE' ? t('moreCoursesYouMightLike') : t('moreProgramsYouMightLike')" :link="program?.type === 'COURSE' ? '/courses' : '/programs'" :scrollHorizontalOnSmScreen="true" :linkTitle="program?.type === 'COURSE' ? t('allCourses') : t('allPrograms')" :gridCols="4")
              template(v-for="course in recommendedCourses?.slice(0, 4)" v-if="!loading")
                  ProgramCard(:data="course"  class="flex-shrink-0 w-[250px] md:w-full")
              template(v-for="i in 4" :key="i" v-else)
                  SkeletonTest

    AppModal(v-model="addedToCartModal" v-if="addedToCartModal" :title="t('addedToCartSuccessfully')" customStyle="h-fit w-full lg:min-w-[500px]")
        .flex.items-center.gap-5
            div(class="rounded-[8px] overflow-hidden w-[120px] md:w-[164px] hover:scale-101 transition duration-300 ease-in-out aspect-3/2")
                NuxtImg(:src="getImageUrl(program?.thumbnail)" :alt="locale === 'en' ? program?.category?.enName : program?.category?.arName" format="webp" class='w-full h-full object-cover')
            .flex.flex-col.gap-3
                p.label-prominent-4.text-primary {{ locale === 'en' ? program?.category?.enName : program?.category?.arName }}
                p.label-prominent-2 {{ locale === 'en' ? program?.enTitle : program?.arTitle }}
                //- .flex.items-center.label-3.text-neutral-700(class="gap-[8px]")
                    p {{ $t(program?.type?.toLowerCase()) }}
                    div(class="size-[2px] bg-[#5D5A57]")
                    p {{ $t(program?.level?.toLowerCase()) }}
                    div(class="size-[2px] bg-[#5D5A57]")
                    p {{ program?.learningTime }} {{ $t(program?.learningTimeUnit?.toLowerCase()) }}
        template(#footer)
            NuxtLink.btn-outline-primary(:to="localePath('/cart')")
                .flex.items-center(class="gap-[4px]")
                    p {{ t('goToCart') }}
                    IconShoppingCart(class="shrink-0 size-[25px]  hover:text-white")

    AppModal(v-model="previewLessonModal" v-if="previewLessonModal" :title="t('lessonPreview')" :showActions="false" customStyle="md:w-[600px] w-[340px] pb-[24px]")
      //- pre {{lessonToPreview}}
      div(v-if="lessonToPreview?.type === 'VIDEO'")
        //- pre {{lessonToPreview?.videoId}}
        AppVideo(:videoId="lessonToPreview?.videoId" class="w-full" roundedClass="rounded-[12px] aspect-video")
      //- div(v-else-if="lessonToPreview?.type === 'QUIZ'")
        //- AppQuiz(:quizId="lessonToPreview?.quizId" class="w-full" roundedClass="rounded-[12px] aspect-video")
      div(v-else class="content-area max-h-[700px] overflow-scroll")
        div(v-html="lessonToPreview?.content" class="lecturerPageArticle")

    CouponModal(v-model="couponModel" v-if="couponModel" @applyCoupon="(val) => handleBuyNow(val)" :id="program?.id" :type="program?.type" :price="program?.priceAfterDiscount !== null ? program?.priceAfterDiscount : program?.originalPrice")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const { getImageUrl } = usePhoto();
const localePath = useLocalePath();
const cartStore = useCartStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { isDesktop } = useDevice();
const addedToCartModal = ref<boolean>(false);
const addToCartLoading = ref<boolean>(false);
const buyNowLoading = ref<boolean>(false);
const previewLessonModal = ref<boolean>(false);
const lessonToPreview = ref();
const lecturersSection = ref();
const route = useRoute();
const addedToCart = ref<boolean>(false);
const { stripHtml } = useFormatter();
const config = useRuntimeConfig();
const { pushDataLayer } = useGtmDataLayer();
const couponModel = ref<boolean>(false);

const { x, y } = useScroll(window);
const sticky = ref<boolean>(false);
const containerRef = ref<HTMLElement | null>(null);
const { width: windowWidth, height } = useWindowSize();
const { width: containerWidth, height: containerHeight } =
  useElementSize(containerRef);

onMounted(() => {
  pushDataLayer("view_item", [program.value]);
});

watch([x, y], () => {
  const { width, height } = useWindowSize();
  if (width.value < 1024) return;
  if (y.value > 222 && !sticky.value) {
    sticky.value = true;
  }

  if (y.value < 222 && sticky.value) {
    sticky.value = false;
  }
});

const {
  program,
  sectionsAndLessons,
  sectionsAndLessonsPageInfo,
  getSectionsAndLessons,
  loading,
} = await useProgram({
  immediate: true,
  grabIdFromRoute: true,
  includeSections: true,
});

const breadCrumbNavigation = computed(() =>
  program.value?.type === "COURSE"
    ? program?.value?.isLiveCourse
      ? "live-workshops"
      : "courses"
    : program.value?.type === "WORKSHOP"
      ? "programs"
      : null,
);

const handlePreview = function (lesson: any) {
  lessonToPreview.value = lesson;
  previewLessonModal.value = true;
};

const handleAddToCart = async function () {
  if (!isLoggedIn.value) return navigateTo(localePath("/login"));
  addToCartLoading.value = true;
  const { message, success } = await cartStore.addToCart({
    learningProgramId: program.value.id,
    learningProgramType: program.value.type,
  });
  if (success) {
    addedToCart.value = true;
    addedToCartModal.value = true;
    pushDataLayer("add_to_cart", [program.value]);
    refreshNuxtData(`getProgram-${route.params.id}`);
  }
  addToCartLoading.value = false;
  useAlert({ type: success ? "success" : "error", message });
};

const handleBuyNow = async function (code?: string) {
  if (!isLoggedIn.value) return navigateTo(localePath("/login"));
  buyNowLoading.value = true;
  cartStore.buyNow({
    programId: program.value.id,
    programType: program.value.type,
    coupon_code: code,
  });
  pushDataLayer("begin_checkout", [{ ...program.value, coupon: code }]);
  buyNowLoading.value = false;
};

const handleBuyNowPopup = function () {
  if (!isLoggedIn.value) return navigateTo(localePath("/login"));
  couponModel.value = true;
};

const handleScrollIntoLecturersSection = function () {
  lecturersSection.value.scrollIntoView({ behavior: "smooth", block: "start" });
};

const {
  data: recommendedCourses,
  error,
  status,
} = useAsyncData(
  "recommended-courses",
  () =>
    GqlRecommendedCourses({
      courseId: program?.value?.id,
      courseType: program?.value?.type,
    }),
  { transform: (data) => data?.recommendedCourses?.data },
);

const seoTitle = computed(() =>
  locale.value === "en" ? program?.value?.enTitle : program?.value?.arTitle,
);

const seoDescription = computed(() =>
  locale.value === "en"
    ? program?.value?.courseDetail?.enSummary
    : program?.value?.courseDetail?.arSummary,
);

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: getImageUrl(program?.value?.thumbnail),
});

useSchemaOrg([
  defineCourse({
    // Course
    name:
      locale.value === "en" ? program.value?.enTitle : program.value?.arTitle,
    description:
      locale.value === "en"
        ? stripHtml(program?.value?.courseDetail.enAbout)
        : stripHtml(program?.value?.courseDetail.arAbout),
    image: getImageUrl(program?.value?.thumbnail),
    url: config.public.APP_BASE_URL + `/program/${program?.value?.slug}`,
    inLanguage: program?.value?.language?.toLowerCase(),
    isAccessibleForFree:
      program?.value?.priceAfterDiscount === 0 ||
      program?.value?.originalPrice === 0
        ? "http://schema.org/True"
        : "http://schema.org/False",

    // Lecturer
    provider: {
      "@type": "Person",
      name:
        locale.value === "en"
          ? program.value?.user?.enFullName
          : program.value?.user?.arFullName,
      url:
        config.public.APP_BASE_URL + `/lecturers/${program?.value?.user?.slug}`,
      image: getImageUrl(program.value?.user?.profilePicture),
    },

    // Reviews
    reviews: program?.value?.reviews?.map((review: any) => ({
      "@type": "Review",
      reviewBody: review?.review,
      ratingValue: review?.rating,
      bestRating: 5,
      worstRating: 1,
      author: {
        "@type": "Person",
        name:
          locale.value === "en"
            ? review?.user?.enFullName
            : review?.user?.arFullName,
        image: review?.user?.profilePicture,
      },
    })),

    // Rating
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: program?.value?.averageRating,
      reviewCount: program?.value?.reviews?.length,
    },

    // Offers
    offers: {
      "@type": "Offer",
      price: program.value?.priceAfterDiscount,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: config.public.APP_BASE_URL + `/program/${program?.value?.slug}`,
    },
  }),
]);
</script>

<style scoped></style>
