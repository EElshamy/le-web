<template lang="pug">
    .app-container.grid.grid-cols-12(class="lg:py-auto py-[40px]")
        div(class="col-span-12 lg:col-start-3 lg:col-end-11 bg-[url('/images/banner.png')] bg-cover bg-center h-[300px] w-full rounded-[24px] flex items-center justify-center flex-col justify-center")
            div(class="max-w-[420px] text-center" class="f-px-40-0")
                h3(class="f-text-20-40 text-white") {{ t('joinAsAnInstructor') }}
                p(class="f-text-14-16 font-light text-white mt-5") {{ t('IfYourePassionateAboutFitnessAndDrivenToInspireJoinLeiaqaAsAnInstructorAndHelpCreateRealLastingImpact') }}
                NuxtLink.btn-primary(:to="localePath('/join-as-lecturer')" class="rounded-[6px] mt-3 px-[16px] py-[11px] mt-6" prefetch-on="interaction") {{ t('joinUsNow') }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
</script>

<style scoped></style>
