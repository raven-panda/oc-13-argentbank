import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routes';

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
