1; // uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
// loader helpers
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
// import presetUno from "@unocss/preset-uno";
import extractorPug from "@unocss/extractor-pug";
import { presetFluid } from "unocss-preset-fluid";

export default defineConfig({
  // ...UnoCSS options
  shortcuts: {
    "app-container": "container mx-auto px-2",
    "skeleton-shimmer":
      "relative overflow-hidden bg-neutral-300 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-neutral-50/60 before:to-transparent",
    btn: "rounded-[6px] f-px-12-20 f-py-12-14 lh-[1.2]",
    "btn-primary":
      "btn inline-flex justify-center items-center transition text-white bg-primary hover:bg-primary-700 focus:ring-2 focus:ring-primary-400    focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed",
    "btn-secondary":
      "btn inline-flex justify-center items-center transition text-white bg-secondary hover:bg-secondary-700 focus:ring-2 focus:ring-secondary-400    focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed",
    "btn-outline-primary":
      "btn inline-flex justify-center items-center transition text-primary hover:text-white bg-transparent border border-primary hover:bg-primary focus:ring-2 focus:ring-primary-400  disabled:opacity-50 disabled:cursor-not-allowed  focus:outline-none   ",
    "btn-primary-100":
      "rounded-3 lg:rounded-4 px-4 lg:px-5 py-2.5 lg:py-3 inline-flex justify-center items-center transition text-primary hover:text-white bg-primary-100 hover:bg-primary focus:ring-2 focus:ring-primary-400    focus:outline-none   ",
    "btn-link":
      "btn bg-transparent inline-flex justify-center items-center transition hover:bg-primary hover:text-white focus:ring-2 focus:bg-white focus:text-primary focus:ring-primary-200    focus:outline-none   ",
    "btn-outline":
      "rounded-3 lg:rounded-4 px-4 lg:px-5 py-2.25 lg:py-2.75 inline-flex justify-center items-center transition  bg-transparent border border-neutral-900 hover:bg-neutral-900 hover:text-white focus:ring-2 focus:ring-primary-400    focus:outline-none   ",
    "btn-outline-white":
      "rounded-3 lg:rounded-4 px-4 lg:px-5 py-2.25 lg:py-2.75 inline-flex justify-center items-center transition bg-transparent  border  border-white hover:bg-white hover:text-neutral-900 focus:ring-2 focus:ring-primary-400    focus:outline-none   ",
    "btn-neutral":
      "rounded-3 lg:rounded-4 px-4 lg:px-5 py-2.5 lg:py-3 inline-flex justify-center items-center transition  bg-neutral-200 hover:bg-neutral-300 focus:ring-2 focus:ring-primary-200    focus:outline-none   ",
    "btn-white":
      "rounded-3 lg:rounded-4 px-4 lg:px-5 py-2.5 lg:py-3 inline-flex justify-center items-center transition  bg-white hover:bg-neutral-200 focus:ring-2 focus:ring-primary-200    focus:outline-none   shadow-m hover:shadow-l",
    "btn-xs": "rounded-1.5 lg:rounded-2 text-3 px-1.5 lg:px-3 py-1 lg:py-1.5",
    "btn-sm":
      "rounded-2 lg:rounded-3 f-text-12-14 px-2 lg:px-4 py-1.5 lg:py-2.4",
    "form-label": "block f-text-14-16 fw-600  mb-2",
    "form-input":
      "block w-full px-3 lg:px-4 py-2.5 lg:py-3.25 rounded-3.5 lg:rounded-4 bg-neutral-100 border border-neutral-600  text-sm  focus:ring-neutral-300 focus:border-primary  focus:outline-none  [&.is-invalid]:focus:border-negative [&.is-invalid]:border-negative",
    "error-message": "f-text-12-14 text-negative mt-1 ",
    "heading-1": "text-[64px] leading-[80px] font-400 ",
    "heading-2": "text-[56px] leading-[76px] font-400",
    "heading-3": "text-[48px] leading-[68px] font-400",
    "heading-4": "text-[40px] leading-[52px] font-400",
    "heading-5": "text-[32px] leading-[44px] font-400",
    "heading-6": "text-[24px] leading-[32px] font-400",
    "label-prominent-1": "text-[20px]  leading-[24px] font-400",
    "label-1": "text-[20px] leading-[24px] font-300",
    "label-prominent-2": "text-[16px]  leading-[20px] font-400",
    "label-2": "text-[16px]  leading-[20px] font-300",
    "label-prominent-3": "text-[14px]  leading-[18px] font-400",
    "label-3": "text-[14px]  leading-[18px] font-300",
    "label-prominent-4": "text-[12px]  leading-[16px] font-400",
    "label-4": "text-[12px]  leading-[16px] font-300",
    "body-1": "text-[24px] leading-[36px] font-300",
    "body-2": "text-[20px] leading-[32px] font-300",
    "body-3": "text-[16px] leading-[28px] font-300",
    "body-4": "text-[14px] leading-[20px] font-300",
  },

  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      spacing: {
        "1": "0px",
        "2": "4px",
        "3": "8px",
        "4": "12px",
        "5": "16px",
        "6": "20px",
        "7": "24px",
        "8": "32px",
        "9": "40px",
        "10": "48px",
        "11": "64px",
        "12": "80px",
        "13": "120px",
      },
    },
    colors: {
      primary: {
        "50": "#F1E6EC",
        "100": "#D5B0C3",
        "200": "#C08AA6",
        "300": "#A3547E",
        "400": "#913365",
        "500": "#76003E",
        "600": "#6B0038",
        "700": "#54002C",
        "800": "#410022",
        "900": "#32001A",
        DEFAULT: "#76003E",
      },
      secondary: {
        "50": "#FFF6F0",
        "100": "#FCDED2",
        "200": "#FAC2B5",
        "300": "#F79F93",
        "400": "#F16D64",
        "500": "#FF5552",
        "600": "#E14A4C",
        "700": "#C33F44",
        "800": "#9C333A",
        "900": "#7A2A31",
        DEFAULT: "#FF5552",
      },
      tertiary: {
        "50": "#F4EEFE",
        "100": "#E8DAFE",
        "200": "#CDB3FF",
        "300": "#B194F7",
        "400": "#946EEB",
        "500": "#6F25CE",
        "600": "#5F1AB5",
        "700": "#4D1699",
        "800": "#3E127C",
        "900": "#300D61",
        DEFAULT: "#6F25CE",
      },

      accent: {
        "50": "#E2F7EB",
        "100": "#C6EFE0",
        "200": "#A6E4D4",
        "300": "#7FD4C6",
        "400": "#4ABAC0",
        "500": "#006A7F",
        "600": "#00596E",
        "700": "#00485B",
        "800": "#003A4B",
        "900": "#002E3B",
        DEFAULT: "#006A7F",
      },

      neutral: {
        "50": "#FFFFFF",
        "100": "#FCFCFC",
        "200": "#F4F4F4",
        "300": "#EFEFEF",
        "400": "#DCDCDC",
        "500": "#A4A4A4",
        "600": "#7C7C7C",
        "700": "#656565",
        "800": "#3D3D3D",
        "900": "#000000",
        DEFAULT: "#A4A4A4",
      },

      success: {
        "50": "#EBF9EE",
        "100": "#C0EECC",
        "200": "#A2E5B3",
        "300": "#77D990",
        "400": "#5DD27A",
        "500": "#34C759",
        "600": "#2FB551",
        "700": "#258D3F",
        "800": "#1D6D31",
        "900": "#165425",
        DEFAULT: "#34C759",
      },

      danger: {
        "50": "#FFEBEA",
        "100": "#FFC2BF",
        "200": "#FFA5A0",
        "300": "#FF7C74",
        "400": "#FF6259",
        "500": "#FF3B30",
        "600": "#E8362C",
        "700": "#B52A22",
        "800": "#8C201A",
        "900": "#6B1914",
        DEFAULT: "#FF3B30",
      },

      warning: {
        "50": "#FFF4E6",
        "100": "#FFDEB0",
        "200": "#FFCE8A",
        "300": "#FFB854",
        "400": "#FFAA33",
        "500": "#FF9500",
        "600": "#E88800",
        "700": "#B56A00",
        "800": "#8C5200",
        "900": "#6B3F00",
        DEFAULT: "#FF9500",
      },

      info: {
        "50": "#E6F2FF",
        "100": "#B0D6FF",
        "200": "#8AC2FF",
        "300": "#54A6FF",
        "400": "#3395FF",
        "500": "#007AFF",
        "600": "#006FE8",
        "700": "#0057B5",
        "800": "#00438C",
        "900": "#00336B",
        DEFAULT: "#007AFF",
      },

      bg: {
        "50": "#ffffff",
        "100": "#FCFAF7",
        "200": "#F7F3EB",
        DEFAULT: "#ffffff",
      },
    },
    boxShadow: {
      m: "0px 2px 4px -2px rgba(0, 0, 0, 0.05), 0px 4px 8px -2px rgba(0, 0, 0, 0.10)",
      l: "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 12px 16px -4px rgba(0, 0, 0, 0.08)",
      xl: "0px 8px 8px -4px rgba(2, 2, 2, 0.04), 0px 20px 24px -4px rgba(0, 0, 0, 0.08)",
      "2xl": "0px 24px 48px -12px rgba(0, 0, 0, 0.18)",
      business: "-16px -40px 48px -2px rgba(0, 0, 0, 0.32)",
    },
  },
  safelist: [
    ...Array.from({ length: 10 }, (_, i) => `animate-delay-${i + 1}00`),
    "skew-x-14",
    "-skew-x-14",
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        "my-icons": FileSystemIconLoader("./assets/icons", (svg) =>
          svg.replace(/#fff/, "currentColor")
        ),
      },
    }),
    presetTypography(),
    presetFluid({
      // options
      maxWidth: 1440,
      minWidth: 375,
      extendMaxWidth: null,
      extendMinWidth: null,
      remBase: 16,
      useRemByDefault: false,
      ranges: null,
      commentHelpers: false,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  extractors: [extractorPug()],
});
