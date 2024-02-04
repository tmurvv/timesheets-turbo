import { config } from "dotenv";
import cors from "cors";
import express from "express";

import passport from "./config/passport";
import router from "./routes/routes";

config();

const app = express();
const port = 5050;

async function main() {
  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use("/auth", router);

  app.get("/", (_, res) => res.send("Health check: SUCCESS"));

  app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}

main()
  .then(() =>
    console.log(`Connected to database! ${process.env["DATABASE_NAME"]}`),
  )
  .catch((error) => console.log(error))
