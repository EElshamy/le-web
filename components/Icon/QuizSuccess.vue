<template>
  <svg
    width="79"
    height="88"
    viewBox="0 0 79 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Transition name="bounce">
      <path
        d="M59.2885 0H9.49799C4.25241 0 0 4.25239 0 9.49797V78.502C0 83.7476 4.25241 88 9.49799 88H59.2885C64.5341 88 68.7864 83.7476 68.7864 78.502V9.49797C68.7864 4.25239 64.5341 0 59.2885 0Z"
        fill="#FCDED2"
        v-if="viewSheet"
      />
    </Transition>
    <Transition name="bounce">
      <path
        d="M14.4805 21.5303H53.6149"
        stroke="#76003E"
        stroke-width="3.69193"
        stroke-miterlimit="10"
        v-if="lines?.length >= 1"
      />
    </Transition>
    <Transition name="bounce">
      <path
        d="M14.4805 32.7695H53.6149"
        stroke="#76003E"
        stroke-width="3.69193"
        stroke-miterlimit="10"
        v-if="lines?.length >= 2"
      />
    </Transition>
    <Transition name="bounce">
      <path
        d="M14.4805 44.001H39.127"
        stroke="#76003E"
        stroke-width="3.69193"
        stroke-miterlimit="10"
        v-if="lines?.length >= 3"
      />
    </Transition>
    <Transition name="bounce">
      <path
        d="M61.9786 76.7453C58.9318 76.7453 56.9032 72.6647 54.4316 71.3201C51.8278 69.9133 47.312 70.3408 45.7963 67.8769C44.2807 65.413 46.698 61.6822 46.698 58.6509C46.698 55.6197 44.2962 51.8578 45.7963 49.425C47.2964 46.9922 51.8356 47.3964 54.4316 45.9818C57.0276 44.5672 58.9318 40.5566 61.9786 40.5566C65.0254 40.5566 67.0541 44.6372 69.5257 45.9818C72.1295 47.3886 76.6453 46.9611 78.1609 49.425C79.6766 51.8889 77.2593 55.6197 77.2593 58.6509C77.2593 61.6822 79.661 65.4441 78.1609 67.8769C76.6608 70.3097 72.1217 69.9055 69.5257 71.3201C66.9297 72.7347 65.0254 76.7453 61.9786 76.7453Z"
        fill="#A9ED85"
        v-if="viewCheck"
      />
    </Transition>
    <Transition name="bounce">
      <path
        d="M55.334 58.8218L59.6555 63.1355L68.6172 54.1738"
        stroke="#0D2836"
        stroke-width="3.10899"
        stroke-miterlimit="10"
        v-if="viewCheck"
      />
    </Transition>
  </svg>
</template>

<script setup lang="ts">
import confetti from "canvas-confetti";

const viewCheck = ref<boolean>(false);
const viewSheet = ref<boolean>(false);
const lines = ref<number[]>([]);

onMounted(() => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
});

setTimeout(() => {
  viewSheet.value = true;
}, 100);

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    lines.value.push(1);
  }, (i + 1) * 200);
}

setTimeout(() => {
  if (!viewSheet.value) return;
  viewCheck.value = true;
}, 500);
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
  /* 100% {
    transform: scale(1);
  } */
}
</style>
