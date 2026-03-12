<template lang="pug">
    .grid(class="gap-[48px] xl:grid-cols-2")

        .flex.flex-col.justify-between.flex-wrap(class="gap-3 xl:gap-0")
            
            div(class="w-full lg:w-[320px] aspect-[3/2] overflow-hidden order-1 aspect-[3/2]")
                NuxtImg(:src="src" format="webp" alt="certification" loading="lazy" class="object-contain w-full h-full")

            .flex.flex-col.gap-3(class="order-2")
                p(class="heading-6") {{ t('leiaqaCertificate') }}
                p(class="body-4 w-full 2xl:max-w-[362px]") {{ t('earnACertificateFromLeiaqaThatValidatesYourSuccessfulProgramCompletionAndReflectsYourProfessionalGrowth') }}

        .flex.flex-col.justify-between.flex-wrap.gap-3
            
            div(class="w-full lg:w-[320px] aspect-[3/2] overflow-hidden order-1")
                NuxtImg(src="/images/certification/ace.png" class="object-contain w-full h-full" format="webp" alt="certification" loading="lazy")

            .flex.flex-col.gap-3(class="order-2")
                p(class="heading-6") {{ t('aceCertificate') }}
                p(class="body-4 w-full 2xl:max-w-[362px]") {{ t('gainAnInternationallyRecognizedCertificateFromAceAccreditedByNccaUnlockingGlobalRecognitionAndCareerOpportunities') }}
    //- .grid.grid-cols-2.mt-3
        div(class="w-full lg:max-w-[375px] order-1 mb-3")
            NuxtImg(src="/images/certification/en.png" loading="lazy")
        div(class="w-full lg:max-w-[375px] order-1 mx-[48px] mb-3")
            NuxtImg(src="/images/certification/ace.png" alt="certification" loading="lazy")
    //- .grid.grid-cols-2
        .flex.flex-col.gap-3(class="order-2")
            p(class="heading-6") {{ t('leiaqaCertificate') }}
            p(class="body-4 w-full 2xl:max-w-[362px]") {{ t('earnACertificateFromLeiaqaThatValidatesYourSuccessfulProgramCompletionAndReflectsYourProfessionalGrowth') }}
        .flex.flex-col.gap-3(class="order-2 mx-[48px]")
            p(class="heading-6") {{ t('aceCertificate') }}
            p(class="body-4 w-full 2xl:max-w-[362px]") {{ t('gainAnInternationallyRecognizedCertificateFromAceAccreditedByNccaUnlockingGlobalRecognitionAndCareerOpportunities') }}
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
