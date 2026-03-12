<template lang="pug">
    BaseSection(v-bind="baseSectionProps" v-if="loading || data?.items?.length || filtersApplied")

        //- Filters
        template(#filters v-if="filters?.length")
          .flex.items-center.justify-between(class="mb-[24px] lg:mb-[48px]")
            .items-center.gap-2(class="lg:flex hidden")
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
            ProgramCard(:data="item")

        //- Empty state in case of applied filters but no data
        template(v-else-if="!data?.items?.length && !loading")
          .flex.items-center.justify-center(class="mx-auto col-span-4 py-[140px]")
            AppEmptyData(:title="emptyStateMeta?.title" :subTitle="emptyStateMeta?.subTitle")
              template(#icon)
                IconEmptyPrograms

        //- Loading
        template(v-for="i in limit" :key="i" v-else)
          SkeletonTest(imageRounded="md" imageHeight="auto")

    //- Empty state fallback
    .flex.items-center.justify-center(v-else-if="!loading" class="mx-auto py-[140px]")
      AppEmptyData(:title="emptyStateMeta?.title" :subTitle="emptyStateMeta?.subTitle")
        template(#icon)
          IconEmptyPrograms

    //- Pagination
    .flex.items-center.justify-center.w-full(v-if="data?.pageInfo?.totalPages > 1")
      AppPagination(v-model="activePage" :totalPages="data?.pageInfo?.totalPages")

    FiltersDrawer(v-model="openFilterDrawer" v-if="openFilterDrawer" @apply="handleApplyFilters" :activeCategoriesIds="inputArgs?.filters?.categoryIds" :activeLevels="inputArgs?.filters?.level" :filters)
    .loading(class="fixed top-0 left-0 w-full h-full bg-black/50 z-[9999]" v-if="loading")
      .loader
        .loader__item
        .loader__item
        .loader__item

</template>

<script setup lang="ts">
import {
  SearchSpaceEnum,
  SortTypeEnum,
  CoursesSiteSortEnum,
} from "#gql/default";

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
   * learning program type to fetch and handle data based of it
   */
  programType: "course" | "program" | "liveWorkshop";

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
  search?: string;
}

const app = useNuxtApp();
const props = defineProps<Props>();
const { t, locale } = useI18n();
const { activePage } = usePagination();
const route = useRoute();
// const searchQuery = route.query.q as string;
const searchQuery = computed(() => props.search || (route.query.q as string) || "");
const openFilterDrawer = ref<boolean>(false);
const { categories, levels, handleFilterChange, handleSortChange } =
  await useFilters(props.filters);

// Filters
const parent = ref();
const child = ref();

// Build section meta based on the learning program type
const baseSectionProps = computed(() => {
  switch (props.programType) {
    case "course":
      return {
        title: t("courses"),
        link: props.hasLink ? "/courses" : undefined,
        linkTitle: t("allCourses"),
        gridCols: 4,
      };
    case "program":
      return {
        title: t("programs"),
        link: props.hasLink ? "/programs" : undefined,
        linkTitle: t("allPrograms"),
        gridCols: 3,
      };
    case "liveWorkshop":
      return {
        title: t("liveWorkshops"),
        link: props.hasLink ? "/live-workshops" : undefined,
        linkTitle: t("allLives"),
        gridCols: 4,
      };
    default:
      return;
  }
});

const type = computed(() => {
  if (props.programType === "course" || props.programType === "liveWorkshop")
    return SearchSpaceEnum.COURSE;
  if (props.programType === "program") return SearchSpaceEnum.WORKSHOP;
});

// Handle empty state meta data based on the programType
const emptyStateMeta = computed(() => {
  switch (props.programType) {
    case "course":
      return {
        title: t("thereIsNoCourseCurrently"),
        subTitle: t(
          "newTrainingCoursesWillBeAddedSoonToHelpYouDevelopYourSkillsInVariousFields"
        ),
      };
    case "program":
      return {
        title: t("thereAreNoProgramsCurrentlyAvailable"),
        subTitle: t(
          "soonWeWillProvideSpecializedEducationalProgramsDesignedToAchieveYourGoalsProfessionally"
        ),
      };
    case "liveWorkshop":
      return {
        title: t("thereIsNoLiveWorkshopsCurrently"),
        subTitle: t(
          "newTrainingLiveWorkshopsWillBeAddedSoonToHelpYouDevelopYourSkillsInVariousFields"
        ),
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
      ? (route.query.sort as string).toUpperCase()
      : SortTypeEnum.DESC,
    sortBy: CoursesSiteSortEnum.CREATED_AT,
  },
});

const loading = computed(() => status.value === "pending");
const filtersApplied = computed(
  () => inputArgs.filters?.level || inputArgs?.filters?.categoryIds
);
const key = computed(
  () =>
    `learning-programs-${props.id}-${activePage.value}-${searchQuery.value}-${inputArgs.filters?.categoryIds}-${inputArgs.filters?.level}-${inputArgs?.sort?.sortType}`
);

const { data, status, error } = useAsyncData(
  key,
  () =>
    GqlCourses({
      filter: {
        ...inputArgs.filters,
        type: type.value,
        isLiveCourse: props.programType === "liveWorkshop",
        searchKey: searchQuery.value,
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
    transform: (data) => data?.courses?.data,
    getCachedData(key) {
      return app.payload.data[key] || app.static.data[key];
    },
    watch: [activePage, inputArgs, () => props.id, searchQuery],
  }
);

// const handleFilterChange = function (val: (string | number)[]) {
//   (inputArgs as any)[parent.value][child.value] = val.length ? val : undefined;
// };

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
  inputArgs.filters.level = filter?.levelsFilter?.length
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
