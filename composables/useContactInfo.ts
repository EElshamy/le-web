export const useContactInfo = function () {
  const { t, locale } = useI18n();
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);

  const categoryOptionsForGuest = [
    { label: t("generalInquiry"), value: "GENERAL_INQUIRY" },
    {
      label: t("courseAvailabilityAndDetails"),
      value: "COURSE_AVAILABILITY_AND_DETAILS",
    },
    { label: t("technicalIssues"), value: "TECHNICAL_ISSUE" },
    { label: t("teachingOpportunities"), value: "TEACHING_OPPORTUNITIES" },
    {
      label: t("collaborationAndPartnershipInquiries"),
      value: "COLLABORATION_AND_PARTNERSHIP_INQUIRIES",
    },
    { label: t("other"), value: "OTHER" },
  ];

  const categoryOptionsForUser = [
    { label: t("generalInquiry"), value: "GENERAL_INQUIRY" },
    { label: t("technicalSupport"), value: "TECHNICAL_ISSUE" },
    { label: t("accountAssistance"), value: "ACCOUNT_ASSISTANCE" },
    // { label: t("paymentAndBilling"), value: "PAYMENT_AND_BILLING" },
    {
      label: t("enrollmentAndRegistrationHelp"),
      value: "ENROLLMENT_AND_REGISTRATION_HELP",
    },
    {
      label: t("certificationAndAccreditationQueries"),
      value: "CERTIFICATION_AND_ACCREDITATION_INQUIRIES",
    },
    { label: t("feedbackAndSuggestions"), value: "FEEDBACK_AND_SUGGESTIONS" },
    { label: t("instructorOpportunities"), value: "INSTRUCTOR_OPPORTUNITIES" },
    { label: t("reportAnIssueOrBug"), value: "REPORT_ISSUE_OR_BUG" },
    { label: t("other"), value: "OTHER" },
  ];

  const activeOptions = computed(() =>
    isLoggedIn ? categoryOptionsForUser : categoryOptionsForGuest
  );

  return { activeOptions };
};
