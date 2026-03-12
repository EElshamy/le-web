interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const usePopularCourses = async function (input?: {
  immediate: boolean;
}) {
  const { immediate } = input as { immediate: boolean };
  const programs = ref<[]>([]);
  const page = ref<number>(1);
  const loading = ref<boolean>(false);

  const getPrograms = async function (
    limit: number = 4,
    reset: boolean = false
  ) {
    if (reset) {
      page.value = 1;
    }

    const { data: popularPrograms } = await useAsyncData(
      "getMostPopularCourses",
      () => GqlMostPopularCourses(),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );

    const { data, message, success } = popularPrograms?.value
      ?.mostPopularCourses as response;

    if (success) {
      programs.value = data;
      page.value += 1;
    }
  };

  if (immediate) {
    await getPrograms();
  }

  return { getPrograms, programs, loading };
};
