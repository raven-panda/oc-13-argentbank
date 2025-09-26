import type { ApiResponse } from '../definitions/api/api-response';

export function buildApiResponseFixture<TData>(
  data: TData,
): ApiResponse<TData> {
  return {
    status: 200,
    message: 'Successful mock',
    body: data,
  };
}
