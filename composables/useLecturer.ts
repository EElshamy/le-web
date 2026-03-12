interface opts {
  immediate?: boolean;
  grabIdFromRoute?: boolean;
}

interface response {
  data?: any;
  message: string;
  success: boolean;
}

const lecturer = ref();
const learningPrograms = ref();
const courses = computed(() =>
  learningPrograms?.value?.filter(
    (learningProgram: any) =>
      learningProgram?.type === "COURSE" && !learningProgram?.isLiveCourse
  )
);
const programs = computed(() =>
  learningPrograms?.value?.filter(
    (learningProgram: any) => learningProgram?.type === "WORKSHOP"
  )
);
const lives = computed(() =>
  learningPrograms?.value?.filter(
    (learningProgram: any) =>
      learningProgram?.type === "COURSE" && learningProgram?.isLiveCourse
  )
);
const subscriptions = ref()
const paths = ref();

export const useLecturer = async function (opts?: opts) {
  const { immediate, grabIdFromRoute } = opts as opts;
  const route = useRoute();
  const lecturerId = route.params.id as string;
  const getLecturer = async function (id?: string, slug?: string) {
    const { data: currentLecturer } = await useAsyncData(
      `getLecturer-${lecturerId || id}`,
      () =>
        GqlLecturer({
          // lecturerId: grabIdFromRoute ? lecturerId : (id as string),
          slug: (slug as string) || lecturerId,
        }),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );
    const { data, message, success } = currentLecturer?.value
      ?.lecturer as response;

    if (success) {
      lecturer.value = data;
      learningPrograms.value = data?.courses;
      paths.value = data?.diplomas?.filter(
        (path: any) => !path?.accessDurationPerMonths
      );
      subscriptions.value = data?.diplomas?.filter(
        (path: any) => path?.accessDurationPerMonths
      )
    }
  };

  if (immediate) {
    await getLecturer();
  }

  return { getLecturer, lecturer, courses, programs, paths, lives, subscriptions };
};
