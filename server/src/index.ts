import express from "express";
import { Games } from "./types/games";
import { User } from "./types/user";
import { sign as JWTsign } from "jsonwebtoken";
import { config as envConfig } from "dotenv";
import { validateUser } from "./utils/validators";
import { json as jsonParser } from "body-parser";
import { secretToken } from "./utils/secretToken";
import { authToken } from "./utils/authToken";
import { StartSession, suspendSession } from "./utils/session";
import cors from "cors";

const PORT = 4000;
const app = express();
app.use(cors());

envConfig();

app.post("/games", jsonParser(), authToken, (req, res) => {
  try {
    const games: Games = require("./db/data.json");
    if (!games) throw Error("No games found, there is an error with database connection");
    res.json(games);
  } catch (e: any) {
    res.statusMessage = e.message;
    res.status(403).end();
  }
});

app.post("/logout", jsonParser(), authToken, (req, res) => {
  suspendSession(req.get("jwt") as string);
  res.send({ success: true });
});

app.post("/login", jsonParser(), (req, res) => {
  try {
    const { name, password }: User = req.body;

    const UserExist = validateUser({ name, password });
    const jwt = JWTsign(UserExist, secretToken());

    StartSession({ user: { name: name, password: password }, jwt: jwt });
    setTimeout(() => {
      res.json({ jwt: jwt });
    }, 4000);
  } catch (e: any) {
    res.statusMessage = e.message;
    res.status(403).end();
  }
});

app.listen(PORT, function () {
  console.log(`started at ${PORT}`);
});
