import type { CreateCommentInput } from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useDiscussion = function () {
  const { t, locale } = useI18n();

  const addLike = async function (commentId: string) {
    try {
      const { data } = await useAsyncData(`like-${Math.random() * 100}`, () =>
        GqlToggleLikeComment({ commentId })
      );
      const { message, success } = data?.value?.toggleLikeComment as response;
      return { message, success };
    } catch (e: any) {
      return { message: t("somethingWentWrong"), success: false };
    }
  };

  const addComment = async function (input: CreateCommentInput) {
    try {
      const { data } = await useAsyncData(
        `createComment-${Math.random() * 100}`,
        () => GqlCreateComment({ input })
      );
      const { message, success } = data?.value?.createComment as response;
      return { message, success };
    } catch (e: any) {
      return { message: t("somethingWentWrong"), success: false };
    }
  };

  const deleteComment = async function (commentId: string) {
    try {
      const { data } = await useAsyncData(
        `deleteComment-${Math.random() * 100}`,
        () => GqlDeleteComment({ commentId })
      );
      const { message, success } = data?.value?.deleteComment as response;
      return { message, success };
    } catch (e: any) {
      return { message: t("somethingWentWrong"), success: false };
    }
  };

  return { addLike, addComment, deleteComment };
};
