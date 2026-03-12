<template lang="pug">
.grid(class="grid-cols-1 md:grid-cols-3 gap-3")

  //- Google
  button.relative.flex.items-center.justify-center.gap-2.border-1.border-black.col-span-3.overflow-hidden(
    type="button"
    @click="triggerGoogleLogin"
    class="py-[10px] px-[16px] rounded-3 cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out disabled:cursor-not-allowed"
    :disabled="loading && providerName === 'google'"
  )
    IconGoogle
    span {{ t('signInWithGoogle') }}
    .absolute.w-full.h-full.bg-primary-50.flex.items-center.justify-center.opacity-80(v-if="loading && providerName === 'google'")
      IconLoading

  //- Facebook
  button.relative.flex.items-center.justify-center.gap-2.border-1.border-black.col-span-3.overflow-hidden(
    type="button"
    @click="triggerFacebookLogin"
    class="py-[10px] px-[16px] rounded-3 cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out disabled:cursor-not-allowed"
    :disabled="loading && providerName === 'facebook'"
  )
    IconFacebookAuth
    span {{ t('signInWithFacebook') }}
    .absolute.w-full.h-full.bg-primary-50.flex.items-center.justify-center.opacity-80(v-if="loading && providerName === 'facebook'")
      IconLoading

  //- Complete Profile modal (REGISTER flow or missing email)
  AuthCompleteProfile(
    v-if="completeProfile"
    v-model="completeProfile"
    :data="completeProfileValues"
    :loading="loading"
    @submit="submitCompleteData"
  )

  //- Merge modal (MERGE / MERGE_SAME_PROVIDER flow)
  AuthCompleteMerge(
    v-if="completeMerge"
    v-model="completeMerge"
    :icon="actionService?.icon"
    :email="otpEmail"
    @link="handleMerge"
  )

  //- OTP / Email-verification modal
  AppModal(
    v-model="verifyEmail"
    :showActions="false"
    :showClose="true"
    title=""
    customStyle="md:min-w-[400px] p-6"
    :blockCloseOnUnFocus="true"
  )
    AuthOtp(
      v-if="verifyEmail"
      :email="otpEmail"
      :expiryTimestamp="otpExpiryTime"
      :useCase="UserVerificationCodeUseCaseEnum.SOCIAL_EMAIL_VERIFICATION"
      @success="handleOtpSuccess"
      @update-expiry="otpExpiryTime = $event"
      @failed="handleOtpFailure"
    )
</template>

<script setup lang="ts">
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { UserVerificationCodeUseCaseEnum } from "#gql/default";

const { t } = useI18n();
const { isOnline } = useNetwork();
const { $initGooglePopup, $fbAuth } = useNuxtApp();

const {
  loading,
  completeProfile,
  completeMerge,
  verifyEmail,
  providerName,
  actionService,
  responseValues,
  completeProfileValues,
  emailNeededToMerge,
  actionStatus,
  userAfterCompleteProfile,
  handleSocialAuth,
  submitCompleteData,
  handleSuccessLogin,
  performRegister,
  handleMerge,
} = useSocialLogic();

// Derived: single source of truth for the email shown in OTP / merge modals
const otpEmail = computed(
  () => emailNeededToMerge.value || responseValues.value?.email || "",
);

const otpExpiryTime = ref<number | null>(null);

// ─── Google ──────────────────────────────────────────────────────────────────

const triggerGoogleLogin = async () => {
  if (!isOnline.value) {
    useAlert({ type: "error", message: t("noInternetConnection") });
    return;
  }

  const client = await $initGooglePopup(async (response: any) => {
    const user = await useGoogleUser(response.code);
    if (!user) {
      useAlert({ type: "error", message: t("somethingWentWrong") });
      return;
    }
    await handleSocialAuth({ ...user, code: response.code }, "google");
  });

  client?.requestCode();
};

// ─── Facebook ────────────────────────────────────────────────────────────────

const triggerFacebookLogin = async () => {
  if (!isOnline.value) {
    useAlert({ type: "error", message: t("noInternetConnection") });
    return;
  }

  loading.value = true;

  try {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    provider.addScope("public_profile");

    const result = await signInWithPopup($fbAuth, provider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const nameParts = result.user.displayName?.split(" ") ?? ["", ""];

    await handleSocialAuth(
      {
        id: result.user.providerData[0].uid,
        email: result.user.email,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(" "),
        token: credential?.accessToken,
        providerAuth: await result.user.getIdToken(),
      },
      "facebook",
    );
  } catch (error: any) {
    if (error.code === "auth/operation-not-supported-in-this-environment") {
      useAlert({ type: "error", message: t("httpsRequired") });
    } else if (error.code !== "auth/popup-closed-by-user") {
      useAlert({ type: "error", message: error.message });
    }
  } finally {
    loading.value = false;
  }
};

// ─── OTP callbacks ───────────────────────────────────────────────────────────

const handleOtpSuccess = async (payload: any) => {
  verifyEmail.value = false;
  useAlert({ type: "success", message: t("verifiedSuccessfully") });

  if (actionStatus.value === "VERIFICATION_MERGE") {
    // User verified email before merging → open the merge confirmation
    completeMerge.value = true;
    return;
  }

  if (payload?.token) {
    useGqlToken(payload.token);
    const res = await GqlMe();
    handleSuccessLogin(res.me.data);
    return;
  }

  completeMerge.value = true;
};

const handleOtpFailure = async (res: any) => {
  verifyEmail.value = false;
  loading.value = false;
  useAlert({ type: "error", message: res?.message || t("somethingWentWrong") });

  // Code 608 = OTP expired → re-register to get a fresh code
  if (res?.code === 608) {
    await performRegister(userAfterCompleteProfile.value);
  }
};

const handleMergeLink = () => actionService.value?.action({});
</script>
