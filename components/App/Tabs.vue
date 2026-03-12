<template lang="pug">
    .flex.gap-5.overflow-scroll(class="scrollbar-hide" :class="{ 'flex-row 2xl:flex-col': isVertical }") 
        template(v-for="tab in tabs") 
            p.label-prominent-2.cursor-pointer.whitespace-nowrap(class="text-[#5D5A57] line-lg" :class="{ 'underline text-primary underline-offset-10': activeTab === tab.name }" @click="handleClick(tab)") {{ tab.label }}
</template>

<script setup lang="ts">
interface tab {
  label: string;
  name: string;
  disabled: boolean;
}
const emit = defineEmits(["change"]);

const route = useRoute();
const router = useRouter();
const activeTab = defineModel();

const props = defineProps<{
  tabs: tab[];
  isVertical?: boolean;
  customClass?: string;
}>();

const handleClick = function (tab: tab) {
  activeTab.value = tab.name;
  emit("change", tab.name);
};

watch(activeTab, () => {
  router.push({
    query: {
      ...route.query,
      tab: activeTab.value as string,
    },
  });
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
