// import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import {
  Box,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // SelectChangeEvent,
  TextField,
} from "@mui/material";
import { camelCase } from "lodash";
import {
  ChangeEvent,
  // useState
} from "react";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers";

import { PHONE_WIDTH } from "../../constants/phone-width";
import { InputTypeEnum } from "../../enums/input-type-enum";
import { TimesheetInterface } from "../../interfaces/timesheet-interface";

const {
  // DATETIME, NUMBER, SELECT,
  TEXT,
} = InputTypeEnum;

type PropsType = {
  label: string;
  inputType: InputTypeEnum;
  timesheet: TimesheetInterface;
  setTimesheet: React.Dispatch<React.SetStateAction<TimesheetInterface>>;
  // onChange?: (e: ChangeEvent<HTMLInputElement> | null) => number;
};

export const TimesheetItem = ({
  label,
  inputType,
  timesheet,
  setTimesheet,
}: PropsType) => {
  // const [timesheetItem, setTimesheetItem] = useState<
  //   ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string | number | null
  // >("");
  // const [timesheetDateItem, setTimesheetDateItem] = useState<string | null>(
  //   null
  // );
  // const [timesheetSelectItem, setTimesheetSelectItem] = useState<string>();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimesheet({
      ...timesheet,
      [e.target.name]: e.target.value,
    });
  };

  // const onChangeDate = (name: string, value: string | null) => {
  //   setTimesheet({ ...timesheet, [name]: value });
  // };

  // const onChangeSelect = (event: SelectChangeEvent) => {
  //   console.log("here", timesheetSelectItem);
  //   setTimesheetSelectItem(event.target.value);
  // };

  return (
    <Box sx={{ width: PHONE_WIDTH }}>
      {inputType === TEXT && (
        <TextField
          disabled={label === "Name"}
          label={label}
          name={camelCase(label)}
          onChange={(e) => onChange(e)}
          variant="outlined"
          value={timesheet[label as keyof TimesheetInterface]}
        />
      )}
      {/* {inputType === NUMBER && (
        <TextField
          disabled={label === "Total Hours"}
          fullWidth
          label={label}
          onChange={(e) => onChange(e)}
          type="number"
          variant="outlined"
          value={timesheet[camelCase(label)]}
        />
      )} */}
      {/* ? */}
      {/* {inputType === SELECT && (
        <Box sx={{ minWidth: 320 }}>
          <FormControl sx={{ width: 320 }}>
            <InputLabel id="demo-simple-select-label">Job-Site</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timesheet[camelCase(label)]}
              label="Job Site"
              // onChange={(e) => onChange(e)}
            >
              <MenuItem value={"Job-Site 1"}>Job-Site 1</MenuItem>
              <MenuItem value={"Job-Site 2"}>Job-Site 2</MenuItem>
              <MenuItem value={"Job-Site 3"}>Job-Site 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )} */}
    </Box>
  );
};
