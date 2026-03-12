<template lang="pug">
    NuxtLink.flex.items-start(class="gap-[16px]" :to="localePath(notification?.url)")
        div(class="size-[40px] relative shrink-0 flex items-center justify-center rounded-full" :class="{ 'bg-[#F8F5F3]': true }")
            IconBell(class="size-[20px] fill-none text-primary")
            div(class="absolute flex items-center justify-center text-white top-0 right-1 bg-secondary rounded-full size-[8px]" v-if="!notification?.seen")
        .flex.flex-col.gap-3
            p.label-prominent-2 {{ locale === 'en' ? notification?.enTitle : notification?.arTitle }}
            p.body-4 {{ locale === 'en' ? notification?.enBody : notification?.arBody  }}
            p.label-4 {{ formatDate(notification?.createdAt) }}
</template>

<script setup lang="ts">
interface Props {
  notification: any;
}

const props = defineProps<Props>();
const { t, locale } = useI18n();
const { formatDate } = useFormatter();
const localePath = useLocalePath();
</script>

<style scoped></style>
