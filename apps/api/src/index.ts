import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { Workspace } from "@timesheets/types";

config();

const app = express();
const port = 5050;
const DATABASE_STAGING = process.env.DATABASE_STAGING ?? "";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? "";
const url = DATABASE_STAGING.replace("<PASSWORD>", DATABASE_PASSWORD);
const mongoClient = new MongoClient(url);

async function main() {
  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());

  app.get("/workspaces", (_, response) => {
    const workspaces: Workspace[] = [
      { name: "timesheets API", version: "1.0.0" },
      { name: "timesheets TYPES", version: "1.0.0" },
      { name: "timesheets UI", version: "1.0.0" },
    ];

    response.json({ data: workspaces });
  });

  await mongoClient.connect();
  app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}

main()
  .then(() => console.log(`Connected to database! ${process.env.DATABASE_NAME}`))
  .catch((error) => console.log(error))
  .finally(() => mongoClient.close());
