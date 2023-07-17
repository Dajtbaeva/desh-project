export {};

declare global {
  interface User {
    id: number;
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

  interface Event {
    id: number;
    event_start_time: number;
    day: number;
    discipline: string;
    room: Room;
    tutor: User;
    group: Group;
    status: boolean;
  }
}
