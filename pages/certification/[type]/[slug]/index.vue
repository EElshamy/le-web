<template lang="pug">
    .app-container(class="py-[24px] lg:pt-[64px] lg:pb-8")
        h1.heading-3 {{ t('myCertificates') }}
        .flex.flex-col.gap-8(class="pb-8 pt-[32px]" v-if="true")
            template(v-for="certificate in certificates") 
                CertificateCard(:data="certificate")
        
        .flex.flex-col.items-center.justify-center(class="w-full pt-[120px] pb-[180px]" v-else)
            AppEmptyData(:title="t('youDontHaveAnyCertificatesYet')" :subTitle="t('keepGoingWithYourLearningJourneyYourCertificatesWillBeWaitingForYouHereSoon')" :hasAction="true" :actionBtnText="t('exploreLearningPrograms')" @action="navigateTo(localePath('/learning-programs'))") 
                template(#icon) 
                    IconEmptyCertificate
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const type = route.params.type as string;
const slug = route.params.slug as string;

const {
  data: diplomaCertificate,
  pending: diplomaPending,
  error: diplomaError,
  refresh: refreshDiploma,
} = useAsyncData(
  `diplomaCertification-${slug}`,
  () => GqlDiplomaCertification({ slug }),
  {
    transform: (data) => [data?.diploma?.data?.myCertification],
    immediate: false, // don't run automatically
  }
);

const {
  data: courseCertificates,
  pending: coursePending,
  error: courseError,
  refresh: refreshCourse,
} = useAsyncData(
  `certification-${slug}`,
  () => GqlCourseCertifications({ slug }),
  {
    transform: (data) => data?.course?.data?.certifications,
    immediate: false, // don't run automatically
  }
);

watchEffect(() => {
  if (type === "path") {
    refreshDiploma();
  } else {
    refreshCourse();
  }
});

const certificates = computed(() =>
  type === "path" ? diplomaCertificate.value : courseCertificates.value
);
</script>

<style scoped></style>
