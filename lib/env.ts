// ============================================================
// PayMatch - Environment Configuration
// ============================================================

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://paymatch.vercel.app",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://paymatch-backend.onrender.com",
  apiTimeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;
