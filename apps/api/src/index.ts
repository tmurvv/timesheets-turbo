import cors from "cors";
import express from "express";

import { Workspace } from "@timesheets/types";

const app = express();
const port = 5050;

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/workspaces", (_, response) => {
  const workspaces: Workspace[] = [
    { name: "timesheets API", version: "1.0.0" },
    { name: "timesheets TYPES", version: "1.0.0" },
    { name: "timesheets UI", version: "1.0.0" },
  ];
  response.json({ data: workspaces });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
