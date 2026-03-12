<template>
  <div class="border border-neutral-200 rounded-3 overflow-hidden">
    <!-- Header -->
    <div class="bg-neutral-100 px-6 py-4">
      <div class="grid gap-4" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
        <Skeleton 
          v-for="col in columns" 
          :key="`header-${col}`"
          width="100px" 
          height="16px" 
          rounded="sm" 
        />
      </div>
    </div>
    
    <!-- Rows -->
    <div class="divide-y divide-neutral-200">
      <div 
        v-for="row in rows" 
        :key="`row-${row}`"
        class="px-6 py-4"
      >
        <div class="grid gap-4" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
          <Skeleton 
            v-for="col in columns" 
            :key="`cell-${row}-${col}`"
            :width="getCellWidth(col)" 
            height="16px" 
            rounded="sm" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /**
   * Number of columns
   */
  columns?: number
  /**
   * Number of rows
   */
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4,
  rows: 5
})

const getCellWidth = (colIndex: number): string => {
  // Vary cell widths for more realistic look
  const widths = ['120px', '80px', '150px', '100px', '90px', '110px']
  return widths[(colIndex - 1) % widths.length]
}
</script>
