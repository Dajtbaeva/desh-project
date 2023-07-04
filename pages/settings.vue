<template>
  <Header />
  <div class="mt-20">
    <div class="main">
      <div class="form">
        <h3>Settings</h3>
        <p>
          Change your username
          <input type="text" v-model="username" id="username" name="username" />
        </p>
        <button
          class="mx-auto lg:mx-0 text-gray-600 font-bold rounded-full lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-teal-400 mb-8"
          @click="changeUsername()"
        >
          Change
        </button>
        <p>
          Change your password
          <input
            type="password"
            v-model="password"
            id="password"
            name="password"
          />
        </p>
        <button
          class="mx-auto lg:mx-0 text-gray-600 font-bold rounded-full lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-teal-400"
          @click="changePassword()"
        >
          Change
        </button>
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

const changeUsername = async () => {
  const user_id = localStorage.getItem("user_id") || null;
  console.log(user_id);
  if (user_id) {
    const currentUser = await store.getUserById(+user_id);
    console.log(currentUser);
    currentUser.username = username.value;
    await store.updateUser(currentUser);
    console.log(currentUser);
    username.value = "";
  }
};
const changePassword = async () => {
  const user_id = localStorage.getItem("user_id") || null;
  console.log(user_id);
  if (user_id) {
    const currentUser = await store.getUserById(+user_id);
    console.log(currentUser);
    currentUser.password = password.value;
    await store.updateUser(currentUser);
    console.log(currentUser);
    password.value = "";
  }
};
useHead({
  title: "Settings",
});
</script>
<style>
* {
  box-sizing: border-box;
}
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
  text-align: center;
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
.form input {
  width: 100%;
}
.btn_in {
  width: 20%;
  padding: 3px 0;
  margin-top: 15px;
  margin-bottom: 20px;
  font: inherit;
  color: white;
  cursor: pointer;
  border: 1px solid #55bcaf;
  background: #18c0aa;
  border-radius: 8px;
}
.btn_in:hover {
  border-color: #23dfc6;
  background: #23dfc6;
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
