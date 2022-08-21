import { useEffect, useState } from "react";
import { useGamesActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./../../scss/components/parts/Columns.scss";

export const Columns: React.FC = () => {
  const { columns } = useTypedSelector((state) => state.games);
  const [count, setCount] = useState(columns);

  const { ChangeColumns } = useGamesActions();
  const detect = (num: number) => num <= count;
  const columnsArray = [2, 3, 4];

  useEffect(() => {
    setCount(columns);
  }, [columns]);

  return (
    <div className="columns">
      <div className="columns__title">Columns</div>
      <div className="columns__select">
        {columnsArray.map((val, i, arr) => {
          return (
            <div
              onClick={() => {
                setCount(val);
                ChangeColumns(val);
              }}
              className={`columns__select__item ${detect(val) ? "columns__select__item-selected" : ""}`}
            >
              {i !== arr.length - arr.length ? <div className="columns__select__item-line"></div> : null}
              <div className="columns__select__item-num">{val}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
