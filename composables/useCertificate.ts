import type { CreateCertificationInput } from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useCertificate = function () {
  const generateCertificate = async function (input: CreateCertificationInput) {
    const { data } = await useAsyncData(
      `generateCertificate-${input?.learningProgramId}`,
      () => GqlCreateCertification({ input })
    );
    const { message, success } = data?.value?.createCertification as response;
    return { message, success };
  };

  // TODO: Refactor this function to support load more functionality
  const getCertificates = async function () {
    const { data: certificates } = await useAsyncData("getCertificates", () =>
      GqlMyCertifications()
    );
    const { data, message, success } = certificates.value
      ?.myCertifications as response;
    return { data, message, success };
  };

  const getCertificateById = async function (certificateId: string) {
    const { data: certificate } = await useAsyncData(`certificate-${certificateId}`, () =>
      GqlCertification({ certificateId })
    );
    const { data, message, success } = certificate?.value
      ?.certification as response;
    return { data, message, success };
  };

  return { generateCertificate, getCertificates, getCertificateById };
};
