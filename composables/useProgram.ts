import type { PaginatorInput } from "#gql";

interface opts {
  grabIdFromRoute?: boolean;
  immediate?: boolean;
  includeSections?: boolean;
}

interface response {
  data?: any;
  message: string;
  success: boolean;
}

const activeProgram = ref<string>("");
const program = ref();
const sectionsAndLessons = ref();
const sectionsAndLessonsPageInfo = ref();
const loading = ref<boolean>(false);

export const useProgram = async function (input?: opts) {
  const { immediate, grabIdFromRoute, includeSections } = input as {
    grabIdFromRoute: boolean;
    immediate: boolean;
    includeSections: boolean;
  };
  const route = useRoute();
  const id = route.params.id as string;
  const { isUUID } = useIdCheck();

  const getData = async function (programId?: string, slug?: string) {
    const formatInput = computed(() => {
      if (isUUID(id)) return { courseId: (programId as string) || id };
      return { slug: (slug as string) || id };
    });
    loading.value = true;
    const { data } = await useAsyncData(
      `getProgram-${programId || id}`,
      () =>
        GqlCourse({
          ...formatInput.value,
        }),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );
    const { data: course, success, message } = data?.value?.course as response;
    activeProgram.value = programId || id;
    program.value = course;
    loading.value = false;
  };

  const getSectionsAndLessons = async function (page?: number) {
    loading.value = true;
    const { data: sections } = await useAsyncData(
      `getSectionsAndLessons-${id}-${page}`,
      () =>
        GqlSectionsAndLessonsByCourseId({
          courseId: program?.value?.id,
          paginate: { page: page || 1 },
        }),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );
    const { data, message, success } = sections?.value
      ?.sectionsAndLessonsByCourseId as response;
    sectionsAndLessons.value = !page
      ? data?.items
      : [...sectionsAndLessons?.value, data?.items].flat();
    sectionsAndLessonsPageInfo.value = data?.pageInfo;
    loading.value = false;
  };

  if (immediate) {
    await getData();
    if (includeSections) await getSectionsAndLessons();
  }

  return {
    program,
    loading,
    activeProgram,
    sectionsAndLessons,
    sectionsAndLessonsPageInfo,
    getData,
    getSectionsAndLessons,
  };
};
