<template lang="pug">
    nav.flex.items-center.justify-between(class="px-[32px] py-[20px] bg-[#F8F5F3]")
        button(class="block lg:hidden" @click="handleNavigateBack")
            .flex.items-center.gap-3.label-prominent-3
                IconArrowRight(class="text-[#76003E] ltr:rotate-180")
                p {{ t('back') }}
        button(class="lg:hidden" @click="viewContent = true") 
            .flex.items-center.gap-3.label-prominent-3
                IconMenu
                p {{ t('content') }}

        .items-center.gap-8(class="hidden lg:flex") 
            NuxtLink.border-e.pe-8.border-black(:to="localePath('/')" class="2xl:f-w-100-150")
                //- Added to div cz TheLogo has two parent elements which makes a mismatch for vue
                //- vue asks for which element shall I add this class to ?
                //- vue throws out a warning and doesn’t apply the style to either of them.
                //- $attrs is not a solution here cz the user can choose whether the website lang is ar so the ar logo is rendered and same for en
                //-  --> so wrapping it inside a div fixes the problem
                //- TODO: Get the reference from vue docs 
                div(class="hidden 2xl:block w-full")
                  TheLogo
                TheLogoIcon(class="block 2xl:hidden")
            .flex.items-center.gap-2
              NuxtLink.label-2.truncate(:to="localePath(`/my-learning-programs`)" class="leading-[40px]") {{ t('myLearningJourney') }}
              IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")
              NuxtLink.label-2.truncate(:to="localePath(`/program/details/${activeCourseId}`)" class="leading-[40px]") {{ locale === 'en' ? courseInfo?.enTitle : courseInfo?.arTitle }}
              IconArrowLeft(:class="{ 'rotate-180': locale === 'en' }")
              p.label-prominent-2.truncate(class="leading-[40px]") {{ activeLessonContent?.section?.title }}
        .items-center.gap-3(class="hidden lg:flex") 
            .flex.items-center
                div(class="border-e border-black px-5")
                    p.label-prominent-3  #[span.label-3 {{ t('progress') }}] {{ courseProgress }}%
                p.label-prominent-3.px-5 {{ courseInfo?.courseProgress?.completedLessons }} / {{ courseInfo?.courseProgress?.totalLessons }} #[span.label-3 {{ t('completedLecture') }}]
            .flex.items-center.gap-5
                button.btn-outline-primary(@click="addReviewPopup=true" v-if="!courseInfo?.review")
                    .flex.items-center.gap-1
                        IconStar 
                        p {{ t('addReview') }}
                //- button: IconThreeDots
                AppDropdown(:options="dropdownOption" @clicked="handleDropDownOption")
                  template(#deleteReview="{ option }" v-if="courseInfo?.review") 
                    div(class="cursor-pointer px-[12px] rounded-[8px]" @click="deleteReviewPopup = true") 
                      p {{ option?.label }}
    
    ReviewModal(v-model="addReviewPopup" v-if="addReviewPopup" :learningProgramId="activeCourseId" :learningProgramType="courseInfo?.type" @reviewAdded="handleReviewAdded")
    ReportModal(v-model="reportLecturerPopup" v-if="reportLecturerPopup" :targetType="ReportTargetEnum.LECTURER" :title="t('reportLecturer')" :subTitle="t('reportLecturerSubTitle')" @close="reportLecturerPopup = false")
    ReportModal(v-model="reportCourse" v-if="reportCourse" :targetId="courseInfo?.id" :targetType="courseInfo?.type === 'COURSE' ? ReportTargetEnum.COURSE : ReportTargetEnum.WORKSHOP" :title="`${t('report')} ${courseInfo?.type === 'COURSE' ? t('course') : t('workshop')}`" :subTitle="t('reportCourseTitle')" @close="reportCourse = false")
    AppModal(v-model="deleteReviewPopup" v-if="deleteReviewPopup" :showClose="false" :showActions="false" customStyle="h-fit")
        .flex.items-center.justify-center(class="pt-[24px]")
          p.heading-6.text-center {{ t('areYouSureYouWantToDeleteYourReview') }}
        .grid.grid-cols-2(class="p-[24px] gap-[12px]")
          button.btn.btn-primary(@click="handleDeleteReview") {{ saveText || t('delete') }}
          button.btn-outline-primary(@click="deleteReviewPopup = false") {{ cancelText || t('cancel') }}

    AppModal(v-model="reviewSuccess" v-if="reviewSuccess" :showActions="false" customStyle="h-fit py-[40px]")
        AppEmptyData(:title="t('thankYouForSharingYourOpinion')" :subTitle="t('yourRatingHelpsImproveTheExperienceAndHelpsOthersMakeTheirDecision')")
            template(#icon) 
                IconReviewDone
            
    
    LessonContentModal(v-model="viewContent")

</template>

<script setup lang="ts">
import { ReportTargetEnum } from "#gql/default";
import { useInsideLesson } from "~/composables/useInsideLesson";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const { activeLessonId, activeLessonContent } = await useInsideLesson();
const { activeCourseId, courseInfo, getCourseInfo } = useInsideCourse();
const { deleteReview } = useReview();
const { openShareModal } = useShare();
const reviewSuccess = ref<boolean>(false);
const viewContent = ref<boolean>(false);
const reportLecturerPopup = ref<boolean>(false);
const reportCourse = ref<boolean>(false);
const addReviewPopup = ref<boolean>(false);
const deleteReviewPopup = ref<boolean>(false);
const { setLink } = useShare();
const { width } = useWindowSize();

onBeforeMount(async () => await getCourseInfo());

const courseProgress = computed(() => {
  if (!courseInfo.value) return;
  const { completedLessons, totalLessons } = courseInfo?.value?.courseProgress;
  return ((completedLessons / totalLessons) * 100).toFixed(2);
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
  setLink(route.fullPath);
  switch (value) {
    case "share":
      return (openShareModal.value = true);
    case "deleteReview":
      return (deleteReview.value = true);
    case "reportLecturer":
      return (reportLecturerPopup.value = true);
    case "reportCourse":
      return (reportCourse.value = true);
  }
};

const handleNavigateBack = function () {
  const navigationUrl = route?.fullPath?.split("lesson")[0];
  return navigateTo(localePath(navigationUrl));
};

const handleDeleteReview = async function () {
  const { message, success } = await deleteReview(
    courseInfo?.value?.review?.id
  );
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    deleteReviewPopup.value = false;
    courseInfo.value.review = null;
  }
};

const handleReviewAdded = async function () {
  reviewSuccess.value = true;
  await getCourseInfo();
};
</script>

<style scoped></style>
