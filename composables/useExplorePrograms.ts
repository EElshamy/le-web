import { ExploreSortByEnum, SortTypeEnum } from "#gql/default";

interface Response {
  data?: any;
  message: string;
  success: boolean;
}

export const useExplorePrograms = () => {
  const { data, error, status } = useAsyncData(
    "explorePrograms",
    () =>
      GqlLearningProgramsExplore({
        sort: {
          sortBy: ExploreSortByEnum.UPDATED_AT,
          sortType: SortTypeEnum.DESC,
        },
        popularCoursesLimit: 12,
      }),
    {
      server: true,
      lazy: true,
      getCachedData: (key, nuxtApp) => {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
      },
      transform: (res: any) => {
        const response = res.learningProgramsExplore as Response;
        if (response?.success) {
          return {
            courses: response.data?.popularCourses ?? [],
            programs: response.data?.latestWorkshops ?? [],
            tracks: response.data?.pathDiplomas ?? [],
            lives: response?.data?.liveCourses ?? [],
            subscriptionDiplomas: response?.data?.subscriptionDiplomas ?? [],
          };
        }
        return { courses: [], programs: [], tracks: [], lives: [] };
      },
    }
  );

  const loading = computed(() => status.value === "pending");

  return {
    courses: computed(() => data.value?.courses),
    programs: computed(() => data.value?.programs),
    tracks: computed(() => data.value?.tracks),
    lives: computed(() => data.value?.lives),
    subscriptionDiplomas: computed(() => data.value?.subscriptionDiplomas),
    loading,
    error,
  };
};
