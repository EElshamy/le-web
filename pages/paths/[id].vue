<template lang="pug">
    section(class="bg-[#F8F5F3] pt-[24px] lg:pt-[64px] pb-[80px]")
        .app-container.relative
            .breadcrumb.flex.lime-clamp-1.gap-2.items-center(class="text-[14px] font-300")
                NuxtLink(to="/"): IconHome
                IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180")
                NuxtLink(:to="localePath('/paths')") {{ t('tracks') }}
                IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180")
                p(class="text-[14px] font-400 text-black whitespace-nowrap truncate") {{ locale === 'en' ? track?.enTitle : track?.arTitle }}

            .main-program-content(class="mt-[64px] flex justify-between flex-col lg:flex-row ")

                .flex.flex-col.gap-7(class="w-full lg:max-w-50%")
                    h1(class="text-[40px]") {{ locale === 'en' ? track?.enTitle : track?.arTitle }}
                    p(class="text-[20px] font-300")  {{ locale === 'en' ? track?.diplomaDetails?.enSummary : track?.diplomaDetails?.arSummary }}

                    .flex.items-center(class="gap-[16px] flex-wrap")
                        LecturerAvatars(:lecturers="track?.lecturers" @scrollToLecturers="handleScrollIntoLecturersSection")
                        //- AppAvatar(:src="getImageUrl(track?.lecturers?.[0]?.profilePicture)" class="size-[32px]" :label="locale === 'en' ? track?.lecturers?.[0]?.enFullName : track?.lecturers?.[0]?.arFullName")

                        NuxtLink.flex.items-center(:to="localePath(`/category/${track?.category?.slug}`)" class="gap-[8px]")
                            IconCategory
                            span {{ locale === 'en' ? track?.category?.enName : track?.category?.arName }}

                        //- .flex.items-center(class="gap-[8px]")
                            IconStar(:class="{ 'text-[#FF5552]': track?.averageRating, 'text-transparent stroke-gray-300': !track?.averageRating  }")
                            span {{ track?.averageRating?.toFixed(1) }}
                            span(class="text-[14px] font-300 text-[#A29D97]") ({{ track?.totalNumberOfRatings }})

            //- top-[5.3rem] absolute , fixed top-[14.2rem]
            div(class="lg:absolute  lg:w-[50px] top-[5.3rem]" :style="windowWidth > 1024 ? { height: containerHeight + 200 + 'px' } : {}" ref="el")
                ProgramDetailsCard.block(v-model="addedToCart" :loading="addToCartLoading" :data="track" ref="cardRef" @addToCart="handleAddToCart" @buyNow="handleBuyNowPopup" class="mt-5 shadow-sm lg:mt-0 lg:sticky top-[24px] rtl:2xl:mr-[68.2em] rtl:xl:mr-[52.2rem] rtl:lg:mr-[36.2rem] ltr:2xl:ml-[68.2em] ltr:xl:ml-[52.2rem] ltr:lg:ml-[36.2rem]")
            //- ProgramDetailsCard.block(:data="track" @addToCart="handleAddToCart" @buyNow="handleBuyNow" class="mt-5 shadow-sm lg:mt-0 lg:absolute top-[5.3rem] rtl:2xl:mr-[68.2em] rtl:xl:mr-[52.2rem] rtl:lg:mr-[36.2rem] ltr:2xl:ml-[68.2em] ltr:xl:ml-[52.2rem] ltr:lg:ml-[36.2rem]")



    section(class="bg-white pt-[64px] pb-[80px]")
        .app-container
            div(class="w-full lg:max-w-[50%]" ref="containerRef")
                div
                    p(class="text-[24px] font-400") {{ t('aboutTrack') }}
                    div(class="content-area text-[16px] mt-5 font-light break-words whitespace-pre-wrap max-w-none [&_code]:whitespace-pre-wrap [&_code]:break-words" v-html="locale === 'en' ? track?.diplomaDetails?.enAbout : track?.diplomaDetails?.arAbout")

                div(class="mt-[64px]")
                    p(class="text-[24px] font-400") {{ t('trackContent') }}
                    .flex.items-center(class="text-[16px] gap-3 font-light mt-3 flex-wrap")
                        span(v-if="track?.diplomaDetails?.lessonsCount") {{ track?.diplomaDetails?.lessonsCount }} {{ t('lesson') }}
                        div(class='size-2px rounded-full bg-[#5D5A57]' v-if="track?.diplomaDetails?.videosCount")
                        span(v-if="track?.diplomaDetails?.videosCount") {{ track?.diplomaDetails?.videosCount }} {{ t('video') }}
                        div(class='size-2px rounded-full bg-[#5D5A57]' v-if="track?.diplomaDetails?.articlesCount")
                        span(v-if="track?.diplomaDetails?.articlesCount") {{ track?.diplomaDetails?.articlesCount }} {{ t('article') }}

                    AppAccordion(:options="track?.programs" class="mt-8" type="track")
                        template(#accordion-item="{ item }")
                            .flex.items-center(class="gap-[16px]")
                                div(class="size-[56px] lg:size-auto aspect-3/2 max-w-[112px] rounded-[4px] shrink-0 overflow-hidden")
                                    NuxtImg(:src="getImageUrl(item?.thumbnail)" :alt="locale === 'en' ? item?.enTitle : item?.arTitle" format="webp" class="shrink-0 w-full h-full object-cover")
                                p(class="label-prominent-2 lg:label-prominent-1") {{ locale === 'en' ? item?.enTitle : item?.arTitle }}


                        //- template(#accordion-active-content="{ lessons }")
                        //-     .flex.flex-col.gap-2

                        //-     pre {{ lessons }}
                            //- .flex.items-center.gap-2
                                pre {{ item }}
                                span(class="text-[14px] font-light" v-if="item?.courseDetail?.coursesCount ") {{ item?.courseDetail?.coursesCount }} {{ t('video') }}
                                div(class='size-2px bg-[#5D5A57] rounded-full' v-if="item?.articlesCount && item?.videosCount")
                                span(class="text-[14px] font-light" v-if="item?.articlesCount") {{ item?.articlesCount }} {{ t('article') }}

                div(class="mt-[64px]")
                    AppCertificate(@click="navigateTo(localePath('/my-certificates'))" class="cursor-pointer")

                div(class="mt-[64px]" ref="lecturersSection")
                    p(class="text-[24px]") {{ t('lecturers') }}
                    div(class="mt-7")
                        template(v-for="lecturer in track?.lecturers")
                            ExpertInfoCard.mt-7(:data="lecturer")

                div(class="mt-[64px]" v-if="track?.reviews?.length")
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

    section(class="py-12" v-if="recommendedPaths?.length")
      .app-container
        BaseSection(:title="t('morePathsYouMightLike')" link="/paths" :scrollHorizontalOnSmScreen="true" :linkTitle="t('allTracks')" :gridCols="3")
              template(v-for="path in recommendedPaths?.slice(0, 3)" v-if="!loading")
                  DiplomaCard(:data="path"  class="flex-shrink-0 w-[250px] md:w-full")
              template(v-for="i in 3" :key="i" v-else)
                SkeletonTest

    AppModal(v-model="addedToCartModal" v-if="addedToCartModal" :title="t('addedToCartSuccessfully')" customStyle="h-fit w-full lg:min-w-[500px]")
        .flex.items-center.gap-5
            div(class="rounded-[8px] overflow-hidden w-[120px] md:w-[164px] hover:scale-101 transition duration-300 ease-in-out aspect-3/2")
                NuxtImg(:src="getImageUrl(track?.thumbnail)" :alt="locale === 'en' ? track?.category?.enName : track?.category?.arName" format="webp" class='w-full h-full')
            .flex.flex-col.gap-3
                p.label-prominent-4.text-primary {{ locale === 'en' ? track?.category?.enName : track?.category?.arName }}
                p.label-prominent-2 {{ locale === 'en' ? track?.enTitle : track?.arTitle }}
                //- .flex.items-center.label-3.text-neutral-700(class="gap-[8px]")
                    p {{ $t(track?.type?.toLowerCase()) }}
                    div(class="size-[2px] bg-[#5D5A57]")
                    p {{ $t(track?.level?.toLowerCase()) }}
                    div(class="size-[2px] bg-[#5D5A57]")
                    p {{ track?.learningTime }} {{ $t(track?.learningTimeUnit?.toLowerCase()) }}
        template(#footer)
            NuxtLink.btn-outline-primary(:to="localePath('/cart')")
                .flex.items-center(class="gap-[4px]")
                    p {{ t('goToCart') }}
                    IconShoppingCart(class="shrink-0 size-[25px]  hover:text-white")

    AppModal(v-model="previewLessonModal" v-if="previewLessonModal" :title="t('lessonPreview')" :showActions="false" customStyle="md:w-[600px] pb-[24px]")
      div(v-if="lessonToPreview?.type === 'VIDEO'")
        AppVideo(:videoId="lessonToPreview?.videoId" class="w-full" roundedClass="rounded-[12px] h-[230px]")
      div(v-else)
        div(v-html="lessonToPreview?.content"  class="content-area lecturerPageArticle")

    CouponModal(v-model="couponModel" v-if="couponModel" @applyCoupon="(val) => handleBuyNow(val)" :id="track?.id" type="DIPLOMA" :price="track?.priceAfterDiscount !== null ? track?.priceAfterDiscount : track?.originalPrice")
</template>

<script setup lang="ts">
import { DiplomaTypeEnum, RevenueShareTargetEnum } from "#gql/default";

const { t, locale } = useI18n();
const { getImageUrl } = usePhoto();
const localePath = useLocalePath();
const cartStore = useCartStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const addedToCartModal = ref<boolean>(false);
const addToCartLoading = ref<boolean>(false);
const buyNowLoading = ref<boolean>(false);
const previewLessonModal = ref<boolean>(false);
const lessonToPreview = ref();
const lecturersSection = ref();
const route = useRoute();
const addedToCart = ref<boolean>(false);
const config = useRuntimeConfig();
const { stripHtml } = useFormatter();
const { pushDataLayer } = useGtmDataLayer();
const couponModel = ref<boolean>(false);

const { x, y } = useScroll(window);
const sticky = ref<boolean>(false);
const containerRef = ref<HTMLElement | null>(null);
const { width: windowWidth, height } = useWindowSize();
const { width: containerWidth, height: containerHeight } =
  useElementSize(containerRef);

onMounted(() => {
  pushDataLayer(
    "view_item",
    track.value?.programs.map((item: any) => ({
      ...item,
      pathName:
        locale.value === "en" ? track?.value?.enTitle : track?.value?.arTitle,
    })),
    track.value,
  );
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

const { track } = await useTrack({
  immediate: true,
  grabIdFromRoute: true,
});

const handleAddToCart = async function () {
  if (!isLoggedIn.value) return navigateTo(localePath("/login"));
  addToCartLoading.value = true;
  const { message, success } = await cartStore.addToCart({
    learningProgramId: track.value.id,
    learningProgramType: RevenueShareTargetEnum.DIPLOMA,
  });
  if (success) {
    addedToCart.value = true;
    addedToCartModal.value = true;
    pushDataLayer(
      "add_to_cart",
      track.value?.programs.map((item: any) => ({
        ...item,
        pathName:
          locale.value === "en" ? track?.value?.enTitle : track?.value?.arTitle,
      })),
      track.value,
    );
    refreshNuxtData(`getTrack-${route.params.id}`);
  }
  addToCartLoading.value = false;
  useAlert({ type: success ? "success" : "error", message });
};

const handleBuyNow = async function (code?: string) {
  if (!isLoggedIn.value) return navigateTo(localePath("/login"));
  buyNowLoading.value = true;
  cartStore.buyNow({
    programId: track.value.id,
    programType: RevenueShareTargetEnum.DIPLOMA,
    coupon_code: code,
  });
  pushDataLayer(
    "begin_checkout",
    track.value?.programs.map((item: any) => ({
      ...item,
      coupon: code,
      pathName:
        locale.value === "en" ? track?.value?.enTitle : track?.value?.arTitle,
    })),
    track.value,
  );
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
  data: recommendedPaths,
  error,
  status,
} = useAsyncData(
  `recommended-paths-${route.params.id}",`,
  () =>
    GqlRecommendedDiplomas({
      diplomaId: track?.value?.id,
      filter: { diplomaType: DiplomaTypeEnum.PATH },
    }),
  { transform: (data) => data?.recommendedDiplomas?.data },
);

const seoTitle = computed(() =>
  locale.value === "en" ? track?.value?.enTitle : track?.value?.arTitle,
);

const seoDescription = computed(() =>
  locale.value === "en"
    ? track?.value?.courseDetail?.enSummary
    : track?.value?.courseDetail?.arSummary,
);

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: getImageUrl(track?.value?.thumbnail),
});

useSchemaOrg([
  defineCourse({
    // Course
    name: locale.value === "en" ? track.value?.enTitle : track.value?.arTitle,
    description:
      locale.value === "en"
        ? stripHtml(track?.value?.diplomaDetails?.enAbout)
        : stripHtml(track?.value?.diplomaDetails?.arAbout),
    image: getImageUrl(track?.value?.thumbnail),
    url: config.public.APP_BASE_URL + `/paths/${track?.value?.slug}`,
    inLanguage: track?.value?.language?.toLowerCase(),
    isAccessibleForFree:
      track?.value?.priceAfterDiscount === 0 ||
      track?.value?.originalPrice === 0
        ? "http://schema.org/True"
        : "http://schema.org/False",

    // Lecturer
    provider: {
      "@type": "Person",
      name:
        locale.value === "en"
          ? track.value?.lecturer?.enFullName
          : track.value?.lecturer?.arFullName,
      url:
        config.public.APP_BASE_URL +
        `/lecturers/${track?.value?.lecturer?.slug}`,
      image: getImageUrl(track.value?.lecturer?.profilePicture),
    },

    // Rating
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: track?.value?.averageRating,
    },

    // Offers
    offers: {
      "@type": "Offer",
      price: track.value?.priceAfterDiscount,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: config.public.APP_BASE_URL + `/paths/${track?.value?.slug}`,
    },

    hasPart: track?.value?.programs?.map((program: any) => ({
      "@type": "Course",
      name: locale.value === "en" ? program?.enTitle : program?.arTitle,
      description:
        locale.value === "en"
          ? stripHtml(program?.courseDetail?.enAbout)
          : stripHtml(program?.courseDetail?.arAbout),
      url: config.public.APP_BASE_URL + `program/${program?.slug}`,
    })),
  }),
]);
</script>

<style scoped></style>
