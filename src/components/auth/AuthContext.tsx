import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import type { AuthState } from './AuthProviders';
import { createContext } from 'react';

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
