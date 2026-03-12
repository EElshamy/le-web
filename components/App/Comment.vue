<template lang="pug">
    button.flex.items-center(class="gap-[8px]" @click="$emit('comment')") 
        IconComment
        p {{ label || commentsCount }}
</template>

<script setup lang="ts">
const props = defineProps<{
  commentsCount?: number;
  label?: string;
}>();
const emit = defineEmits(["comment"]);
</script>

<style scoped></style>
