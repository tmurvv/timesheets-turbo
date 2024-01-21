import { useState } from "react";
import { Timesheet } from "./components/timesheets/timesheet";
import { Login } from "./components/auth/login";
import { UserContext } from "./contexts/user-context";
import { SimpleUserInterface } from "./interfaces/simple-user-interface";
import {Box} from "@mui/material";

const userInit: SimpleUserInterface = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
};

const App = () => {
  const [user, setUser] = useState(userInit);

  function login(user: SimpleUserInterface) {
    // storeCredentials(response.credentials);
    setUser(user);
  }

  return (
    <Box sx={{color: "black"}}>
      <UserContext.Provider value={{ user, setUser, login }}>
        <h1>User: {user.firstName}</h1>
        {user.email ? <Timesheet /> : <Login />}
      </UserContext.Provider>
    </Box>
  );
}

export default App;
