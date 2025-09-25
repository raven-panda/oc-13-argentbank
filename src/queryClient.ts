// queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TOKEN_COOKIE_NAME } from './definitions/constants';
import { API_BASE_URL } from './definitions/api/api-uri';
import apiMock from './__mock__/apiMocker';

const client = new QueryClient();

const fixtureEnabled = import.meta.env.VITE_ENABLE_FIXTURE === 'true';

// Instance axios avec auth auto
export const api = fixtureEnabled
  ? apiMock
  : axios.create({
      baseURL: API_BASE_URL,
    });

if (!fixtureEnabled) {
  // Intercept requests made with axios
  // Get token from accessToken cookie if it's present, and put it into request headers as Bearer authentication
  api.interceptors.request.use(async (config: any) => {
    const token = (await cookieStore.get(TOKEN_COOKIE_NAME))?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default client;
