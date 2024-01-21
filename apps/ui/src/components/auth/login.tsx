import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user-context";

import { Box, Button, TextField, Typography } from "@mui/material";
import { pick } from "lodash";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const handleClick = async () => {
    const res = await axios.post("http://localhost:3050/v1/auth/login", {
      email,
      password,
    });

    if (res.status === 200) {
      login(pick(res.data.data, ["email", "firstName", "id", "lastName"]));
    } else {
      console.log("User not found");
    }
  };

  return (
    <Box sx={{ color: "black" }} width={350}>
      <Typography variant="h5">Login</Typography>
      <Button type={"button"}
              // onClick={() => window.location("")}
      >
        Sign Up
      </Button>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Button
        type="button"
        onClick={handleClick}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </Box>
  );
};
