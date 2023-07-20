export class Room {
  id?: number;
  name?: string;
  capacity?: number;
  organization?: number;
}

export class Group {
  id?: number;
  name?: string;
  organization?: number;
}

export class Eventt {
  id?: number;
  event_start_time?: number;
  day?: number;
  discipline?: string;
  room?: Room;
  tutor?: User;
  group?: Group;
  status?: boolean;
}
