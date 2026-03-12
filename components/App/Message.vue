<template lang="pug">
    transition(name="fade")
        .fixed.top-10.w-screen.flex.items-center.pointer-events-none(v-if="isVisible" :class="[activeStyle]" class="z-[100000]" )
            div(class=" w-fit flex items-center gap-3 rounded-[6px] py-[12px] m-[20px] px-[16px] pointer-events-auto" :class="{ 'bg-danger-50': activeType === 'error', 'bg-success-50': activeType === 'success', 'bg-warning-50': activeType === 'warn'  }") 
                IconError(v-if="activeType === 'error'")
                IconWarn(v-if="activeType === 'warn'")
                IconSuccess(v-if="activeType === 'success'")
                p.body-4 {{ activeMessage }}

</template>

<script setup lang="ts">
const { isVisible, activeMessage, activeStyle, activeType } = useAlertOptions();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
