<template lang="pug">
        section(class="app-container flex flex-col xl:flex-row max-xl:items-center md:px-6 md:px-12 py-12 md:justify-between gap-4")
            div(class="flex flex-col items-start justify-center gap-6 md:py-12 md:max-w-[567px]")
                h1(class=" text-[clamp(32px,5vw,56px)] ") {{ t('downloadAppNow') }}
                p(class="text-[clamp(18px,2.5vw,24px)]") {{ t('appDescription') }}
                div(class="flex gap-4")
                    //- NuxtLink(to="/" class="btn-primary py-[11px] px-[19px] hover:bg-black/90 bg-[#000] text-white") 
                    //-     IconAppStoreText
                    NuxtLink(to="https://play.google.com/store/apps/details?id=com.leiaqa" target="_blank" class="btn-primary py-[11px] px-[19px] hover:bg-black/90 bg-[#000] text-white" ) 
                        IconAndroidText
            //- div(class="pt-[30px] md:pt-[65px] md:px-[60px] bg-[#F8F5F3] rounded-[32px] flex items-center justify-center md:w-fit")
            div(class="pt-[30px] px-10 md:pt-[65px] md:px-[60px] bg-[#F8F5F3] rounded-[32px] flex items-center justify-center md:w-fit")
              div(class="relative w-[200px] md:w-[350px] aspect-[17/20] overflow-hidden rounded-[20px]")
                //- div( class="")
                //-       div(class="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer")
                NuxtImg(:src="isArabic ? '/images/mobile-app-ar.png' : '/images/mobile-app.png'" alt="App Mockup" class="bg-[#F8F5F3] max-w-[200px] md:max-w-[350px]"  placeholder)
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const loaded = ref(false);

const isArabic = computed(() => locale.value === "ar");
</script>
