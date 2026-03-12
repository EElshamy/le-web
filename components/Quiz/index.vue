<template lang="pug">
    .card(class="px-[8px] lg:px-auto py-[20px] mx-auto mt-[20px] rounded-[8px] w-full lg:w-[661px]")
        h1(class="heading-6 lg:heading-5") {{ data?.title }}

        .card(class="bg-[#F8F5F3] flex flex-col border gap-7 p-[24px] mt-8 rounded-[8px]")
            .flex.items-center(class="gap-[8px]")
                IconQuiz(class="text-black")
                p(class="label-prominent-3 lg:label-prominent-2") {{ t('quizDetails') }}
            .flex.flex-col.gap-5
                .grid.gap-3(class="grid-cols-3")
                    div(class="bg-white rounded-[6px] flex items-center justify-center py-[21px]")
                        .flex.flex-col.gap-2.text-center
                            p(class="label-prominent-1 lg:heading-6") {{ data?.numberOfQuestions }}
                            p(class="label-4 lg:label-3") {{ t('questions') }}
                    div(class="bg-white rounded-[6px] flex items-center justify-center py-[21px]")
                        .flex.flex-col.gap-2.text-center
                            p(class="label-prominent-1 lg:heading-6") {{ data?.passingGrade }}%
                            p(class="label-4 lg:label-3") {{ t('passingGrade') }}
                    div(class="bg-white rounded-[6px] flex items-center justify-center py-[21px]")
                        .flex.flex-col.gap-2.text-center
                            p(class="label-prominent-1 lg:heading-6") {{ data?.duration || 0 }}
                            p(class="label-4 lg:label-3") {{ t('minute') }}

                .flex.items-center.justify-between(class="bg-[#EDEAE7] p-[12px] rounded-[6px]")
                    p(class="label-prominent-4 lg:label-prominent-3") {{ t('numberOfAllowedAttempts') }}
                    div(class="bg-[#DEDAD6] py-[4px] px-[6px] rounded-[4px] text-[10px] font-400")
                        p.whitespace-nowrap {{ data?.availableAttemptsForUser > 0  ? `${data?.availableAttemptsForUser} / ${data?.attemptsAllowed} ${t('attempt')}` : 0 }}

                .flex.items-center.gap-2(v-if="data?.showCorrectAnswers")
                    IconAlert(class="text-gray-500 size-[16px]")
                    p.label-4.text-neutral-800 {{ t('correctAnswersWillBeShownAfterSubmittingTheQuiz') }}
            button.btn-primary.w-fit.label-prominent-3.gap-1(@click="handleGoToBtn(data?.id)" :disabled="!data?.canReSubmit")
                IconTryAgain(v-if="data?.userLastAttempt")
                span  {{ data?.userLastAttempt ? t('retryQuiz') : t('startQuiz') }}

        .card(class="flex flex-col gap-7 p-[24px] mt-[16px] rounded-[8px]" v-if="data?.userLastAttempt" :class="{ 'bg-[#D1FADF]': data?.userLastAttempt?.isPassed, 'bg-[#FDECEC]': !data?.userLastAttempt?.isPassed }")
            .flex.items-center.justify-between
                .flex.flex-col(class="gap-[8px]")
                    p.label-prominent-3 {{ data?.userLastAttempt?.isPassed ? t('youSuccessfullyPassedThisExam') : t('youHaventPassedThisExamYet') }}
                    p.heading-6(:class="{ 'text-[#087051]': data?.userLastAttempt?.isPassed, 'text-[#C62828]': !data?.userLastAttempt?.isPassed }") {{ data?.userLastAttempt?.score?.toFixed(2) }}%
                button.text-primary.label-prominent-4(@click="reviewQuiz = true" class="disabled:cursor-not-allowed disabled:opacity-50" :disabled="!data?.showCorrectAnswers") {{ t('reviewAnswers') }}

    QuizReview(v-model="reviewQuiz" v-if="reviewQuiz" :attemptId="data?.userLastAttempt?.id")
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const reviewQuiz = ref<boolean>(false);
function handleGoToBtn(id: string) {
  if (process.client) {
    localStorage.removeItem(`quiz-idx-${id}`);
    localStorage.removeItem(`quiz-answers-${id}`);
  }
  navigateTo(`/quiz/${id}`);
}
</script>

<style scoped></style>
