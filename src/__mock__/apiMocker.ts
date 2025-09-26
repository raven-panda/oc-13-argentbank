/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import fixturesMap from '../__fixtures__/fixturesMap';
import type { HttpMethod } from '../definitions/api/api-uri-keys';

// TODO: improve post and put to update the fixtures in runtime with new data
const apiMock = {
  create: function () {
    return this;
  },
  defaults: {} as any,
  interceptors: {} as any,
  get: async function (
    url: string,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    const startDate = Date.now();
    const result = await getFixtureForRightUrlAndMethod(url, 'get');
    console.log({
      timeForResolution: url + ' : ' + (Date.now() - startDate),
      result,
    });
    return result;
  },
  delete: function (
    _url: string,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  head: function (
    _url: string,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  options: function (
    _url: string,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  post: async function (
    url: string,
    data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    const startDate = Date.now();
    const result = await getFixtureForRightUrlAndMethod(url, 'post', {
      body: data,
    });
    console.log({
      timeForResolution: url + ' : ' + (Date.now() - startDate),
      result,
    });
    return result;
  },
  put: function (
    url: string,
    data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    return getFixtureForRightUrlAndMethod(url, 'put', { body: data });
  },
  patch: function (
    _url: string,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  postForm: function (
    _url: string,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  putForm: function (
    _url: string,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  patchForm: function (
    _url: string,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
};

async function getFixtureForRightUrlAndMethod(
  url: string,
  method: HttpMethod,
  params: object = {},
): Promise<AxiosResponse<object>> {
  const { key, params: paramsWithIds } = replaceUrlVariablesAndSetIds(
    url,
    params,
  );

  return Promise.resolve({
    status: 200,
    config: {} as any,
    data: {
      body: fixturesMap[key][method]?.(paramsWithIds) ?? {},
      message: 'Mock success',
      status: 200,
    },
    headers: {} as any,
    statusText: 'Mock success',
  });
}

function pathToRegex(path: string) {
  const keys: string[] = [];

  // Replace each path variables formatted like ":param" by a capturing group
  const regexString = path.replace(/:([^/]+)/g, (_, key) => {
    keys.push(key);
    return '([^/]+)';
  });

  // Returning the new string as RegExp and path variables found
  return {
    regex: new RegExp(`^${regexString}$`),
    keys,
  };
}

function replaceUrlVariablesAndSetIds(
  url: string,
  params: Record<string, any> = {},
) {
  // Looping each routes defined in fixturesMap
  for (const route in fixturesMap) {
    const { regex, keys } = pathToRegex(route);

    // Checking if the current route matches
    const match = url.match(regex);
    if (match) {
      const extractedParams: Record<string, string> = {};
      // Getting each keys that matched the generated regex
      keys.forEach((key, i) => {
        extractedParams[key] = match[i + 1]; // match[0] = tout, match[1..n] = captures
      });

      // Returning the url with path variables and params object updated with variables values extracted
      return {
        key: route as keyof typeof fixturesMap,
        params: { ...params, ...extractedParams },
      };
    }
  }

  // Throws if no fixture matched the url
  throw new Error(`No fixture found for url: ${url}`);
}

export default apiMock;
