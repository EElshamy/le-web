import type { CreateContactMessageInput } from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}
export const useContact = function () {
  const contactUs = async function (input: CreateContactMessageInput) {
    const { data: contact } = await useAsyncData(
      `contactUs-${Math.random() * 100}`,
      () => GqlSendContactMessage({ input })
    );
    const { message, success } = contact.value?.sendContactMessage as response;

    return { message, success };
  };

  return { contactUs };
};
