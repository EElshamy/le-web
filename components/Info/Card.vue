<template lang="pug">
    .flex.items-center.border(class="rounded-[8px] p-[16px] gap-[16px] border-neutral-200") 
        div(class="relative max-w-[80px]" v-if="src")
            NuxtImg(:src class="w-full h-full object-cover" format="webp" :alt="title") 
            div(class="bg-black/60 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center" v-if="disabled") 
                IconClock(class="text-white size-[24px]")
        .flex.flex-col(class="gap-[8px]") 
            p.label-prominent-2 {{ title }}
            slot(name="subTitle")
                p.body-4 {{ subTitle }}

</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  subTitle: string;
  src: string;
  disabled?: boolean;
}>();
</script>

<style scoped></style>
