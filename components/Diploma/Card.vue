<template lang="pug">
    NuxtLink.flex.flex-col.gap-5(:to="type === 'paths' ? localePath(`/paths/${data?.slug}`) : localePath(`/subscriptions/${data?.slug}`)" prefetch-on="interaction")
        div
            div(v-show="loaded" class="relative")
                div(v-if="type === 'subscriptions'" class="absolute top-[16px] rtl:right-[16px] ltr:left-[16px] bg-[#F9F9F9] rounded-[50px] py-[8px] px-[16px] flex items-center gap-2 z-[2] shadow-sm")
                  svg(width="20", height="20", viewBox="0 0 20 20", fill="none", xmlns="http://www.w3.org/2000/svg")
                    path(d="M9.99902 1.45996C14.7105 1.45996 18.5408 5.28958 18.541 10.001C18.541 14.7125 14.7106 18.543 9.99902 18.543C5.28762 18.5428 1.45801 14.7124 1.45801 10.001C1.45818 5.28969 5.28773 1.46014 9.99902 1.45996ZM9.99902 1.87598C5.51916 1.87615 1.8742 5.52112 1.87402 10.001C1.87402 14.481 5.51905 18.1258 9.99902 18.126C14.4791 18.126 18.124 14.4811 18.124 10.001C18.1238 5.52101 14.479 1.87598 9.99902 1.87598Z", fill="black", stroke="black", stroke-width="0.833333")
                    path(d="M9.69922 6.0498C9.81077 6.0498 9.90723 6.14626 9.90723 6.25781V9.6748C9.90731 9.92334 10.0045 10.1813 10.1191 10.3828C10.2334 10.5837 10.4063 10.7997 10.623 10.9258L13.2021 12.4658L13.2061 12.4678C13.2963 12.5205 13.3346 12.6407 13.2744 12.75C13.2252 12.8248 13.1533 12.8574 13.0908 12.8574C13.0689 12.8574 13.0525 12.855 13.04 12.8516C13.0281 12.8483 13.0163 12.8436 13.0049 12.8359L12.9971 12.8301L12.9873 12.8252L10.4043 11.2832C9.88905 10.9752 9.49136 10.27 9.49121 9.6748V6.25781C9.49121 6.14626 9.58767 6.0498 9.69922 6.0498Z", fill="black", stroke="black", stroke-width="0.833333")

                  p(class="text-[12px] text-[#000] font-light text-[14px] whitespace-nowrap")  {{ t('subscriptionDuration') }}:
                    span.mx-1.text-primary.font-normal {{ subscriptionDurationDisplay.number }} {{ subscriptionDurationDisplay.text }}
                AppImage(class="shrink-0 rounded-[12px]" fit="cover" ratio="3-2" :alt="locale === 'en' ? data?.enTitle : data?.arTitle" :src="getImageUrl(data?.thumbnail)" @load="loaded = true")
                div(class="absolute bottom-[10px] right-[10px] w-[36px] h-[36px] flex items-center justify-center rounded-[6px] z-1 bg-white" v-if="data?.isAddedToCart")
                  svg(width="24", height="24", viewBox="0 0 24 24", fill="none", xmlns="http://www.w3.org/2000/svg")
                    path(d="M16.25 22.5C17.2165 22.5 18 21.7165 18 20.75C18 19.7835 17.2165 19 16.25 19C15.2835 19 14.5 19.7835 14.5 20.75C14.5 21.7165 15.2835 22.5 16.25 22.5Z", fill="#76003E")
                    path(d="M8.25 22.5C9.2165 22.5 10 21.7165 10 20.75C10 19.7835 9.2165 19 8.25 19C7.2835 19 6.5 19.7835 6.5 20.75C6.5 21.7165 7.2835 22.5 8.25 22.5Z", fill="#76003E")
                    path(d="M4.84 3.94L4.64 6.39C4.6 6.86 4.97 7.25 5.44 7.25H20.75C21.17 7.25 21.52 6.93 21.55 6.51C21.68 4.74 20.33 3.3 18.56 3.3H6.27C6.17 2.86 5.97 2.44 5.66 2.09C5.16 1.56 4.46 1.25 3.74 1.25H2C1.59 1.25 1.25 1.59 1.25 2C1.25 2.41 1.59 2.75 2 2.75H3.74C4.05 2.75 4.34 2.88 4.55 3.1C4.76 3.33 4.86 3.63 4.84 3.94Z", fill="#76003E")
                    path(d="M20.5101 8.75H5.17005C4.75005 8.75 4.41005 9.07 4.37005 9.48L4.01005 13.83C3.87005 15.54 5.21005 17 6.92005 17H18.0401C19.5401 17 20.8601 15.77 20.9701 14.27L21.3001 9.6C21.3401 9.14 20.9801 8.75 20.5101 8.75Z", fill="#76003E")

                //- div.badge.absolute(class="w-[46px] top-[55%] md:top-[70%] lg:top-[65%] xl:top-[73%] 2xl:top-[78%] rounded-[6px] right-3 h-[60px] bg-white flex items-center justify-center")
                    .flex.flex-col.text-center.text-primary
                        p.heading-6 {{ data?.diplomaDetails?.coursesCount + data?.diplomaDetails?.workshopsCount  }}
                        p.label-4 {{ t('coursesWithoutThe') }}
            //- div(class="aspect-[3/2] bg-gray-300 rounded-[12px] shimmer-animation" v-if="!loaded")
            Skeleton(variant="image" class="w-[250px] md:w-auto !h-auto !aspect-[3/2] rounded-[12px]" v-if="!loaded")

        div.flex.flex-col.gap-1.ms-4
            p.text-primary(class="label-prominent-4") {{ locale === 'en' ? data?.category?.enName : data?.category?.arName }}
            p(class="leading-[1.9] hover:text-primary label-prominent-2 lg:label-prominent-1 line-clamp-2 lg:w-auto") {{ locale === 'en' ?  data?.enTitle : data?.arTitle }}

            //- .flex.items-center(class="gap-[6px] label-4 lg:label-3 text-[#5D5A57]")
                p {{ t('track') }}
                div(class="size-[2px] bg-[#5D5A57]")
                p {{ $t(data?.level?.toLowerCase()) || t('intermediate') }}
                div(class="size-[2px] bg-[#5D5A57]")
                p {{ data?.learningTime }} {{ $t(data?.learningTimeUnit?.toLowerCase()) }}

            .line-clamp-1(class="label-4 lg:label-3  text-[#5D5A57]")
                p.line-lg {{ data?.lecturers?.map((lecturer: any) => locale === 'en' ? lecturer?.enFullName : lecturer?.arFullName).join(`${ locale === 'en' ? ', ' : '، ' }`) }}

            //- .flex.items-center.gap-3
                IconStar(:class="{ 'text-[#FF5552]': true, 'text-transparent stroke-gray-300': false }")
                .flex.items-center.gap-3(v-if="data?.averageRating")
                    p {{ data?.averageRating?.toFixed(1) }}
                    p(class="text-[#A29D97] font-light") ({{ data?.totalNumberOfRatings }})
                div(v-else)
                    p {{ t('new') }}

            div
              //- pre {{data}}
              .flex.gap-2.items-center(v-if="data?.priceAfterDiscount !== null")
                      div(class="w-fit h-[20px] flex items-center gap-1 py-[4px] px-[6px] bg-primary-50 rounded-[4px]")
                          IconDiscount
                          span(class="text-[10px] text-primary") {{ Number(discountPercentage) }}% {{ t('off') }}
                      p(class="text-[16px] font-300 text-primary-200 line-through") {{ formatCurrency(data?.originalPrice) }}
              .flex.items-center.gap-1
                p(v-if="+programPrice" class="label-prominent-2 lg:label-prominent-1 text-primary") {{ formatCurrency(programPrice) }}
                p(v-else class="label-prominent-2 lg:label-prominent-1 text-primary") {{ t('free') }}
                p(v-if="+programPrice && type === 'subscriptions'" class="text-primary text-[20px] font-light") / {{ subscriptionDurationDisplay.number }} {{ subscriptionDurationDisplay.text }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formatCurrency } = useFormatter();
const { getImageUrl } = usePhoto();
const { slugify } = useSeo();
const loaded = ref<boolean>(false);

const props = defineProps<{
  data?: any;
  type?: string;
}>();

const discountPercentage = computed(() => {
  console.log(props?.data?.priceAfterDiscount, props?.data?.originalPrice);
  if (props.data?.priceAfterDiscount === 0) return 100;
  return (
    100 -
    (props?.data?.priceAfterDiscount / props?.data?.originalPrice) * 100
  ).toFixed(2);
});

const programPrice = computed(() =>
  props?.data?.priceAfterDiscount !== null
    ? props?.data?.priceAfterDiscount
    : props?.data?.originalPrice,
);

const subscriptionDurationDisplay = computed(() => {
  const months = props.data?.accessDurationPerMonths;
  const number = months === 2 ? "" : months || 0;
  const text =
    months > 2 && months < 11
      ? t("months2")
      : months === 2
        ? t("2Months")
        : months === 1
          ? t("month")
          : t("months");
  return { number, text };
});
</script>

<style scoped></style>
