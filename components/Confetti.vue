<template>
  <div class="confetti-container">
    <div v-for="n in 100" :key="n" class="confetti"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.querySelectorAll(".confetti").forEach((el) => {
    // random horizontal start position (0–100%)
    el.style.setProperty("--x", Math.random());

    // random color hue (0–360)
    el.style.setProperty("--hue", Math.random() * 360);

    // random rotation start
    el.style.setProperty("--rotate", Math.random() * 360 + "deg");

    // random animation duration (2s – 4s)
    el.style.animationDuration = Math.random() * 2 + 2 + "s";

    // random delay (0s – 1.5s)
    el.style.animationDelay = Math.random() * 1.5 + "s";

    // **smaller random size (2px – 6px wide, 4px – 10px tall)**
    el.style.width = Math.random() * 4 + 2 + "px";
    el.style.height = Math.random() * 6 + 4 + "px";
  });
});
</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
}

.confetti {
  position: absolute;
  top: -20px;
  left: calc(var(--x) * 100%);
  background-color: hsl(var(--hue), 100%, 50%);
  transform: rotate(var(--rotate));
  opacity: 0.9;
  border-radius: 1px;
  animation: fall linear forwards;
}

/* Falling + rotating animation */
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(1080deg);
    opacity: 0.7;
  }
}
</style>
