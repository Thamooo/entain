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
  games: Game[];
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
