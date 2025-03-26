import { AxiosError } from "axios";
import { ApiError } from "./types";

/**
 * Handles API errors and returns structured error messages.
 * @param error AxiosError | unknown
 * @returns ApiError (type, status, message, details)
 */
const apiErrorHandler = (error: unknown): ApiError => {
    const timestamp = new Date().toISOString(); // Record error timestamp
  
    if (error instanceof AxiosError) {
      const status = error.response?.status || null;
      const data = error.response?.data || null;
      const url = error.config?.url || undefined;
  
      switch (status) {
        case 400:
          return { type: "VALIDATION_ERROR", status, message: "Invalid request. Please check your input.", details: data, timestamp, url };
        case 401:
          return { type: "AUTH_ERROR", status, message: "Unauthorized. Please log in again.", details: data, timestamp, url };
        case 403:
          return { type: "PERMISSION_ERROR", status, message: "Access Denied. You don't have permission.", details: data, timestamp, url };
        case 404:
          return { type: "NOT_FOUND", status, message: "Resource not found.", details: data, timestamp, url };
        case 429:
          return { type: "RATE_LIMIT", status, message: "Too many requests. Please slow down.", details: data, timestamp, url };
        case 500:
          return { type: "SERVER_ERROR", status, message: "Server Error. Try again later.", details: data, timestamp, url };
        default:
          return { type: "UNKNOWN_ERROR", status, message: "An unexpected error occurred.", details: data, timestamp, url };
      }
    }
  
    // ✅ Handle Network Errors
    if (error instanceof Error) {
      if (error.message.includes("Network Error")) {
        return { type: "NETWORK_ERROR", status: null, message: "No internet connection. Please check your network.", timestamp };
      }
      if (error.message.includes("timeout")) {
        return { type: "NETWORK_ERROR", status: null, message: "Request Timeout. Try again later.", timestamp };
      }
      return { type: "UNKNOWN_ERROR", status: null, message: error.message, timestamp };
    }
  
    // ✅ Handle Unknown Errors
    return { type: "UNKNOWN_ERROR", status: null, message: "An unknown error occurred.", timestamp };
  };
  
  export default apiErrorHandler;