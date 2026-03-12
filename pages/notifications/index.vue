<template lang="pug">
    BasePage(:title="t('notifications')")

        //- pre {{data?.items}}
        .flex.flex-col(class="f-gap-24-32 f-mt-32-48")

            //- Loading
            template(v-for="i in 10" v-if="loading")
                SkeletonNotification

            //- Fallback
            template(v-for="notification in data?.items" v-else-if="data?.items?.length")
                NotificationsCard(:notification)

            //- Empty state
            template(v-else)
                div(class="f-mt-140-200")
                    AppEmptyData(:title="t('noNotificationsYet')" :subTitle="t('youllSeeUpdatesHereAboutYourCoursesProgramsAndLearningProgress')")
                        template(#icon)
                            IconEmptyNotifications

            //- Pagination
            .flex.items-center.justify-center.w-full(v-if="data?.pageInfo?.totalPages > 1")
                AppPagination(v-model="activePage" :totalPages="data?.pageInfo?.totalPages")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const activePage = ref<number>(1);
const loading = computed(() => status.value === "pending");

const { data, error, status } = useAsyncData(
  `getNotifications-${activePage.value}`,
  () =>
    GqlMySiteNotifications({
      paginate: {
        page: activePage.value,
      },
    }),
  { transform: (data) => data?.mySiteNotifications?.data, watch: [activePage] }
);

watch(activePage, () => {
  window.scroll({ top: 0, behavior: "smooth" });
});
</script>

<style scoped></style>
