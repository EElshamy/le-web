<template lang="pug">
    .app-container(class="pt-[24px] lg:pt-[64px] pb-[104px]")
        .flex.items-center.justify-center
            div
                .flex.flex-col.gap-5
                    h1(class="lg:heading-3 heading-6 ") {{ title }}
                    p(class="label-prominent-3 lg:label-prominent-2") {{ t('lastUpdate') }}: {{ formatDate(activeItem?.updatedAt) }}
                    
                div( v-html="locale === 'en' ? activeItem?.contentEn : activeItem.contentAr" class="content-area max-w-[872px] mt-11")
</template>

<script setup lang="ts">
const props = defineProps<{
  policyTitle: string;
  title: string;
}>();

const { t, locale } = useI18n();
const { formatDate } = useFormatter();
const { policy } = await usePolicy();

const activeItem = computed(
  () => policy.value?.filter((item) => item.title === props.policyTitle)[0],
);
</script>

<style scoped></style>
