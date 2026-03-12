<template lang="pug">
    div(v-if="courseInfo?.reviews?.length" class="w-full lg:w-[652px]")
        .flex.items-center.justify-between(class="w-full lg:w-[652px]")
            .flex.flex-col(class="gap-[12px]")
                h1.heading-6 {{ t('studentsReview') }}
                .flex.items-center(class="gap-8px label-3")
                    IconStar(class="text-[#FF5552]")
                    p(class="text-[#A29D97]") #[span.label-prominent-3.text-black {{ courseInfo?.averageRating }}] ({{ courseInfo?.totalNumberOfRatings?.toFixed(2) }})
            button.btn-outline-primary.flex.items-center(class="gap-[4px]" @click="addReviewPopup = true" v-if="!courseInfo?.review?.id")
                IconStar(class="stoke-primary tex-transparent size-[20px]")
                span.label-prominent-3 {{ t('addReview') }}

        .flex.flex-col.gap-7.mt-10
            template(v-for="review in courseInfo?.reviews")
                div(class="pb-5 border-b")
                    ReviewCard(:data="review")

    div(class="flex items-center h-[900px] w-full justify-center" v-else)
      AppEmptyData(:title="t('thereAreNoReviewsYet')" :subTitle="t('beTheFirstToShareYourOpinionAboutThisContent')" :hasAction="true" @action="addReviewPopup = true" :actionBtnText="t('addReview')")
        template(#icon)
          IconEmptyReviews

    ReviewModal(v-model="addReviewPopup" v-if="addReviewPopup" :learningProgramId="courseInfo?.id" :learningProgramType="courseInfo?.type" @reviewAdded="handleReviewSuccess")

</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const { courseInfo, getCourseInfo } = useInsideCourse();
const addReviewPopup = ref<boolean>(false);

const handleReviewSuccess = async function () {
  await getCourseInfo();
};
</script>

<style scoped></style>
