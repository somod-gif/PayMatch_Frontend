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
    // const token = localStorage.getItem("auth_token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle unauthorized (redirect to login, etc.)
        console.warn("[API] Unauthorized request");
      }
      if (status === 500) {
        console.error("[API] Server error");
      }
    } else if (error.request) {
      console.error("[API] Network error - no response received");
    }
    return Promise.reject(error);
  }
);

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