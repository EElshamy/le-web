<template lang="pug">
    div(class="bg-black/50 z-[9999] fixed top-0 left-0 bottom-0 right-0" @click="model=false")
        transition(name="slide-vertical" appear)
          .fixed.bottom-0(class="right-0 left-0 bg-white h-[85%] px-[20px] py-[32px] rounded-t-[12px]" v-if="model" @click.stop)
              
              .flex.flex-col.items-between.justify-between.h-full
                div
                  //- Header
                  .flex.items-center.justify-between
                      p.label-prominent-2 {{ t('filters') }}
                      button(@click.stop="model=false") 
                          IconX
                  
                  //- Categories
                  .flex.flex-col.gap-2.mt-8(v-if="filters?.includes('categories') || filters?.includes('blogCategories')")
                      .flex.items-center.justify-between(@click="handleToggleActiveFilters('categories')")
                          p {{ t('categories') }}
                          IconDownArrow(class="transition duration-300 ease-in-out" :class="{ 'rotate-180': activeFilters?.includes('categories') }")
                      .flex.flex-col.gap-3.mt-3(v-if="activeFilters?.includes('categories')")
                          template(v-for="category in categories" :key="category?.value") 
                              .flex.items-center.gap-2
                                  input(type="checkbox" :checked="categoriesIds?.includes(category?.value)" @change="handleChangeCategory(category?.value)" class="accent-primary" :id="category?.value")
                                  label.label-3(:for="category?.value") {{ category?.label }}

                  //- Levels
                  .flex.flex-col.gap-2.mt-8(v-if="filters?.includes('levels')")
                      .flex.items-center.justify-between(@click="handleToggleActiveFilters('levels')")
                          p {{ t('level') }}
                          IconDownArrow(class="transition duration-300 ease-in-out" :class="{ 'rotate-180': activeFilters?.includes('levels') }")
                      .flex.flex-col.gap-3.mt-3(v-if="activeFilters?.includes('levels')")
                          template(v-for="level in levels" :key="level?.value") 
                              .flex.items-center.gap-2
                                  input(type="checkbox" :checked="levelsFilter?.includes(level?.value)" @change="handleChangeLevel(level?.value)" class="accent-primary" :id="level?.value")
                                  label.label-3(:for="level?.value") {{ level?.label }}
                
              
                .flex.items-center.gap-3.justify-end
                    button.btn-primary.mt-3(@click="handleApplyFilters") {{ t('apply') }}
                    button.btn-outline-primary.mt-3(v-if="categoriesIds?.length || levelsFilter?.length" @click="handleClearAll") {{ t('cleanAll') }}
</template>

<script setup lang="ts">
interface Props {
  activeCategoriesIds?: number[];
  activeLevels?: string[];
  filters: filter[];
}

const props = defineProps<Props>();
const emit = defineEmits(["apply"]);
const model = defineModel();

const { t, locale } = useI18n();
const { categories, levels } = await useFilters(["categories", "levels"]);

const activeFilters = ref<string[]>([
  "categories",
  ...(props.activeLevels ? ["levels"] : []),
]);
const categoriesIds = ref<number[]>(props.activeCategoriesIds || []);
const levelsFilter = ref<string[]>(props.activeLevels || []);

const handleToggleActiveFilters = function (filter: string) {
  if (activeFilters.value?.includes(filter))
    return (activeFilters.value = activeFilters?.value?.filter(
      (currentFilter: string) => filter !== currentFilter
    ));

  activeFilters.value.push(filter);
};

const handleChangeCategory = function (val: number) {
  if (categoriesIds?.value?.includes(val)) {
    return (categoriesIds.value = categoriesIds?.value?.filter(
      (id: number) => id !== val
    ));
  }
  return categoriesIds.value?.push(val);
};

const handleChangeLevel = function (val: string) {
  if (levelsFilter?.value?.includes(val)) {
    return (levelsFilter.value = levelsFilter?.value?.filter(
      (level: string) => level !== val
    ));
  }
  return levelsFilter.value?.push(val);
};

const handleClearAll = function () {
  categoriesIds.value = [];
  levelsFilter.value = [];
};

const handleApplyFilters = function () {
  emit("apply", {
    categoriesIds: categoriesIds.value,
    levelsFilter: levelsFilter.value,
  });
  model.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-vertical-enter-active,
.slide-vertical-leave-active {
  transition: all 0.4s ease;
}

.slide-vertical-enter-from {
  transform: translateY(100%);
}
.slide-vertical-enter-to {
  transform: translateY(0);
}

.slide-vertical-leave-from {
  transform: translateY(0);
}
.slide-vertical-leave-to {
  transform: translateY(100%);
}
</style>
