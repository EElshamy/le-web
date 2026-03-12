import type {
  GeneralSearchFilter,
  CoursesSortSiteInput,
  PaginatorInput,
} from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export interface programsOptions {
  filter?: GeneralSearchFilter;
  paginate?: PaginatorInput;
  sort?: CoursesSortSiteInput;
}

export const usePrograms = async function (input?: {
  immediate: boolean;
  key?: string;
}) {
  const { immediate, key } = input as { immediate: boolean; key: string };
  const programs = ref<[]>([]);
  const page = ref<number>(1);
  const paginationInfo = ref();
  const loading = ref<boolean>(false);

  const getPrograms = async function (
    limit: number = 4,
    reset: boolean = false,
    options?: programsOptions
  ) {
    if (reset) {
      page.value = 1;
    }

    loading.value = true;

    const { data: allPrograms } = await useAsyncData(
      key + options?.paginate?.page || `programs`,
      () => GqlCourses(options),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );

    const { data, message, success } = allPrograms?.value?.courses as response;

    if (success) {
      programs.value = data?.items;
      paginationInfo.value = data?.pageInfo;
      page.value += 1;
    }

    loading.value = false;

    return { data, message, success };
  };

  if (immediate) {
    await getPrograms();
  }

  return { getPrograms, programs, loading, paginationInfo };
};
