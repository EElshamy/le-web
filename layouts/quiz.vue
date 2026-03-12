<template lang="pug">
    .the-app 
        Html(:lang="i18nSeo.htmlAttrs.lang" :dir="i18nSeo.htmlAttrs.dir")
        div(class="w-full h-full")
            slot
</template>

<script setup lang="ts">
import { setLocale } from "yup";

const openContentMenu = ref<boolean>(true);
const { t, locale } = useI18n();
const { activeCourseId, getCourseContent, getCourseInfo } = useInsideCourse();
const route = useRoute();
activeCourseId.value = route.params.id as string;
const { openShareModal } = useShare();
const { getMe } = useCustomAuth();
await getMe();
await getCourseContent();

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
</script>

<style scoped></style>
