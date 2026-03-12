<template lang="pug">
    .relative 
        button(@click.prevent="openMenu = !openMenu")
            slot(name="dropdown-icon") 
                IconThreeDots
        
        .absolute.top-5(class="rounded-[8px] flex flex-col gap-[8px] shadow-sm z-[9999] ltr:right-0 rtl:left-0 border p-[12px] bg-white w-[200px]" v-if="openMenu" ref="dropdownMenu") 
            template(v-for="option in options") 
                slot(:name="option?.slot" :option="option")
                  div(class="cursor-pointer px-[12px] rounded-[8px]" v-if="!option?.slot" :class="{ 'opacity-50 text-gray-200': option?.disabled}" @click.prevent="$emit('clicked', option?.emitter), openMenu = false") 
                      p {{ option?.label }}
</template>

<script setup lang="ts">
interface option {
  icon?: string;
  label?: string;
  emitter: string;
  slot?: string;
}

const props = defineProps<{
  options: [];
}>();
const emit = defineEmits(["clicked"]);

const openMenu = ref<boolean>(false);
const dropdownMenu = ref<HTMLElement | null>(null);

onClickOutside(dropdownMenu, () => {
  openMenu.value = false;
});
</script>

<style scoped></style>
