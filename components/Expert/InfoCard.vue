<template lang="pug">
    NuxtLink.flex.items-start.gap-5(:to="localePath(`/lecturers/${data?.user?.slug || data?.slug}`)")
        AppAvatar(class="size-[64px]" :src="getImageUrl(data?.profilePicture)") 
        .flex.flex-col.gap-4 
            .flex.flex-col.gap-1
                p(class="text-[20px] font-400") {{ locale === 'en' ? data?.enFullName : data?.arFullName }}
                p(class="text-[14px] font-300") {{ locale === 'en' ? data?.lecturer?.jobTitle?.enName : data?.lecturer?.jobTitle?.arName }}
            div(class="content-area" v-html="locale === 'en' ? data?.lecturer?.enBio : data?.lecturer?.arBio")
</template>

<script setup lang="ts">
const props = defineProps<{
  data?: any;
}>();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getImageUrl } = usePhoto();
const { slugify } = useSeo();
</script>

<style scoped></style>
