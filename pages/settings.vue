<template>
  <Header />
  <div
    class="mt-20 w-full flex flex-col align-center justify-center items-center content-center"
  >
    <v-form
      @submit.prevent="updateUser()"
      class="text-start flex flex-col justify-center items-center w-1/3"
    >
      <h1 class="text-center p-5 font-bold text-2xl">
        {{ $t("nav.settings") }}
      </h1>
      <v-col>
        <v-text-field
          :label="$t('username')"
          :placeholder="$t('placeholder')"
          variant="outlined"
          v-model="username"
          :rules="[rules.username]"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('password')"
          :placeholder="$t('placeholder')"
          variant="outlined"
          v-model="password"
          type="password"
          :rules="[rules.password]"
        ></v-text-field>
      </v-col>
      <div>
        <v-btn
          color="#80CBC4"
          class="mb-4 w-1/3 hover:background-transparent"
          :loading="store.isLoading"
          block
          size="large"
          type="submit"
          variant="elevated"
        >
          {{ $t("button.update") }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store/store";
const { t: $t } = useI18n();

const username = ref("");
const password = ref("");
const store = useStore();
const rules = {
  username: (username: string) => {
    const pattern = /^[a-z0-9_]+$/;
    return pattern.test(username) || $t("rules.username");
  },
  password: (password: string) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return pattern.test(password) || $t("rules.password");
  },
};
const updateUser = async () => {
  const user_id = localStorage.getItem("user_id") || null;
  if (user_id) {
    const currentUser = await store.getUserById<User>(+user_id);
    if (!currentUser) return;
    if (username.value !== "") currentUser.username = username.value;
    if (password.value !== "") currentUser.password = password.value;
    if (password.value && username.value) {
      currentUser.username = username.value;
      currentUser.password = password.value;
    }
    username.value = "";
    password.value = "";
    await store.updateUser(currentUser);
    alert("Your data is successfully changed!");
  }
};
useHead({
  title: "Settings page",
});
</script>
<style scoped>
/* .main {
  margin: 50px auto;
  margin-left: 250px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.form {
  text-align: start;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.form h3 {
  padding: 15px;
  font-variant: inherit;
  font-size: 1.5rem;
}
.form p {
  width: 70%;
}
input {
  display: inline;
  margin: 0.5rem 0;
  width: 100%;
  height: 100%; 
  font: inherit;
  padding: 0.15rem 0.25rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input:focus {
  outline: none;
  border-color: #18c0aa;
} */
</style>
