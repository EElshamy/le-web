export const useSocialAuthLogin = function () {
  // const { t, locale } = useI18n();
  // const localePath = useLocalePath();
  // const responseValues = ref();
  // const { socialLogin, checkSocialStatus, socialRegister, merge } =
  //   useSocialAuth();
  // const { isOnline } = useNetwork();
  // const auth = useUserStore();
  // const loading = ref<boolean>(false);
  // const completeProfile = ref<boolean>(false);
  // const completeMerge = ref<boolean>(false);
  // const completeProfileValues = ref();
  // const actionService = ref();
  // const { getSession } = useAuth();
  // const userStore = useUserStore();
  // const { previousUrl } = storeToRefs(userStore);
  // const actionHelper = reactive({
  //   MERGE: {
  //     google: {
  //       // message: t("googleMerge"),
  //       actionName: t("connect"),
  //       action: (values: any) => {
  //         handleMerge(values);
  //       },
  //       icon: "Google",
  //     },
  //     facebook: {
  //       // message: t("facebookMerge"),
  //       actionName: t("connect"),
  //       action: (values: any) => {
  //         handleMerge(values);
  //       },
  //       icon: "Facebook",
  //     },
  //   },
  //   MERGE_SAME_PROVIDER: {
  //     google: {
  //       // message: t("googleMergeSameProvider"),
  //       actionName: t("replace"),
  //       action: (values: any) => {
  //         handleMerge(values);
  //       },
  //       icon: "Google",
  //     },
  //     facebook: t("facebookMergeSameProvider"),
  //   },
  //   REGISTER: {
  //     google: {
  //       // message: t("completeYourData"),
  //       actionName: t("save"),
  //       action: (values: any) => {
  //         submitCompleteData(values);
  //       },
  //       icon: "Google",
  //     },
  //     facebook: {
  //       // message: t("completeYourData"),
  //       actionName: t("save"),
  //       action: (values: any) => {
  //         submitCompleteData(values);
  //       },
  //       icon: "Facebook",
  //     },
  //   },
  // });

  // //   const emit = defineEmits(["loading"]);

  // const register = async function (values: any) {
  //   const { success, message, user, action } = await socialRegister({
  //     ...responseValues.value,
  //     firstName: values.firstName,
  //     lastName: values.lastName,
  //     email: responseValues.value.email
  //       ? responseValues.value.email
  //       : values.email,
  //     isManuallyEntered: values.isManuallyEntered,
  //   });
  //   if (success) {
  //     if (responseValues.value.email) {
  //       auth.setData(user, locale.value);
  //       completeProfile.value = false;
  //       navigateTo(localePath(previousUrl.value));
  //     } else {
  //       //   showRegisterpopup.value = false;
  //       //   successMessage.value = t("codeSentSuccessfully");
  //       //   setTimeout(() => {
  //       // console.log("redirectedUrl", auth.redirectRoute, values.email);
  //       // router.push(localePath("/auth/otp"));
  //       // navigateTo({
  //       //   path: localePath("/auth/otp"),
  //       //   query: {
  //       // email: values.email,
  //       // action: "SOCIAL_EMAIL_VERIFICATION",
  //       // redirectedUrl: btoa(auth.redirectRoute),
  //       //   },
  //       // });
  //       //   }, 1500);
  //     }
  //   } else {
  //     useAlert({ type: "error", message: message as string });
  //     loading.value = false;
  //   }
  // };

  // const handleMerge = async function (values: any) {
  //   loading.value = true;
  //   const { success, message, user } = await merge(values);
  //   if (success) {
  //     completeMerge.value = false;
  //     auth.setData(user, locale.value);
  //     navigateTo(localePath(previousUrl.value));
  //     loading.value = false;
  //   } else {
  //     completeMerge.value = false;
  //     useAlert({ type: "error", message: message as string });
  //     loading.value = false;
  //   }
  // };

  // const submitCompleteData = async function (values: any) {
  //   loading.value = true;

  //   if (responseValues.value.email) {
  //     await register({ ...values, isManuallyEntered: false });
  //   } else {
  //     const { success, message, user, action } = await checkSocialStatus({
  //       ...responseValues.value,
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       email: values.email,
  //       isManuallyEntered: true,
  //     });
  //     if (success) {
  //       if (user) {
  //         auth.setData(user, locale.value);
  //         navigateTo(localePath(previousUrl.value));
  //         loading.value = false;
  //       }

  //       actionService.value =
  //         actionHelper[action][responseValues.value.provider.toLowerCase()];
  //       if (action?.includes("REGISTER")) {
  //         await register({ ...values, isManuallyEntered: true });
  //       } else if (
  //         action === "VERIFICATION_MERGE" ||
  //         action === "VERIFICATION_MERGE_SAME_PROVIDER"
  //       ) {
  //         // showRegisterpopup.value = false;
  //         // showSuccess.value = true;
  //         // successMessage.value = t("codeSentSuccessfully");
  //         // setTimeout(() => {
  //         //   router.push({
  //         // path: localePath("/auth/otp"),
  //         // query: {
  //         //   email: values.email,
  //         //   action: "SOCIAL_EMAIL_VERIFICATION",
  //         //   redirectedUrl: btoa(auth.redirectRoute),
  //         //   mergeAction: action,
  //         //   provider: responseValues.value.provider.toLowerCase(),
  //         //   mergeData: new URLSearchParams(responseValues.value).toString(),
  //         // },
  //         //   });
  //         // }, 1500);
  //       } else {
  //         completeMerge.value = true;
  //       }
  //     } else {
  //       useAlert({ type: "error", message: message as string });
  //       loading.value = false;
  //     }
  //   }
  // };

  // const handleSocialAuth = async function (
  //   input: any,
  //   provider: "google" | "apple" | "facebook"
  // ) {
  //   const {
  //     given_name: firstName,
  //     family_name: lastName,
  //     email,
  //     sub,
  //     token,
  //   } = input;
  //   // const { access_token, email, name, provider, providerAccountId, id_token } =
  //   //   input.value?.user;

  //   // const [firstName, lastName] = name.split(" ");

  //   responseValues.value = {
  //     providerId: sub,
  //     provider: provider?.toUpperCase(),
  //     // token: id_token,
  //     providerAuth: token,
  //     email,
  //     firstName,
  //     lastName,
  //   };

  //   const { success, message, user, action } = await socialLogin(
  //     responseValues.value
  //   );

  //   if (action) {
  //     if (user) {
  //       auth.setData(user, locale.value);
  //       // navigateTo(localePath("/"));
  //     }
  //     actionService.value =
  //       actionHelper[action][responseValues.value.provider.toLowerCase()];
  //     if (action === "REGISTER") {
  //       completeProfileValues.value = {
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //       };
  //       completeProfile.value = true;
  //       loading.value = false;
  //     } else {
  //       completeMerge.value = true;
  //       loading.value = false;
  //     }
  //   } else {
  //     if (responseValues.value.email) {
  //       if (success) {
  //         auth.setData(user, locale.value);
  //         navigateTo(localePath(previousUrl.value));
  //         loading.value = false;
  //       } else {
  //         useAlert({ type: "error", message: message as string });
  //         loading.value = false;
  //       }
  //     } else {
  //       completeProfile.value = true;
  //       completeProfileValues.value = {
  //         firstName: firstName,
  //         lastName: lastName,
  //       };
  //       loading.value = false;
  //     }
  //   }
  //   // emit("loading", false);
  // };

  // return {
  //   handleSocialAuth,
  //   register,
  //   submitCompleteData,
  //   handleMerge,
  //   completeMerge,
  //   completeProfile,
  //   completeProfileValues,
  //   loading,
  //   actionService,
  //   responseValues,
  // };
};
