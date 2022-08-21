export type User = {
  name: string;
  password: string;
};

export interface UserSession {
  date_logged?: Date;
  date_last_action?: Date;
  user: User;
  jwt: string | null;
}
