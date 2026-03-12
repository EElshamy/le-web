<template lang="pug">
    NuxtLink.flex.items-start.gap-7(class="w-full flex-col lg:flex-row lg:max-w-[800px]" :to="localePath(navigationLink)")
        div(class="w-full lg:w-[180px] flex-shrink-0")
            AppImage(class="shrink-0 rounded-[12px]" :alt="locale === 'en' ? data?.enTitle : data?.arTitle" ratio="3-2" :src="getImageUrl(data?.thumbnail)")
        .flex.flex-col.gap-5.w-full

            .flex.items-center.justify-between
                .flex.flex-col(class="gap-[10px]")
                    p(class="label-prominent-2 lg:label-prominent-1") {{ locale === 'en' ? data?.enTitle : data?.arTitle }}
                    p(class="label-4 lg:label-3")
                      span {{ data?.isLiveCourse ? t('liveWorkshop') : $t(data?.type?.toLowerCase() || '') }}
                      span.mx-2(v-if="data.subscriptionExpiresAt") |
                      span(v-if="data.subscriptionExpiresAt") {{ t('ExpiresOn') }}:
                      span.text-primary.mx-1.font-normal(v-if="data.subscriptionExpiresAt")  {{ formatDateWithMonth(data.subscriptionExpiresAt, locale) }}
                AppDropdown(:options="dropdownOption" @clicked="handleDropDownOption")
                    template(#deleteReview="{ option }" v-if="data?.review?.rating")
                        div(class="cursor-pointer px-[12px] rounded-[8px]" @click="deleteReviewPopup = true")
                            p {{ option?.label }}

            .flex.items-center.justify-between(class="flex-col gap-7 lg:gap-[64px] lg:flex-row")
                .flex.flex-col.w-full
                    AppProgress(:progress="courseProgress")
                    //- p {{ formatDateWithMonth(data.subscriptionExpiresAt, locale) }}
                    .flex.items-center.justify-between.label-4.mt-3
                        p {{ data?.courseProgress?.completedLessons }}/{{ data?.courseProgress?.totalLessons  }} {{ t('completedLessons') }}
                        .flex.items-center.gap-3(v-if="data?.review")
                            p.label-label-prominent-4.whitespace-nowrap {{ t('yourRate') }}
                            .flex.items-center(class="gap-[4px]")
                                IconStar(v-for="rate, idx in 5" :class="{ 'text-[#FF5552]': idx < data?.review?.rating, 'text-transparent stroke-gray-300': idx >= data?.review?.rating}")
                        .flex.items-center.gap-3(v-else)
                            button.whitespace-nowrap(@click.prevent="addReviewPopup = true") {{ t('addReview') }}
                            .flex.items-center(class="gap-[4px]")
                                    IconStar(v-for="rate in 5" :class="{ 'text-transparent stroke-gray-300': true}")
                NuxtLink.btn-primary.flex-shrink-0.label-prominent-3(:to="localePath(`/program/details/${data?.id}`)" @click.stop class="w-full lg:w-auto") {{ t('continueLearning') }}

    ReviewModal(v-model="addReviewPopup" v-if="addReviewPopup" :learningProgramId="data?.id" :learningProgramType="data?.type" @reviewAdded="handleReviewSuccess")
    ReportModal(v-model="reportCourse" v-if="reportCourse" :targetId="data?.id" :targetType="data?.type === 'COURSE' ? ReportTargetEnum.COURSE : ReportTargetEnum.WORKSHOP" :title="`${t('report')} ${data?.type === 'COURSE' ? t('course') : t('workshop')}`" :subTitle="t('reportCourseTitle')" @close="reportCourse = false")
    AppModal(v-model="deleteReviewPopup" v-if="deleteReviewPopup" :showClose="false" :showActions="false")
        .flex.items-center.justify-center.mt-5
            p.heading-6.text-center {{ t('areYouSureYouWantToDeleteYourReview') }}
        .grid.grid-cols-2(class="p-[24px] gap-[12px]")
            button.btn.btn-primary(@click="handleDeleteReview") {{ saveText || t('delete') }}
            button.btn-outline-primary(@click="deleteReviewPopup = false") {{ cancelText || t('cancel') }}
</template>

<script setup lang="ts">
import { ReportTargetEnum } from "#gql/default";

const props = defineProps<{
  data?: any;
}>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getImageUrl } = usePhoto();
const { openShareModal } = useShare({ customLink: "hello" });
const { deleteReview } = useReview();
const reportCourse = ref<boolean>(false);
const deleteReviewPopup = ref<boolean>(false);
const addReviewPopup = ref<boolean>(false);
const { setLink } = useShare();

const courseProgress = computed(() => {
  const { completedLessons, totalLessons } = props.data?.courseProgress;
  return (completedLessons / totalLessons) * 100;
});

const navigationLink = computed(() => {
  const slug = props.data?.slug;
  switch (props.data?.type) {
    case "COURSE":
      return `/program/details/${props.data?.id}`;
    case "WORKSHOP":
      return `/program/details/${props.data?.id}`;
    case "DIPLOMA":
      return `/path/${slug}`;
    case "SUBSCRIPTION":
      return `/subscription/${slug}`;
  }
});

const dropdownOption = [
  {
    label: t("shareCourse"),
    emitter: "share",
  },
  // {
  //   label: t("reportLecturer"),
  //   emitter: "reportLecturer",
  // },
  {
    label: t("reportCourse"),
    emitter: "reportCourse",
  },
  {
    label: t("deleteReview"),
    emitter: "deleteReview",
    slot: "deleteReview",
  },
];

const handleDropDownOption = function (value: string) {
  switch (value) {
    case "share":
      openShareModal.value = true;
      return setLink(`/program/${props.data?.slug}`);
    case "reportCourse":
      return (reportCourse.value = true);
    // case "deleteReview":
    //   return (reportCourse.value = true);
  }
};

const handleDeleteReview = async function () {
  console.log(props.data);
  const { message, success } = await deleteReview(props.data?.review?.id);
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    deleteReviewPopup.value = false;
    props.data.review = null;
  }
};

const handleReviewSuccess = function (val: number | string) {
  props.data.review = val;
};

function formatDateWithMonth(dateString, lang = "en") {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const monthsEn = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthsAr = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  if (lang === "ar") {
    const formatted = `${day} ${monthsAr[date.getUTCMonth()]} ${year}`;
    return formatted.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  }

  return `${day} ${monthsEn[date.getUTCMonth()]} ${year}`;
}
</script>

<style scoped></style>
