<template lang="pug">
    .flex.flex-col.gap-9(class="w-full lg:w-[652px]" v-if="hasResources")
        template(v-for="section in courseContent?.courseSections")
            .flex.flex-col.gap-5(v-if="section?.resources?.length")
                    h1.label-prominent-1 {{ section?.title }}
                    .flex.flex-col.gap-4
                        template(v-for="resource in section?.resources")
                            //- pre {{resource}}
                            .flex.items-center.justify-between(class="border-1 border-[#DEDAD6] bg-[#F8F5F3] py-[12px] rounded-[8px] px-[16px] transition duration-300 ease-in-out hover:scale-102")
                                .flex.items-center.gap-4
                                    IconLink(v-if="true")
                                    IconArticle(v-else)
                                    p {{ resource?.url }}
                                //- button(v-if="true" @click="navigateTo(useRuntimeConfig().public.BASE_URL + resource?.url, { external: true })"): IconNavigate
                                //- button(v-if="true" @click="navigateTo(useRuntimeConfig().public.BASE_URL + resource?.url, { external: true, open: { target: '_blank' } })"): IconNavigate
                                NuxtLink(v-if="true" :to="resource?.url" target="_blank"): IconNavigate
                                button(v-else): IconDownload(class="text-[#76003E]")
    .flex.flex-col.items-center.justify-center(class="w-full h-[800px] lg:w-[652px]" v-else)
        AppEmptyData(:title="t('noSourcesAvailableYet')")
            template(#icon)
                IconEmptyResources
        //- IconEmptyResources
        //- p {{ t('noSourcesAvailableYet') }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const { courseContent, getCourseInfo } = useInsideCourse();

const hasResources = computed(() => {
  const sectionsResourcesCount = courseContent?.value?.courseSections
    ?.map((item: any) => item?.resources?.length)
    .reduce((acc: number, num: number) => num + acc, 0);
  if (sectionsResourcesCount) return true;
  return false;
});
</script>

<style scoped></style>
