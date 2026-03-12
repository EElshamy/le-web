<template lang="pug">
.absolute(class="ltr:right-0 rtl:left-0 mt-2 z-[9999] bg-white border lg:w-[448px] shadow-md rounded-[16px]" ref="menuRef")
    div(class="p-[24px]")
        p {{ t('notifications') }}
    div(class="py-[32px] flex justify-center" v-if="isLoading")
        span {{t('loading')}}
    div(class="pt-[32px] pb-[32px] px-[24px]" v-else)
        .flex.flex-col.gap-7.items-center.justify-center(v-if="!notifications?.length")
            IconEmptyNotifications
            .flex.flex-col.gap-4.items-center.justify-center.text-center
                p {{ t('noNotificationsYet') }}
                p {{ t('youllSeeUpdatesHereAboutYourCoursesProgramsAndLearningProgress') }}
        .flex.flex-col(class="gap-[16px] max-h-[596px] overflow-y-scroll" v-else)
            div(v-for="notification in notifications")
                NotificationsCard(:notification :key="notification.id")
        NuxtLink.btn-outline-primary.w-full.mt-3(:to="localePath('/notifications')" @click="$emit('close')" v-if="pageInfo?.hasNext") {{ t('viewAllNotifications') }}
</template>

<script setup lang="ts">
// Imports
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { formatDate } = useFormatter();
const { setIdAndNavigation } = useRouteCustomSlug();
const emit = defineEmits(["close"]);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const notifications = ref([]);
const pageInfo = ref(null);
const isLoading = ref(true);
onMounted(async () => {
try {
isLoading.value = true;
const data = await useNotifications();
if (data) {
    notifications.value = unref(data.notifications);
    pageInfo.value = unref(data.pageInfo);
    notifications.value = notifications.value?.map((item: any) => ({
      ...item,
      seen: true,
    }));
    if (user.value) {
      user.value.notificationsCount = 0;
    }
}
} catch (error) {
console.error("Failed to fetch notifications", error);
} finally {
isLoading.value = false;
}
});

const formatInput = function (notification: any) {
return {
id: notification?.targetId,
type: notification?.targetModel,
enTitle: notification?.enTitle,
};
};
</script>

<style scoped></style>
