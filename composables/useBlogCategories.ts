interface opts {
  immediate: boolean;
}

interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useBlogCategories = async function (options: opts) {
  const { immediate } = options;
  const blogCategories = ref<[]>([]);

  const getBlogCategories = async function () {
    const { data: categories } = await useAsyncData("blogCategories", () =>
      GqlActiveBlogCategoriesListBoard()
    );
    const { data, message, success } = categories?.value
      ?.activeBlogCategoriesListBoard as response;

    if (success) {
      blogCategories.value = data;
    }
  };

  if (immediate) {
    await getBlogCategories();
  }

  return { blogCategories };
};
