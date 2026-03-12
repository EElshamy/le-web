<template lang="pug">
    AppModal(v-model="model" v-if="model && width < 1024" :scrollTopBottomOnMobile="true" :showActions="false" customStyle="py-[27px]")
        h1.label-prominent-1 {{ t('courseContent') }}
        .flex.flex-col.overflow-y-scroll.pb-5.mt-5
            //- .flex.items-center.justify-between(class="px-[32px] py-[20px]")
            //-     p.label-label-prominent-1 {{ t('content') }}
            //-     button(@click="$emit('closeMenu')"): IconX
            AppAccordion(:options="courseContent?.courseSections" :initialActive="activeSection")
                template(#accordion-item="{ item }")
                    .flex.flex-col.gap-3(class="px-[8px]")
                        p.label-prominent-2 {{locale === 'en' ? item?.enTitle : item?.arTitle }}
                        //- p.label-3 {{ item?.learningTimeInMinutes }} {{ t('minutes') }}
                template(#accordion-active-content="{ lessons }")
                    template(v-for="lesson in lessons")
                        .flex.items-start.gap-3(class="px-[12px]" :class="{ 'bg-white py-[12px] rounded-[8px]': lesson?.id == activeLessonId }" @click="navigateTo(localePath(`/program/details/${activeCourseId}/lesson/${lesson?.id}`)), model = false")
                            button(:disabled="lesson?.type === 'QUIZ' || lesson?.isCompleted || !lesson?.isAvailable" @click.stop="handleMarkLessonAsComplete(lesson?.id), !lesson.isCompleted ? lesson.isCompleted = true : lesson.isCompleted = false"): IconCheck(class="size-[20px]" :class="{ 'text-white fill-green-600': lesson?.isCompleted }")
                            .flex.flex-col.gap-3
                                p.label-prominent-3 {{ locale === 'en' ? lesson?.enTitle : lesson?.arTitle }}
                                .flex.items-center.gap-2
                                    IconVideo(v-if="lesson?.type === 'VIDEO'")
                                    IconArticle(v-if="lesson?.type === 'ARTICLE'")
                                    IconLive(v-if="lesson?.type === 'LIVE_SESSION'")
                                    IconQuiz(v-if="lesson?.type === 'QUIZ'" class="shrink-0")
                                    p.label-4(v-if="lesson?.learningTimeInMinutes") {{ lesson?.learningTimeInMinutes }} {{ t('minutes') }}
</template>

<script setup lang="ts">
const model = defineModel();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { activeLessonId } = await useInsideLesson();
const { courseContent, getCourseInfo } = useInsideCourse();
const { activeCourseId } = useInsideCourse();
const { width } = useWindowSize();

// trigger active section based on current active lesson
const activeSection = computed(() => {
  for (const [idx, section] of courseContent?.value?.courseSections?.entries()) {
    for (const lesson of section?.lessons) {
      if (lesson?.id === activeLessonId.value) {
        return idx;
      }
    }
  }
});

const handleMarkLessonAsComplete = async function (lessonId: string) {
  const { message, success } = await markLessonAsComplete(lessonId);
  if (!success) return useAlert({ type: "error", message });
  await getCourseInfo();
};
</script>

<style scoped></style>
