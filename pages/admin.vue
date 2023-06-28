<template>
  <div>
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
      <!-- <app-user-list [role]="tutor"></app-user-list> -->
      <h2>user list component, list of all tutors</h2>
    </div>
    <div class="tabcontent" v-if="activeTab === 2">
      <div class="form">
        <h3>Add new tutor</h3>
        <p>
          Name
          <input type="text" v-model="addName" id="name" name="name" required />
        </p>
        <p>
          Surname
          <input
            type="text"
            v-model="addSurname"
            id="surname"
            name="surname"
            required
          />
        </p>
        <p>
          Email
          <input
            type="email"
            v-model="addEmail"
            id="email"
            name="email"
            required
          />
        </p>
        <button class="btn_in" @click="addNewUser(tutor)">Add</button>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 3">
      <!-- <app-user-list [role]="student"></app-user-list> -->
      <h3>user list component, list of students</h3>
    </div>
    <div class="tabcontent" v-if="activeTab === 4">
      <div class="form">
        <h3>Add new student</h3>
        <p>
          Name
          <input type="text" v-model="addName" id="name" name="name" required />
        </p>
        <p>
          Surname
          <input
            type="text"
            v-model="addSurname"
            id="surname"
            name="surname"
            required
          />
        </p>
        <p>
          Email
          <input
            type="email"
            v-model="addEmail"
            id="email"
            name="email"
            required
          />
        </p>
        <input
          list="groups"
          id="group-choice"
          name="group-choice"
          placeholder="Choose a group"
          v-if="addGroupId"
        />
        <datalist id="groups">
          <option v-for="group of groups" :key="group.id">
            {{ group.name }}
          </option>
        </datalist>

        <button class="btn_in" @click="addNewUser(student)">Add</button>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 5">
      <!-- <app-group-item
        v-if="group of groups"
        [group]="group"
        [students]="getStudentsByGroupId(group.id)"
      >
      </app-group-item> -->
      <h2>component list of groups</h2>
    </div>
    <div class="tabcontent" v-if="activeTab === 6">
      <div class="form">
        <h3>Add new group</h3>
        <p>
          Enter group name
          <input
            type="text"
            v-model="groupName"
            id="name"
            name="name"
            required
          />
        </p>
        <button class="btn_in" @click="addNewGroup()">Add</button>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 7">
      <div class="rooms" v-for="room of rooms">
        <div class="card">
          <div class="name">
            <p>{{ room.name | titlecase }} ({{ room.capacity }})</p>
          </div>
          <div class="details">
            <button class="delete" @click="deleteRoom(room)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 8">
      <div class="form">
        <h3>Add new room</h3>
        <p>
          Enter room name
          <input
            type="text"
            v-model="roomName"
            id="name"
            name="name"
            required
          />
        </p>
        <p>
          Enter capacity of room
          <input
            type="number"
            v-model="roomCap"
            id="name"
            name="name"
            required
          />
        </p>
        <button class="btn_in" @click="addNewRoom()">Add</button>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 9">
      <div class="events" v-for="event of events">
        <div class="card">
          <div class="name">
            <p>
              {{ event.discipline | titlecase }} {{ event.event_start_time }}:00
              - {{ event.event_start_time + 1 }}:00, {{ days[event.day].name }},
              {{ event.tutor.name }} {{ event.tutor.surname }}
            </p>
          </div>
          <div class="details">
            <button class="delete" @click="deleteEvent(event)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tabcontent" v-if="activeTab === 10">
      <div class="form">
        <h3>Add new event</h3>
        <p>
          Enter start time
          <input
            type="number"
            v-model="addTime"
            id="time"
            name="time"
            maxlength="2"
            min="8"
            max="20"
            step="1"
            required
          />
        </p>
        <p>
          Enter day
          <input
            list="days"
            data-list="days"
            type="text"
            v-model="addDay"
            id="day"
            name="day"
            required
          />

          <datalist id="days">
            <option v-for="day of days" :value="day.name"></option>
          </datalist>
        </p>
        <p>
          Enter name of discipline
          <input
            id="discipline"
            name="discipline"
            v-model="disciplineName"
            required
          />
        </p>
        <input
          list="tutors"
          data-list="tutors"
          id="tutor-choice"
          name="tutor-choice"
          placeholder="Choose a tutor"
          v-model="addTutorId"
        />
        <datalist id="tutors">
          <option v-for="tutor of tutors" :value="tutor.id">
            {{ tutor.name }} {{ tutor.surname }}
          </option>
        </datalist>
        <input
          list="groups"
          id="group-choice"
          name="group-choice"
          placeholder="Choose a group"
          v-model="addGroupId"
        />
        <datalist id="groups">
          <option v-for="group of groups" :value="group.id">
            {{ group.name }}
          </option>
        </datalist>
        <input
          list="rooms"
          id="room-choice"
          name="room-choice"
          placeholder="Choose a room"
          v-model="addRoomId"
        />
        <datalist id="rooms">
          <option v-for="room of rooms" :value="room.id">
            {{ room.name }}
          </option>
        </datalist>
        <button class="btn_in" @click="addNewEvent()">Add</button>
      </div>
    </div>
  </div>
</template>
<script setup>
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
const addGroupId = ref(0);
const groupName = ref("");
const roomName = ref("");
const roomCap = ref(0);
const addTime = ref(0);
const addDay = ref("");
const disciplineName = ref("");
const addTutorId = ref("");
const addRoomId = ref(0);

const setTab = (tabNumber) => {
  activeTab.value = tabNumber;
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.nav {
  float: left;
  border: 1px solid #ccc;
  overflow: hidden;
  position: fixed;
  top: 80px;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #f1f1f1;
  z-index: 1;
}
.nav button {
  display: block;
  background-color: inherit;
  color: black;
  padding: 22px 16px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
}
.nav button:hover {
  background-color: #ddd;
}
.nav button.active {
  background-color: #ccc;
}
.tabcontent {
  margin: 80px auto;
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
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  margin: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  width: 600px;
}
.card:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.name {
  font-size: 24px;
  font-weight: bold;
}
.details {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
button {
  background-color: #4f9d55;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
button:hover {
  background-color: #3a613e;
}
.delete {
  background-color: #b93939;
}
.delete:hover {
  background-color: #5c2121;
}
#group-choice,
#tutor-choice,
#discipline-choice,
#room-choice {
  width: 70%;
}
</style>
