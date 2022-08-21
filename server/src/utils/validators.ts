import Users from "../db/users";
import { User } from "../types/user";

export const validateUser = ({ name, password }: User) => {
  const UserExist = Users.filter((user) => user.name === name && user.password === password)[0];
  if (!UserExist) throw Error("Password is incorrect or user not found");
  return UserExist;
};
