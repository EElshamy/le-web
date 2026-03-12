import type {
  DiplomasSiteFilterInput,
  DiplomaSortInput,
  PaginatorInput,
} from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export interface tracksOptions {
  filter?: DiplomasSiteFilterInput;
  sort?: DiplomaSortInput;
  paginate?: PaginatorInput;
}

export const useTracks = async function (input?: {
  immediate: boolean;
  key?: string;
}) {
  const { immediate, key } = input as { immediate: boolean; key?: string };
  const tracks = ref<[]>([]);
  const page = ref<number>(1);
  const paginationInfo = ref();
  const loading = ref<boolean>(false);

  const getTracks = async function (
    limit: number = 4,
    reset: boolean = false,
    options?: tracksOptions
  ) {
    if (reset) {
      page.value = 1;
    }

    const { data: programs } = await useAsyncData(
      key || "tracks",
      () => GqlDiplomasSite(options),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );

    const { data, message, success } = programs?.value
      ?.diplomasSite as response;

    if (success) {
      tracks.value = data?.items;
      paginationInfo.value = data?.pageInfo;
      page.value += 1;
    }

    return { data, message, success };
  };

  if (immediate) {
    await getTracks();
  }

  return { getTracks, tracks, loading, paginationInfo };
};
