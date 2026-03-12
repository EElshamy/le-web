import { defineStore } from "pinia";
import type { User, UpdateProfileInput } from "@/types/auth";

const AUTH_ERRORS = {
  USER_NOT_VERIFIED: 5076,
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    token: useCookie("gql:default"),
    previousUrl: "/",
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
    fullName: (state) =>
      `${state.user?.firstName || ""} ${state.user?.lastName || ""}`.trim(),
  },

  actions: {
    setData(userData: any, mutateToken: boolean = true) {
      this.user = {
        ...userData,
        arFullName: `${userData.arFullName || ""}`,
        enFullName: `${userData.enFullName || ""}`,
      };

      console.log("Setting user data:", userData?.token);
      if (mutateToken && userData?.token) {
        this.token = userData.token;
        useGqlToken(userData.token);
      }
    },

    clearData() {
      this.user = null;
      this.token = null;
      useGqlToken(null);
      const cookie = useCookie("gql:default");
      cookie.value = null;
    },

    setUrl(url: string) {
      this.previousUrl = url;
    },

    updateUsername(values: UpdateProfileInput) {
      if (!this.user) return;
      this.user = {
        ...this.user,
        firstName: values.firstName,
        lastName: values.lastName,
        arFullName:
          `${values.arFirstName || ""} ${values.arLastName || ""}`.trim(),
        enFullName: `${values.firstName || ""} ${values.lastName || ""}`.trim(),
      };
    },

    updateUserEmail(email: string) {
      if (this.user) this.user.email = email;
    },

    updateUserProfilePicture(picture: string | null) {
      if (this.user) this.user.profilePicture = picture;
    },

    async fetchMe() {
      if (!this.token) {
        this.clearData();
        return { success: false };
      }

      try {
        const res = await GqlMe();
        const { data, message, success, code } = res?.me || {};

        if (success && data) {
          this.setData(data, false);
        } else {
          if (code === AUTH_ERRORS.USER_NOT_VERIFIED) {
            useAlert({
              type: "error",
              message: message || "Account not verified",
            });
          } else {
            this.clearData();
          }
        }
        return { success, code };
      } catch (err) {
        console.error("FetchMe Error:", err);
        this.clearData();
        return { success: false };
      }
    },
  },
});
