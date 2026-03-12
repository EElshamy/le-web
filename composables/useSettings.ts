import type {
  UpdateUserProfileInput,
  ChangePasswordInput,
  UpdateEmailInput,
} from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}
export const useSettings = function () {
  const { t, locale } = useI18n();
  // useGqlHeaders({ lang: `Eg-${locale.value}` });

  const updateUsername = async function (input: UpdateUserProfileInput) {
    const { data } = await useAsyncData(
      `updateUserProfile-${Math.random() * 100}`,
      () => GqlUpdateUserProfile({ input })
    );
    const { message, success } = data?.value?.updateUserProfile as response;
    return { message, success };
  };

  const changePassword = async function (input: ChangePasswordInput) {
    const { data } = await useAsyncData(
      `changePassword-${Math.random() * 100}`,
      () => GqlChangePassword({ input })
    );
    const { message, success } = data?.value?.changePassword as response;
    return { message, success };
  };

  const changeEmail = async function (input: UpdateEmailInput) {
    const { data: changeEmail } = await useAsyncData(
      `changeEmail-${input?.email}-${input?.password}`,
      () => GqlChangeEmail({ input })
    );
    const { message, success } = changeEmail?.value?.changeEmail as response;
    return { message, success };
  };

  const updateProfilePicture = async function (profilePicture: string) {
    const { data } = await useAsyncData(
      `upload-profile-img-${profilePicture}`,
      () => GqlUpdateProfilePicture({ input: { profilePicture } })
    );
    const { message, success } = data?.value?.updateProfilePicture as response;
    return { message, success };
  };

  const deleteProfilePicture = async function () {
    const { data } = await useAsyncData("deleteProfilePicture", () =>
      GqlDeleteProfilePicture()
    );
    const { message, success } = data?.value?.deleteProfilePicture as response;
    return { message, success };
  };

  const changePhone = async function (phone: string) {
    const { data } = await useAsyncData(`changePhone-${phone}`, () =>
      GqlUpdatePhone({ input: { phone } })
    );
    const { message, success } = (await data?.value?.updatePhone) as response;
    return { message, success };
  };

  return {
    updateUsername,
    changePassword,
    changeEmail,
    updateProfilePicture,
    deleteProfilePicture,
    changePhone,
  };
};
