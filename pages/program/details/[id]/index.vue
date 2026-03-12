<template lang="pug">
    Transition(name="fade")
      component(:is="activeComponent")
</template>

<script setup lang="ts">
import Content from "~/components/InsideCourse/Content.vue";
import Discussion from "~/components/InsideCourse/Discussion.vue";
import Resources from "~/components/InsideCourse/Resources.vue";
import Reviews from "~/components/InsideCourse/Reviews.vue";

const { t, locale } = useI18n();
const { activeTab } = useInsideCourse();

const activeComponent = computed(() => {
  switch (activeTab.value) {
    case "course-content":
      return Content;
    case "discussion":
      return Discussion;
    case "resources":
      return Resources;
    case "reviews":
      return Reviews;
  }
});

definePageMeta({
  layout: "program",
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  position: absolute;
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
