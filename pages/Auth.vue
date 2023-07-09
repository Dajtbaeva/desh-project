<template>
  <div>
    <div class="flex flex-col m-24 justify-center items-center content-center">
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
  </div>
</template>

<script>
import { useStore } from "@/store/store";
import { useStyles } from "~/assets/styles";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const style = useStyles();
    const username = ref("");
    const password = ref("");

    useHead({
      title: "DESH",
    });
    const login = async () => {
      if (username.value && password.value) {
        await store.login(username.value, password.value);
        username.value = "";
        password.value = "";
      } else {
        alert("Please enter username and password!");
      }
    };
    return {
      store,
      login,
      username,
      password,
      style,
    };
  },
};
</script>
