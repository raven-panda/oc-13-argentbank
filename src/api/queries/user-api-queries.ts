import { buildApiResponseFixture } from '@/__fixtures__/apiResponseFixture';
import { userFixtures } from '@/__fixtures__/userFixtures';
import type { ApiResponse } from '@/api/definitions/api-response';
import { LOGIN_URI, PROFILE_URI } from '@/api/definitions/api-uri';
import type { User } from '@/api/definitions/user';
import { api } from '@/queryClient';

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

export async function putUserProfile({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  if (isFixtureEnabled) {
    userFixtures.profile = {
      ...userFixtures.profile,
      firstName,
      lastName,
    };
    return buildApiResponseFixture(userFixtures.profile);
  }

  const res = await api.put<ApiResponse<User>>(PROFILE_URI, {
    firstName,
    lastName,
  });
  return res.data;
}
