export default defineNuxtPlugin(() => {
  const ensureGoogleLoaded = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        return resolve();
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = (err) => {
        reject("Failed to load Google Script");
      };

      document.head.appendChild(script);
    });
  };

  const initGooglePopup = async (callback: (response: any) => void) => {
    try {
      await ensureGoogleLoaded();

      if (!window.google) {
        console.error("Google SDK failed to initialize");
        return;
      }

      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: "316810365714-hvdkh78j762pg78m41259q2b7o5kqhuo.apps.googleusercontent.com",
        scope: "openid email profile",
        ux_mode: "popup",
        callback: (response: any) => {
          callback(response);
        },
      });

      return client;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    provide: { initGooglePopup },
  };
});
