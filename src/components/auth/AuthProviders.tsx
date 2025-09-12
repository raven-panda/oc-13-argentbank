import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext, useAuth } from '../../hook/AuthHooks';
import type { User } from '../../services/UserService';

const TOKEN_COOKIE_NAME = 'accessToken';
const isFixtureEnabled = import.meta.env.VITE_ENABLE_FIXTURE === 'true';

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
  const [credentials, setCredentials] = useState<AuthState>({
    user: null,
    accessToken: null,
    loading: false,
  });
  const [, setCookie, removeCookie] = useCookies([TOKEN_COOKIE_NAME], {
    doNotParse: true,
  });

  const login = useCallback(
    async (username: string, password: string) => {
      setCredentials((s) => ({ ...s, loading: true }));
      try {
        if (!isFixtureEnabled) throw new Error('Not implemented');

        const res = {
          user: {
            email: username,
            firstName: 'a',
            lastName: 'aa',
          },
          accessToken: btoa(password),
        };

        const { user, accessToken } = res;
        setCookie(
          TOKEN_COOKIE_NAME,
          { accessToken },
          {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            path: '/',
            sameSite: 'strict',
          },
        );
        setCredentials({ user, accessToken, loading: false });
        return { success: true };
      } catch (err) {
        setCredentials({ user: null, accessToken: null, loading: false });
        console.error(err);
        return { success: false };
      }
    },
    [setCookie],
  );

  const logout = useCallback(() => {
    removeCookie(TOKEN_COOKIE_NAME);
    setCredentials({ user: null, accessToken: null, loading: false });
  }, [removeCookie]);

  const value = useMemo(
    () => ({
      user: credentials.user,
      accessToken: credentials.accessToken,
      loading: credentials.loading,
      isAuthenticated: Boolean(credentials.accessToken),
      login,
      logout,
    }),
    [credentials, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
