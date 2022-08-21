import { ButtonComponentProps } from "../../types/components/inputs/Button";
import spinner from "./../../img/spinner.svg";
import "./../../scss/components/parts/Button.scss";

const Index: React.FC<ButtonComponentProps> = ({ callback, text, loading = false, icon = null, type = "default" }) => {
  const handleClick = () => {
    callback();
  };
  return (
    <button disabled={loading} onClick={handleClick} className={`btn btn__${type}`}>
      {icon ? (
        <div className="btn__icon">
          <img alt="" src={icon} />
        </div>
      ) : null}
      {loading ? (
        <div className="btn__spinner">
          <img alt="" src={spinner} />
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Index;
