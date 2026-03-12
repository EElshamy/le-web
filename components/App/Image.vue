<template lang="pug">
    .appImage(:style="stylePadding" class="relative overflow-hidden" )
      NuxtImg.appImage-img(class="hover:scale-105 object-cover" format="webp" quality="60" ef="image" @load="loaded = true, $emit('load')" placeholder placeholder-class="shimmer-animation" :loading="imgLoading" :preload :fetchpriority :class="{'border-2 border-red-600': false}"  :loaded="loaded"  :src="src"  v-if="src" :alt="alt" v-bind="$attrs"  :fit="fit" :modifiers="{ b: '#00000000' }")
      //- m-[10px] px-3 rounded-[8px]
      //- div(class="absolute flex items-center gap-2 justify-center top-0 w-fit px-5 py-1 text-white bg-red-600 rtl:rounded-tr-[8px] rtl:rounded-bl-[8px] ltr:rounded-tl-[8px] ltr:rounded-br-[8px]" v-if="live") 
        div(class="size-[8px] bg-white rounded-full")
        p.label-3 {{ t('live') }}
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const props = defineProps({
  src: {
    type: String,
    default: `/default.jpg`,
  },
  alt: {
    type: String,
  },
  ratio: {
    type: String,
    default: "1-1",
  },
  fit: {
    type: String,
    default: "cover",
  },
  live: {
    type: Boolean,
  },
  preload: {
    type: Boolean,
    default: false,
  },
  fetchpriority: {
    type: String,
    default: "",
  },
  imgLoading: {
    type: String,
    default: "eager",
  },
});

const emit = defineEmits(["load"]);

const stylePadding = computed(() => {
  if (props.ratio) {
    let r = props.ratio.split("-");
    let w = Number(r?.[0]);
    let h = Number(r?.[1]);
    let p = (h / w) * 100;
    return { paddingTop: p + "%" };
  }
});

const loaded = ref(true);
</script>

<style lang="scss">
.appImage {
  position: relative;
  // animation: shimmer 1.2s ease-in-out infinite;
  // height: 100%;
  width: 100%;
  transition: transform 0.2s ease-in-out;
  /* overflow: hidden; */

  &--ratio {
    &-full {
      padding-top: 0 !important;
      height: 100%;
      @apply min-h-40;
    }
  }

  &-bg {
    // background: $gray-400;
    @apply bg-neutral-200;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: 0.5s ease;
    z-index: 5;
    animation: shimmer 1.2s ease-in-out infinite;
    transform-origin: bottom;
  }

  &-img {
    opacity: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s ease;
    // background: $white;

    &[loaded="true"] {
      opacity: 1;

      ~ .appImage-bg {
        opacity: 0;
        animation: none;
      }
    }
  }

  &--fit {
    &-contain {
      img {
        object-fit: contain;
      }
    }
  }
}

@keyframes shimmer {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.shimmer-animation {
  animation: shimmer 1.3s infinite;
}

// @keyframes shimmer {
//   0% {
//     opacity: 100%;
//   }
//   5% {
//     opacity: 90%;
//   }
//   10% {
//     opacity: 80%;
//   }
//   20% {
//     opacity: 70%;
//   }
//   30% {
//     opacity: 60%;
//   }
//   40% {
//     opacity: 50%;
//   }
//   50% {
//     opacity: 40%;
//   }
//   60% {
//     opacity: 50%;
//   }
//   70% {
//     opacity: 60%;
//   }
//   80% {
//     opacity: 70%;
//   }
//   90% {
//     opacity: 80%;
//   }
//   100% {
//     opacity: 100%;
//   }
// }
</style>
