import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { validatePassword } from "../utils/passwords";
import { User } from "../types/User";

import { db } from "./database";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
passport.use(
  new LocalStrategy(
    {
      usernameField: "uname",
      passwordField: "pw",
    },
    async (username, password, done) => {
      const users = await db.collection("users").find().toArray();
      const found = users.find((user) => user["username"] === username);

      if (found && validatePassword(password, found["hash"], found["salt"])) {
        done(null, found);
      } else {
        done(null, false);
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser(async (id: string, done) => {
  const users = await db.collection<User>("users").find().toArray();
  const myUser = users.find((user) => user.id === id);

  done(null, myUser);
});

export default passport;
