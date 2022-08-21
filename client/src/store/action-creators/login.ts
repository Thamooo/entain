import { Dispatch } from "redux";
import store from "..";
import { AuthResponse, RoutesAPI } from "../../types/api";
import { LoginActions, LoginActionTypes, User } from "../../types/login";
import { RequestAPI } from "../api";

export const LoginUser = ({ name, password }: User) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    try {
      if (!password || !name) throw Error("User not specified");
      dispatch({ type: LoginActionTypes.LOGIN_PROCESS });
      const { jwt }: AuthResponse = await RequestAPI({ type: RoutesAPI.LOGIN, user: { name: name, password: password } });
      dispatch({
        type: LoginActionTypes.LOGIN_SUCCESS,
        payload: { name: name, jwt: jwt, password: password },
      });
    } catch (e: any) {
      dispatch({
        type: LoginActionTypes.LOGIN_ERROR,
        payload: e.message,
      });
    }
  };
};

export const LogoutUser = () => {
  const user = store.getState().login.user;
  return async (dispatch: Dispatch<LoginActions>) => {
    if (!user) throw Error("User not specified");
    const { name, jwt } = user;
    try {
      if (!jwt || !name) throw Error("User not specified");
      await RequestAPI({ type: RoutesAPI.LOGOUT, jwt: jwt, name: name });
      dispatch({ type: LoginActionTypes.LOGIN });
    } catch (e: any) {
      dispatch({
        type: LoginActionTypes.LOGIN_ERROR,
        payload: e.message,
      });
    }
  };
};
