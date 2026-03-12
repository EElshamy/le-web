<template lang="pug">
div
  NuxtLoadingIndicator(color="#76003E")
  NuxtLayout
      NuxtPage
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const logoUrl = 'https://leiaqa.com/logo.svg';
useGqlHeaders({ lang: `Eg-${locale.value}` });

useSchemaOrg([
  {
    "@type": "Organization",
    '@id': 'https://leiaqa.com/#organization',
    name: 'Leiaqa',
    alternateName: 'لياقة',
    url: 'https://leiaqa.com',
    logo: { '@id': 'https://leiaqa.com/#/image/logo' },
    sameAs: [
        "https://www.facebook.com/leiaqa.education",
        "https://www.instagram.com/leiaqa_edu/",
        "https://www.linkedin.com/company/leiaqa",
      ],
  },
  {
    '@type': 'ImageObject',
    '@id': 'https://leiaqa.com/#/image/logo',
    url: logoUrl,
    width: 512,
    height: 512,
    caption: 'Leiaqa logo'
  },

  {
    "@type": "WebSite",
    '@id': 'https://leiaqa.com/#website',
    url: 'https://leiaqa.com',
    name: 'Leiaqa',
    publisher: { '@id': 'https://leiaqa.com/#organization' },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://leiaqa.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://leiaqa.com/en/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    ]
  },
])
</script>
