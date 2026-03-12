<template lang="pug">
    .flex.flex-col.gap-2
        .flex.justify-between.items-center
            .flex.flex-col(class="gap-[12px]")
                .flex.items-center.gap-2
                    IconStar(v-for="rate, idx in data?.rating" :class="{ 'text-[#FF5552]': idx < data?.rating, 'text-transparent stroke-gray-300': idx >= data?.rating }")
                p(class="text-[16px] font-400") {{ locale === 'en' ? data?.user?.enFullName : data?.user?.arFullName }}

            AppDropdown(:options="dropdownOptions" @clicked="handleOptionClick" v-if="isLoggedIn")
                template(#report v-if="user?.id !== data?.user?.id")
                  div(class="px-[12px] cursor-pointer" @click="reportReview = true")
                    p {{ t('reportReview') }}
                template(#deleteReview v-if="isLoggedIn && user?.id === data?.user?.id")
                    div(class="px-[12px] cursor-pointer" @click="deleteReviewPopup = true")
                        p {{ t('deleteReview') }}

        .comment
            p(class="text-[14px] font-300 text-[#3A3938]") {{ data?.review }}

        .date
            p(class="text-[12px] font-300") {{ formatTimeAgo(data?.createdAt) }}

    ReportModal(v-model="reportReview" v-if="reportReview" :title="t('reportReview')" :subTitle="t('pleaseSelectAReasonAndShareAnyDetailsToHelpUsReviewTheTheStudentReviewYourReportWillRemainConfidential')" :targetId="data?.id" :targetType="ReportTargetEnum.REVIEW")
    AppModal(v-model="deleteReviewPopup" v-if="deleteReviewPopup" :showClose="false" :showActions="false")
        .flex.items-center.justify-center.pt-5
            p.heading-6.text-center {{ t('areYouSureYouWantToDeleteYourReview') }}
        .grid.grid-cols-2(class="p-[24px] gap-[12px]")
            button.btn.btn-primary(@click="handleDeleteReview") {{ saveText || t('delete') }}
            button.btn-outline-primary(@click="deleteReviewPopup = false") {{ cancelText || t('cancel') }}

</template>

<script setup lang="ts">
import { ReportTargetEnum } from "#gql/default";

const props = defineProps<{
  data: any;
}>();
const { t, locale } = useI18n();
const { formatTimeAgo } = useFormatter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const { courseInfo, getCourseInfo } = useInsideCourse();
const { deleteReview } = useReview();
const deleteReviewPopup = ref<boolean>(false);
const reportReview = ref<boolean>(false);

const dropdownOptions = [
  {
    label: t("reportReview"),
    emitter: "reportReview",
    slot: "report",
  },
  {
    label: t("deleteReview"),
    emitter: "deleteReview",
    slot: "deleteReview",
  },
];

const handleOptionClick = function (emitter: string) {
  switch (emitter) {
    case "reportReview":
      return (reportReview.value = true);
    case "deleteReview":
      return (deleteReviewPopup.value = true);
  }
};

const handleDeleteReview = async function () {
  const { message, success } = await deleteReview(
    courseInfo?.value?.review?.id
  );
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    deleteReviewPopup.value = false;
    await getCourseInfo();
  }
};
</script>

<style scoped></style>
