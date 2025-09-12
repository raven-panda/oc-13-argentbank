import { RouterProvider } from '@tanstack/react-router';
import router from './router';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './components/auth/AuthProviders';

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
