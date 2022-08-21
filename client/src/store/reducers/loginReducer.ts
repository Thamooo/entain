import { LoginActions, LoginActionTypes, LoginState } from "../../types/login";

const initialState: LoginState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  loading: false,
  error: null,
};

export const loginReducer = (state = initialState, action: LoginActions) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN:
      localStorage.removeItem("user");
      return { loading: false };
    case LoginActionTypes.LOGIN_PROCESS:
      return { loading: true };
    case LoginActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { loading: false, error: null, user: action.payload };
    case LoginActionTypes.LOGIN_ERROR:
      return { loading: false, error: action.payload, user: null };
    default:
      return state;
  }
};
