<template lang="pug">
    //- pre {{label}}
    .relative
        .flex.items-center.gap-4.w-full(class="cursor-pointer" @click="profileMenu = !profileMenu")
            div(class='size-[40px] shrink-0 rounded-full overflow-hidden ' :class="{ 'flex items-center justify-center': !src }" :style="{ 'background': bgColor, 'color': textColor }")
                NuxtImg(:src="getImageUrl(src)" v-if="src" :alt="label" format="webp" preload class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110")
                p(class="label-prominent-2" v-else) {{ label?.[0]?.toUpperCase() }}
            .flex.flex-col.gap-2.w-full(v-if="showLabel")
                p(v-if="showLabel" class="label-prominent-3") {{ label }}
                p(v-if="subLabel" class="label-4 max-w-[70%] truncate") {{ subLabel }}


        .absolute(class="ltr:right-0 rtl:left-0 mt-2 z-[9999]" v-if="profileMenu && showMenu" ref="menuRef")
            div(class='w-[300px] flex flex-col bg-white border rounded-[8px] shadow-sm')
                .flex.flex-col.gap-2

                    .flex.flex-col.gap-1(class="pt-[16px] px-[16px]")
                        p.label-prominent-3 {{ locale === 'en' ? user?.enFullName : user?.arFullName }}
                        p.label-4 {{ user?.email }}

                    .flex.flex-col.gap-5.mt-3.border-t.border-b(class="py-3 px-[16px]")
                        NuxtLink(:to="localePath('/my-learning-programs')" @click="profileMenu = false")
                            li.flex.items-center.gap-3.label-prominent-3
                                IconLearningPrograms
                                p {{ t('myLearningJourney') }}
                        NuxtLink(:to="localePath('/my-certificates')" @click="profileMenu = false")
                            li.flex.items-center.gap-3.label-prominent-3
                                IconCertification
                                p {{ t('myCertificates') }}
                        NuxtLink(:to="localePath('/purchase-history')" @click="profileMenu = false")
                            li.flex.items-center.gap-3.label-prominent-3
                                IconDollar
                                p {{ t('purchaseHistory') }}
                        NuxtLink(:to="localePath('/settings/personal-info')" @click="profileMenu = false")
                            li.flex.items-center.gap-3.label-prominent-3
                                IconSettings
                                p {{ t('accountSettings') }}

                    button.mt-2(class="pb-[16px] px-[16px]" @click="handelLogout(), profileMenu=false")
                        li.flex.items-center.gap-3.label-prominent-3
                            IconLogout
                            p {{ t('logout') }}
</template>

<script setup lang="ts">
const props = defineProps<{
  src?: string;
  label?: string;
  bgColor?: string;
  textColor?: string;
  subLabel?: string;
  showLabel?: boolean;
  showMenu?: boolean;
}>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const userStore = useUserStore();
const profileMenu = ref<boolean>(false);
const { user } = storeToRefs(userStore);
const { logout } = useCustomAuth();
const { getImageUrl } = usePhoto();
const { y } = useWindowScroll();
const menuRef = ref<HTMLElement | null>(null);

const { signOut, getSession } = useAuth();

onClickOutside(menuRef, () => {
  profileMenu.value = false;
});

const handelLogout = async function () {
  await logout();
  //   await signOut();
};

watch(y, (newY) => {
  if (!profileMenu.value) return;
  profileMenu.value = false;
});
</script>

<style scoped></style>
