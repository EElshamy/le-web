<template lang="pug">
.w-full.bg-gray-200.rounded-full.overflow-hidden(:class="[customClass]")
  .h-full.transition-all.duration-1000.ease-out(
    :style="{ width: finalWidth + '%' }"
    :class="finalWidth === 100 ? 'bg-success-600' : 'bg-primary'"
  )
</template>

<script setup lang="ts">
const props = defineProps<{
  progress: number;
  customClass?: string;
}>();

const finalWidth = ref(0);

onMounted(() => {
  setTimeout(() => {
    finalWidth.value = props.progress;
  }, 100);
});

watch(() => props.progress, (newVal) => {
  finalWidth.value = newVal;
});
</script>
