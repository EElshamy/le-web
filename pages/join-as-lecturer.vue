<template lang="pug">
    .app-container
        .flex.justify-center(class="pt-[24px] lg:pt-[64px] pb-[104px]" v-if="!otp")
            div
                .flex.flex-col.gap-2
                    h1(class="lg:heading-5 heading-6") {{ t('joinUsAsLecturer') }}
                    p.body-3 {{ t('joinOurTeamOfFitnessInstructorsAndShareYourExperienceInTeachingOthers') }}

                Form.flex.flex-col(:validation-schema="schema" @submit="handleSubmit" class="mt-10 w-full lg:w-[540px]")
                    .flex.flex-col.gap-7
                        p.label-prominent-1 {{ t('personalInformation') }}
                        .flex.flex-col(class="gap-[16px]")
                            InputText(name="arFullName" :label="t('fullNameInArabic')" :placeholder="t('enterFullNameInArabic')")
                            InputText(name="enFullName" :label="t('fullNameInEnglish')" :placeholder="t('enterFullNameInEnglish')")
                            InputText(name="email" :label="t('email')" placeholder="name@example.com")
                            InputText(name="password" type="password" :label="t('password')" :placeholder="t('chooseAStrongPassword')")
                            InputPhone(name="phone" type="text" :label="t('phoneNumber')" @validphone="val=> validPhone = val" :placeholder="t('phoneNumber')")
                            .grid.grid-cols-2.gap-5
                                InputSelect(name="nationality" :options="formattedCountries" :label="t('nationality')" :placeholder="t('chooseNationality')")
                                InputSelect(name="country" :options="formattedCountries" :label="t('country')" :placeholder="t('chooseCountry')")

                    .flex.flex-col.gap-7.mt-9
                        p.label-prominent-1 {{ t('professionalInformation') }}
                        .flex.flex-col(class="gap-[16px]")
                            .grid.grid-cols-2.gap-5
                                InputSelect(name="fieldOfTrainingIds" :options="formattedFieldsOfTraining" :label="t('basicSpecialization')" :placeholder="t('chooseNationality')")
                                InputText(name="yearsOfExperience" type="number" :label="t('yearsOfExperience')" :placeholder="t('enterYearsOfExperience')")
                            InputSelect(name="jobTitleId" :options="formattedJobTitle" :label="t('jobTitle')" :placeholder="t('enterJobTitle')")
                            //- InputText(name="aboutMe" type="textarea" :label="t('aboutYou')" :placeholder="t('aBriefAboutYouYourExperiencesAndYourAreaOfExpertise')")

                    .flex.flex-col.gap-7.mt-9
                        p.label-prominent-1 {{ t('attachments') }}
                        .flex.flex-col(class="gap-[16px]")
                            InputText(type="text" name="instagramUrl" :label="t('yourPersonalOInstagramAccountLink')" placeholder="https://instagram.com/username")
                            InputText(type="text" name="linkedInUrl" :label="t('yourPersonalLinkedinAccountLink')" placeholder="https://linkedin.com/in/username")
                            InputText(type="text" name="facebookUrl" :label="t('yourPersonalFacebookAccountLink')" placeholder="https://facebook.com/username")
                            InputUploadFile(name="cvUrl" :label="t('uploadCertificates')" :useCase="FileModelEnum.LECTURER_CV_FILE" :multiple="true" :tip="t('attachProfessionalOrAcademicCertificatesThatSupportYourExperienceAndSpecialization')" :content="t('dragTheFileHereOrClickToSelectIt')" :maxSizeInMb="10" :formats="['PNG', 'PDF', 'JPG']")

                    button.btn-primary.mt-9(:disabled="loading")
                      .flex.items-center.gap-2
                        IconLoading(v-if="loading")
                        span {{ t('SubmitTheRequest') }}

        div(class='max-w-[430x] pt-[88px] pb-[200px]' v-else)
          AuthOtp(:email :useCase="VerificationCodeUseCasesEnum.EMAIL_VERIFICATION" :disabled="disableOtp" @success="handleOtpSuccess")

    AppModal(v-model="lecturerSuccess" v-if="lecturerSuccess" :showClose="false" :showActions="false" :blockCloseOnUnFocus="true" customStyle="!p-[32px]")
      .flex.flex-col.gap-5.justify-center.items-center
        IconMessage
        .flex.flex-col.gap-4.justify-center.items-center.text-center(class="max-w-[320px]")
          p.heading-6 {{ t('messageSentSuccessfully') }}
          p.body-3 {{ t('weWillReviewYourRequestAndGetBackToYouAsSoonAsPossible') }}
        NuxtLink.btn-primary.w-full(:to="localePath('/')") {{ t('backToHome') }}

</template>

<script setup lang="ts">
import { FileModelEnum, VerificationCodeUseCasesEnum } from "#gql/default";
import * as yup from "yup";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formattedCountries, formattedJobTitle, formattedFieldsOfTraining } =
  await useJoinASLecturerOptions();
const { joinAsLecturer } = useJoinAsLecturer();
const otp = ref<boolean>(false);
const email = ref<string>("");
const lecturerSuccess = ref<boolean>(false);
const disableOtp = ref<boolean>(false);
const validPhone = ref();
const arabicOnlyRegex = /^[\u0600-\u06FF\s]+$/;
const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/'])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
const loading = ref<boolean>(false);

const schema = yup.object({
  arFullName: yup
    .string()
    .required()
    .matches(arabicOnlyRegex, t("arabicOnlyValidation"))
    .label(t("fullNameInArabic")),
  enFullName: yup.string().required().label(t("fullNameInEnglish")),
  email: yup.string().email().required().label(t("email")),
  password: yup
    .string()
    .matches(passwordRegex, t("strongPasswordValidation"))
    .min(8)
    .required()
    .label(t("password")),
  phone: yup
    .string()
    .required()
    .test("Phone number", t("invalidPhone"), function (value: any) {
      return validPhone.value ? true : false;
    })
    .label(t("phoneNumber")),
  nationality: yup.string().required().label(t("nationality")),
  country: yup.string().required().label(t("country")),
  fieldOfTrainingIds: yup.string().required().label("basicSpecialization"),
  yearsOfExperience: yup
    .string()
    .required()
    .test(
      "yearsOfExperience",
      t("yearsOfExperienceMustBeArLeastOne"),
      (value) => {
        if (+value < 1 || +value > 50) return false;
        return true;
      }
    )
    .label(t("yearsOfExperience")),
  jobTitleId: yup.string().required().label(t("jobTitle")),
  aboutMe: yup.string(),
  linkedInUrl: yup.string(),
  facebookUrl: yup.string(),
  instagramUrl: yup.string(),
  cvUrl: yup.array().min(1).required().label(t("certificates")),
});

const handleSubmit = async function (values: any) {
  loading.value = true;
  const { message, success } = await joinAsLecturer(values);
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    email.value = values?.email;
    otp.value = true;
  }
  loading.value = false;
};

const handleOtpSuccess = async function (values: any) {
  lecturerSuccess.value = true;
  disableOtp.value = true;
};

const seoTitle = t("joinAsALeiaqaLecturer");
const seoDescription = t(
  "joinLeiaqaTeamAndBecomeACertifiedExpertInAnyFieldOfHealthNutritionAndPhysicalFitness"
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped></style>
