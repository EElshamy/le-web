import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
  const res = await $fetch("https://api.leiaqa.com/graphql", {
    method: "POST",
    body: {
      query:
        "query diplomasForSiteMap { diplomasForSiteMap { data { id updatedAt } } }",
    },
  });

  console.log("diplomas:", res);

  const { data: diplomas } = res?.data?.diplomasForSiteMap;
  return diplomas.map((item: { id: string; updatedAt: number }) => ({
    loc: `/paths/${item?.id}`,
    _i18nTransform: true,
  })) satisfies SitemapUrlInput[];
});
