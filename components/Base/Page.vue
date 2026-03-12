<template lang="pug">
    .app-container(class="f-py-24-64")
        h1(class="f-text-24-48") {{ title }}
        h2.mt-2(class="f-text-16-20 font-300 rtl:leading-[32px] mt-5 w-full lg:max-w-[40%]") {{ subTitle }}

        slot
</template>

<script setup lang="ts">
interface Props {
  /**
   * page title
   */
  title: string;

  /**
   * page subtitle
   */
  subTitle?: string;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
