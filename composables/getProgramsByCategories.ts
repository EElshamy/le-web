interface opts {
  immediate?: boolean;
  grabIdFromRoute?: boolean;
}

interface response {
  data?: any;
  message: string;
  success: boolean;
}

const courses = ref();
const lives = ref();
const programs = ref();
const tracks = ref();
const activeCategory = ref();
const subscriptionDiplomas = ref();
export const getProgramsByCategories = async function (opts?: opts) {
  const { immediate, grabIdFromRoute } = opts as opts;
  const route = useRoute();
  const id = route.params.id as string;

  const getLearningProgramsByCategory = async function (categoryId?: number) {
    const { data: programsByCategories } = await useAsyncData(
      `get-programs-${categoryId || id}`,
      () =>
        GqlLearningProgramsByCategory({
          // categoryId: grabIdFromRoute ? Number(id) : (categoryId as number),
          slug: id,
        }),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      },
    );
    console.log("programsByCategories", programsByCategories);
    const { data, message, success } = programsByCategories?.value
      ?.LearningProgramsByCategory as response;
    const {
      Courses,
      Workshops,
      pathDiplomas,
      liveCourses,
      subscriptionDiplomas: subscriptionDiplomasData,
    } = data;
    courses.value = Courses;
    programs.value = Workshops;
    tracks.value = pathDiplomas;
    lives.value = liveCourses;
    subscriptionDiplomas.value = subscriptionDiplomasData;
  };

  const getCategory = async function () {
    const { data: category } = await useAsyncData(
      `getCategory-${id}`,
      () => GqlCategory({ slug: id }),
      {
        getCachedData: (key, nuxtApp) => {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
        },
      },
    );
    const { data, message, success } = category?.value?.category as response;
    activeCategory.value = data;
  };

  if (immediate) {
    await getLearningProgramsByCategory();
    await getCategory();
  }

  return {
    courses,
    programs,
    lives,
    tracks,
    subscriptionDiplomas,
    activeCategory,
    getLearningProgramsByCategory,
  };
};
