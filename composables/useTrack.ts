interface opts {
  grabIdFromRoute?: boolean;
  immediate?: boolean;
}

interface response {
  data?: any;
  message: string;
  success: boolean;
}

const activeTrack = ref<string>();
const track = ref();

export const useTrack = async function (input?: opts) {
  const { immediate, grabIdFromRoute } = input as {
    grabIdFromRoute: boolean;
    immediate: boolean;
  };
  const route = useRoute();
  const id = route.params.id as string;
  const { isUUID } = useIdCheck();

  const getData = async function (diplomaId?: string, slug?: string) {
    const formatInput = computed(() => {
      if (isUUID(id)) return { diplomaId: (diplomaId as string) || id };
      return { slug: (slug as string) || id };
    });
    const { data } = await useAsyncData(`getTrack-${id}`, () =>
      GqlDiploma({
        ...formatInput.value,
      })
    );
    const {
      data: trackData,
      success,
      message,
    } = data?.value?.diploma as response;
    activeTrack.value = (diplomaId as string) || id;
    track.value = trackData;
  };

  if (immediate) {
    await getData();
  }

  return { track, activeTrack, getData };
};
