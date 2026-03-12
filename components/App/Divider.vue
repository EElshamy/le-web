<template lang="pug">
.flex.items-center.gap-4
  .flex-grow(class="bg-[#DEDAD6] h-[1px]")
  span.text-gray-500.text-xs.font-medium {{ label }}
  .flex-grow(class="bg-[#DEDAD6] h-[1px]")
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>

<style scoped></style>
