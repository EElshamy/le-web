<template lang="pug">
    .flex.items-center(class="flex-wrap")
        template(v-for="lecturer, idx in lecturers?.slice(0, 3)" v-if="!userInsideLecturer")
            NuxtLink(:class="{ 'rtl:me-[-20px]': lecturers?.length > 1, 'ltr:ms-[-20px]': lecturers?.length > 1 && idx > 0 }" :to="lecturers?.length === 1 ? localePath(`/lecturers/${slugify(lecturer?.slug)}`) : null"): AppAvatar(:src="getImageUrl(lecturer?.profilePicture)" avatarClass="border-2 border-[#F8F5F3]" class="size-[32px]" :label="lecturers?.length === 1 ? locale === 'en' ? lecturer?.enFullName : lecturer?.arFullName : null")
        div(class="size-[29px] bg-secondary rtl:ms-[-3px] ltr:ms-[-21px] cursor-pointer label-4 flex items-center text-white justify-center rounded-full z-1" @click="handleScrollToBottom" v-if="lecturers?.length > 3")
            p +{{ lecturers?.length - 3 }}
</template>

<script setup lang="ts">
const props = defineProps<{
  lecturers?: any;
  userInsideLecturer?: boolean;
}>();

const emit = defineEmits(["scrollToLecturers"]);

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getImageUrl } = usePhoto();
const { slugify } = useSeo();

const handleScrollToBottom = function () {
  emit("scrollToLecturers");
};
</script>

<style scoped></style>
