<template lang="pug">
    //- :to="localePath(navigationLink)"
    //- pre {{data?.addedToCart}}
    div.flex.flex-col.f-gap-8-16.cursor-pointer(@click="navigateTo(localePath(navigationLink))" :class="[customClass]")
        div.relative(v-show="loaded")
          AppImage(class="shrink-0 rounded-[12px]" fit="cover" ratio="3-2" :live="data?.isLiveCourse" :imgLoading :fetchpriority="imgFetchPriority" :preload="preloadImg" :alt="locale === 'en' ? data?.enTitle : data?.arTitle" :src="getImageUrl(data?.thumbnail)" @load="loaded = true")
          div(class="absolute bottom-[10px] right-[10px] w-[36px] h-[36px] flex items-center justify-center rounded-[6px] z-1 bg-white" v-if="data?.addedToCart")
            svg(width="24", height="24", viewBox="0 0 24 24", fill="none", xmlns="http://www.w3.org/2000/svg")
              path(d="M16.25 22.5C17.2165 22.5 18 21.7165 18 20.75C18 19.7835 17.2165 19 16.25 19C15.2835 19 14.5 19.7835 14.5 20.75C14.5 21.7165 15.2835 22.5 16.25 22.5Z", fill="#76003E")
              path(d="M8.25 22.5C9.2165 22.5 10 21.7165 10 20.75C10 19.7835 9.2165 19 8.25 19C7.2835 19 6.5 19.7835 6.5 20.75C6.5 21.7165 7.2835 22.5 8.25 22.5Z", fill="#76003E")
              path(d="M4.84 3.94L4.64 6.39C4.6 6.86 4.97 7.25 5.44 7.25H20.75C21.17 7.25 21.52 6.93 21.55 6.51C21.68 4.74 20.33 3.3 18.56 3.3H6.27C6.17 2.86 5.97 2.44 5.66 2.09C5.16 1.56 4.46 1.25 3.74 1.25H2C1.59 1.25 1.25 1.59 1.25 2C1.25 2.41 1.59 2.75 2 2.75H3.74C4.05 2.75 4.34 2.88 4.55 3.1C4.76 3.33 4.86 3.63 4.84 3.94Z", fill="#76003E")
              path(d="M20.5101 8.75H5.17005C4.75005 8.75 4.41005 9.07 4.37005 9.48L4.01005 13.83C3.87005 15.54 5.21005 17 6.92005 17H18.0401C19.5401 17 20.8601 15.77 20.9701 14.27L21.3001 9.6C21.3401 9.14 20.9801 8.75 20.5101 8.75Z", fill="#76003E")

          //- svg(width="73", height="69", viewBox="0 0 73 69", fill="none", xmlns="http://www.w3.org/2000/svg" v-if="data?.addedToCart" class="absolute bottom-[-10px] right-[-8px] z-1")
            g(filter="url(#filter0_dd_5326_99355)")
              rect(x="16", y="8.75", width="36", height="36", rx="6", fill="white")
              path(d="M38.25 37.25C39.2165 37.25 40 36.4665 40 35.5C40 34.5335 39.2165 33.75 38.25 33.75C37.2835 33.75 36.5 34.5335 36.5 35.5C36.5 36.4665 37.2835 37.25 38.25 37.25Z", fill="#76003E")
              path(d="M30.25 37.25C31.2165 37.25 32 36.4665 32 35.5C32 34.5335 31.2165 33.75 30.25 33.75C29.2835 33.75 28.5 34.5335 28.5 35.5C28.5 36.4665 29.2835 37.25 30.25 37.25Z", fill="#76003E")
              path(d="M26.84 18.69L26.64 21.14C26.6 21.61 26.97 22 27.44 22H42.75C43.17 22 43.52 21.68 43.55 21.26C43.68 19.49 42.33 18.05 40.56 18.05H28.27C28.17 17.61 27.97 17.19 27.66 16.84C27.16 16.31 26.46 16 25.74 16H24C23.59 16 23.25 16.34 23.25 16.75C23.25 17.16 23.59 17.5 24 17.5H25.74C26.05 17.5 26.34 17.63 26.55 17.85C26.76 18.08 26.86 18.38 26.84 18.69Z", fill="#76003E")
              path(d="M42.5101 23.5H27.1701C26.7501 23.5 26.4101 23.82 26.3701 24.23L26.0101 28.58C25.8701 30.29 27.2101 31.75 28.9201 31.75H40.0401C41.5401 31.75 42.8601 30.52 42.9701 29.02L43.3001 24.35C43.3401 23.89 42.9801 23.5 42.5101 23.5Z", fill="#76003E")
              g(filter="url(#filter1_dd_5326_99355)")
                rect(x="36", y="12.75", width="12", height="12", rx="6", fill="#76003E")
                rect(x="35.625", y="12.375", width="12.75", height="12.75", rx="6.375", stroke="white", stroke-width="0.75")
              path(d="M39 18.9792L40.8462 20.8125L45 16.6875", stroke="white", stroke-width="0.675", stroke-linecap="round", stroke-linejoin="round")
            defs
              filter#filter0_dd_5326_99355(x="0", y="0.75", width="68", height="68", filterUnits="userSpaceOnUse", color-interpolation-filters="sRGB")
                feFlood(flood-opacity="0", result="BackgroundImageFix")
                feColorMatrix(in="SourceAlpha", type="matrix", values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result="hardAlpha")
                feOffset(dy="8")
                feGaussianBlur(stdDeviation="8")
                feColorMatrix(type="matrix", values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.06 0")
                feBlend(mode="multiply", in2="BackgroundImageFix", result="effect1_dropShadow_5326_99355")
                feColorMatrix(in="SourceAlpha", type="matrix", values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result="hardAlpha")
                feOffset(dy="8")
                feGaussianBlur(stdDeviation="4")
                feColorMatrix(type="matrix", values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.08 0")
                feBlend(mode="multiply", in2="effect1_dropShadow_5326_99355", result="effect2_dropShadow_5326_99355")
                feBlend(mode="normal", in="SourceGraphic", in2="effect2_dropShadow_5326_99355", result="shape")
              filter#filter1_dd_5326_99355(x="11.25", y="0", width="61.5", height="61.5", filterUnits="userSpaceOnUse", color-interpolation-filters="sRGB")
                feFlood(flood-opacity="0", result="BackgroundImageFix")
                feColorMatrix(in="SourceAlpha", type="matrix", values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result="hardAlpha")
                feOffset(dy="12")
                feGaussianBlur(stdDeviation="12")
                feColorMatrix(type="matrix", values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.06 0")
                feBlend(mode="multiply", in2="BackgroundImageFix", result="effect1_dropShadow_5326_99355")
                feColorMatrix(in="SourceAlpha", type="matrix", values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result="hardAlpha")
                feOffset(dy="12")
                feGaussianBlur(stdDeviation="6")
                feColorMatrix(type="matrix", values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.08 0")
                feBlend(mode="multiply", in2="effect1_dropShadow_5326_99355", result="effect2_dropShadow_5326_99355")
                feBlend(mode="normal", in="SourceGraphic", in2="effect2_dropShadow_5326_99355", result="shape")
        //- div(class="aspect-[3/2] bg-gray-300 rounded-[12px] shimmer-animation" v-if="!loaded")
        Skeleton(variant="image" class="!w-auto !h-auto !aspect-[3/2] rounded-[12px]" v-if="!loaded")
        div.flex.flex-col.f-mx-6-12.f-gap-4-8
            .flex.items-center.justify-between.gap-1
              NuxtLink(class="label-prominent-4 text-[#5D5A57]" @click.stop :to="localePath(isBlog ? `/blogs/${data?.category?.slug}` : `/category/${data?.category?.slug}`)") {{ locale === 'en' ? data?.category?.enName :  data?.category?.arName }}
              p(class="f-text-10-12 text-[#5D5A57] font-300" v-if="isBlog") {{ formatTimestampToDate(data?.createdAt) }}
              //- p {{data?.courseDetail}}
              .flex.items-center.gap-1.text-neutral-700(class="shrink-0" v-if="!isBlog && data?.learningTime")
                  IconClock(class="size-[16px]")
                  //- p.label-3 {{ data?.learningTime }} {{ $t(data?.learningTimeUnit?.toLowerCase()) }}
                  //- pre {{ data?.learningTime }} {{ $t(data?.learningTimeUnit?.toLowerCase() || '') }}
                  p.label-3(v-if="data?.learningTimeUnit || data?.learningTime") {{ data?.learningTime }} {{ $t(data?.learningTimeUnit ? data?.learningTimeUnit.toLowerCase() : t('hour')) }}
            h5(class="lh-[1.3] hover:text-primary f-text-16-20 line-clamp-2 lg:w-auto" ) {{ locale === 'en' ? data?.enTitle : data?.arTitle }}

              //- .flex.items-center(class="gap-[6px] label-4 lg:label-3  text-[#5D5A57]" v-if="!isBlog")
                  p {{ $t(data?.type?.toLowerCase()) || t('course') }}
                  div(class="size-[2px] bg-[#5D5A57] rounded-full")
                  p {{ $t(data?.level?.toLowerCase()) || t('intermediate') }}
                  div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="data?.learningTime")
                  p(v-if="data?.learningTime") {{ data?.learningTime }} {{ $t(data?.learningTimeUnit?.toLowerCase()) }}

              //- .flex.items-center.gap-2

                  //- .flex.items-center.gap-1.text-neutral-700(v-if="!isBlog" class="shrink-0")
                      IconClock(class="size-[16px]")
                      p.label-3 {{ data?.learningTime }} {{ $t(data?.learningTimeUnit?.toLowerCase()) }}
                      //- IconStar(:class="{ 'text-[#FF5552]': true, 'text-transparent stroke-gray-300': false  }")
                      //- .flex.items-center.gap-3(v-if="data?.averageRating")
                        p {{ data?.averageRating?.toFixed(1) }}
                        p(class="text-[#A29D97] font-light") ({{ data?.totalNumberOfRatings }})
                      //- div(v-else)
                        p {{ t('new') }}

                  //- div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="data?.learningTime")

                  //- .line-clamp-1(class="label-4 lg:label-3  text-[#5D5A57]")
                    p.line-lg {{ data?.users?.map((lecturer: any) => locale === 'en' ? lecturer?.enFullName : lecturer?.arFullName).join(`${ locale === 'en' ? ', ' : '، ' }`) }}
            div(v-if="!isBlog")
              .flex.gap-2.items-center(v-if="data?.priceAfterDiscount !== null && discountPercentage")
                      div(class="w-fit h-[20px] flex items-center gap-1 py-[4px] px-[6px] bg-primary-50 rounded-[4px]" v-if="discountPercentage")
                          IconDiscount
                          span(class="text-[10px] text-primary") {{ discountPercentage }}% {{ t('off') }}
                      p(class="text-[16px] font-300 text-primary-200 line-through") {{ formatCurrency(data?.originalPrice) }}
              .flex.items-center.gap-1.f-pt-2-4( v-if="!isBlog")
                p(class="label-prominent-2 lg:label-prominent-1 text-primary") {{ +programPrice ? formatCurrency(programPrice) : data?.originalPrice ? formatCurrency(data?.originalPrice) : t('free') }} 
                //- p(class="label-prominent-3 lg:label-prominent-2 text-primary line-through" v-if="data?.priceAfterDiscount") {{ formatCurrency(data?.originalPrice) }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formatCurrency, formatTimestampToDate } = useFormatter();
const { getImageUrl } = usePhoto();
const { slugify } = useSeo();
const loaded = ref<boolean>(false);

const props = defineProps<{
  data?: any;
  isBlog?: boolean;
  customClass?: string;
  preloadImg?: boolean;
  imgFetchPriority?: "low" | "high";
  imgLoading?: "lazy" | "eager";
}>();

const price = computed(() =>
  props.data?.priceAfterDiscount !== null
    ? props.data?.priceAfterDiscount
    : props.data?.originalPrice,
);

const navigationLink = computed(() =>
  props.isBlog
    ? `/blogs/${props?.data?.category?.slug}/${props?.data?.slug}`
    : `/program/${props?.data?.slug}`,
);

const discountPercentage = computed(() => {
  if (props.data?.priceAfterDiscount === 0) return 100;
  if (props.data?.priceAfterDiscount && props.data?.originalPrice) {
    return (
      100 -
      (props?.data?.priceAfterDiscount / props?.data?.originalPrice) * 100
    ).toFixed(0);
  }
});

const programPrice = computed(() =>
  props?.data?.priceAfterDiscount !== null
    ? props?.data?.priceAfterDiscount
    : props?.data?.originalPrice,
);
</script>

<style scoped>
@keyframes shimmer {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.shimmer-animation {
  animation: shimmer 1.3s infinite;
}
</style>
