<template lang="pug">
    AppModal(v-model="model" v-if="model"  customStyle="w-full lg:w-fit h-fit" :showActions="true" :blockCloseOnUnFocus="false")
        .flex.items-center.justify-center(class="p-[24px]")
            .flex.flex-col.gap-4.text-center.items-center
                IconGoogle(v-if="icon === 'Google'" class="size-[80px]") 
                IconFacebook(v-if="icon === 'Facebook'" class="size-[80px]") 
        .flex.flex-col.gap-5.items-center
            p.heading-6(class="max-w-[366px] text-center") {{ t('anAccountAlreadyUsesThisEmailAddress') }}
            p.body-3(class="max-w-[366px] text-center") {{ t('youAlreadyHaveAnAccountWithTheEmailAddress') }} (#[span.font-bold {{ email }}]), {{ t('wouldYouLikeToLinkFacebookAsAnAnotherWayToLogIn') }}

        template(#footer) 
            .flex.flex-col.gap-4.w-full
                button.btn-primary.w-full(@click="$emit('link')" type="button") {{ t('link') }}
                button.btn-outline-primary.w-full(@click="handleCancelMerge" type="button") {{ t('cancel') }}

</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  email: string;
}>();
const emit = defineEmits(["link"]);

const { t, locale } = useI18n();
const model = defineModel();
const auth = useUserStore();

const handleCancelMerge = function () {
  auth.clearData();
  model.value = false;
};
</script>

<style scoped></style>
