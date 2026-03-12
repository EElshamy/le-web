<template lang="pug">
    BaseSection(v-bind="baseSectionProps" :gridCols="6" v-if="data?.items?.length || loading")

        //- Filters
          //- TODO: Add filters component and update data based on the emitted value
        
        //- Fallback
        template(v-for="item in data?.items" :key="item?.id" v-if="!loading")
            ExpertCard(:data="item" class="flex-shrink-0 md:w-full")
        
        //- Loading
        template(v-for="i in limit" :key="i" v-else)
            SkeletonTest(imageRounded="md" imageHeight="auto")
    
    //- Empty state fallback
    .flex.items-center.justify-center(v-else-if="!loading" class="py-[140px]")
      AppEmptyData(:title="t('thereAreNoTracksCurrently')" :subTitle="t('soonYouWillFindOrganizedLearningPathsThatHelpYouLearnWithClearAndSystematicSteps')")
        template(#icon)
          IconEmptyPrograms
    
    //- Pagination
    //- .flex.items-center.justify-center.w-full(v-if="data?.items?.length && data?.pageInfo?.totalPages > 1")
        AppPagination(v-model="activePage" :totalPages="data?.pageInfo?.totalPages")
</template>

<script setup lang="ts">
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
}

const app = useNuxtApp();
const props = defineProps<Props>();
const { t, locale } = useI18n();
const { activePage } = usePagination();

const baseSectionProps = computed(() => {
  if (props.hasLink) {
    return {
      title: t("experts"),
      link: "/lectures",
      linkTitle: t("allExperts"),
      gridCols: 6,
    };
  }
});

const loading = computed(() => status.value === "pending");

const { data, error, status } = useAsyncData(
  `paths-${props.id}`,
  () =>
    GqlLecturers({
      paginate: {
        page: activePage.value,
        limit: props.limit,
      },
    }),
  {
    transform: (data) => data?.lecturers?.data,
    getCachedData(key) {
      return app.payload.data[key] || app.static.data[key];
    },
    watch: [activePage],
  }
);
</script>

<style scoped></style>
