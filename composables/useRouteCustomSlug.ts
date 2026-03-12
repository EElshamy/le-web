interface program {
  id: string;
  type: string;
  isLiveCourse: boolean;
  enTitle: string;
}
export const useRouteCustomSlug = function () {
  const opts = { immediate: false };

  const { activeProgramId } = useProgram(opts);
  const { blogId } = useBlog(opts);
  const { activeDiplomaId } = useTrack(opts);

  const { slugify } = useSeo();
  const navigationUrl = ref<string>("");

  const setIdAndNavigation = function (program: program) {
    console.log(program);
    const { id, type, isLiveCourse, enTitle } = program;
    console.log(id);
    console.log(type);

    switch (type) {
      case "COURSE":
        navigationUrl.value = isLiveCourse
          ? `/live-workshop/${slugify(enTitle)}`
          : `/program/${slugify(enTitle)}`;
        return (activeProgramId.value = id);
      case "WORKSHOP":
        navigationUrl.value = `/program/${slugify(enTitle)}`;
        return (activeProgramId.value = id);
      case "DIPLOMA":
        navigationUrl.value = `/path/${slugify(enTitle)}`;
        return (activeDiplomaId.value = id);
      case "SUBSCRIPTION":
        navigationUrl.value = `/subscription/${slugify(enTitle)}`;
        return (activeDiplomaId.value = id);
      default:
        navigationUrl.value = `/blog/${slugify(enTitle)}`;
        return (blogId.value = id);
    }
  };

  return { setIdAndNavigation, navigationUrl };
};
