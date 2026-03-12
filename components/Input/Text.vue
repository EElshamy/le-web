<template lang="pug">
  div
    .textInput.relative
      label.form-label(class="text-[14px] font-400") {{ label }} {{ optional ? '(Optional)' : '' }}
      textarea(v-if="type === 'textarea'" :rows="rows" :name :placeholder :disabled :value="inputValue" class="form-control label-3 focus:outline-none  py-[14px] px-[16px] border-1 w-full border-[#C1BCB7] rounded-3 placeholder:text-[#7F7B76] placeholder:font-300 placeholder:text-[14px]" :class="{ 'is-invalid': meta.touched && meta.invalid, 'is-light': appDir === 'rtl',  'border-red-700 ': errorMessage }" @blur="handleBlur" @input="handleChange" @change="handleChange" :style="{ direction: appDir }")
      input(v-else :type=" showPassword ? 'text' : type " :name :placeholder :disabled :value="inputValue" dir="auto"
            class="form-control rtl:placeholder:text-end line-lg placeholder:line-lg selection:bg-primary selection:text-white label-3 focus:outline-none  py-[14px] px-[16px] border-1 w-full border-[#C1BCB7] rounded-3 placeholder:text-[#7F7B76] placeholder:font-300 placeholder:text-[14px]" 
            :class="{ 'is-invalid': meta.touched && meta.invalid, 'is-light': appDir === 'rtl',  '!border-red-700 ': errorMessage || customError, 'rtl:ps-[33px]': !isArabic && type === 'password', 'ltr:ps-[33px]': isArabic && type === 'password'}"
            @blur="handleBlur" @input="handleChange" @change="handleChange")
      slot(name="suffix")
        IconEye.fs-md.textInput-password(class="absolute cursor-pointer" :class="{ 'top-[57%]': !false }" :style="appDir === 'rtl' ? 'left: .5em;': 'right: .5em;'" :name="showPassword ? 'ri:eye-line': 'ri:eye-off-line'"  v-if="type === 'password' " @click="showPassword = !showPassword")

    p.invalid-feedback.d-block.fs-2xs(v-show='errorMessage || customError' class="text-[12px] m-0 text-red-700")
      | {{ errorMessage || customError }}
    
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
  rows: {
    type: Number,
    default: 3,
  },
  customError: {
    required: false,
    type: String,
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

const isArabic = computed(() => /[\u0600-\u06FF]/.test(inputValue.value));

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

<style lang="scss" scoped>
.change-dir {
  direction: ltr !important;
}
</style>
