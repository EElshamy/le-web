const looseUuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const useIdCheck = function () {
  function isUUID(str: string) {
    return looseUuidRegex.test(String(str).trim());
  }

  return { isUUID };
};
