<template lang="pug">
    .flex.items-center.gap-3.w-fit.cursor-pointer
      div(class='relative rounded-full flex-shrink-0 overflow-hidden  transition duration-300 ease-in-out aspect-[3/2]' :class="[avatarClass]" v-bind="$attrs") 
          div(class="absolute top-0 left-0 right-0 bottom-0 bg-secondary flex items-center justify-center" v-if="loading") 
            IconLoading(class="size-[40px]")
          NuxtImg(:src="getImageUrl(src)" format="webp" loading="lazy" :alt="label" v-else-if="src" class="w-full h-full object-cover")
          p(v-else) {{ label[0] }}
      span(class="text-[14px]" v-if="!hideLabel") {{ label }}
</template>

<script setup lang="ts">
const props = defineProps<{
  src?: string;
  label?: string;
  hideLabel?: boolean;
  avatarClass?: string;
  loading?: boolean;
}>();

const { getImageUrl } = usePhoto();
</script>

<style scoped></style>
