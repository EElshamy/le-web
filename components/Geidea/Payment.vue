<template lang="pug">
    div(class="fixed flex items-center h-full justify-center top-0 bottom-0 left-0 right-0 bg-black/50" v-if="sessionId")
        .app-container(class="h-full")
            div(id="checkout-tag" class="h-full")
</template>

<script setup lang="ts">
const { initializePayment } = useGeidea();
const cartStore = useCartStore();
const { sessionId } = storeToRefs(cartStore);

onMounted(async () => {
  if (!sessionId.value) return;
  initializePayment(sessionId.value);
});

onUnmounted(() => {
  sessionId.value = null;
});
</script>

<style scoped></style>
