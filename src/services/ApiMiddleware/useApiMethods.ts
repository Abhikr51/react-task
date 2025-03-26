import { ApiRequestConfig } from "./types";
import useApiRequest from "./useApiRequest";

// cons and pros b/w useFetcher and axios
//pass default object
// ✅ Specific API Methods
export const useGet = <T = unknown>(url: string, configs?: ApiRequestConfig) =>
  useApiRequest<T>("get", url, undefined, configs);

export const usePost = <T = unknown>(url: string, data?: unknown, configs?: ApiRequestConfig) =>
  useApiRequest<T>("post", url, data, configs);

export const usePut = <T = unknown>(url: string, data?: unknown, configs?: ApiRequestConfig) =>
  useApiRequest<T>("put", url, data, configs);

export const useDelete = <T = unknown>(url: string, configs?: ApiRequestConfig) =>
  useApiRequest<T>("delete", url, undefined, configs);
