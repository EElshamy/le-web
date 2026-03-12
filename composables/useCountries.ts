interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useCountries = function () {
  const getCountries = async function () {
    const { data: jobTitles } = await useAsyncData(
      "countries",
      () => GqlCountries(),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );
    const { data, message, success } = jobTitles.value?.countries as response;
    return { data, message, success };
  };
  return { getCountries };
};
