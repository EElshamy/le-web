interface opts {
  immediate: boolean;
}

interface response {
  data?: {
    items: any[];
    pageInfo?: {
      totalPages: number;
    };
  };
  message: string;
  success: boolean;
}

export const useMyComplete = async function (opts: opts) {
  const { immediate } = opts;
  const myComplete = ref<any[]>([]);
  const page = ref(1);
  const totalPages = ref(1);
  const limit = 10;

  const getMyComplete = async function () {
    const { data: res } = await useAsyncData(
      `getMyComplete-${page.value}`,
      () => GqlMyCompleted({ paginate: { page: page.value, limit: limit } })
    );

    const response = res?.value?.myCompleted as response;
    const { data, message, success } = response || {};

    if (success && data) {
      myComplete.value = data.items;
      if (data.pageInfo) {
        totalPages.value = data.pageInfo.totalPages;
      }
    }
  };

  watch(page, async () => {
    await getMyComplete();
  });

  if (immediate) {
    await getMyComplete();
  }

  return { myComplete, getMyComplete, page, totalPages };
};
