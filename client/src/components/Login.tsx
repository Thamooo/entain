import React, { useState } from "react";
import Input from "./parts/Input";
import Button from "./parts/Button";
import Logo from "./../img/logo.svg";
import "./../scss/components/Login.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useLoginActions } from "../hooks/useActions";
import { User } from "../types/login";

const Login: React.FC = () => {
  const { loading } = useTypedSelector((state) => state.login);
  const { LoginUser } = useLoginActions();
  const [name, setName] = useState<User["name"]>(null);
  const [password, setPassword] = useState<User["password"]>(null);

  return (
    <div className="login">
      <div className="login__logo">
        <img alt="finnplay_logo" src={Logo} />
      </div>
      <Input placeholder="Login" callback={setName} />
      <Input isRevealable={true} placeholder="Password" callback={setPassword} />
      <Button
        loading={loading}
        callback={() => {
          LoginUser({ name: name, password: password });
        }}
        text="Login"
      />
    </div>
  );
};

export default Login;
