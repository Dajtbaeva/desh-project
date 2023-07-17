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
      localStorage.clear();
      await router.push({ name: "Auth" });
    },
    async validateApp(to: any): Promise<void> {
      const router = useRouter();
      const token = localStorage.getItem("accessToken") || null;
      if (to && to.meta && "requiresAuth" in to.meta && to.meta.requiresAuth) {
        if (!token) {
          localStorage.removeItem("accessToken");
          await router.push({ name: "Auth" });
          this.isLogged = false;
        }
        if (token) {
          // const role = localStorage.getItem("role") || null;
          this.isLogged = true;
        }
      }
      if (to.name === "Auth" && token) {
        const role = localStorage.getItem("role") || null;
        this.isLogged = true;
        // console.log(role);
        if (role) {
          await router.push({ name: role });
        }
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
          // console.log(this.rooms);
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
    async getUsers(data: keyof StoreData): Promise<User[] | undefined> {
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
    async getData<T>(
      path: string,
      data: keyof StoreData
    ): Promise<T[] | undefined> {
      if (!data || !path) return [];
      if (this[data] && this[data].length) {
        return this[data] as T[];
      }
      this.isLoading = true;
      try {
        const response = await api.getData<T[]>(path);
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
    async getUserById<T>(id: number): Promise<T | undefined> {
      if (!id) return;
      try {
        const response = await api.getUserById<T>(id);
        if (response) return response;
      } catch (err) {
        console.log("Error from getUserById: " + err);
      }
    },
    async getUserEvents<T>(user_id: number, item: string): Promise<T> {
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
    async addNewUser<T>(newUser: User): Promise<T[] | undefined> {
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
        const response = await api.getData<T[]>(item);
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
      event_start_time: string,
      room_id: number,
      discipline: string,
      day: string,
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
    async deleteUser(userId: number, users: keyof StoreData): Promise<void> {
      if (!this[items]) return;
      this[users] = this[users].filter((u: any) => u.id !== userId);
      await api.deleteUser(userId);
    },
    async deleteItem<T>(
      itemId: number,
      path: string,
      items: keyof StoreData
    ): Promise<void> {
      if (!this[items]) return;
      const data: T[] = this[items] as T[];
      this[items] = data.filter((i: any) => i.id !== itemId);
      await api.deleteItem(itemId, path);
    },
  },
});
