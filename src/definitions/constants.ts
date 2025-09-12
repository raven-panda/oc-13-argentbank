// Env constants
export const IS_FIXTURE_ENABLED =
  import.meta.env.VITE_ENABLE_FIXTURE === 'true';

// Other constants
export const TOKEN_COOKIE_NAME = 'accessToken';
export const TOKEN_EXPIRATION_MS = 1000 * 60 * 60;
