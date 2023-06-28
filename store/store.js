import { defineStore } from "pinia";
import { api } from "@/api/index";
// import devalue from "@nuxt/devalue";

export const useStore = defineStore("store", {
  state: () => ({
    isLoading: false,
    isLogged: false,
    // api: devalue(api),
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
        console.log("This error from getCurrentAvailableRooms: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async getAvailableRooms(hour, day) {
      if (!hour || !day) return;
      this.isLoading = true;
      const index = this.days.findIndex((item) => item.name === day) + 1;
      console.log(index);
      try {
        if (hour > 7 && hour < 21 && index > 0 && index < 7) {
          this.rooms = await api.getAvailableRooms(hour, index);
        } else {
          throw new Error("No value");
        }
      } catch (err) {
        console.log("This error from getAvailableRooms: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    addNewUser(name, surname, email, role, organization, group) {
      if(!name || !surname || !email || !role || !organization || !group) return;
      try {
      } catch (err) {
        console.log("This error from getAvailableRooms: " + err);
      } finally {
        this.isLoading = false;
      }
      
    }
  },
});
