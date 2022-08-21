import { User } from "./login";

export enum RoutesAPI {
  LOGIN = "http://localhost:4000/login",
  LOGOUT = "http://localhost:4000/logout",
  GAMES = "http://localhost:4000/games",
}

export type AuthRequest = {
  type: RoutesAPI.LOGIN;
  user: User;
};

export type AuthResponse = {
  jwt: string;
};

export type LogoutResponse = {
  success: boolean;
};

export type OtherRequest = {
  type: RoutesAPI.GAMES | RoutesAPI.LOGOUT;
  name: string;
  jwt: string;
};

export type RequestAPIType = AuthRequest | OtherRequest;
