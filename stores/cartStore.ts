import type { CreateCartItemInput, BuyNowInput } from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartId: "",
    cartCount: 0,
    cartItems: [],
    loading: false,
    total: 0,
    priceAfterDiscount: 0,
    discountAmount: 0,
    vatAmount: 0,
    vat: 0,
    coupon: "",
    sessionId: null,
    checkoutAvailable: null,
    netPrice: 0,
  }),

  actions: {
    async getCart() {
      this.loading = true;
      const { data, status } = await useAsyncData("getCart", () =>
        GqlGetCart()
      );
      if (!data?.value)
        return useAlert({
          type: "error",
          message: "Failed to load cart details",
        });
      const { data: cart, message, success } = data?.value?.getCart as response;
      if (success) {
        this.cartItems = cart.cartItems;
        this.cartCount = cart.cartItems.length;
        this.total = cart?.totalPrice;
        this.priceAfterDiscount = cart.totalPriceAfterDiscount;
        this.discountAmount = cart.discountAmount;
        this.vatAmount = cart?.vatAmount;
        this.vat = cart?.vat;
        this.coupon = cart.lastAppliedCoupon;
        this.cartId = cart?.id;
        this.checkoutAvailable = cart?.checkoutAvailable;
        this.netPrice = cart?.netPrice;
      }

      // watch(status, () => {
      //   if (status.value === "success") {
      //     const {
      //       data: cart,
      //       message,
      //       success,
      //     } = data?.value?.getCart as response;
      //     if (success) {
      //       this.cartItems = cart.cartItems;
      //       this.cartCount = cart.cartItems.length;
      //       this.total = cart?.totalPrice;
      //       this.priceAfterDiscount = cart.totalPriceAfterDiscount;
      //       this.discountAmount = cart.discountAmount;
      //       this.vatAmount = cart?.vatAmount;
      //       this.coupon = cart.lastAppliedCoupon;
      //       this.cartId = cart?.id;
      //       this.checkoutAvailable = cart?.checkoutAvailable;
      //       this.netPrice = cart?.netPrice;
      //     }
      //   }
      // });

      this.loading = false;
    },

    async addToCart(input: CreateCartItemInput) {
      const { data } = await useAsyncData(
        `addItemToCart-${Math.random() * 100}`,
        () => GqlCreateCartItem({ input })
      );
      const { message, success } = data?.value?.createCartItem as response;
      if (success) this.cartCount += 1;
      return { message, success };
    },

    async removeCartItem(cartItemId: string) {
      const { data } = await useAsyncData(
        `removeItem-${Math.random() * 100}`,
        () => GqlDeleteCardItem({ cartItemId })
      );
      const { message, success } = data?.value?.deleteCardItem as response;
      if (success) this.cartCount -= 1;
      return { message, success };
    },

    async checkout() {
      const localPath = useLocalePath();
      const { userAgent } = useDevice();
      // console.log("ios", isIos);
      const { data } = await useAsyncData("checkout", () =>
        GqlCreatePaymentIntent({ coupon_code: this.coupon })
      );
      const {
        data: sessionDetails,
        message,
        success,
      } = data?.value?.createPaymentIntent as response;
      if (!success) return useAlert({ type: "error", message });
      if (!sessionDetails) return;
      const { paymentIntentId, paymentLink } = sessionDetails;
      if (!paymentIntentId)
        return navigateTo(
          localPath(
            `/success?code=${data?.value?.createPaymentIntent?.data?.transactionCode}`
          )
        );
      // navigateTo(paymentLink, { external: true });
      !userAgent.includes("Chrome")
        ? navigateTo(paymentLink, { external: true })
        : navigateTo(paymentLink, {
            external: true,
            open: { target: "_blank" },
          });
      refreshNuxtData();
      // window.open(paymentLink);
      // this.sessionId = paymentIntentId;
      // useGeidea(sessionId?.paymentIntentId, "checkout-tag");
      // const { data } = await useAsyncData("checkout", () =>
      //   GqlCreateCheckOut({ coupon_code: this.coupon })
      // );
      // const {
      //   data: checkoutSessionUrl,
      //   message,
      //   success,
      // } = data?.value?.createCheckOut as response;
      // if (!success) return; //TODO: handle fail msg
      // navigateTo(checkoutSessionUrl, { external: true });
      return { success };
    },

    async buyNow(input: BuyNowInput) {
      const localPath = useLocalePath();
      const { userAgent } = useDevice();
      const { data } = await useAsyncData(`buyNow-${Math.random() * 100}`, () =>
        GqlBuyNow({ input })
      );
      const {
        data: sessionDetails,
        message,
        success,
      } = data?.value?.buyNow as response;
      if (!success) return useAlert({ type: "error", message });
      const { paymentIntentId, paymentLink } = sessionDetails;
      this.coupon = "";
      if (!paymentIntentId) {
        return navigateTo(
          localPath(
            `/success?code=${data?.value?.buyNow?.data?.transactionCode}`
          )
        );
      }
      const nuxtDataKey =
        input?.programType === "DIPLOMA"
          ? `getTrack-${input?.programId}`
          : `getProgram-${input?.programId}`;
      refreshNuxtData(nuxtDataKey);
      // window.open(paymentLink);
      !userAgent.includes("Chrome")
        ? navigateTo(paymentLink, { external: true })
        : navigateTo(paymentLink, {
            external: true,
            open: { target: "_blank" },
          });
    },

    async applyCoupon(couponCode: string, inCart: boolean = true) {
      const { data: coupon } = await useAsyncData(
        `apply-coupon-${Math.random() * 100}`,
        () => GqlApplyCoupon({ coupon_code: couponCode })
      );
      const { data, message, success } = coupon?.value?.applyCoupon as response;
      if (success && inCart) {
        this.coupon = couponCode;
        this.discountAmount = data?.discountAmount;
        this.priceAfterDiscount = this.total - this.discountAmount;
      }
      return { data, message, success };
    },

    async deleteCoupon() {
      const { data: removeCoupon } = await useAsyncData(
        `delete-coupon-${Math.random() * 100}`,
        () => GqlCancelCoupon()
      );
      const { data, message, success } = removeCoupon?.value
        ?.cancelCoupon as response;
      if (success) {
        this.coupon = "";
        this.discountAmount = 0;
        this.priceAfterDiscount = this.total;
      }
      return { data, message, success };
    },

    incrementCartCount() {
      this.cartCount += 1;
    },

    decrementCartCount() {
      this.cartCount -= 1;
    },
  },
});
