<template lang="pug">
    label.form-label(class="text-[14px] font-400") {{ label }} {{ optional ? '(Optional)' : '' }}

    .grid.grid-cols-4.gap-2
      .textInput.relative.col-span-3.w-full(class="bg-white rounded-2 flex items-center px-[12px]" :class="{ 'border': hasBorder }")
          slot(name="prefix")
          input(:type=" showPassword ? 'text' : type " :name :placeholder :disabled :value="inputValue" 
                  class="form-control focus:outline-none disabled:bg-white py-[11px] px-[16px] w-full border-[#C1BCB7] rounded-3 placeholder:text-[#7F7B76] placeholder:font-300 placeholder:text-[14px] placeholder:lh-lg" 
                  :class="{ 'is-invalid': meta.touched && meta.invalid, 'is-light': appDir === 'rtl',  'border-red-700 ': errorMessage }"
                  @blur="handleBlur" @input="handleChange" @change="handleChange" 
                  :style="{ direction: appDir }")

          IconEye.fs-md.textInput-password(class="absolute cursor-pointer" :class="{ 'top-[47%]': errorMessage, 'top-[57%]': !errorMessage }" :style="appDir === 'rtl' ? 'left: .5em;': 'right: .5em;'" :name="showPassword ? 'ri:eye-line': 'ri:eye-off-line'"  v-if="type === 'password' " @click="showPassword = !showPassword")
      slot(name="actions")
    p.invalid-feedback.d-block.fs-2xs(v-show='errorMessage' class="text-[12px] text-red-700")
      | {{ errorMessage }}
        
    </template>

<script setup lang="ts">
const showPassword = ref(false);
const { locale, t } = useI18n();
const test = ref();
const appDir = locale.value === "ar" ? "rtl" : "ltr";
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  auto: {
    type: Boolean,
    default: false,
  },
  optional: {
    type: Boolean,
    default: false,
  },
  hasBorder: {
    type: Boolean,
    default: false,
  },
});
// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

watch(
  () => inputValue.value,
  (newValue) => {
    // console.log('newValue', props.type)
    if (props.type === "password") {
      // console.log(inputValue.value &&
      // (inputValue.value = inputValue.value.replace(" ", "")))
      inputValue.value &&
        (inputValue.value = inputValue.value.replace(" ", ""));
    }
  }
);
</script>

<style lang="scss" scoped></style>
