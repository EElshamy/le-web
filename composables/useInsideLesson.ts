// interface response {
//   data?: any;
//   code: number;
//   message: string;
//   success: boolean;
// }

// interface opts {
//   immediate?: boolean;
// }

// const activeLessonId = ref<number | null>(null);
// const activeLessonContent = ref();
// const loading = ref<boolean>(false);

// export const useInsideLesson = async function (opts?: opts) {
//   const route = useRoute();
//   const localePath = useLocalePath();
//   const lessonId = route.params.lessonId as string;

//   const getLessonById = async function (id: number | string) {
//     try {
//       loading.value = true;
//       const { data: lesson } = await useAsyncData(`getLesson-${id}-${Date.now()}`, () =>
//         GqlLessonSite({ lessonId: +id })
//       );
//       const { data, code, message, success } = lesson?.value
//         ?.lessonSite as response;
//       if (!success) throw new Error(`${code}-${message}`);
//       if (success) {
//         activeLessonId.value = data?.id;
//         activeLessonContent.value = data;
//       }
//       loading.value = false;
//     } catch (e: any) {
//       const [code, msg] = e.split("-");
//       useAlert({ type: "error", message: msg });
//       if (code == 600) navigateTo(localePath(`/program/${route.query.id}`));
//     }
//   };

//   if (opts?.immediate) {
//     await getLessonById(lessonId);
//   }

//   return { getLessonById, activeLessonContent, activeLessonId, loading };
// };

export const useInsideLesson = async function (opts?: opts) {
  const route = useRoute();
  const localePath = useLocalePath();

  // Move refs INSIDE to prevent data leaking between users
  const activeLessonId = useState<number | null>("lessonId", () => null);
  const activeLessonContent = useState<any>("lessonContent", () => null);
  const loading = useState<boolean>("lessonLoading", () => false);

  // Extract ID
  const lessonId = route.params.lessonId as string;

  const getLessonById = async function (id: number | string) {
    if (!id) return;

    try {
      loading.value = true;

      // FIXED: Static key for hydration. No Date.now()
      const { data: lesson } = await useAsyncData(`getLesson-${id}`, () =>
        GqlLessonSite({ lessonId: +id }),
      );

      const response = lesson?.value?.lessonSite as response;

      if (response?.success) {
        activeLessonId.value = response.data?.id;
        activeLessonContent.value = response.data;
      } else {
        throw new Error(`${response?.code}-${response?.message}`);
      }
    } catch (e: any) {
      const errorStr = e.message || "";
      const [code, msg] = errorStr.split("-");

      // Safety check for browser-only alerts
      if (process.client) {
        useAlert({ type: "error", message: msg || "Error loading lesson" });
      }

      if (code == "600") {
        return navigateTo(localePath(`/program/${route.query.id || ""}`));
      }
    } finally {
      loading.value = false;
    }
  };

  // If immediate is requested, we await it so the server waits for the data
  if (opts?.immediate && lessonId) {
    await getLessonById(lessonId);
  }

  return { getLessonById, activeLessonContent, activeLessonId, loading };
};
