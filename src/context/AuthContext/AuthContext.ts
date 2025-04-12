import { createContext } from "react";
import { User } from "../interfaces";

interface AuthContextType {
  // user: User;
  // loading: boolean;
  // login: (credentials: User) => Promise<void>;
  // logout: () => Promise<void>;
  login: boolean;
  handleLogin: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  login: false,
  handleLogin: () => {},
});
