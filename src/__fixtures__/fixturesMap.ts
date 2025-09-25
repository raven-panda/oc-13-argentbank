import type {
  ApiUriValuesType,
  HttpMethod,
} from '../definitions/api/api-uri-keys';
import { userFixtures } from './userFixtures';

type FixtureMap = {
  [K in ApiUriValuesType]: {
    [M in HttpMethod]?: object;
  };
};

const fixturesMap: FixtureMap = {
  '/user/login': {
    post: {
      token: '1234',
    },
  },
  '/user/profile': {
    post: userFixtures.profile,
    put: userFixtures.profile,
  },
};

export default fixturesMap;
