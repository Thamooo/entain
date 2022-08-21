import { useEffect, useState } from "react";
import { InputComponentProps } from "../../types/components/inputs/Input";
import "./../../scss/components/parts/Input.scss";
import RevealSVG from "./../../img/reveal.svg";

export const Index: React.FC<InputComponentProps> = ({ value, placeholder = "", callback, isRevealable = false, icon = null }) => {
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);

  useEffect(() => {
    if (value === "") {
      setCheckInput(false);
    }
  }, [value]);
  return (
    <label className={`input ${checkInput ? "input__filled" : ""}`}>
      <label>{placeholder}</label>
      <input
        value={value}
        type={isRevealable ? (reveal ? "text" : "password") : "text"}
        onFocus={(e) => {
          setCheckInput(true);
        }}
        onBlur={(e) => {
          setCheckInput(e.target.value.length > 0);
        }}
        onChange={(e) => {
          callback(e.target.value);
          setCheckInput(e.target.value.length > 0);
        }}
      ></input>
      {isRevealable ? (
        <img
          onClick={() => {
            setReveal((val) => !val);
          }}
          className={`input__icon ${reveal ? "input__icon-revealed" : ""}`}
          src={RevealSVG}
          alt="reveal_icon"
        />
      ) : null}
      {icon ? <img alt="custom_icon" src={icon} /> : null}
    </label>
  );
};

export default Index;
