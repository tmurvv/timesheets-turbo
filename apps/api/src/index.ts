import cors from "cors";
import express from "express";
import { config } from "dotenv";

import { Task } from "@timesheets/types";

import { mongoClient } from "./config/database";

config();

const app = express();
const port = 5050;

async function main() {
  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());

  app.get("/tasks", (_, response) => {
    const tasks: Task[] = [
      { _id: "1234", name: "timesheets API", isCurrent: true },
      { _id: "1235", name: "timesheets TYPES", isCurrent: true },
      { _id: "1236", name: "timesheets UI", isCurrent: true },
    ];

    response.json({ data: tasks });
  });

  await mongoClient.connect();
  app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}

main()
  .then(() => console.log(`Connected to database! ${process.env.DATABASE_NAME}`))
  .catch((error) => console.log(error))
  .finally(() => mongoClient.close());
