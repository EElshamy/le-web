interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useFieldOfTraining = function () {
  const getActiveFieldsOfTraining = async function () {
    const { data: fieldsOfTraining } = await useAsyncData(
      "fieldsOfTraining",
      () => GqlActiveFieldOfTrainings(),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      }
    );
    const { data, message, success } = fieldsOfTraining.value
      ?.activeFieldOfTrainings as response;
    return { data, message, success };
  };
  return { getActiveFieldsOfTraining };
};
