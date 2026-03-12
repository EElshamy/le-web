interface response {
  data?: any;
  message: string;
  success: boolean;
}

const notifications = ref();
const pageInfo = ref();

export const useNotifications = async function () {
  const { data: notifications } = await useAsyncData("notifications", () =>
    GqlMySiteNotifications()
  );
  const { data, message, success } = notifications?.value
    ?.mySiteNotifications as response;
  notifications.value = data?.items;
  pageInfo.value = data?.pageInfo;

  return { notifications, pageInfo };
};
