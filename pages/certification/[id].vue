<template lang="pug">
    .app-container(class="pt-[40px] pb-[104px]")
        .grid(class="md:grid-cols-2 gap-[78px] lg:gap-0")
            .col-span-1
                .flex.items-center(class="h-full")
                    .flex.flex-col.gap-9
                        .flex.flex-col(class="gap-[24px]")
                            p(class="max-w-[512px] heading-6 lg:heading-4 lh-13 lg:lh-19")  {{ certificate?.programTitle }}
                            .flex.items-center(class="gap-[6px]  text-[14px] text-[#5D5A57] font-300")
                                p {{ $t(certificate?.learningProgramType?.toLowerCase() || '') }}
                                div(class="size-[2px] bg-[#5D5A57] rounded-full")
                                p {{ t('completionData') }}: {{ formatDate(certificate?.createdAt) }}
                        .flex.flex-col.gap-1.relative
                          .flex.items-center.gap-4
                              button.btn-primary.label-prominent-3(@click="downloadCertificate = !downloadCertificate" :disabled="certificate?.pending" v-if="certificate?.downloadEnUrl || certificate?.downloadArUrl")
                                  .flex.items-center.gap-2
                                      IconDownload(class="text-white")
                                      p {{ t('downloadCertificate') }}
                              button.btn-outline-primary.label-prominent-3(@click="openShareModal = true, setLink(route.fullPath)" :disabled="certificate?.pending")
                                  .flex.items-center.gap-2
                                      IconShare(class="hover:text-white")
                                      p {{ t('share') }}
                          .flex.flex-col.gap-3.p-3(class="bg-[#EDEAE7] absolute border top-14 lg:top-15 z-[9999] right-0 w-fit rounded-[8px] shadow-sm" v-if="downloadCertificate" ref="downloadMenu")
                              NuxtLink.text-primary.underline(:to="certificate?.downloadEnUrl" targe="_blank" v-if="certificate?.downloadEnUrl") {{ t('english') }}
                              NuxtLink.cursor-pointer.text-primary.underline(:to="certificate?.downloadArUrl" targe="_blank" v-if="certificate?.downloadArUrl")  {{ t('arabic') }}
            .col-span-1
                div(class="relative transition duration-300 ease-in-out hover:scale-102")
                    NuxtImg(:src="locale === 'en' ? certificate?.previewEnUrl : certificate?.previewArUrl" format="webp" :placeholder="certificate?.certificationType === 'ACE' ? '/images/certification/ace.png' : certificate?.learningProgramType === 'WORKSHOP' ? `/images/certification/program-${locale}.png` : certificate?.learningProgramType === 'COURSE' ? certificate?.isLiveCourse ? `/images/certification/live-${locale}.png` : `/images/certification/course-${locale}.png` : null" alt="certification" loading="lazy" class="w-full")
                    div(class="absolute flex justify-end top-0 p-[20px] bottom-0 left-0 right-0 bg-black/70" v-if="certificate?.pending")
                        div.w-full
                            div(class="flex items-center rounded-full gap-[4px] w-fit bg-white py-[6px] px-[12px]")
                                IconClock(class="size-[16px]")
                                p.label-prominent-4 {{ t('inPreparation') }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const id = route.params.id as string;
const { getCertificateById } = useCertificate();
const { formatDate } = useFormatter();
const { link, openShareModal, setLink } = useShare();
const config = useRuntimeConfig();
const downloadCertificate = ref<boolean>(false);
const downloadMenu = ref();

const { data: certificate } = await getCertificateById(id);

const placeholderImg = computed(() => {
  const lang = locale.value;
  switch (certificate?.value?.certificationType) {
    case "ACE":
      return "/images/certification/ace.png";
    case "LEIAQA":
      if (certificate?.value?.learningProgramType === "WORKSHOP")
        return `/images/certification/program-${lang}.png`;
      if (certificate?.value?.learningProgramType === "COURSE") {
        if (certificate?.value?.isLiveCourse)
          return `/images/certification/live-${lang}.png`;
        return `/images/certification/course-${lang}.png`;
      }
      if (certificate?.value?.learningProgramType === "DIPLOMA")
        return `/images/certification/path-${lang}.png`;
  }
});

onClickOutside(downloadMenu, () => {
  downloadCertificate.value = false;
});

useSeoMeta({
  title: t("certificate"),
  ogTitle: t("certificate"),
  ogImage:
    locale.value === "en"
      ? certificate?.previewEnUrl
      : certificate?.previewArUrl,
});
</script>

<style scoped></style>
