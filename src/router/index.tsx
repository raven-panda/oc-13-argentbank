import { createRouter } from '@tanstack/react-router';
import { rootRoute, routes } from './routes';

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
