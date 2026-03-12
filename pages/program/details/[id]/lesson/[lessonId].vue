<template lang="pug">
    div(v-if="activeLessonContent?.type === 'VIDEO'" class="relative")
      AppVideo(:videoId="activeLessonContent?.videoId" class="h-[275px] lg:h-[810px]")
      //- div(class="h-[275px] md:h-[810px] bg-gray-300 shimmer-animation" v-if="loading")
      div(class="px-[16px] pt-[20px] pb-[8px] lg:px-[32px] lg:py-[24px]")
        .flex.items-center.justify-between
          p(class="label-prominent-1 lg:heading-6 lg:max-w-[70%]") {{ locale === 'en' ? activeLessonContent?.enTitle : activeLessonContent?.arTitle  }}
          .flex.items-center.gap-2
            button.btn-outline-primary(class="hidden md:block" v-if="!activeLessonContent?.isCompleted" @click="handleMarkLessonAsComplete(activeLessonContent?.id)") {{ t('completedLesson') }}
            button.btn-outline-primary(:disabled="true" v-else class="hidden md:block hover:bg-transparent hover:text-primary")
              .flex.items-center.justify-center.gap-1
                IconCheck(class="size-[20px]")
                span(class="f-text-12-14") {{ t('completed') }}
            button.btn-primary(class="hidden lg:block" :disabled="!activeLessonContent?.nextLesson?.id" @click="activeLessonContent?.nextLesson?.id ? navigateTo(localePath(`/program/details/${activeCourseId}/lesson/${activeLessonContent?.nextLesson?.id}`)) : useAlert({type: 'error', message: t('youMustCompleteThePreviousLessonToContinue')})") {{ t('nextLesson') }}

        AppTabs.mt-5(:tabs v-model="activeTab" class="h-[40px]")

        div(class="mt-[32px]")
          div(v-if="activeTab === 'summary' && activeLessonContent?.overview")
            p(class="break-words whitespace-pre-wrap max-w-none [&_code]:whitespace-pre-wrap [&_code]:break-words") {{ activeLessonContent?.overview }}
          .flex.flex-col.gap-4(v-if="activeTab === 'resources'" class="lg:max-w-[648px] w-full")
                template(v-for="resource in activeLessonContent?.resources")
                  NuxtLink.flex.items-center.justify-between(class="border-1 border-[#DEDAD6] bg-[#F8F5F3] py-[12px] rounded-[8px] px-[16px] transition duration-300 ease-in-out hover:scale-102 cursor-pointer" :to="resource?.type === 'URL' ? resource?.url : getImageUrl(resource?.url)" target="_blank")
                      .flex.items-center.gap-4
                          IconLink(v-if="resource?.type === 'URL'" class="shrink-0")
                          IconArticle(v-else class="shrink-0")
                          p.line-clamp-1 {{ resource?.url }}
                      button(v-if="true"): IconNavigate
                      button(v-else): IconDownload

    //- div(v-else-if="activeLessonContent?.type === 'ARTICLE'")
      .app-container(class="py-[28px] lg:py-[64px]")
        .flex.items-center(class="lg:justify-center")
          div
            article
              div(v-html="activeLessonContent?.content" class="w-full lg:max-w-[775px] [&_a]:break-all [&_a]:text-primary")
            .flex.items-center.gap-2(class="p-[20px] justify-end")
              button.btn-outline-primary.mt-5(class="hidden md:block" v-if="!activeLessonContent?.isCompleted" @click="handleMarkLessonAsComplete(activeLessonContent?.id)") {{ t('completedLesson') }}
              button.btn-outline-primary(:disabled="true" v-else class="hidden md:block hover:bg-transparent hover:text-primary mt-5")
                .flex.items-center.justify-center.gap-1
                  IconCheck(class="size-[20px]")
                  span(class="f-text-12-14") {{ t('completed') }}
              button.btn-primary.mt-5(:disabled="!activeLessonContent?.nextLesson?.id" class="hidden md:block" @click="navigateTo(localePath(`/program/details/${activeCourseId}/lesson/${activeLessonContent?.nextLesson?.id}`))") {{ t('nextLesson') }}


    div(v-else-if="activeLessonContent?.type === 'ARTICLE'")
      .app-container(class="py-[28px] lg:py-[64px]")
        .flex.items-center(class="lg:justify-center")
          div(class="w-full lg:max-w-[775px]")
            article
              div(v-html="activeLessonContent?.content" class="content-area w-full [&_a]:break-all [&_a]:text-primary")
            div(class="mt-[40px] border-t border-gray-200 pt-6" v-if="activeLessonContent?.resources?.length")
                h3(class="label-prominent-1 mb-4") {{ t('resources') }}
                .flex.flex-col.gap-4
                    template(v-for="resource in activeLessonContent?.resources")
                        NuxtLink.flex.items-center.justify-between(class="border-1 border-[#DEDAD6] bg-[#F8F5F3] py-[12px] rounded-[8px] px-[16px] transition duration-300 ease-in-out hover:scale-102 cursor-pointer" :to="resource?.type === 'URL' ? resource?.url : getImageUrl(resource?.url)" target="_blank")
                            .flex.items-center.gap-4
                                IconLink(v-if="resource?.type === 'URL'" class="shrink-0")
                                IconArticle(v-else class="shrink-0")
                                p.line-clamp-1 {{ resource?.url }}
                            button(v-if="true"): IconNavigate
                            button(v-else): IconDownload

            .flex.items-center.gap-2(class="p-[20px] justify-end")
              button.btn-outline-primary.mt-5(class="hidden md:block" v-if="!activeLessonContent?.isCompleted" @click="handleMarkLessonAsComplete(activeLessonContent?.id)") {{ t('completedLesson') }}
              button.btn-outline-primary(:disabled="true" v-else class="hidden md:block hover:bg-transparent hover:text-primary mt-5")
                .flex.items-center.justify-center.gap-1
                  IconCheck(class="size-[20px]")
                  span(class="f-text-12-14") {{ t('completed') }}
              button.btn-primary.mt-5(:disabled="!activeLessonContent?.nextLesson?.id" class="hidden md:block" @click="navigateTo(localePath(`/program/details/${activeCourseId}/lesson/${activeLessonContent?.nextLesson?.id}`))") {{ t('nextLesson') }}


    div(v-else-if="activeLessonContent?.type === 'LIVE_SESSION'")
        .app-container
            LiveSession(:live="activeLessonContent")

    div(v-else-if="activeLessonContent?.type === 'QUIZ'")
      .app-container
        Quiz(:data="activeLessonContent")

    div(class="px-[16px] flex fixed bottom-0 p-[20px] w-full justify-end items-center gap-2 md:hidden")
      button.btn-outline-primary.mt-5(class="block md:hidden bg-white" v-if="!activeLessonContent?.isCompleted" @click="handleMarkLessonAsComplete(activeLessonContent?.id)") {{ t('completedLesson')}}
      button.btn-outline-primary.mt-5(:disabled="true" v-else class="block md:hidden hover:bg-transparent hover:text-primary h-[42px]")
        .flex.items-center.justify-center.gap-1
          IconCheck(class="size-[20px]")
          span(class="f-text-12-14") {{ t('completed') }}
      button.btn-primary.mt-5(:disabled="!activeLessonContent?.nextLesson?.id" @click="navigateTo(localePath(`/program/details/${activeCourseId}/lesson/${activeLessonContent?.nextLesson?.id}`))") {{ t('nextLesson') }}

    CertificateModal(v-model="courseCompleted" v-if="courseCompleted")
