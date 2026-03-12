<template lang="pug">
    div(:style="{ 'width': width, 'height': height }" class="overflow-hidden aspect-[3/2] hover:scale-102 transition duration-300 ease-in-out rounded-[8px]")
        NuxtImg(:src :alt class="w-full h-full object-cover" format="webp"  placeholder placeholder-class="shimmer-animation")
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt: string;
  width: string;
  height: string;
}>();
</script>

<style scoped>
.shimmer-animation {
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% {
    opacity: 100%;
  }
  5% {
    opacity: 90%;
  }
  10% {
    opacity: 80%;
  }
  20% {
    opacity: 70%;
  }
  30% {
    opacity: 60%;
  }
  40% {
    opacity: 50%;
  }
  50% {
    opacity: 40%;
  }
  60% {
    opacity: 50%;
  }
  70% {
    opacity: 60%;
  }
  80% {
    opacity: 70%;
  }
  90% {
    opacity: 80%;
  }
  100% {
    opacity: 100%;
  }
}
/* @keyframes shimmer {
  0% {
    opacity: 100%;
  }
  20% {
    opacity: 80%;
  }
  40% {
    opacity: 60%;
  }
  60% {
    opacity: 40%;
  }
  80% {
    opacity: 80%;
  }
  100% {
    opacity: 100%;
  }
} */
</style>
