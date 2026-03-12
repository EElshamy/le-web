<template lang="pug">
    BaseGrid(v-if="name === 'Grid'") 
        template(v-for="i in 12") 
            ProgramCard
    
    BaseSection(v-if="name === 'Section'")
        template(v-for="i in 12")
            ProgramCard
</template>

<script setup lang="ts">
interface Props {
  /**
   * component name
   */
  name: string;
}

const props = defineProps<Props>();

// const activeComponent = computed(() => {
//   switch (props.name) {
//     case "Grid":
//       return baseComponents.Grid;
//     case "Section":
//       return baseComponents.section;
//   }
// });
</script>

<style scoped></style>
