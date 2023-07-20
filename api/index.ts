import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { Room } from "~/composables/classes";

const Methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export class ApiClass {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    });
  }

  private async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.request(config);
    return response.data;
  }

  async getAvailableRooms(hour: number, day: number): Promise<Room[]> {
    return await this.axiosCall<Room[]>({
      method: Methods.GET,
      url: `/available_rooms/?hour=${hour}&day=${day}`,
    });
  }

  async getData<T>(data: string): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.GET,
      url: `/${data}/`,
    });
  }

  async getUserById<T>(id: number): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.GET,
      url: `/user/${id}`,
    });
  }

  async getUserEvents<T>(id: number, item: string): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.GET,
      url: `/${item}/${id}/events`,
    });
  }

  async login<T>(username: string, password: string): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.POST,
      url: "/login/",
      data: { username, password },
    });
  }

  async addNewUser<T>(
    name: string,
    surname: string,
    email: string,
    role: number,
    organization: number,
    group: string
  ): Promise<T> {
    return await this.axiosCall<T>({
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

  async addNewGroup<T>(name: string, organization: string): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.POST,
      url: `/group/`,
      data: {
        name,
        organization,
      },
    });
  }

  async addNewRoom<T>(
    name: string,
    capacity: number,
    organization: string
  ): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.POST,
      url: `/room/`,
      data: {
        name,
        capacity,
        organization,
      },
    });
  }

  async addNewEvent<T>(
    event_start_time: number,
    room_id: number,
    discipline: string,
    day: number,
    tutor_id: number,
    group_id: number
  ): Promise<T> {
    return await this.axiosCall<T>({
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

  async updateUser<T>(user: User): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.PUT,
      url: `/user/${user.id}`,
      data: user,
    });
  }

  async deleteUser<T>(userId: number): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.DELETE,
      url: `/user/${userId}`,
    });
  }

  async deleteItem<T>(id: number, item: string): Promise<T> {
    return await this.axiosCall<T>({
      method: Methods.DELETE,
      url: `/${item}/${id}`,
    });
  }
}

export const api = new ApiClass();
