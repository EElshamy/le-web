<template lang="pug">
    .the-app    
        Html(:lang="i18nSeo.htmlAttrs.lang" :dir="i18nSeo.htmlAttrs.dir")
        header 
            TheNav
        .flex.items-center.justify-center(class="mt-[230px]")
            .app-container.flex.items-center.justify-center 
                .flex.flex-col.gap-5.items-center.justify-center
                    Icon404 
                    .flex.flex-col.gap-8.items-center.justify-center
                        p(class="heading-6 lg:heading-2") {{ t('oopsSomethingWentWrong') }}
                        p(class="body-3 lg:body-2") {{ t('refreshThePageOrTryAgainLater') }}
                    NuxtLink.btn-primary(to="/" class="label-prominent-2") {{ t('refreshThePage') }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const i18nSeo = useLocaleHead({
  addSeoAttributes: true,
  addDirAttribute: true,
});

setTimeout(() => {
  navigateTo(localePath("/"));
}, 4000);

useSeoMeta({
  title: t("error"),
});
</script>

<style scoped></style>
