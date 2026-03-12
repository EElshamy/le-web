export default defineNuxtRouteMiddleware(async (to, from) => {
  const localePath = useLocalePath();
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);

  const { code } = await userStore.fetchMe();
  const guestPages = [
    "/login",
    "/signup",
    "/forget-password",
  ];
  const isGuestPage = guestPages.some(page => to.path.includes(page));
  if (isLoggedIn.value && isGuestPage) {
    return navigateTo(localePath('/'));
  }

  const USER_NOT_VERIFIED_CODE = 5076;
  const VERIFICATION_PAGE = "/settings/password";
  const targetVerificationPath = localePath(VERIFICATION_PAGE);

  if (
    code === USER_NOT_VERIFIED_CODE &&
    to.path !== targetVerificationPath
  ) {
    return navigateTo(targetVerificationPath);
  }

  const securePaths = [
    "/program/details",
    "/my-learning-programs",
    "/settings",
    "/purchase-history",
    "/my-certificates",
    "/invoice"
  ];

  const isSecureRoute = securePaths.some(path => to.fullPath.includes(path));
  const authPages = ["/login", "/signup"];
  const isGoingToAuth = authPages.some(page => to.path.includes(page));
  const isComingFromAuth = authPages.includes(from.path) || from.path.includes("/forget-password");

  if (isGoingToAuth && !isComingFromAuth) {
    userStore.setUrl(from.fullPath);
  }
  if (isSecureRoute && !isLoggedIn.value) {
    const navigationLink = to?.params?.id
      ? `/program/${to?.params?.id}`
      : "/login";

    return navigateTo(localePath(navigationLink));
  }
});
