interface response {
  data?: any;
  message: string;
  success: boolean;
}

const quiz = ref();
const quizStatus = ref<"submitting" | "ongoing" | "finished" | null>(null);
const questions = ref<[]>([]);
const activeQuestionIdx = ref<number | null>(null);
const activeQuestion = computed(() => {
  if (activeQuestionIdx.value === null) return;
  return questions.value[activeQuestionIdx.value as number];
});
const answers = ref<any[]>([]);
const finalScore = ref<any>();
const reviewAnswers = ref<any>();

// MAYBE IMPORTANT
const answeredQuestionsIds = computed(() => {
  if (!answers.value) return;
  return answers.value.map((answer: any) => answer?.questionId);
});

const answersIds = computed(() => {
  if (!answers.value) return;
  return answers.value.map((answer: any) => answer.answersIds).flat();
});

const quizProgress: Ref<number> = computed(() => {
  if (!questions.value || questions.value.length === 0) return 0;
  const currentIdx = (activeQuestionIdx.value || 0) + 1;
  const percent = (currentIdx / questions.value.length) * 100;
  return Math.round(percent);
});

export const useQuiz = function () {
  const { resetTimer } = useTimer();
  const route = useRoute();
  const lessonId = route.params.id as string;
  const STORAGE_KEY_IDX = `quiz-idx-${lessonId}`;
  const STORAGE_KEY_ANSWERS = `quiz-answers-${lessonId}`;
  const getQuizByLessonId = async function (lessonId: number) {
    const { data: quizByLessonId } = await useAsyncData(
      `quiz-${lessonId}`,
      () => GqlGetQuiz({ lessonId }),
    );
    const { data, message, success } = quizByLessonId?.value
      ?.getQuiz as response;
    quiz.value = data;
    questions.value = data?.questions;
    if (success) {
      if (process.client) {
        const savedIdx = localStorage.getItem(STORAGE_KEY_IDX);
        const savedAnswers = localStorage.getItem(STORAGE_KEY_ANSWERS);

        if (savedIdx !== null) {
          activeQuestionIdx.value = Number(savedIdx);
        } else {
          activeQuestionIdx.value = 0;
        }

        if (savedAnswers !== null) {
          answers.value = JSON.parse(savedAnswers);
        } else {
          answers.value = [];
        }
      } else {
        activeQuestionIdx.value = 0;
      }

      quizStatus.value = "ongoing";
    }
    return { data, message, success };
  };

  const addAnswer = function (
    questionId: string,
    selectedAnswersIds: string[],
  ) {
    const sameQuestionAndAnswer =
      answeredQuestionsIds.value?.includes(questionId) &&
      answersIds.value?.includes(selectedAnswersIds[0]);
    const sameQuestionDifferentAnswer =
      answeredQuestionsIds.value?.includes(questionId) &&
      !answersIds.value?.includes(selectedAnswersIds[0]);

    if (sameQuestionAndAnswer) {
      // MultiChoice
      if (activeQuestion.value?.isMultipleAnswers) {
        const questionIdx = answeredQuestionsIds.value?.indexOf(
          questionId,
        ) as number;
        answers.value[questionIdx].answersIds = answers.value[
          questionIdx
        ].answersIds?.filter(
          (answerId: string) => answerId !== selectedAnswersIds[0],
        );
        return;
      }

      answers.value = answers.value.filter(
        (answer: any) => answer.questionId !== questionId,
      );
      return;
    }

    if (sameQuestionDifferentAnswer) {
      const questionIdx = answeredQuestionsIds.value?.indexOf(questionId);

      // MultiChoice
      if (activeQuestion.value?.isMultipleAnswers)
        return (answers.value[questionIdx as number].answersIds = [
          ...answers.value[questionIdx as number].answersIds,
          ...selectedAnswersIds,
        ]);

      // Single choice
      return (answers.value[questionIdx as number].answersIds =
        selectedAnswersIds);
    }

    return answers.value.push({ questionId, answersIds: selectedAnswersIds });
  };

  const submitQuiz = async function () {
    quizStatus.value = "submitting";
    const { data: submitQuiz } = await useAsyncData(
      `submitQuiz-${quiz.value?.id}`,
      () =>
        GqlSubmitQuiz({
          input: { lessonId: Number(lessonId), userAnswers: answers.value },
        }),
    );
    const { data, message, success } = submitQuiz.value?.submitQuiz as response;
    if (success) {
      finalScore.value = data;
      quizStatus.value = "finished";
      if (process.client) {
        localStorage.removeItem(STORAGE_KEY_IDX);
        localStorage.removeItem(STORAGE_KEY_ANSWERS);
      }
    }

    resetTimer(); // Reset the timer when quiz is submitted
  };

  const getQuizReview = async function (attemptId: string) {
    const { data: quizReview } = await useAsyncData(
      `quizReview-${attemptId}`,
      () => GqlReviewAnswers({ userAttemptId: attemptId }),
    );
    const { data, message, success } = quizReview?.value
      ?.reviewAnswers as response;
    if (!success) return useAlert({ type: "error", message });
    reviewAnswers.value = data;
  };

  const reset = function () {
    quizStatus.value = null;
    quiz.value = null;
    activeQuestionIdx.value = null;
    finalScore.value = null;
    questions.value = [];
    answers.value = [];
  };

  return {
    quiz,
    quizStatus,
    questions,
    activeQuestionIdx,
    activeQuestion,
    answers,
    answeredQuestionsIds,
    answersIds,
    quizProgress,
    finalScore,
    reviewAnswers,
    getQuizByLessonId,
    addAnswer,
    submitQuiz,
    getQuizReview,
    reset,
  };
};
