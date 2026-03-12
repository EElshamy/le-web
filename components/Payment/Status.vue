<template lang="pug">
    .flex.flex-col.gap-5.items-center.justify-center(class="max-w-[430px] text-center")
        IconPaymentSuccess(v-if="status === 'success'")
        IconPaymentFail(v-else)
        p.heading-5 {{ status === 'success' ? t('paymentSuccessful') : t('paymentFailed') }}
        p.body-3 {{ status === 'success' ? t('yourLearningJourneyStartsNowGoToYourProgramsAndBeginLearning') : t('oopsSomethingWentWrongPleaseTryAgainOrUseAnotherPaymentMethodIfTheProblemContinuesContactOurSupportTeamForHelp') }}
        div(v-if="status === 'success'")
            NuxtLink.btn-primary(:to="localePath('/my-learning-programs')") {{ t('myLearningJourney') }}
        .flex.items-center.gap-4(v-else) 
            NuxtLink.btn-primary(:to="tryAgainLink") {{ t('tryAgain') }}
            NuxtLink.btn-outline-primary(:to="localePath('/contact-us')") {{ t('contactSupport') }}
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string;
  purchasesProgramId?: string;
  purchasedProgramType: string;
  isMultiple: boolean;
}>();

const { t, locale } = useI18n();
const localePath = useLocalePath();

const tryAgainLink = computed(() => {
  if (props.isMultiple) return localePath("/cart");

  const lastAccessedProgramNavigationLink =
    props.purchasedProgramType === "DIPLOMA"
      ? `/paths/${props.purchasesProgramId}`
      : `/program/${props.purchasesProgramId}`;
  return localePath(lastAccessedProgramNavigationLink);
});

</script>
