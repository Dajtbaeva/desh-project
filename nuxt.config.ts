// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  i18n: {
    // vueI18n: "./i18n.config.ts",
    locales: [
      // {
      //   code: "en",
      //   name: "English",
      //   file: "en.json",
      // },
      // {
      //   code: "ru",
      //   name: "Русский",
      //   file: "ru.json",
      // },
      // {
      //   code: "kz",
      //   name: "Қазақ",
      //   file: "kz.json",
      // },
      "en",
      "ru",
      "kz",
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
  },
  css: ["@/assets/css/main.css"],
  build: {
    transpile: ["vuetify"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  hooks: {
    "pages:extend"(pages) {
      pages.map((route) => {
        if (["Auth"].includes(route.name!) === false) {
          if ("children" in route && route.children) {
            route.children.map((childRoute) => {
              if ("meta" in childRoute === false) {
                childRoute.meta = {};
              }
              childRoute.meta!.requiresAuth = true;
              return childRoute;
            });
          }
          if ("meta" in route === false) {
            route.meta = {};
          }
          route.meta!.requiresAuth = true;
        }
        return route;
      });
    },
  },
});
