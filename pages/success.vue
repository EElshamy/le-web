<template lang="pug">
    .app-container(class="pt-[104px] pb-[300px]")
        .flex.justify-center
            PaymentStatus(:status :isMultiple :purchasesProgramId :purchasedProgramType)
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const transactionCode = route.query.code as string;
const { pushDataLayer } = useGtmDataLayer();

onMounted(() => {
  pushDataLayer(
    "purchase",
    data?.value?.purchaseForAdmin?.transactionPurchaseItems?.map(
      (item: any) => ({
        ...item,
        id: item?.learningProgramId,
        programs: item?.diplomaPrograms,
        coupon: data?.value?.purchaseForAdmin?.coupon?.code,
        totalPrice: data?.value?.totalAmount,
        subTotalPrice:
          (data?.value?.purchaseForAdmin?.subTotalPrice as number) / 100,
        ...(item?.type === "DIPLOMA"
          ? {
              lecturers: item?.lecturersShares?.map((lecturer: any) => ({
                enFullName: lecturer?.lecturerEnName,
                arFullName: lecturer?.lecturerArName,
              })),
            }
          : {
              users: item?.lecturersShares?.map((lecturer: any) => ({
                enFullName: lecturer?.lecturerEnName,
                arFullName: lecturer?.lecturerArName,
              })),
            }),
        ...(item?.type === "DIPLOMA"
          ? undefined
          : { courseDetail: { lessonsCount: item?.lessonsCount } }),
      })
    ) as any
  );
});

const status = computed(() => {
  if (data?.value?.status === "SUCCESS") return "success";
  return "fail";
});

const { data } = await useAsyncData(
  `getTransaction-${transactionCode}`,
  () => GqlGetTransactionByCode({ code: transactionCode }),
  { transform: (data) => data?.getTransactionByCode?.data }
);

console.log("data outside mount ->", data.value);

const isMultiple = computed(
  () =>
    (data?.value?.purchaseForAdmin?.transactionPurchaseItems
      ?.length as number) > 1
);

const purchasesProgramId = computed(() => {
  return data?.value?.purchaseForAdmin?.transactionPurchaseItems?.[0]
    ?.learningProgramId;
});

const purchasedProgramType = computed(() => {
  return data?.value?.purchaseForAdmin?.transactionPurchaseItems?.[0]?.type;
});
</script>

<style scoped></style>
