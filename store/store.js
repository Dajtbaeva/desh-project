import { defineStore } from "pinia";
import { api } from "@/api";

export const useStore = defineStore("store", {
  state: () => ({
    isLogged: false,
    api: JSON.parse(JSON.stringify(api)),
    days: [
      { name: "Monday" },
      { name: "Tuesday" },
      { name: "Wednesday" },
      { name: "Thursday" },
      { name: "Friday" },
      { name: "Saturday" },
    ],
    rooms: [],
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
    async getAvailableRooms(hour, day) {
      if (!hour && !day) return;
      this.isLoading = true;
      try {
        const currentDay = new Date();
        this[hour] = currentDay.getHours();
        this[day] = this.days[currentDay.getDay() - 1].name;
        if (this[hour] > 7 && this[hour] < 21 && this[day]) {
          this.rooms = await this.api.getAvailableRooms(this[hour], this[day]);
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
