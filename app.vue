<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script lang="ts">
import { useStore } from "@/store/store";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { locale } = useI18n();

    useHead({
      title: "DESH",
    });
    router.beforeEach(async (to, from, next) => {
      await store.validateApp(to);
      next();
    });
    onMounted(async () => {
      const localLang = localStorage.getItem("lang");
      locale.value = localLang || "en";

      await store.validateApp(route);
    });
  },
};
</script>
