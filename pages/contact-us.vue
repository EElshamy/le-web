<template lang="pug">
    .app-container(class="pt-[24px] lg:pt-[64px] pb-[48px] lg:pb-[104px]")
        .grid(class="grid-cols-1 lg:grid-cols-3")
            .cols-span-1 
                .flex.flex-col.gap-9 
                    .flex.flex-col.gap-4
                      p(class="heading-6 lg:heading-3") {{ t('contactUs') }}
                      p(class="lg:label-prominent-1 label-prominent-2") {{ t('weWouldBeHappyToHelpAndAnswerAnyQuestionsYouHave') }}
                    .flex.items-start.gap-2 
                        IconEmail(class="shrink-0")
                        .flex.flex-col.gap-4 
                            p.label-prominent-1 {{ t('email') }}
                            p.label-2 info@leiaqa.com
            
            .col-span-2
                Form.flex.flex-col(:validation-schema="schema" @submit="handleSubmit" class="mt-5 lg:mt-0 gap-[16px] max-w-[540px] mx-auto")
                    InputText(name="fullname" :value="username" :disabled="isLoggedIn" :label="t('fullName')" :placeholder="t('enterFullName')")
                    InputText(name="email" :value="user?.email" :disabled="isLoggedIn" :label="t('email')" :placeholder="t('enterEmail')")
                    InputPhone(name="phone" :label="t('phoneNumber')" :placeholder="t('enterPhoneNumber')")
                    InputSelect(name="contactReason" :options="activeOptions" :label="t('contactUsSubject')" :placeholder="t('selectSubject')")
                    InputText(name="subject" type="text" :label="t('messageTitle')" :placeholder="t('enterMessageTitle')")
                    InputText(name="message" type="textarea" :rows="4" :label="t('message')" :placeholder="t('typeYourMessageOrInquiryHere')")
                    button.btn-primary(class="rounded-[12px]" type="submit") {{ t('send') }}
    
    AppModal(v-model="ticketSuccessPopup" v-if="ticketSuccessPopup" :showClose="false" :showActions="false") 
        .flex.flex-col.gap-5.items-center.justify-center.pt-5
            IconSubmitTicket 
            .flex.flex-col.gap-4.text-center
                p.heading-6 {{ t('messageSentSuccessfully') }}
                p.body-3 {{ t('weWillReviewYourMessageAndGetBackToYouAsSoonAsPossible') }}
            NuxtLink.btn-primary(:to="localePath('/')" class="mb-[24px]") {{ t('backToHome') }}
</template>

<script setup lang="ts">
import * as yup from "yup";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const { contactUs } = useContact();
const { activeOptions } = useContactInfo();
const ticketSuccessPopup = ref<boolean>(false);

const username = computed(() => {
  const englishFullName = user?.value?.enFullName;
  const arabicFullName = user?.value?.arFullName;

  if (englishFullName && arabicFullName) {
    if (locale.value === "en") return englishFullName;
    return arabicFullName;
  }

  return englishFullName || arabicFullName;
});

const schema = yup.object({
  fullname: isLoggedIn.value
    ? yup.string()
    : yup.string().required().label(t("fullName")),
  email: isLoggedIn.value
    ? yup.string()
    : yup.string().required().email().required().label(t("email")),
  phone: yup.string().nullable(),
  contactReason: yup.string().required().label(t("contactUsSubject")),
  subject: yup.string().required().min(2),
  message: yup.string().required().min(2).max(1000),
});

const handleSubmit = async function (values: any) {
  const { message, success } = await contactUs(values);
  useAlert({ type: success ? "success" : "error", message });
  if (success) ticketSuccessPopup.value = true;
};

const seoTitle = t("contactTheLeiaqaTeam");
const seoDescription = t(
  "contactTheLeiaqaSupportTeamForAssistanceAndInquiriesAboutHowWeWorks"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
