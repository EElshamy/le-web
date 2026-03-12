<template lang="pug">
    .flex.flex-col.gap-8(class="w-full lg:max-w-[652px] pb-[200px]" v-if="!otp")
        .flex.items-center.gap-5.border-b.pb-8
            AppAvatar(:label="locale === 'en' ? user?.enFullName : user?.arFullName" :src="user?.profilePicture" :hideLabel="true" :loading="uploading" avatarClass="bg-[#FF5552] flex items-center justify-center text-white f-text-24-32 size-[64px] md:size-[80px]")
            .flex.flex-col.gap-3
                //- p.label-prominent-1 {{ locale === 'en' ? user?.enFullName : user?.arFullName }}
                p(class="f-text-16-20") {{ t('personalPhoto') }}

                .flex.items-center.gap-2
                  label.text-primary.flex.items-center.cursor-pointer.w-fit(for="upload-profile" class="gap-1")
                    IconUploadProfileImg(class="size-[16px]")
                    p.label-prominent-4 {{ t('uploadPhoto') }}
                  input(type="file" class="hidden" @change="handleFileSelect" id="upload-profile" accept=".png,.jpg,.jpeg")

                  button.flex.items-center.gap-1.text-danger(@click="handleDeleteProfilePicture" v-if="user?.profilePicture" :disabled="loading" class="disabled:cursor-not-allowed disabled:opacity-50")
                    IconTrash(class="size-[16px]" v-if="!loading")
                    IconLoading(class="size-[16px]" v-else)
                    p.label-prominent-4 {{ t('deleteImage') }}

        .flex.items-center.gap-5.border-b.pb-8
            .flex.items-center.justify-between.w-full(v-if="!editName")
                .flex.flex-col.gap-2.w-full
                    p(class="f-text-16-20") {{ t('name') }}
                    p(class="f-text-14-16 font-300") {{ user?.enFullName }} - {{ user?.arFullName }}
                button.flex.items-center.text-primary(class="gap-[4px]" @click="editName = true")
                    IconEdit(class="shrink-0")
                    p {{ t('edit') }}
            SettingsChangeName(v-else @close="editName = false" @submit="handleUpdateUsername")
        
        .flex.items-center.gap-5.border-b.pb-8
            .flex.items-center.justify-between.w-full(v-if="!editEmail")
                .flex.flex-col.gap-2.w-full
                    p(class="f-text-16-20") {{ t('email') }}
                    p(class="f-text-14-16 font-300") {{ user?.email }}
                button.flex.items-center.text-primary(class="gap-[4px]" @click="editEmail = true")
                    IconEdit(class="shrink-0")
                    p {{ t('edit') }}
            SettingsChangeEmail(v-else @close="editEmail = false" @submit="handleUpdateEmail")
          
        .flex.items-center.gap-5.border-b.pb-8
            .flex.items-center.justify-between.w-full(v-if="!editPhone")
                .flex.flex-col.gap-2.w-full
                    p(class="f-text-16-20") {{ t('phoneNumber') }}
                    p(class="f-text-14-16 w-fit font-300")(dir="ltr") {{ user?.phone || t('userHasntAddedAPhoneNumber') }}
                button.flex.items-center.text-primary(class="gap-[4px]" @click="editPhone = true")
                    IconEdit(class="shrink-0")
                    p {{ t('edit') }}
            SettingsChangePhone(v-else @close="editPhone = false" @submit="handleUpdatePhone")
    
    div(class='max-w-[430x] pt-[88px] pb-[200px]' v-else)   
        AuthOtp(:email :useCase="VerificationCodeUseCasesEnum.EMAIL_UPDATE" navigator="/settings/personal-info" @success="handleOtpSuccess")
</template>

<script setup lang="ts">
import { VerificationCodeUseCasesEnum, FileModelEnum } from "#gql/default";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const {
  updateUsername,
  changeEmail,
  changePhone,
  updateProfilePicture,
  deleteProfilePicture,
} = useSettings();
const { uploadFile } = useUpload();
const { getImageUrl } = usePhoto();
const uploading = ref<boolean>(false);
const loading = ref<boolean>(false);

const editName = ref<boolean>(false);
const editEmail = ref<boolean>(false);
const editPhone = ref<boolean>(false);
const otp = ref<boolean>(false);
const email = ref<string>("");

const handleUpdateUsername = async function (values: any) {
  const { message, success } = await updateUsername(values);
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    userStore.updateUsername(values);
    editName.value = false;
  }
};

const handleUpdateEmail = async function (values: {
  email: string;
  password: string;
}) {
  const { message, success } = await changeEmail(values);
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    email.value = values?.email;
    otp.value = true;
  }
};

const handleUpdatePhone = async function (values: { phone: string }) {
  const { message, success } = await changePhone(values?.phone);
  useAlert({ type: success ? "success" : "error", message });
  if (success) {
    userStore.updatePhone(values?.phone);
    editPhone.value = false;
  }
};

const handleOtpSuccess = async function () {
  userStore.updateUserEmail(email.value);
  useAlert({ type: "success", message: t("emailChangedSuccessfully") });
  otp.value = false;
};

const { compressImage } = usePhoto();

const handleUploadUserImg = async function (file: File) {
  uploading.value = true;
  const compressFile = await compressImage(file);
  const { data, message, success } = await uploadFile(
    FileModelEnum.PROFILE_PICTURE,
    compressFile
  );
  if (!success) return useAlert({ type: "error", message });
  const { message: uploadProfileMsg, success: uploadProfileSuccess } =
    await updateProfilePicture(data);
  if (uploadProfileSuccess) userStore.updateUserProfilePicture(data);
  useAlert({
    type: success ? "success" : "error",
    message: success
      ? t("profilePictureUpdatedSuccessfully")
      : uploadProfileMsg,
  });
  uploading.value = false;
};

const handleFileSelect = async function (e: Event) {
  const input = e.target as HTMLInputElement;
  const filesAsArray = Array.from(input?.files || []);
  const userProfileImg = filesAsArray[0];
  await handleUploadUserImg(filesAsArray[0]);
  input.value = "";
};

const handleDeleteProfilePicture = async function () {
  loading.value = true;
  const { message, success } = await deleteProfilePicture();
  userStore.updateUserProfilePicture(null);
  useAlert({
    type: success ? "success" : "error",
    message: success ? t("profilePictureRemovedSuccessfully") : message,
  });
  loading.value = false;
};
</script>

<style scoped></style>
