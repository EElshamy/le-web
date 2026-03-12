<template lang="pug">
    .flex.flex-col.items-center.gap-4(class="cursor-pointer" @click="handleSearchShare")
      div(class="size-[56px] rounded-full shrink-0 flex items-center justify-center" :style="{ 'background-color': bgColor }")  
          slot(name="icon")
      p.label-3 {{ label }}

</template>

<script setup lang="ts">
const props = defineProps<{
  bgColor: string;
  label: string;
  plat: string;
}>();

const { link, popup } = useShare();

const handleSearchShare = function () {
  popup(props.plat);
};
</script>

<style scoped></style>
