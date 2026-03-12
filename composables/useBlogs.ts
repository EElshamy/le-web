import type { BlogsFilter, BlogsSortInput, PaginatorInput } from "#gql";

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export interface blogsOptions {
  filter?: BlogsFilter;
  paginate?: PaginatorInput;
  sort?: BlogsSortInput;
}

export const useBlogs = async function (input?: { immediate: boolean }) {
  const { immediate } = input as { immediate: boolean };
  const blogs = ref<[]>([]);
  const page = ref<number>(1);
  const paginationInfo = ref();
  const loading = ref<boolean>(false);
  const route = useRoute();

  const getBlogs = async function (
    limit: number = 4,
    reset: boolean = false,
    options?: blogsOptions
  ) {
    if (reset) {
      page.value = 1;
    }
    const { blogs: programs } = await GqlBlogs({ ...options });

    const { data, message, success } = programs as response;

    if (success) {
      blogs.value = data?.items;
      paginationInfo.value = data?.pageInfo;
      page.value += 1;
    }

    return { data, message, success };
  };

  if (immediate) {
    await getBlogs();
  }

  return { getBlogs, blogs, paginationInfo, loading };
};
