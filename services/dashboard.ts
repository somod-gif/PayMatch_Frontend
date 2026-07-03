// ============================================================
// PayMatch - Dashboard Service
// ============================================================

import { get } from "@/lib/api";
import type { DashboardStats, ApiResponse } from "@/types";

const BASE = "/dashboard";

export const dashboardService = {
  getStats: () =>
    get<ApiResponse<DashboardStats>>(`${BASE}/stats`),
};