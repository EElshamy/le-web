<template lang="pug">
    .flex.items-start.gap-4.pb-5(class="w-[100%] lg:w-[652px]" :class="[customClass]")
        AppProfileAvatar(:showLabel="false" :showMenu="false" :label="locale === 'en' ? data?.user?.enFullName?.[0] : data?.user?.arFullName?.[0]" bgColor="#FF5552" textColor="white")
        .flex.flex-col(class="gap-[8px] w-full")
            .flex.items-center.justify-between 
                .flex.items-center(class="gap-[8px] flex-wrap") 
                    p.label-prominent-2 {{ locale === 'en' ? data?.user?.enFullName : data?.user?.arFullName }}
                    p.label-4(class="text-[#5D5A57]") {{ formatTimeAgo(data?.createdAt) }}
                AppDropdown(:options @clicked="handleOptionClick")
                  template(#report v-if="user?.id !== data?.user?.id") 
                    p(class="px-[12px] cursor-pointer" @click="reportCommentPopup = true") {{ t('reportComment') }}
                  template(#deleteComment v-if="user?.id === data?.user?.id") 
                    p(class="px-[12px] cursor-pointer" @click="deleteCommentPopup = true") {{ t('deleteComment') }}
            p.body-3(class="max-w-[500px]") {{ data?.content }}
            .flex.items-center(class="gap-[20px]")
                AppLike(:likeCount="data?.numberOfLikes" :isLiked="data?.isLiked" @click="handleToggleLike")
                AppComment(:label="t('addComment')" @comment="$emit('reply', data)" v-if="addCommentPerm")
                button(v-if="data?.replies?.length" @click="$emit('toggleViewReviews'), isViewing = !isViewing") {{ isViewing ? t('hideReplies') :  t('viewReplies') }}
    ReportModal(v-model="reportCommentPopup" v-if="reportCommentPopup" :title="t('reportComment')" :subTitle="t('pleaseSelectAReasonAndShareAnyDetailsToHelpUsReviewTheCommentYourReportWillRemainConfidential')" :targetType="ReportTargetEnum.COMMENT" :targetId="data?.id")
    AppModal(v-model="deleteCommentPopup" v-if="deleteCommentPopup" :showClose="false" :showActions="false")
        .flex.items-center.justify-center.pt-5
            p.heading-6.text-center {{ t('areYouSureYouWantToDeleteYourComment') }}
        .grid.grid-cols-2(class="p-[24px] gap-[12px]")
            button.btn.btn-primary(@click="handleDeleteComment") {{ saveText || t('deleteComment') }}
            button.btn-outline-primary(@click="deleteCommentPopup = false") {{ cancelText || t('cancel') }}
</template>

<script setup lang="ts">
import { ReportReasonEnum, ReportTargetEnum } from "#gql/default";

const { t, locale } = useI18n();
const { formatTimeAgo } = useFormatter();
const { activeCourseId } = useInsideCourse();
const { addLike, addComment, deleteComment } = useDiscussion();
const { getCourseDiscussion } = useInsideCourse();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const isViewing = ref<boolean>(false);
const reportCommentPopup = ref<boolean>(false);
const deleteCommentPopup = ref<boolean>(false);

const props = defineProps<{
  data: any;
  addCommentPerm?: boolean;
  customClass?: string;
}>();
const emit = defineEmits(["reply", "toggleViewReviews"]);

const handleToggleLike = async function () {
  // if (!props.data?.isLiked) props.data.isLiked = false;
  const { success } = await addLike(props?.data?.id);
  await getCourseDiscussion();
};

const options = [
  { label: t("reportComment"), emitter: "report", slot: "report" },
  { label: t("deleteComment"), emitter: "delete", slot: "deleteComment" },
];

const handleOptionClick = function (emitter: string) {
  switch (emitter) {
    case "report":
      return (reportCommentPopup.value = true);
  }
};

const handleDeleteComment = async function () {
  const { message, success } = await deleteComment(props.data?.id);
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    await getCourseDiscussion();
    deleteCommentPopup.value = false;
  }
};
</script>

<style scoped></style>
