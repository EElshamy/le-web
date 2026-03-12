import { LangEnum } from "#gql/default";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useDownloadInvoice = function () {
  const { t, locale } = useI18n();
  const downloadInvoice = async function (transactionId: string) {
    const { data: download } = await useAsyncData(
      `downloadInvoice-${Math.random() * 100}`,
      () =>
        GqlDownloadInvoice({
          input: {
            transactionId,
            lang: locale.value === "en" ? LangEnum.EN : LangEnum.AR,
          },
        })
    );
    const { data, message, success } = download?.value
      ?.downloadInvoice as response;
    return { data, message, success };
  };

  return { downloadInvoice };
};
