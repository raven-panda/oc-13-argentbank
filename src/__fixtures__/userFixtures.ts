import type { ApiResponse } from '../definitions/api/api-response';
import type { User } from '../definitions/api/user';

export const userFixtures: {
  profile: ApiResponse<User>;
} = {
  profile: {
    body: {
      id: '1234',
      email: 'test@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: '01-01-1970',
      updatedAt: '01-01-1970',
    },
    status: 200,
  },
};
