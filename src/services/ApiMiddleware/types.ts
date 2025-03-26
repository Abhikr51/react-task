import { AxiosRequestConfig, CreateAxiosDefaults } from "axios";


export interface ApiError {
    type: "VALIDATION_ERROR" | "AUTH_ERROR" | "PERMISSION_ERROR" | "NOT_FOUND" | "RATE_LIMIT" | "SERVER_ERROR" | "NETWORK_ERROR" | "UNKNOWN_ERROR";
    status: number | null;
    message: string;
    details?: any; // Additional error details from API response
    timestamp: string; // To track when error occurred
    url?: string; // The API endpoint where the error happened
}
// ✅ Define Default API Configs Interface
export interface DefaultsApiConfigs extends CreateAxiosDefaults {
    baseURL: string;
    timeout: number;
    refreshInterval?: number;
}

export interface ApiState<T> {
    data: T | null;
    error: ApiError | null;
    loading: boolean;
    load: () => void;
}

export interface ApiRequestConfig {
    overriddenConfig?: Partial<DefaultsApiConfigs>;
    axiosConfigs?: AxiosRequestConfig;
}
