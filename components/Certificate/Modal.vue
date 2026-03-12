<template lang="pug">
    AppModal(v-model="model" :scrollTopBottomOnMobile="width <= 640" v-if="model" :showClose="true" dialogStyle="h-[90%] lg:h-auto" customStyle="w-full lg:w-[648px] pt-[24px]" :showActions="false" class="pb-[24px]") 
        .flex.items-center.gap-8(class="flex-wrap sm:flex-nowrap")
            .flex.flex-col.gap-6

                .flex.flex-col.gap-4 
                    .flex.items-start.justify-between
                      h1.heading-6 {{ t('congratulations') }}
                      button(class="block lg:hidden" @click="model = false"): IconClose(class="text-primary")
                    p.label-prominent-1 {{ t('youHaveCompletedTheCourse') }}
                    template(v-for="certificate, idx in certificates" v-if="courseInfo?.ACE_Certificate") 
                      InfoCard(:src="certificate?.src" :title="certificate.title" :subTitle="certificate?.subTitle" :disabled="certificate?.disabled") 
                        template(#subTitle) 
                          AppBadge(:label="t('available')" type="success" v-if="idx === 0")
                p.body-4 {{ t('toIssueAndDownloadYourCertificatePleaseCarefullyEnterYourFullNameInBothArabicAndEnglish') }} {{ t('theNameYouEnterWillAppearExactlyAsItAppearsOnTheOfficialCertificateSoPleaseReviewItCarefullyBeforeSubmitting') }}
            div(class="w-full lg:max-w-[275px] order-1 lg:order-2" v-if="!courseInfo?.ACE_Certificate")
                NuxtImg(src="/images/certification/en.png" format="webp" alt="certification" loading="lazy")
        Form.mt-5.flex.flex-col.gap-5.pb-5(:validation-schema="schema" @submit="handleSubmit") 
            InputText(name="arName" :label="t('fullNameInArabic')")
            InputText(name="enName" :label="t('fullNameInEnglish')")

            p.body-4 {{ t('afterEnteringTheTwoNamesCorrectlyClickIssueCertificateToDownloadIt') }}
            
            .flex.items-center.justify-end
                button.btn-primary.label-prominent-2 {{ t('generateCertificate') }}
</template>

<script setup lang="ts">
import * as yup from "yup";

const model = defineModel();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { generateCertificate } = useCertificate();
const { activeCourseId, courseInfo } = useInsideCourse();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { width } = useWindowSize();

const certificates = [
  { src: "/images/certification/en.png", title: t("leiaqaCertificate") },
  {
    src: "/images/certification/ace.png",
    title: t("leiaqaCertificate"),
    subTitle: `${t("yourAceCertificateWillBeReadyIn")} ${
      courseInfo?.value?.courseDetail?.aceDaysToGetCertified
    } ${t("days")}`,
    disabled: true,
  },
];

const schema = yup.object({
  arName: yup.string().required().label(t("fullNameInArabic")),
  enName: yup.string().required().label(t("fullNameInEnglish")),
});

const handleSubmit = async function (values: {
  enName: string;
  arName: string;
}) {
  const { message, success } = await generateCertificate({
    ...values,
    learningProgramId: activeCourseId.value,
    learningProgramType: courseInfo?.value?.type,
    userId: user.value?.id,
  });
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    model.value = false;
    navigateTo(localePath("/my-certificates"));
  }
};
</script>

<style scoped></style>
