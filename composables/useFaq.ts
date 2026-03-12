interface response {
  data: any;
  message: string;
  success: boolean;
}

interface opts {
  fetchImmediately: boolean;
}

export const useFaq = async function (opts?: opts) {
  const { fetchImmediately } = opts as opts;
  const usersFaq = ref();
  const lecturerFaq = ref();

  const getUserFAqs = async function () {
    try {
      const { data: faqs } = await useAsyncData("usersFaqs", () =>
        GqlUserFaqs()
      );
      const { data, message, success } = faqs.value?.userFaqs as response;
      if (!success) return useAlert({ type: "error", message });
      usersFaq.value = data;
      return { data, message, success };
    } catch (err: any) {
      console.log(err);
    }
  };

  const getLecturersFAqs = async function () {
    try {
      const { data: faqs } = await useAsyncData("lecturerFaq", () =>
        GqlLecturerFaqs()
      );
      const { data, message, success } = faqs.value?.lecturerFaqs as response;
      if (!success) return useAlert({ type: "error", message });
      lecturerFaq.value = data;
      return { data, message, success };
    } catch (err: any) {
      console.log(err);
    }
  };

  if (fetchImmediately) {
    await getUserFAqs();
    await getLecturersFAqs();
  }

  return { usersFaq, lecturerFaq, getUserFAqs, getLecturersFAqs };
};
