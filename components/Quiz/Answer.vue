<template lang="pug">
    .flex.items-center.justify-between(class="bg-[#F8F5F3] p-[20px] rounded-[6px] cursor-pointer transition duration-300 ease-in-out" :class="{ 'border-2 border-primary bg-primary-50': answersIds?.includes(id) }")
        p(class="label-prominent-3 lg:label-prominent-2") {{ label }}
        div(class="size-[20px] border border-2 border-black shrink-0 rounded-full transition duration-300 ease-in-out" :class="{ 'border-primary border-5': answersIds?.includes(id), '!rounded-[6px]': isMultiple }")
</template>

<script setup lang="ts">
const { answersIds } = useQuiz();

const props = defineProps<{
  label: string;
  id: string;
  isMultiple?: boolean;
}>();
</script>

<style scoped></style>
