import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Use the config you provided
  const firebaseConfig = {
    apiKey: "AIzaSyCFWV2s6ltSaWHAIvr5J_DlXTG-yKlCm9U",
    authDomain: "leiaqa-deb6a.firebaseapp.com",
    databaseURL: "https://leiaqa-deb6a-default-rtdb.firebaseio.com",
    projectId: "leiaqa-deb6a",
    storageBucket: "leiaqa-deb6a.firebasestorage.app",
    messagingSenderId: "1566929271",
    appId: "1:1566929271:web:dd0fdfd8fcba14311ef172",
    measurementId: "G-SK305DE6NH",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const fireStore = getFirestore(app);

  // Provide to the app
  return {
    provide: {
      fbAuth: auth,
      db: fireStore,
    },
  };
});
