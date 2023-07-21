import { defineStore } from "pinia";
import { api } from "@/api/index";
import { Room, Group, Eventt } from "~/composables/classes";
import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from "vue-router";
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
    rooms: [] as Room[],
    tutors: [] as User[],
    students: [] as User[],
    groups: [] as Group[],
    events: [] as Eventt[],
  }),
  actions: {
    async login(username: string, password: string): Promise<void> {
      const router = useRouter();
      if (!username || !password) return;
      try {
        this.isLoading = true;
        const response = await api.login<Response>(username, password);
        if (response) {
          localStorage.setItem("accessToken", response.token);
          localStorage.setItem("role", response.role);
          localStorage.setItem("user_id", response.user_id);
          localStorage.setItem("org_id", response.org_id);
          const role = localStorage.getItem("role") || undefined;
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
    async logout(): Promise<void> {
      const router = useRouter();
      this.isLogged = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
      localStorage.removeItem("org_id");
      // localStorage.clear();
      await router.push({ name: "Auth" });
    },
    async validateApp(to: RouteLocationNormalized | RouteLocationNormalizedLoaded): Promise<void> {
      const router = useRouter();
      const token = localStorage.getItem("accessToken") || null;
      if (to && to.meta && "requiresAuth" in to.meta && to.meta.requiresAuth) {
        if (!token) {
          localStorage.removeItem("accessToken");
          await router.push({ name: "Auth" });
          this.isLogged = false;
        }
        if (token) {
          this.isLogged = true;
        }
      }
      if (to.name === "Auth" && token) {
        const role = localStorage.getItem("role") || null;
        this.isLogged = true;
        if (role) {
          await router.push({ name: role });
        }
      }
    },
    async getAllData() {
      try {
        await Promise.allSettled([
          this.getUsers("tutors"),
          this.getUsers("students"),
          this.getData("room", "rooms"),
          this.getData("group", "groups"),
          this.getData("event", "events"),
        ]);
      } catch (err) {
        console.log(err);
      }
    },
    async getCurrentAvailableRooms(): Promise<void> {
      this.isLoading = true;
      try {
        const currentDay = new Date();
        const hour = currentDay.getHours();
        const day = currentDay.getDay();
        if (hour > 7 && hour < 21) {
          this.rooms = await api.getAvailableRooms(hour, day);
        } else {
          this.rooms = [];
          throw new Error("No value");
        }
      } catch (err) {
        console.log("This error from getCurrentAvailableRooms: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async getAvailableRooms(hour: number, day: string) {
      if (!hour || !day) return [];
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
    async getUsers(data: Users): Promise<User[] | undefined> {
      if (!data) return [];
      if (this[data] && this[data].length) {
        return this[data] as User[];
      }
      this.isLoading = true;
      try {
        const response = await api.getData<User[]>(data);
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
    async getData(
      path: string,
      data: Items
    ): Promise<Room[] | Group[] | Eventt[] | undefined> {
      if (!data || !path) return [];
      if (this[data] && this[data].length) {
        return this[data] as Room[] | Group[] | Eventt[];
      }
      this.isLoading = true;
      try {
        const response = await api.getData<Room[] | Group[] | Eventt[]>(path);
        if (response.length) {
          this[data] = response;
          return response;
        }
      } catch (err) {
        console.log("This error from getData from store: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async getUserById<T>(id: number): Promise<T | undefined> {
      if (!id) return;
      try {
        const response = await api.getUserById<T>(id);
        if (response) return response;
      } catch (err) {
        console.log("Error from getUserById: " + err);
      }
    },
    async getUserEvents<T>(user_id: number, item: string): Promise<T[]> {
      if (!user_id || !item) return [];
      this.isLoading = true;
      try {
        const response = await api.getUserEvents<T>(user_id, item);
        if (response) return response as T[];
      } catch (err) {
        console.log("Error from getUserEvents: " + err);
      } finally {
        this.isLoading = false;
      }
      return [];
    },
    // async addNewAdmin() {
    //   await api.addNewUser("Darina", "Test", "dajtbaeva@gmail.com", 3, 1, null);
    // },
    async addNewUser(newUser: User): Promise<User[] | undefined> {
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
        const response = await api.getData<User[]>(item);
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
    async addNewGroup(name: string, organization: string): Promise<void> {
      if (!name || !organization) return;
      this.isLoading = true;
      try {
        await api.addNewGroup(name, organization);
        const response = await api.getData<Group[]>("group");
        if (response) this["groups"] = response;
      } catch (err) {
        console.log("Error from addNewGroup: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async addNewRoom(name: string, capacity: number, organization: string) {
      if (!name || !organization) return;
      this.isLoading = true;
      try {
        await api.addNewRoom(name, capacity, organization);
        const response = await api.getData<Room[]>("room");
        if (response) this["rooms"] = response;
      } catch (err) {
        console.log("Error from addNewRoom: " + err);
      } finally {
        this.isLoading = false;
      }
    },
    async addNewEvent(
      event_start_time: number,
      room_id: number,
      discipline: string,
      day: number,
      tutor_id: number,
      group_id: number
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
        const response = await api.getData<Eventt[]>("event");
        if (response) this["events"] = response;
      } catch (err) {
        console.log("Error from addNewEvent: " + err);
        alert("Oops! This time is not free!");
      } finally {
        this.isLoading = false;
      }
    },
    async updateUser(user: User): Promise<void> {
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
    async deleteUser(userId: number, users: Users): Promise<void> {
      if (!this[users]) return;
      try {
        await api.deleteUser(userId);
        this[users] = this[users].filter((u) => u.id !== userId);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteItem(
      itemId: number,
      path: string,
      items: Items
    ): Promise<void> {
      if (!itemId || !path || !items) return;
      try {
        await api.deleteItem(itemId, path);
        await this.getData(path, items);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
