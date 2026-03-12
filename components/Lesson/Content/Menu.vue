<template lang="pug">
  .flex.flex-col.h-full
      .flex.items-center.justify-between(class="px-[32px] py-[20px] border-s shrink-0 bg-white z-10")
          p.label-label-prominent-1 {{ t('content') }}
          button(@click="$emit('closeMenu')"): IconX

      AppAccordion(:options="courseContent?.courseSections" customClass="!gap-0" class="border flex-1 overflow-y-auto bg-[#F8F5F3] pb-24" :headerNotRounded="true" :initialActive="activeSection")
          template(#accordion-item="{ item }")
              .flex.flex-col.gap-3(class="px-[8px]")
                  p.label-prominent-2 {{ locale === 'en' ? item?.enTitle : item?.arTitle }}
          template(#accordion-active-content="{ lessons }")
              template(v-for="lesson in lessons")
                  .flex.items-start.gap-3(class="px-[12px]" :class="{ 'bg-white py-[12px] rounded-[8px]': lesson?.id == activeLessonId, 'text-gray-300': !lesson?.isAvailable }" @click="handleLessonNavigation(lesson?.id, lesson?.isAvailable)")
                      button(:disabled="!lesson?.isAvailable || lesson.isCompleted || lesson?.type === 'QUIZ'" @click.stop="handleMarkLessonAsComplete(lesson?.id), !lesson.isCompleted ? lesson.isCompleted = true : lesson.isCompleted = false"): IconCheck(class="size-[20px]" :class="{ 'text-white fill-green-600': lesson?.isCompleted }")
                      .flex.flex-col.gap-3
                          p.label-prominent-3 {{ locale === 'en' ? lesson?.enTitle : lesson?.arTitle }}
                          .flex.items-center.gap-2
                              IconVideo(v-if="lesson?.type === 'VIDEO'" :class="{ 'text-gray-300': !lesson?.isAvailable }")
                              IconArticle(v-if="lesson?.type === 'ARTICLE'" :class="{ 'text-gray-300': !lesson?.isAvailable }")
                              IconLive(v-if="lesson?.type === 'LIVE_SESSION'" :class="{ 'text-gray-300': !lesson?.isAvailable }")
                              IconQuiz(v-if="lesson?.type === 'QUIZ'" class="shrink-0")
                              .flex.items-center.gap-2
                                p.label-4 {{ lesson?.type === 'VIDEO' ? t('video') : lesson?.type === 'ARTICLE' ? t('article') : lesson?.type === 'LIVE_SESSION' ? t('liveSession') : t('quiz') }}
                                div(class="size-[2px] rounded-full bg-black" v-if="lesson?.type && lesson?.learningTimeInMinutes")
                                p.label-4(v-if="lesson?.learningTimeInMinutes") {{ lesson?.learningTimeInMinutes }} {{ t('minutes') }}
</template>

<script setup lang="ts">
import { useInsideLesson } from "~/composables/useInsideLesson";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const emit = defineEmits(["closeMenu"]);
const route = useRoute();
const { activeLessonId } = await useInsideLesson();
const { courseContent, getCourseInfo, getCourseContent } = useInsideCourse();
const { activeCourseId } = useInsideCourse();
const activeSection = computed(() => {
const sections = courseContent.value?.courseSections || [];
for (const [idx, section] of sections.entries()) {
  const lessons = section?.lessons || [];
  for (const lesson of lessons) {
    if (lesson?.id === activeLessonId.value) {
      return idx;
    }
  }
}
return 0;
});

const handleMarkLessonAsComplete = async function (lessonId: string) {
const { message, success } = await markLessonAsComplete(lessonId);
if (!success) return useAlert({ type: "error", message });
await useInsideLesson({ immediate: true });
await getCourseContent();
await getCourseInfo();
};

const handleLessonNavigation = function (
lessonId: string,
lessonAvailability: boolean
) {
if (!lessonAvailability) {
  scrollTo({ top: 0, behavior: "smooth" });
  return useAlert({
    type: "error",
    message: t("youMustCompleteThePreviousLessonToContinue"),
  });
}
navigateTo(
  localePath(`/program/details/${activeCourseId.value}/lesson/${lessonId}`)
);
};
</script>

<style scoped></style>
