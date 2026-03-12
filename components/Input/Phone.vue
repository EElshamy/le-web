<template lang="pug">
    .textInput
      label.form-label(:for='name' class="text-[14px] font-400") {{ label }}
      ClientOnly
        vue-tel-input.form-control(
          v-model="phoneNumber"
          :value="inputValue"
          :inputOptions="{type : 'tel' , inputmode:'tel', placeholder : t('phoneNumberPlaceholder')}"
          :dropdownOptions="{showDialCodeInList:true,showFlags:true,}"
          @validate="validatecode"
          :validCharactersOnly="true"
          mode="international"
          @input="handleChange" @blur="handleBlur"
          :class="{ 'form-control rounded-pill': true, '!border-red-700': errorMessage, valid: meta.valid }"
          defaultCountry="EG")
      p.invalid-feedback.d-block.fs-2xs(class="text-[12px] text-red-700") {{ errorMessage }}

</template>

<script setup lang="ts">
import { object } from "yup";
const { t, tm, rt, locale } = useI18n();

const phoneNumber = ref();
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
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  mask: {
    type: String,
    default: "",
  },
  labelStyle: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["validphone"]);
const name = toRef(props, "name");
const validphone = ref(true);
const errorPhone = ref("");

const validPhone = ref(true);

function validatecode(event, submit) {
  if (event) {
    validPhone.value = event.valid;
    emit("validphone", validPhone.value);
  }
}


const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

phoneNumber.value = inputValue.value;
</script>

<style lang="scss">
[dir="ltr"] {
  .vti__input,
  .vti__dropdown {
    border-radius: 12px !important;
    text-align: start;
    /* margin-left: 0; */
  }

  .vti__input::placeholder {
    font-size: 14px;
    font-weight: 300;
    text-align: start;
  }
}

.vue-tel-input {
  border-radius: 12px !important;
  height: 45px !important;
  border: 1px solid #c1bcb7;
  &:focus-within {
    border-color: #76003e !important;
    box-shadow: none !important;
  }
}

.vti__input,
.vti__dropdown {
  border-radius: 12px !important;
  text-align: end;
  /* margin-right: 14px; */
}

.vti__dropdown-list {
  border-radius: 8px !important;
  widows: 56px !important;
}

.vti__input::placeholder {
  font-size: 14px;
  font-weight: 300;
  text-align: end;
}
</style>
