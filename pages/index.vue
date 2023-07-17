<template>
  <div></div>
</template>

<script lang="ts">
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
