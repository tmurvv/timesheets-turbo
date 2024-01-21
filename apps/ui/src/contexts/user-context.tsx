import { createContext } from "react";
import { SimpleUserInterface } from "../interfaces/simple-user-interface";

interface UserContextType {
  user: SimpleUserInterface | null;
  setUser: (user: SimpleUserInterface) => void;
  login: (user: SimpleUserInterface) => void;
}

export const UserContext = createContext<UserContextType | null>(null);
