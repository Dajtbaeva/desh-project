<template>
  <header
    id="header"
    class="fixed w-full z-30 top-0 text-white bg-gradient-to-r from-teal-400 to-cyan-500"
  >
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-3 px-5"
    >
      <div class="pl-4 flex items-center">
        <NuxtLink
          class="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          to="/"
        >
          DESH
        </NuxtLink>
      </div>
      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <NuxtLink
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              to="/"
              >Home</NuxtLink
            >
          </li>
          <li class="mr-3">
            <NuxtLink
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              to="/rooms"
              >Available rooms</NuxtLink
            >
          </li>
          <li class="mr-3">
            <NuxtLink
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              to="/settings"
              >Settings</NuxtLink
            >
          </li>
        </ul>
        <button
          id="navAction"
          class="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          @click="store.logout()"
        >
          Logout
        </button>
      </div>
    </div>
    <hr class="border-b-2 border-gray-100 opacity-25 my-0 py-0" />
  </header>
</template>
<script setup>
import { useStore } from "@/store/store";
const store = useStore();
</script>
