<template lang="pug">
    .flex.flex-col(:class="[accordionStyle]")
        .flex.flex-col(v-for="item, idx in items" :class="[accordionItem]")
            .flex.items-center.justify-between(:class="[titleStyle]" @click="activeItem = idx" class="cursor-pointer")
                p {{ item?.title }}
                IconArrowDown(class="transition duration-300 ease-in-out size-[20px] lg:size-[28px]" :class="{'rotate-180': activeItem === idx}")
            Transition(@enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave")
                div(:class="[contentStyle]" v-if="activeItem === idx")
                    p {{ item?.content }}
                    //-
</template>

<script setup lang="ts">
interface items {
  title: string;
  content: string;
}

const props = defineProps<{
  items: items;
  accordionStyle: string;
  accordionItem: string;
  titleStyle: string;
  contentStyle: string;
  idx: number;
}>();

const activeItem = ref<number | null>(0);
const activeItems = ref<number[]>([0]);
const handleToggleAccordionActiveItem = function (idx: number) {
  activeItem.value = idx;
};

const handleToggleAccordionActiveItems = function (idx: number) {
  const currentIdxLocation = activeItems.value?.indexOf(idx) as number;
  if (currentIdxLocation === -1) {
    return activeItems.value.push(idx);
  }
  return activeItems.value.splice(currentIdxLocation, 1);
};

// const enter = function (el: any) {
//   el.style.overflow = "hidden";
//   el.style.height = "0px";
//   el.style.transition = `height 300ms ease`;
//   // measure and animate to full height on next frame
//   const height = el.scrollHeight;
//   requestAnimationFrame(() => {
//     el.style.height = height + "px";
//   });
// };

// function afterEnter(el: any) {
//   // cleanup so content can resize naturally
//   el.style.height = "auto";
//   el.style.overflow = "";
//   el.style.transition = "";
// }

// function beforeLeave(el: any) {
//   // set explicit height before starting leave animation
//   el.style.height = el.scrollHeight + "px";
//   el.style.overflow = "hidden";
// }

// function leave(el: any) {
//   // animate to 0
//   el.style.transition = `height 300ms ease`;
//   requestAnimationFrame(() => {
//     el.style.height = "0px";
//   });
// }

// // function leave(el: HTMLElement) {
// //   // Ensure transition is reset before applying new one
// //   el.style.transition = "height 300ms cubic-bezier(0.4, 0, 0.2, 1)";
// //   requestAnimationFrame(() => {
// //     el.style.height = "0px";
// //   });
// // }

// function afterLeave(el: HTMLElement) {
//   // Clean up for future opens
//   el.style.height = "";
//   el.style.overflow = "";
//   el.style.transition = "";
// }
</script>

<style scoped></style>
