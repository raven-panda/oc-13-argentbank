import * as uriConstants from './api-uri';
export type ApiUriType = Omit<typeof uriConstants, 'API_BASE_URL'>;
export type ApiUriKeyType = keyof ApiUriType;
export type ApiUriValueType = ApiUriType[ApiUriKeyType];
export type HttpMethod = 'get' | 'post' | 'put';
