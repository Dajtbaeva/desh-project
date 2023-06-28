import axios from "axios";

const GET = "GET";
const POST = "POST";
const DELETE = "DELETE";

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
      method: GET,
      url: `/available_rooms/?hour=${hour}&day=${day}`,
    });
  }
  async getData(data) {
    return await this.axiosCall({
      method: GET,
      url: `/${data}/`,
    });
  }
  // async getStudents() {
  //   return await this.axiosCall({
  //     method: GET,
  //     url: "/students",
  //   });
  // }
  // async getGroups() {
  //   return await this.axiosCall({
  //     method: GET,
  //     url: "/groups",
  //   });
  // }
  // async getRooms() {
  //   return await this.axiosCall({
  //     method: GET,
  //     url: "/rooms",
  //   });
  // }
  // async getEvents() {
  //   return await this.axiosCall({
  //     method: GET,
  //     url: "/events",
  //   });
  // }

  async addNewUser(name, surname, email, role, organization, group) {
    return await this.axiosCall({
      method: POST,
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
  async deleteUser(userId) {
    return await this.axiosCall({
      method: DELETE,
      url: `/user/${userId}`,
    });
  }
  async deleteItem(id, item) {
    return await this.axiosCall({
      method: DELETE,
      url: `/${item}/${id}`,
    });
  }
  // async deleteGroup(groupId) {
  //   return await this.axiosCall({
  //     method: DELETE,
  //     url: `/group/${groupId}`,
  //   });
  // }
  // async deleteRoom(roomId) {
  //   return await this.axiosCall({
  //     method: DELETE,
  //     url: `/room/${roomId}`,
  //   });
  // }
  // async deleteEvent(eventId) {
  //   return await this.axiosCall({
  //     method: DELETE,
  //     url: `/event/${eventId}`,
  //   });
  // }
}

export const api = new ApiClass();
