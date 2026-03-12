<template lang="pug">
    .card.bg-white(class="rounded-[16px] border px-[12px] pt-[12px] pb-[24px] w-full lg:w-[429px]")
        AppVideo(:videoId="data?.courseDetail?.promoVideo || data?.diplomaDetails?.promoVideo" :thumbnail="data?.thumbnail ? getImageUrl(data?.thumbnail) : '/share.png'" class="w-full" roundedClass="rounded-[12px] h-[230px]")
        .flex.flex-col.gap-6.mt-5
            .flex.flex-col.gap-3
                p(class="text-[24px] text-primary" v-if="type !== 'subscription'") {{ +programPrice ? formatCurrency(programPrice) : t('free') }}
                div(class="flex items-center gap-1 text-primary" v-else)
                    p(class="text-[24px] text-primary") {{ +programPrice ? formatCurrency(programPrice) : t('free') }}
                    p(v-if="+programPrice" class="text-[20px] font-light") / {{amount}} {{ t('month') }}
                .flex.gap-2.items-center(v-if="data?.priceAfterDiscount !== null")
                    div(class="w-fit h-[20px] flex items-center gap-1 py-[4px] px-[6px] bg-primary-50 rounded-[4px]")
                        IconDiscount
                        span(class="text-[10px] text-primary") {{ discountPercentage }}% {{ t('off') }}
                    p(class="text-[16px] font-300 text-primary-200 line-through") {{ formatCurrency(data?.originalPrice) }}

            .flex.flex-col.gap-3

                .flex.items-center(class="gap-[8px] text-[14px] font-300")
                    IconLanguage
                    span {{ data?.language === 'AR' ? t('taughtInArabic') : t('taughtInEnglish') }}

                .flex.items-center(class="gap-[8px]  text-[14px] font-300" v-if="data?.learningTime")
                    IconClock
                    span {{ type === 'subscription' ? t('subscriptionDuration') : t('courseDuration') }} {{ data?.learningTime }} {{ $t(data?.learningTimeUnit?.toLowerCase() || '') }}

                .flex.items-center(class="gap-[8px]  text-[14px] font-300")
                    IconLevel
                    span {{ t('level') }} {{ data?.level ? $t(data?.level?.toLowerCase() || '') : null }}

                .flex.items-center(class="gap-[8px]  text-[14px] font-300" v-if="data?.type !== 'DIPLOMA'")
                    IconLesson
                    span {{ data?.courseDetail?.lessonsCount }} {{ t('lesson') }}

                .flex.items-center(class="gap-[8px]  text-[14px] font-300" v-if="data?.type === 'DIPLOMA'")
                    IconVideo(class="size-[20px]")
                    span {{ data?.diplomaDetails?.coursesCount }} {{ t('courses') }}

                .flex.items-center(class="gap-[8px]  text-[14px] font-300")
                    IconReward
                    span(v-if="data?.type === 'WORKSHOP'") {{ t('certifiedCertificateOfCompletionFromAce') }}
                    span(v-else) {{ t('certificateOfCompletion') }}
                .flex.items-center(class="gap-[8px]  text-[14px] font-300")
                    IconBackMoney
                    span {{ t('moneyBackGuarantee') }}

                //- .flex.items-center(class="gap-[8px]  text-[14px] font-300")
                    IconInfinity
                    span {{ t('theLearningMaterialIsYoursForLife') }}

            NuxtLink.btn-primary.w-full(:to="localePath('/cart')" v-if="((data?.addedToCart || addedToCart) && isLoggedIn) || data?.isAddedToCart && isLoggedIn") {{ t('goToCart') }}
            button.btn-primary.w-full(v-else-if="data?.assigned && isLoggedIn && data?.type !== 'DIPLOMA'" @click="navigateTo(localePath(`/program/details/${data?.id}`))") {{ t('goToCourse') }}
            p.w-full(v-else-if="data?.assigned && isLoggedIn && data?.type === 'DIPLOMA'" class="text-[14px] font-300") {{ t('YouAreAlreadyAssigned') }}
            .flex.flex-col.gap-3(v-else)
                button.btn-secondary.w-full(@click="$emit('buyNow')") {{ t('buyNow') }}
                button.btn-outline-primary.w-full(@click="$emit('addToCart'), handleChangeStatus()" :disabled="loading")
                    .flex.items-center.gap-2
                        IconLoading(v-if="loading")
                        span {{ t('addToCart') }}
            //- p(class="text-center text-[12px] font-light -mt-2 text-[#5D5A57]") {{ t('moneyBackGuarantee') }}
</template>

<script setup lang="ts">
const props = defineProps<{
  data?: any;
  loading?: boolean;
  type?: string;
  amount?: string;
}>();
const emit = defineEmits(["addToCart", "buyNow"]);

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formatCurrency } = useFormatter();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const addedToCart = defineModel();
const { getImageUrl } = usePhoto();

const programPrice = computed(() =>
  props?.data?.priceAfterDiscount !== null
    ? props?.data?.priceAfterDiscount
    : props?.data?.originalPrice,
);

const discountPercentage = computed(() => {
  if (props.data?.priceAfterDiscount === 0) return 100;
  return (
    100 -
    (props?.data?.priceAfterDiscount / props?.data?.originalPrice) * 100
  ).toFixed(0);
});

const handleChangeStatus = function () {
  if (!isLoggedIn.value) return;
  //   addedToCart.value = true;
};
</script>

<style scoped></style>
