import { createContext, useContext } from 'react';
import type { AuthState } from '../components/auth/AuthProviders';

/* Type Definitions */
type AuthContextType = AuthState & {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean }>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
