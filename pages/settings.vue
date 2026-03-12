<template lang="pug">
    .app-container(class="pt-[24px] lg:pt-[64px]")
        h1(class="f-text-24-48") {{ t('settings') }}
        .grid.grid-cols-10(class="pt-[32px] pb-[64px]")    
            div(class="col-span-10 2xl:col-span-3")
                .flex.gap-5(class="flex-row 2xl:flex-col")
                  NuxtLink(:to="localePath('/settings/personal-info')" class="w-fit") {{ t("personalInfo") }}
                  NuxtLink(:to="localePath('/settings/password')" class="w-fit") {{ t("password") }}
                  //- NuxtLink(:to="localePath('/settings/password')") {{ t("socialLinks") }}
                //- AppTabs(v-model="activeTab" :tabs :isVertical="true" @change="handleChange" class="w-full 2xl:h-[300px]")
            div(class="col-span-10 mt-8 2xl:mt-0 2xl:col-span-7")
                NuxtPage
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const activeTab = ref("personal-info");

const tabs = [
  { label: t("personalInfo"), name: "personal-info" },
  { label: t("password"), name: "password" },
  // { label: t("socialLinks"), name: "social-links" },
];

const handleChange = async function (val: string) {
  activeTab.value = val;
};

watch(
  activeTab,
  (newVal) => {
    switch (newVal) {
      case "personal-info":
        return navigateTo(localePath("/settings/personal-info"));
      case "password":
        return navigateTo(localePath("/settings/password"));
      case "social-links":
        return navigateTo(localePath("/settings/social-links"));
    }
  },
  { deep: true }
);
</script>

<style scoped>
.router-link-active {
  color: #76003e;
  text-decoration: underline;
  text-underline-offset: 10px;
}
</style>
