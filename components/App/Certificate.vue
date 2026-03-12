<template lang="pug">
    .flex.items-center.justify-between.flex-wrap
        
        .flex.flex-col.gap-4(class="order-2 lg:order-1")
            p(class="text-[24px]") {{ t('getCertified') }}
            p(class="text-[16px] font-300 w-full 2xl:max-w-[362px]") {{ t('addThisCertificationToYourResumeToDemonstrateYourSkillsAndIncreaseYourChancesOfGettingNoticed') }}
        div(class="w-full lg:max-w-[275px] order-1 lg:order-2")
            NuxtImg(src="/images/certification/en.png" loading="lazy" format="webp" alt="certification")

</template>

<script setup lang="ts">
interface Props {
  type: "course" | "workshop" | "path";
}

const props = defineProps<Props>();
const { t, locale } = useI18n();

const src = computed(() => {
  switch (props.type) {
    case "course":
      return `/images/certification/course-${locale.value}.png`;
    case "workshop":
      return `/images/certification/program-${locale.value}.png`;
    case "path":
      return `/images/certification/path-${locale.value}.png`;
  }
});
</script>

<style scoped></style>
