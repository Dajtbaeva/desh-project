<template>
  <Header />
  <div class="mt-20 bg-gradient-to-r from-teal-400 to-cyan-500 h-full">
    <h2 class="text-center text-xl pt-10 mb-5 font-semibold">
      Available rooms
    </h2>
    <div class="flex text-center justify-evenly">
      <div>
        <p class="mb-5">
          Enter time:
          <input
            type="number"
            v-model="hour"
            id="time"
            name="time"
            maxlength="2"
            min="8"
            max="20"
            step="1"
            class="w-full rounded-lg shadow-lg"
          />
        </p>
        <p class="mb-5">
          Choose day:
          <input
            list="days"
            data-list="days"
            type="text"
            v-model="day"
            id="day"
            name="day"
            class="w-full rounded-lg shadow-lg"
          />

          <datalist id="days">
            <option
              v-for="day of store.days"
              :key="day.name"
              :value="day.name"
            ></option>
          </datalist>
        </p>
        <div>
          <button
            class="w-48 mt-5 text-teal-500 cursor-pointer bg-white rounded-lg shadow-lg border border-spacing-3"
            @click="getAvailableRooms()"
          >
            Search
          </button>
        </div>
        <button
          class="w-48 mt-5 text-teal-500 cursor-pointer bg-white rounded-lg shadow-lg border border-spacing-3"
          @click="getCurrentRooms()"
        >
          Now
        </button>
      </div>
      <div class="flex flex-col justify-start items-center content-center">
        <p v-if="store.isLoading" class="text-white text-xl">Loading...</p>
        <div v-else class="mx-10 w-full">
          <div
            v-for="room of store.rooms"
            :key="room.id"
            class="flex flex-row items-center content-center mb-10 bg-white rounded-lg px-5 py-3 w-full"
          >
            {{ room.name }} (places: {{ room.capacity }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store/store";
import { ref } from "vue";

const store = useStore();
const currentDay = new Date();
const hour = ref(currentDay.getHours());
const day = ref(store.days[currentDay.getDay() - 1].name);

// const { data: rooms } = await useFetch(
//   `http://127.0.0.1:8000/api/available_rooms/?hour=${hour}&day=${day}`
// );

const getCurrentRooms = async () => {
  // console.log("onMounted works");
  await store.getCurrentAvailableRooms();
  // console.log(store.rooms);
};
const getAvailableRooms = () => {
  // console.log("Change btn is clicked, hour: " + hour.value + ", day: " + day);
  store.getAvailableRooms(hour.value, day.value);
};
onMounted(getCurrentRooms);

useHead({
  title: "Available rooms",
});
</script>
