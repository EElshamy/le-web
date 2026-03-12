interface response {
  data?: any;
  message: string;
  success: boolean;
}

const courses = ref();
const programs = ref();
const tracks = ref();
const blogs = ref();
const isSearching = ref<boolean>(false);

const noResults = computed(
  () =>
    !courses?.value?.length &&
    !programs?.value?.length &&
    !tracks?.value?.length &&
    !blogs?.value?.length &&
    isSearching.value
);

const results = computed(() => {
  const course = courses.value?.[0];
  const program = programs.value?.[0];
  const track = tracks.value?.[0];
  const blog = blogs.value?.[0];
  return [course, program, track, blog].filter((item) => item);
});

export const useSearch = function () {
  const resetResults = function () {
    courses.value = [];
    programs.value = [];
    tracks.value = [];
    blogs.value = [];
  };

  const getSearch = async function (searchKey: string) {
    const { data: result } = await useAsyncData(`search-${searchKey}`, () =>
      GqlAllSearch({ filter: { searchKey } }, { server: false })
    );
    const { data, message, success } = result?.value?.allSearch as response;
    if (!success) return;
    isSearching.value = true;
    const {
      courses: courseResult,
      workshops: programResults,
      diplomas: trackResult,
      blogs: blogTracks,
    } = data;
    courses.value = courseResult;
    programs.value = programResults;
    tracks.value = trackResult;
    blogs.value = blogTracks;
  };

  return {
    courses,
    programs,
    tracks,
    blogs,
    results,
    noResults,
    isSearching,
    resetResults,
    getSearch,
  };
};
