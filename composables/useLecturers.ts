import type {
  LecturersBoardFilter,
  LecturersBoardSort,
  PaginatorInput,
} from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

interface options {
  filter?: LecturersBoardFilter;
  sort?: LecturersBoardSort;
  paginate?: PaginatorInput;
}

export const useLecturers = async function (input?: {
  immediate: boolean;
  key?: string;
}) {
  const { immediate, key } = input as { immediate: boolean; key: string };
  const lecturers = ref<[]>([]);
  const page = ref<number>(1);
  const loading = ref<boolean>(false);

  const getLecturers = async function (
    limit: number = 4,
    reset: boolean = false,
    options?: options
  ) {
    if (reset) {
      page.value = 1;
    }

    const { data: fetchedLecturers } = await useAsyncData(
      key || `lecturers`,
      () => GqlLecturers(options),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );

    const { data, message, success } = fetchedLecturers?.value
      ?.lecturers as response;

    if (success) {
      lecturers.value = data?.items;
      page.value += 1;
    }
  };

  if (immediate) {
    await getLecturers();
  }

  return { getLecturers, lecturers, loading };
};
