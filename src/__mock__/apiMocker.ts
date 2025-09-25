/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import fixturesMap from '../__fixtures__/fixturesMap';
import type {
  ApiUriValuesType,
  HttpMethod,
} from '../definitions/api/api-uri-keys';

// TODO: improve post and put to update the fixtures in runtime with new data
const apiMock = {
  create: function () {
    return this;
  },
  defaults: {} as any,
  interceptors: {} as any,
  get: function (
    url: ApiUriValuesType,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    return getFixtureForRightUrlAndMethod(url, 'get');
  },
  delete: function (
    _url: ApiUriValuesType,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  head: function (
    _url: ApiUriValuesType,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  options: function (
    _url: ApiUriValuesType,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  post: function (
    url: ApiUriValuesType,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    return getFixtureForRightUrlAndMethod(url, 'post');
  },
  put: function (
    url: ApiUriValuesType,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    return getFixtureForRightUrlAndMethod(url, 'put');
  },
  patch: function (
    _url: ApiUriValuesType,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  postForm: function (
    _url: ApiUriValuesType,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  putForm: function (
    _url: ApiUriValuesType,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
  patchForm: function (
    _url: ApiUriValuesType,
    _data?: object,
    _config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<object>> {
    throw new Error('Function not implemented.');
  },
};

function getFixtureForRightUrlAndMethod(
  url: ApiUriValuesType,
  method: HttpMethod,
): Promise<AxiosResponse<object>> {
  return Promise.resolve({
    status: 200,
    config: {} as any,
    data: {
      body: fixturesMap[url][method] ?? {},
      message: 'Mock success',
      status: 200,
    },
    headers: {} as any,
    statusText: 'Mock success',
  });
}

export default apiMock;
