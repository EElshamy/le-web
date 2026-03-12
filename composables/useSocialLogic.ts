import type { SocialLoginInput } from "@/types/social";

/**
 * Orchestrates the full social login flow (Google / Facebook).
 *
 * Flow summary:
 *  1. handleSocialAuth        → try GqlSocialLogin
 *  2a. success + token        → handleSuccessLogin
 *  2b. action returned        → REGISTER → openCompleteProfile
 *                             → MERGE*   → openCompleteMerge
 *  2c. no provider email      → openCompleteProfile (manual email entry)
 *  2d. has email, no action   → checkSocialStatus (see step 3)
 *
 *  3. submitCompleteData      → called from CompleteProfile modal
 *     → provider email exists → performRegister
 *     → no provider email     → checkSocialStatus
 *        → REGISTER           → openCompleteProfile
 *        → REGISTER_VERIFICATION → performRegister (OTP flow)
 *        → VERIFICATION_MERGE → openVerifyEmail
 *        → error              → alert
 *
 *  4. handleMerge             → called from CompleteMerge modal
 *     → GqlSocialMerge → handleSuccessLogin | alert
 *
 *  5. performRegister         → GqlSocialRegister
 *     → success + token       → handleSuccessLogin
 *     → success, no token     → openVerifyEmail (email verification)
 *     → fail                  → alert
 *
 *  6. OTP success
 *     → VERIFICATION_MERGE    → openCompleteMerge
 *     → has token             → handleSuccessLogin
 *     → else                  → openCompleteMerge
 */

