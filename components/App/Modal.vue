<template lang="pug">
      .fixed.top-0.bottom-0.right-0.left-0.flex.items-center.justify-between(v-if="model" class="bg-black/50 z-[9999]" @click.self="!blockCloseOnUnFocus ? model=false : null" :class="[mainContainerStyle]")
          transition(:name=" scrollTopBottomOnMobile ? 'slide-vertical' : 'fade'" appear)
            dialog(class="rounded-[16px] bg-white border" :class="[dialogStyle, { 'fixed bottom-0 left-0 right-0 m-0 w-auto h-[80%] rounded-bl-0 rounded-br-0 overflow-y-scroll': scrollTopBottomOnMobile }]"  :open="model")
                slot(name="header-container")
                  .flex.items-start.justify-between(class="p-[24px]" v-if="title || showClose")
                      slot(name="header")
                          p(class="label-prominent-1 md:heading-6") {{ title }}
                      button(@click="model = false"): IconClose(v-if="showClose" class="shrink-0 text-[#76003E]")

                div(class="py-[12px] px-[24px] h-auto max-w-[100%]" :class="[customStyle]")
                    slot

                slot(name="footer-container")
                  .flex.items-center.justify-end(class="p-[24px]" v-if="showActions")
                    slot(name="footer" v-if="showActions")
                        button.btn.btn-secondary(type="button") {{ cancelText || t('cancel') }}
                        button.btn.btn-primary(type="button") {{ saveText || t('save') }}
</template>

<script setup lang="ts">
const model = defineModel();
const { t, locale } = useI18n();

const props = withDefaults(
  defineProps<{
    title?: string;
    cancelText?: string;
    saveText?: string;
    showClose?: boolean;
    showActions: boolean;
    customStyle: string;
    mainContainerStyle?: string;
    dialogStyle?: string;
    blockCloseOnUnFocus?: boolean;
    scrollTopBottomOnMobile: boolean;
  }>(),
  {
    showClose: true,
    showActions: true,
    customStyle: "md:min-w-[520px]",
  },
);
const emit = defineEmits(["save", "cancel", "close"]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-vertical-enter-active,
.slide-vertical-leave-active {
  transition: all 0.4s ease;
}

.slide-vertical-enter-from {
  transform: translateY(100%);
}
.slide-vertical-enter-to {
  transform: translateY(0);
}

.slide-vertical-leave-from {
  transform: translateY(0);
}
.slide-vertical-leave-to {
  transform: translateY(100%);
}
</style>
