<template>
  <Header />
  <div class="mt-20 bg-gradient-to-r from-teal-400 to-cyan-500 h-full">
    <div class="main">
      <div class="form">
        <h3>Settings</h3>
        <p>
          Change your username
          <input type="text" v-model="username" id="username" name="username" />
        </p>
        <button class="btn_in" @click="changeUsername()">Change</button>
        <p>
          Change your password
          <input
            type="password"
            v-model="password"
            id="password"
            name="password"
          />
        </p>
        <button class="btn_in" @click="changePassword()">Change</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/store/store";

const username = ref("");
const password = ref("");
useHead({
  title: "Settings",
});
</script>
