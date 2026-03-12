<template lang="pug">
    .flex.items-center.justify-center(class="w-full" :class="{ 'h-screen': quizStatus !== 'ongoing' }")
        .app-container(class="py-8 lg:mt-5" v-if="quizStatus === 'ongoing'")
            .flex.flex-col.items-center.w-full
                .flex.items-center.justify-between(class="w-full lg:w-[874px]")

                    button.flex.items-center.gap-2.label-prominent-2(@click="leaveQuiz = true")
                        IconClose(class="size-[24px] lg:size-[20px]")
                        p(class="hidden lg:block") {{ t('leave') }}

                    .flex.flex-col.gap-2.text-center
                        p(class="label-prominent-3 lg:label-prominent-1") {{ locale === 'en' ? quiz?.enTitle : quiz?.arTitle }}
                        p(class="label-4 lg:label-3") {{ quiz?.numberOfQuestions }} {{ t('questions') }}

                    .flex.items-center.gap-2
                        IconClock(class="size-[20px]" v-if="quiz?.duration")
                        p.label-prominent-2(v-if="quiz?.duration")  {{ formatted?.min }}:{{ formatted?.sec }}

                AppProgress.mt-7(customClass="!h-[12px] w-full lg:w-[874px]"  v-if="questions?.length" :progress="quizProgress")

                .flex.flex-col.gap-7.items-center.mt-8
                    div(class="bg-neutral-200 w-fit py-[4px] px-[6px] rounded-[4px] text-[12px]")
                        p {{ t('question') }} {{ activeQuestionIdx + 1 }} {{ t('from') }} {{ quiz?.numberOfQuestions }}

                    p.text-center(class="label-prominent-1 lg:heading-6 leading-[35px]") {{ locale === 'en' ? activeQuestion?.enQuestionTitle : activeQuestion?.arQuestionTitle  }}

                .flex.flex-col.gap-5.mt-7(class="w-full lg:w-[652px]")
                    template(v-for="answer in activeQuestion?.answers")
                        QuizAnswer(:label="locale === 'en' ? answer?.enAnswerTitle : answer?.arAnswerTitle" :isMultiple="activeQuestion?.isMultipleAnswers" :id="answer?.id" @click="handleChooseAnswer(answer?.id)")

        .app-container(v-else-if="quizStatus === 'submitting'")
            .flex.flex-col.gap-5.items-center.text-center
                IconSubmitQuiz
                .flex.flex-col.gap-4
                    p(class="lg:heading-5 heading-6") {{ t('reviewingYourAnswers') }}
                    p(class="lg:body-2 body-3") {{ t('wereNowReviewingYourTestResultsItWillTakeAFewMoment') }}

        .app-container(v-else-if="quizStatus === 'finished'" class="w-[460px]")
            .flex.flex-col.gap-8.items-center
                .flex.flex-col.gap-7.items-center.text-center
                    IconQuizSuccess(v-if="finalScore?.isPassed")
                    IconQuizFail(v-if="!finalScore?.isPassed")
                    .flex.flex-col.gap-4
                        p.heading-6 {{ finalScore?.isPassed ? t('excellent') : t('youDidntPassTheExamThisTime') }}
                        p(class="label-prominent-2 lg:body-3") {{ finalScore?.isPassed ? t('youSuccessfullyPassedTheQuiz') : t('noWorriesYouCanAlwaysTryAgainAfterReviewingTheContentWeBelievePracticeLeadsToMastery') }}

                .grid.gap-2(class="grid-cols-3 w-full")
                    div(class="bg-[#F8F5F3] border border-[#EDEAE7] rounded-[6px] flex items-center justify-center py-[21px]")
                        .flex.flex-col.gap-2.text-center
                            p.heading-6 {{ finalScore?.score?.toFixed(2) }}%
                            p.label-3 {{ t('quizResult') }}
                    div(class="bg-[#F8F5F3] border border-[#EDEAE7] rounded-[6px] flex items-center justify-center py-[21px]")
                        .flex.flex-col.gap-2.text-center
                            p.heading-6.text-success-600 {{ finalScore?.numberOfCorrectAnswers }}
                            p.label-3 {{ t('correctAnswers') }}
                    div(class="bg-[#F8F5F3] border border-[#EDEAE7] rounded-[6px] flex items-center justify-center py-[21px]")
                        .flex.flex-col.gap-2.text-center
                            p.heading-6.text-danger-600 {{ finalScore?.numberOfWrongAnswers }}
                            p.label-3 {{ t('incorrectAnswers') }}
                //- pre {{}}
                div(class="gap-[8px] lg:flex lg:items-center grid grid-cols-1 w-full lg:w-fit")
                    button.btn-outline-primary.label-prominent-3(class="lg:w-fit w-full order-2 lg:order-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary" :disabled="!quiz?.showCorrectAnswers"  @click="reviewAnswers = true") {{ t('reviewAnswers') }}
                    //- pre {{finalScore}}
                    button.btn-primary(class="gap-[4px] lg:w-fit w-full order-1 lg:order-2" :disabled="!finalScore?.lesson?.canReSubmit" @click="handleGoToBtn(finalScore?.isPassed)")
                        IconTryAgain(v-if="!finalScore?.isPassed")
                        p.label-prominent-3 {{ finalScore?.isPassed ? t('goToNextLesson') : t('retryQuiz') }}
                        IconLeftArr(v-if="finalScore?.isPassed" class="ltr:rotate-180")
                    button.btn-primary.label-prominent-3(class="lg:w-fit w-full" @click="navigateToHome")  {{  t('exit') }}
    .flex.items-center.justify-center(v-if="quizStatus === 'ongoing'")
        .fixed.bottom-5.w-full(class="lg:max-w-[874px] px-[10px] lg:px-auto")
            .flex.items-center.justify-between
                ClientOnly
                    button.text-primary(:disabled="isIdxZero" @click="activeQuestionIdx--" class="disabled:opacity-50 disabled:cursor-not-allowed label-prominent-3 lg:label-prominent-2") {{ t('previousQuestion') }}
                button.btn-primary(class="gap-[4px] label-prominent-3 lg:label-prominent-2" :disabled="activeQuestionIdx === questions?.length - 1" v-if="activeQuestionIdx !== questions?.length - 1" @click="activeQuestionIdx++")
                    span {{ t('nextQuestion') }}
                    IconLeftArr
                button.btn-primary(class="gap-[4px] label-prominent-3 lg:label-prominent-2" @click="submitQuiz" v-else)
                    IconCheck(class="text-white size-[20px]")
                    span {{ t('submitQuiz') }}


    AppModal(v-if="leaveQuiz" v-model="leaveQuiz" :showActions="false")
        .flex.flex-col.items-center(class="p-[24px]")
            p.heading-6.text-center {{ t('areYouSure') }}
            p.body-3.mt-7 {{ t('youreDoingGreat') }}
            p.body-3 {{ t('ifYouLeaveYourAnswersWontBeSavedAndYoullHaveToStartOverNextTime') }}

        .flex.flex-col.gap-2(class="pb-[24px] items-center")
            button.btn-primary.w-full(@click="leaveQuiz = false") {{ t('continueQuiz') }}
            button.btn-outline-primary.w-full(@click="handleQuit") {{ t('leaveQuiz') }}

    QuizReview(v-model="reviewAnswers" v-if="reviewAnswers" :attemptId="finalScore?.id")
