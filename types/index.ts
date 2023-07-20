export {};

declare global {
  interface User {
    id: number | null;
    username: string | null;
    password: string | null;
    name: string;
    surname: string;
    email: string;
    role: number;
    organization: number;
    group: number | null;
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
