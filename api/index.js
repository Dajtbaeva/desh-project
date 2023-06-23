import axios from "axios";

const GET = "GET";
const POST = "POST";

export class ApiClass {
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.NUXT_BASE_URL,
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
}

export const api = new ApiClass();
