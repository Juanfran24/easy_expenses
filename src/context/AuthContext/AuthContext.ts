import { createContext } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  error: string | null;
  unverifiedEmail: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  unverifiedEmail: null,
  handleLogin: async () => {},
  handleRegister: async () => {},
  handleLogout: async () => {},
  handleGoogleLogin: async () => {},
});
