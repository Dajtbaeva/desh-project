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
  async login(username, password) {
    return await this.axiosCall({
      method: POST,
      url: "/login/",
      data: { username, password },
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
  async addNewGroup(name, organization) {
    return await this.axiosCall({
      method: POST,
      url: `/group/`,
      data: {
        name,
        organization,
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
}

export const api = new ApiClass();
