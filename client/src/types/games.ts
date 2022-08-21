export type Game = {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: Date;
};

export type GameGroup = {
  id: number;
  name: string;
  games: number[];
};

export type GameProvider = {
  id: number;
  name: string;
  logo: string;
};

export type Games = {
  games: Game[];
  providers: GameProvider[];
  groups: GameGroup[];
};

export enum GamesActionTypes {
  FETCH = "FETCH",
  FETCH_PROCESS = "FETCH_PROCESS",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  FILTER = "FILTER",
  COLUMNS = "COLUMNS",
  FILTER_ERROR = "FILTER_ERROR",
}

interface GamesAction {
  type: GamesActionTypes.FETCH;
}

interface GamesProcessAction {
  type: GamesActionTypes.FETCH_PROCESS;
}

interface GamesSuccessAction {
  type: GamesActionTypes.FETCH_SUCCESS;
  payload: Games;
}

interface GamesErrorAction {
  type: GamesActionTypes.FETCH_ERROR;
  payload: string;
}

interface GamesFilterGroupAction {
  type: GamesActionTypes.FILTER;
  payload: Game[];
}

interface GamesColumnsAction {
  type: GamesActionTypes.COLUMNS;
  payload: number;
}

export interface GamesState {
  filtered?: Games["games"] | null;
  games?: Games | null;
  loading: boolean;
  error?: null | string;
  columns: number;
}

export type GamesActions = GamesAction | GamesProcessAction | GamesSuccessAction | GamesErrorAction | GamesFilterGroupAction | GamesColumnsAction;

export type GamesSort = {
  id: number;
  name: string;
  function: ((a: Game, b: Game) => number) | null | undefined;
};

export type GamesFilterFunction = {
  groups: GameGroup[];
  providers: GameProvider[];
  sortFunc: GamesSort["function"];
  query: string | null;
};
