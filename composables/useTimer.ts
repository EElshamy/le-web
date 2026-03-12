export const useTimer = (initialMinutes: number, id: string) => {
  const defaultDuration = initialMinutes * 60 * 1000;

  const expiry = ref<number | null>(null);
  const remaining = ref(defaultDuration);
  const STORAGE_KEY = `timer-expiry-${id}`;

  let interval: any;

  const calculateRemaining = () => {
    if (!expiry.value) return;
    const diff = expiry.value - Date.now();
    remaining.value = Math.max(0, diff);

    if (remaining.value <= 0) {
      stop();
    }
  };

  const start = () => {
    if (!import.meta.client) return;

    // 1. Try to recover from localStorage
    const savedExpiry = localStorage.getItem(STORAGE_KEY);

    if (savedExpiry) {
      expiry.value = Number(savedExpiry);
    } else {
      // 2. If no saved time, set a new expiry and save it
      expiry.value = Date.now() + defaultDuration;
      localStorage.setItem(STORAGE_KEY, expiry.value.toString());
    }

    calculateRemaining();

    if (interval) clearInterval(interval);
    interval = setInterval(calculateRemaining, 1000);
  };

  const stop = () => {
    if (interval) clearInterval(interval);
  };

  const resetTimer = () => {
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY);
    }
    stop();
    expiry.value = null;
    remaining.value = defaultDuration;
  };

  const restart = (customSeconds?: number) => {
    resetTimer(); // Clear old data
    const duration =
      customSeconds !== undefined ? customSeconds * 1000 : defaultDuration;
    expiry.value = Date.now() + duration;

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, expiry.value.toString());
    }

    start();
  };

  const isExpired = ref(false);

  watch(remaining, (newVal) => {
    isExpired.value = newVal <= 0;
  });

  const formatted = computed(() => {
    const totalSec = Math.max(0, Math.floor(remaining.value / 1000));
    const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const sec = String(totalSec % 60).padStart(2, "0");
    return { min, sec };
  });

  onUnmounted(() => stop());

  return { remaining, isExpired, formatted, start, stop, restart, resetTimer };
};
