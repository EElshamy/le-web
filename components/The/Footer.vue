<template lang="pug">
        .app-container(class="pt-11 pb-9 ")
            div(class="flex max-md:flex-col justify-between lg:grid lg:grid-cols-12 lg:gap-0 gap-10")

                div(class="col-span-3")
                    NuxtLink(:to="localePath('/')"): TheFooterLogo

                div(class="col-span-6 lg:col-span-9")
                    div(class="flex flex-col md:flex-row justify-between gap-8 w-full max-lg:flex-wrap")

                        div(class="flex items-start gap-10 xl:gap-20")
                            div(class="flex flex-col gap-3")
                                p(class="text-[12px] text-[#5D5A57]") {{ t('explore') }}
                                div(class="flex flex-col f-gap-12-16")
                                    NuxtLink(:to="localePath('/courses')" :title="t('courses')" prefetch-on="interaction") {{ t('courses') }}
                                    NuxtLink(:to="localePath('/programs')" :title="t('workshops')" prefetch-on="interaction") {{ t('programs') }}
                                    NuxtLink(:to="localePath('/paths')" :title="t('tracks')" prefetch-on="interaction") {{ t('tracks') }}
                                    NuxtLink(:to="localePath('/live-workshops')" :title="t('liveWorkshops')" prefetch-on="interaction") {{ t('liveWorkshops') }}
                                    NuxtLink(:to="localePath('/subscriptions')" :title="t('subscriptions')" prefetch-on="interaction") {{ t('subscriptions') }}
                                    NuxtLink(:to="localePath('/blogs')" :title="t('blogs')" prefetch-on="interaction") {{ t('blogs') }}

                            div(class="flex flex-col gap-3")
                                p(class="text-[12px] text-[#5D5A57]") {{ t('brand') }}
                                div(class="flex flex-col f-gap-12-16")
                                    NuxtLink(:to="localePath('/about')" :title="t('whoAreWe')" prefetch-on="interaction") {{ t('whoAreWe') }}
                                    NuxtLink(:to="localePath('/lecturers')" :title="t('lecturers')" prefetch-on="interaction") {{ t('lecturers') }}
                                    NuxtLink(:to="localePath('/join-as-lecturer')" :title="t('joinAsLecturer')" prefetch-on="interaction") {{ t('joinAsLecturer') }}
                                    NuxtLink(:to="localePath('/contact-us')" :title="t('contactUs')" prefetch-on="interaction") {{ t('contactUs') }}
                                    NuxtLink(:to="localePath('/faqs')" :title="t('FAQs')" prefetch-on="interaction") {{ t('FAQs') }}

                        // Column 3 — Follow Us
                        div(class="flex flex-col items-start gap-3")
                            p(class="text-[12px] text-[#5D5A57]") {{ t('followUs') }}
                            div(class="flex items-start gap-8")
                                div(class="flex md:flex-col gap-6 md:gap-5 items-start")
                                    NuxtLink(to="https://www.instagram.com/leiaqa_edu/" target="_blank" :title="t('instagram')" class="inline-flex items-center gap-2")
                                        IconInstagram(class="shrink-0 max-md:size-[28px]")
                                        span(class="max-md:hidden") {{ t('instagram') }}
                                    NuxtLink(to="https://www.linkedin.com/company/leiaqa" target="_blank" :title="t('linkedIn')" class="inline-flex items-center gap-2")
                                        IconLinkedIn(class="shrink-0 max-md:size-[28px]")
                                        span(class="max-md:hidden") {{ t('linkedIn') }}
                                div(class="flex md:flex-col gap-6 md:gap-5 items-start")
                                    NuxtLink(to="https://www.facebook.com/leiaqa.education" target="_blank" :title="t('facebook')" class="inline-flex items-center gap-2")
                                        IconFacebook(class="shrink-0 max-md:size-[28px]")
                                        span(class="max-md:hidden") {{ t('facebook') }}
                                    NuxtLink(to="https://wa.me/201050580075" target="_blank" :title="t('whatsapp')" class="inline-flex items-center gap-2")
                                        IconWhatsapp(class="shrink-0 max-md:size-[28px]")
                                        span(class="max-md:hidden") {{ t('whatsapp') }}

                        // Column 4 — Download App
                        div(class="flex flex-col gap-3 items-start ")
                            p(class="text-[12px] text-[#5D5A57]") {{ t('downloadApp') }}
                            div(class="flex lg:flex-col xl:flex-row items-start gap-2")
                                NuxtLink(to="https://play.google.com/store/apps/details?id=com.leiaqa" target="_blank" class="flex items-center gap-2 px-4 py-2 border rounded bg-black text-white " :title="t('appStore')")
                                    IconAndroidStore
                                //- NuxtLink(to="/" class="flex items-center gap-2 px-4 py-2 border rounded bg-black text-white " :title="t('googlePlay')")
                                //-     IconAppStore

            .flex.items-center.justify-between(class="text-black flex-wrap gap-5 lg:gap-0 mt-12")

                .flex.items-center.gap-5(class="text-[14px] flex-wrap")
                    NuxtLink(:to="localePath('/terms-and-conditions')" prefetch-on="interaction") {{ t('termsAndConditions') }}
                    NuxtLink(:to="localePath('/privacy-policy')" prefetch-on="interaction") {{ t('privacyPolicy') }}
                    NuxtLink(:to="localePath('/payment-policy')" prefetch-on="interaction") {{ t('paymentPolicy') }}

                .flex.items-center.gap-4(class="text-[12px] font-300")
                    p &copy 2025 {{ t('brand') }}. {{ t('allRightsReserved') }}.
                    div(class="flex items-center gap-1")
                        span {{ t('madeBy') }}
                        NuxtLink(to="https://www.baianat.com/" class="font-medium") {{ t('baianat') }}

</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
</script>

<style scoped></style>
