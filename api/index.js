import axios from "axios";

const Methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export class ApiClass {
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    });
  }
  async axiosCall(config) {
    const response = await this.instance.request(config);
    return response.data;
  }
  async getAvailableRooms(hour, day) {
    return await this.axiosCall({
      method: Methods.GET,
      url: `/available_rooms/?hour=${hour}&day=${day}`,
    });
  }
  async getData(data) {
    return await this.axiosCall({
      method: Methods.GET,
      url: `/${data}/`,
    });
  }
  async getUserById(id) {
    return await this.axiosCall({
      method: Methods.GET,
      url: `/user/${id}`,
    });
  }
  async getUserEvents(id, item) {
    return await this.axiosCall({
      method: Methods.GET,
      url: `/${item}/${id}/events`,
    });
  }
  async login(username, password) {
    return await this.axiosCall({
      method: Methods.POST,
      url: "/login/",
      data: { username, password },
    });
  }
  async addNewUser(name, surname, email, role, organization, group) {
    return await this.axiosCall({
      method: Methods.POST,
      url: `/user/`,
      data: {
        name,
        surname,
        email,
        role,
        organization,
        group,
      },
    });
  }
  async addNewGroup(name, organization) {
    return await this.axiosCall({
      method: Methods.POST,
      url: `/group/`,
      data: {
        name,
        organization,
      },
    });
  }
  async addNewRoom(name, capacity, organization) {
    return await this.axiosCall({
      method: Methods.POST,
      url: `/room/`,
      data: {
        name,
        capacity,
        organization,
      },
    });
  }
  async addNewEvent(
    event_start_time,
    room_id,
    discipline,
    day,
    tutor_id,
    group_id
  ) {
    return await this.axiosCall({
      method: Methods.POST,
      url: `/event/`,
      data: {
        event_start_time,
        room_id,
        discipline,
        day,
        tutor_id,
        group_id,
      },
    });
  }
  async updateUser(user) {
    return await this.axiosCall({
      method: Methods.PUT,
      url: `/user/${user.id}`,
      data: user,
    });
  }
  async deleteUser(userId) {
    return await this.axiosCall({
      method: Methods.DELETE,
      url: `/user/${userId}`,
    });
  }
  async deleteItem(id, item) {
    return await this.axiosCall({
      method: Methods.DELETE,
      url: `/${item}/${id}`,
    });
  }
}

export const api = new ApiClass();
