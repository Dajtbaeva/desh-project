import { defineStore } from "pinia";
import { api } from "@/api/index";
import devalue from "@nuxt/devalue";

export const useStore = defineStore("store", {
  state: () => ({
    isLogged: false,
    api: devalue(api),
    // api: JSON.parse(JSON.stringify(api)),
    days: [
      { name: "Monday" },
      { name: "Tuesday" },
      { name: "Wednesday" },
      { name: "Thursday" },
      { name: "Friday" },
      { name: "Saturday" },
    ],
    rooms: [],
    // hour: "",
    // day: "",
  }),
  actions: {
    // login(token, username, password, role, user_id, org_id) {
    //   this.isLogged = true;
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("role", role);
    //   localStorage.setItem("user_id", user_id);
    //   localStorage.setItem("org_id", org_id);
    //   // post method to authentication using username and password
    //   this.router.push([`/${role}`]);
    // },
    // logout() {
    //   this.isLogged = false;
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("role");
    //   localStorage.removeItem("user_id");
    //   localStorage.removeItem("org_id");
    // },
    async getCurrentAvailableRooms() {
      this.isLoading = true;
      try {
        const currentDay = new Date();
        const hour = currentDay.getHours();
        const day = currentDay.getDay();
        if (hour > 7 && hour < 21) {
          this.rooms = await api.getAvailableRooms(hour, day);
        } else {
          throw new Error("No value");
        }
      } catch (err) {
        console.log("This error from getAvailableRooms: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async getAvailableRooms(hour, day) {
      if (!hour && !day) return;
      this.isLoading = true;
      try {
        const currentDay = new Date();
        this[hour] = currentDay.getHours();
        this[day] = currentDay.getDay();
        if (this[hour] > 7 && this[hour] < 21 && this[day] > 0 && this[day] < 7) {
          this.rooms = await api.getAvailableRooms(this[hour], this[day]);
        } else {
          throw new Error("No value");
        }
      } catch (err) {
        console.log("This error from getAvailableRooms: " + err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
