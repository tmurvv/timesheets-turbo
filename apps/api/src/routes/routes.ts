import passport from "passport";
import { Router } from "express";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { db } from "../config/database.js";
import { generatePassword } from "../utils/passwords.js";
import { User } from "../types/User.js";

const router = Router();
const BodySchema = User.pick({
  first: true,
  last: true,
  email: true,
  password: true,
  phone: true,
  role: true,
  username: true,
});

const getText = (found: User) => {
  if (found.email && found.phone) return "phone and email";
  if (found.email) return "email";
  if (found.phone) return "phone";
};

router.put("/signup", async (req, res) => {
  const result = BodySchema.safeParse(req.body);
  console.log("resultofparse", result);

  if (!result.success) {
    return res.status(400).send(result.error);
  }

  try {
    const found = await db.collection("users").findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (found) {
      return res
        .status(400)
        .send(`User with that ${getText(found)} already exists`);
    }
  } catch (error) {
    return res.status(500).send(error);
  }

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

  try {
    await db
      .collection("users")
      .updateOne({ id: newUser.id }, { $set: newUser }, { upsert: true });
  } catch (error) {
    // if (JSON.stringify(error).includes("11000")) {
    //   return res.redirect("/auth/signup-failure/11000");
    // }
    // return res.redirect("/auth/signup-failure");
    res
      .status(500)
      .send(
        JSON.stringify(error).includes("11000")
          ? "Email or phone already exists."
          : error,
      );
  }

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

router.get("/signup-failure/11000", (req, res) => {
  res.send("An account with that email or phone number already exists");
});

router.get("/signup-failure/11000", (req, res) => {
  res.send("Signup not successful");
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
