<template lang="pug">
  AppModal(v-model="model" :scrollTopBottomOnMobile="width <= 1023" :showActions="false" :dialogStyle customStyle="h-fit")
      template(#header-container)
          .flex.items-center.justify-between(class="p-[24px]")
              .flex.items-center.gap-3.w-full
                  IconSearch(class="size-[25px] text-[#76003E]")
                  input(v-model="search" @keypress="handleSearch" ref="searchInput" class="border-none focus:outline-none h-[25px] label-prominent-2 selection:bg-primary selection:text-white w-full" :placeholder="t('search')")
              button(@click="$emit('close')"): IconClose(class="size-[25px] text-[#76003E]")

      template(#default)
          div(v-if="noResults" class="flex items-center justify-center w-full py-[50px]")
              .flex.flex-col.gap-3.items-center.text-center
                  IconEmptySearch
                  p {{ t('noResultsFor') }} "{{ search }}"

          div(v-else-if="!results?.length || !search")
              p(class="text-[12px] font-400 text-[#7F7B76]") {{ t('trySearchingFor') }}
              .flex.items-center.flex-wrap(class="mt-[16px] mb-7 gap-[8px]")
                  template(v-for="suggestion in suggestions")
                      SearchSuggestion(:title="getSuggestionText(suggestion)" @clicked="(val) => search = val")

              p(class="text-[12px] font-400 text-[#7F7B76]") {{ t('browseBySections') }}
              div(class="my-[8px] max-w-full flex overflow-x-scroll scrollbar-hide md:overflow-visible md:grid md:grid-cols-4 gap-[16px]" :class="{ 'lg:grid-cols-4': categories?.length >= 4, 'lg:grid-cols-4': categories?.length >= 4, 'lg:grid-cols-3': categories?.length === 3, 'lg:grid-cols-2': categories?.length === 2, 'lg:grid-cols-1': categories?.length === 1 }")
                  template(v-for="category in categories?.slice(0, 4)")
                      div(@click="search = locale === 'en' ? category?.enName : category?.arName" class="min-w-[120px] h-[140px] cursor-pointer md:w-auto md:h-auto aspect-[3/1.6] relative rounded-[12px] overflow-hidden hover:scale-102 transition duration-300 ease-in-out")
                          NuxtImg(:src="getImageUrl(category?.image)" format="webp" :alt="locale === 'en' ? category?.enName : category?.arName" loading="lazy" :width="400" :height="240" class="w-full h-full object-cover brightness-50")
                          p.absolute.bottom-5.text-white.mx-5(class="label-prominent-3") {{ locale === 'en' ? category?.enName : category?.arName }}

          .flex.flex-col.gap-2(class='overflow-y-scroll h-[415px] cursor-pointer' v-else)
              NuxtLink.flex.items-center.gap-4.mt-4(
                  v-for="(program, idx) in balancedResults"
                  :key="program.id || idx"
                  :to="program?.type === 'COURSE' || program?.type === 'WORKSHOP' ? localePath(`/program/${program?.slug}`) : program?.type === 'DIPLOMA' ? localePath(`/paths/${program?.slug}`) : localePath(`/blogs/${program?.slug}`)"
                  @click="model = false"
              )
                  div(class="rounded-[8px] overflow-hidden w-[120px] hover:scale-101 transition duration-300 shrink-0 ease-in-out aspect-3/2")
                      NuxtImg(:src="getImageUrl(program?.thumbnail)" :alt="locale === 'en' ? program?.enTitle : program?.arTitle" format="webp" class='w-full h-full object-cover')
                  .flex.flex-col.gap-3
                      p.label-prominent-3.line-clamp-2 {{ locale === 'en' ? program?.enTitle : program?.arTitle }}
                      p.label-4 {{ locale === 'en' ? program?.category?.enName : program?.category?.arName }}

      template(#footer-container v-if="balancedResults?.length >= 4")
          div(class="p-[24px] mt-3")
              button.flex.items-center.gap-2(@click="navigateTo(localePath(`/search?q=${search}`)), model = false")
                  p {{ t('viewAllResults') }}
                  IconArrowLeft
  </template>

<script setup lang="ts">
import type { SearchKeywordsQuery } from "#gql";

const emit = defineEmits(["close"]);
const model = defineModel();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getImageUrl } = usePhoto();
const search = ref<string>("");
const {
  resetResults,
  getSearch,
  courses,
  programs,
  tracks,
  results,
  noResults,
  isSearching,
} = useSearch();

const { slugify } = useSeo(); // If used elsewhere
const searchInput = ref<null | HTMLElement>(null);

const { categories } = await useCategories({ immediate: true });
const { width } = useWindowSize();

const dialogStyle = computed(() => {
  if (width.value <= 700)
    return "min-w-full max-w-full md:min-w-[768px] md:w-[768px] shadow-lg rounded-0 top-0 !h-[100%]";
  return "min-w-full max-w-full md:min-w-[768px] md:w-[768px] shadow-lg";
});

onMounted(() => {
  isSearching.value = false;
  courses.value = [];
  programs.value = [];
  tracks.value = [];
  searchInput.value?.focus();
  window.addEventListener("keydown", async (e: KeyboardEvent) => {
    if (e.key === "Escape") model.value = false;
  });
});

watchDebounced(
  search,
  async () => {
    resetResults();
    const trimmedSearch = search.value.trim();
    if (!trimmedSearch.length) return (isSearching.value = false);
    await getSearch(search.value);
  },
  { debounce: 300 },
);

const suggestionsStatic = [
  t("injuryRehabilitation"),
  t("typesOfDiets"),
  t("healthySports"),
  t("fundamentalsOfSportsTraining"),
];

const { data } = await useAsyncGql("SearchKeywords");
console.log("SearchKeywords", data.value.searchKeywords.data);

const suggestions = computed(() => {
  return data.value?.searchKeywords?.data || [];
});

const getSuggestionText = (sug: any) => {
  return locale.value === "en" ? sug.enText : sug.arText;
};

const balancedResults = computed(() => {
  const _courses = courses.value || [];
  const _workshops = results.value?.filter((i) => i.type === "WORKSHOP") || [];
  const _diplomas = results.value?.filter((i) => i.type === "DIPLOMA") || [];
  const _blogs =
    results.value?.filter(
      (i) => !["COURSE", "WORKSHOP", "DIPLOMA"].includes(i.type),
    ) || [];

  const groups = [_courses, _workshops, _diplomas, _blogs];

  const finalOutput: any[] = [];
  let index = 0;
  while (finalOutput.length < 4) {
    let addedAny = false;

    for (const group of groups) {
      if (finalOutput.length >= 4) break;
      const item = group[index];
      if (item && !finalOutput.some((x) => x.id === item.id)) {
        finalOutput.push(item);
        addedAny = true;
      }
    }
    if (!addedAny) break;

    index++;
  }

  return finalOutput;
});

const handleSetProgramId = function (type: string, id: string) {
  switch (type) {
    case "COURSE":
      return (activeProgramId.value = id);
    case "WORKSHOP":
      return (activeProgramId.value = id);
    case "DIPLOMA":
      return (activeDiplomaId.value = id);
    default:
      return (blogId.value = id);
  }
};
</script>

<style scoped></style>
