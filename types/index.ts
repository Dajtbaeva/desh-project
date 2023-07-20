export {};

declare global {
  interface User {
    id: any;
    username: any;
    password: any;
    name: string;
    surname: string;
    email: string;
    role: number;
    organization: number;
    group: any;
  }

  interface Response {
    token: string;
    role: string;
    user_id: string;
    org_id: string;
  }

  type Users = "tutors" | "students";
  type Items = "rooms" | "groups" | "events";
}
