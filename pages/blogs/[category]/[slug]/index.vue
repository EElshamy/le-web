<template lang="pug">
    .app-container
        //- .breadcrumb.flex.lime-clamp-1.gap-2.items-center(class="text-[14px] font-300 pt-[24px] lg:pt-[64px]")
                NuxtLink(to="/"): IconHome
                IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180")
                NuxtLink(:to="localePath('/blogs')") {{ t('articles') }}
                IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180")
                NuxtLink(:to="localePath(`/blogs/${blog?.category?.slug}`)" class="text-[14px] font-400 text-black whitespace-nowrap truncate") {{ locale === 'en' ? blog?.category?.enName : blog?.category?.arName }}
                IconArrowLeft(class="text-[#5D5A57] ltr:rotate-180")
                p(class="text-[14px] font-400 text-black whitespace-nowrap truncate") {{ locale === 'en' ? blog?.enTitle : blog?.arTitle }}
        .flex.justify-center(class="pt-[30px] pb-[104px]")
            .flex.flex-col.gap-7
                .flex.flex-col.gap-5(class="lg:mx-[50px]")
                    //- NuxtLink(:to="localePath(`/blogs/${blog?.category?.slug}`)" class="label-prominent-3 lg:label-prominent-2 text-primary") {{ locale === 'en' ? blog?.category?.enName : blog?.category?.arName || blog?.category?.localizedName }}
                    h1(class="heading-6 lg:heading-3 max-w-[652px] break-words") {{ locale === 'en' ? blog?.enTitle : blog?.arTitle || blog?.localizedTitle }}
                .flex.items-center.gap-6(class="lg:mx-[50px] justify-between")
                    div(class="flex items-center gap-4")
                      NuxtLink(:to="localePath(`/lecturers/${blog?.lecturer?.user?.slug}`)"): AppAvatar(:src="getImageUrl(blog?.lecturer?.user?.profilePicture)" class="size-[32px]" :label="locale === 'en' ? blog?.lecturer?.user?.enFullName : blog?.lecturer?.user?.arFullName")
                      .flex.items-center.gap-2
                          IconDate
                          p(class="label-3") {{ formatDate(blog?.createdAt) }}

                    div(class="flex items-center gap-4")
                      //- AppShare(:likeCount="blog?.likesCount")
                      IconShare(@click="handleDropDownOption('share')" class="cursor-pointer")
                      AppDropdown(:options="dropdownOption" @clicked="handleDropDownOption" class="flex items-center")
                          template(#deleteReview="{ option }" v-if="data?.review?.rating")
                              div(class="cursor-pointer px-[12px] rounded-[8px]" @click="deleteReviewPopup = true")
                                  p {{ option?.label }}
                div(class="w-full lg:w-[874px] rounded-[16px] aspect-[3.6/2] overflow-hidden")
                    NuxtImg(:src="getImageUrl(blog?.thumbnail)" :alt="locale === 'en' ? blog?.enTitle : blog?.arTitle" format="webp" class="w-full h-full hover:scale-105 duration-300 ease-in-out object-cover")

                //- div(v-html="locale === 'en' ? blog?.enContent : blog?.arContent" class="prose w-full lg:mx-[50px] lg:max-w-[652px] break-words whitespace-pre-wrap max-w-none [&_code]:whitespace-pre-wrap [&_code]:break-words lecturerPageArticle" )
                //- div(v-html="locale === 'en' ? blog?.enContent : blog?.arContent" :dir="locale === 'en' ? 'ltr' : 'rtl'" class="prose w-full lg:mx-[50px] lg:max-w-[652px] break-words max-w-none [&_code]:whitespace-pre-wrap [&_code]:break-words lecturerPageArticle" :class="locale === 'en' ? 'text-left' : 'text-right'")
                div(v-html="locale === 'en' ? blog?.enContent : blog?.arContent" class="content-area prose w-full lg:mx-[50px] lg:max-w-[652px] break-words max-w-none [&_code]:whitespace-pre-wrap [&_code]:break-words lecturerPageArticle" :class="locale === 'en' ? 'ltr-article' : 'rtl-article'" :style="{ direction: locale === 'en' ? 'ltr' : 'rtl', textAlign: locale === 'en' ? 'left' : 'right' }")
                AppInline(:items="blog?.tags?.map((item) => item?.localizedName)" class="max-w-[652px]")

                .flex.items-center.justify-between
                    AppLike(:likeCount="blog?.likesCount" :isLiked="blog?.liked" @like="handleLikeBlog")
                    //- AppShare(:likeCount="blog?.likesCount")
        ReportModal(v-model="reportBlog" v-if="reportBlog" :targetId="blog?.id" :targetType="ReportTargetEnum.BLOG" :title="`${t('report')} ${t('blog')}`" :subTitle="t('reportBlogDescription')" @close="reportBlog = false")
        AppModal(v-model="deleteReviewPopup" v-if="deleteReviewPopup" :showClose="false" :showActions="false")
            .flex.items-center.justify-center.mt-5
                p.heading-6.text-center {{ t('areYouSureYouWantToDeleteYourReview') }}
            .grid.grid-cols-2(class="p-[24px] gap-[12px]")
                button.btn.btn-primary(@click="handleDeleteReview") {{ saveText || t('delete') }}
                button.btn-outline-primary(@click="deleteReviewPopup = false") {{ cancelText || t('cancel') }}
        //- Recommended blogs
        BaseSection(:title="t('moreArticlesYouMightLike')" link="/blogs" :linkTitle="t('allBlogs')" :gridCols="5" v-if="recommendedBlogs?.items?.length")
          template(v-for="blog in recommendedBlogs?.items?.slice(0, 5)" v-if="!loading")
              ProgramCard(:data="blog" :isBlog="true" class="flex-shrink-0 w-[250px] md:w-full")
          template(v-for="i in 10" :key="i" v-else)
            SkeletonTest
</template>

<script setup lang="ts">
import { ReportTargetEnum } from "#gql/default";

const { t, locale } = useI18n();
const localePath = useLocalePath();

const { blog } = await useBlog({ immediate: true, grabIdFromRoute: true });
const { getImageUrl } = usePhoto();
const { formatDate } = useFormatter();
const { toggleLikeBlog } = useBlogActions();
const { stripHtml } = useFormatter();
const route = useRoute();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const config = useRuntimeConfig();

const incrementorRollBack = computed(() => (blog?.value?.liked ? 1 : -1));

const handleLikeBlog = async function () {
  if (!isLoggedIn.value) {
    navigateTo(localePath("/signup"));
    return useAlert({
      type: "error",
      message: t("youMustRegisterToCompleteThisProcess"),
    });
  }
  const incrementBy = blog.value.liked ? -1 : 1;
  blog.value.likesCount += incrementBy;
  blog.value.liked = !blog.value.liked;
  const { message, success } = await toggleLikeBlog(
    [blog.value?.id],
    blog.value?.liked,
  );
  if (!success) {
    blog.value.likesCount += incrementorRollBack.value;
    blog.value.liked = !blog.value.liked;
  }
};

const {
  data: recommendedBlogs,
  error,
  status,
} = useAsyncData(
  "recommended-blogs",
  () => GqlRecommendedBlogs({ blogId: blog?.value?.id }),
  { transform: (data) => data?.recommendedBlogs?.data },
);

useSeoMeta({
  title: locale.value === "en" ? blog.value?.enTitle : blog.value?.arTitle,
  ogTitle: locale.value === "en" ? blog.value?.enTitle : blog.value?.arTitle,
  description:
    locale.value === "en"
      ? stripHtml(blog?.value?.enContent)
      : stripHtml(blog?.value?.arContent),
  ogDescription:
    locale.value === "en"
      ? stripHtml(blog?.value?.enContent)
      : stripHtml(blog?.value?.arContent),
  ogImage: getImageUrl(blog.value?.thumbnail),
});

useSchemaOrg([
  // Blog
  defineArticle({
    headline: locale.value === "en" ? blog.value?.enTitle : blog.value?.arTitle,
    description:
      locale.value === "en"
        ? stripHtml(blog?.value?.enContent)
        : stripHtml(blog?.value?.arContent),
    image: getImageUrl(blog?.value?.thumbnail),
    thumbnailUrl: getImageUrl(blog?.value?.thumbnail),
    datePublished: new Date(blog?.value?.publishedAt),
    dateModified: new Date(blog?.value?.createdAt),
    author: {
      name:
        locale.value === "en"
          ? blog?.value?.lecturer?.user?.enFullName
          : blog?.value?.lecturer?.user?.arFullName,
      url:
        config.public.APP_BASE_URL +
        `lecturers/${blog?.value?.lecturer?.user?.slug}`,
    },
    publisher: {
      name:
        locale.value === "en"
          ? blog?.value?.lecturer?.user?.enFullName
          : blog?.value?.lecturer?.user?.arFullName,
      url:
        config.public.APP_BASE_URL +
        `lecturers/${blog?.value?.lecturer?.user?.slug}`,
    },
    wordCount: stripHtml(
      locale.value === "en" ? blog?.value?.enContent : blog?.value?.arContent,
    ).length,
    keywords: blog?.value?.tags?.map(
      (name: { localizedName: string }) => name.localizedName,
    ),
    articleSection: [
      locale.value === "en"
        ? blog.value?.category?.enName
        : blog.value?.category?.arName,
    ],
    inLanguage: locale.value,
  }),
]);

const dropdownOption = [
  // {
  //   label: t("shareBlog"),
  //   emitter: "share",
  // },
  // {
  //   label: t("reportLecturer"),
  //   emitter: "reportLecturer",
  // },
  {
    label: t("reportBlog"),
    emitter: "reportBlog",
  },
  {
    label: t("deleteReview"),
    emitter: "deleteReview",
    slot: "deleteReview",
  },
];
const { openShareModal } = useShare({ customLink: "hello" });
const { setLink } = useShare();
const { deleteReview } = useReview();
const reportBlog = ref<boolean>(false);
const deleteReviewPopup = ref<boolean>(false);
const saveText = ref<string>("");
const cancelText = ref<string>("");

const handleDropDownOption = function (value: string) {
  switch (value) {
    case "share":
      openShareModal.value = true;
      return setLink(
        `/blogs/${blog?.value?.category?.slug}/${blog?.value?.slug}`,
      );
    case "reportBlog":
      return (reportBlog.value = true);
    case "deleteReview":
      return (deleteReviewPopup.value = true);
  }
};

const handleDeleteReview = async function () {
  try {
    const { success, message } = await deleteReview(blog.value?.review?.id);
    if (success) {
      useAlert({ type: "success", message });
      deleteReviewPopup.value = false;
      // Refresh the blog data to update the review status
      await refreshNuxtData("blog");
    } else {
      useAlert({ type: "error", message });
    }
  } catch (error) {
    useAlert({ type: "error", message: t("somethingWentWrong") });
  }
};
</script>

<style scoped>
/* Force LTR List Styles when content is English */
.ltr-article :deep(ul),
.ltr-article :deep(ol) {
  direction: ltr;
  text-align: left;
  /* Reset RTL padding and add LTR padding */
  padding-right: 0;
  padding-left: 1.625em;
  list-style-position: outside;
}

/* Ensure list items display correctly */
.ltr-article :deep(li) {
  direction: ltr;
  text-align: left;
  /* Fix for markers not showing if overflow is hidden */
  display: list-item;
}

/* Optional: Ensure paragraphs inside don't inherit global RTL alignment */
.ltr-article :deep(p) {
  text-align: left;
}
</style>
