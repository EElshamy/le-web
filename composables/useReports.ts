import type { AddReportInput } from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useReports = function () {
  const addReport = async function (input: AddReportInput) {
    const { data } = await useAsyncData(
      `addReport-${Math.random() * 100}`,
      () => GqlAddReport({ input }),
    );
    const { message, success } = data?.value?.addReport as response;
    return { message, success };
  };

  return { addReport };
};
