import { Dispatch, SetStateAction } from "react";
import { GetOptionLabel, GetOptionValue } from "react-select/dist/declarations/src/types";

export type SelectComponentProps = {
  name: string;
  callback: Dispatch<SetStateAction<any>>;
  className?: string;
  options: any[];
  placeholder?: string;
  isMulti?: boolean;
  value: any | any[];
};
