<template lang="pug">
    .flex(class="gap-[8px] flex-wrap")
        template(v-for='item in items') 
            .flex.items-center.justify-center(class="rounded-[4px] bg-[#F8F5F3] w-fit py-[7px] px-[12px]") 
                p.label-prominent-3 {{ item }}

</template>

<script setup lang="ts">
const props = defineProps<{
  items: string[];
}>();
</script>

<style scoped></style>
