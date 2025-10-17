import { RouterProvider } from '@tanstack/react-router';
import router from '@/router';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '@/components/auth/AuthProviders';
import { QueryClientProvider } from '@tanstack/react-query';
import client from '@/queryClient';
import { Provider } from 'react-redux';
import { store } from './api/store';

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
