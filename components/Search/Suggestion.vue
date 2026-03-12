<template lang="pug">
    div(class="flex items-center gap-[4px] w-fit py-[8px] px-[10px] bg-[#F8F5F3] rounded-[4px] cursor-pointer" @click="$emit('clicked', title)") 
        slot(name="icon")
            //- IconSearch(class="text-black size-[16px]")
        slot
            p.label-prominent-3 {{ title }}
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
const emit = defineEmits(["clicked"]);
</script>

<style scoped></style>
