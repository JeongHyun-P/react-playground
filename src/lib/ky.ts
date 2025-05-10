import ky, { HTTPError } from 'ky';
import { ApiResponse } from '../types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface ErrorResponse {
  status?: number;
  message?: string;
  data?: unknown;
  name?: string;
  code?: string;
}

const api = ky.create({
  prefixUrl: BASE_URL,
  credentials: 'include',
  headers: {},
  hooks: {
    beforeRequest: [],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          // 토큰 리프레시 요청
          try {
            await ky
              .post(`${BASE_URL}/auth/token/refresh`, {
                credentials: 'include'
              })
              .json<{ token: string }>();

            const retryRequest = new Request(response.url, request);
            return ky(retryRequest);
          } catch (error) {
            // 로그아웃
          }
        }

        return response;
      }
    ],
    beforeError: [
      async (error: HTTPError) => {
        try {
          const errorObject: ErrorResponse = await error.response.json();
          globalThis.$toast?.(errorObject.message || '알 수 없는 오류가 발생했습니다.');
        } catch {
          globalThis.$toast('에러 응답을 처리할 수 없습니다.');
        }
        return error;
      }
    ]
  }
});

// GET
async function $get<T>(url: string, query?: Record<string, any>) {
  return api.get(url, { searchParams: query }).json<ApiResponse<T>>();
}

// POST
async function $post<T>(url: string, body?: any) {
  const isFormData = body instanceof FormData;
  return api.post(url, isFormData ? { body } : { json: body }).json<ApiResponse<T>>();
}

// PUT
async function $put<T>(url: string, json?: any) {
  return api.put(url, { json }).json<ApiResponse<T>>();
}

// DELETE
async function $delete<T>(url: string, json?: any) {
  return api.delete(url, { json }).json<ApiResponse<T>>();
}

// 전역 등록
type CustomKy = <T>(url: string, data?: any) => Promise<ApiResponse<T>>;
declare global {
  var $api: typeof api;
  var $get: CustomKy;
  var $post: CustomKy;
  var $put: CustomKy;
  var $delete: CustomKy;
}

globalThis.$api = api;
globalThis.$get = $get;
globalThis.$post = $post;
globalThis.$put = $put;
globalThis.$delete = $delete;
