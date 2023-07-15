<template>
  <div>
    <div
      class="flex flex-col m-auto mt-32 justify-center items-center content-center w-1/4"
    >
      <v-form
        @submit.prevent="login"
        v-model="forms"
        class="text-start flex flex-col justify-center items-center content-center rounded-lg border-2 border-grey-700 w-full"
      >
        <h1 class="text-center text-teal-500 p-5 font-bold text-2xl">DESH</h1>
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
        <div>
          <v-btn
            color="#80CBC4"
            class="mb-4 w-1/3 hover:background-transparent"
            :disabled="!forms"
            :loading="store.isLoading"
            block
            size="large"
            type="submit"
            variant="elevated"
          >
            Log In
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store/store";
import { ref } from "vue";

export default {
  setup() {
    const forms = ref(false);
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
      if (!forms.value) return;
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
      forms,
      rules,
      username,
      password,
    };
  },
};
</script>
