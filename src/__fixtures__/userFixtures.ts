import type { User } from '@/api/definitions/user';

export const userFixtures: {
  login: { token: string };
  profile: User;
} = {
  login: {
    token: 'mockedToken1234',
  },
  profile: {
    id: '1234',
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '01-01-1970',
    updatedAt: '01-01-1970',
  },
};
