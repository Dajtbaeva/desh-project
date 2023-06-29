<template>
  <div>
    <h1>INDEX PAGE</h1>
  </div>
</template>

<script>
export default {
  setup() {
    const router = useRouter();
    onMounted(async () => {
      const role = localStorage.getItem("role") || null;
      if (role) {
        await router.push({ name: role });
      }
    });
  },
};
</script>
