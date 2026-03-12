<template lang="pug">
    .the-app
        Html(:lang="i18nSeo.htmlAttrs.lang" :dir="i18nSeo.htmlAttrs.dir")
        header
            programDetailsNav
            div(class="lg:hidden")
              TheNav
        main(class="py-[32px]")
            AppMessage
            div.relative(class="mx-[10px] lg:mx-[80px] flex flex-col 2xl:block")
                .flex(class="order-2 mt-5 2xl:mt-0 lg:justify-center")
                    slot
                .top-0(class="2xl:absolute order-1 rtl:right-0" v-if="courseInfo")
                    .flex.flex-col.gap-8
                        .flex.gap-5(class="2xl:flex-col")
                            div(class="w-[56px] aspect-[2/2] lg:aspect-[3/2] lg:w-[132px] rounded-[8px] overflow-hidden")
                                NuxtImg(:src="getImageUrl(courseInfo?.thumbnail)" :title="locale === 'en' ? courseInfo?.enTitle : courseInfo?.arTitle" format="webp" class="w-full h-full object-cover")
                            .flex.flex-col(class="gap-[6px] lg:gap-[12px]")
                                p(class="label-prominent-3 2xl:label-prominent-1 lh-9 max-w-[350px]") {{ locale === 'en' ? courseInfo?.enTitle : courseInfo?.arTitle }}
                                .flex.items-center(class="gap-3 label-4 lg:label-3")
                                    p {{ $t(courseInfo?.type?.toLowerCase() || '') }}
                                    div(class="size-[2px] bg-black rounded-full")
                                    NuxtLink(:to="localePath('/lecturers/' + courseInfo?.users?.[0]?.slug)" class="hover:text-primary") {{ locale === 'en' ? courseInfo?.users?.[0]?.enFullName : courseInfo?.users?.[0]?.arFullName }}
                        AppTabs(:tabs v-model="activeTab" :isVertical="true" class="h-[40px] lg:h-fit" customClass="gap-7")

</template>

<script setup lang="ts">
import { setLocale } from "yup";
const localePath = useLocalePath();
const { t, locale } = useI18n();
const { getImageUrl } = usePhoto();
const { activeTab, tabs, getCourseInfo, activeCourseId, courseInfo } =
  useInsideCourse();
const route = useRoute();
const courseId = route.params.id as string;
activeCourseId.value = courseId;
// useGqlHeaders({ lang: `Eg-${locale.value}` });

const i18nSeo = useLocaleHead({
  addSeoAttributes: true,
  addDirAttribute: true,
});

setLocale({
  mixed: {
    required: ({ path }) => `${t(path)} ${t("isARequiredField")}`,
  },
  string: {
    min: ({ path, min }) =>
      `${t(path)} ${t("mustBeAtLeast")} ${min} ${t("characters")}`,
    max: ({ path, max }) =>
      `${t(path)} ${t("mustBeAtMost")} ${max} ${t("characters")}`,
  },
});

onBeforeMount(async () => {
  await getCourseInfo();
});
</script>

<style scoped></style>
