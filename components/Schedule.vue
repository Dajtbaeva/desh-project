<template>
  <div class="shed">
    <h3>Your schedule</h3>
    <table v-if="!store.isLoading">
      <tr>
        <th>hour / day</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
      </tr>
      <tr v-for="item of shed">
        <th>{{ item.time }}:00 - {{ item.time + 1 }}:00</th>
        <td
          v-for="event of item.events"
          :class="event.discipline ? 'active' : ''"
        >
          <p v-if="event.event_start_time">
            {{ event.discipline }}, {{ event.tutor.name }}
            {{ event.tutor.surname }}, ({{ event.room.name }})
          </p>
        </td>
      </tr>
    </table>
    <h4 v-else class="mt-20">Loading...</h4>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "@/store/store";

export default {
  setup() {
    const shed = ref([]);
    const events = ref([]);
    const emptyEvent = {
      id: 0,
      event_start_time: 0,
      room: {
        id: 0,
        name: "",
        capacity: 0,
        organization: "",
      },
      discipline: "",
      day: 0,
      tutor: {
        id: 0,
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        role: 3,
        organization: "",
        group: null,
      },
      group: {
        id: 0,
        name: "",
        organization: "",
      },
      status: true,
    };

    const store = useStore();

    const buildSchedule = () => {
      // console.log("buildSchedule works");
      let j = 0;
      for (let i = 8; i < 20; i++) {
        shed.value.push({ id: j, time: i, events: [] });
        j++;
      }
      shed.value.forEach((item) => {
        const timeEvents = [];
        const currentEvents = events.value.filter(
          (event) => item.time === event.event_start_time
        );
        for (let i = 1; i < 7; i++) {
          const event = currentEvents.find((event) => event.day === i);
          timeEvents.push(event ? event : emptyEvent);
        }
        item.events = timeEvents;
      });
    };
    const getEvents = async () => {
      const user_id = localStorage.getItem("user_id");
      const role = localStorage.getItem("role");
      try {
        const data = await store.getUserEvents(user_id, role);
        if (data) {
          events.value = data;
          // console.log(events.value);
          buildSchedule();
        } else {
          console.error("Error: data is undefined");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    onMounted(async () => {
      // console.log("onMounted works from schedule");
      await getEvents();
    });
    return {
      shed,
      events,
      emptyEvent,
      store,
    };
  },
};
</script>
<style scoped>
.shed {
  margin: 100px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
h3 {
  padding: 15px;
  font-variant: inherit;
  font-size: 1.5rem;
}
table {
  border: 1px solid #ccc;
  width: 80%;
}
td,
th {
  border: 1px solid #ccc;
  width: 10%;
}
p {
  text-align: center;
}
.active {
  background-color: #abf1e8;
}
.canceled {
  background-color: #e03f3f;
}
</style>
