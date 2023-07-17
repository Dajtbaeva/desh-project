<template>
  <Header />
  <div class="mt-20" style="min-height: 1080px">
    <div class="nav">
      <button
        v-for="tab of tabs"
        @click="setTab(tab.num)"
        :class="activeTab === tab.num ? 'active' : ''"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="tabcontent" v-if="activeTab === 1">
      <div v-if="store.isLoading" class="py-16">
        <v-progress-circular
          indeterminate
          :size="67"
          :width="5"
        ></v-progress-circular>
      </div>
      <div v-else>
        <div v-for="user of store.tutors">
          <div class="card">
            <div class="name">
              Name: {{ user.name }} {{ user.surname }}, Email:
              {{ user.email }}
            </div>
            <div class="details">
              <button class="delete" @click="deleteUser(user.id, 'tutors')">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 2">
      <v-form
        @submit.prevent="addNewUser('tutor')"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">Add new tutor</h3>
        <v-col>
          <v-text-field
            label="Name"
            placeholder="Type"
            variant="outlined"
            v-model="addName"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Surname"
            placeholder="Type"
            variant="outlined"
            v-model="addSurname"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Email"
            placeholder="Type"
            type="email"
            variant="outlined"
            v-model="addEmail"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="#4DD0E1"
            :loading="store.isLoading"
            block
            text="white"
            size="large"
            type="submit"
            variant="elevated"
          >
            Add
          </v-btn>
        </v-col>
      </v-form>
    </div>
    <div class="tabcontent" v-if="activeTab === 3">
      <div v-if="store.isLoading" class="py-16">
        <v-progress-circular
          indeterminate
          :size="67"
          :width="5"
        ></v-progress-circular>
      </div>
      <div v-else>
        <div v-for="user of store.students">
          <div class="card">
            <div class="name">
              Name: {{ user.name }} {{ user.surname }}, Email:
              {{ user.email }}
            </div>
            <div class="details">
              <button class="delete" @click="deleteUser(user.id, 'students')">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 4">
      <v-form
        @submit.prevent="addNewUser('student')"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">Add new student</h3>
        <v-col>
          <v-text-field
            label="Name"
            placeholder="Type"
            variant="outlined"
            v-model="addName"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Surname"
            placeholder="Type"
            variant="outlined"
            v-model="addSurname"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Email"
            placeholder="Type"
            type="email"
            variant="outlined"
            v-model="addEmail"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Choose a group"
            placeholder="Type"
            type="input"
            variant="outlined"
            v-model="addGroupId"
            list="groups"
            id="group-choice"
            name="group-choice"
          ></v-text-field>
        </v-col>
        <datalist id="groups">
          <option
            v-for="group of store.groups"
            :key="group.id"
            :value="group.id"
          >
            {{ group.name }}
          </option>
        </datalist>
        <v-col cols="6">
          <v-btn
            color="#4DD0E1"
            :loading="store.isLoading"
            block
            text="white"
            size="large"
            type="submit"
            variant="elevated"
          >
            Add
          </v-btn>
        </v-col>
      </v-form>
    </div>
    <div class="tabcontent" v-if="activeTab === 5">
      <div class="rooms" v-for="group of store.groups">
        <div class="card">
          <div class="name">
            {{ group.name }}
          </div>
          <div class="details">
            <button
              class="delete"
              @click="deleteItem(group.id, 'group', 'groups')"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 6">
      <v-form
        @submit.prevent="addNewGroup()"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">Add new group</h3>
        <v-col>
          <v-text-field
            label="Name"
            placeholder="Type"
            variant="outlined"
            v-model="groupName"
            :rules="[rules.required, rules.group]"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="#4DD0E1"
            :loading="store.isLoading"
            block
            text="white"
            size="large"
            type="submit"
            variant="elevated"
          >
            Add
          </v-btn>
        </v-col>
      </v-form>
    </div>
    <div class="tabcontent" v-if="activeTab === 7">
      <div class="rooms" v-for="room of store.rooms">
        <div class="card">
          <div class="name">
            Name: {{ room.name }}, Places: {{ room.capacity }}
          </div>
          <div class="details">
            <button
              class="delete"
              @click="deleteItem(room.id, 'room', 'rooms')"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 8">
      <v-form
        @submit.prevent="addNewRoom()"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">Add new room</h3>
        <v-col>
          <v-text-field
            label="Name"
            placeholder="Type"
            variant="outlined"
            v-model="roomName"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Places"
            placeholder="Type"
            variant="outlined"
            v-model="roomCap"
            :rules="[rules.required]"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="#4DD0E1"
            :loading="store.isLoading"
            block
            text="white"
            size="large"
            type="submit"
            variant="elevated"
          >
            Add
          </v-btn>
        </v-col>
      </v-form>
    </div>
    <div class="tabcontent" v-if="activeTab === 9">
      <div class="events" v-for="event of store.events">
        <div class="card">
          <div class="name">
            {{ event.discipline }}, {{ event.tutor.name }}
            {{ event.tutor.surname }}, {{ store.days[event.day].name }}
            {{ event.event_start_time }}:00 -
            {{ event.event_start_time + 1 }}:00, room:
            {{ event.room.name }}
          </div>
          <div class="details">
            <button
              class="delete"
              @click="deleteItem(event.id, 'event', 'events')"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 10">
      <v-form
        @submit.prevent="addNewEvent()"
        class="color-white flex flex-col items-center"
      >
        <h3 class="text-center p-5 font-bold text-2xl">Add new event</h3>
        <v-col>
          <v-text-field
            label="Lesson start time"
            placeholder="Type"
            variant="outlined"
            type="number"
            v-model="addTime"
            id="time"
            maxlength="2"
            min="8"
            max="20"
            step="1"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Day"
            placeholder="Type"
            variant="outlined"
            list="days"
            data-list="days"
            type="text"
            v-model="addDay"
            id="day"
            name="day"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <datalist id="days">
          <option v-for="day of store.days" :value="day.name"></option>
        </datalist>
        <v-col>
          <v-text-field
            label="Name of discipline"
            placeholder="Type"
            variant="outlined"
            v-model="disciplineName"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            list="tutors"
            data-list="tutors"
            id="tutor-choice"
            name="tutor-choice"
            v-model="addTutorId"
            label="Choose a tutor"
            placeholder="Type"
            type="input"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <datalist id="tutors">
          <option v-for="tutor of store.tutors" :value="tutor.id">
            {{ tutor.name }} {{ tutor.surname }}
          </option>
        </datalist>
        <v-col>
          <v-text-field
            label="Choose a group"
            placeholder="Type"
            type="input"
            variant="outlined"
            v-model="addGroupId"
            list="groups"
            id="group-choice"
            name="group-choice"
          ></v-text-field>
        </v-col>
        <datalist id="groups">
          <option
            v-for="group of store.groups"
            :key="group.id"
            :value="group.id"
          >
            {{ group.name }}
          </option>
        </datalist>
        <v-col>
          <v-text-field
            label="Choose a room"
            list="rooms"
            id="room-choice"
            name="room-choice"
            v-model="addRoomId"
            placeholder="Type"
            type="input"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <datalist id="rooms">
          <option v-for="room of store.rooms" :value="room.id">
            {{ room.name }}
          </option>
        </datalist>
        <v-col cols="6">
          <v-btn
            color="#4DD0E1"
            :loading="store.isLoading"
            block
            text="white"
            size="large"
            type="submit"
            variant="elevated"
          >
            Add
          </v-btn>
        </v-col>
      </v-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store/store";

