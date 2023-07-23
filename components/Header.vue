<template>
  <header
    id="header"
    class="fixed w-full z-30 top-0 text-white bg-gradient-to-r from-teal-400 to-cyan-500"
  >
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-3 py-3"
    >
      <div class="pl-4 flex items-center">
        <NuxtLink
          class="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          to="/"
        >
          {{ $t("title") }}
        </NuxtLink>
      </div>
      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <NuxtLink
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              to="/"
              >{{ $t("nav.home") }}</NuxtLink
            >
          </li>
          <li class="mr-3">
            <NuxtLink
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              to="/rooms"
              >{{ $t("nav.rooms") }}</NuxtLink
            >
          </li>
          <li class="mr-3">
            <NuxtLink
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              to="/settings"
              >{{ $t("nav.settings") }}</NuxtLink
            >
          </li>
          <li class="mr-3">
            <div>
              <v-autocomplete
                v-model="locale"
                :items="items"
                variant="underlined"
              ></v-autocomplete>
            </div>
          </li>
        </ul>
        <button
          id="navAction"
          class="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          @click="store.logout()"
        >
          {{ $t("button.logout") }}
        </button>
      </div>
    </div>
    <hr class="border-b-2 border-gray-100 opacity-25 my-0 py-0" />
  </header>
</template>
<script setup lang="ts">
import { useStore } from "@/store/store";
const store = useStore();
const { locale } = useI18n();
const items = [
  { title: "English", value: "en" },
  { title: "Русский", value: "ru" },
  { title: "Қазақ", value: "kz" },
];
const localeSave = () => {
  localStorage.setItem("lang", locale.value);
};
watch(locale, () => {
  localeSave();
});
</script>
