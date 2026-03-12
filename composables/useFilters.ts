import { ContentLevelEnum, SortTypeEnum } from "#gql/default";
import type { Reactive } from "vue";

export type filter = "categories" | "levels" | "blogCategories";

// ['categories', 'level']
export const useFilters = async function (filters: filter[]) {
  const { t, locale } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const levels = [
    { label: t("beginner"), value: ContentLevelEnum.BEGINNER },
    {
      label: t("beginnerToIntermediate"),
      value: ContentLevelEnum.BEGINNER_INTERMEDIATE,
    },
    {
      label: t("beginnerToAdvanced"),
      value: ContentLevelEnum.BEGINNER_ADVANCED,
    },
    { label: t("intermediate"), value: ContentLevelEnum.INTERMEDIATE },
    { label: t("advanced"), value: ContentLevelEnum.ADVANCED },
  ];

  const sortOptions = [
    {
      label: t("newestToOldest"),
      value: SortTypeEnum.DESC,
    },
    {
      label: t("oldestToNewest"),
      value: SortTypeEnum.ASC,
    },
  ];

  const getActiveCategories = async function () {
    const { data } = await useAsyncData(
      `activeCategories-${route?.fullPath}`,
      () => GqlActiveCategories(),
      {
        transform: (data) =>
          data?.activeCategories?.data?.items
            ?.filter((item: any) => !item?.canBeDeleted)
            .map((item: any) => ({
              value: item?.id,
              label: locale.value === "en" ? item?.enName : item?.arName,
            })),
      }
    );
    return data;
  };

  const blogCategories = async function () {
    const { data, status, error } = await useAsyncData(
      `blogCategories-${route.fullPath}`,
      () => GqlActiveBlogCategoriesListBoard(),
      {
        transform: (data) =>
          data?.activeBlogCategoriesListBoard?.data
            ?.filter((item) => !item?.canBeDeleted)
            .map((item) => ({
              label: locale.value === "en" ? item?.enName : item?.arName,
              value: item?.id,
            })),
      }
    );
    return data;
  };

  const generateFilters = async function () {
    const filtersMap = {
      categories: [],
      levels: [],
      blogCategories: [],
    };
    if (filters?.includes("categories")) {
      filtersMap.categories = await getActiveCategories();
    }

    if (filters?.includes("levels")) {
      filtersMap.levels = levels as [];
    }

    if (filters?.includes("blogCategories")) {
      filtersMap.blogCategories = await blogCategories();
    }

    return filtersMap;
  };

  const handleFilterChange = function (
    inputArgs: Reactive<any>,
    parent: string,
    child: string,
    val: (string | number)[]
  ) {
    (inputArgs as any)[parent][child as keyof typeof inputArgs] = val.length
      ? val
      : undefined;
    router.push({
      query: {
        ...route.query,
        ...(child === "categoryIds"
          ? { categories: val.length ? Array(val) : undefined }
          : {
              levels: val?.length
                ? Array(val.map((level: string) => level?.toLowerCase()))
                : undefined,
            }),
      },
    });
  };

  const handleSortChange = function (inputArgs: Reactive<any>) {
    inputArgs?.sort?.sortType === "DESC"
      ? (inputArgs.sort.sortType = SortTypeEnum.ASC)
      : (inputArgs.sort.sortType = SortTypeEnum.DESC);
    router.push({
      query: {
        sort: inputArgs.sort.sortType.toLowerCase(),
      },
    });
  };

  return { ...(await generateFilters()), handleFilterChange, handleSortChange };
};
