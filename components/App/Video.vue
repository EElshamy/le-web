<template lang="pug">
  template(v-if="videoSrc?.finalUrl")
    .relative.w-full.aspect-video.overflow-hidden.mb-bs(:class="roundedClass" @click="onVideoStart")
      ClientOnly
        iframe(:src="videoSrc?.finalUrl" id="bunny-iframe" class="absolute top-0 left-0 w-full h-full" allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;" :id="`bunny-iframe-${videoId}`" loading="lazy" allowfullscreen)
  template(v-else)
    .rounded-card.overflow-hidden.mb-bs
      ClientOnly
        AppImage(:src="thumbnail" class="rounded-[12px]" ratio="16-9")
</template>
<script setup lang="ts">
const props = defineProps({
  videoId: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  type: {
    type: String,
    default: "COURSE",
  },
  roundedClass: {
    type: String,
  },
});

// onMounted(() => {
//   const handleMessage = (event: MessageEvent) => {
//     if (!event.origin.includes("mediadelivery.net")) return;

//     const data =
//       typeof event.data === "string" ? JSON.parse(event.data) : event.data;
//     const evt = data?.event || data?.playerEvent || data?.type;
//     console.log(evt);
//     switch (evt) {
//       case "ready":
//         console.log("✅ Player ready");
//         break;
//       case "play":
//         console.log("▶️ Video started");
//         break;
//       case "pause":
//         console.log("⏸ Video paused");
//         break;
//       case "ended":
//         console.log("🎉 Video finished!");
//         break;
//       default:
//         console.log("Unhandled event:", data);
//     }
//   };

//   window.addEventListener("message", handleMessage);

//   onBeforeUnmount(() => {
//     window.removeEventListener("message", handleMessage);
//   });
// });

// onMounted(() => {
//   const video = document.getElementById("main-video");
//   console.log(video);
// });

// Get video src from bunny by video id
function extractVideoId(input?: string) {
  if (!input) return undefined;
  const parts = input.split("/").filter(Boolean);
  return parts.length > 1 ? parts[1] : parts[0];
}

const videoId = extractVideoId(props.videoId);
const { data: videoSrc } = await useAsyncData(
  `getBunnyViewVideoCredentials-${props.videoId}`,
  () =>
    GqlGetBunnyViewVideoCredentials({
      input: {
        videoId,
        type: props.type as string,
      },
    }),
  {
    transform: (data) => data?.getBunnyViewVideoCredentials?.data,
  }
);
const onVideoStart = () => {

}
</script>
<style lang="scss" scoped></style>
