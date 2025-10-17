import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate } from '@tanstack/react-router';
import { useMemo, type ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { postUserLogin, postUserProfile } from '@/api/user-api-queries';
import type { User } from '@/api/definitions/user';
import { TOKEN_COOKIE_NAME, TOKEN_EXPIRATION_MS } from '@/constants';
import { useAuth } from './hook/AuthHooks';
import { AuthContext } from './AuthContext';

/* Type Definitions */
export type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
};

export function RequireAuthentication({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  } else if (!isAuthenticated) {
    logout();
    return <Navigate to="/sign-in" />;
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
      const data = await postUserProfile();
      return data.body;
    },
    retry: false,
    enabled: Boolean(cookies[TOKEN_COOKIE_NAME]),
  });

  const loginMutation = useMutation({
    mutationFn: postUserLogin,
    onSuccess: ({ status, body }) => {
      if (status !== 200) throw new Error('Invalid request', { cause: status });
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
      isAuthenticated: Boolean(user && cookies.accessToken),
      login: loginMutation.mutateAsync,
      logout: logoutMutation.mutateAsync,
    }),
    [cookies.accessToken, user, isLoading, loginMutation, logoutMutation],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
