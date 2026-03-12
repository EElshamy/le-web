<template lang="pug">
    AppTabs(v-model="activeCategory" :tabs="tabs" @change="handleCategoryChange" class="h-[40px] !gap-[40px] f-mb-20-40")
</template>

<script setup lang="ts">
interface Props {
  /**
   * unique id used as useAsyncData key for caching
   */
  id?: string;

  /**
   * custom tailwind util classes for style customization
   */
  customClass?: string;
}

const { t, locale } = useI18n();
const props = defineProps<Props>();
const emit = defineEmits(["change"]);
const route = useRoute();
const activeCategory = ref<number | undefined>(
  Number(route.query.tab as string) || undefined
);

const { data, status, error } = useAsyncData(
  `blogCategories-${props.id}`,
  () => GqlActiveBlogCategoriesListBoard(),
  {
    transform: (data) =>
      data?.activeBlogCategoriesListBoard?.data
        ?.filter((item) => !item?.canBeDeleted)
        .map((item) => ({
          label: locale.value === "en" ? item?.enName : item?.arName,
          name: item?.id,
        })),
  }
);

const tabs = computed(() => {
  if (data.value) {
    return [{ label: t("all"), name: undefined }, ...(data.value as [])];
  }
});

// To set active category to the first category
// TODO: Refactor , 100% there is a better way for that
// watch(status, () => {
//   if (status.value === "success") {
//     activeCategory.value = data?.value?.[0]?.name as number;
//   }
// });

const handleCategoryChange = function (val: number) {
  activeCategory.value = val;
  emit("change", activeCategory.value);
};
</script>

<style scoped></style>
