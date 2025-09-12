import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import MainLayout from './components/MainLayout';
import HomePage from './views/HomePage';
import SignInPage from './views/SignInPage';
import ProfilePage from './views/ProfilePage';
import { RequireAuthentication } from './components/auth/AuthProviders';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <MainLayout />
      <TanStackRouterDevtools />
    </>
  ),
});

const routes = [
  // Index Route
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
  }),

  // Sign In route
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/sign-in',
    component: SignInPage,
  }),

  // User dashboard route
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: () => (
      <RequireAuthentication>
        <ProfilePage />
      </RequireAuthentication>
    ),
    // component: () => <ProfilePage />,
  }),
];

const routeTree = rootRoute.addChildren(routes);

const router = createRouter({
  routeTree,
  context: {},
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
