<template>
  <div class="space-y-4">
    <div 
      v-for="index in count" 
      :key="index"
      class="flex items-center space-x-4 p-4 border border-neutral-200 rounded-3"
    >
      <!-- Avatar -->
      <Skeleton 
        variant="avatar" 
        rounded="full" 
        :width="avatarSize" 
        :height="avatarSize" 
      />
      
      <!-- Content -->
      <div class="flex-1 space-y-2">
        <Skeleton 
          :width="titleWidth" 
          height="20px" 
          rounded="sm" 
        />
        <Skeleton 
          :width="descriptionWidth" 
          height="16px" 
          rounded="sm" 
        />
        <div v-if="showMeta" class="flex items-center space-x-4">
          <Skeleton width="60px" height="14px" rounded="sm" />
          <Skeleton width="80px" height="14px" rounded="sm" />
        </div>
      </div>
      
      <!-- Action -->
      <Skeleton 
        v-if="showAction"
        width="80px" 
        height="32px" 
        rounded="md" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /**
   * Number of list items
   */
  count?: number
  /**
   * Size of avatar
   */
  avatarSize?: string
  /**
   * Width of title
   */
  titleWidth?: string
  /**
   * Width of description
   */
  descriptionWidth?: string
  /**
   * Show metadata row
   */
  showMeta?: boolean
  /**
   * Show action button
   */
  showAction?: boolean
}

withDefaults(defineProps<Props>(), {
  count: 3,
  avatarSize: '48px',
  titleWidth: '200px',
  descriptionWidth: '300px',
  showMeta: true,
  showAction: false
})
</script>
