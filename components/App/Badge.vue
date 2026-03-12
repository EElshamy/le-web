<template lang="pug">
    .flex.items-center.justify-center(class="py-[4.5px] px-[10px] rounded-full w-fit" :class="[customClass, defaultClass]") 
        p.label-prominent-4 {{ label }}
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  type?: "success" | "warn" | "danger";
  customClass: string;
}>();

const defaultClass = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-success-100 text-success-900";
    case "warn":
      return; // Add styles when needed
    case "danger":
      return; // Add styles when needed
    default:
      return "border";
  }
});
</script>

<style scoped></style>
