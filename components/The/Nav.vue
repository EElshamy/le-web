<template lang="pug">
div(class="theHeader" :class="{'is-scrolling-bottom':isDown, 'is-fixed-header':isFixed}")
  div(class="theHeader-spacing relative z-1 " :class="{ 'f-h-64-88': isValidUrlForHeader }")
  div(class="theHeader-container z-100 transition-all  f-h-64-88 flex items-center bg-white" :class="{ 'fixed top-0 start-0 end-0': isValidUrlForHeader }")
      .app-container
          .flex.items-center.justify-between
              NuxtLink(:to="localePath('/')" class="block lg:hidden f-w-100-126"): TheLogo
              .items-center(class="hidden lg:flex f-gap-12-32")
                .items-center.gap-7.cursor-pointer(class="hidden flex-col lg:flex-row lg:flex f-w-100-126" @click="navigateTo(localePath('/'))" )
                    TheLogo

                ul.flex.items-center.text-primary(class="flex-col lg:flex-row f-gap-12-32")
                    li: NuxtLink(:to="localePath('/courses')" class="w-fit" prefetch-on="interaction") {{ t('courses') }}
                    li: NuxtLink(:to="localePath('/programs')" class="w-fit" prefetch-on="interaction") {{ t('programs') }}
                    li: NuxtLink(:to="localePath('/paths')" class="w-fit" prefetch-on="interaction") {{ t('tracks') }}
                    li: NuxtLink(:to="localePath('/live-workshops')" class="w-fit" prefetch-on="interaction") {{ t('liveWorkshops') }}
                    li: NuxtLink(:to="localePath('/subscriptions')" class="w-fit" prefetch-on="interaction") {{ t('subscriptions') }}
                    li: NuxtLink(:to="localePath('/blogs')" class="w-fit" prefetch-on="interaction") {{ t('blogs') }}

              .flex.items-center.gap-7.relative
                  //- transition(name="slide-horizontal")
                    input(type="text" v-if="viewSearch" class="hidden border xl:block bg-white text-[#5D5A57] py-[12px] px-5 rounded-3 min-w-[340px] focus:outline-none placeholder:lh-xl lh-lg" :placeholder="t('searchLearningPrograms')")

                  .flex.items-center(class="gap-6 lg:gap-4")
                      transition(name="slide-leave")
                        button(@click="searchPopup = true"): IconSearch(class="text-[#76003E]")
                      button(@click="handleSwitchLocale" class="hidden lg:block"): IconLang
                      NuxtLink(:to="localePath('/cart')" class="relative" v-if="isLoggedIn" prefetch-on="interaction")
                        IconShoppingCart(class="text-[#76003E]")
                        div(class="absolute flex items-center justify-center text-white top-[-4px] left-[16px] size-[16px] bg-secondary rounded-full" v-if="user?.cartItemsCount || cartCount")
                          span(class="text-[10px] font-[400]") {{ cartCount || user?.cartItemsCount }}
                      //- pre {{showNotifications}}
                      div.relative.items-center(v-if="isLoggedIn" class="hidden lg:block")
                        button.flex.items-center(@click="showNotifications = !showNotifications" ref="notificationBtnRef")
                          IconBell(class="shrink-0 fill-none text-primary")
                          div(class="absolute flex items-center justify-center text-white top-[-4px] left-[16px] size-[16px] bg-secondary rounded-full" v-if="user?.notificationsCount")
                            span(class="text-[10px] font-[400]") {{ user?.notificationsCount }}
                        NotificationsModal(v-if="showNotifications" ref="menuRef" @close="showNotifications = false")
                      button(class="lg:hidden" @click="openMenu = true"): IconMenu(class="text-primary size-[28px]")

                      .items-center.gap-3(class="hidden lg:flex" v-if="!isLoggedIn")
                          //- button.btn-link.text-primary(@click="navigateTo(localePath('/login'))") {{ t('register') }}
                          button.btn-primary(@click="navigateTo(localePath('/signup'))" prefetch-on="interaction") {{ t('signupNow') }}

                      div(v-else class="hidden lg:block")
                        AppProfileAvatar(:label="locale === 'en' ? user?.enFullName : user?.arFullName" :src="user?.profilePicture" :showLabel="false" bgColor="#FF5552" textColor="white" :showMenu="true")
  transition(name="overlay")
    AppMobileMenu(v-if="openMenu && width < 1024" @close="openMenu = false")
  SearchModal(v-model="searchPopup" v-if="searchPopup" @close="searchPopup = false")
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { useScroll } from "@vueuse/core";
const notificationBtnRef = ref(null);
const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { width } = useWindowSize();
const { y } = useWindowScroll();
const switchLocalePath = useSwitchLocalePath();
const viewSearch = ref<boolean>(false);
const userStore = useUserStore();
const cartStore = useCartStore();
const { isLoggedIn, user } = storeToRefs(userStore);
const { cartCount } = storeToRefs(cartStore);
const openMenu = ref<boolean>(false);
const showNotifications = ref<boolean>(false);
const searchPopup = ref<boolean>(false);
const menuRef = ref<HTMLElement | null>(null);
const { getImageUrl } = usePhoto();

