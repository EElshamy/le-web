import { FileModelEnum, type FileToMakePublic } from "#gql/default";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useUpload = function () {
  const config = useRuntimeConfig();
  const { t, locale } = useI18n();

  const fetchImage = async function (uri: string, file: File) {
    try {
      const res = await $fetch(uri, {
        method: "PUT",
        body: file,
      });
      return uri?.split("?")[0].split(config.public.BUCKET_URL)[1];
    } catch {
      throw new Error(t("somethingWentWrong"));
    }
  };

  const makeFilPublicAfterUpload = async function (input: FileToMakePublic[]) {
    try {
      const { data } = await useAsyncData(
        `makeFilePublic-${Math.random() * 10}`,
        () => GqlMakeFilesPublicAfterUpload({ input })
      );
      const { message, success } = data?.value
        ?.makeFilesPublicAfterUpload as response;
      return { message, success };
    } catch {
      throw new Error(t("somethingWentWrong"));
    }
  };

  const uploadFile = async function (
    model: FileModelEnum,
    file: File
  ): Promise<response> {
    const extension = file.name.slice(file.name.lastIndexOf("."));
    const fileName = file?.name || `leiaqa-${new Date().getTime()}${extension}`;
    const renamedFile = new File([file], fileName, { type: file?.type });
    try {
      const { data: upload } = await useAsyncData(
        `uploadFile-${Math.random() * 100}`,
        () =>
          GqlGenerateUploadLink({
            input: {
              model,
              fileName: fileName.replaceAll(" ", ""),
              sizeInBytes: file?.size,
              contentType: file?.type,
            },
          })
      );
      const {
        data,
        message = t("operationDoneSuccessfully"),
        success,
      } = upload?.value?.generateUploadLink as response;
      const uri = await fetchImage(data, renamedFile);
      await makeFilPublicAfterUpload([{ model, fileName: uri?.split("/")[1] }]);
      return { data: uri, message, success };
    } catch {
      return { success: false, message: t("failedToUploadImage") };
    }
  };

  return { uploadFile };
};
