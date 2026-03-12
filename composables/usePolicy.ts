interface response {
  data?: any;
  message: string;
  success: boolean;
}

const policy = ref();

export const usePolicy = async function () {
  const { data: policies } = await useAsyncData("getPolicy", () =>
    GqlGetPolicies()
  );

  const { data, message, success } = policies?.value?.getPolicies as response;

  policy.value = data;

  return { policy };
};
