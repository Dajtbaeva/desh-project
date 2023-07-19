<template>
  <div class="shed">
    <h3>{{ $t("schedule") }}</h3>
    <table v-if="!store.isLoading">
      <tr>
        <th>{{ $t("event_table") }}</th>
        <th>{{ $t("days.monday") }}</th>
        <th>{{ $t("days.tuesday") }}</th>
        <th>{{ $t("days.wednesday") }}</th>
        <th>{{ $t("days.thursday") }}</th>
        <th>{{ $t("days.friday") }}</th>
        <th>{{ $t("days.saturday") }}</th>
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
    <div v-else="store.isLoading" class="mt-20 py-16">
      <v-progress-circular
        indeterminate
        :size="67"
        :width="5"
      ></v-progress-circular>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useStore } from "@/store/store";

export default {
  setup() {
    const shed = ref<Array<{ id: number; time: number; events: Eventt[] }>>([]);
    const events = ref<Eventt[]>([]);
    const emptyEvent: Eventt = {
      id: 0,
      event_start_time: 0,
      room: {
        id: 0,
        name: "",
        capacity: 0,
        organization: 0,
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
        organization: 0,
        group: null,
      },
      group: {
        id: 0,
        name: "",
        organization: 0,
      },
      status: true,
    };

    const store = useStore();

    const buildSchedule = () => {
      let j = 0;
      for (let i = 8; i < 20; i++) {
        shed.value.push({ id: j, time: i, events: [] });
        j++;
      }
      shed.value.forEach((item) => {
        const timeEvents: Eventt[] = [];
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
      if (!user_id || !role) return;
      try {
        const data = await store.getUserEvents<Eventt[]>(
          Number(user_id),
          role as string
        );
        if (data) {
          events.value = data;
          buildSchedule();
        } else {
          console.error("Error: data is undefined");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    onMounted(async () => {
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
