<template lang="pug">
        div(class="py-[50px] ")
            h2(class="label-prominent-1 lg:heading-5 max-w-[400px] mb-6") {{ t('reviewsTitle') }}
            div(class="columns-1 md:columns-2 lg:columns-3 gap-4")
                div(v-for="item in testimonials" :key="item.name" class="break-inside-avoid mb-4 bg-[#F8F5F3] p-6 rounded-lg")
                    div.flex.items-center.gap-4.mb-4
                        div
                            h3(class="font-normal text-base mb-2") {{ item.name }}
                            div.flex.items-center.gap-1
                                IconStarReview(v-for="n in item.rating" :key="n" class="")
                    p(class="f-16-26 leading-[26px] font-light") {{ item.comment }}

</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const testimonials = [
  {
    name: "Aya Emad",
    rating: 5,
    comment:
      "تجربه رائعه وفرصه جميله جدا وشرح فوق الممتاز وشكر خاص لدكتور احمد جاب الله لتوفير منصه علميه تفوق التوقعات ومهما الوصف لا يوصف مدى الاستمتاع للعلم شكرا لمن ساهم في العلم ❤️👏",
  },
  {
    name: "Menna Shalaby",
    rating: 5,
    comment: "كانت تجربة ممتعة ومفيدة",
  },
  {
    name: "Alyaa Emara",
    rating: 5,
    comment: "مميز جدااا طريقه شرحه رائعه 🌷",
  },
  {
    name: "نسرين عثمان",
    rating: 5,
    comment: "حقيقي محتوى مميز و مفيد و محاضرين متميزين جزاكم الله خيرا",
  },
  {
    name: "Omniiaa Mohammed",
    rating: 5,
    comment:
      "اول تجربة ليا و كانت حتي الان ممتعة و مفيدة شكراً للقائمين علي المنصة و لكل الاساتذة الافاضل الذين قاموا بتزويدنا من خبراتهم",
  },
  {
    name: "alaa amin",
    rating: 5,
    comment:
      "ملتقى كان مفيد جداً و محاضرين متميزين و قدرنا من خلال توضيحهم و شرحهم نفهم معلومات كتيرة جداً احنا حقيقي كنا محتاجين نفهمها بشكل اوضح عشان نقدر نواجه سوق العمل عموماً ومجال التدريب علي الوجه الخصوص بشكل أفضل",
  },
  {
    name: "ZeZo ZeZo",
    rating: 5,
    comment: "جميل جدا والله",
  },
  {
    name: "عبدالرحمن علي",
    rating: 5,
    comment:
      "انا كان معرفتي بالاصابات قليله جدا و حاليا بفضل الله و اجتهاد الدكاتره بالكورس بقي عندي معرفه و ثقه اكثر اني اقدر اتعامل مع اغلب الحالات الي بواجها ف الجيم من اصابات ضعف و قصر للعضلات المختلفه و تقويتها و مستواها كويس لمدرب شخصي",
  },
  {
    name: "Arwa Mohsen",
    rating: 5,
    comment:
      "This workshop was helpful and valuable. thank you Dr : Ahmed ,and i hope we can learn more from you",
  },
];
</script>
