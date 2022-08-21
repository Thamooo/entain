import { Dispatch } from "react";

export type ButtonComponentProps = {
  type?: string;
  callback: any;
  text: string;
  loading?: boolean;
  icon?: string;
};
