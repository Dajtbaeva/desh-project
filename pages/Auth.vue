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
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Password"
            placeholder="Type"
            variant="outlined"
            v-model="password"
            type="password"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <button
          class="w-2/5 mb-4 text-white cursor-pointer bg-teal-500 rounded-xl pt-1 pb-1 transform transition hover:scale-105 duration-300 ease-in-out"
          @click="login()"
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
    <!-- <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="username"
          :readonly="store.isLoading"
          :rules="[rules.required]"
          class="mb-2"
          clearable
          label="Username"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="store.isLoading"
          :rules="[rules.required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="store.isLoading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card> -->
  </div>
</template>

<script>
import { useStore } from "@/store/store";
import { ref } from "vue";

export default {
  setup() {
    const form = false;
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const rules = {
      required: (value) => !!value || "Field is required",
    };

    useHead({
      title: "DESH",
    });
    const login = async () => {
      if(!form) return;
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
      rules,
      username,
      password,
    };
  },
};
</script>
