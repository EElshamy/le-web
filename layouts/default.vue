<template lang="pug">
    Html(:lang="i18nSeo.htmlAttrs.lang" :dir="i18nSeo.htmlAttrs.dir")
    //- .flex.items-center.bg-primary.text-white.justify-center
          NuxtLink(:to="localePath('/search?q=test')") Link
    Transition(name="navbar-swipe")
      header.theHeader(:class="{ 'bg-[#F8F5F3]': false && route?.fullPath === '/' || false && route?.fullPath === '/en', 'fixed left-0 top-0 right-0 z-9999': false }" ref="headerNav" v-if="true")
          TheNav
    main.theMain(ref="mainSections")
        AppMessage
        slot
        //- SearchModal(v-model="searchPopup" v-if="searchPopup" @close="searchPopup = false")

    footer(class="bg-[#F8F7F5] md:mt-[54px]" class="footerContainer")
      TheFooter

    AppShareModal(v-model="openShareModal" v-if="openShareModal")

</template>

<script setup lang="ts">
import * as yup from "yup";
import { setLocale } from "yup";
const config = useRuntimeConfig();
const baseUrl = "https://leiaqa.com";
const { t, locale } = useI18n();
const localePath = useLocalePath();
// useGqlHeaders({ lang: `Eg-${locale.value}` });
const { openShareModal } = useShare();
const route = useRoute();
const mainPages = ref();
const { x, y, isScrolling, arrivedState, directions } = useScroll(window);
const { isOnline, effectiveType } = useNetwork();
// const { handleCanonicalTag } = useSeo();
// handleCanonicalTag();
const searchPopup = ref<boolean>(false);
const footerContainer = ref<HTMLElement | null>(null);
const { width: containerWidth, height: containerHeight } =
  useElementSize(footerContainer);

const mainHeight = computed(() => {
  return `calc(100vh - ${containerHeight.value}px)`;
});

const showNavBar = computed(() => {
  if (y.value <= 0) return false; // always show at top
  if (directions.top) return true; // user is scrolling up
  if (directions.bottom && y.value > 500) return false; // user is scrolling down
  return true;
});

const i18nSeo = useLocaleHead({
  addSeoAttributes: true,
  addDirAttribute: true,
  identifierAttribute: "id",
  addKey: true,
});

setLocale({
  mixed: {
    required: ({ path }) => `${t(path)} ${t("isARequiredField")}`,
  },
  string: {
    min: ({ path, min }) =>
      `${t(path)} ${t("mustBeAtLeast")} ${min} ${t("characters")}`,
    max: ({ path, max }) =>
      `${t(path)} ${t("mustBeAtMost")} ${max} ${t("characters")}`,
    email: ({ path }) => `${t(path)} ${t("mustBeAValidEmail")}`,
  },
  array: {
    min: ({ path, min }) => `${t(path)} ${t("mustBeAtLeast")} ${min}`,
    max: ({ path, max }) => `${t(path)} ${t("mustBeAtMost")} ${max}`,
  },
});
const unstableConnectionType = ["2g", "3g"];
watch(effectiveType, () => {
  if (!isOnline.value) {
    return useAlert({ type: "error", message: t("noInternetConnection") });
  }

  if (unstableConnectionType.includes(effectiveType.value as string)) {
    return useAlert({
      type: "error",
      message: t("yourConnectionSeemsUnstableThingsMightTakeLongerThanUsual"),
    });
  }
});

useHead({
  titleTemplate: "%s",
  htmlAttrs: computed(() => ({
    lang: i18nSeo.value.htmlAttrs?.lang,
    dir: i18nSeo.value.htmlAttrs?.dir,
  })),
  link: computed(() => [
    ...(i18nSeo.value.link || []),
    { rel: "canonical", href: `${baseUrl}${route.path}`.replace(/\/$/, "") },
  ]),
});

useSeoMeta({
  title: t("brand"),
  description: t(
    "scientificCoursesAndTrainingProgramsCertifiedByAceOnTheFirstArabicPlatformSpecializedInTeachingFieldsOfNutritionWellnessAndPhysicalFitness",
  ),
  ogTitle: t("brand"),
  ogDescription: t(
    "scientificCoursesAndTrainingProgramsCertifiedByAceOnTheFirstArabicPlatformSpecializedInTeachingFieldsOfNutritionWellnessAndPhysicalFitness",
  ),
  ogImage: "/share.png",
  twitterCard: "summary_large_image",
  twitterSite: "@leiaqa_edu",
  twitterCreator: "@leiaqa_edu",
  twitterTitle: t("brand"),
  twitterDescription: t(
    "scientificCoursesAndTrainingProgramsCertifiedByAceOnTheFirstArabicPlatformSpecializedInTeachingFieldsOfNutritionWellnessAndPhysicalFitness",
  ),
  twitterImage: "/share.png",
  twitterImageAlt: t("brand"),
  ogUrl: `${baseUrl}${route.path === "/en" ? "/en" : route?.path === "/" ? "" : route?.path}`,
});

const { getMe } = useCustomAuth();
await getMe();
</script>

<style scoped>
.navbar-swipe-enter-active,
.navbar-swipe-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.navbar-swipe-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.navbar-swipe-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.navbar-swipe-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.navbar-swipe-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
