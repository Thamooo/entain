import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActionCreators from "../store/action-creators/login";
import * as GamesActionCreators from "../store/action-creators/games";

export const useLoginActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(LoginActionCreators, dispatch);
};

export const useGamesActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(GamesActionCreators, dispatch);
};
