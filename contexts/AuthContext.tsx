"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, AuthContextValue, LoginPayload, RegisterPayload, AuthResponse } from "@/types";
import { apiClient } from "@/lib/api";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "paymatch_auth_token";
const USER_KEY = "paymatch_user";

// Helper to set cookie
function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

// Helper to remove cookie
function removeCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setCookie(TOKEN_KEY, storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Set up axios interceptor for token
  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", payload);
      
      if (response.data) {
        const { user, tokens } = response.data;
        setUser(user);
        setToken(tokens.accessToken);
        
        localStorage.setItem(TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        setCookie(TOKEN_KEY, tokens.accessToken);
        
        router.push("/dashboard");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", payload);
      
      if (response.data) {
        const { user, tokens } = response.data;
        setUser(user);
        setToken(tokens.accessToken);
        
        localStorage.setItem(TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        setCookie(TOKEN_KEY, tokens.accessToken);
        
        router.push("/dashboard");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    removeCookie(TOKEN_KEY);
    router.push("/");
  }, [router]);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await apiClient.get<User>("/auth/me");
      if (response.data) {
        setUser(response.data);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      logout();
    }
  }, [token, logout]);

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
