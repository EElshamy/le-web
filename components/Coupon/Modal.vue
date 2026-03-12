<template lang="pug">
    AppModal(v-model="model" v-if="model" title="" :scrollTopBottomOnMobile="width <= 640" :showActions="false" customStyle="h-fit w-full lg:w-[536px]")
        .flex.items-center.justify-center(class="py-[28px] px-[16px]")
            .flex.flex-col.gap-3.text-center.items-center
                IconCouponModal
                .flex.flex-col(class="gap-[14px] mt-[8px]")
                    p.heading-6 {{ t('gotACoupon') }}
                    p.body-3 {{ t('ifYouHaveACouponCodeEnterItToGetADiscountOnYourBill') }}
        
        Form(class="pb-[28px]" @submit="handleSubmit") 
            template(#default=" { values, resetForm } ")
                InputCustomText(name="code" :disabled="false" :placeholder="t('enterCode')" :hasBorder="true")
                    template(#prefix) 
                        IconCoupon
                    template(#actions) 
                        button.w-full.btn-primary.label-prominent-3.w-full(class="h-[46px] rounded-[8px]" v-if="!couponCode" :disabled="!values?.code") {{ t('apply') }}
                        button.btn-primary.label-prominent-3.col-span-1(class="h-[46px] rounded-[8px]" type='button' @click="couponCode = '', discountAmount = 0,  resetForm()" v-else): IconClose(class="text-white")
                p(class="text-[12px] m-0 text-red-700 mt-1" v-if="couponErr") {{ couponErr }}

                .flex.flex-col.gap-2.mt-2.body-3(v-if="couponCode")
                    .flex.items-center.justify-between 
                        p {{ t('price') }}
                        p {{ formatCurrency(price) }}
                    .flex.items-center.justify-between(v-if="discountAmount")
                        p {{ t('discount') }}
                        p.text-success -{{ formatCurrency(discountAmount) }}
                    .flex.items-center.justify-between 
                        p {{ t('total') }}
                        p {{ formatCurrency(total) }}


                button.btn-primary.w-full.mt-8(@click="$emit('applyCoupon', couponCode)" type="button") {{ couponCode ? `${t('proceedToPayment')} ${formatCurrency(total)}` : t('continueWithoutCoupon') }}
                //- button.btn-outline-primary.w-full.mt-2(@click="$emit('applyCoupon', '')" type="button") {{ t('continueWithoutCoupon') }}
</template>

<script setup lang="ts">
import * as yup from "yup";
import { RevenueShareTargetEnum } from "#gql/default";

interface Props {
  /**
   * learning program price
   */
  price: number;

  id: string;

  type: RevenueShareTargetEnum;
}

const props = defineProps<Props>();
const emit = defineEmits(["applyCoupon"]);
const model = defineModel();
const { t, locale } = useI18n();
const { width } = useWindowSize();
const { formatCurrency } = useFormatter();

const cartStore = useCartStore();
const couponErr = ref<string>("");
const couponCode = ref<string>("");
const discountAmount = ref<number>(0);

const total = computed(() => props.price - discountAmount.value);

const schema = yup.object({
  code: yup.string(),
});

const handleSubmit = async function ({ code }: { code: string }) {
  couponErr.value = "";
  const { data: applyCoupon } = await useAsyncData(
    `applyCoupon-${code}-${props.id}`,
    () =>
      GqlApplyCouponForBuyNow({
        input: {
          programId: props.id,
          programType: props.type,
          couponCode: code,
        },
      }),
  );
  const { data, message, success } = applyCoupon?.value
    ?.applyCouponForBuyNow as {
    data: any;
    message: string;
    success: boolean;
  };
  if (!success) return (couponErr.value = message);
  couponCode.value = code;
  discountAmount.value = data?.discountAmount;
};
</script>

<style scoped></style>
