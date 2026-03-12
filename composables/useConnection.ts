interface opts {
  immediate?: boolean;
}

export const useConnection = function (opts?: opts) {
  const { t, locale } = useI18n();
  const connection = (navigator as any).connection;
  const {
    isOnline,
    offlineAt,
    downlink,
    downlinkMax,
    effectiveType,
    saveData,
    type,
  } = useNetwork();

  console.log(useNetwork());

  const checkConnection = function () {
    if (
      ["2g", "slow-2g"].includes(connection.effectiveType) ||
      connection.downlink < 0.5
    ) {
      useAlert({
        type: "error",
        message: t("yourConnectionSeemsUnstableThingsMightTakeLongerThanUsual"),
      });
    }
  };

  if (opts?.immediate) {
    checkConnection();
  }

  return { connection, checkConnection };
};
