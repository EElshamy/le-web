interface response {
  data?: any;
  message: string;
  success: boolean;
}

export const useBlogActions = function () {
  const toggleLikeBlog = async function (
    blogIds: string[],
    increment: boolean
  ) {
    const { data } = await useAsyncData(`like-${Math.random() * 100}`, () =>
      GqlToggleBlogLike({ blogIds, increment })
    );
    const { message, success } = data?.value?.toggleBlogLike as response;
    return { message, success };
  };

  return { toggleLikeBlog };
};
