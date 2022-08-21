import { useTypedSelector } from "../../hooks/useTypedSelector";
import Button from "./../parts/Button";
import logo from "./../../img/logo.svg";
import logout from "./../../img/logout.svg";
import "./../../scss/components/parts/Header.scss";
import { useLoginActions } from "../../hooks/useActions";

export const Header: React.FC = () => {
  const { user } = useTypedSelector((state) => state.login);
  const { LogoutUser } = useLoginActions();

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <img alt="finnplay_logo" src={logo} />
        </div>
        <div className="header__content">
          <div className="header__login">{user?.name}</div>
          <Button
            type="danger"
            icon={logout}
            callback={() => {
              LogoutUser();
            }}
            text={"Logout"}
          />
        </div>
      </div>
    </div>
  );
};
