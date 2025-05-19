import { createContext } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
  isLoading: boolean;
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
  handleResetPassword: (email: string) => Promise<void>;
  handleUpdatePassword: (password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  user: null,
  error: null,
  unverifiedEmail: null,
  handleLogin: async () => {},
  handleRegister: async () => {},
  handleLogout: async () => {},
  handleGoogleLogin: async () => {},
  handleResetPassword: async () => {},
  handleUpdatePassword: async () => {},
});
