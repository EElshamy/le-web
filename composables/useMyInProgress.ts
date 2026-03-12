interface opts {
  immediate: boolean;
}

interface response {
  data?: {
    items: any[];
    pageInfo?: {
      totalPages: number;
      totalItems: number;
      page: number;
      limit: number;
    };
  };
  message: string;
  success: boolean;
}

export const useMyInProgress = async function (opts: opts) {
  const { immediate } = opts;
  const myInProgress = ref<any[]>([]);
  const page = ref(1);
  const totalPages = ref(1);
  const limit = 10;

  const getMyInProgress = async function () {
    const { data: res } = await useAsyncData(
      `getMyInProgress-${page.value}`,
      () => GqlMyInProgress({ paginate: { page: page.value, limit: limit } })
    );

    const response = res?.value?.myInProgress as response;
    const { data, message, success } = response || {};

    if (success && data) {
      myInProgress.value = data.items;
      if (data.pageInfo) {
        totalPages.value = data.pageInfo?.totalPages;
      }
    }
  };
  watch(page, async () => {
    await getMyInProgress();
  });

  if (immediate) {
    await getMyInProgress();
  }

  return { myInProgress, getMyInProgress, page, totalPages };
};
