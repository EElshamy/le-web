import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
  const res = await $fetch("https://api.leiaqa.com/graphql", {
    method: "POST",
    body: {
      query:
        "query coursesForSiteMap { coursesForSiteMap { data { id type updatedAt } } }",
    },
  });

  console.log('courses:', res)

  const { data: courses } = res?.data?.coursesForSiteMap;
  return courses.map(
    (item: { id: string; type: string; updatedAt: number }) => ({
      loc: `/program/${item?.id}?type=${item?.type?.toLowerCase()}`,
      _i18nTransform: true,
    })
  ) satisfies SitemapUrlInput[];
});
