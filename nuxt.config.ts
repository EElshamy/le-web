// nuxt.config.ts
import i18n from "./config/i18n";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  modules: [
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "@unocss/nuxt",
    "@nuxtjs/device",
    "nuxt-graphql-client",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "@sidebase/nuxt-auth",
    "@nuxt/scripts",
    "@nuxt/fonts",
    "@zadigetvoltaire/nuxt-gtm",
  ],

  gtm: {
    id: "GTM-MK58L8JC",
  },

  vite: {
    css: { devSourcemap: false },
  },

  // schemaOrg: {
  //   identity: {
  //     type: "Organization",
  //     name: "Leiaqa",
  //     url: process.env.APP_BASE_URL,
  //     logo: "/share.png",
  //     description: "Scientific courses and training programs certified by ACE, on the first Arabic platform specialized in teaching fields of nutrition, wellness, and physical fitness.",
  //     foundingDate: "2023",
  //     contactPoint: {
  //       "@type": "ContactPoint",
  //       contactType: "customer service",
  //       telephone: "+971 4 2215555",
  //       email: "info@leiaqa.com",
  //     },
  //     sameAs: [
  //       "https://www.facebook.com/leiaqa.education",
  //       "https://www.instagram.com/leiaqa_edu/",
  //       "https://www.linkedin.com/company/leiaqa",
  //     ],
  //   },
  // },

  i18n,

  plugins: ["~/plugins/geidea.client.ts", "~/plugins/google.client.ts"],
  auth: {
    origin: "https://staging.leiaqa.com",
    baseURL: "https://staging.leiaqa.com/api/auth",
    provider: {
      type: "authjs",
      trustHost: true,
      defaultProvider: "google",
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: true,
    },
  },

  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET || "4485%K5Cdi'n3LPC@/jYTBon",
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleSecretKey: process.env.GOOGLE_CLIENT_SECRET,

    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookSecretKey: process.env.FACEBOOK_CLIENT_SECRET,

    public: {
      GQL_HOST: process.env.API_KEY || "https://staging-api.leiaqa.com/graphql",
      BASE_URL: process.env.BASE_URL || "https://staging-api.leiaqa.com/",
      APP_BASE_URL: process.env.APP_BASE_URL || "https://staging.leiaqa.com/",
      BUCKET_URL:
        process.env.BUCKET_URL || "https://leiaqa.fra1.digitaloceanspaces.com/",
      origin: process.env.NUXT_AUTH_ORIGIN || "https://staging.leiaqa.com",
    },
  },

  site: {
    url: process.env.APP_BASE_URL,
    name: "Leiaqa",
  },

  sitemap: {
    sources: [
      "/api/__sitemap__/courses",
      "/api/__sitemap__/tracks",
      "/api/__sitemap__/blogs",
      "/api/__sitemap__/lecturers",
    ],
  },

  fonts: {
    families: [
      {
        name: "Alexandria",
        provider: "google",
        weights: [300, 400, 500, 700],
        display: "swap",
      },
    ],
  },

  image: {
    provider: "ipx",
    format: ["webp", "avif"],
    quality: 80,
    ipx: { sharp: true },
    domains: ["leiaqa.fra1.digitaloceanspaces.com"],
  },

  nitro: {
    routeRules: {
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/api/**": { cors: true },
    },
  },

  css: ["@unocss/reset/tailwind-compat.css", "@/assets/scss/index.scss"],

  app: {
    head: {
      meta: [
        {
          name: "google-site-verification",
          content: "fSHLphB1c9IkRGm7CBEdwHoGkbuC4splyAd2X-FFObw",
        },
      ],
      script: [
        // {
        //   src: "https://iframe.mediadelivery.net/embed/script.js",
        //   defer: true,
        // },
        {
          innerHTML: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tcm6rxxnxn");`,
          type: "text/javascript",
          tagPosition: "bodyClose",
        },
        // {
        //   src: "https://accounts.google.com/gsi/client",
        //   async: true,
        //   defer: true,
        // },
      ],
    },
  },
});
