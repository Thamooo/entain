import { combineReducers } from "redux";
import { gamesReducer } from "./gamesReducer";
import { loginReducer } from "./loginReducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  games: gamesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
