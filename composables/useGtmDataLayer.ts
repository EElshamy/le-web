import type { Event } from "../types/datalayer.ts";

export const useGtmDataLayer = function () {
  const gtm = useGtm();
  const { formatDataLayer } = useGenerateDataLayer();

  const pushDataLayer = function (
    event: Event,
    items: any[],
    parentItem: any = null
  ) {
    const data = formatDataLayer(event, items, parentItem);
    gtm?.push({ ecommerce: null });
    gtm?.push(data);
    console.log(window.dataLayer);
  };

  return { pushDataLayer };
};
