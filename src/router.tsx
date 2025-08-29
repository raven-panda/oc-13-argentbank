import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import MainLayout from './components/MainLayout';
import HomePage from './views/HomePage';

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
    component: function SignInPage() {
      return <div>WIP</div>;
    },
  }),
];

const routeTree = rootRoute.addChildren(routes);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
