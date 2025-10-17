import { AuthProvider } from '@/components/auth/AuthProviders';
import router from '@/router';
import { RouterProvider } from '@tanstack/react-router';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './api/store';

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
