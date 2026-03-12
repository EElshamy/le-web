export const useFormatter = function () {
  const { locale, t } = useI18n();
  const formatCurrency = function (
    amount: number | string,
    lang: "en" | "ar" = "en"
  ) {
    if (amount === null || amount === undefined) return;
    const number = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat(`${lang}-EG`, {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const formatTimeAgo = function (timestamp: number) {
    const { locale } = useI18n();
    if (!timestamp)
      return locale.value === "ar" ? "لا يوجد نشاط" : "No Activity";

    const now = new Date();
    const diff = now - timestamp;

    if (diff < 60000) {
      return locale.value === "ar" ? "الآن" : "just now";
    } else if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return locale.value === "ar"
        ? `قبل ${minutes} دقيقة`
        : `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return locale.value === "ar"
        ? `قبل ${hours} ساعة`
        : `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diff < 2592000000) {
      const days = Math.floor(diff / 86400000);
      return locale.value === "ar"
        ? `قبل ${days} يوم`
        : `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      return new Date(timestamp)?.toLocaleDateString();
    }
  };

  function formatDate(dateString: string): string {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleDateString(`${locale.value}-EG`, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatTimestampToDate(timestamp: number | string | Date): string {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(`${locale.value}-US`, options);
  }

  function timeLeft(timestamp: any) {
    const now = Date.now();
    let diff = Math.max(0, timestamp - now); // in ms

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(diff / (1000 * 60));

    return `${hours}h ${minutes + 1}m`;
  }

  function getDuration(
    start: string | number | Date,
    end: string | number | Date
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Difference in milliseconds
    let diff = endDate.getTime() - startDate.getTime();

    if (diff < 0) return "End date is before start date";

    // Convert to units
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = (Math.floor(diff / (1000 * 60)) % 60).toString();
    const hours = (Math.floor(diff / (1000 * 60 * 60)) % 24).toString();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }

  function formatTimestampToTime(timestamp: number | string): string {
    const date = new Date(timestamp);

    // console.log(date.toLocaleString("en-Eg", { timeZone: "Africa/Cairo" }));
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes}${ampm}`;
  }

  function formatTimestampToEgTime(timestamp: number | string): string {
    return new Intl.DateTimeFormat("en-EG", {
      timeZone: "Africa/Cairo",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(timestamp));
  }

  function stripHtml(html: string | undefined | null) {
    if (!html) return "";
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return {
    formatCurrency,
    formatTimeAgo,
    formatDate,
    formatTimestampToDate,
    timeLeft,
    formatTimestampToTime,
    formatTimestampToEgTime,
    stripHtml,
    getDuration,
  };
};
