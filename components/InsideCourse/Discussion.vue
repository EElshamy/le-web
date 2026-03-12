<template lang="pug">
    .flex.flex-col(v-if="courseDiscussion?.length" class="w-full lg:w-[652px]")
        h1.heading-6 {{ t('discussion') }}
        .label-2.mt-4 #[span.label-prominent-2 {{ courseDiscussion?.length }}] {{ t('subject') }}
        .mt-10
        .flex.flex-col.gap-5(class="h-[700px] lg:max-w-[652px] overflow-y-scroll")
            template(v-for="comment, idx in courseDiscussion")
              .border-b
                DiscussionCard(:data="comment" @reply="handleSetParentCommentId" @toggleViewReviews="handleActivateNested(idx)" :addCommentPerm="true")
                template(v-for="nestedComment in comment?.replies" v-if="activeNestedIdx?.includes(idx)") 
                  div(class="ms-[50px]")
                    DiscussionCard(:data="nestedComment" @reply="handleSetParentCommentId" :addCommentPerm="false" customClass="lg:max-w-[400px]")
            
        .sticky.bottom-0(class="w-full lg:w-[652px] bg-white")
            Transition(name="slide")
                div(v-if="parentComment" class="bg-[#f4f4f4] w-fit py-[4px] px-[8px] rounded-[8px] flex items-center gap-2")
                    p.label-3 {{ t('replyTo') }} {{ locale === 'en' ? parentComment?.user?.enFullName : parentComment?.user?.arFullName }}
                    button(@click="parentComment = null"): IconX
            form(@submit.prevent="onSubmit")
                InputText(name="content" type="textarea" :placeholder="t('shareYourThoughts')" :rows="3")
                    template(#suffix)
                        button.btn-primary.absolute(type="submit" class="top-[41%] p-[8px] rtl:left-[0.7em] ltr:right-[0.7em]"): IconArrowUp
    .flex.items-center.justify-center.flex-col(v-else class="py-[104px] w-full")
      AppEmptyData(:title="t('thereAreNoDiscussionsYet')" :subTitle="t('beTheFirstToJoinTheDiscussion')" class="h-[700px]") 
    
      .sticky.bottom-0(class="w-full lg:w-[652px] bg-white")
            Transition(name="slide")
                div(v-if="parentComment" class="bg-[#f4f4f4] w-fit py-[4px] px-[8px] rounded-[8px] flex items-center gap-2")
                    p.label-3 {{ t('replyTo') }} {{ locale === 'en' ? parentComment?.user?.enFullName : parentComment?.user?.arFullName }}
                    button(@click="parentComment = null"): IconX
            form(@submit.prevent="onSubmit")
                InputText(name="content" type="textarea" :placeholder="t('shareYourThoughts')" :rows="3")
                    template(#suffix)
                        button.btn-primary.absolute(type="submit" class="top-[41%] p-[8px] rtl:left-[0.7em] ltr:right-[0.7em]"): IconArrowUp
</template>

<script setup lang="ts">
import * as yup from "yup";

const { t, locale } = useI18n();
const { courseDiscussion, getCourseDiscussion, activeCourseId } =
  useInsideCourse();
const { addLike, addComment, deleteComment } = useDiscussion();
const parentComment = ref();
const viewReviews = ref<boolean>(false);
const activeNestedIdx = ref<number[]>([]);

const schema = yup.object({
  content: yup.string().nullable(),
});

const { values, setFieldValue, handleSubmit } = useForm({
  validationSchema: schema,
});

onBeforeMount(async () => await getCourseDiscussion());

const handleSetParentCommentId = function (comment: string) {
  parentComment.value = comment;
};

const onSubmit = handleSubmit(async function (values: any) {
  const { success } = await addComment({
    courseId: activeCourseId.value,
    content: values?.content,
    parentCommentId: parentComment.value?.id || undefined,
  });
  if (success) {
    setFieldValue("content", null);
    await getCourseDiscussion();
    parentComment.value = null;
  }
});

const handleActivateNested = function (index: number) {
  if (activeNestedIdx.value?.includes(index)) {
    return (activeNestedIdx.value = activeNestedIdx.value?.filter(
      (idx: number) => idx !== index
    ));
  }
  return activeNestedIdx.value.push(index);
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from {
  transform: translateY(20px);
  opacity: 0;
  max-height: 0;
}

.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
  max-height: 500px; /* adjust as needed */
}

.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
  max-height: 500px;
}

.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
  max-height: 0;
}
</style>
