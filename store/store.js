import { defineStore } from "pinia";
import { api } from "@/api/index";

export const useStore = defineStore("store", {
  state: () => ({
    isLoading: false,
    isLogged: false,
    days: [
      { name: "Sunday" },
      { name: "Monday" },
      { name: "Tuesday" },
      { name: "Wednesday" },
      { name: "Thursday" },
      { name: "Friday" },
      { name: "Saturday" },
    ],
    rooms: [],
    tutors: [],
    students: [],
    groups: [],
    events: [],
  }),
  actions: {
    async login(username, password) {
      const router = useRouter();
      if (!username || !password) return;
      try {
        this.isLoading = true;
        const response = await api.login(username, password);
        if (response) {
          localStorage.setItem("accessToken", response.token);
          localStorage.setItem("role", response.role);
          localStorage.setItem("user_id", response.user_id);
          localStorage.setItem("org_id", response.org_id);
          const role = localStorage.getItem("role") || null;
          this.isLogged = true;
          await router.push({ name: role });
        }
      } catch (err) {
        console.log("Error from store login(): " + err);
        alert("Invalid username or password!");
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      const router = useRouter();
      this.isLogged = false;
      localStorage.clear();
      await router.push({ name: "Auth" });
    },
    async validateApp(to) {
      const router = useRouter();
      const token = localStorage.getItem("accessToken") || null;
      if (to && to.meta && "requiresAuth" in to.meta && to.meta.requiresAuth) {
        if (!token) {
          localStorage.removeItem("accessToken");
          await router.push({ name: "Auth" });
          this.isLogged = false;
        }
        if (token) {
          const role = localStorage.getItem("role") || null;
          this.isLogged = true;
        }
      }
      if (to.name === "Auth" && token) {
        const role = localStorage.getItem("role") || null;
        this.isLogged = true;
        console.log(role);
        if (role) {
          await router.push({ name: role });
        }
      }
    },
    async getCurrentAvailableRooms() {
      this.isLoading = true;
      try {
        const currentDay = new Date();
        const hour = currentDay.getHours();
        const day = currentDay.getDay();
        if (hour > 7 && hour < 21) {
          this.rooms = await api.getAvailableRooms(hour, day);
        } else {
          this.rooms = [];
          console.log(this.rooms);
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
      if (this.rooms && this.rooms.length) {
        return this.rooms;
      }
      const index = this.days.findIndex((item) => item.name === day);
      try {
        this.isLoading = true;
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
    async getUsers(data) {
      if (!data) return;
      if (this[data] && this[data].length) {
        return this[data];
      }
      this.isLoading = true;
      try {
        const response = await api.getData(data);
        if (response) {
          this[data] = response;
          return response;
        }
      } catch (err) {
        console.log("This error from getData from store: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async getData(path, data) {
      if (!data || !path) return;
      if (this[data] && this[data].length) {
        return this[data];
      }
      this.isLoading = true;
      try {
        const response = await api.getData(path);
        if (response) {
          this[data] = response;
          return response;
        }
      } catch (err) {
        console.log("This error from getData from store: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async getUserById(id) {
      if (!id) return;
      try {
        const response = await api.getUserById(id);
        if (response) return response;
      } catch (err) {
        console.log("Error from getUserById: " + err);
      }
    },
    async getUserEvents(user_id, item) {
      if (!user_id || !item) return;
      this.isLoading = true;
      try {
        const response = await api.getUserEvents(user_id, item);
        if (response) return response;
      } catch (err) {
        console.log("Error from getUserEvents: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    // async addNewAdmin() {
    //   await api.addNewUser("Darina", "Test", "dajtbaeva@gmail.com", 3, 1, null);
    // },
    async addNewUser(newUser) {
      if (!newUser) return;
      const item = newUser.role === 3 ? "tutors" : "students";
      this.isLoading = true;
      try {
        await api.addNewUser(
          newUser.name,
          newUser.surname,
          newUser.email,
          newUser.role,
          newUser.organization,
          newUser.group
        );
        const response = await api.getData(item);
        if (response) {
          this[item] = response;
          return response;
        }
      } catch (err) {
        console.log("Error from addNewUser: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async addNewGroup(name, organization) {
      if (!name || !organization) return;
      this.isLoading = true;
      try {
        await api.addNewGroup(name, organization);
        const response = await api.getData("group");
        if (response) this["groups"] = response;
      } catch (err) {
        console.log("Error from addNewGroup: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async addNewRoom(name, capacity, organization) {
      if (!name || !organization) return;
      this.isLoading = true;
      try {
        await api.addNewRoom(name, capacity, organization);
        const response = await api.getData("room");
        if (response) this["rooms"] = response;
      } catch (err) {
        console.log("Error from addNewRoom: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async addNewEvent(
      event_start_time,
      room_id,
      discipline,
      day,
      tutor_id,
      group_id
    ) {
      if (
        !event_start_time ||
        !room_id ||
        !discipline ||
        !day ||
        !tutor_id ||
        !group_id
      )
        return;
      this.isLoading = true;
      try {
        await api.addNewEvent(
          event_start_time,
          room_id,
          discipline,
          day,
          tutor_id,
          group_id
        );
        const response = await api.getData("event");
        if (response) this["events"] = response;
      } catch (err) {
        console.log("Error from addNewEvent: " + err);
        alert("Oops! This time is not free!");
      } finally {
        this.isLoading = false;
      }
    },
    async updateUser(user) {
      this.isLoading = true;
      try {
        await api.updateUser(user);
        // const response = await api.updateUser(user);
        // if (response) return response;
      } catch (err) {
        console.log("Error from updateUser function: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser(userId, users) {
      this[users] = this[users].filter((u) => u.id !== userId);
      await api.deleteUser(userId);
    },
    async deleteItem(itemId, path, items) {
      this[items] = this[items].filter((i) => i.id !== itemId);
      await api.deleteItem(itemId, path);
    },
  },
});
