export {};

declare global {
  interface User {
    id: any;
    username: any;
    password: any;
    // id: number;
    // username: string;
    // password: string;
    name: string;
    surname: string;
    email: string;
    role: number;
    organization: number;
    group: any;
    // group: string | null;
  }

  interface Group {
    id: number;
    name: string;
    organization: number;
  }

  interface Room {
    id: number;
    name: string;
    capacity: number;
    organization: number;
  }

  interface Eventt {
    id: number;
    event_start_time: number;
    day: number;
    discipline: string;
    room: Room;
    tutor: User;
    group: Group;
    status: boolean;
  }

  interface Response {
    token: string;
    role: string;
    user_id: string;
    org_id: string;
  }

  interface StoreData {
    rooms: Room[];
    tutors: User[];
    students: User[];
    groups: Group[];
    events: Event[];
  }
}
