<template lang="pug">
    BaseSection(v-bind="baseSectionProps" :gridCols="2" v-if="data?.items?.length || loading || filtersApplied")

        //- Filters
        template(#filters v-if="filters?.length")
          .flex.items-center.justify-between(class="mb-[24px] lg:mb-[48px]")
            .items-center.gap-2(class="lg:flex hidden")
                //- TODO: @change="handleFilterChange" find a way to assign parent and child, maybe emits
                InputCustomSelect(v-if="filters?.includes('categories')" :placeholder="t('category')" @change="(val) => handleFilterChange(inputArgs, 'filters', 'categoryIds', val)" :values="inputArgs?.filters?.categoryIds" @click="parent = 'filters', child = 'categoryIds'" :options="categories" customClass="border-primary text-primary")
                InputCustomSelect(v-if="filters?.includes('levels')" :placeholder="t('level')" @change="(val) => handleFilterChange(inputArgs, 'filters', 'level', val)" :values="inputArgs?.filters?.level" @click="parent = 'filters', child = 'level'" :options="levels" customClass="border-primary text-primary")

            button.btn-outline-primary.flex.items-center.gap-2(class="lg:hidden black" :class="{'btn-primary': filtersApplied?.length}" @click="openFilterDrawer = true")
              IconFilter
              p {{ t('filters') }}

            //- button.flex.items-center.text-primary.f-16-14.font-300.gap-2(v-if="sortable" @click="handleSortChange(inputArgs)" class="border border-primary py-[10px] px-[14px] rounded-[6px] lg:border-0")
              IconSort
              p(class="lg:block hidden") {{ inputArgs.sort?.sortType === 'DESC' ? t('newestToOldest') : t('oldestToNewest') }}

        //- Fallback
        template(v-for="item in data?.items" :key="item?.id" v-if="!loading && data?.items?.length")
            DiplomaCard(:data="item" :type="id")

        //- Empty state in case of applied filters but no data
        template(v-else-if="!data?.items?.length && !loading")
          .flex.items-center.justify-center(class="mx-auto col-span-4 py-[140px]")
            AppEmptyData(:title="t('thereAreNoTracksCurrently')" :subTitle="t('soonYouWillFindOrganizedLearningPathsThatHelpYouLearnWithClearAndSystematicSteps')")
              template(#icon)
                IconEmptyPrograms

        //- Loading
        template(v-for="i in limit" :key="i" v-else)
            SkeletonTest(imageRounded="md" imageHeight="auto")

    //- Empty state fallback
    .flex.items-center.justify-center(v-else-if="!loading" class="py-[140px]")
      AppEmptyData(:title="id == 'path' ? t('thereAreNoTracksCurrently') : t('thereAreNoSubscriptionsCurrently')" :subTitle="id == 'path' ? t('soonYouWillFindOrganizedLearningPathsThatHelpYouLearnWithClearAndSystematicSteps') : t('soonYouWillFindOrganizedLearningSubscriptionsThatHelpYouLearnWithClearAndSystematicSteps')")
        template(#icon)
          IconEmptyPrograms

    //- Pagination
    .flex.items-center.justify-center.w-full(v-if="data?.items?.length && data?.pageInfo?.totalPages > 1")
        AppPagination(v-model="activePage" :totalPages="data?.pageInfo?.totalPages")

    FiltersDrawer(v-model="openFilterDrawer" v-if="openFilterDrawer" @apply="handleApplyFilters" :activeCategoriesIds="inputArgs?.filters?.categoryIds" :activeLevels="inputArgs?.filters?.level" :filters)
    .loading(class="fixed top-0 left-0 w-full h-full bg-black/50 z-[9999]" v-if="loading")
      .loader
        .loader__item
        .loader__item
        .loader__item
</template>

<script setup lang="ts">
import { SearchSpaceEnum, SortTypeEnum, DiplomaSortEnum , DiplomaTypeEnum} from "#gql/default";

interface Props {
  /**
   * unique id used as useAsyncData key for caching
   */
  id?: string;

  /**
   * a boolean flag indicates if the section has a navigation link title
   */
  hasLink?: boolean;

  /**
   * limit is the number of items per request
   */
  limit?: number;

  /**
   * filters
   */
  filters: filter[];

  /**
   * sortable
   */
  sortable: boolean;
}

const app = useNuxtApp();
const props = defineProps<Props>();
const { t, locale } = useI18n();
const { activePage } = usePagination();
const route = useRoute();
const router = useRouter();
const searchQuery = route.query.q as string;
const openFilterDrawer = ref<boolean>(false);
const { categories, levels, handleFilterChange, handleSortChange } =
  await useFilters(props.filters);

// Filters
const parent = ref();
const child = ref();

const baseSectionProps = computed(() => {
  if (props.hasLink) {
    return {
      title: t("paths"),
      link: "/paths",
      linkTitle: t("allPaths"),
      gridCols: 2,
    };
  }
});

const inputArgs = reactive({
  filters: {
    categoryIds: route.query.categories
      ? (route.query.categories as string)
          .split(",")
          .map((id: string) => Number(id))
      : undefined,
    level: route.query.levels
      ? (route.query.levels as string)
          .split(",")
          .map((level: string) => level?.toUpperCase())
      : undefined,
  },
  sort: {
    sortType: route.query.sort
      ? (route.query.sort as string)?.toUpperCase()
      : SortTypeEnum.DESC,
    sortBy: DiplomaSortEnum.CREATED_AT,
  },
});

const loading = computed(() => status.value === "pending");
const filtersApplied = computed(
  () => inputArgs.filters?.level || inputArgs?.filters?.categoryIds
);

const { data, error, status } = useAsyncData(
  `paths-${props.id}-${activePage.value}-${searchQuery}-${inputArgs?.filters?.categoryIds}-${inputArgs?.filters?.level}-${inputArgs?.sort?.sortType}`,
  () =>
    GqlDiplomasSite({
      filter: {
        ...inputArgs?.filters,
        searchKey: searchQuery,
        diplomaType: props.id === "subscriptions" ? DiplomaTypeEnum.SUBSCRIPTION : DiplomaTypeEnum.PATH,
      },
      sort: {
        ...inputArgs?.sort,
      },
      paginate: {
        page: activePage.value,
        limit: props.limit,
      },
    }),
  {
    transform: (data) => data?.diplomasSite?.data,
    getCachedData(key) {
      return app.payload.data[key] || app.static.data[key];
    },
    watch: [activePage, inputArgs],
  }
);

// const handleSortChange = function () {
//   inputArgs?.sort?.sortType === "DESC"
//     ? (inputArgs.sort.sortType = SortTypeEnum.ASC)
//     : (inputArgs.sort.sortType = SortTypeEnum.DESC);
// };

const handleApplyFilters = function (filter: {
  categoriesIds: any;
  levelsFilter: any;
}) {
  inputArgs.filters.categoryIds = filter?.categoriesIds?.length
    ? filter?.categoriesIds
    : undefined;
  inputArgs.filters.level = filter?.levelsFilter
    ? filter?.levelsFilter
    : undefined;
};
</script>


<style scoped>
  .loader {
    position: absolute;
    top: 50%;
    left: 44%;
    right: 44%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
