<template lang="pug">
    div
        label.form-label(class="text-[14px] font-400") {{ label }} {{ optional ? '(Optional)' : '' }}
        Multiselect(v-model="value" :options="options" :class="{ 'border-danger': errorMessage }" :searchable="false" :show-labels="false" :placeholder :multiple)
            template(v-slot:singleLabel="{ option }") 
                p {{ option?.label }}
            template(v-slot:option="{ option }") 
                p {{ option?.label }}
        p(class="text-[12px] text-red-700") {{ errorMessage }}
</template>

<script setup lang="ts">
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

interface option {
  label: string;
  value: string | number | undefined;
}

const props = defineProps<{
  options: option[];
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  emptyText?: string;
  optional: boolean;
}>();

const name = toRef(props, "name");
const value = ref();

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

watch(value, () => (inputValue.value = value.value.value));
</script>

<style lang="scss">
.border-danger {
  .multiselect__tags {
    border: 1px solid #b91c1c;
  }
}

.multiselect__tags {
  border-radius: 11px;
  padding: 12px 12px !important;
  //   padding-bottom: 0 !important;
  border: 1px solid #c1bcb7;
}

.multiselect__input {
  margin: 0;
}

.multiselect__placeholder {
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  color: #7f7b76;
  margin: 0;
}

.multiselect__select::before {
  top: 75%;
}

.multiselect__option--highlight {
  background: #76003e;
}

/* .multiselect__content-wrapper {
  margin-top: 10px;
  border-radius: 11px !important;
} */

.multiselect__single {
  margin: 0;
  color: black;
}

.multiselect--active {
  border-radius: 11px !important;
  background: red;
}
</style>
