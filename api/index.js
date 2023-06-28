import axios from "axios";

const GET = "GET";
const POST = "POST";

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
}

export const api = new ApiClass();
