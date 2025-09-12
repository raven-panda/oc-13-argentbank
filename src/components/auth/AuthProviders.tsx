import { useMemo, type ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext, useAuth } from '../../hook/AuthHooks';
import type { User } from '../../definitions/api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../queryClient';
import {
  TOKEN_COOKIE_NAME,
  TOKEN_EXPIRATION_MS,
} from '../../definitions/constants';
import { GET_PROFILE_URI, LOGIN_URI } from '../../definitions/api/api-uri';

/* Type Definitions */
export type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
};

export function RequireAuthentication({ children }: { children: ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return children;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [cookies, setCookies, removeCookies] = useCookies([TOKEN_COOKIE_NAME], {
    doNotParse: true,
  });

  // Récupération du user actuel
  const { data: user, isLoading } = useQuery({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const res = await api.post(GET_PROFILE_URI);
      return res.data.body;
    },
    retry: false,
    enabled: Boolean(cookies[TOKEN_COOKIE_NAME]),
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await api.post(LOGIN_URI, { email, password });
      return res.data;
    },
    onSuccess: ({ status, body }) => {
      if (status !== 200) throw new Error('Invalid request', status);
      setCookies(TOKEN_COOKIE_NAME, body.token, {
        path: '/',
        expires: new Date(Date.now() + TOKEN_EXPIRATION_MS),
        sameSite: 'strict',
      });
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      removeCookies(TOKEN_COOKIE_NAME);
      queryClient.clear();
    },
  });

  const value = useMemo(
    () => ({
      user: user ?? null,
      accessToken: cookies.accessToken,
      loading: isLoading || loginMutation.isPending || logoutMutation.isPending,
      isAuthenticated: Boolean(user),
      login: loginMutation.mutateAsync,
      logout: logoutMutation.mutateAsync,
    }),
    [cookies.accessToken, user, isLoading, loginMutation, logoutMutation],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
