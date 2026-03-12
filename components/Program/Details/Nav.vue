<template lang="pug">
    nav.items-center.justify-between(class=" hidden lg:flex py-[20px] px-[80px]")
        .flex.items-center.gap-7 
            .px-3.border-e-2.border-black
                NuxtLink(:to="localePath('/')" class="flex f-w-100-126"): TheLogo
            .flex.items-center(class="gap-[10px]")
                NuxtLink.label-3(:to="localePath('/my-learning-programs')") {{ t('myLearningJourney') }}
                IconLeftArrow(:class="{ 'rotate-180': locale === 'en' }")
                p.label-prominent-3 {{ locale === 'en' ? courseInfo?.enTitle : courseInfo?.arTitle }}
        
        .flex.items-center.gap-4
            //- button: IconThreeDots
            button.flex.items-center.gap-1(@click="handleSwitchLocale")
                p.text-primary.label-prominent-2 {{ locale === 'en' ? 'AR' : 'EN' }}
                IconLang
            AppProfileAvatar(:label="locale === 'en' ? user?.enFullName : user?.arFullName" :src="user?.profilePicture" :showLabel="false" :showMenu="true" bgColor="#FF5552" textColor="white")
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();
const userStore = useUserStore();
const { isLoggedIn, user } = storeToRefs(userStore);
const { getImageUrl } = usePhoto();
const { getMe } = useCustomAuth();
const { courseInfo } = useInsideCourse();
await getMe();

const handleSwitchLocale = function () {
  locale.value === "en" ? setLocale("ar") : setLocale("en");
};
</script>

<style scoped></style>
