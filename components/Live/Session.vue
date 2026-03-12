<template lang="pug">
    .card(class="p-[24px] mx-auto bg-[#F8F5F3] mt-[20px] rounded-[8px] w-full lg:w-[657px]")
        .flex.flex-col.gap-4
            .flex.items-center.justify-between
                h1.heading-6 {{ locale === 'en' ? live?.enTitle : live?.arTitle }}
                button.btn-primary.label-3(@click="generateGoogleCalendarLink({ title: locale === 'en' ? live?.enTitle : live?.arTitle, start: startAt, end: endAt })" v-if="!liveStatus && !tempStatus") 
                    .flex.items-center.gap-2
                        IconCalendar(class="size-[17px] !text-white")
                        span {{ t('addToCalender') }}
                p(v-else :class="{ 'text-danger': liveStatus === t('ended'), 'text-success': liveStatus === t('ongoing') }") {{ liveStatus || tempStatus }}
            .flex.items-center.gap-2
                IconCalendar(class="text-black size-[24px]") 
                .flex.flex-col
                    p.label-prominent-4 {{ formatDate(startAt) }}
                    p.label-4 {{ formatTimestampToTime(startAt) }} - {{ formatTimestampToTime(endAt) }}
    .card(class="p-[24px] flex flex-col gap-5 mx-auto bg-[#F8F5F3] mt-[20px] rounded-[8px] w-full lg:w-[657px]")
        .flex.items-center.justify-between(v-if="!liveStatus || liveStatus === t('ongoing')")
            .flex.items-center.gap-2 
                IconClock 
                p {{ liveStatus === t('ongoing') ? t('startNow') : t('eventStartingIn') }}
            p.text-danger(v-if="!liveStatus") {{ timeLeft(startAt) }}
            NuxtLink.btn-primary(:to="live?.videoUrl" target="_blank" v-else) {{ t('start') }}
        div
            .flex.flex-col.gap-2(v-if="live?.overview")
                p(class="label-prominent-3") {{ t('overview') }}:
                p {{ live?.overview }}
            p(class="mt-2 label-prominent-3") {{ t('duration') }}: {{ formatTimestampToTime(startAt) }} - {{ formatTimestampToTime(endAt) }}
            p(class="mt-2 label-prominent-3") {{ t('platform') }}: {{ platform }}
</template>

<script setup lang="ts">
const props = defineProps<{
  live?: any;
}>();

const { t, locale } = useI18n();
const {
  timeLeft,
  formatTimestampToTime,
  formatTimestampToEgTime,
  formatDate,
  getDuration,
} = useFormatter();

const date = new Date().getTime();
const startAt = computed(() =>
  new Date(props.live?.liveSessionStartAt).getTime()
);
const endAt = computed(() => new Date(props.live?.liveSessionEndAt).getTime());
const { timeReached: started } = useCheckTime(startAt.value);
const { timeReached: ended } = useCheckTime(endAt.value);

const duration = computed(() => {
  const { hours, minutes, seconds } = getDuration(startAt.value, endAt.value);
  return `${hours}H ${minutes}M`;
});

const platform = computed(() => {
  if (props.live?.videoUrl?.includes("zoom")) return "Zoom";
  if (props.live?.videoUrl?.includes("google")) return "Google Meet";
});

const liveStatus = computed(() => {
  if (date > endAt.value || ended.value) return t("ended");
  if ((date > startAt.value && date < endAt.value) || started.value)
    return t("ongoing");
  return null;
});

function toGoogleCalendarDate(timestamp: any) {
  // Google Calendar expects UTC format: YYYYMMDDTHHmmssZ
  const date = new Date(timestamp);
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function generateGoogleCalendarLink({
  title,
  description,
  location,
  start,
  end,
}: {
  title: string;
  description?: string;
  location?: string;
  start: number;
  end: number;
}) {
  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d+/g, "");

  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const url = `${base}&text=${encodeURIComponent(
    title
  )}&dates=${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(
    end
  )}&details=${encodeURIComponent(
    description || ""
  )}&location=${encodeURIComponent(location || "")}`;

  return navigateTo(url, { external: true });
}
</script>

<style scoped></style>
