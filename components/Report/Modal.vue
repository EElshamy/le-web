<template lang="pug">
    AppModal(v-model="model" :title="true" :showActions="false" customStyle="h-fit") 
        template(#header) 
            .flex.flex-col.gap-4
                p.heading-6 {{ title }}
                p.body-3(class="w-full lg:max-w-[408px]") {{ subTitle }}
        Form.flex.flex-col.gap-7(:validation-schema="schema" @submit="handleSubmit")
            InputSelect(:label="t('reportReason')" name="reason" :placeholder="t('selectReason')" :options="options || defaultOptions")
            InputText(name="content" type="textarea" :label="t('additionalNotes')" :placeholder="t('provideAnyDetailsThatHelpUsBetterUnderstandTheIssue')" :rows="4")
            .flex.items-center.gap-2(class="pb-[18px]")
              button.btn-primary {{ t('submitReport') }}

</template>

<script setup lang="ts">
import { ReportReasonEnum, ReportTargetEnum } from "#gql/default";
import * as yup from "yup";

const props = defineProps<{
  title: string;
  subTitle: string;
  targetType: ReportTargetEnum;
  targetId: string;
  options?: [];
}>();
console.log(props.targetType, props.targetId);
const model = defineModel();
const { t, locale } = useI18n();
const { addReport } = useReports();

const defaultOptions = [
  {
    label: t("inappropriateContent"),
    value: ReportReasonEnum.INAPPROPRIATE_CONTENT,
  },
  { label: t("spam"), value: ReportReasonEnum.SPAM },
  { label: t("harassment"), value: ReportReasonEnum.HARASSMENT },
  { label: t("misinformation"), value: ReportReasonEnum.MISINFORMATION },
  { label: t("privacyViolation"), value: ReportReasonEnum.PRIVACY_VIOLATION },
  { label: t("offTopic"), value: ReportReasonEnum.OFF_TOPIC },
  { label: t("falseClaims"), value: ReportReasonEnum.FALSE_CLAIMS },
];

const schema = yup.object({
  reason: yup.string().required().label(t("reportReason")),
  content: yup.string().required().min(2).max(250).label(t("additionalNotes")),
});

const handleSubmit = async function (values: any) {
  const { message, success } = await addReport({
    ...values,
    targetId: props.targetId,
    targetType: props.targetType,
  });
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    model.value = false;
  }
};
</script>

<style scoped></style>
