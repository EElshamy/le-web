<template lang="pug">
    .app-container
        .flex(class="justify-center justify-start" :class="{ 'justify-center': cartItems?.length }")
            div
                h1(class="pt-[24px] lg:pt-[64px] pb-[40px] heading-6 lg:heading-3") {{ t('shoppingCart') }}

                .flex.items-start(class="pb-[104px] gap-11 flex-col xl:flex-row")
                    div(v-if="!cartItems.length")
                        CartEmpty

                    .flex.flex-col.gap-8(v-if="cartItems?.length" class="w-full")
                        h2.heading-6 {{ cartItems?.length }} {{ t('itemsInCart') }}
                        .flex.flex-col.gap-7
                            template(v-for="item in cartItems" :key="item.id")
                              .flex.flex-col.gap-2.border-b(class="pb-5 gap-3")
                                .flex.items-start.gap-7(class="w-full cursor-pointer")
                                    NuxtLink(:to="localePath(item?.learningProgramType === 'DIPLOMA' ? `/paths/${item?.learningProgram?.slug}` : `/program/${item?.learningProgram?.slug}`)")
                                        div(class="rounded-[12px] overflow-hidden w-[120px] md:w-[164px] hover:scale-101 transition duration-300 ease-in-out aspect-3/2")
                                            NuxtImg(:src="getImageUrl(item?.learningProgram?.thumbnail)" :alt="locale === 'en' ? item?.learningProgram?.enTitle : item?.learningProgram?.arTitle" format="webp" class="w-full h-full object-cover")
                                    .flex.flex-col.gap-3(class="mt-1 w-full lg:w-[600px]")
                                        NuxtLink(:to="localePath(item?.learningProgramType === 'DIPLOMA' ? `/paths/${item?.learningProgram?.slug}` : `/program/${item?.learningProgram?.slug}`)" class="label-prominent-3 lg:label-prominent-1 hover:text-primary lg:truncate") {{ locale === 'en' ? item?.learningProgram?.enTitle : item?.learningProgram?.arTitle }}
                                        .flex.items-center.text-neutral-700(class="gap-[8px] label-4 lg:label-2" v-show="false")
                                            p {{ $t(item?.learningProgramType?.toLowerCase() || '') }}
                                            div(class="size-[2px] rounded-full bg-[#5D5A57]")
                                            p {{ item?.level || t('intermediate') }}
                                            div(class="size-[2px] rounded-full bg-[#5D5A57]")
                                            p {{ item?.learningProgram?.learningTime }} {{ t('hour') }}
                                        .flex.justify-between.mt-2
                                            p.text-primary(class="label-prominent-2 lg:label-prominent-1") {{ formatCurrency(item?.adjustedPrice || calcProgramPrice(item?.learningProgram?.priceAfterDiscount, item?.learningProgram?.originalPrice)) }}
                                            button.mx-2(@click.stop="handleRemoveCartItem(item, item?.id, item?.learningProgram?.slug, item?.learningProgramType)" class="hover:text-primary text-[#5D5A57]"): IconTrash

                                .flex.items-center.gap-2(class="text-danger-500 label-3 lg:label-prominent-3" v-if="item?.enAlert?.text && item?.arAlert?.text")
                                  IconAlert(class="shrink-0")
                                  p {{ locale === 'en' ? item?.enAlert?.text : item?.arAlert?.text }}
                                .flex.items-center.gap-2(class="text-warning-500 label-3 lg:label-prominent-3" v-if="item?.arPriceMessage && item?.enPriceMessage")
                                  IconAlert(class="shrink-0 text-warning-500")
                                  p {{ locale === 'en' ? item?.enPriceMessage : item?.arPriceMessage }}

                    .flex.flex-col.gap-7(class="w-full" v-if="cartItems?.length")
                        h2.heading-6 {{ t('paymentDetails') }}
                        .flex.flex-col.gap-7(class="border-[#DEDAD6] border-[#DEDAD6] bg-[#F8F5F3] p-[24px] rounded-[12px] w-full xl:w-[400px]")
                            Form(:validation-schema="schema" @submit="handleApplyCoupon")
                              template(#default="{ values, setFieldValue }")
                                .promo-input.col-span-3
                                    InputCustomText(name="couponCode" :value="coupon" :label="t('doYouHaveADiscountCoupon')" :disabled="couponLoading || discountAmount" :placeholder="t('enterCode')")
                                        template(#prefix)
                                            IconCoupon
                                        template(#actions)
                                          button.w-full.btn-primary.label-prominent-3.w-full(class="h-[46px] rounded-[8px]" v-if="!discountAmount") {{ t('apply') }}
                                          button.btn-primary.label-prominent-3.col-span-1(class="h-[46px] rounded-[8px]" type="button" @click="handleRemoveCoupon(), setFieldValue('couponCode', null)" v-else): IconClose(class="text-white")
                                    p(class="text-[12px] m-0 text-red-700 mt-1" v-if="couponErr") {{ couponErr }}
                                //- button.btn-primary.label-prominent-3.col-span-1(class="h-[46px] rounded-[8px]" v-if="!discountAmount") {{ t('apply') }}
                                //- button.btn-primary.label-prominent-3.col-span-1(class="h-[46px] rounded-[8px]" type="button" @click="handleRemoveCoupon(), setFieldValue('couponCode', null)" v-else): IconClose(class="text-white")

                            .flex.flex-col.gap-4(class="border-b pb-5")
                                .flex.items-center.justify-between
                                    p.label-2 {{ t('totalAmount') }}
                                    p.label-prominent-2 {{ formatCurrency(netPrice) }}
                                .flex.items-center.justify-between
                                    p.label-2 {{ t('vat')}}
                                      span.mx-1(v-if="vat") {{ vat }}%
                                    p.label-prominent-2 {{ formatCurrency(vatAmount) }}
                                .flex.items-center.justify-between(v-if="discountAmount")
                                    p.label-2 {{ t('discount') }}
                                    p.label-prominent-2.text-success-600 -{{ formatCurrency(discountAmount) }}
                            .flex.items-center.justify-between
                                p {{ t('total') }}
                                p {{ formatCurrency(priceAfterDiscount) }}

                            button.btn-primary.label-prominent-3(@click="handleCheckout" :disabled="checkoutLoading || !checkoutAvailable") {{ t('completePayment') }}
                            span(class="text-center block text-[14px] text-[#3A3938] font-light") {{ t('moneyBackGuarantee') }}
                        p.text-center.label-3 {{ t('forAssistant') }} - #[NuxtLink(to="https://wa.me/201050580075" target="_blank" class="underline") 01050580075]
    //- div(v-if="sessionId")
            GeideaPayment

</template>

<script setup lang="ts">
import * as yup from "yup";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formatCurrency } = useFormatter();
const { getImageUrl } = usePhoto();
const { setIdAndNavigation, navigationUrl } = await useRouteCustomSlug();
const { slugify } = useSeo();
const cartStore = useCartStore();
const {
  cartCount,
  cartItems,
  coupon,
  loading,
  discountAmount,
  priceAfterDiscount,
  sessionId,
  total,
  vat,
  vatAmount,
  checkoutAvailable,
  netPrice,
} = storeToRefs(cartStore);
const checkoutLoading = ref<boolean>(false);
const couponLoading = ref<boolean>(false);
const { userAgent } = useDevice();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { pushDataLayer } = useGtmDataLayer();
const couponErr = ref<string>("");

await cartStore.getCart();

// onBeforeMount(async () => {
//   await cartStore.getCart();
// });

onMounted(() => {
  pushDataLayer(
    "view_cart",
    cartItems.value.map((item: any) => ({
      ...item?.learningProgram,
      programs: item?.programs,
      type: item?.learningProgramType,
      language: item?.language,
      category: item?.category,
      coupon: coupon.value,
      ...(item?.learningProgramType === "DIPLOMA"
        ? { lecturers: item?.instructors }
        : { users: item?.instructors }),
      ...(item?.learningProgramType === "DIPLOMA"
        ? null
        : { courseDetail: { lessonsCount: item?.lessonsCount } }),
    })),
  );
});

const schema = yup.object({
  // couponCode: yup.string().required().label(t("discountCoupon")),
});

const calcProgramPrice = function (
  discountPrice: number | string,
  ogPrice: number | string,
): number {
  if (discountPrice !== null) return Number(discountPrice);
  return Number(ogPrice);
};

const handleRemoveCartItem = async function (
  item: any,
  cartItemId: string,
  slug?: string,
  type?: string,
) {
  console.log(item);
  const nuxtApp = useNuxtApp();
  const { message, success } = await cartStore.removeCartItem(item?.id);

  // TODO: rather then sending a request , just splice this item from the array
  if (success) {
    pushDataLayer(
      "remove_from_cart",
      item?.learningProgramType === "DIPLOMA"
        ? item?.programs
        : [
            {
              ...item?.learningProgram,
              programs: item?.programs,
              type: item?.learningProgramType,
              language: item?.language,
              category: item?.category,
              ...(item?.learningProgramType === "DIPLOMA"
                ? { lecturers: item?.instructors }
                : { users: item?.instructors }),
              ...(item?.learningProgramType === "DIPLOMA"
                ? null
                : { courseDetail: { lessonsCount: item?.lessonsCount } }),
            },
          ],
      item?.learningProgramType === "DIPLOMA"
        ? {
            ...item?.learningProgram,
            programs: item?.programs,
            type: item?.learningProgramType,
            language: item?.language,
            category: item?.category,
            ...(item?.learningProgramType === "DIPLOMA"
              ? { lecturers: item?.instructors }
              : { users: item?.instructors }),
            ...(item?.learningProgramType === "DIPLOMA"
              ? null
              : { courseDetail: { lessonsCount: item?.lessonsCount } }),
          }
        : null,
    );
    await cartStore.getCart();
  }

  user.value.cartItemsCount = cartCount;

  delete nuxtApp.payload.data[
    item?.learningProgram?.type === "DIPLOMA"
      ? `getTrack-${item?.learningProgram?.slug}`
      : `getProgram-${item?.learningProgram?.slug}`
  ]; // clear cached data so add to cart actions is returned back.
};

const handleCheckout = async function () {
  checkoutLoading.value = true;
  const { success } = await cartStore.checkout();
  pushDataLayer(
    "begin_checkout",
    cartItems.value.map((item: any) => ({
      ...item?.learningProgram,
      programs: item?.programs,
      type: item?.learningProgramType,
      language: item?.language,
      category: item?.category,
      coupon: coupon.value,
      ...(item?.learningProgramType === "DIPLOMA"
        ? { lecturers: item?.instructors }
        : { users: item?.instructors }),
      ...(item?.learningProgramType === "DIPLOMA"
        ? null
        : { courseDetail: { lessonsCount: item?.lessonsCount } }),
    })),
  );
  if (success) coupon.value = "";
  checkoutLoading.value = false;
};

const handleApplyCoupon = async function (value: { couponCode: string }) {
  couponErr.value = "";
  if (!value?.couponCode)
    return (couponErr.value = t("pleaseEnterACouponCode"));
  const { message, success } = await cartStore.applyCoupon(value?.couponCode);
  if (!success) return (couponErr.value = message);
  return useAlert({ type: "success", message: t("couponAppliedSuccessfully") });
};

const handleRemoveCoupon = async function () {
  const { message, success } = await cartStore.deleteCoupon();
  useAlert({ type: success ? "success" : "error", message });
};

useSeoMeta({
  title: t("shoppingCart"),
  ogTitle: t("shoppingCart"),
});
</script>

<style scoped></style>
