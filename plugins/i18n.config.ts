import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import ru from "../locales/ru.json";
import kz from "../locales/kz.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    // globalInjection: true,
    locale: "ru",
    messages: {
      en,
      ru,
      kz,
    },
  });

  vueApp.use(i18n);
});