export const useSocialLogic = () => {
  const { t, locale } = useI18n();
  const localePath = useLocalePath();
  const userStore = useUserStore();
  const { previousUrl } = storeToRefs(userStore);
  const { socialLogin, socialRegister, merge, checkSocialStatus } =
    useSocialAuth();

  // ─── UI state ────────────────────────────────────────────────────────────────
  const loading = ref(false);
  const completeProfile = ref(false);
  const completeMerge = ref(false);
  const verifyEmail = ref(false);

  // ─── Shared data across steps ────────────────────────────────────────────────
  const providerName = ref<"google" | "facebook" | "">("");
  const responseValues = ref<SocialLoginInput | null>(null);
  const completeProfileValues = ref<{
    firstName?: string;
    lastName?: string;
    email?: string | null;
  }>({});
  const emailNeededToMerge = ref("");
  const tempToken = ref("");
  const manualEnteredEmail = ref(false);

  // actionStatus drives what happens after OTP success
  const actionStatus = ref<"VERIFICATION_MERGE" | "">("");

  // Persists the profile values so OTP-retry (code 608) can re-register
  const userAfterCompleteProfile = ref<any>(null);

  // Merge action label/icon exposed to CompleteMerge modal
  const actionService = ref<{
    actionName: string;
    action: (v: any) => void;
    icon: string;
  } | null>(null);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const handleSuccessLogin = (user: any) => {
    userStore.setData(user, true);
    completeProfile.value = false;
    completeMerge.value = false;

    const target =
      previousUrl.value && previousUrl.value !== "/login"
        ? previousUrl.value
        : "/";
    navigateTo(localePath(target));
  };

  const openCompleteProfile = (data: {
    firstName?: string;
    lastName?: string;
    email?: string | null;
  }) => {
    completeProfileValues.value = data;
    completeProfile.value = true;
  };

  const openCompleteMerge = (isSameProvider = false) => {
    const providerKey = providerName.value;
    const actionName = isSameProvider ? t("replace") : t("connect");
    actionService.value = {
      actionName,
      icon: providerKey === "google" ? "Google" : "Facebook",
      action: (vals: any) => handleMerge(vals),
    };
    completeMerge.value = true;
  };

  const openVerifyEmail = () => {
    verifyEmail.value = true;
  };

  // ─── Step 1: Entry point ─────────────────────────────────────────────────────

  const handleSocialAuth = async (
    input: any,
    provider: "google" | "facebook",
  ) => {
    loading.value = true;
    providerName.value = provider;

    const pId = input.sub || input.id;
    if (!pId) {
      useAlert({ type: "error", message: t("somethingWentWrong") });
      loading.value = false;
      return;
    }

    const payload: SocialLoginInput = {
      providerId: pId,
      provider: provider.toUpperCase() as any,
      providerAuth: input.token || input.code || input.providerAuth,
      email: input.email,
      firstName: input.given_name || input.first_name,
      lastName: input.family_name || input.last_name,
    };

    responseValues.value = payload;

    const { success, message, user, action } = await socialLogin(payload);

    emailNeededToMerge.value = payload.email ?? "";
    loading.value = false;

    if (action) {
      if (user?.token) tempToken.value = user.token;

      if (action === "REGISTER") {
        openCompleteProfile({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
        });
      } else {
        openCompleteMerge(action === "MERGE_SAME_PROVIDER");
      }
      return;
    }

    if (success && user?.token) {
      handleSuccessLogin(user);
      return;
    }

    // Provider didn't supply an email → ask the user to enter one
    if (!payload.email) {
      manualEnteredEmail.value = true;
      openCompleteProfile({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: null,
      });
    }
  };

  // ─── Step 3: Called from CompleteProfile modal ───────────────────────────────

  const submitCompleteData = async (values: any) => {
    userAfterCompleteProfile.value = values;
    loading.value = true;

    if (!responseValues.value) return;

    // If the provider already gave us an email, go straight to register
    if (responseValues.value.email) {
      await performRegister({ ...values, isManuallyEntered: false });
      return;
    }

    // Otherwise the user typed their email manually → check status first
    emailNeededToMerge.value = values.email;

    const { phone, ...valuesWithoutPhone } = values;

    const statusRes = await checkSocialStatus({
      ...responseValues.value,
      ...valuesWithoutPhone,
      isManuallyEntered: manualEnteredEmail.value,
    });

    if (!statusRes.action) {
      useAlert({
        type: "error",
        message: statusRes.message || t("somethingWentWrong"),
      });
      loading.value = false;
      return;
    }

    if (statusRes.user?.token) tempToken.value = statusRes.user.token;

    switch (statusRes.action) {
      case "REGISTER":
        openCompleteProfile({
          firstName: statusRes.user?.firstName,
          lastName: statusRes.user?.lastName,
          email: emailNeededToMerge.value,
        });
        break;

      case "REGISTER_VERIFICATION":
        await performRegister({
          ...values,
          isManuallyEntered: manualEnteredEmail.value,
          phone: values.phone,
        });
        break;

      case "VERIFICATION_MERGE":
        actionStatus.value = "VERIFICATION_MERGE";
        openVerifyEmail();
        break;

      default:
        if (!statusRes.success) {
          useAlert({ type: "error", message: statusRes.message });
        }
        loading.value = false;
    }
  };

  // ─── Step 4: Called from CompleteMerge modal ─────────────────────────────────

  const handleMerge = async (values: any) => {
    loading.value = true;

    const { success, message, user } = await merge(
      {
        ...responseValues.value,
        ...values,
        email: emailNeededToMerge.value,
      },
      tempToken.value,
    );

    loading.value = false;

    if (success) {
      handleSuccessLogin(user);
    } else {
      useAlert({ type: "error", message });
    }
  };

  // ─── Step 5: Register ─────────────────────────────────────────────────────────

  const performRegister = async (values: any) => {
    const { success, message, user } = await socialRegister({
      ...responseValues.value!,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email || responseValues.value!.email || "",
      isManuallyEntered: manualEnteredEmail.value,
      phone: values.phone,
    });

    loading.value = false;

    if (success && user?.token) {
      handleSuccessLogin(user);
    } else if (success) {
      openVerifyEmail();
    } else {
      useAlert({ type: "error", message });
    }
  };

  return {
    // state
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
    // methods
    handleSocialAuth,
    submitCompleteData,
    handleSuccessLogin,
    performRegister,
    checkSocialStatus,
    handleMerge,
  };
};
