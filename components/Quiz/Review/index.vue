<template lang="pug">
    AppModal(v-model="model" v-if="model" :title="t('reviewAnswers')" :showActions="false" :scrollTopBottomOnMobile="width <= 640") 
        template(#header) 
            .flex.flex-col.gap-4
                p.heading-6 {{ t('reviewAnswers') }}
                .flex.items-center.gap-2 
                    p.label-3  #[span.text-success-600 {{ reviewAnswers?.numberOfCorrectAnswers }} ] {{ t('correctAnswers') }}
                    div(class="size-[2px] rounded-full bg-black")
                    p.label-3  #[span.text-danger-600 {{ reviewAnswers?.numberOfWrongAnswers }} ] {{ t('incorrectAnswers') }}
        
        .flex.flex-col.gap-5(class="max-h-[524px] overflow-y-scroll")
            template(v-for="answerAttempt in reviewAnswers?.userAnswers") 
                QuizReviewCard(:data="answerAttempt")
        
        template(#footer-container)
            div(class="p-[12px]")

</template>

<script setup lang="ts">
const props = defineProps<{
  attemptId: string;
}>();

const model = defineModel();
const { t, locale } = useI18n();
const { width } = useWindowSize();
const { finalScore, reviewAnswers, getQuizReview } = useQuiz();

await getQuizReview(props?.attemptId || finalScore?.value?.id);
</script>

<style scoped></style>
