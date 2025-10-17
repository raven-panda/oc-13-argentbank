import { createContext } from 'react';
import type { AuthState } from './AuthProviders';

/* Type Definitions */
type AuthContextType = AuthState & {
  isAuthenticated: boolean;
  login: ({
    email,
    password,
    rememberMe,
  }: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