const tabs = [
  { name: "Tutors", num: 1 },
  { name: "Add new tutor", num: 2 },
  { name: "Students", num: 3 },
  { name: "Add new student", num: 4 },
  { name: "Groups", num: 5 },
  { name: "Add new group", num: 6 },
  { name: "Rooms", num: 7 },
  { name: "Add new room", num: 8 },
  { name: "Events", num: 9 },
  { name: "Add new event", num: 10 },
];
const activeTab = ref(1);
const addName = ref("");
const addSurname = ref("");
const addEmail = ref("");
const addGroupId = ref("");
const groupName = ref("");
const roomName = ref("");
const roomCap = ref(0);
const addTime = ref(0);
const addDay = ref("");
const disciplineName = ref("");
const addTutorId = ref("");
const addRoomId = ref(0);
const addTutorGroup = null;
const store = useStore();

const setTab = (tabNumber: number) => {
  activeTab.value = tabNumber;
};

const rules = {
  required: (value: any) => !!value || "Field is required",
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid email";
  },
  group: (value: string) => {
    const pattern = /^[a-z]+-[a-z]+-\d$/;
    return pattern.test(value) || "Invalid format";
  },
};

const getData = async () => {
  await Promise.allSettled([
    store.getUsers("tutors"),
    store.getUsers("students"),
    store.getData<Room[]>("room", "rooms"),
    store.getData<Group[]>("group", "groups"),
    store.getData<Event[]>("event", "events"),
  ]);
};
const deleteUser = async (userId: number, users: any) => {
  // console.log("Delete user works");
  await store.deleteUser(userId, users);
};
const deleteItem = async (id: number, path: string, items: any) => {
  // console.log("Delete item works");
  await store.deleteItem(id, path, items);
};
const addNewUser = async (role: string) => {
  const role_id = role === "student" ? 2 : 3;
  const org_id = localStorage.getItem("org_id") || null;
  if (org_id && role_id === 3) {
    const newUser: User = {
      id: null,
      username: null,
      password: null,
      name: addName.value,
      surname: addSurname.value,
      email: addEmail.value,
      role: role_id,
      organization: Number(org_id),
      group: addTutorGroup,
    };
    await store.addNewUser(newUser);
    addName.value = "";
    addSurname.value = "";
    addEmail.value = "";
  }
  if (org_id && role_id === 2) {
    const newUser: User = {
      id: null,
      username: null,
      password: null,
      name: addName.value,
      surname: addSurname.value,
      email: addEmail.value,
      role: role_id,
      organization: Number(org_id),
      group: Number(addGroupId.value),
    };
    await store.addNewUser(newUser);
    addName.value = "";
    addSurname.value = "";
    addEmail.value = "";
    addGroupId.value = "";
  }
};
const addNewGroup = async () => {
  const org_id = localStorage.getItem("org_id") || null;
  if (org_id) {
    await store.addNewGroup(groupName.value, org_id);
    groupName.value = "";
  }
};
const addNewRoom = async () => {
  const org_id = localStorage.getItem("org_id") || null;
  if (org_id) {
    await store.addNewRoom(roomName.value, roomCap.value, org_id);
    roomName.value = "";
    roomCap.value = 0;
  }
};
const addNewEvent = async () => {
  const org_id = localStorage.getItem("org_id") || null;
  const day = store.days.findIndex((day) => day.name === addDay.value.trim());
  if (org_id) {
    await store.addNewEvent(
      addTime.value,
      Number(addRoomId.value),
      disciplineName.value,
      day,
      Number(addTutorId.value),
      Number(addGroupId.value)
    );
    addTime.value = 0;
    addDay.value = "";
    addTutorId.value = "";
    disciplineName.value = "";
    addRoomId.value = 0;
    addGroupId.value = "";
  }
};
onMounted(getData);

useHead({
  title: "Admin page",
});
</script>
<style scoped>
.nav button.active {
  background-color: #ccc;
}
/* .custom-button {
  background: #4dd0e1 !important;
  color: white;
} */
</style>
