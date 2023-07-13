<template>
  <div>
    <div
      class="flex flex-col m-auto mt-16 justify-center items-center content-center w-1/4"
    >
      <h1 class="text-center text-teal-500 p-5 font-bold text-2xl">DESH</h1>
      <div
        class="text-start flex flex-col justify-center items-center content-center rounded-lg border-2 border-grey-700 w-full"
      >
        <h2 class="p-3 text-xl">Login</h2>
        <v-col>
          <v-text-field
            label="Username"
            placeholder="Type"
            variant="outlined"
            v-model="username"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Password"
            placeholder="Type"
            variant="outlined"
            v-model="password"
            type="password"
          ></v-text-field>
        </v-col>
        <button
          class="w-2/5 mb-4 text-white cursor-pointer bg-teal-500 rounded-xl pt-1 pb-1 transform transition hover:scale-105 duration-300 ease-in-out"
          @click="login()"
          type="submit"
        >
          Login
        </button>
        <v-btn
          variant="flat"
          elevation="8"
          color="#18c0aa"
          class="w-2/5 mb-4 text-none rounded-xl pt-1 pb-1 transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Login
        </v-btn>
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
    const router = useRouter();
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
    };
  },
};
</script>
