const link = ref();
const openShareModal = ref<boolean>(false);

export const useShare = function (input?: { customLink: string }) {
  const { t, locale } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const config = useRuntimeConfig();
  const { APP_BASE_URL } = config.public;
  // link.value = APP_BASE_URL + route.fullPath.slice(1);

  const setLink = function (shareLink: string) {
    link.value = APP_BASE_URL + shareLink.slice(1);
  };

  const copy = function () {
    navigator.clipboard.writeText(link.value).then(() => {
      useAlert({ type: "success", message: t("copied") });
    });
  };

  const popup = function (platform: string) {
    let url: string = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          link.value
        )}`;
        return window.open(url, "_blank", "width=600,height=400");
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(link.value)}`;
        return window.open(url, "_blank", "width=600,height=400");
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(link.value)}`;
        return window.open(url, "_blank", "width=600,height=400");
      case "x":
        url = `https://x.com/intent/tweet?url=${encodeURIComponent(
          link.value
        )}`;
        return window.open(url, "_blank", "width=600,height=400");
      case "linkedIn":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          link.value
        )}`;
        return window.open(url, "_blank", "width=600,height=400");
    }
  };

  return { copy, popup, setLink, link, openShareModal };
};
