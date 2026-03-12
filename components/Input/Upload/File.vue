<template lang="pug">
    div 
        label.label-prominent-3 {{ label }}
        p.label-4(class="mt-[8px]") {{ tip }}
        label(for="uploader" class="flex mt-[8px] cursor-pointer items-center justify-center border border-dashed rounded-[8px] border-[#C1BCB7]" :class="{ '!border-red-700': errorMessage }") 
            .flex.flex-col.gap-3.items-center(class="py-[20px]" v-if="!loading")
                IconUpload
                p.label-prominent-4.text-primary {{ content }}
                .flex.items-center(class="gap-[8px]") 
                    p.label-4.text-neutral-600 {{ t('maxSize') }}: #[span.text-black {{ maxSizeInMb + 'MB' }}]
                    div(class="size-[2px] rounded-full bg-primary")
                    p.label-4.text-neutral-600 {{ t('formats') }}: #[span.text-black {{ formats?.join(', ') }}]
            div(v-else class="py-[20px] flex items-center justify-center h-[118px]") 
              IconLoading(class="text-primary shrink-0 size-[40px]")
    input(type="file" id="uploader" ref="uploaderInput" class='hidden' :formats @change="handleFileSelect" :disabled="selectedFiles?.length")

    transition-group(name="slide" tag="div")
      .flex.flex-col.gap-2(v-if="selectedFiles?.length")
          template(v-for="file, idx in selectedFiles")  
              .flex.justify-between.items-center(class="bg-[#F8F5F3] rounded-[8px] p-[12px] border-[#DEDAD6]") 
                  .flex.items-center.gap-3
                      div(class="max-w-[40px] max-h-[40px] overflow-hidden rounded-[4px] aspect-[3/3]")
                          NuxtImg(:src="getImageUrl(file)" placeholder placeholder-class="custom" format="webp" :alt="`img-${idx}`" class="w-full h-full object-cover")
                      .flex.flex-col.gap-2 
                          p.label-prominent-3.line-clamp-1 {{ file?.split('/')[1] }}
                          //- .flex.items-center(class="gap-[8px]") 
                              span.text-black.label-4 {{ maxSizeInMb + 'MB' }}
                              div(class="size-[2px] rounded-full bg-primary")
                              span.text-black.label-4 PDF
                  button(type="button" @click="handleRemoveFile(file)"): IconX
    p(class="text-[12px] text-red-700") {{ errorMessage }}
</template>

<script setup lang="ts">
import { FileModelEnum } from "#gql/default";

const { t, locale } = useI18n();
const { uploadFile } = useUpload();
const { getImageUrl } = usePhoto();
const config = useRuntimeConfig();
const loading = ref<boolean>(false);
const uploaderInput = ref();

const props = defineProps<{
  label: string;
  name: string;
  value?: [];
  maxSizeInMb: number;
  formats: string[];
  tip?: string;
  optional?: boolean;
  content?: string;
  multiple?: boolean;
  useCase: FileModelEnum;
}>();

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

const selectedFiles = ref<string[]>([]);

const handleFileSelect = async function (e: Event) {
  if (selectedFiles.value.length) return;
  const input = e.target as HTMLInputElement;
  const filesAsArray = Array.from(input?.files || []);
  loading.value = true;
  const { data, message, success } = await uploadFile(
    props.useCase,
    filesAsArray[0]
  );
  loading.value = false;
  if (success) selectedFiles.value = [...selectedFiles.value, data];
};

const handleRemoveFile = function (fileName: string) {
  uploaderInput.value.value = "";
  return (selectedFiles.value = selectedFiles.value?.filter(
    (file: string) => file !== fileName
  ));
};

watch(selectedFiles, () => (inputValue.value = selectedFiles.value as []));
</script>

<style scoped>
.slide-enter-from {
  transform: translateX(10%);
  position: absolute;
  opacity: 0;
}
.slide-enter-active {
  transition: all 0.2s ease;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-leave-to {
  position: absolute;
  transform: translateY(10%);
  opacity: 0;
}

.custom {
  border-radius: 8px;
  widows: 40px;
  height: 40px;
  background-color: gray;
}
</style>
