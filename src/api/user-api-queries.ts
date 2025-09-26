import { buildApiResponseFixture } from '../__fixtures__/apiResponseFixture';
import { userFixtures } from '../__fixtures__/userFixtures';
import type { ApiResponse } from '../definitions/api/api-response';
import { LOGIN_URI, PROFILE_URI } from '../definitions/api/api-uri';
import type { User } from '../definitions/api/user';
import { api } from '../queryClient';

const isFixtureEnabled = import.meta.env.VITE_ENABLE_FIXTURE === 'true';

/**
 * Request POST to /user/login
 * @param email User's email
 * @param password User's password
 * @returns Request resulted access token
 */
export async function postUserLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (isFixtureEnabled) return buildApiResponseFixture(userFixtures.login);

  const res = await api.post<ApiResponse<{ token: string }>>(LOGIN_URI, {
    email,
    password,
  });
  return res.data;
}

/**
 * Request POST to /user/profile
 * @returns Request resulted user profile data
 */
export async function postUserProfile() {
  if (isFixtureEnabled) return buildApiResponseFixture(userFixtures.profile);

  const res = await api.post<ApiResponse<User>>(PROFILE_URI);
  return res.data;
}
