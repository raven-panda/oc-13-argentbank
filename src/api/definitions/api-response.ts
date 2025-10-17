export interface ApiResponse<TBody> {
  status: number;
  message?: any;
  body: TBody;
}
