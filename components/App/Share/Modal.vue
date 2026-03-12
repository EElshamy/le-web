<template lang="pug">
    AppModal(v-model="model" :showActions="false" customStyle="h-fit" dialogStyle="max-w-[100%]") 
        template(#header) 
            .flex.flex-col.gap-8   
                p.heading-6 {{ t('shareCourse') }}
                p.body-3 {{ t('shareThisCourseWithOthersAndSpread') }}
        
        .flex.flex-col.gap-6
            p.label-prominent-2 {{ t('shareLinkVia') }}
            .flex.items-center(class="gap-[20px] overflow-x-scroll")
                SocialIcon(bgColor="#1877F2" :label="t('facebook')" plat="facebook") 
                    template(#icon) 
                        IconSocialFacebook(class="shrink-0")
                SocialIcon(bgColor="#25D366" :label="t('whatsapp')" plat="whatsapp") 
                    template(#icon) 
                        IconSocialWhatsapp(class="shrink-0")
                SocialIcon(bgColor="#0088CC" :label="t('telegram')" plat="telegram") 
                    template(#icon)
                        IconSocialTelegram(class="shrink-0")
                SocialIcon(bgColor="#000000" :label="t('x')" plat="x") 
                    template(#icon) 
                        IconSocialX(class="shrink-0")
                SocialIcon(bgColor="#2867B2" :label="t('linkedIn')" plat="linkedIn") 
                    template(#icon) 
                        IconSocialLinkedIn(class="shrink-0")
            p {{ t('orCopyLink') }} 
            .flex.items-center.justify-between.mb-8(class="border border-[#C1BCB7] rounded-[6px] py-[5px] ps-[12px] pe-[6px]")
                .flex.items-center(class="gap-[8px] max-w-[80%] overflow-x-scroll label-3")
                    IconLink
                    p.whitespace-nowrap {{ link }}
                button.btn-primary.label-prominent-4(class="w-[48px] h-[32px] whitespace-nowrap w-fit" @click="copy(link),copied = true") {{ !copied ? t('copy') : `${t('copied')}!` }}
</template>

<script setup lang="ts">
const model = defineModel();
const { t, locale } = useI18n();
const { copy, link } = useShare();
const copied = ref<boolean>(false);

watch(copied, () => {
  setTimeout(() => {
    copied.value = false;
  }, 4000);
});
</script>

<style scoped></style>
