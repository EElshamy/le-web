export const useSeo = function () {
  const route = useRoute();
  const config = useRuntimeConfig();
  const { APP_BASE_URL } = config.public;
  const currentPath = route.fullPath;

  const handleCanonicalTag = function () {
    useHead({
      link: [{ rel: "canonical", href: APP_BASE_URL + currentPath.slice(1) }],
    });
  };

  const slugify = function (text: string) {
    if (!text) return;
    return text.toString().trim().replace(/\s+/g, "-").replace(/--+/g, "-");
  };

  return { handleCanonicalTag, slugify };
};
