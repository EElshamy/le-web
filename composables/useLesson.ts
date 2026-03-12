interface response {
  data?: any;
  message: string;
  success: boolean;
}

const activeLessonId = ref<number | null>(null);
const activeLessonContent = ref();
const loading = ref<boolean>(false);

export const useLesson = async () => {
  const route = useRoute();
  const lessonId = computed(() => route.params.lessonId as string);

  activeLessonId.value = null;

  watchEffect(async () => {
    if (!lessonId.value) return;

    try {
      loading.value = true;
      const { data: lesson, refresh } = await useAsyncData(
        `lesson-${lessonId.value}-${Date.now()}`, // unique key per lesson
        () => GqlLessonSite({ lessonId: Number(lessonId.value) }),
        { watch: [lessonId], immediate: true, cache: false }
      );

      const { data } = lesson.value?.lessonSite as response;
      activeLessonContent.value = data;
      activeLessonId.value = Number(lessonId.value);
      setTimeout(() => {
        loading.value = false;
      }, 500);
    } catch (e: any) {
      console.error(e);
    }
  });

  return { activeLessonId, activeLessonContent, loading };
};

export const getLessonInfo = function () {
  return { activeLessonId, activeLessonContent };
};

export const markLessonAsComplete = async function (lessonId: string) {
  try {
    const { data: markAsComplete } = await useAsyncData(
      `markAsComplete-${Math.random() * 100}`,
      () => GqlToggleLessonCompletion({ lessonId })
    );
    const { data, message, success } = markAsComplete?.value
      ?.toggleLessonCompletion as response;
    return { data, message, success };
  } catch (e: any) {
    console.log(e);
    return {
      message: !navigator.onLine
        ? useNuxtApp().$i18n.t("noInternetConnection")
        : useNuxtApp().$i18n.t("somethingWentWrong"),
      success: false,
    };
  }
};
