<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script>
import { useStore } from "@/store/store";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    useHead({
      title: "DESH",
    });
    router.beforeEach(async (to, from, next) => {
      await store.validateApp(to);
      next();
    });
    onMounted(async () => {
      await store.validateApp(route);
      // await store.addNewAdmin();
    });
    return {
      store,
    };
  },
};
</script>
// admin_s, admin - pswd
