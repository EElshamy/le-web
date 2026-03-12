<template lang="pug">
NuxtLink.flex.items-center.gap-5(:to="localePath(`/certification/${data?.id}`)" class="border-b-1 pb-8 lg:max-w-[60%] cursor-pointer")
    div(class="relative w-[80px] md:w-[120px] aspect-[1.4/1] rounded-[4px] overflow-hidden transition duration-300 ease-in-out hover:scale-102 bg-gray-100")
        div(v-if="isLoading" class="absolute inset-0 z-10 w-full h-full bg-gray-200 animate-pulse")
        NuxtImg(
            :src="locale === 'en' ? data?.previewEnUrl : data?.previewArUrl"
            format="webp"
            loading="lazy"
            alt="certification"
            @load="handleLoad"
            class="w-full h-full object-cover transition-opacity duration-500"
            :class="isLoading ? 'opacity-0' : 'opacity-100'"
        )

        div(class="absolute flex items-center justify-center top-0 p-[20px] bottom-0 left-0 right-0 z-20 bg-black/70" v-if="data?.pending")
          IconClock(class="text-white size-[24px]")
    .flex.flex-col
        .flex.flex-col.gap-4
            p(class="hover:text-primary label-prominent-3 lg:label-prominent-1") {{ data?.programTitle }}
            .flex.items-center(class="gap-[6px] label-4  lg:text-[14px] text-[#5D5A57] lg:font-300")
                p {{ $t(data?.learningProgramType?.toLowerCase() || "" ) }}
                div(class="size-[2px] bg-[#5D5A57] rounded-full")
                p {{ t('completionData') }}: {{ formatDate(data?.createdAt) }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formatDate } = useFormatter();

const props = defineProps<{
  data: any;
}>();
const isLoading = ref(true);

const handleLoad = () => {
  isLoading.value = false;
};
</script>

<style scoped></style>
