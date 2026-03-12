export const usePagination = function () {
  const route = useRoute();
  const router = useRouter();
  const activePage = ref<number>(Number(route.query.page as string) || 1);

  watch(activePage, () => {
    router.push({
      query: {
        ...route?.query,
        page: activePage.value,
      },
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  return { activePage };
};
