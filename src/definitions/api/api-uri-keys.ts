import * as uriConstants from './api-uri';
export type ApiUriType = Omit<typeof uriConstants, 'API_BASE_URL'>;
export type ApiUriValuesType = ApiUriType[keyof ApiUriType];
export type HttpMethod = 'get' | 'post' | 'put';
