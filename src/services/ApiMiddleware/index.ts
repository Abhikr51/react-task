import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { DefaultsApiConfigs } from "./types";

class ApiMiddleware {
  private static defaultConfig: DefaultsApiConfigs = {
    baseURL: "",
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    refreshInterval: undefined,
  };

  private axiosInstance: AxiosInstance;
  mergedConfigs:DefaultsApiConfigs
  constructor(config?: Partial<DefaultsApiConfigs>) {
    // Merge provided config with default config
    const mergedConfig = { 
      ...ApiMiddleware.defaultConfig, 
      ...(config || {}) 
    };

    // Create axios instance
    this.axiosInstance = axios.create(mergedConfig);
    // this.axiosInstance.interceptors.request((req)=>{

    // })
    // this.axiosInstance.interceptors.response((req)=>{

    // })
    this.mergedConfigs = mergedConfig
  }

  // ✅ Set Default Configurations
  static setDefaultConfig(config: Partial<DefaultsApiConfigs>) {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  // ✅ Request Method With Strong Typing
  async request<T = AxiosResponse>({
    method,
    url,
    data,
    configs,
  }: {
    method: "get" | "post" | "put" | "delete";
    url: string;
    data?: unknown;
    configs?: AxiosRequestConfig;
  }): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>({
        method,
        url,
        data,
        ...configs,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiMiddleware;
