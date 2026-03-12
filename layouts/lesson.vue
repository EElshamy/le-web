<template lang="pug">
.the-app
    Html(:lang="i18nSeo.htmlAttrs.lang" :dir="i18nSeo.htmlAttrs.dir")
    header
        LessonNav
    AppMessage
    main.grid(:class="{ 'grid-cols-9': openContentMenu }")
        div(class="col-span-9 lg:col-span-7")
            slot
        .col-span-2(:class="{ 'hidden': !openContentMenu, 'hidden lg:block': openContentMenu }")
            div(class="sticky top-0 h-screen overflow-hidden")
                Transition(name="slide-x")
                    LessonContentMenu(@closeMenu="openContentMenu = false" v-if="openContentMenu")
        button.absolute.top-25.bg-secondary.py-3.px-4(class="min-w-[60px] ltr:rounded-tl-[12px] ltr:rounded-bl-[12px] rtl:rounded-br-[12px] rtl:rounded-tr-[12px] rtl:left-0 ltr:right-0" @click="openContentMenu=true" v-if="!openContentMenu"): IconArrowLeft(class="text-white" :class="{ 'rotate-180': locale === 'ar' }")
AppShareModal(v-model="openShareModal" v-if="openShareModal")
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

<style scoped>
.slide-x-enter-active,
.slide-x-leave-active {
transition: transform 0.5s ease, opacity 0.4s ease;
}

.slide-x-enter-from {
transform: translateX(-100%);
opacity: 0;
}
.slide-x-enter-to {
transform: translateX(0);
opacity: 1;
}

.slide-x-leave-from {
transform: translateX(0);
opacity: 1;
}
.slide-x-leave-to {
transform: translateX(100%);
opacity: 0;
}
</style>
