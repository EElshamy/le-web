<template lang="pug">
  NuxtLink.flex.flex-col.gap-5.items-center(:to="localePath(`/lecturers/${data?.user?.slug}`)" prefetch-on="interaction")
      div(class="w-[80px] md:w-[170px]" :class="[avatarClass]")
          div(v-show="loaded")
              AppImage(:src="getImageUrl(data?.user?.profilePicture)" :alt="locale === 'en' ? data?.user?.enFullName : data?.user?.arFullName" @load="loaded = true" class="rounded-full")
          Skeleton(variant="avatar" rounded="full" class="!size-[80px] md:!size-[170px] lg:!w-auto" v-if="!loaded")
      .flex.flex-col.gap-3.items-center.text-center
          h3(class="label-prominent-3 lg:label-prominent-1 cursor-auto") {{ locale === 'en' ? data?.user?.enFullName : data?.user?.arFullName }}
          p(class="label-4 lg:label-3 cursor-auto") {{ locale === 'en' ? data?.jobTitle?.enName : data?.jobTitle?.arName}}
      .flex.items-center.gap-3.label-prominent-3(v-if="viewProgramsCount")
          p(v-if="coursesLength > 0" @click.prevent="scrollToSection('courses-section')" class="cursor-pointer hover:text-primary transition-colors duration-200") {{ coursesLength }} {{ t('courses') }}
          div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="coursesLength > 0 && workshopLength > 0")
          p(v-if="workshopLength > 0" @click.prevent="scrollToSection('programs-section')" class="cursor-pointer hover:text-primary transition-colors duration-200") {{ workshopLength }} {{ t('programs') }}
          div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="workshopLength > 0 && data?.diplomas?.filter((diploma: any) => !diploma?.accessDurationPerMonths)?.length > 0")
          p(v-if="data?.diplomas?.filter((diploma: any) => !diploma?.accessDurationPerMonths)?.length > 0" @click.prevent="scrollToSection('tracks-section')" class="cursor-pointer hover:text-primary transition-colors duration-200") {{  data?.diplomas?.filter((diploma: any) => !diploma?.accessDurationPerMonths)?.length}} {{ t('tracks') }}
          div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="workshopLength > 0 && data?.diplomas?.filter((diploma: any) => diploma?.accessDurationPerMonths)?.length > 0")
          p(v-if="data?.diplomas?.filter((diploma: any) => diploma?.accessDurationPerMonths)?.length > 0" @click.prevent="scrollToSection('subscriptions-section')" class="cursor-pointer hover:text-primary transition-colors duration-200") {{ data?.diplomas?.filter((diploma: any) => diploma?.accessDurationPerMonths)?.length }} {{ t('subscriptions') }}
          div(class="size-[2px] bg-[#5D5A57] rounded-full" v-if="data?.diplomas?.length > 0 && liveWorkshopsLength > 0")
          p(v-if="liveWorkshopsLength" @click.prevent="scrollToSection('live-workshops-section')" class="cursor-pointer hover:text-primary transition-colors duration-200") {{ liveWorkshopsLength }} {{ t('liveWorkshops') }}

</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const { getImageUrl } = usePhoto();
const { slugify } = useSeo();
const localePath = useLocalePath();
const loaded = ref<boolean>(false);

const props = defineProps<{
  data: any;
  avatarClass?: string;
  viewProgramsCount?: boolean;
}>();

const coursesLength = computed(() => {
  return props.data?.courses?.filter(
    (program: any) => program?.type === "COURSE" && !program?.isLiveCourse,
  ).length;
});

const liveWorkshopsLength = computed(() => {
  return props.data?.courses?.filter(
    (program: any) => program?.type === "COURSE" && program?.isLiveCourse,
  ).length;
});

const workshopLength = computed(() => {
  return props.data?.courses?.filter(
    (program: any) => program?.type === "WORKSHOP",
  ).length;
});

const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
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
