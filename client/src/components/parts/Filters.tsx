import Input from "./../parts/Input";
import Select from "./../parts/Select";
import Button from "./../parts/Button";
import search_icon from "./../../img/search.svg";
import hamburger from "./../../img/hamburger.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Game, GameGroup, GameProvider, GamesSort } from "../../types/games";
import "./../../scss/components/parts/Filters.scss";
import { useEffect, useState } from "react";
import { useGamesActions } from "../../hooks/useActions";
import { Columns } from "./Columns";

export const Filters: React.FC = () => {
  const { FilterGames, ChangeColumns } = useGamesActions();
  const { filtered, games } = useTypedSelector((state) => state.games);

  const [search, setSearch] = useState<string>("");
  const [providers, setProviders] = useState<GameProvider[]>([]);
  const [groups, setGroups] = useState<GameGroup[]>([]);
  const [sorting, setSorting] = useState<GamesSort | null>();
  const [collapse, setCollapse] = useState<boolean>(true);

  const Sortings: GamesSort[] = [
    {
      id: 0,
      name: "A-Z",
      function: (a: Game, b: Game) => a.name.localeCompare(b.name),
    },
    {
      id: 1,
      name: "Z-A",
      function: (a: Game, b: Game) => b.name.localeCompare(a.name),
    },
    {
      id: 2,
      name: "Newest",
      function: (a: Game, b: Game) => b.date.toString().localeCompare(a.date.toString()),
    },
  ];

  useEffect(() => {
    FilterGames({ groups: groups, providers: providers, sortFunc: sorting?.function, query: search });
  }, [groups, providers, sorting, search]);

  return (
    <div className="filters">
      <Input value={search} icon={search_icon} callback={setSearch} placeholder="Search" />
      <div className={`filters__wrapper ${collapse ? "filters__wrapper__hide" : ""}`}>
        <Select value={providers} isMulti={true} name="Providers" callback={setProviders} options={games?.providers as GameProvider[]} />
        <Select value={groups} isMulti={true} name="Groups" callback={setGroups} options={games?.groups as GameGroup[]} />
        <Select value={sorting} name="Sort" callback={setSorting} options={Sortings} />
        <Columns />
        <div className="filters__footer">
          <div className="filters__footer-counter">Games amount: {filtered?.length}</div>
          <div className="filter__footer-reset">
            <Button
              text="Reset"
              type="plain"
              callback={() => {
                setSearch("");
                setSorting(null);
                setGroups([]);
                setProviders([]);
                ChangeColumns(2);
              }}
            />
          </div>
        </div>
      </div>
      <div className="filters__collapse">
        <span
          onClick={() => {
            setCollapse((state) => !state);
          }}
          className="filters__collapse-action"
        >
          <img alt="" src={hamburger} />
          {collapse ? "Show filters" : "Hide filters"}
        </span>
      </div>
    </div>
  );
};