const handleSwitchLocale = function () {
  locale.value === "en" ? setLocale("ar") : setLocale("en");
  locale.value === "en"
    ? useGqlHeaders({ lang: `Eg-ar` })
    : useGqlHeaders({ lang: `Eg-en` });
};

const direction = computed(() => document?.dir || "ltr");
const transitionName = computed(() =>
  direction.value === "rtl" ? "slide-rtl" : "slide-ltr"
);

const isValidUrlForHeader = computed(() => {
  return !(route?.path?.includes("program") || route?.path?.includes("paths/"));
});

onClickOutside(menuRef, () => {
  showNotifications.value = false;
}, {
  ignore: [notificationBtnRef]
});

let isFixed = ref(false);
let isDown = ref(false);
if (process.client) {
  const { x, y, isScrolling, directions } = useScroll(window);
  const main = ref<HTMLElement | null>(null);
  const {
    left: toLeft,
    right: toRight,
    top: toTop,
    bottom: toBottom,
  } = toRefs(directions);
  const checkFixed = () => {
    if (y.value >= 100) {
      isFixed.value = true;
    } else {
      isFixed.value = false;
    }
    // console.log(toBottom.value);
    if (toBottom.value && y.value >= 100) {
      isDown.value = true;
    } else {
      isDown.value = false;
    }
  };

  onMounted(() => {
    checkFixed();
  });
  watch(
    () => y.value,
    (newValue, oldValue) => {
      // console.log(y.value);
      checkFixed();
    }
  );
}

watch(y, (newY) => {
  if (!showNotifications.value) return;
  showNotifications.value = false;
});

watch(
  () => showNotifications.value,
  (isOpen) => {
    if (!isOpen) return;
    if (!user.value) return;
    if (user.value.notificationsCount) {
      user.value.notificationsCount = 0;
    }
  }
);


</script>

<style scoped lang="scss">
.theHeader {
  &.is-scrolling-bottom {
    .theHeader-container {
      --at-apply: -translate-y-full;
    }
  }
  &.is-fixed-header {
    .theHeader-container {
      --at-apply: shadow-sm shadow-primary/10;
    }
  }
}

.slide-horizontal-enter-active,
.slide-horizontal-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-horizontal-enter-from {
  transform: translateX(-20%);
  opacity: 0;
}
.slide-horizontal-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-horizontal-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-horizontal-leave-to {
  transform: translateX(-20%);
  opacity: 0;
}

.slide-leave-active {
  transition: all 0.3s ease;
  position: absolute; /* Optional: smoother layout shifts */
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px); /* slide down */
}

.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px); /* slide up on enter */
}

.slide-ltr-enter-active,
.slide-ltr-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-ltr-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-ltr-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-ltr-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-ltr-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* RTL animation */
.slide-rtl-enter-active,
.slide-rtl-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-rtl-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-rtl-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-rtl-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-rtl-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
