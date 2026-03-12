export const useCheckTime = function (target: number) {
  const { now, pause, resume } = useNow({ controls: true });

  const timeReached = computed(() => {
    const current = new Date(now.value).getTime();
    if (current >= target) {
      pause();
      return true;
    }
    return false;
  });

  return { timeReached };
};
