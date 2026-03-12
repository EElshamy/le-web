<template lang="pug">
    .app-container(class="py-[24px] lg:pt-[64px] lg:pb-8")
        h1(class="heading-6 lg:heading-3") {{ t('myCertificates') }}

        .flex.flex-col.gap-8(class="pb-8 pt-[32px]" v-if="data?.items?.length")
            template(v-for="program in data?.items")

                template(v-if="program?.diploma")
                    NuxtLink.flex.items-center.justify-between(class="w-full lg:max-w-[652px]" :to="localePath(`/certification/path/${program?.diploma?.slug}`)")
                        .flex.items-center.gap-3
                            div(class="aspect-[2/2] max-w-[80px] overflow-hidden rounded-[8px]")
                                NuxtImg(:src="getImageUrl(program?.diploma?.thumbnail)" class="object-cover w-full h-full")
                            .flex.flex-col.gap-2
                                p(class="f-20-14") {{ locale === 'en' ? program?.diploma?.enTitle : program?.diploma?.arTitle }}
                                .flex.items-center.gap-3
                                    p(class="f-14-12 font-300") {{ t('track') }}
                                    button.flex.items-center.gap-2(@click.prevent="handleActivatePathPrograms(program?.diploma?.id)")
                                        p.text-primary.underline(class="f-14-12 font-300") {{ t('viewPathPrograms') }}
                                        IconArrowDown(class="size-[20px] transition duration-300 ease-in-out" :class="{ 'rotate-180': activeDiploma === program?.diploma?.id }")
                        IconLeftArrow


                    template(v-for="currentProgram, idx in program?.certifiedCourses" v-if="activeDiploma === program?.diploma?.id")
                        NuxtLink.flex.items-center.justify-between(class="w-full lg:max-w-[652px] px-[24px]" :to="localePath(`/certification/${program?.type === 'COURSE' ? 'course' : 'program'}/${currentProgram?.slug}`)" :class="{ 'border-b pb-8': idx ===  program?.certifiedCourses?.length - 1 }")
                            .flex.items-center.gap-3
                                div(class="aspect-[2/2] max-w-[80px] overflow-hidden rounded-[8px]")
                                    NuxtImg(:src="getImageUrl(currentProgram?.thumbnail)" class="object-cover w-full h-full")
                                .flex.flex-col.gap-2
                                    p(class="f-20-14") {{ locale === 'en' ? currentProgram?.enTitle : currentProgram?.arTitle }}
                                    p(class="f-14-12 font-300") {{ currentProgram?.type === 'COURSE' ? currentProgram?.isLiveCourse ? t('liveWorkshop') : t('course') : t('workshop') }}
                            IconLeftArrow

                template(v-else)
                    template(v-for="program in program?.certifiedCourses")
                        NuxtLink.flex.items-center.justify-between(class="w-full lg:max-w-[652px]" :to="localePath(`/certification/${program?.type === 'COURSE' ? 'course' : 'program'}/${program?.slug}`)")
                            .flex.items-center.gap-3
                                div(class="aspect-[2/2] max-w-[80px] overflow-hidden rounded-[8px]")
                                    NuxtImg(:src="getImageUrl(program?.thumbnail)" class="object-cover w-full h-full")
                                .flex.flex-col.gap-2
                                    p(class="f-20-14") {{ locale === 'en' ? program?.enTitle : program?.arTitle }}
                                    p(class="f-14-12 font-300") {{ program?.type === 'COURSE' ? program?.isLiveCourse ? t('liveWorkshop') : t('course') : t('workshop') }}
                            IconLeftArrow
            //- template(v-for="certificate in certificates?.items")
                CertificateCard(:data="certificate")

        .flex.flex-col.items-center.justify-center(class="w-full pt-[120px] pb-[180px]" v-else)
            AppEmptyData(:title="t('youDontHaveAnyCertificatesYet')" :subTitle="t('keepGoingWithYourLearningJourneyYourCertificatesWillBeWaitingForYouHereSoon')" :hasAction="true" :actionBtnText="t('exploreLearningPrograms')" @action="navigateTo(localePath('/learning-programs'))")
                template(#icon)
                    IconEmptyCertificate

</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getImageUrl } = usePhoto();
const activeDiploma = ref<string>("");
// const { getCertificates } = useCertificate();
// const { data: certificates, message, success } = await getCertificates();

const { data, error, status } = useAsyncData(
  "getCertifications",
  () => GqlMyCertifiedPrograms(),
  { transform: (data) => data?.myCertifiedPrograms?.data }
);

const handleActivatePathPrograms = function (id: string) {
  if (activeDiploma.value === id) {
    activeDiploma.value = "";
  } else {
    activeDiploma.value = id;
  }
};
</script>

<style scoped></style>
