import { createRootRoute, createRoute } from '@tanstack/react-router';
import HomePage from '../views/HomePage';
import MainLayout from '../components/MainLayout';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import SignInPage from '../views/SignInPage';
import ProfilePage from '../views/ProfilePage';
import { RequireAuthentication } from '../components/auth/AuthProviders';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <MainLayout />
      <TanStackRouterDevtools />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignInPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <RequireAuthentication>
      <ProfilePage />
    </RequireAuthentication>
  ),
});

export const routes = [homeRoute, signInRoute, profileRoute];
