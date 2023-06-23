<template>
  <div>
    <div class="leading-normal tracking-normal">
      <Header />
      <h3>Available rooms</h3>
      <div class="form">
        <p>
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
          />
        </p>
        <p>
          Enter day:
          <input
            list="days"
            data-list="days"
            type="text"
            v-model="day"
            id="day"
            name="day"
          />

          <datalist id="days">
            <option
              v-for="day of days"
              :key="day.name"
              value="{{ day.name }} "
            ></option>
          </datalist>
        </p>
        <!-- <button class="btn_in" @click="onChange()">Search</button> -->
        <!-- <button class="btn_in" @click="store.getAvailableRooms()">Now</button> -->
      </div>
    </div>
    <!-- <div v-for="room of rooms" :key="room.id">{{ room.name }}</div> -->
  </div>
</template>

<script async setup>
import { ref } from "vue";
import { useStore } from "@/store/store";

console.log(useStore);

const store = useStore();
const days = [
  { name: "Monday" },
  { name: "Tuesday" },
  { name: "Wednesday" },
  { name: "Thursday" },
  { name: "Friday" },
  { name: "Saturday" },
];
const hour = ref(0);
const day = ref("");

const { data: rooms } = await useFetch(
  "rooms",
  () => {
    store.getAvailableRooms(15, 4);
    console.log("From async data" + rooms);
  }
  //   $fetch(`/available_rooms/?hour=${hour}&day=${day}`)
);
</script>
