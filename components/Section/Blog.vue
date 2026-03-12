<template lang="pug">
    BaseSection(v-bind="baseSectionProps" :gridCols="5" v-if="data?.items?.length || loading")

        //- Filters
        template(#filters v-if="hasFilter")
            //- BlogFilter(id="blogFilters" @change="(val) => activeCategory = val")
            .flex.items-center.justify-between(class="mb-[24px] lg:mb-[48px]")
              .items-center.gap-2(class="lg:flex hidden")
                  InputCustomSelect(v-if="filters?.includes('blogCategories')" :placeholder="t('category')" @change="(val) => handleFilterChange(inputArgs, 'filters', 'categoryIds', val)" :values="inputArgs?.filters?.categoryIds" @click="parent = 'filters', child = 'categoryIds'" :options="blogCategories" customClass="border-primary text-primary")
                  InputCustomSelect(v-if="filters?.includes('levels')" :placeholder="t('level')" @change="handleFilterChange" @click="parent = 'filters', child = 'level'" :options="levels" customClass="border-primary text-primary")
              
              button.btn-outline-primary.flex.items-center.gap-2(class="lg:hidden black" @click="openFilterDrawer = true")
                IconFilter 
                p {{ t('filters') }}

              button.flex.items-center.text-primary.f-16-14.font-300.gap-2(v-if="sortable" @click="handleSortChange" class="border border-primary py-[10px] px-[14px] rounded-[6px] lg:border-0")
                IconSort 
                p(class="lg:block hidden") {{ inputArgs.sort?.sortType === 'DESC' ? t('newestToOldest') : t('oldestToNewest') }}

        //- Fallback
        template(v-for="item in data?.items" :key="item?.id" v-if="!loading") 
            ProgramCard(:data="item" :isBlog="true")
        
        //- Loading
        template(v-for="i in limit" :key="i" v-else)  
            SkeletonTest(imageRounded="md" imageHeight="auto")
    
    //- Empty state fallback
    .flex.items-center.justify-center(v-else-if="!loading" class="py-[140px]")
        AppEmptyData(:title="t('thereIsNoBlogsCurrently')" :subTitle="t('newBlogsWillBeAddedSoonToHelpYouDevelopYourSkillsInVariousFields')")
          template(#icon)
            IconEmptyPrograms

    //- Pagination
    .flex.items-center.justify-center.w-full(v-if="data?.items?.length && data?.pageInfo?.totalPages > 1")
        AppPagination(v-model="activePage" :totalPages="data?.pageInfo?.totalPages")
    
    FiltersDrawer(v-model="openFilterDrawer" v-if="openFilterDrawer" @apply="handleApplyFilters" :activeCategoriesIds="inputArgs?.filters?.categoryIds" :filters)
</template>

<script setup lang="ts">
import { SearchSpaceEnum, SortTypeEnum, BlogSortEnum } from "#gql/default";

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
   * a boolean flag indicates if the section has filters
   */
  hasFilter: boolean;

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
const searchQuery = route.query.q as string;
const activeCategory = ref<number | undefined>(
  Number(route.query.tab as string) || undefined
);
const openFilterDrawer = ref<boolean>(false);
const { blogCategories, handleFilterChange } = await useFilters(props.filters);

// Filters
const parent = ref();
const child = ref();

const baseSectionProps = computed(() => {
  if (props.hasLink) {
    return {
      title: t("paths"),
      link: "/paths",
      linkTitle: t("allPaths"),
      gridCols: 5,
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
  },
  sort: {
    sortType: SortTypeEnum.DESC,
    sortBy: BlogSortEnum.CREATED_AT,
  },
});

const loading = computed(() => status.value === "pending");

const { data, error, status } = useAsyncData(
  `blogs-${props.id}-${activePage.value}-${searchQuery}`,
  () =>
    GqlBlogs({
      filter: {
        ...inputArgs?.filters,
        searchKey: searchQuery,
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
    transform: (data) => data?.blogs?.data,
    watch: [activePage, activeCategory, inputArgs],
  }
);

const handleSortChange = function () {
  inputArgs?.sort?.sortType === "DESC"
    ? (inputArgs.sort.sortType = SortTypeEnum.ASC)
    : (inputArgs.sort.sortType = SortTypeEnum.DESC);
};

const handleApplyFilters = function (filter: {
  categoriesIds: any;
  levelsFilter: any;
}) {
  inputArgs.filters.categoryIds = filter?.categoriesIds?.length
    ? filter?.categoriesIds
    : undefined;
};
</script>

<style scoped></style>
