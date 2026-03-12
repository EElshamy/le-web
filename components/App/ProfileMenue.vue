<template lang="pug">
    .absolute(class="left-0 mt-2")
        div(class='w-[300px] h-[292px] flex flex-col bg-white border rounded-[8px] shadow-sm')
            AppProfileAvatar(label="text" bgColor="red")
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
</script>

<style scoped></style>
