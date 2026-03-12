<template lang="pug">
    .select-container.relative
        label(class="text-[14px] font-400") {{ label }}
        .input-container.relative.flex.items-center.justify-between.border.cursor-pointer(class="rounded-[6px] gap-3 px-[16px] py-[11px]" :class="[customClass]" @click="menu = !menu")
            .flex.items-center.gap-2 
                slot(name="prefix") 
                p(v-if="!selectedOptions.length" class="f-16-14 font-300") {{ placeholder || t('select') + ' ' + label }}
                .flex.items-center.gap-1(v-else) 
                    p.label-prominent-2 {{ selectedOptions[0].label }}
                    p(v-if="selectedOptions.length > 1") +{{ selectedOptions.length - 1  }}

            
            slot(name="suffix")
                IconDownArrow(class="transition duration-300 ease-in-out" :class="{ 'rotate-180': menu }")
        
        .absolute(class="top-12 mt-2 w-[272px] py-2 px-[4px] bg-white z-[9999] border rounded-[8px]" v-if="menu" ref="selectOptionsRef")  
            .flex.flex-col(v-if="options?.length")
                .flex.items-center.gap-3.cursor-pointer(v-for="option in options" class="py-[10px] px-[12px]")
                    input.cursor-pointer(type="checkbox" class="w-4 h-4 accent-primary" :id="option?.value" :checked="selectedOptions?.map((option) => option?.value)?.includes(option?.value)" @change="handleChange(option)")
                    label.label-3.cursor-pointer(:for="option?.value") {{ option?.label }}
            .flex.items-center.justify-center(v-else)
                p.label-3 {{ t('noOptions') }}
            
            button(@click="handleReset" class="px-[12px] py-2 label-3 text-primary disabled:opacity-50 disabled:cursor-not-allowed" :disabled="!selectedOptions?.length") {{ t('reset') }}



</template>

<script setup lang="ts">
interface option {
  label: string;
  value: string;
}

const props = defineProps<{
  options: option[];
  label?: string;
  customClass?: string;
  placeholder?: string;
  values?: (string | number)[];
}>();
const emit = defineEmits(["change"]);

const { t, locale } = useI18n();
const menu = ref<boolean>(false);
const selectedOptions = ref<option[]>(
  props.options?.filter((option: option) =>
    props.values?.includes(option?.value)
  ) || []
);
const selectOptionsRef = ref<HTMLElement | null>(null);

const handleChange = function (option: option) {
  const selectedOptionValues = selectedOptions.value.map(
    (option: option) => option?.value
  );

  const idx = selectedOptionValues.indexOf(option?.value);

  if (idx < 0) {
    selectedOptions.value.push(option);
    console.log(getValues());
    return emit("change", getValues());
  }

  selectedOptions.value?.splice(idx, 1);
  return emit("change", getValues());
};

const getValues = function () {
  return selectedOptions.value.map((option: option) => option.value);
};

const handleReset = function () {
  selectedOptions.value = [];
  emit("change", []);
};

onClickOutside(selectOptionsRef, () => {
  menu.value = false;
});

// watch(
//   selectedOptions,
//   () => {
//     const values = selectedOptions.value.map((option: option) => option.value);
//     emit("change", values);
//   },
//   { deep: true }
// );
</script>

<style scoped></style>
