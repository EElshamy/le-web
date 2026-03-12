<template lang="pug">
    button.flex.items-center(class="gap-[8px]" @click="$emit('like')") 
        IconLike(class="size-[20px] stroke-gray-400" :class="{ 'stroke-none fill-red-600': isLiked }")
        p {{ likeCount }}
</template>

<script setup lang="ts">
const props = defineProps<{
  isLiked?: boolean;
  likeCount?: number;
}>();
const emit = defineEmits(["like"]);
</script>

<style scoped></style>
