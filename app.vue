<template>
  <div class="bg-gradient-to-r from-teal-400 to-cyan-500 h-full">
    <div
      v-if="!store.isLogged"
      class="flex flex-col m-24 justify-center items-center content-center"
    >
      <h1 class="text-center text-teal-500 p-5 font-bold text-2xl">DESH</h1>
      <div
        class="text-start p-5 flex flex-col justify-center items-center content-center rounded-lg border-2 border-grey-700 w-1/4"
      >
        <h2 class="p-3 text-xl">Login</h2>
        <p class="w-full">
          Username <br />
          <input
            type="text"
            v-model="username"
            class="inline rounded border border-gray-400 w-full mt-3 mb-3 focus:border-teal-600 focus:!outline-none"
          />
        </p>
        <p class="w-full">
          Password <br />
          <input
            type="password"
            v-model="password"
            class="inline rounded border border-gray-400 w-full mt-3 focus:border-teal-600 focus:!outline-none"
          />
        </p>
        <button
          class="w-2/5 mt-4 text-white cursor-pointer bg-teal-500 rounded-xl pt-1 pb-1 transform transition hover:scale-105 duration-300 ease-in-out"
          @click="login()"
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
    <div v-else>
      <!-- <NuxtLayout> -->
      <!-- </NuxtLayout> -->
      <Header />
      <div class="mt-20">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "@/store/store";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const username = ref("");
    const password = ref("");
    const userRole = ref("");
    const orgId = ref("");

    useHead({
      title: "DESH",
    });
    const login = () => {
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("role", data.role);
      // localStorage.setItem("user_id", data.user_id);
      // localStorage.setItem("org_id", data.org_id);
      // this.router.navigate([`/${data.role}`]);
      // this.is_logged = true;
      store.isLogged = true;
      console.log("from login, isLogged is " + store.isLogged);
      console.log(
        "Username is " + username.value + ", password is " + password.value
      );
      username.value = "";
      password.value = "";
    };
    const logout = () => {
      // localStorage.removeItem("token");
      // localStorage.removeItem("role");
      // localStorage.removeItem("user_id");
      // localStorage.removeItem("org_id");
      store.isLogged = false;
    };
    return {
      store,
      login,
      logout,
      username,
      password,
    };
  },
};
</script>
<style>
.gradient {
  background-color: linear-gradient(90deg, #20dec5 0%, #98efbf 100%);
  /* backdrop-filter: blur(30px); */
  color: black;
}
</style>
