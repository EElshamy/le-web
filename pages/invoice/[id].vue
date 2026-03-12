<template lang="pug">
    .app-container(class="pt-[40px] pb-[180px]")
        .breadcrumb.flex.lime-clamp-1.gap-2.items-center(class="text-[14px] font-300")
            NuxtLink(to="/"): IconHome
            IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180") 
            NuxtLink(:to="localePath('/')") {{ t('home') }}
            IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180") 
            NuxtLink(:to="localePath('/purchase-history')") {{ t('purchaseHistoryHeader') }}
            IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180") 
            p(class="text-[14px] font-400 text-black whitespace-nowrap truncate") {{ t('invoice') }}
        
        .flex.items-center.justify-between.mt-9(class="pb-[24px]")
            p.heading-4 {{ t('invoice') }}
            button.btn-primary.flex.items-center(@click="handleDownloadInvoice")
                IconDownload
                p.label-prominent-3 {{ t('downloadInvoice') }}
        
        .grid(class="pt-[24px] gap-8 grid-cols-1 md:grid-cols-2 lg:gap-0 lg:grid-cols-6")
            .col-span-2
                .flex.flex-col.gap-4.label-prominent-2
                    p {{ t('providedBy') }}:
                    p {{ t('brand') }}
            .col-span-2
                .flex.flex-col.gap-4.label-prominent-2
                    p {{ t('providedTo') }}:
                    p {{ locale === 'en' ? invoice?.enProvidedTo : invoice?.arProvidedTo }}
            .col-span-2
                .flex.flex-col.gap-4.label-prominent-2
                    p {{ t('transactionDetails') }}:
                    .flex.flex-col.gap-3 
                        .flex.items-center(class="gap-[8px]")
                            p(class="label-3 text-[#7F7B76]") {{ t('invoiceNumber') }}:
                            p(class="label-prominent-3") {{ invoice?.invoiceNumber }}
                        .flex.items-center(class="gap-[8px]")
                            p(class="label-3 text-[#7F7B76]") {{ t('invoiceDate') }}:
                            p(class="label-prominent-3") {{ formatDate(invoice?.invoiceDate) }}
                        .flex.items-center(class="gap-[8px]")
                            p(class="label-3 text-[#7F7B76]") {{ t('status') }}:
                            p(class="label-prominent-3" :class="{ 'text-success-700': true }") {{ t('success') }}
                        .flex.items-center(class="gap-[8px]")
                            p(class="label-3 text-[#7F7B76]") {{ t('paymentMethod') }}:
                            p(class="label-prominent-3") Visa
        
        .invoice-table.mt-9(class="max-w-[100%] overflow-scroll")
            div(class="rounded-[12px] overflow-scroll border border-[#DEDAD6]")
                table.w-full 
                    thead(class="bg-[#F8F5F3] label-prominent-2")
                        td(class="p-[24px]") {{ t('purchases') }}
                        td(class="p-[24px]") {{ t('price') }}
                        td(class="p-[24px]") {{ t('discountCode') }}
                        td(class="p-[24px]") {{ t('tax') }}
                        td(class="") {{ t('amountPaid') }}
                    tbody
                        template(v-for="item in invoice?.invoiceItems") 
                            tr.border-t.border-b
                                td(class="py-[20px] ps-[24px]")
                                    p.label-prominent-3 {{ locale === 'en' ? item?.enName : item?.arName }}
                                    p.label-4 {{ item?.type === 'Course' ? t('course') : item?.type === 'Workshop' ? t('program') : t('track') }}
                                td(class="py-[20px] ps-[24px]")
                                    p.label-prominent-3 {{ formatCurrency(item?.price) }}
                                td(class="py-[20px] ps-[24px]")
                                    p.label-prominent-3 {{  item?.discountCode || '--' }} 
                                td(class="py-[20px] ps-[24px]")
                                    p.label-prominent-3 {{ formatCurrency(item?.tax) }}
                                td(class="py-[20px] pe-[24px]")
                                    p.label-prominent-3 {{ formatCurrency(item?.amountPaid) }}
            div(class="rounded-[12px] mt-4 overflow-hidden border bg-[#F8F5F3] border-[#DEDAD6] flex items-center justify-between p-[24px]") 
                p {{ t('totalPaidAmount') }}
                p {{ formatCurrency(invoice?.totalAmountPaid) }}

</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formatCurrency, formatDate } = useFormatter();

const { invoice } = await useInvoice();
const { downloadInvoice } = useDownloadInvoice();
const router = useRoute();
const id = router.params.id as string;

const handleDownloadInvoice = async function () {
  const { data, message, success } = await downloadInvoice(id);
  useAlert({ type: success ? "success" : "error", message });
  if (success) navigateTo(data, { external: true });
};
</script>

<style scoped></style>
