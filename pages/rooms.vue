<template>
  <Header />
  <div class="mt-24 flex text-center justify-around">
    <div class="color-white w-1/3">
      <h2 class="text-center p-5 font-bold text-2xl">
        {{ $t("search") }}
      </h2>
      <v-col>
        <v-text-field
          :label="$t('label.freetime')"
          :placeholder="$t('placeholder')"
          variant="outlined"
          type="number"
          v-model="hour"
          id="time"
          name="time"
          maxlength="2"
          min="8"
          max="20"
          step="1"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :label="$t('label.day')"
          :placeholder="$t('placeholder')"
          variant="outlined"
          list="days"
          data-list="days"
          type="text"
          v-model="day"
          id="day"
          name="day"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <datalist id="days">
        <option
          v-for="day of store.days"
          :key="day.name"
          :value="day.name"
        ></option>
      </datalist>
      <v-col>
        <v-btn
          color="#80CBC4"
          @click="getAvailableRooms()"
          :loading="store.isLoading"
          block
          size="large"
          type="submit"
          variant="elevated"
        >
          {{ $t("button.search") }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          color="#80CBC4"
          @click="getCurrentRooms()"
          :loading="store.isLoading"
          block
          size="large"
          type="submit"
          variant="elevated"
        >
          {{ $t("button.now") }}
        </v-btn>
      </v-col>
    </div>
    <div class="flex flex-col justify-start items-center content-center">
      <div v-if="store.isLoading" class="py-16">
        <v-progress-circular
          indeterminate
          :size="67"
          :width="5"
        ></v-progress-circular>
      </div>
      <div v-else class="mx-10">
        <h2 class="text-center pt-5 font-bold text-2xl">
          {{ $t("nav.rooms") }}
        </h2>
        <div
          v-if="!store.rooms.length"
          class="text-center pt-10 font-bold text-2xl"
        >
          {{ $t("norooms") }}
        </div>
        <div v-else>
          <div v-for="room of store.rooms" :key="room.id">
            <div class="card" style="width: 500px">
              <div class="name">
                {{ room.name }} ({{ $t("card.places") }}: {{ room.capacity }})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store";
import { ref } from "vue";
const { t: $t } = useI18n();

const store = useStore();
const currentDay = new Date();
const hour = ref(currentDay.getHours());
const day = ref(store.days[currentDay.getDay()].name);
const rules = {
  required: (value: any) => !!value || $t("rules.required"),
};
const getCurrentRooms = async () => {
  await store.getCurrentAvailableRooms();
};
const getAvailableRooms = () => {
  store.getAvailableRooms(hour.value, day.value);
};
onMounted(getCurrentRooms);
useHead({
  title: "Available rooms",
});
</script>
