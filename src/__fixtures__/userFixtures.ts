import type { User } from '../hook/UserHooks';
import type { ApiResponse } from '../services/QueryClient';

export const userFixtures: {
  profile: ApiResponse<User>;
} = {
  profile: {
    body: {
      email: 'test@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    status: 200,
  },
};
