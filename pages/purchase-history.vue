<template lang="pug">
    .app-container(class="pt-[64px] pb-[350px]")
        p.heading-3(class="pb-8") {{ t('purchaseHistoryHeader') }}

        div(class="max-w-[1500px] overflow-x-scroll" v-if="purchaseHistory?.length")
            table(class="table-fixed w-full border-collapse")
                thead
                    tr(class="label-prominent-2")
                        th(class="w-[128px] text-start pb-[24px]") {{ t('invoiceNo') }}
                        th(class="w-[400px] text-start pb-[24px]") {{ t('purchases') }}
                        th(class="w-[127px] text-start pb-[24px]") {{ t('status') }}
                        th(class="w-[180px] text-start pb-[24px]") {{ t('purchaseDate') }}
                        th(class="w-[180px] text-start pb-[24px]") {{ t('amountPaid') }}
                        th(class="w-[140px] text-start pb-[24px]") {{ t('paymentMethod') }}
                tbody
                    template(v-for="item in purchaseHistory")
                        tr(class="border-t border-b py-[10px] label-3")
                            td(class="py-[20px]")
                                p {{ item?.code }}
                            td 
                                p {{ locale === 'en' ? item?.enTitle : item?.arTitle }}
                            td 
                                p {{ item?.status === 'PENDING' ? t('pending') : item?.status === 'SUCCESS' ? t('success') : item?.status === 'REFUNDED' ? t('refunded') : null }}
                            td 
                                p {{ formatDate(item?.createdAt) }}
                            td 
                                p {{ formatCurrency(item?.totalAmount) }}
                            td 
                                p {{ item?.paymentDetails?.cardBrand }}
                            td 
                                NuxtLink.btn-outline-primary.whitespace-nowrap(:to="localePath(`/invoice/${item?.id}`)") {{ t('viewInvoice') }}
        div(v-else class="pt-[120px] pb-[180px]") 
            AppEmptyData(:title="t('youHaveNoPurchasesYet')" :subTitle="t('onceThePurchaseIsCompleteTheTransactionWillBeSavedSoYouCanReferToItLaterOrDownloadAnInvoice')" @action="navigateTo(localePath('/courses'))" :hasAction="true" :actionBtnText="t('exploreLearningPrograms')")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { purchaseHistory } = await usePurchaseHistory();
const { formatDate, formatCurrency } = useFormatter();
</script>

<style scoped></style>
