import { Secret } from "jsonwebtoken";

export const secretToken = () => {
  if (!process.env.ACCESS_TOKEN_SECRET) throw Error("No ACCESS_TOKEN_SECRET found in env");
  return process.env.ACCESS_TOKEN_SECRET as Secret;
};
