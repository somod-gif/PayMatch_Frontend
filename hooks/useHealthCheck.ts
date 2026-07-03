import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

export type HealthStatus = "checking" | "connected" | "offline";

export function useHealthCheck() {
  const [status, setStatus] = useState<HealthStatus>("checking");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = async () => {
    setStatus("checking");
    try {
      await apiClient.get("/health");
      setStatus("connected");
      setLastChecked(new Date());
    } catch (error) {
      console.error("Health check failed:", error);
      setStatus("offline");
    }
  };

  useEffect(() => {
    checkHealth();
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return { status, lastChecked, checkHealth };
}