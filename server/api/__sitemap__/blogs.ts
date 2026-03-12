import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
  const res = await $fetch("https://api.leiaqa.com/graphql", {
    method: "POST",
    body: {
      query:
        "query blogsForSiteMap { blogsForSiteMap { data { id type updatedAt } } }",
    },
  });

  const { data: blogs } = res?.data?.blogsForSiteMap;
  return blogs.map((item: { id: string; type: string; updatedAt: number }) => ({
    loc: `/blog/${item?.id}`,
    _i18nTransform: true,
  })) satisfies SitemapUrlInput[];
});