</template>

<script setup lang="ts">
definePageMeta({
  layout: "quiz",
});

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const reviewAnswers = ref<boolean>(false);
const leaveQuiz = ref<boolean>(false);
const isIdxZero = computed(() => activeQuestionIdx.value === 0);

const {
  quiz,
  quizStatus,
  questions,
  activeQuestion,
  activeQuestionIdx,
  answers,
  answeredQuestionsIds,
  answersIds,
  quizProgress,
  finalScore,
  addAnswer,
  getQuizByLessonId,
  submitQuiz,
  reset,
} = useQuiz();

const handleQuit = function () {
  submitQuiz();
  resetTimer();
  router.back();
};

reset();
await getQuizByLessonId(Number(id));

const {
  formatted,
  start,
  stop,
  restart,
  remaining,
  isExpired,
  resetTimer, // Add this
} = useTimer(quiz?.value?.duration, id);

// if (quiz.value?.user_attempt || quiz.value?.is_passed !== undefined) {
//   quizStatus.value = "finished";
//   finalScore.value = quiz.value.user_attempt || {
//     isPassed: quiz.value.is_passed,
//     score: quiz.value.score,
//     numberOfCorrectAnswers: quiz.value.correct_answers_count,
//     numberOfWrongAnswers: quiz.value.wrong_answers_count,
//     id: quiz.value.attempt_id, // Important for 'reviewAnswers'
//   };
//   if (process.client) {
//     localStorage.removeItem(`quiz-idx-${id}`);
//     localStorage.removeItem(`quiz-answers-${id}`);
//   }
// } else {
//   if (process.client) {
//     const savedIdx = localStorage.getItem(`quiz-idx-${id}`);
//     const savedAnswers = localStorage.getItem(`quiz-answers-${id}`);

