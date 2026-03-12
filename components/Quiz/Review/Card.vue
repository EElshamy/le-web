<template lang="pug">
.flex.justify-between.items-start(class="p-[16px] gap-7 bg-[#F8F5F3] border border-[#EDEAE7] rounded-[8px]")
        .flex.flex-col.gap-2.w-full
            div.flex.justify-between.items-start.gap-7.pb-2
                .flex.flex-col.gap-3 
                    p(class="lg:label-prominent-2 label-prominent-3 max-w-[200px] lg:max-w-[455px] leading-[22px] lg:leading-[28px]") {{ locale === 'en' ? data?.question?.enQuestionTitle : data?.question?.arQuestionTitle }}
                    p.text-neutral-700(class="lg:label-3 label-4") {{ t('yourAnswer') }}: #[span.text-neutral-900 {{ data?.answers.map((answer) => locale === 'en' ? answer?.enAnswerTitle : answer?.arAnswerTitle)?.join(', ') }} ]
                div(class="w-fit py-[4px] px-[6px] text-white rounded-[4px] text-[10px] lg:text-[12px]" :class="{ 'bg-[#087051]': data?.isCorrect, 'bg-[#C62828]': !data?.isCorrect }") 
                    p.whitespace-nowrap {{ data?.isCorrect ? t('correct') : t('incorrect') }}
        
            div(class="border-t pt-3" v-if="!data?.isCorrect") 
                p.text-neutral-700(class="lg:label-3 label-4") {{ t('correctAnswer') }}: #[span(class="text-[#087051]") {{ data?.question?.correctAnswers?.map((answer) => locale === 'en' ? answer?.enAnswerTitle : answer?.arAnswerTitle).join(', ') }}]
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();

const { t, locale } = useI18n();
</script>

<style scoped></style>
