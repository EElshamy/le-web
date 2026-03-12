<template lang="pug">
    .gap-5.mt-7(class="flex overflow-x-scroll scrollbar-hide md:overflow-visible md:grid lg:grid-cols-4 md:grid-cols-2") 
        .flex.flex-col.gap-5
            div(class="aspect-[3/2] bg-gray-300 rounded-[12px] shimmer-animation")
        
            .flex.flex-col.gap-3.ms-4 
                div(class="w-[30%] rounded-full h-[10px] bg-gray-300 shimmer-animation")
                div(class="w-[60%] rounded-full h-[10px] bg-gray-300 shimmer-animation")
                div(class="w-[40%] rounded-full h-[10px] bg-gray-300 shimmer-animation")

                .grid.grid-cols-3(class="max-w-[32%] gap-2")
                    div(class="col-span-2 rounded-full h-[10px] bg-gray-300 shimmer-animation")
                    div(class="col-span-1 rounded-full h-[10px] bg-gray-300 shimmer-animation")
                
                div(class="w-[16%] rounded-full h-[10px] mt-3 bg-gray-300 shimmer-animation")

</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes shimmer {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.shimmer-animation {
  animation: shimmer 1.3s infinite;
}
</style>
