import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
  const res = await $fetch("https://api.leiaqa.com/graphql", {
    method: "POST",
    body: {
      query:
        "query lecturersForSiteMap { lecturersForSiteMap { data { id type updatedAt } } }",
    },
  });

  console.log("lecturers:", res);

  const { data: lecturers } = res?.data?.lecturersForSiteMap;
  return lecturers.map(
    (item: { id: string; type: string; updatedAt: number }) => ({
      loc: `/lecturers/${item?.id}`,
      _i18nTransform: true,
    })
  ) satisfies SitemapUrlInput[];
});
