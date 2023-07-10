<template>
  <Header />
  <div class="mt-20">
    <div class="main">
      <div class="form">
        <h3>Settings</h3>
        <div>
          Update username
          <input type="text" v-model="username" id="username" name="username" />
          <div>
            Update password
            <input
              type="password"
              v-model="password"
              id="password"
              name="password"
            />
            <button
              class="mx-auto lg:mx-0 text-gray-600 font-bold rounded-full lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-teal-400"
              @click="updateUser()"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/store/store";

const username = ref("");
const password = ref("");
const store = useStore();

const updateUser = async () => {
  const user_id = localStorage.getItem("user_id") || null;
  console.log(user_id);
  if (user_id) {
    console.log(
      "username: " + username.value + ", password: " + password.value
    );
    const currentUser = await store.getUserById(+user_id);
    console.log("before: " + currentUser);
    if (username.value !== "") currentUser.username = username.value;
    if (password.value !== "") currentUser.password = password.value;
    if (password.value && username.value) {
      currentUser.username = username.value;
      currentUser.password = password.value;
    }
    username.value = "";
    password.value = "";
    await store.updateUser(currentUser);
    console.log("after: " + currentUser);
    alert("Your data is successfully changed!");
  }
};
useHead({
  title: "Settings",
});
</script>
<style scoped>
.main {
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
}
</style>
