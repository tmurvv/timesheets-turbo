import { DateTime } from "luxon";

export interface TimesheetInterface {
  id: string;
  userId: string;
  timeIn: DateTime;
  timeOut: DateTime;
  lunchInMinutes: number;
  location: string;
  notes?: string;
  typeOfWork?: string;
}
