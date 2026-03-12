<template>
  <div class="border border-neutral-200 rounded-4 p-6 space-y-4">
    <!-- Image -->
    <Skeleton 
      variant="image" 
      :height="imageHeight" 
      :rounded="imageRounded"
      class="mb-4"
    />
    
    <!-- Title -->
    <Skeleton variant="title" />
    
    <!-- Description -->
    <Skeleton 
      variant="text" 
      :lines="descriptionLines" 
    />
    
    <!-- Footer -->
    <div class="flex items-center justify-between pt-4">
      <div class="flex items-center space-x-4">
        <Skeleton variant="avatar" rounded="full" width="32px" height="32px" />
        <Skeleton width="80px" height="16px" rounded="sm" />
      </div>
      <Skeleton width="60px" height="16px" rounded="sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /**
   * Height of the card image
   */
  imageHeight?: string
  /**
   * Border radius for the image
   */
  imageRounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /**
   * Number of description lines
   */
  descriptionLines?: number
}

withDefaults(defineProps<Props>(), {
  imageHeight: '200px',
  imageRounded: 'lg',
  descriptionLines: 2
})
</script>
