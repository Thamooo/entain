import { useEffect } from "react";
import { useGamesActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./../scss/components/Games.scss";
import { Filters } from "./parts/Filters";

export const Games: React.FC = () => {
  const { filtered, columns } = useTypedSelector((state) => state.games);
  const { FetchGames } = useGamesActions();

  useEffect(() => {
    FetchGames();
  }, []);

  return (
    <div className="games">
      <div className={`games__holder games__holder__${columns}`}>
        {filtered?.map((game, i) => {
          return (
            <div style={{ backgroundImage: `url(${game.coverLarge})` }} key={i} className="games__game">
              <span>{game.name}</span>
            </div>
          );
        })}
      </div>
      <div className="games__filters">
        <Filters />
      </div>
    </div>
  );
};
