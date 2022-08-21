import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { secretToken } from "./secretToken";
import { LogSessionChange, sessions } from "./session";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get("JWT");
    const name = req.get("Username");

    if (!token) throw Error("Token is not valid!");
    const isExists = sessions.filter((session) => session.user.name === name)[0];
    if (!isExists || isExists.jwt !== token) throw Error("User is not logged in");

    verify(token, secretToken(), (err) => {
      if (err) throw err;
      LogSessionChange(token);
      next();
    });
  } catch (e: any) {
    res.statusMessage = e.message;
    res.status(403).end();
  }
};
