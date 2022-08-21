import { useEffect } from "react";
import { Games } from "./components/Games";
import Login from "./components/Login";
import { Header } from "./components/parts/Header";
import { useLoginActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import "./scss/App.scss";

export const App = () => {
  const { user } = useTypedSelector((state) => state.login);
  const { LoginUser } = useLoginActions();

  useEffect(() => {
    if(user) LoginUser(user);
  }, [])

  return (
    <div className={`app ${user ? "app__logged" : "app__login"}`}>
      {user ? <Header /> : null}
      {user ? <Games /> : <Login />}
    </div>
  );
};
