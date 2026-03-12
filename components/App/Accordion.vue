<template lang="pug">
    //- pre {{options?.lessons}}
    .flex.flex-col(class="gap-5" :class="[customClass]")
        template(v-for="item, idx in options")
            div.accordion-container(class="bg-[#F8F5F3] p-[24px] rounded-[8px] border-[#EDEAE7] cursor-pointer" :class="{ '!rounded-0': headerNotRounded }")
                .accordion-item.flex.items-center.justify-between.gap-3(@click="handleToggleAccordionActiveItems(idx)")
                    .flex.flex-col
                        slot(name="accordion-item" :item="item")
                            p(class="text-[16px] lg:text-[20px] fon-400") {{ locale === 'en' ? item?.enTitle : item?.arTitle }}
                            .flex.items-center.gap-2
                              span(class="text-[14px] font-light" v-if="item?.videosCount ") {{ item?.videosCount }} {{ t('video') }}
                              div(class='size-2px bg-[#5D5A57] rounded-full' v-if="item?.articlesCount && item?.videosCount")
                              span(class="text-[14px] font-light" v-if="item?.articlesCount") {{ item?.articlesCount }} {{ t('article') }}
                    IconArrowDown.flex-shrink-0(class="transition ease-in-out duration-300" :class="{ 'rotate-180':  activeItems.includes(idx)}")

                .accordion-active-item.mt-7(v-if="activeItems.includes(idx)" class="transition space-y-5 ease-in-out duration-500")
                    slot(name="accordion-active-content" :lessons="item?.lessons || item?.courseSections")
                        template(v-for="lesson in item?.lessons" v-if="type !== 'track'")

                          .flex.items-center.justify-between
                              .flex.items-start.gap-3
                                IconVideo(v-if="lesson?.type==='VIDEO'" class="shrink-0")
                                IconArticle(v-if="lesson?.type === 'ARTICLE'" class="shrink-0")
                                IconLive(v-if="lesson?.type === 'LIVE_SESSION'" class="shrink-0")
                                IconQuiz(v-if="lesson?.type === 'QUIZ'" class="shrink-0")
                                .flex.flex-col.gap-1
                                  p(class="label-prominent-3") {{ locale === 'en' ? lesson.enTitle : lesson?.arTitle }}
                                  p(class="text-neutral-800 label-4" v-if="lesson?.learningTimeInMinutes") {{ lesson?.learningTimeInMinutes }} {{ t('minutes') }}
                                  .flex.items-center.gap-1.mt-1.label-4(v-if="lesson?.liveSessionStartAt")
                                    IconClock(class="size-[12px]")
                                    p {{ formatTimestampToTime(lesson?.liveSessionStartAt) }} - {{ formatTimestampToTime(lesson?.liveSessionEndAt) }}
                              button(class="label-prominent-4 text-primary underline" @click.stop="$emit('preview', lesson)" v-if="lesson?.isPreview && lesson?.type != 'QUIZ'") {{ t('preview') }}
                        template(v-else)
                          div(class="content-area course-about" v-html=" locale === 'en' ? item?.courseDetail?.enAbout : item?.courseDetail?.arAbout")
                          NuxtLink.flex.items-center.gap-2.text-secondary(:to="localePath(`/program/${item?.slug}`)")
                            span {{ t('view') }} {{ $t(item?.type?.toLowerCase() || '') }}
                            IconArrowLeft(class="ltr:rotate-180")

</template>

<script setup lang="ts">
const props = defineProps<{
  options: [];
  customClass?: string;
  headerNotRounded?: boolean;
  type?: string;
  initialActive?: number;
}>();
const emit = defineEmits(["preview"]);

const { t, locale } = useI18n();
const localePath = useLocalePath();
const activeItem = ref<number | null>(0);
const activeItems = ref<number[]>(
  props.initialActive ? [props.initialActive] : [0],
);
const { formatTimestampToTime } = useFormatter();

// One item to be active at a time
const handleToggleAccordionActiveItem = function (idx: number) {
  activeItem.value = idx;
};

// Multi items to be active at the same time
const handleToggleAccordionActiveItems = function (idx: number) {
  const currentIdxLocation = activeItems.value?.indexOf(idx) as number;
  if (currentIdxLocation === -1) {
    return activeItems.value.push(idx);
  }
  return activeItems.value.splice(currentIdxLocation, 1);
};

// Watcher for the initialActive value , to check on lg screens if the current active lesson is in different section , opens the new section
watch(
  () => props.initialActive,
  () => {
    activeItems.value = [props.initialActive as number];
  },
);
</script>

<style scoped></style>
