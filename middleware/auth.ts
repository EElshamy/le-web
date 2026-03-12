const localePath = useLocalePath();
const userStore = useUserStore();

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("middleware running", to.path, from.path);
  // if (!userStore.isLoggedIn) await userStore.getMe();

  // console.log("authorized", userStore.isLoggedIn);

  // if (userStore.isLoggedIn && (to.path === "/login" || to.path === "/signup")) {
  //   return navigateTo(localePath("/"));
  // }

  // if (process.client) {
  //   if (
  //     userStore.isLoggedIn &&
  //     (to.path === "/login" || to.path === "/signup")
  //   ) {
  //     console.log("middleware going to home");
  //     return navigateTo(localePath("/"));
  //   }
  // }
});

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   console.log("middleware running...");
//   const userStore = useUserStore();
//   const { isLoggedIn } = storeToRefs(userStore);
//   const secureRoutes = [
//     "/cart",
//     "/my-learning-programs",
//     "/settings",
//     "/settings/*",
//     "/purchase-history",
//     "/program/details/*",
//   ];

//   if (!isLoggedIn.value) await userStore.getMe();

//   if (isLoggedIn.value && (to.path === "/login" || to.path === "/signup")) {
//     return navigateTo("/");
//   }

//   // matchRoutes(secureRoutes, to.path);

//   if (!isLoggedIn.value && matchRoutes(secureRoutes, to.path)) {
//     return navigateTo("/");
//   }

//   // if (isLoggedIn.value && (to.path === "/login" || to.path === "/signup")) {
//   //   return navigateTo("/");
//   // }
// });
