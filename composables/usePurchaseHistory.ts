interface response {
  data?: any;
  message: string;
  success: boolean;
}

const purchaseHistory = ref();

export const usePurchaseHistory = async function () {
  const getPurchaseHistory = async function () {
    const { data: purchaseItems } = await useAsyncData(
      "getPurchaseHistory",
      () => GqlGetMyTransactionsForUser()
    );
    const { data, message, success } = purchaseItems?.value
      ?.getMyTransactionsForUser as response;
    if (success) {
      purchaseHistory.value = data?.items;
    }
    return { data, message, success };
  };

  await getPurchaseHistory();

  return { purchaseHistory, getPurchaseHistory };
};
