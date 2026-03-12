// const sessionId = ref<string | null>(null);
export const useGeidea = function () {
  const cartStore = useCartStore();
  const { sessionId } = storeToRefs(cartStore);

  const onSuccess = function (data: any) {
    console.log(data);
  };
  const onError = function (data: any) {
    console.log(data);
  };
  const onCancel = function (data: any) {
    console.log(data);
  };

  const initializePayment = function (containerId?: string) {
    if (!window.GeideaCheckout) {
      throw new Error("Geidea SDK not loaded");
    }

    if (!sessionId.value) {
      throw new Error("Session ID is not set");
    }

    const payment = new GeideaCheckout(onSuccess, onError, onCancel);
    payment.startPayment(sessionId.value, null, "checkout-tag");
  };

  return { initializePayment };
};
