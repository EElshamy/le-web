interface response {
  data?: any;
  message: string;
  success: boolean;
}

const invoice = ref();

export const useInvoice = async function () {
  const route = useRoute();
  const id = route.params.id as string;

  const { data: invoiceDetails } = await useAsyncData("getInvoice", () =>
    GqlGetInvoiceByTransactionId({ id })
  );

  const { data, message, success } = invoiceDetails?.value
    ?.getInvoiceByTransactionId as response;

  invoice.value = data;

  return { invoice };
};
