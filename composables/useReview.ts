import type { AddReviewInput } from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useReview = function () {
  const { t, locale } = useI18n();

  const addReview = async function (input: AddReviewInput) {
    try {
      const { data: review } = await useAsyncData(
        `addReview-${Math.random() * 100}`,
        () => GqlAddReview({ input })
      );
      const { data, message, success } = review?.value?.addReview as response;
      return { data, message, success };
    } catch (e: any) {
      return { message: t("somethingWentWrong"), success: false };
    }
  };

  const deleteReview = async function (reviewId: string) {
    try {
      const { data } = await useAsyncData(
        `deleteReview-${Math.random() * 100}`,
        () => GqlDeleteReview({ reviewId })
      );
      const { message, success } = data?.value?.deleteReview as response;
      return { message, success };
    } catch (e: any) {
      return { message: t("somethingWentWrong"), success: false };
    }
  };

  return { addReview, deleteReview };
};
