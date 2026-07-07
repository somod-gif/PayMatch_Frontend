// ============================================================
// PayMatch - Axios API Client
// ============================================================

import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import { env } from "./env";

const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: env.apiTimeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - attach auth token if available
apiClient.interceptors.request.use(
  (config) => {
    // In the future, attach JWT token here
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        console.warn("[API] Unauthorized request");
      }
      if (status === 500) {
        console.error("[API] Server error");
      }
      // Add the backend message to the error object for easy access
      const backendMessage = data?.message || data?.error || error.message;
      (error as AxiosError & { backendMessage?: string }).backendMessage = backendMessage;
    } else if (error.request) {
      console.error("[API] Network error - no response received");
      (error as AxiosError & { backendMessage?: string }).backendMessage =
        "Unable to connect to the server. Please check your internet connection.";
    }
    return Promise.reject(error);
  }
);

// Helper to extract backend error message
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "backendMessage" in error) {
    return (error as { backendMessage: string }).backendMessage;
  }
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (data && typeof data === "object") {
      return (data as { message?: string; error?: string }).message ||
             (data as { error?: string }).error ||
             "An unexpected error occurred";
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

// --- Helper functions ---

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}

export { apiClient };
export type { AxiosError };