export default defineNuxtPlugin(() => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && !window.GeideaCheckout) {
      const script = document.createElement("script");
      script.src = "https://www.merchant.geidea.net/hpp/geideaCheckout.min.js";
      script.async = true;
      script.onload = () => {
        console.log("[Geidea SDK] loaded successfully");
        resolve();
      };
      script.onerror = () => {
        console.error("[Geidea SDK] failed to load");
        reject();
      };
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
});

// export default defineNuxtPlugin((nuxtApp) => {
//   const loadGeidea = () => {
//     return new Promise<void>((resolve, reject) => {
//       if (typeof window !== "undefined" && !window.GeideaCheckout) {
//         const script = document.createElement("script");
//         script.src = "https://www.merchant.geidea.net/hpp/geideaCheckout.min.js";
//         script.async = true;
//         script.onload = () => {
//           console.log("[Geidea SDK] loaded successfully");
//           resolve();
//         };
//         script.onerror = () => {
//           console.error("[Geidea SDK] failed to load");
//           reject();
//         };
//         document.head.appendChild(script);
//       } else {
//         resolve();
//       }
//     });
//   };

//   // Expose it to `useNuxtApp().$loadGeidea()`
//   nuxtApp.provide("loadGeidea", loadGeidea);
// });
