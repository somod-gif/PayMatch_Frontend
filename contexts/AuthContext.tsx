"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, AuthContextValue, LoginPayload, RegisterPayload } from "@/types";
import { apiClient } from "@/lib/api";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

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
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setUserId(parsedUser.id);
        setCookie("x-user-id", parsedUser.id);
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Set up axios interceptor for x-user-id header
  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use((config) => {
      if (userId) {
        config.headers["x-user-id"] = userId;
      }
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
    };
  }, [userId]);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<{ success: boolean; message: string; data: User }>("/api/v1/auth/login", payload);
      
      if (response.data) {
        const userData = response.data.data;
        setUser(userData);
        setUserId(userData.id);
        
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setCookie("x-user-id", userData.id);
        
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
      const response = await apiClient.post<{ success: boolean; message: string; data: User }>("/api/v1/auth/register", payload);
      
      if (response.data) {
        const userData = response.data.data;
        setUser(userData);
        setUserId(userData.id);
        
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setCookie("x-user-id", userData.id);
        
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
    setUserId(null);
    localStorage.removeItem(USER_KEY);
    removeCookie("x-user-id");
    router.push("/");
  }, [router]);

  const refreshUser = useCallback(async () => {
    if (!userId) return;
    
    try {
      const response = await apiClient.get<{ success: boolean; data: User }>("/api/v1/auth/me");
      if (response.data) {
        setUser(response.data.data);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      logout();
    }
  }, [userId, logout]);

  const value: AuthContextValue = {
    user,
    userId,
    isAuthenticated: !!user && !!userId,
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