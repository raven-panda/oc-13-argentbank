import { RouterProvider } from '@tanstack/react-router';
import router from './router';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './components/auth/AuthProviders';
import { QueryClientProvider } from '@tanstack/react-query';
import client from './queryClient';

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
