import passport from "passport";
import { Router } from "express";
import { v4 as uuid } from "uuid";

import { db } from "../config/database.js";
import { generatePassword } from "../utils/passwords.js";
import { User } from "../types/User.js";

const router = Router();

router.put("/signup", async (req, res) => {
  const saltHash = generatePassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser: User = {
    createdOn: new Date().toISOString(),
    email: req.body.email,
    first: req.body.first,
    id: uuid(),
    last: req.body.last,
    password: hash,
    preferredContact: req.body.preferredContact,
    phone: req.body.phone,
    role: req.body.role,
    salt,
    username: req.body.username,
  };

  await db
    .collection("users")
    .updateOne({ id: newUser.id }, { $set: newUser }, { upsert: true });

  res.redirect("/auth/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/auth/login-failure",
      successRedirect: "/auth/login-success",
    }),
);

router.get("/login-success", (req, res) => {
  res.send("Logged in");
});

router.get("/login-failure", (req, res) => {
  res.send("Login not successful");
});

router.get("/login", (req, res) => {
  res.send("login ui here");
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });

  res.send("Logged out");
});

export default router;
