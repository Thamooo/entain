export type User = {
  name: string | null;
  password?: string | null;
  jwt?: string;
};

export enum LoginActionTypes {
  LOGIN = "LOGIN",
  LOGIN_PROCESS = "LOGIN_PROCESS",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
}

interface LoginAction {
  type: LoginActionTypes.LOGIN;
}

interface LoginProcessAction {
  type: LoginActionTypes.LOGIN_PROCESS;
}

export interface LoginSuccessAction {
  type: LoginActionTypes.LOGIN_SUCCESS;
  payload: User;
}

interface LoginErrorAction {
  type: LoginActionTypes.LOGIN_ERROR;
  payload: string;
}

export interface LoginState {
  user?: User | null;
  loading: boolean;
  error?: null | string;
}

export type LoginActions = LoginAction | LoginProcessAction | LoginSuccessAction | LoginErrorAction;
