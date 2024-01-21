import { TimesheetInterface } from "../interfaces/timesheet-interface"

export const getTotalMinutes = (timesheet: TimesheetInterface): number=> {
  const workMinutes = timesheet.timeOut.diff(timesheet.timeIn, "minutes").minutes;
  
  return Math.round(workMinutes - timesheet.lunchInMinutes);
}