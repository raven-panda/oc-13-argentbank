import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import HomePage from '../views/HomePage';
import MainLayout from '../components/layout/MainLayout';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import SignInPage from '../views/SignInPage';
import BankAccountsPage from '../views/BankAccountsPage';
import { RequireAuthentication } from '../components/auth/AuthProviders';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: () => (
    <>
      <MainLayout />
      <TanStackRouterDevtools />
    </>
  ),
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: () => (
    <>
      <RequireAuthentication>
        <MainLayout />
      </RequireAuthentication>
      <TanStackRouterDevtools />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: HomePage,
});

const signInRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/sign-in',
  component: SignInPage,
});

const bankAccountRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/bank-account',
  component: BankAccountsPage,
});

export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([homeRoute, signInRoute]),
  protectedRoute.addChildren([bankAccountRoute]),
]);
