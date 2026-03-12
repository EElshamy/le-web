interface response {
  data?: any;
  message: string;
  success: boolean;
}

const activeTab = ref<string>("course-content");
const activeCourseId = ref<string>("");
const courseInfo = ref();
const courseContent = ref();
const courseDiscussion = ref();

const loading = ref<boolean>(false);
export const useInsideCourse = function () {
  const { t, locale } = useI18n();
  const tabs = computed(() => {
    return [
      {
        label: t("courseContent"),
        name: "course-content",
      },
      {
        label: t("discussion"),
        name: "discussion",
      },
      {
        label: t("resources"),
        name: "resources",
      },
      {
        label: t("reviews"),
        name: "reviews",
      },
    ];
  });

  const getCourseInfo = async function () {
    if (!activeCourseId.value)
      return useAlert({
        type: "error",
        message: "No active course at this moment",
      });
    const { data, status } = await useLazyAsyncData("getCourseInfo", () =>
      GqlInsideCourseInfo({ courseId: activeCourseId.value })
    );

    watch(status, () => {
      if (status.value === "success") {
        const {
          data: course,
          message,
          success,
        } = data?.value?.course as response;
        courseInfo.value = course;
      }
    });
  };

  const getCourseContent = async function () {
    if (!activeCourseId.value)
      return useAlert({
        type: "error",
        message: "No active course at this moment",
      });

    const { data, status } = await useAsyncData("insideCourse", () =>
      GqlInsideCourseSallabusSite({ courseId: activeCourseId.value })
    );

    watch(
      status,
      () => {
        if (status.value === "success") {
          const {
            data: insideCourse,
            message,
            success,
          } = data?.value?.insideCourseSallabusSite as response;
          courseContent.value = insideCourse;
        }
      },
      { immediate: true }
    );
  };

  const getCourseDiscussion = async function () {
    if (!activeCourseId.value) return;
    const { data, status } = await useLazyAsyncData("getComments", () =>
      GqlComments({ courseId: activeCourseId?.value })
    );

    watch(status, () => {
      if (status.value === "success") {
        const {
          data: discussion,
          message,
          success,
        } = data?.value?.comments as response;
        courseDiscussion.value = discussion?.items;
      }
    });
  };

  return {
    getCourseInfo,
    getCourseContent,
    getCourseDiscussion,
    activeTab,
    tabs,
    activeCourseId,
    courseInfo,
    courseContent,
    courseDiscussion,
  };
};
