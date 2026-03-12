<template lang="pug">
    AppModal(v-model="model" v-if="model" :title="true" :showActions="false" customStyle="h-fit w-full lg:w-[520px]")
        template(#header)
              .flex.flex-col.gap-4
                  p {{ t('evaluateEducationalContent') }}
                  p.body-3 {{ t('yourRatingHelpsUsImprove') }}
        
        Form(:validation-schema="schema" @submit="handleSubmit" @invalid-submit="handleInvalidSubmit")
            .flex.flex-col.gap-7
                .flex.flex-col.gap-2 
                    p.label-prominent-3 {{ t('rateYourExperience') }}
                    .flex.items-center.gap-3.mt-3
                        IconStar.cursor-pointer(v-for="i in 5" class="size-[48px]" :class="{ 'text-[#FF5552]': i < rate, 'text-transparent stroke-gray-300': i >= rate }" @click="rate = i + 1")
                    p(class="text-[12px] m-0 text-red-700" v-if="starErr") {{ t('selectAtLeaseOneStar') }}
                InputText(name="review" :label="t('howWasYourEducationalExperience')" :placeholder="t('shareYourFeedbackOrSuggestionsWithUs')" type="textarea" :rows="4")
                .flex.items-center.justify-end(class="py-[10px]")
                    button.btn-primary {{ t('sendReview') }}
</template>

<script setup lang="ts">
import * as yup from "yup";
import { RevenueShareTargetEnum } from "#gql/default";

const props = defineProps<{
  learningProgramId: string;
  learningProgramType: RevenueShareTargetEnum;
}>();
const emit = defineEmits(["reviewAdded"]);

const model = defineModel();
const { t, locale } = useI18n();
const rate = ref<number>(0);
const { addReview } = useReview();
const starErr = ref<boolean>(false);

const schema = yup.object({
  review: yup.string().required().label(t("review")),
});

const handleSubmit = async function (values: { review: string }) {
  if (!rate.value) return (starErr.value = true);
  const { data, message, success } = await addReview({
    ...values,
    rating: rate.value - 1 > 0 ? rate.value - 1 : 0,
    learningProgramId: props.learningProgramId,
    learningProgramType: props.learningProgramType,
  });
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    model.value = false;
    emit("reviewAdded", data);
  }
};

const handleInvalidSubmit = function () {
  if (!rate.value) return (starErr.value = true);
};

watch(rate, () => {
  if (!starErr) return;
  if (rate.value > 0) return (starErr.value = false);
});
</script>

<style scoped></style>
