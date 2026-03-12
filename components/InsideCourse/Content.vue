<template lang="pug">
    .flex.flex-col(class="w-full lg:w-[652px] gap-8")
      //- pre {{ courseContent?.certification?.downloadArUrl }}
      .flex.items-center.justify-between.flex-wrap(v-if="courseInfo?.isCompleted") 
        .flex.items-center.gap-5
          IconCompleted(class="lg:block hidden")
          .flex.flex-col.gap-3
            p(class="label-prominent-2 lg:label-prominent-1") {{ t('congratulationsYouveCompletedTheCourse') }}
            p(class="label-4 lg:label-3" v-if="courseContent?.certification") {{ t('completedOn') }}: {{ formatDate(courseContent?.certification?.createdAt) }}
            button.flex.items-center.btn-primary.label-prominent-4(class="max-w-fit gap-[3px] lg:hidden" v-if="courseContent?.certification" @click="navigateTo(locale === 'en' ? courseContent?.certification?.downloadEnUrl : courseContent?.certification?.downloadArUrl, { external: true })")  
              IconDownload(class="size-[16px]")
              span {{ t('downloadCertificate') }}
        
        .flex.flex-col.gap-2.items-center
          .flex.items-center.gap-2
            div(class="max-w-[103px] lg:max-w-[120px]")
              NuxtImg(src="/images/certification/en.png" format="webp" alt="certification")
            div(class="max-w-[103px] lg:max-w-[120px]" v-if="courseInfo?.ACE_Certificate")
              NuxtImg(src="/images/certification/ace.png" format="webp" alt="certification")

          button.items-center.text-primary.label-label-prominent-4(class="hidden lg:flex" v-if="courseContent?.certification" @click="navigateTo(locale === 'en' ? courseContent?.certification?.downloadEnUrl : courseContent?.certification?.downloadArUrl, { external: true })")
            IconDownload
            span {{ t('downloadCertificate') }}


      .flex.items-center.justify-between.flex-wrap
        .flex.flex-col(class="gap-[12px]") 
          h1(class="label-prominent-1 lg:heading-6") {{ t('courseContent') }}
          .flex.items-center(class="gap-[6px] text-black label-prominent-2 text-[14px] text-[#5D5A57] font-300")
                  p(v-if="courseInfo?.courseDetail?.videosCount") {{ courseInfo?.courseDetail?.videosCount }} {{ t('video') }}
                  div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="courseInfo?.courseDetail?.videosCount && courseInfo?.courseDetail?.articlesCount")
                  p(v-if="courseInfo?.courseDetail?.articlesCount") {{ courseInfo?.courseDetail?.articlesCount }} {{ t('article') }}
        div(class="w-full lg:w-[277px] flex flex-wrap lg:flex-nowrap gap-[10px] items-center mt-5 lg:mt-0 ")
          AppProgress(:progress="courseProgress" class="w-[200px]" customClass="h-[8px]")
          p.label-prominent-4.whitespace-nowrap {{ courseProgress }}% {{ t('completed') }}

        .items-center.justify-between(class="flex mt-[24px] bottom-8 w-full lg:w-[652px]")
          .flex.flex-col.gap-3
            p.label-prominent-2 {{ highlightedLesson?.title }}
            .flex.items-center(class="gap-[6px] text-black label-3 text-[14px] text-[#5D5A57] font-300")
                .flex.items-center.gap-2
                  IconVideo(v-if="highlightedLesson?.type === 'VIDEO'")
                  IconArticle(v-if="highlightedLesson?.type === 'ARTICLE'")
                  p {{ highlightedLesson?.type === 'VIDEO' ? t('video') : t('article') }}
                div(class="size-[2px] bg-[#5D5A57] rounded-full")
                p {{ highlightedLesson?.learningTimeInMinutes }} {{ t('minutes') }}
          NuxtLink.btn-primary(:to="localePath(`/program/details/${activeCourseId}/lesson/${highlightedLesson?.id}`)" class="whitespace-nowrap") {{ t('startLesson') }}

      .flex.flex-col.justify-between(class="h-fit overflow-y-scroll rounded-[8px]")
        AppAccordion(:options="courseContent?.courseSections" :initialActive="lastAccessedChapterIndex")
          template(#accordion-item="{ item }") 
            .flex.flex-col(class="gap-[8px]")
              p(class="lg:label-prominent-1 label-prominent-2") {{ locale === 'en' ? item?.enTitle : item?.arTitle }}
              .flex.items-center(class="gap-[6px] text-black label-3 text-[14px] text-[#5D5A57] font-300" v-if="item?.learningTimeInMinutes")
                  p {{ item?.learningTimeInMinutes }} {{ t('minutes') }}
          template(#accordion-active-content="{ lessons }") 
            .flex.flex-col.gap-7
              template(v-for="lesson in lessons")
                .flex.items-center.justify-between
                  .flex.items-start.gap-4
                    button(@click="handleMarkAsComplete(lesson?.id)" :disabled="lesson?.type === 'QUIZ' || lesson?.isCompleted || !lesson?.isAvailable"): IconCheck(class="text-[#7F7B76] size-[20px]" :class="{ '!fill-[#2FB551] !text-white': lesson?.isCompleted }")
                    .flex.flex-col.gap-3(@click="handleLessonNavigation(lesson?.id, lesson?.isAvailable)")
                      p(class="lg:label-prominent-2 label-prominent-3") {{ locale === 'en' ? lesson?.enTitle : lesson?.arTitle }}
                      .flex.items-center(class="gap-[6px] text-black label-4 lg:label-3 text-[14px] text-[#5D5A57] font-300")
                        .flex.items-center.gap-1
                          IconVideo(v-if="lesson?.type === 'VIDEO'")
                          IconArticle(v-if="lesson?.type === 'ARTICLE'")
                          IconLive(v-if="lesson?.type === 'LIVE_SESSION'")
                          IconQuiz(v-if="lesson?.type === 'QUIZ'" class="shrink-0")
                          p {{ lesson?.type === 'VIDEO' ? t('video') : lesson?.type === 'ARTICLE' ? t('article') : lesson?.type === 'LIVE_SESSION' ? t('liveSession') : t('quiz') }}
                        div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="lesson?.learningTimeInMinutes")
                        p(v-if="lesson?.learningTimeInMinutes") {{ lesson?.learningTimeInMinutes }} {{ t('minutes') }}
                  NuxtLink.label-prominent-3.text-primary.underline(:to="localePath(`/program/details/${activeCourseId}/lesson/${lesson?.id}`)" class="hidden lg:block whitespace-nowrap" v-if="lesson?.isAvailable") {{ t('startLesson') }}

      
    //- ReviewModal(v-model="reviewModel")
    CertificateModal(v-model="courseCompleted" v-if="courseCompleted")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const {
  courseInfo,
  courseContent,
  activeCourseId,
  getCourseContent,
  getCourseInfo,
} = useInsideCourse();
const { formatDate } = useFormatter();
const reviewModel = ref<boolean>(true);
const courseCompleted = ref<boolean>(false);

const courseProgress = computed(() => {
  if (!courseInfo?.value?.courseProgress) return;
  const { completedLessons, totalLessons } = courseInfo?.value?.courseProgress;
  return Math.ceil((completedLessons / totalLessons) * 100);
});

const highlightedLesson = computed(() => {
  if (!courseContent) return;
  if (courseContent?.value?.lastAccessedLesson)
    return courseContent?.value?.lastAccessedLesson;
  return courseContent?.value?.courseSections?.[0]?.lessons?.[0];
});

onBeforeMount(async () => {
  await getCourseContent();
});

const handleLessonNavigation = function (
  lessonId: string,
  lessonAvailability: boolean,
) {
  if (!lessonAvailability)
    return useAlert({
      type: "error",
      message: t("youMustCompleteThePreviousLessonToContinue"),
    });
  navigateTo(
    localePath(`/program/details/${activeCourseId.value}/lesson/${lessonId}`),
  );
};

const handleMarkAsComplete = async function (lessonId: string) {
  const { message, success } = await markLessonAsComplete(lessonId);
  if (!success) return useAlert({ type: "error", message });
  await getCourseContent();
  await getCourseInfo();
};

const lastAccessedChapterIndex = computed(() => {
  let lastAccessedLessonId: number | null =
    courseContent?.value?.lastAccessedLesson?.id || null;
  if (!lastAccessedLessonId) return 0;

  let idx: number | null = null;

  courseContent.value?.courseSections?.forEach(
    (section: any, sectionIdx: number) => {
      section.lessons?.forEach((lesson: any) => {
        if (lesson.id === lastAccessedLessonId) {
          return (idx = sectionIdx);
        }
      });
    },
  );

  return idx;
});

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
</script>

<style scoped></style>
