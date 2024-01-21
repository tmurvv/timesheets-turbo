import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";

import { getTotalMinutes } from "../../helpers/get-total-minutes";
import { minutesToHours } from "../../helpers/minutes-to-hours";
import { TimesheetInterface } from "../../interfaces/timesheet-interface";
import { PHONE_WIDTH } from "../../constants/phone-width";

const sx = {
  dateTime: { width: "100%" },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
};

const timesheetInit: TimesheetInterface = {
  id: uuid(),
  userId: "",
  timeIn: DateTime.now(),
  timeOut: DateTime.now(),
  lunchInMinutes: 0,
  typeOfWork: "",
  location: "",
  notes: "",
};

type ItemBoxProps = {
  children: ReactNode;
};

const ItemBox = (props: ItemBoxProps) => <Box mb={2}>{props.children}</Box>;

export const Timesheet = () => {
  const [timesheet, setTimesheet] = useState<TimesheetInterface>(timesheetInit);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const onSubmit = async () => {
    console.log("submitted:", timesheet);
    await axios.put(
      `http://localhost:3050/v1/timesheets/${timesheet.id}`,
      timesheet
    );
    setTimesheet(timesheetInit);
    setTotalMinutes(0);
  };

  return (
    <Box sx={sx.container}>
      <ItemBox>
        <Typography variant={"h3"} sx={{ color: "#3c3f43" }}>
          Time Sheet
        </Typography>
      </ItemBox>
      <ItemBox>
        <TextField
          disabled
          fullWidth
          label={"Name"}
          name={"name"}
          variant="outlined"
          value={"From Auth Context: NYI"}
        />
      </ItemBox>
      <ItemBox>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DateTimePicker
            label={"Time In"}
            onChange={(e) => {
              setTimesheet({ ...timesheet, timeIn: e ?? DateTime.now() });
              setTotalMinutes(
                getTotalMinutes({ ...timesheet, timeIn: e ?? DateTime.now() })
              );
            }}
            sx={sx.dateTime}
            value={timesheet.timeIn}
          />
        </LocalizationProvider>
      </ItemBox>
      <ItemBox>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DateTimePicker
            label={"Time Out"}
            onChange={(e) => {
              setTimesheet({ ...timesheet, timeOut: e ?? DateTime.now() });
              setTotalMinutes(
                getTotalMinutes({ ...timesheet, timeOut: e ?? DateTime.now() })
              );
            }}
            sx={sx.dateTime}
            value={timesheet.timeOut}
          />
        </LocalizationProvider>
      </ItemBox>
      <ItemBox>
        <TextField
          fullWidth
          label={"Lunch In Minutes"}
          name={"lunchInMinutes"}
          onChange={(e) => {
            setTimesheet({ ...timesheet, lunchInMinutes: +e.target.value });
            setTotalMinutes(
              getTotalMinutes({
                ...timesheet,
                lunchInMinutes: +e.target.value,
              })
            );
          }}
          type="number"
          variant="outlined"
          value={timesheet.lunchInMinutes}
        />
      </ItemBox>
      <ItemBox>
        <TextField
          fullWidth
          label={"Total Hours"}
          name={"totalHours"}
          variant="outlined"
          value={minutesToHours(totalMinutes)}
        />
      </ItemBox>
      <ItemBox>
        <FormControl sx={{ width: PHONE_WIDTH }}>
          <InputLabel id="demo-simple-select-label">Job Site</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={timesheet.location}
            label="Job Site"
            onChange={(e) => {
              setTimesheet({ ...timesheet, location: e.target.value });
            }}
          >
            <MenuItem value={"Job-Site 1"}>Job Site 1</MenuItem>
            <MenuItem value={"Job-Site 2"}>Job Site 2</MenuItem>
            <MenuItem value={"Job-Site 3"}>Job Site 3</MenuItem>
          </Select>
        </FormControl>
      </ItemBox>
      <ItemBox>
        <FormControl sx={{ width: PHONE_WIDTH }}>
          <InputLabel id="demo-simple-select-label">Type of Work</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={timesheet.typeOfWork}
            label="Type of Work"
            onChange={(e) => {
              setTimesheet({ ...timesheet, typeOfWork: e.target.value });
            }}
          >
            <MenuItem value={"painting"}>Painting</MenuItem>
            <MenuItem value={"flooring"}>Flooring</MenuItem>
            <MenuItem value={"plumbing"}>Plumbing</MenuItem>
          </Select>
        </FormControl>
      </ItemBox>
      <ItemBox>
        <TextField
          fullWidth
          label={"Notes"}
          name={"notes"}
          onChange={(e) =>
            setTimesheet({ ...timesheet, notes: e.target.value })
          }
          variant="outlined"
          value={timesheet.notes}
        />
      </ItemBox>
      <Button onClick={onSubmit} variant="contained">
        Submit
      </Button>
    </Box>
  );
};
