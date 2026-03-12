<template lang="pug">
    .app-container.mx-auto
        .flex.items-center.justify-center
            div(class="w-full lg:w-[652px]")
                header(class="pt-[24px] lg:pt-[64px] pb-[32px]")
                    h1(class="heading-6 lg:heading-3") {{ t('FAQs') }}
                    AppTabs(v-model="activeTab" :tabs class="h-[30px] mt-5")
                div(class="pt-[32px] pb-[104px]")
                    Accordion(:items accordionStyle="gap-7" accordionItem="gap-6 border-b border-neutral-300 pb-7" titleStyle="label-prominent-2 lg:label-prominent-1" contentStyle="body-4 lg:body-3")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const activeTab = ref<string>((route.params.tab as string) || "students");
const { usersFaq, lecturerFaq } = await useFaq({ fetchImmediately: true });

const items: Ref<{ title: string; content: string }> = computed(() => {
  const isEn = locale.value === "en";

  if (activeTab.value === "students" && !usersFaq.value?.length) return [];
  if (activeTab.value === "instructors" && !lecturerFaq.value?.length)
    return [];

  if (activeTab.value === "students")
    return usersFaq.value?.map((faq: any) => ({
      title: isEn ? faq?.enQuestion : faq?.arQuestion,
      content: isEn ? faq?.enAnswer : faq?.arAnswer,
    }));

  if (activeTab.value === "instructors")
    return lecturerFaq.value?.map((faq: any) => ({
      title: isEn ? faq?.enQuestion : faq?.arQuestion,
      content: isEn ? faq?.enAnswer : faq?.arAnswer,
    }));
});

const tabs = [
  {
    label: t("forStudents"),
    name: "students",
  },
  {
    label: t("forInstructors"),
    name: "instructors",
  },
];

// const items = [
//   {
//     title: "ما هو لياقة؟",
//     content:
//       "تحتاج عينة الفيديو التي يجب عليك إنشاؤها لتمثيل محتوى الدورة وأفكارها إلى مدة تتراوح بين 3 إلى 5 دقائق، ويتطلب الأمر أن تظهر كمتحدث في الفيديو وأن تضيف عروضًا تقديمية مرئية متسقة مع إرشاداتنا لتلقي الملاحظات الكاملة",
//   },
//   {
//     title: "ما هو لياقة؟",
//     content:
//       "تحتاج عينة الفيديو التي يجب عليك إنشاؤها لتمثيل محتوى الدورة وأفكارها إلى مدة تتراوح بين 3 إلى 5 دقائق، ويتطلب الأمر أن تظهر كمتحدث في الفيديو وأن تضيف عروضًا تقديمية مرئية متسقة مع إرشاداتنا لتلقي الملاحظات الكاملة",
//   },
//   {
//     title: "ما هو لياقة؟",
//     content:
//       "تحتاج عينة الفيديو التي يجب عليك إنشاؤها لتمثيل محتوى الدورة وأفكارها إلى مدة تتراوح بين 3 إلى 5 دقائق، ويتطلب الأمر أن تظهر كمتحدث في الفيديو وأن تضيف عروضًا تقديمية مرئية متسقة مع إرشاداتنا لتلقي الملاحظات الكاملة",
//   },
//   {
//     title: "ما هو لياقة؟",
//     content:
//       "تحتاج عينة الفيديو التي يجب عليك إنشاؤها لتمثيل محتوى الدورة وأفكارها إلى مدة تتراوح بين 3 إلى 5 دقائق، ويتطلب الأمر أن تظهر كمتحدث في الفيديو وأن تضيف عروضًا تقديمية مرئية متسقة مع إرشاداتنا لتلقي الملاحظات الكاملة",
//   },
//   {
//     title: "ما هو لياقة؟",
//     content:
//       "تحتاج عينة الفيديو التي يجب عليك إنشاؤها لتمثيل محتوى الدورة وأفكارها إلى مدة تتراوح بين 3 إلى 5 دقائق، ويتطلب الأمر أن تظهر كمتحدث في الفيديو وأن تضيف عروضًا تقديمية مرئية متسقة مع إرشاداتنا لتلقي الملاحظات الكاملة",
//   },
// ];
</script>

<style scoped></style>
