<template lang="pug">
    section(class="f-pt-16-32 f-pb-12-24 lg:f-py-40-50") 

        NuxtLink.flex.justify-between.items-center(:to="localePath(link)" v-if="link" prefetch-on="interaction")
            h2(class="label-prominent-1 lg:heading-5 max-w-[400px]") {{ title }}
            .flex.items-center(class="gap-[10px] hover:text-primary")
                    span(class="hidden lg:block") {{ linkTitle }}
                    IconArrowLeft(class="ltr:rotate-180")
        
        slot(name="filters")

        BaseGrid(:columns="gridCols" :scrollHorizontalOnSmScreen :class="{ 'mt-7': link }")
            slot
</template>

<script setup lang="ts">
// TODO: handle empty state

interface Props {
  /**
   * section title
   */
  title?: string;

  /**
   * section navigation link
   */
  link?: string;

  /**
   * section navigation link title
   */
  linkTitle?: string;

  /**
   * section grid columns
   */
  gridCols?: number;

  /**
   * A boolean flag which indicates whether the items will
   * scroll on sm screens or stick to grid behavior
   */
  scrollHorizontalOnSmScreen?: boolean;
}

const props = defineProps<Props>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
</script>

<style scoped></style>
