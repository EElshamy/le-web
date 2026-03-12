<template>
  <!-- Multi-line text skeleton -->
  <div v-if="isTextVariant" class="space-y-2">
    <div
      v-for="(line, index) in props.lines"
      :key="index"
      :class="[
        'skeleton-shimmer h-4',
        roundedClass,
        index === props.lines - 1 ? 'w-3/4' : 'w-full',
      ]"
    />
  </div>

  <!-- Single skeleton element -->
  <div
    v-else
    :class="['skeleton-shimmer', roundedClass, sizeClass, customClass]"
    :style="customStyle"
  />
</template>

<script setup lang="ts">
interface Props {
  /**
   * Predefined skeleton variants
   */
  variant?:
    | "text"
    | "title"
    | "avatar"
    | "button"
    | "card"
    | "image"
    | "custom";
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Border radius variant
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Number of lines for text variant
   */
  lines?: number;
  /**
   * Custom CSS classes
   */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "custom",
  rounded: "md",
  lines: 1,
  class: "",
});

// Multi-line skeleton for text variant
const isTextVariant = computed(
  () => props.variant === "text" && props.lines > 1
);

const roundedClass = computed(() => {
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-2",
    md: "rounded-3",
    lg: "rounded-4",
    xl: "rounded-5",
    full: "rounded-full",
  };
  return roundedMap[props.rounded];
});

const sizeClass = computed(() => {
  const variantMap = {
    text: "h-4 w-full",
    title: "h-6 w-3/4",
    avatar: "h-10 w-10",
    button: "h-10 w-24",
    card: "h-48 w-full",
    image: "h-32 w-full aspect-video",
    custom: "",
  };
  return variantMap[props.variant];
});

const customClass = computed(() => props.class);

const customStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.width) {
    style.width =
      typeof props.width === "number" ? `${props.width}px` : props.width;
  }

  if (props.height) {
    style.height =
      typeof props.height === "number" ? `${props.height}px` : props.height;
  }

  return style;
});
</script>
