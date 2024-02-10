import { Router } from "express";
import { v4 as uuid } from "uuid";

import { db } from "../config/database.js";
import { Timesheet } from "../types/Timesheet.js";
import { timesheetSchema } from "../types/Timesheet.js";

const router = Router();

const BodySchema = timesheetSchema.pick({
  in: true,
  out: true,
  userId: true,
  location: true,
  typeOfWork: true,
  notes: true,
});

router.put("/", async (req, res) => {
  const result = BodySchema.safeParse(req.body);
  console.log("resultofparse", result);

  if (!result.success) {
    return res.status(400).send(result.error);
  }

  const newTimesheet: Timesheet = {
    createdOn: new Date().toISOString(),
    in: req.body.in,
    out: req.body.out,
    id: uuid(),
    userId: req.body.userId,
    location: req.body.location,
    typeOfWork: req.body.typeOfWork,
    notes: req.body.notes,
  };

  try {
    await db
      .collection("timesheets")
      .updateOne(
        { id: newTimesheet.id },
        { $set: newTimesheet },
        { upsert: true },
      );
    return res.status(201).send(newTimesheet);
  } catch (error) {
    return res.status(500).send(`Timesheet did not save. ${error}`);
  }
});

export const timesheetsRouter = router;
