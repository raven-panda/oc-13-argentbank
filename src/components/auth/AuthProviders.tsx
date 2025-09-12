import { Navigate } from '@tanstack/react-router';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext, useAuth } from '../../hook/AuthHooks';

const isFixtureEnabled = import.meta.env.VITE_ENABLE_FIXTURE === 'true';

/* Type Definitions */
type AuthState = {
  username: string | null;
  accessToken: string | null;
  loading: boolean;
};

export function RequireAuthentication({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading, username } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  console.log({ isAuthenticated, username });

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<AuthState>({
    username: null,
    accessToken: null,
    loading: false,
  });
  const [, setCookie, removeCookie] = useCookies(['accessToken'], {
    doNotParse: true,
  });

  const login = useCallback(
    async (username: string, password: string) => {
      setCredentials((s) => ({ ...s, loading: true }));
      try {
        if (!isFixtureEnabled) throw new Error('Not implemented');

        const res = {
          username,
          accessToken: btoa(password),
        };
        const accessToken = res.accessToken;
        setCookie(
          'accessToken',
          { accessToken },
          {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            path: '/',
            sameSite: 'strict',
          },
        );
        setCredentials({ username: res.username, accessToken, loading: false });
        return { success: true };
      } catch (err) {
        setCredentials({ username: null, accessToken: null, loading: false });
        console.error(err);
        return { success: false };
      }
    },
    [setCookie],
  );

  const logout = useCallback(() => {
    removeCookie('accessToken');
    setCredentials({ username: null, accessToken: null, loading: false });
  }, [removeCookie]);

  const value = useMemo(
    () => ({
      username: credentials.username,
      accessToken: credentials.accessToken,
      loading: credentials.loading,
      isAuthenticated: Boolean(credentials.username && credentials.accessToken),
      login,
      logout,
    }),
    [credentials, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
