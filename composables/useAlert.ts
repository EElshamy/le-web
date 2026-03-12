export enum type {
  success = "success",
  error = "error",
  warn = "warn",
}

export enum position {
  top = "top",
  top_right = "top-right",
  top_left = "top-left",
}

interface opts {
  type: string;
  message: string;
  icon?: string;
  alertTimeOutInMs?: number;
  position?: position;
}

const standardStyle: Record<position, string> = {
  top: "top-10 justify-center",
  "top-right": "top-10 justify-start",
  "top-left": "top-10 justify-end",
};
const isVisible = ref<boolean>(false);
const activeMessage = ref<string | null>(null);
const activeStyle = ref<string | null>(null);
const activeType = ref<string | null>(null);

export const useAlert = function (options: opts) {
  const { type, position, message, icon, alertTimeOutInMs } = options;
  const style = computed(() => {
    return standardStyle[(position || "top") as keyof typeof standardStyle];
  });
  isVisible.value = true;
  activeMessage.value = message;
  activeStyle.value = style.value;
  activeType.value = type;
  setTimeout(() => (isVisible.value = false), alertTimeOutInMs || 2000);

  return { type, message, icon, isVisible, style };
};

export const useAlertOptions = function () {
  return { isVisible, activeMessage, activeStyle, activeType };
};
