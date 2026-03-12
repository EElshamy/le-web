<template lang="pug">
    .flex.flex-col.gap-8.items-center
        .flex.flex-col.gap-5.items-center
            slot(name="icon")
                IconEmptyReviews 
            .flex.flex-col.gap-4.text-center
                p(class="label-prominent-1 lg:heading-6") {{ title }}
                p.body-3(v-if="subTitle") {{ subTitle }}
        button.btn-primary.w-fit(v-if="hasAction" @click="$emit('action')")
          p {{ actionBtnText }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const props = defineProps<{
  title?: string;
  subTitle?: string;
  hasAction?: boolean;
  actionBtnText?: string;
  icon?: string;
}>();
const emit = defineEmits(["action"]);
</script>

<style scoped></style>
