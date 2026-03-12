// https://firebase.google.com/docs/cloud-messaging/get-started?platform=web#web_2
// import { getMessaging, getToken } from "firebase/messaging";

// const fcmToken = ref<string | null>(null);
export const useGetFcmToken = function () {
//   // Get registration token. Initially this makes a network call, once retrieved
//   // subsequent calls to getToken will return from cache.
//   if (fcmToken.value) return { fcmToken };
//   if (!process.client) return { fcmToken };
//   const messaging = getMessaging();
//   getToken(messaging, {
//     vapidKey:
//       "BEW4MFOXw_XoKSxFHEQMZ-hYDhU8MbR5cPad73-e9g50dlFMk-5qomcz0UEavgh7KhKuhzmR0ExR7g1a7vF0k-M",
//   })
//     .then((currentToken) => {
//       if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         // ...
//         fcmToken.value = currentToken;
//       } else {
//         // Show permission request UI
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//         // ...
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//       // ...
//     });

//   return { fcmToken };
};
