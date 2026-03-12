interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useJobTitle = function () {
  const getActiveJobTitle = async function () {
    const { data: jobTitles } = await useAsyncData(
      "jobTitles",
      () => GqlActiveJobTitles(),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );
    const { data, message, success } = jobTitles.value
      ?.activeJobTitles as response;
    return { data, message, success };
  };
  return { getActiveJobTitle };
};
