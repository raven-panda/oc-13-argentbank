import type { User } from '../definitions/api/user';

export const userFixtures: {
  profile: User;
} = {
  profile: {
    id: '1234',
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '01-01-1970',
    updatedAt: '01-01-1970',
  },
};
