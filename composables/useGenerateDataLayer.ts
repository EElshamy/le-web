import type {
  Event,
  Ecommerce,
  User,
  DataLayer,
  EcommerceItems,
} from "../types/datalayer.ts";

export const useGenerateDataLayer = function () {
  const { locale } = useI18n();
  const route = useRoute();
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  const eventsHelper = {
    view_item: {
      format: (items: any[]) => formatViewItem(items),
      calcValue: (items: any[]) => handleCalcTotalValue(items),
    },
    add_to_cart: {
      format: (items: any[]) => formatViewItem(items),
      calcValue: (items: any[]) => handleCalcTotalValue(items),
    },
    view_cart: {
      format: (items: any[]) => formatViewItem(items),
      calcValue: (items: any[]) => handleCalcTotalValue(items),
    },
    remove_from_cart: {
      format: (items: any[]) => formatViewItem(items),
      calcValue: (items: any[]) => handleCalcTotalValue(items),
    },
    begin_checkout: {
      format: (items: any[]) => formatViewItem(items),
      calcValue: (items: any[]) => handleCalcTotalValue(items),
    },
    purchase: {
      format: (items: any[]) => formatViewItem(items),
      calcValue: (items: any[]) => handleCalcTotalValueForPurchase(items),
    },
  };

  const handleCalcTotalValue = function (items: any[]) {
    return items?.reduce(
      (acc: number, item: any) =>
        acc +
        (item?.priceAfterDiscount !== null
          ? item?.priceAfterDiscount
          : item?.originalPrice),
      0
    );
  };

  const handleCalcTotalValueForPurchase = function (items: any[]) {
    return items?.[0]?.totalPrice;
  };

  const formatViewItem = function (items: any[]): EcommerceItems[] {
    return items?.map((item: any) => ({
      item_id: item?.id,
      item_name: locale.value === "en" ? item?.enTitle : item?.arTitle,
      discount:
        item?.priceAfterDiscount !== null
          ? item?.originalPrice - item?.priceAfterDiscount
          : null,
      item_category:
        locale.value === "en" ? item?.category?.enName : item?.category?.arName,
      type:
        item?.type === "WORKSHOP"
          ? "PROGRAM"
          : item?.type === "DIPLOMA"
          ? "PATH"
          : item?.isLiveCourse
          ? "LIVE"
          : "COURSE",
      price:
        item?.priceAfterDiscount !== null
          ? item?.priceAfterDiscount
          : item?.originalPrice,
      quantity: 1,
      language: item?.language,
      course_duration_hours: item?.learningTime,
      difficulty_level: item?.level,
      number_of_lessons:
        item?.courseDetail?.lessonsCount || item?.diplomaDetails?.lessonsCount,
      instructors:
        item?.type === "DIPLOMA"
          ? item?.lecturers?.map((lecturer: any) =>
              locale.value === "en"
                ? lecturer?.enFullName
                : lecturer?.arFullName
            )
          : item?.users?.map((lecturer: any) =>
              locale.value === "en"
                ? lecturer?.enFullName
                : lecturer?.arFullName
            ),
      certifications: ["Leiaqa", item?.ACE_Certificate ? "ACE" : null].filter(
        (certification: string | null) => certification
      ),
      programs: formatViewItem(item?.programs),
    }));
  };

  const formatDataLayer = function (
    event: Event,
    items: any[],
    parentItem: any = null
  ): DataLayer {
    console.log(items);
    return {
      event,
      ecommerce: {
        path_id: parentItem?.id,
        path_name:
          locale.value === "en" ? parentItem?.enTitle : parentItem?.arTitle,
        discount:
          event === "purchase"
            ? items?.[0]?.subTotalPrice - items?.[0]?.totalPrice
            : parentItem && parentItem?.priceAfterDiscount !== null
            ? parentItem?.originalPrice - parentItem?.priceAfterDiscount
            : null,
        course_type: parentItem ? "PATH" : null,
        currency: "EGP",
        couponCode: items?.[0]?.coupon,
        items: eventsHelper[event as keyof typeof eventsHelper]?.format(items),
        value: parentItem
          ? parentItem?.priceAfterDiscount !== null
            ? parentItem?.priceAfterDiscount
            : parentItem?.originalPrice
          : eventsHelper[event as keyof typeof eventsHelper]?.calcValue(items),
      },
      user: {
        first_name: (user?.value as any)?.firstName,
        last_name: (user?.value as any)?.lastName,
        phone: (user?.value as any)?.phone,
        email: (user?.value as any)?.email,
        country: (user?.value as any)?.country?.isoCode,
      },
    };
  };

  return { formatDataLayer };
};
