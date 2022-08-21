import { Dispatch } from "redux";
import store from "..";
import { RoutesAPI } from "../../types/api";
import { Games, GamesActions, GamesActionTypes, GamesFilterFunction } from "../../types/games";
import { RequestAPI } from "../api";

export const ChangeColumns = (number: number) => {
  return async (dispatch: Dispatch<GamesActions>) => {
    dispatch({
      type: GamesActionTypes.COLUMNS,
      payload: number,
    });
  };
};

export const FilterGames = ({ groups = [], providers = [], sortFunc = null, query = null }: GamesFilterFunction) => {
  return async (dispatch: Dispatch<GamesActions>) => {
    try {
      const games = store.getState().games.games?.games;
      console.log(games);
      if (!games) throw Error("No games specified");

      const games_cloned = [...games];
      const filtered_groups_ids = groups.map(({ games }) => games).flat(1);
      const filtered_providers_ids = providers.map(({ id }) => id);
      const filtered_groups = filtered_groups_ids.length ? games.filter(({ id }) => filtered_groups_ids.includes(id)) : games_cloned;
      const filtered_groups_providers = filtered_providers_ids.length ? filtered_groups.filter(({ provider }) => filtered_providers_ids.includes(provider)) : filtered_groups;
      const filtered_groups_providers_query = query ? filtered_groups_providers.filter(({ name }) => new RegExp(`.*?(?:^|)(${query}[^$]*).*?`, "i").test(name)) : filtered_groups_providers;
      const filtered_groups_providers_query_sorted = sortFunc ? filtered_groups_providers_query.sort(sortFunc) : filtered_groups_providers_query;

      dispatch({
        type: GamesActionTypes.FILTER,
        payload: filtered_groups_providers_query_sorted,
      });
    } catch (e: any) {
      dispatch({
        type: GamesActionTypes.FETCH_ERROR,
        payload: e.message,
      });
    }
  };
};

export const FetchGames = () => {
  const user = store.getState().login.user;
  return async (dispatch: Dispatch<GamesActions>) => {
    try {
      if (!user) throw Error("User not specified");
      const { jwt, name } = user;
      dispatch({
        type: GamesActionTypes.FETCH_PROCESS,
      });
      if (!name || !jwt) throw Error("User not specified");
      const games: Games = await RequestAPI({ type: RoutesAPI.GAMES, jwt: jwt, name: name });
      dispatch({
        type: GamesActionTypes.FETCH_SUCCESS,
        payload: games,
      });
    } catch (e: any) {
      dispatch({
        type: GamesActionTypes.FETCH_ERROR,
        payload: e.message,
      });
    }
  };
};