</template>

<script setup lang="ts">
import { useInsideLesson } from "~/composables/useInsideLesson";

definePageMeta({
  layout: "lesson",
});

const videoId = ref();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const lesson = ref();
const { getImageUrl } = usePhoto();
const { activeLessonId, activeLessonContent, loading } = await useInsideLesson({
  immediate: true,
});
const { activeCourseId, courseInfo, getCourseContent, getCourseInfo } =
  useInsideCourse();
const generateCourseModal = ref<boolean>(false);
const courseCompleted = ref<boolean>(false);
const goToNext = ref<boolean>(false);
const activeTab = ref<string>(
  activeLessonContent.value?.overview ? "summary" : "resources",
);

const tabs = computed(() => {
  const tabs = [];
  if (activeLessonContent.value?.overview) {
    tabs.push({ label: t("summary"), name: "summary" });
  }

  if (activeLessonContent.value?.resources?.length) {
    tabs.push({ label: t("resources"), name: "resources" });
  }

  return tabs;
});

const handleMarkLessonAsComplete = async function (lessonId: string) {
  const { message, success } = await markLessonAsComplete(lessonId);
  if (!success) return useAlert({ type: "error", message });
  await getCourseContent();
  await getCourseInfo();
  await useInsideLesson({ immediate: true });
  goToNext.value = true;
  // await useLesson();
};

// watch(activeLessonContent, async () => {
//   if (activeLessonContent?.value?.isCompleted) return;
//   activeLessonContent.value.isCompleted = true;
//   await markLessonAsComplete(activeLessonContent.value?.id);
// });

// const tabs = [
//   {
//     label: t("summary"),
//     name: "summary",
//   },
//   {
//     label: t("resources"),
//     name: "resources",
//   },
// ];

watch(
  courseInfo,
  () => {
    if (!courseInfo.value) return false;
    courseCompleted.value =
      courseInfo.value?.courseProgress?.totalLessons ===
        courseInfo?.value?.courseProgress?.completedLessons &&
      !courseInfo?.value?.hasCertificate;
  },
  { deep: true, immediate: true },
);

// const courseCompleted = computed(() => {
//   if (!courseInfo.value) return false;
//   return (
//     courseInfo.value?.courseProgress?.totalLessons ===
//     courseInfo?.value?.courseProgress?.completedLessons
//   );
// });

const seoTitle = computed(() =>
  locale.value === "en"
    ? activeLessonContent?.value?.enTitle
    : activeLessonContent?.value?.arTitle,
);
const seoDescription = computed(() => activeLessonContent?.value?.overview);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: getImageUrl(courseInfo?.value?.thumbnail),
});
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
</style>
