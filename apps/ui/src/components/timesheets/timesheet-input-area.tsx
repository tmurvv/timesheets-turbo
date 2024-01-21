// import { ChangeEvent } from "react";
import { Box } from "@mui/material";

import { InputTypeEnum } from "../../enums/input-type-enum";

import { TimesheetInterface } from "../../interfaces/timesheet-interface";
// import { JobSiteSelect } from "./JobSiteSelect";
import { TimesheetItem } from "./timesheet-item";
import { PHONE_WIDTH } from "../../constants/phone-width";

const {
  // DATETIME, NUMBER, SELECT,
  TEXT,
} = InputTypeEnum;

type inputProps = {
  timesheet: TimesheetInterface;
  setTimesheet: React.Dispatch<React.SetStateAction<TimesheetInterface>>;
};

export const TimesheetInputArea = (props: inputProps) => {
  // const onChangeEndTime = (e: ChangeEvent<HTMLInputElement> | null): number =>
  //   isNaN(Number(e?.target.value)) ? 0 : Number(e?.target.value);

  return (
    <Box sx={{ maxWidth: PHONE_WIDTH }}>
      {/* <TimeSheetItem label="User Id" inputType={TEXT} timesheet={timesheet} setTimesheet={setTimesheet}/> */}
      {/* <TimeSheetItem label="Time In" inputType={DATETIME}  timesheet={timesheet} setTimesheet={setTimesheet}/>
      <TimeSheetItem
        label="Time Out"
        inputType={DATETIME} timesheet={timesheet} setTimesheet={setTimesheet}
      />
      <TimeSheetItem label="Lunch in Minutes" inputType={NUMBER}  timesheet={timesheet} setTimesheet={setTimesheet}/>
      <TimeSheetItem label="Total Hours" inputType={NUMBER}  timesheet={timesheet} setTimesheet={setTimesheet}/>
      <TimeSheetItem label="Select Job-site" inputType={SELECT}  timesheet={timesheet} setTimesheet={setTimesheet}/>
      {/* <JobSiteSelect  timesheet={timesheet} setTimesheet={setTimesheet}/> */}
      <TimesheetItem label="Notes" inputType={TEXT} {...props} />
    </Box>
  );
};
