<template lang="pug">
    .app-container(class="pb-[103px]")
        .flex.flex-col.gap-7(class="pt-[24px] lg:pt-[64px]")
            h1(class="heading-6 lg:heading-5") {{ searchCount }} {{ t('searchResults') }}: "{{ searchKey }}"
            AppTabs.h-20(v-model="activeTab" :tabs class="mt-[50px] !gap-[30px]")

        SectionPath(v-if="type === 'paths'" :id :limit="6" :hasLink="false" :search="searchKey")
        SectionBlog(v-else-if="type === 'blogs'" :id :limit :hasLink="false" :search="searchKey")
        SectionProgram(v-else :programType="type" :id :limit :hasLink="false" :search="searchKey")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const searchKey = computed(() => (route.query.q as string) || '');
const activeTab = ref(route.query.tab || "courses");
const { getSearch, courses, programs, tracks, blogs, isSearching } = useSearch();
const tabs = [
  { label: t("courses"), name: "courses" },
  { label: t("programs"), name: "programs" },
  { label: t("paths"), name: "paths" },
  { label: t("liveWorkshops"), name: "live-workshops" },
  { label: t("blogs"), name: "blogs" },
];

const type = computed(() => {
  switch (activeTab.value) {
    case "courses": return "course";
    case "programs": return "program";
    case "live-workshops": return "liveWorkshop";
    case "paths": return "paths";
    case "blogs": return "blogs";
    default: return "course";
  }
});

const id = computed(() => `${route.path}-${type.value}`);
const componentId = computed(() => `search-res-${searchKey.value}-${type.value}`);
const limit = computed(() => (activeTab.value === "programs" ? 6 : 12));
watch(
  () => route.query.q,
  async (newQuery) => {
    if (newQuery) {
      await getSearch(newQuery as string);
    }
  },
  { immediate: true }
);

const searchCount = computed(() => {
  switch (activeTab.value) {
    case "courses": return courses.value?.length || 0;
    case "programs": return programs.value?.length || 0;
    case "paths": return tracks.value?.length || 0;
    case "live-workshops": return programs.value?.filter((p: any) => p.isLive)?.length || 0;
    case "blogs": return blogs.value?.length || 0;
    default: return 0;
  }
});
</script>

<style scoped></style>
