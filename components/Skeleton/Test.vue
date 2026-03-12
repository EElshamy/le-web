<template>
  <div class="rounded-4 space-y-4">
    <!-- Image -->
    <Skeleton
      variant="image"
      :rounded="imageRounded"
      class="!h-auto !w-auto !aspect-[3/2]"
    />

    <div class="px-4 space-y-4">
      <!-- Meta -->
      <div class="flex items-center justify-between w-full">
        <Skeleton width="80px" height="16px" rounded="sm" />
        <Skeleton width="80px" height="16px" rounded="sm" />
      </div>

      <!-- Title -->
      <Skeleton variant="title" />

      <!-- Description -->
      <Skeleton variant="text" :lines="descriptionLines" />
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
