// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
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
