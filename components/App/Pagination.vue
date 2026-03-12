<template lang="pug">
    .flex.items-center.justify-center.gap-1(class="text-primary-200")
        button(class="py-[11px] px-[16px] disabled:opacity-50 disabled:cursor-not-allowed" @click="handleDecrementPage" :disabled="activePage === 1"): IconLeftArrow(:class="{ 'rotate-180': locale === 'ar' }")
        template(v-for="i in totalPagesArr?.slice(sliceStart, sliceEnd)")
            button(@click="activePage = i" class="py-[11px] px-[16px]" :class="{ 'text-primary': activePage === i }"): span {{ i }}
        button(class="py-[11px] px-[16px] disabled:opacity-50 disabled:cursor-not-allowed" @click="handleIncrementPage" :disabled="activePage === totalPages"): IconArrowRight(:class="{ 'rotate-180': locale === 'ar' }")
</template>

<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
}>();

const { t, locale } = useI18n();
const route = useRoute();
const activePage = defineModel() as Ref<number>;

const totalPagesArr = computed(() =>
  Array.from({ length: props.totalPages }, (_, i) => i + 1)
);

const sliceStart = computed(() => {
  if (activePage.value < 3) return 0;
  if (activePage.value === props.totalPages - 1) {
    return Math.max(0, activePage.value - 4);
  }
  if (activePage.value === props.totalPages) {
    return Math.max(0, activePage.value - 5);
  }

  return Math.max(0, activePage.value - 3);
});

const sliceEnd = computed(() => {
  if (activePage.value >= props.totalPages) return props.totalPages;
  if (activePage.value === 1 || activePage.value === 2) return 5;
  return activePage.value + 2;
});

const handleDecrementPage = function () {
  if (activePage.value > 1) {
    activePage.value--;
  }
};

const handleIncrementPage = function () {
  if (activePage.value < props.totalPages) {
    activePage.value++;
  }
};
</script>

<style scoped></style>
