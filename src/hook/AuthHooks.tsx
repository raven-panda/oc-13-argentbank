import { createContext, useContext } from 'react';
import type { AuthState } from '../components/auth/AuthProviders';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';

/* Type Definitions */
type AuthContextType = AuthState & {
  isAuthenticated: boolean;
  login: UseMutateAsyncFunction<
    any,
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  logout: UseMutateAsyncFunction<void, Error, void, unknown>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
