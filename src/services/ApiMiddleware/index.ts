import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";

// ✅ Define Default API Configs Interface
export interface DefaultsApiConfigs extends CreateAxiosDefaults {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

class ApiMiddleware {
  private static defaultConfig: DefaultsApiConfigs = {
    baseURL: "",
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
  };

  private constructor() {} // Prevent direct instantiation

  // ✅ Set Default Configurations
  static setDefaultConfig(config: DefaultsApiConfigs) {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  // ✅ Create Axios Instance With Overridden Configs (Partial<AxiosRequestConfig>)
  private static createInstance(overriddenConfig?: Partial<DefaultsApiConfigs>): AxiosInstance {
    return axios.create({ ...this.defaultConfig, ...overriddenConfig });
  }

  // ✅ Request Method With Strong Typing
  static async request<T = AxiosResponse>({
    method,
    url,
    data,
    configs,
  }: {
    method: "get" | "post" | "put" | "delete";
    url: string;
    data?: unknown;
    configs?: { overriddenConfig?: Partial<DefaultsApiConfigs>; axiosConfigs?: AxiosRequestConfig };
  }): Promise<T> {
    const axiosInstance = this.createInstance(configs?.overriddenConfig);

    try {
      const response = await axiosInstance.request<T>({
        method,
        url,
        data,
        ...configs?.axiosConfigs, // Keeps axios' third param structure
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiMiddleware;
