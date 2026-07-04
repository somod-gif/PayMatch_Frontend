// ============================================================
// PayMatch - Dashboard Service
// ============================================================

import { get } from "@/lib/api";
import type { DashboardStats, ApiResponse } from "@/types";

const BASE = "/api/v1/dashboard";

export const dashboardService = {
  getStats: () =>
    get<ApiResponse<DashboardStats>>(`${BASE}/summary`),
};