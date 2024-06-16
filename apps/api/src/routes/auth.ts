import passport from "passport";
import { NextFunction, Request, Response, Router } from "express";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { db } from "../config/database.js";
import { generatePassword } from "../utils/passwords.js";
import { User } from "../types/User.js";
import { userSchema } from "../types/User.js";

const router = Router();

type TextPartial = Partial<Pick<User, "phone" | "email">>;
const getText = ({ phone, email }: TextPartial) => {
  if (email && phone) return "phone and email";
  if (email) return "email";
  if (phone) return "phone";

  return "identifier";
};

const BodySchema = userSchema
  .pick({
    first: true,
    last: true,
    username: true,
    email: true,
    phone: true,
  })
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain a number" }),
  });

const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // validate the body
  const result = BodySchema.safeParse(req.body);
  console.log("resultofbodyparse", result);

  if (!result.success) {
    return res.status(400).send(result.error);
  }

  const { email, phone } = req.body;
  // check if the user already exists
  try {
    const existsDoc = await db.collection("users").findOne({
      $or: [
        { $and: [{ email: { $ne: null } }, { email }] },
        { $and: [{ phone: { $ne: null } }, { phone }] },
      ],
    });

    console.log("existsDoc", existsDoc);

    if (existsDoc) {
      return res
        .status(400)
        .send(
          `User with that ${getText({ phone: existsDoc["phone"], email: existsDoc["email"] })} already exists`,
        );
    } else {
      // TODO: why is next underlined by TS
      // /* eslint "@typescript-eslint/ban-ts-comment": "off" */
      // @ts-ignore
      return next();
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const saltHash = generatePassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  req.body.createdUser = {
    createdOn: new Date().toISOString(),
    email: req.body.email,
    first: req.body.first,
    id: req.body.id ?? uuid(),
    last: req.body.last,
    password: hash,
    preferredContact: req.body.preferredContact,
    phone: req.body.phone,
    role: req.body.role ?? "user",
    salt,
    username: req.body.username,
  };

  // TODO: why is next underlined by TS
  /* eslint "@typescript-eslint/ban-ts-comment": "off" */
  // @ts-ignore
  return next();
};

const addUser = async (req: Request, res: Response) => {
  const newUser = req.body.createdUser;

  try {
    await db
      .collection("users")
      .updateOne({ id: newUser.id }, { $set: newUser }, { upsert: true });
    return res.send("Welcome to Turbo Timesheets!");
    // return res.redirect("/auth/login");
  } catch (error) {
    // if (JSON.stringify(error).includes("11000")) {
    //   return res.redirect("/auth/signup-failure/11000");
    // }
    // return res.redirect("/auth/signup-failure");
    return res
      .status(500)
      .send(
        JSON.stringify(error).includes("11000")
          ? "Email or phone already exists."
          : error,
      );
  }
};

router.put("/signup", validateBody, createUser, addUser);

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
  res.send(
    "<h3>Login:</h3><input><h3>password:</h3><input><br /><br /><button type='button'>Submit</button>",
  );
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

export const authRouter = router;
