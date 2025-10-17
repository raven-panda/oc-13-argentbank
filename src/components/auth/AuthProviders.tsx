import type { User } from '@/api/definitions/user';
import { useAppDispatch, useAppSelector } from '@/api/Hooks';
import { authenticationActions } from '@/api/slices/AuthenticationSlice';
import { Navigate } from '@tanstack/react-router';
import { useEffect, useMemo, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useAuth } from './hook/AuthHooks';
import { LoaderIndicator } from '../layout/LoaderIndicator';

/* Type Definitions */
export type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
};

export function RequireAuthentication({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      logout();
    } else if (!user) {
      dispatch(authenticationActions.getProfile());
    }
  }, [user, loading, isAuthenticated, logout, dispatch]);

  if (loading) {
    return <LoaderIndicator />;
  } else if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { profile, isAuthenticated, accessToken, isLoading } = useAppSelector(
    (state) => state.authentication,
  );

  const value = useMemo(
    () => ({
      user: profile ?? null,
      accessToken: accessToken ?? null,
      loading: isLoading,
      isAuthenticated: isAuthenticated && !!accessToken,
      login: async (props: {
        email: string;
        password: string;
        rememberMe: boolean;
      }) => {
        await dispatch(authenticationActions.login(props));
      },
      logout: () => dispatch(authenticationActions.logout()),
    }),
    [profile, isAuthenticated, accessToken, isLoading, dispatch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
