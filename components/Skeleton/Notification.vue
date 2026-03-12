<template>
  <div class="flex items-start f-gap-4-8 w-full rounded-4 space-y-4">
    <!-- Image -->
    <Skeleton variant="avatar" rounded="full" />
    <div class="flex flex-col gap-2 !mt-[5px]">
      <!-- Title -->
      <Skeleton variant="title" width="120px" height="10px" class="!mt-0" />

      <!-- Meta -->
      <div class="flex flex-col gap-1">
        <Skeleton
          v-for="i in 2"
          :key="i"
          variant="text"
          :width="120 - i * 40"
          height="10px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /**
   * Height of the card image
   */
  imageHeight?: string;
  /**
   * Border radius for the image
   */
  imageRounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Number of description lines
   */
  descriptionLines?: number;
}

withDefaults(defineProps<Props>(), {
  imageHeight: "200px",
  imageRounded: "lg",
  descriptionLines: 2,
});
</script>
