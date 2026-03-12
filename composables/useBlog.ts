interface opts {
  immediate?: boolean;
  grabIdFromRoute?: boolean;
}

interface response {
  data?: any;
  message: string;
  success: boolean;
}

const blog = ref();

export const useBlog = async function (opts?: opts) {
  const { immediate, grabIdFromRoute } = opts as opts;
  const route = useRoute();
  const id = route.params.slug as string;

  const getBlog = async function () {
    const { data: fetchedBlog } = await useAsyncData(`getBlog-${id}`, () =>
      GqlBlog({ slug: id })
    );

    const { data, message, success } = fetchedBlog?.value?.blog as response;
    if (success) {
      blog.value = data;
    }
  };

  if (immediate) {
    await getBlog();
  }

  return { blog, getBlog };
};
