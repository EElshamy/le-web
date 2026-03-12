<template lang="pug">
.app-container(class="w-full lg:max-w-[430px]")
  .flex.flex-col.items-center.justify-center.text-center
    div(class="relative mb-6")
      div(class="absolute inset-0 bg-primary/10 rounded-full blur-xl")
      NuxtImg(src="/images/otp.png" quality="80" format="webp" alt="otp-header-img" class="relative w-[100px] h-[100px] object-contain")

    h2(class="text-[24px]")  {{ t('enterTheCodeSentToYou') }}

    div(class="text-base mt-3 font-light w-full leading-relaxed")
        p(class="font-300 text-[16px]")  {{ t('aMessageHasBeenSentToYourEmail') }}
        div(class='font-medium text-black mt-1 dir-ltr') {{ email  }}
        button(@click="emit('handleBack')" v-if="sign" class="flex text-[14px] mt-2 justify-center w-full text-primary  transition-colors hover:underline")
          IconEdit(class="shrink-0 mx-1")
          | {{ t('edit') }}

  div(class="flex justify-center mt-8 w-full" dir="ltr")
    v-otp-input(
      ref="otpInput"
      input-classes="otp-input-field"
      :num-inputs="4"
      v-model:value="otpValue"
      :should-auto-focus="true"
      :should-focus-order="true"
      input-type="tel"
      :is-disabled="disabled || loading || loadingOtp"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
      :placeholder="['-', '-', '-', '-']"
    )

  button.btn-primary.w-full(
    @click="handleOnComplete(otpValue)"
    :disabled="disabled || loading || otpValue.length < 4 || loadingOtp"
    class="rounded-lg mt-8 py-3 transition-all duration-200"
  )
    .flex.items-center.justify-center.gap-2
      IconLoading(v-if="loading" class="animate-spin")
      span {{ loading ? t('verifying') : t('confirm') }}

  .flex.items-center.justify-center.mt-6.text-sm
    div(v-if="timerCount > 0" class="flex items-center gap-2  font-light")
      span {{ t('resendOtpAfter') }}
      span(class="font-medium  w-[40px] text-center") {{ formattedTime }}

    button(
      v-else
      class="text-primary font-medium hover:text-primary-dark hover:underline transition-colors flex items-center gap-2"
      @click="handleResendOtp"
      :disabled="loadingOtp"
    )
      IconLoading(v-if="loading" class="animate-spin w-4 h-4")
      span {{ t('resendCode') }}


</template>

<script setup lang="ts">
import VOtpInput from "vue3-otp-input";
import {
  VerificationCodeUseCasesEnum,
  UserVerificationCodeUseCaseEnum,
} from "#gql/default";
const props = defineProps<{
  email: string;
  useCase: VerificationCodeUseCasesEnum | UserVerificationCodeUseCaseEnum;
  navigator?: string;
  disabled?: boolean;
  sign?: boolean;
}>();

const emit = defineEmits(["success", "handleBack", "failed"]);
const { t } = useI18n();
const localePath = useLocalePath();
const { isOnline } = useNetwork();
const userStore = useUserStore();
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const otpValue = ref("");
const loading = ref<boolean>(false);
const loadingOtp = ref<boolean>(false);
const timerCount = ref(0);
let timerInterval: any = null;
const formattedTime = computed(() => {
  const minutes = Math.floor(timerCount.value / 60);
  const seconds = timerCount.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});
onMounted(() => {
  startTimer(60);
});

onUnmounted(() => {
  stopTimer();
});

const startTimer = (seconds: number) => {
  stopTimer();
  timerCount.value = seconds;
  timerInterval = setInterval(() => {
    if (timerCount.value > 0) {
      timerCount.value--;
    } else {
      stopTimer();
    }
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval) clearInterval(timerInterval);
};
const convertArToEn = (value: string) => {
  const map: Record<string, string> = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };
  return value.replace(/[٠-٩]/g, (char) => map[char] || char);
};

const handleOnChange = (value: string) => {
  const englishValue = convertArToEn(value);
  if (englishValue !== value) {
    otpValue.value = englishValue;
  } else {
    otpValue.value = value;
  }
};

const handleOnComplete = async (code: string) => {
  const cleanCode = convertArToEn(code);

  if (!cleanCode || cleanCode.length < 4) {
    return useAlert({ type: "warning", message: t("invalidOtpLength") });
  }

  if (!isOnline.value) {
    return useAlert({ type: "error", message: t("noInternetConnection") });
  }

  loading.value = true;

  try {
    let response;
    if (props.useCase === UserVerificationCodeUseCaseEnum.PASSWORD_RESET) {
      response = await GqlVerifyPasswordResetVerificationCode({
        input: {
          email: props.email,
          verificationCode: cleanCode,
        },
      });

      const data = response?.verifyPasswordResetVerificationCode;

      if (data?.success) {
        emit("success", cleanCode);
        if (props.navigator) navigateTo(localePath(props.navigator));
      } else {
        throw new Error(data?.message || t("invalidOtp"));
      }
    } else {
      response = await GqlVerifyUserVerificationCodeByEmail({
        input: {
          verificationCode: cleanCode,
          email: props.email,
          useCase: props.useCase as any,
        },
      });

      const data = response?.verifyUserVerificationCodeByEmail;

      if (data?.success) {
        if (data.data) {
          userStore.setData(data.data, true);
        }
        emit("success", data.data);
        if (props.navigator) navigateTo(localePath(props.navigator));
      } else {
        emit("failed", data);
        throw new Error(data?.message || t("invalidOtp"));
      }
    }
  } catch (error: any) {
    console.error("OTP Error:", error);
    const msg =
      error.gqlErrors?.[0]?.message || error.message || t("somethingWentWrong");

    useAlert({ type: "error", message: msg });
    otpValue.value = "";
    otpInput.value?.clearInput();
  } finally {
    loading.value = false;
  }
};

const handleResendOtp = async () => {
  if (!isOnline.value)
    return useAlert({ type: "error", message: t("noInternetConnection") });

  loadingOtp.value = true;

  try {
    const response = await GqlSendEmailVerificationCode({
      input: {
        email: props.email,
        useCase: props.useCase as any,
      },
    });

    const data = response?.sendEmailVerificationCode;

    if (data?.success) {
      useAlert({ type: "success", message: t("codeResentSuccessfully") });
      startTimer(60);
    } else {
      throw new Error(data?.message as string);
    }
  } catch (error: any) {
    const msg =
      error.gqlErrors?.[0]?.message || error.message || t("resendFailed");
    useAlert({ type: "error", message: msg });
  } finally {
    loadingOtp.value = false;
  }
};
</script>

<style lang="scss">
.otp-input-field {
  width: 60px;
  height: 60px;
  margin: 0 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  background-color: white;
  transition: all 0.2s;
  direction: ltr;
  font-family: sans-serif;

  &:focus {
    outline: none;
    border-color: var(--primary-color, #000);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  &.is-complete {
    border-color: #34c759;
    background-color: #f2fbf5;
  }
}

@media (max-width: 450px) {
  .otp-input-field {
    width: 45px;
    height: 45px;
    margin: 0 4px;
    font-size: 18px;
  }
}
</style>
