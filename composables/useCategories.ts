import { CategorySortEnum, SortTypeEnum } from "#gql/default";

interface opts {
  immediate: boolean;
}

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useCategories = async function (options: opts) {
  const { immediate } = options;
  const categories = ref<[]>([]);

  const getCategories = async function () {
    const { data: activeCategories } = await useAsyncData(
      "getCategories",
      () =>
        GqlCategories({
          filter: { isActive: true },
          sort: {
            sortBy: CategorySortEnum.CREATED_AT,
            sortType: SortTypeEnum.ASC,
          },
        }),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );
    const { data, message, success } = activeCategories?.value
      ?.categories as response;

    if (success) {
      categories.value = data?.items;
    }
  };

  if (immediate) {
    await getCategories();
  }

  return { categories, getCategories };
};
