import { useState, useCallback } from "react";
import ApiMiddleware, { DefaultsApiConfigs } from "."; // Import the API Middleware
import { AxiosRequestConfig } from "axios";

export interface ApiRequestConfig {
  overriddenConfig?: Partial<DefaultsApiConfigs>;
  axiosConfigs?: AxiosRequestConfig;
}

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  load: () => void;
}

// ✅ Generic Hook for API Requests
const useApiRequest = <T = unknown>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown,
  configs?: ApiRequestConfig
): ApiState<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await ApiMiddleware.request<T>({
        method,
        url,
        data,
        configs,
      });

      setResponseData(result);
      return 
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [method, url, data, configs]);

  return { data: responseData, error, loading, load };
};

export default useApiRequest;
