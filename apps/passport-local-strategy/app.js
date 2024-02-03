import express from "express";
import session from "express-session";
import router from "./routes/routes.js";
import connection from "./config/database.js";
import { config } from "dotenv";
import passport from "./config/passport.js";

/**
 * -------------- GENERAL SETUP ----------------
 */
// Package documentation - https://www.npmjs.com/package/connect-mongo
import connectMongo from "connect-mongo";
config();
const MongoStore = connectMongo(session);
const {PORT, SECRET} = process.env;
// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  }),
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so app.js knows about it
// const passport = "../config/passport";

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(router);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(
  PORT,
  () =>  console.log(`Server is running on port ${PORT}`)
);