//     if (savedIdx !== null) {
//       activeQuestionIdx.value = Number(savedIdx);
//     }
//     if (savedAnswers) {
//       answers.value = JSON.parse(savedAnswers);
//     }
//   }
//   start();
// }

if (quiz.value?.user_attempt || quiz.value?.is_passed !== undefined) {
  quizStatus.value = "finished";
  // ... (rest of your finished logic)
  resetTimer(); // Clear timer if it's already finished
} else {
  if (process.client) {
    const savedIdx = localStorage.getItem(`quiz-idx-${id}`);
    const savedAnswers = localStorage.getItem(`quiz-answers-${id}`);

    if (savedIdx !== null) activeQuestionIdx.value = Number(savedIdx);
    if (savedAnswers) answers.value = JSON.parse(savedAnswers);
  }

  // Start the timer.
  // The composable will automatically check if it should resume or start fresh.
  start();
}

if (process.client) {
  watch(activeQuestionIdx, (newVal) => {
    if (newVal !== null) {
      localStorage.setItem(`quiz-idx-${id}`, newVal.toString());
    }
  });
  watch(
    answers,
    (newVal) => {
      if (newVal) {
        localStorage.setItem(`quiz-answers-${id}`, JSON.stringify(newVal));
      }
    },
    { deep: true },
  );
}

const handleChooseAnswer = function (answerId: string) {
  addAnswer(activeQuestion?.value?.id, [answerId]);
};

const handleGoToBtn = function (passed: boolean) {
  if (passed) return router.back();
  if (process.client) {
    localStorage.removeItem(`quiz-idx-${id}`);
    localStorage.removeItem(`quiz-answers-${id}`);
  }
  answers.value = [];
  activeQuestionIdx.value = 0;
  finalScore.value = null;
  quizStatus.value = "ongoing";
  restart();
};
watch(isExpired, async () => {
  if (isExpired.value) {
    await submitQuiz();
  }
});
onBeforeRouteLeave((to, from, next) => {
  if (process.client) {
    localStorage.removeItem(`quiz-idx-${id}`);
    localStorage.removeItem(`quiz-answers-${id}`);
  }
  next();
});

function navigateToHome() {
  router.back();
}
</script>
<style scoped>
.my-selectable::selection {
  background: white; /* highlight background */
  color: white; /* selected text color */
}

/* For Firefox (needs vendor prefix) */
.my-selectable::-moz-selection {
  background: white;
  color: white;
}
</style>
