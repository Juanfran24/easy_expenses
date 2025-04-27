import { createContext } from "react";
import { User } from "../interfaces";

interface AuthContextType {
  login: boolean;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  login: false,
  error: null,
  handleLogin: async () => {},
  handleRegister: async () => {},
  handleLogout: async () => {},
  handleGoogleLogin: async () => {},
});
