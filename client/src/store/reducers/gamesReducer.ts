import { GamesActions, GamesActionTypes, GamesState } from "../../types/games";

const initialState: GamesState = {
  filtered: null,
  games: null,
  loading: false,
  error: null,
  columns: 3,
};

export const gamesReducer = (state = initialState, action: GamesActions) => {
  switch (action.type) {
    case GamesActionTypes.FETCH:
      return { ...state, loading: false };
    case GamesActionTypes.FETCH_PROCESS:
      return { ...state, loading: true };
    case GamesActionTypes.FETCH_SUCCESS:
      return { ...state, loading: false, error: null, games: action.payload, filtered: action.payload.games };
    case GamesActionTypes.FILTER:
      return { ...state, filtered: action.payload };
    case GamesActionTypes.COLUMNS:
      return { ...state, columns: action.payload };
    case GamesActionTypes.FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
