<template lang="pug">
    .fixed.top-0.bottom-0.right-0.left-0(class="bg-black/50 z-[9999]" @click.self="$emit('close')")
        .fixed.top-0.bottom-0(class="bg-white w-[70%]" :class="{ 'right-0': locale === 'en', 'left-0': locale === 'ar' }")
            .flex.flex-col

                .flex.flex-col.border-b(class="py-[20px] px-[16px] gap-5" v-if="!isLoggedIn")
                    NuxtLink.text-primary.label-prominent-2.w-fit(:to="localePath('/signup')" @click="$emit('close')") {{ t('createAccount') }}
                    NuxtLink.text-primary.label-prominent-2.w-fit(:to="localePath('/login')" @click="$emit('close')") {{ t('login') }}

                .flex.border-b(class="bg-[#F8F5F3] w-full py-[20px] px-[16px]" @click="insideProfile = false" v-if="!insideProfile && isLoggedIn")
                    AppProfileAvatar(:showMenu="false" :showLabel="true" :label="locale === 'en' ? user?.enFullName : user?.arFullName" :src="user?.profilePicture" :subLabel="user?.email" bgColor="#FF5552" textColor="white")
                    //- IconArrowLeft(class="shrink-0" :class="{ 'rotate-180': locale === 'en' }")

                //- .flex.items-center.gap-4(class="bg-[#F8F5F3] py-[20px] px-[16px]" @click="insideProfile = false" v-if="insideProfile")
                    IconArrowRight(class="text-black" :class="{ 'rotate-180': locale === 'en' }")
                    p {{ t('profile') }}

                .flex.flex-col.gap-5.label-prominent-3.border-b(class="py-[20px] px-[16px]" v-if="isLoggedIn")
                    p.label-prominent-4(class="text-[#7F7B76]") {{ t('profile') }}
                    .flex.items-center(class="gap-[12px]")
                        IconLearningPrograms
                        NuxtLink(:to="localePath('/my-learning-programs')" @click="$emit('close')") {{ t('myLearningJourney') }}
                    .flex.items-center(class="gap-[12px]")
                        IconCertification
                        NuxtLink(:to="localePath('/my-certificates')" @click="$emit('close')") {{ t('myCertificates') }}
                    .flex.items-center(class="gap-[12px]")
                        .relative
                            IconBell(class="size-[18px] fill-none stroke-black")
                            div(class="absolute flex items-center justify-center text-white top-[-4px] left-[8px] size-[12px] bg-secondary rounded-full" v-if="user?.notificationsCount")
                                span(class="text-[8px] font-[400]") {{ user?.notificationsCount }}
                        NuxtLink(:to="localePath('/notifications')" @click="$emit('close')") {{ t('notifications') }}
                    .flex.items-center(class="gap-[12px]")
                        IconDollar
                        NuxtLink(:to="localePath('/purchase-history')" @click="$emit('close')") {{ t('purchaseHistory') }}
                    .flex.items-center(class="gap-[12px]")
                        IconSettings
                        NuxtLink(:to="localePath('/settings/personal-info')" @click="$emit('close')") {{ t('accountSettings') }}

                .flex.items-center.label-prominent-3(class="py-[20px] px-[16px] gap-[12px]" v-if="insideProfile")
                    IconLogout
                    button(@click="handleLogout") {{ t('logout') }}


                .flex.flex-col.border-b(class="py-[20px] px-[16px]" v-if="!insideProfile")
                    p.label-prominent-4(class="text-[#7F7B76]") {{ t('educationalContent') }}
                    .flex.flex-col.gap-5.mt-4.label-2
                        NuxtLink(:to="localePath('/courses')" @click="$emit('close')") {{ t('courses') }}
                        NuxtLink(:to="localePath('/programs')" @click="$emit('close')") {{ t('programs') }}
                        NuxtLink(:to="localePath('/paths')" @click="$emit('close')") {{ t('tracks') }}
                        NuxtLink(:to="localePath('/subscriptions')" @click="$emit('close')") {{ t('subscriptions') }}
                        NuxtLink(:to="localePath('/live-workshops')" @click="$emit('close')") {{ t('liveWorkshops') }}
                        NuxtLink(:to="localePath('/blogs')" @click="$emit('close')") {{ t('blogs') }}


                .flex.flex-col.border-b(class="py-[20px] px-[16px]" v-if="!insideProfile")
                    p.label-prominent-4(class="text-[#7F7B76]") {{ t('language') }}
                    .flex.flex-col.gap-5.mt-4.label-2
                        .flex.items-center.justify-between(@click="locale === 'en' ? handleSwitchLocale() : null")
                            p العربية
                            div(class="size-[20px] border border-2 border-black rounded-full" :class="{ 'border-primary border-5': locale === 'ar' }")
                        .flex.items-center.justify-between(@click="locale === 'ar' ? handleSwitchLocale() : null")
                            p English
                            div(class="size-[20px] border border-2 border-black rounded-full" :class="{ 'border-primary border-5': locale === 'en' }")

                .flex.items-center.label-prominent-3(class="py-[20px] px-[16px] gap-[12px]" v-if="isLoggedIn")
                    IconLogout
                    button(@click="handleLogout") {{ t('logout') }}

        .absolute.top-3(class="left-[75%]")
            div(class="p-[10px] flex items-center justify-center bg-white rounded-full" @click="$emit('close')")
                IconClose(class="text-primary")
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const insideProfile = ref<boolean>(false);
const { logout } = useCustomAuth();

const handleSwitchLocale = function () {
  locale.value === "en" ? setLocale("ar") : setLocale("en");
};

const handleLogout = async function () {
  emit("close");
  await logout();
};
</script>

<style scoped></style>
