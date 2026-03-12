<template lang="pug">
    .grid(:class="[style]")
        slot
</template>

<script setup lang="ts">
// TODO: Why was this component built this way ?
// -> Mostafa was talking about a flexible grid which fits the grid cols based on the number of items
// -> for example: 1 program -> build a grid with 1 col, 3 programs -> build a grid with 3 cols
// -> I think building a component for this feature gives us more flexibility than using scss

interface Props {
  /**
   * number of grid cols in lg screens
   */
  columns: number;

  /**
   * A boolean flag which indicates whether the items will
   * scroll on sm screens or stick to grid behavior
   */
  scrollHorizontalOnSmScreen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4,
});

const style = computed(() => {
  if (props.scrollHorizontalOnSmScreen)
    return `flex f-gap-y-27-48 f-gap-x-20-40 overflow-x-scroll pb-[10px] scrollbar-hide md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-${props.columns}`;

  if (!props.scrollHorizontalOnSmScreen)
    return `grid f-gap-y-27-48 f-gap-x-20-40 lg:grid-cols-${props.columns} md:grid-cols-2`;
});
</script>

<style scoped></style>
