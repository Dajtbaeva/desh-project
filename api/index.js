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

  async getTutors() {
    return await this.axiosCall({
      method: GET,
      url: "/tutors",
    });
  }

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
  async deleteGroup(groupId) {
    return await this.axiosCall({
      method: DELETE,
      url: `/group/${groupId}`,
    });
  }
  async deleteRoom(roomId) {
    return await this.axiosCall({
      method: DELETE,
      url: `/room/${roomId}`,
    });
  }
  async deleteEvent(roomId) {
    return await this.axiosCall({
      method: DELETE,
      url: `/room/${roomId}`,
    });
  }
}

export const api = new ApiClass();
